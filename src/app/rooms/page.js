// "use client";
// import { useSession } from "next-auth/react";
// import { useEffect, useState } from "react";

// export default function Rooms() {
//     const { data: session } = useSession();

//     // Define the initial 24 rooms inside useState
//     const [rooms, setRooms] = useState(
//         Array.from({ length: 24 }, (_, i) => ({
//             number: i + 1,
//             type: i < 6 ? "Luxury" : "Normal",
//             price: i < 6 ? 5000 : 2000,
//             ac: i < 6, // Luxury rooms have AC
//             booked: false, // Later, update from database
//         }))
//     );

//     // Fetch booked rooms from the database
//     useEffect(() => {
//         async function fetchRooms() {
//             const res = await fetch("/api/book-room");
//             const data = await res.json();
//             setRooms((prevRooms) =>
//                 prevRooms.map((room) => ({
//                     ...room,
//                     booked: data.rooms.some((r) => r.number === room.number),
//                 }))
//             );
//         }
//         fetchRooms();
//     }, []);

//     // Move handleBookRoom inside the component to access state
//     async function handleBookRoom(roomNumber) {
//         try {
//             const res = await fetch("/api/book-room", {
//                 method: "POST",
//                 headers: { "Content-Type": "application/json" },
//                 body: JSON.stringify({ roomNumber }),
//             });
//             const data = await res.json();
//             if (data.error) {
//                 alert(`Error: ${data.error}`);
//             } else {
//                 alert(`Room ${roomNumber} booked successfully!`);
//                 // Update the rooms state immediately
//                 setRooms((prevRooms) =>
//                     prevRooms.map((room) =>
//                         room.number === roomNumber ? { ...room, booked: true } : room
//                     )
//                 );
//             }
//         } catch (err) {
//             console.error(err);
//             alert("An error occurred while booking the room.");
//         }
//     }

//     if (!session) return <p>Please log in to view rooms.</p>;

//     return (
//         <div className="p-6 w-full">
//             <h1 className="text-4xl font-bold mb-6 text-center">Rooms</h1>
//             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-6 w-full">
//                 {rooms.map((room) => (
//                     <div key={room.number} className="border p-4 rounded-lg shadow-lg">
//                         <h2 className="text-xl font-bold">Room {room.number}</h2>
//                         <p>Type: {room.type}</p>
//                         <p>Price: ₹{room.price}</p>
//                         <p>{room.ac ? "AC Available" : "No AC"}</p>
//                         {room.booked ? (
//                             <p className="text-red-500 font-bold">Room Unavailable</p>
//                         ) : (
//                             <button
//                                 className="bg-blue-500 text-white px-4 py-2 rounded-md mt-2 w-full"
//                                 onClick={() => handleBookRoom(room.number)}
//                             >
//                                 Book Now
//                             </button>
//                         )}
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// }
// app/rooms/page.js

"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Rooms() {
    const { data: session } = useSession();
    const router = useRouter();

    // Define the initial 24 rooms:
    const [rooms, setRooms] = useState(
        Array.from({ length: 24 }, (_, i) => ({
            number: i + 1,
            type: i < 6 ? "Luxury" : "Normal",
            price: i < 6 ? 5000 : 2000,
            ac: i < 6, // Luxury rooms have AC
            booked: false,
            bookingDetails: null, // to hold fromDate and toDate if booked
        }))
    );

    // Fetch the current booked rooms from the backend:
    useEffect(() => {
        async function fetchRooms() {
            const res = await fetch("/api/book-transaction");
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

    // Navigate to the transaction page for the given room:
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