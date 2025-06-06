"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

export default function AdminPage() {
    const { data: session } = useSession();
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);

    const fetchUsers = async () => {
        const res = await fetch("/api/admin");
        const data = await res.json();
        console.log("Fetched Users:", data);
        setUsers(data.users);
    };

    useEffect(() => {
        fetchUsers(); // ✅ Now this still works
    }, []);

    const deleteUser = async (email) => {
        try {
            const res = await fetch("/api/admin/delete-user", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            });

            const data = await res.json();
            if (data.success) {
                alert("User deleted");
                fetchUsers(); // ⬅️ Re-fetch users to reflect changes
            } else {
                alert(data.error || "Deletion failed");
            }
        } catch (error) {
            console.error("Delete error:", error);
            alert("Something went wrong");
        }
    };


    const handleDeleteBooking = async (email, booking) => {
        await fetch("/api/admin/delete-booking", {
            method: "POST",
            body: JSON.stringify({
                email,
                roomNumber: booking.roomNumber,
                fromDate: booking.fromDate,
                toDate: booking.toDate,
            }),
        });

        setUsers((prev) =>
            prev.map((u) =>
                u.email === email
                    ? {
                        ...u,
                        bookedRooms: u.bookedRooms.filter(
                            (b) =>
                                !(
                                    b.roomNumber === booking.roomNumber &&
                                    b.fromDate === booking.fromDate &&
                                    b.toDate === booking.toDate
                                )
                        ),
                    }
                    : u
            )
        );
    };

    const handleEditBookingPrompt = async (email, booking) => {
        const newFrom = prompt(
            "Enter new FROM date (yyyy-mm-dd):",
            booking.fromDate.slice(0, 10)
        );
        const newTo = prompt(
            "Enter new TO date (yyyy-mm-dd):",
            booking.toDate.slice(0, 10)
        );
        if (!newFrom || !newTo) return;

        await fetch("/api/admin/edit-booking", {
            method: "POST",
            body: JSON.stringify({
                email,
                roomNumber: booking.roomNumber,
                fromDate: booking.fromDate,
                toDate: booking.toDate,
                newFromDate: newFrom,
                newToDate: newTo,
            }),
        });

        setUsers((prev) =>
            prev.map((u) =>
                u.email === email
                    ? {
                        ...u,
                        bookedRooms: u.bookedRooms.map((b) =>
                            b.roomNumber === booking.roomNumber &&
                                b.fromDate === booking.fromDate &&
                                b.toDate === booking.toDate
                                ? { ...b, fromDate: newFrom, toDate: newTo }
                                : b
                        ),
                    }
                    : u
            )
        );
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
            <table className="min-w-full bg-white border border-gray-200">
                <thead>
                    <tr>
                        <th className="py-2 px-4 border">Name</th>
                        <th className="py-2 px-4 border">Email</th>
                        <th className="py-2 px-4 border">Admin</th>
                        <th className="py-2 px-4 border">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.email}>
                            <td className="py-2 px-4 border">{user.name}</td>
                            <td className="py-2 px-4 border">{user.email}</td>
                            <td className="py-2 px-4 border">{user.isAdmin ? "✅" : "❌"}</td>
                            <td className="py-2 px-4 border space-x-2">
                                <button
                                    className="bg-red-500 text-white px-2 py-1 rounded"
                                    onClick={() => deleteUser(user.email)}
                                >
                                    Delete
                                </button>
                                <button
                                    className="bg-blue-500 text-white px-2 py-1 rounded"
                                    onClick={() =>
                                        setSelectedUser(
                                            users.find((u) => u.email === user.email)
                                        )
                                    }
                                >
                                    View Bookings
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {selectedUser && (
                <div className="mt-6 border p-4 rounded bg-gray-50">
                    <h2 className="text-xl font-semibold mb-2">
                        Bookings for {selectedUser.name}
                    </h2>

                    {selectedUser.bookedRooms?.length > 0 ? (
                        selectedUser.bookedRooms.map((booking, idx) => (
                            <div
                                key={idx}
                                className="flex items-center justify-between border p-2 mb-2"
                            >
                                <div>
                                    <p>
                                        <strong>Room:</strong> {booking.roomNumber}
                                    </p>
                                    <p>
                                        <strong>From:</strong>{" "}
                                        {new Date(booking.fromDate).toLocaleDateString()}
                                    </p>
                                    <p>
                                        <strong>To:</strong>{" "}
                                        {new Date(booking.toDate).toLocaleDateString()}
                                    </p>
                                </div>

                                <div className="space-x-2">
                                    <button
                                        className="bg-red-500 text-white px-2 py-1 rounded"
                                        onClick={() =>
                                            handleDeleteBooking(selectedUser.email, booking)
                                        }
                                    >
                                        Delete Booking
                                    </button>
                                    <button
                                        className="bg-yellow-500 text-white px-2 py-1 rounded"
                                        onClick={() =>
                                            handleEditBookingPrompt(selectedUser.email, booking)
                                        }
                                    >
                                        Edit Booking
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-500">No bookings found.</p>
                    )}
                </div>
            )}
        </div>
    );
}