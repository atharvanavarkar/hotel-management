"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Rooms() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [filter, setFilter] = useState("all");
    const [loading, setLoading] = useState(true);

    const [rooms, setRooms] = useState(
        Array.from({ length: 24 }, (_, i) => ({
            number: i + 1,
            type: i < 6 ? "Luxury" : "Normal",
            price: i < 6 ? 3500 : 2000,
            ac: i < 6,
            booked: false,
            bookingDetails: null,
        }))
    );

    useEffect(() => {
        async function fetchRooms() {
            try {
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
            } catch (error) {
                console.error("Failed to fetch rooms:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchRooms();
    }, []);

    function handleBookRoom(roomNumber) {
        router.push(`/transaction?roomNumber=${roomNumber}`);
    }

    const filteredRooms = rooms.filter((room) => {
        if (filter === "available") return !room.booked;
        if (filter === "booked") return room.booked;
        if (filter === "luxury") return room.type === "Luxury";
        if (filter === "normal") return room.type === "Normal";
        return true;
    });

    const availableRooms = rooms.filter(room => !room.booked).length;
    const bookedRooms = rooms.filter(room => room.booked).length;
    const luxuryRooms = rooms.filter(room => room.type === "Luxury").length;

    if (status === "loading") {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
                <div className="animate-pulse text-center">
                    <div className="h-8 w-32 bg-gray-200 rounded-md mb-4 mx-auto"></div>
                    <div className="h-4 w-48 bg-gray-200 rounded-md mx-auto"></div>
                </div>
            </div>
        );
    }

    if (!session) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
                <div className="text-center bg-white rounded-2xl shadow-xl p-8">
                    <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Access Required</h2>
                    <p className="text-gray-600">Please log in to view and book rooms.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 pt-20">
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
                <div className="w-full px-4 py-6 md:py-8">
                    {/* Header Section */}
                    <div className="text-center mb-8 md:mb-12">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
                            Available Rooms
                        </h1>
                        <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
                            Choose from our selection of luxury and standard rooms for your perfect stay
                        </p>
                    </div>

                    {/* Stats Cards */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8 mx-2 md:mx-4">
                        <div className="bg-white rounded-xl shadow-lg p-4 md:p-6 text-center border-t-4 border-blue-500">
                            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                </svg>
                            </div>
                            <p className="text-2xl md:text-3xl font-bold text-gray-900">{rooms.length}</p>
                            <p className="text-sm text-gray-500">Total Rooms</p>
                        </div>
                        <div className="bg-white rounded-xl shadow-lg p-4 md:p-6 text-center border-t-4 border-green-500">
                            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <p className="text-2xl md:text-3xl font-bold text-gray-900">{availableRooms}</p>
                            <p className="text-sm text-gray-500">Available</p>
                        </div>
                        <div className="bg-white rounded-xl shadow-lg p-4 md:p-6 text-center border-t-4 border-red-500">
                            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
                                <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </div>
                            <p className="text-2xl md:text-3xl font-bold text-gray-900">{bookedRooms}</p>
                            <p className="text-sm text-gray-500">Booked</p>
                        </div>
                        <div className="bg-white rounded-xl shadow-lg p-4 md:p-6 text-center border-t-4 border-purple-500">
                            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3a2 2 0 00-2 2v1c0 8.284 6.716 15 15 15h1a2 2 0 002-2v-3.28a1 1 0 00-.684-.948l-4.493-1.498a1 1 0 00-1.21.502l-1.13 2.257a11.042 11.042 0 01-5.516-5.517l2.257-1.128a1 1 0 00.502-1.21L9.228 3.683A1 1 0 008.279 3H5z" />
                                </svg>
                            </div>
                            <p className="text-2xl md:text-3xl font-bold text-gray-900">{luxuryRooms}</p>
                            <p className="text-sm text-gray-500">Luxury</p>
                        </div>
                    </div>

                    {/* Filter Section */}
                    <div className="bg-white rounded-2xl shadow-xl p-4 md:p-6 mb-8 mx-2 md:mx-4">
                        <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">Filter Rooms</h2>
                        <div className="flex flex-wrap gap-2 md:gap-4">
                            {[
                                { key: "all", label: "All Rooms", icon: "🏨" },
                                { key: "available", label: "Available", icon: "✅" },
                                { key: "booked", label: "Booked", icon: "❌" },
                                { key: "luxury", label: "Luxury", icon: "⭐" },
                                { key: "normal", label: "Standard", icon: "🏠" },
                            ].map((filterOption) => (
                                <button
                                    key={filterOption.key}
                                    onClick={() => setFilter(filterOption.key)}
                                    className={`px-3 md:px-4 py-2 md:py-3 rounded-xl font-medium transition-all duration-200 text-sm md:text-base flex items-center gap-2 ${filter === filterOption.key
                                        ? "bg-indigo-500 text-white shadow-lg scale-105"
                                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                        }`}
                                >
                                    <span className="text-lg">{filterOption.icon}</span>
                                    <span className="hidden sm:inline">{filterOption.label}</span>
                                    <span className="sm:hidden">{filterOption.label.split(' ')[0]}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Loading State */}
                    {loading && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 mx-2 md:mx-4">
                            {Array.from({ length: 8 }).map((_, i) => (
                                <div key={i} className="animate-pulse bg-white rounded-2xl p-6 shadow-lg">
                                    <div className="h-6 bg-gray-200 rounded mb-4"></div>
                                    <div className="h-4 bg-gray-200 rounded mb-2"></div>
                                    <div className="h-4 bg-gray-200 rounded mb-2"></div>
                                    <div className="h-4 bg-gray-200 rounded mb-4"></div>
                                    <div className="h-10 bg-gray-200 rounded"></div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Rooms Grid */}
                    {!loading && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 md:gap-6 mx-2 md:mx-4">
                            {filteredRooms.map((room) => (
                                <div
                                    key={room.number}
                                    className={`bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border-2 ${room.booked
                                        ? "border-red-200 bg-red-50"
                                        : room.type === "Luxury"
                                            ? "border-purple-200 hover:border-purple-300"
                                            : "border-blue-200 hover:border-blue-300"
                                        } ${!room.booked ? "hover:scale-105" : ""}`}
                                >
                                    {/* Room Header */}
                                    <div className={`p-4 md:p-6 ${room.type === "Luxury"
                                        ? "bg-gradient-to-r from-purple-500 to-indigo-600"
                                        : "bg-gradient-to-r from-blue-500 to-cyan-600"
                                        } text-white`}>
                                        <div className="flex items-center justify-between mb-2">
                                            <h2 className="text-xl md:text-2xl font-bold">Room {room.number}</h2>
                                            <div className="flex items-center gap-2">
                                                {room.type === "Luxury" && <span className="text-yellow-300">⭐</span>}
                                                {room.ac && (
                                                    <div className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                                                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
                                                        </svg>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span className="text-black bg-white bg-opacity-20 px-3 py-1 rounded-full">
                                                {room.type}
                                            </span>
                                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${room.booked
                                                ? "bg-red-500 text-white"
                                                : "bg-green-500 text-white"
                                                }`}>
                                                {room.booked ? "Unavailable" : "Available"}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Room Details */}
                                    <div className="p-4 md:p-6">
                                        <div className="space-y-3 mb-4">
                                            <div className="flex items-center justify-between">
                                                <span className="text-gray-600">Price per night:</span>
                                                <span className="text-2xl font-bold text-gray-900">₹{room.price.toLocaleString()}</span>
                                            </div>

                                            <div className="flex items-center gap-4">
                                                <div className="flex items-center gap-2">
                                                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V5a2 2 0 012-2h4a2 2 0 012 2v2m-6 4h6" />
                                                    </svg>
                                                    <span className="text-sm text-gray-600">{room.type} Room</span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                                                    </svg>
                                                    <span className="text-sm text-gray-600">{room.ac ? "AC Available" : "No AC"}</span>
                                                </div>
                                            </div>
                                        </div>

                                        {room.booked ? (
                                            <div className="space-y-3">
                                                <div className="bg-red-100 border border-red-200 rounded-lg p-3">
                                                    <p className="text-red-700 font-medium text-sm flex items-center gap-2">
                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                                        </svg>
                                                        Room Currently Unavailable
                                                    </p>
                                                    {room.bookingDetails && (
                                                        <p className="text-red-600 text-xs mt-1">
                                                            Booked from {new Date(room.bookingDetails.fromDate).toLocaleDateString()} to {new Date(room.bookingDetails.toDate).toLocaleDateString()}
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                        ) : (
                                            <button
                                                className={`w-full py-3 px-4 rounded-xl font-semibold text-white transition-all duration-200 transform hover:scale-105 ${room.type === "Luxury"
                                                    ? "bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700"
                                                    : "bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700"
                                                    } shadow-lg hover:shadow-xl`}
                                                onClick={() => handleBookRoom(room.number)}
                                            >
                                                <div className="flex items-center justify-center gap-2">
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                                                    </svg>
                                                    Book Now
                                                </div>
                                            </button>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Empty State */}
                    {!loading && filteredRooms.length === 0 && (
                        <div className="text-center py-16">
                            <svg className="w-24 h-24 text-gray-400 mx-auto mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                            </svg>
                            <h3 className="text-2xl font-bold text-gray-900 mb-2">No rooms found</h3>
                            <p className="text-gray-600">Try adjusting your filters to see more rooms.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}