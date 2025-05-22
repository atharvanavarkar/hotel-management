
"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Rooms() {
    const { data: session } = useSession();
    const router = useRouter();

    const [rooms, setRooms] = useState(
        Array.from({ length: 24 }, (_, i) => ({
            number: i + 1,
            type: i < 6 ? "Luxury" : "Normal",
            price: i < 6 ? 5000 : 2000,
            ac: i < 6,
            booked: false,
            bookingDetails: null,
        }))
    );

    useEffect(() => {
        async function fetchRooms() {
            const res = await fetch("/api/book-room");
            const data = await res.json();
            setRooms((prevRooms) =>
                prevRooms.map((room) => {
                    const booking = data.rooms.find((r) => r.roomNumber === room.number);
                    if (booking) {
                        return { ...room, booked: true, bookingDetails: booking };
                    }
                    return room;
                })
            );
        }
        fetchRooms();
    }, []);

    function handleBookRoom(roomNumber) {
        router.push(`/transaction?roomNumber=${roomNumber}`);
    }

    if (!session) return <p>Please log in to view rooms.</p>;

    return (
        <div className="p-6 w-full">
            <h1 className="text-4xl font-bold mb-6 text-center">Rooms</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-6 w-full">
                {rooms.map((room) => (
                    <div key={room.number} className="border p-4 rounded-lg shadow-lg">
                        <h2 className="text-xl font-bold">Room {room.number}</h2>
                        <p>Type: {room.type}</p>
                        <p>Price: ₹{room.price}</p>
                        <p>{room.ac ? "AC Available" : "No AC"}</p>
                        {room.booked ? (
                            <div>
                                <p className="text-red-500 font-bold">Room Unavailable</p>
                                {room.bookingDetails && (
                                    <p className="text-sm">
                                        Booked from{" "}
                                        {new Date(room.bookingDetails.fromDate).toLocaleDateString()}{" "}
                                        to{" "}
                                        {new Date(room.bookingDetails.toDate).toLocaleDateString()}
                                    </p>
                                )}
                            </div>
                        ) : (
                            <button
                                className="bg-blue-500 text-white px-4 py-2 rounded-md mt-2 w-full"
                                onClick={() => handleBookRoom(room.number)}
                            >
                                Book Now
                            </button>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}