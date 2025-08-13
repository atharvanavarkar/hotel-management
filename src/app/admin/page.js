"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { Trash2, Eye, Edit3, Shield } from "lucide-react";

export default function AdminPage() {
    const { data: session } = useSession();
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);

    const fetchUsers = async () => {
        const res = await fetch("/api/admin");
        const data = await res.json();
        setUsers(data.users);
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const deleteUser = async (email) => {
        if (!confirm("Are you sure you want to delete this user?")) return;
        const res = await fetch("/api/admin/delete-user", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email }),
        });
        const data = await res.json();
        if (data.success) {
            fetchUsers();
            alert("User deleted");
        } else {
            alert(data.error || "Failed to delete");
        }
    };

    return (
        <div className="py-16 flex justify-center items-center w-full">
            <div className="p-4 md:p-8 bg-gray-50 min-h-screen w-full max-w-7xl text-center">
                <h1 className="text-3xl font-bold mb-6 text-gray-800">Admin Dashboard</h1>

                {/* Desktop Table */}
                <div className="hidden md:block overflow-x-auto shadow-lg rounded-lg bg-white">
                    <table className="w-full min-w-[600px]">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="py-3 px-4 text-left text-gray-700 font-semibold">Name</th>
                                <th className="py-3 px-4 text-left text-gray-700 font-semibold">Email</th>
                                <th className="py-3 px-4 text-center text-gray-700 font-semibold">Role</th>
                                <th className="py-3 px-4 text-center text-gray-700 font-semibold">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => (
                                <tr
                                    key={user.email}
                                    className="border-t hover:bg-gray-50 transition"
                                >
                                    <td className="py-3 px-4">{user.name}</td>
                                    <td className="py-3 px-4">{user.email}</td>
                                    <td className="py-3 px-4 text-center">
                                        {user.isAdmin ? (
                                            <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full flex items-center gap-1 justify-center text-sm">
                                                <Shield size={14} /> Admin
                                            </span>
                                        ) : (
                                            <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                                                User
                                            </span>
                                        )}
                                    </td>
                                    <td className="py-3 px-4 flex gap-2 justify-center">
                                        <button
                                            onClick={() => deleteUser(user.email)}
                                            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded flex items-center gap-1 text-sm"
                                        >
                                            <Trash2 size={16} /> Delete
                                        </button>
                                        <button
                                            onClick={() => setSelectedUser(user)}
                                            className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded flex items-center gap-1 text-sm"
                                        >
                                            <Eye size={16} /> View
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Mobile Cards */}
                <div className="grid grid-cols-1 md:hidden gap-4 p-4">
                    {users.map((user) => (
                        <div
                            key={user.email}
                            className="border rounded-lg p-4 shadow-sm bg-white"
                        >
                            <div className="flex justify-between items-center mb-2">
                                <h2 className="text-lg font-semibold">{user.name}</h2>
                                {user.isAdmin && (
                                    <span className="px-2 py-0.5 bg-purple-100 text-purple-700 rounded-full text-sm flex items-center gap-1">
                                        <Shield size={14} /> Admin
                                    </span>
                                )}
                            </div>
                            <p className="text-gray-600 mb-3 break-words">{user.email}</p>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => deleteUser(user.email)}
                                    className="flex-1 bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded flex items-center justify-center gap-1 text-sm"
                                >
                                    <Trash2 size={16} /> Delete
                                </button>
                                <button
                                    onClick={() => setSelectedUser(user)}
                                    className="flex-1 bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded flex items-center justify-center gap-1 text-sm"
                                >
                                    <Eye size={16} /> View
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Booking Modal */}
                {selectedUser && (
                    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
                        <div className="bg-white rounded-lg shadow-xl w-full max-w-lg p-6 relative overflow-y-auto max-h-[90vh]">
                            <button
                                onClick={() => setSelectedUser(null)}
                                className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                            >
                                ✖
                            </button>
                            <h2 className="text-xl font-bold mb-4">
                                Bookings for {selectedUser.name}
                            </h2>
                            {selectedUser.bookedRooms?.length > 0 ? (
                                selectedUser.bookedRooms.map((booking, idx) => (
                                    <div
                                        key={idx}
                                        className="border rounded-lg p-3 mb-3 flex flex-col sm:flex-row justify-between sm:items-center"
                                    >
                                        <div className="mb-2 sm:mb-0">
                                            <p><strong>Room:</strong> {booking.roomNumber}</p>
                                            <p><strong>From:</strong> {new Date(booking.fromDate).toLocaleDateString()}</p>
                                            <p><strong>To:</strong> {new Date(booking.toDate).toLocaleDateString()}</p>
                                        </div>
                                        <div className="flex gap-2">
                                            <button className="bg-yellow-500 hover:bg-yellow-600 text-white px-2 py-1 rounded flex items-center gap-1 text-sm">
                                                <Edit3 size={14} /> Edit
                                            </button>
                                            <button className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded flex items-center gap-1 text-sm">
                                                <Trash2 size={14} /> Delete
                                            </button>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className="text-gray-500">No bookings found.</p>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}