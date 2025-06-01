// app/transaction/page.js

// "use client";

// import { useState } from "react";
// import { useRouter, useSearchParams } from "next/navigation";
// import { useSession } from "next-auth/react";

// export default function TransactionPage() {
//     const { data: session } = useSession();
//     const searchParams = useSearchParams();
//     const roomNumber = searchParams.get("roomNumber");
//     const [fromDate, setFromDate] = useState("");
//     const [toDate, setToDate] = useState("");
//     const [loading, setLoading] = useState(false);
//     const router = useRouter();

//     const handlePayment = async (e) => {
//         e.preventDefault();
//         setLoading(true);

//         // Calculate the amount to be paid.
//         // For simplicity: Room 1-6 are "Luxury" (₹5000 per day) and the others are "Normal" (₹2000 per day)
//         const roomNum = parseInt(roomNumber, 10);
//         let dailyRate = roomNum <= 6 ? 5000 : 2000;

//         // Calculate the number of booking days (simple difference)
//         const start = new Date(fromDate);
//         const end = new Date(toDate);
//         const diffTime = Math.abs(end - start);
//         const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
//         const amount = dailyRate * diffDays;

//         const res = await fetch("/api/book-transaction", {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify({ roomNumber: roomNum, fromDate, toDate, amount }),
//         });
//         const data = await res.json();
//         setLoading(false);
//         if (data.error) {
//             alert("Error: " + data.error);
//         } else {
//             alert(`Payment successful! Transaction ID: ${data.transaction.transactionId}`);
//             // Redirect to the Payment History page
//             router.push("/payment");
//         }
//     };

//     if (!session) return <p>Please log in to proceed with booking.</p>;

//     return (
//         <div className="p-6">
//             <h1 className="text-3xl font-bold mb-4">Room Booking Payment</h1>
//             <p className="mb-4">User: {session.user.name}</p>
//             <p className="mb-4">Room Number: {roomNumber}</p>
//             <form onSubmit={handlePayment} className="flex flex-col max-w-md">
//                 <label className="mb-2">From Date:</label>
//                 <input
//                     type="date"
//                     value={fromDate}
//                     onChange={(e) => setFromDate(e.target.value)}
//                     required
//                     className="p-2 border mb-4"
//                 />
//                 <label className="mb-2">To Date:</label>
//                 <input
//                     type="date"
//                     value={toDate}
//                     onChange={(e) => setToDate(e.target.value)}
//                     required
//                     className="p-2 border mb-4"
//                 />
//                 <button
//                     type="submit"
//                     className="bg-green-500 text-white p-2 rounded"
//                     disabled={loading}
//                 >
//                     {loading ? "Processing Payment..." : "Pay Now"}
//                 </button>
//             </form>
//         </div>
//     );
// }

"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";

export default function TransactionPage() {
    const { data: session } = useSession();
    const searchParams = useSearchParams();
    const roomNumber = searchParams.get("roomNumber");
    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handlePayment = async (e) => {
        e.preventDefault();
        setLoading(true);

        const roomNum = parseInt(roomNumber, 10);
        const dailyRate = roomNum <= 6 ? 5000 : 2000;

        const start = new Date(fromDate);
        const end = new Date(toDate);

        // Validate dates
        if (end <= start) {
            alert("End date must be after start date.");
            setLoading(false);
            return;
        }

        const diffTime = Math.abs(end - start);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        const amount = dailyRate * diffDays;

        try {
            const res = await fetch("/api/book-transaction", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ roomNumber: roomNum, fromDate, toDate, amount }),
            });

            let data;
            try {
                data = await res.json();
            } catch (err) {
                throw new Error("Server returned invalid JSON");
            }

            if (data.error) {
                alert("Error: " + data.error);
            } else {
                alert(`Payment successful! Transaction ID: ${data.transaction.transactionId}`);
                router.push("/payment");
            }
        } catch (err) {
            alert("An error occurred: " + err.message);
            console.error("Payment error:", err);
        }

        setLoading(false);
    };

    if (!session) return <p>Please log in to proceed with booking.</p>;

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-4">Room Booking Payment</h1>
            <p className="mb-4">User: {session.user.name}</p>
            <p className="mb-4">Room Number: {roomNumber}</p>
            <form onSubmit={handlePayment} className="flex flex-col max-w-md">
                <label className="mb-2">From Date:</label>
                <input
                    type="date"
                    value={fromDate}
                    onChange={(e) => setFromDate(e.target.value)}
                    required
                    min={new Date().toISOString().split("T")[0]}
                    className="p-2 border mb-4"
                />
                <label className="mb-2">To Date:</label>
                <input
                    type="date"
                    value={toDate}
                    onChange={(e) => setToDate(e.target.value)}
                    required
                    min={fromDate}
                    className="p-2 border mb-4"
                />
                <button
                    type="submit"
                    className="bg-green-500 text-white p-2 rounded"
                    disabled={loading}
                >
                    {loading ? "Processing Payment..." : "Pay Now"}
                </button>
            </form>
        </div>
    );
}
