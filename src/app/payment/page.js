"use client";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import ProtectedPage from "@/components/ProtectedPage";

export default function Dashboard() {
    const { data: session, status } = useSession();
    const [bookings, setBookings] = useState([]);
    const [transactions, setTransactions] = useState([]);
    const [activeTab, setActiveTab] = useState("bookings");

    useEffect(() => {
        async function fetchBookings() {
            const res = await fetch("/api/book-transaction");
            const data = await res.json();
            if (!data.error) {
                setBookings(data.rooms);
            }
        }

        async function fetchTransactions() {
            const res = await fetch("/api/user-transactions");
            const data = await res.json();
            if (!data.error) {
                setTransactions(data.transactions);
            }
        }

        fetchBookings();
        fetchTransactions();
    }, []);

    if (status === "loading") {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-pulse">
                    <div className="h-8 w-32 bg-gray-200 rounded-md mb-4"></div>
                    <div className="h-4 w-48 bg-gray-200 rounded-md"></div>
                </div>
            </div>
        );
    }

    if (!session) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Access Required</h2>
                    <p className="text-gray-600">Please log in to access your dashboard.</p>
                </div>
            </div>
        );
    }

    return (
        <ProtectedPage>
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 w-full">
                <div className="w-full px-4 py-8">
                    {/* Header Section */}
                    <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-6 md:mb-8 mx-2 md:mx-4">
                        <div className="flex flex-col lg:flex-row items-center justify-between">
                            <div className="text-center lg:text-left mb-4 lg:mb-0 flex-1">
                                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-2">
                                    Welcome Back!
                                </h1>
                                <p className="text-lg md:text-xl text-gray-600">
                                    Hello, <span className="font-semibold text-indigo-600">{session.user.name}</span>
                                </p>
                            </div>
                            <div className="flex flex-col items-center">
                                <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white text-xl md:text-2xl font-bold mb-2">
                                    {session.user.name?.charAt(0).toUpperCase()}
                                </div>
                                <span className="text-sm text-gray-500">Profile</span>
                            </div>
                        </div>
                    </div>

                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6 mb-6 md:mb-8 mx-2 md:mx-4">
                        <div className="bg-white rounded-xl shadow-lg p-4 md:p-6 border-l-4 border-blue-500">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-600">Total Bookings</p>
                                    <p className="text-2xl md:text-3xl font-bold text-gray-900">{bookings.length}</p>
                                </div>
                                <div className="w-10 h-10 md:w-12 md:h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                                    <svg className="w-5 h-5 md:w-6 md:h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white rounded-xl shadow-lg p-4 md:p-6 border-l-4 border-green-500">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-600">Total Transactions</p>
                                    <p className="text-2xl md:text-3xl font-bold text-gray-900">{transactions.length}</p>
                                </div>
                                <div className="w-10 h-10 md:w-12 md:h-12 bg-green-100 rounded-lg flex items-center justify-center">
                                    <svg className="w-5 h-5 md:w-6 md:h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Tab Navigation */}
                    <div className="bg-white rounded-2xl shadow-xl overflow-hidden mx-2 md:mx-4">
                        <div className="border-b border-gray-200">
                            <nav className="flex space-x-4 md:space-x-8 px-4 md:px-8 overflow-x-auto">
                                <button
                                    onClick={() => setActiveTab("bookings")}
                                    className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors duration-200 whitespace-nowrap ${activeTab === "bookings"
                                        ? "border-indigo-500 text-indigo-600"
                                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                                        }`}
                                >
                                    <div className="flex items-center space-x-2">
                                        <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                        </svg>
                                        <span>Room Bookings</span>
                                    </div>
                                </button>
                                <button
                                    onClick={() => setActiveTab("transactions")}
                                    className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors duration-200 whitespace-nowrap ${activeTab === "transactions"
                                        ? "border-indigo-500 text-indigo-600"
                                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                                        }`}
                                >
                                    <div className="flex items-center space-x-2">
                                        <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                        </svg>
                                        <span>Payment History</span>
                                    </div>
                                </button>
                            </nav>
                        </div>

                        {/* Tab Content */}
                        <div className="p-4 md:p-8">
                            {activeTab === "bookings" && (
                                <div>
                                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Room Bookings</h2>
                                    {bookings.length === 0 ? (
                                        <div className="text-center py-12">
                                            <svg className="w-24 h-24 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                            </svg>
                                            <h3 className="text-lg font-medium text-gray-900 mb-2">No bookings found</h3>
                                            <p className="text-gray-500">You haven't made any room bookings yet.</p>
                                        </div>
                                    ) : (
                                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
                                            {bookings.map((booking, index) => (
                                                <div key={index} className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-4 md:p-6 border border-blue-200 hover:shadow-lg transition-shadow duration-200">
                                                    <div className="flex items-center justify-between mb-3 md:mb-4">
                                                        <h3 className="text-base md:text-lg font-semibold text-gray-900">
                                                            Room {booking.roomNumber}
                                                        </h3>
                                                        <div className="w-8 h-8 md:w-10 md:h-10 bg-blue-500 rounded-full flex items-center justify-center">
                                                            <svg className="w-4 h-4 md:w-5 md:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V5a2 2 0 012-2h4a2 2 0 012 2v2m-6 4h6" />
                                                            </svg>
                                                        </div>
                                                    </div>
                                                    <div className="space-y-1 md:space-y-2">
                                                        <p className="text-xs md:text-sm text-gray-600">
                                                            <span className="font-medium">Check-in:</span> {new Date(booking.fromDate).toLocaleDateString()}
                                                        </p>
                                                        <p className="text-xs md:text-sm text-gray-600">
                                                            <span className="font-medium">Check-out:</span> {new Date(booking.toDate).toLocaleDateString()}
                                                        </p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            )}

                            {activeTab === "transactions" && (
                                <div>
                                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Payment History</h2>
                                    {transactions.length === 0 ? (
                                        <div className="text-center py-12">
                                            <svg className="w-24 h-24 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                            </svg>
                                            <h3 className="text-lg font-medium text-gray-900 mb-2">No transactions found</h3>
                                            <p className="text-gray-500">You haven't made any payments yet.</p>
                                        </div>
                                    ) : (
                                        <div className="space-y-3 md:space-y-4">
                                            {transactions.map((txn, index) => (
                                                <div key={index} className="bg-white border border-gray-200 rounded-xl p-4 md:p-6 hover:shadow-lg transition-shadow duration-200">
                                                    <div className="flex flex-col">
                                                        <div className="flex-1">
                                                            <div className="flex items-center mb-3">
                                                                <div className="w-8 h-8 md:w-10 md:h-10 bg-green-100 rounded-full flex items-center justify-center mr-3">
                                                                    <svg className="w-4 h-4 md:w-5 md:h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                                    </svg>
                                                                </div>
                                                                <h3 className="text-base md:text-lg font-semibold text-gray-900">
                                                                    Room {txn.roomNumber}
                                                                </h3>
                                                            </div>
                                                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
                                                                <div>
                                                                    <p className="text-xs md:text-sm text-gray-500">Transaction ID</p>
                                                                    <p className="font-mono text-xs md:text-sm text-gray-900 break-all">{txn.transactionId}</p>
                                                                </div>
                                                                <div>
                                                                    <p className="text-xs md:text-sm text-gray-500">Amount</p>
                                                                    <p className="text-lg md:text-xl font-bold text-green-600">₹{txn.amount}</p>
                                                                </div>
                                                                <div>
                                                                    <p className="text-xs md:text-sm text-gray-500">Booking Period</p>
                                                                    <p className="text-xs md:text-sm text-gray-900">
                                                                        {new Date(txn.fromDate).toLocaleDateString()} - {new Date(txn.toDate).toLocaleDateString()}
                                                                    </p>
                                                                </div>
                                                                <div>
                                                                    <p className="text-xs md:text-sm text-gray-500">Payment Date</p>
                                                                    <p className="text-xs md:text-sm text-gray-900">{new Date(txn.date).toLocaleDateString()}</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </ProtectedPage>
    );
}