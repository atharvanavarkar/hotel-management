// "use client";

// import { useSession } from "next-auth/react";

// export default function Dashboard() {
//     const { data: session, status } = useSession();

//     if (status === "loading") return <p>Loading...</p>;
//     if (!session) return <p>Please log in to access the dashboard.</p>;

//     return (
//         <div className="p-6">
//             <h1 className="text-4xl font-bold">Dashboard</h1>
//             <p>Welcome, {session.user.name}</p>

//             <h2 className="text-2xl mt-4">Booked Rooms</h2>
//             <p>Your booked rooms will appear here...</p>

//             <h2 className="text-2xl mt-4">Transactions</h2>
//             <p>Your past transactions will be displayed here...</p>
//         </div>
//     );
// }
// app/dashboard/page.js

"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import ProtectedPage from "@/components/ProtectedPage";

export default function Dashboard() {
    const { data: session, status } = useSession();
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        async function fetchBookings() {
            const res = await fetch("/api/book-transaction");
            const data = await res.json();
            if (!data.error) {
                setBookings(data.rooms);
            }
        }
        fetchBookings();
    }, []);

    if (status === "loading") return <p>Loading...</p>;
    if (!session) return <p>Please log in to access the dashboard.</p>;

    return (
        <ProtectedPage>
            <div className="p-6">
                <h1 className="text-4xl font-bold">Dashboard</h1>
                <p>Welcome, {session.user.name}</p>

                <h2 className="text-2xl mt-4">Booked Rooms</h2>
                {bookings.length === 0 ? (
                    <p>No booked rooms found.</p>
                ) : (
                    <ul>
                        {bookings.map((booking, index) => (
                            <li key={index}>
                                Room {booking.roomNumber} booked from{" "}
                                {new Date(booking.fromDate).toLocaleDateString()} to{" "}
                                {new Date(booking.toDate).toLocaleDateString()}
                            </li>
                        ))}
                    </ul>
                )}

                <h2 className="text-2xl mt-4">Transactions</h2>
                <p>Your past transactions will be displayed on the Payment page.</p>
            </div>
        </ProtectedPage>
    );
}