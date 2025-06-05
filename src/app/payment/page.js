// "use client";
// import ProtectedPage from "@/components/ProtectedPage";
// import { useSession } from "next-auth/react";

// export default function Payment() {
//     const { data: session } = useSession();

//     return (
//         <ProtectedPage>
//             <div className="p-6">
//                 <h1 className="text-4xl font-bold">Payment History</h1>
//                 <p>Welcome, {session?.user?.name}</p>
//                 {/* This is where you'll display transaction history */}
//                 <p>Your past transactions will be displayed here...</p>
//             </div>
//         </ProtectedPage>
//     );
// }
// app/payment/page.js



// "use client";

// import ProtectedPage from "@/components/ProtectedPage";
// import { useSession } from "next-auth/react";
// import { useEffect, useState } from "react";

// export default function Payment() {
//     const { data: session } = useSession();
//     const [transactions, setTransactions] = useState([]);

//     useEffect(() => {
//         async function fetchTransactions() {
//             const res = await fetch("/api/user-transactions");
//             const data = await res.json();
//             if (!data.error) {
//                 setTransactions(data.transactions);
//             }
//         }
//         fetchTransactions();
//     }, []);

//     if (!session) return <p>Please log in to view payment history.</p>;

//     return (
//         <ProtectedPage>
//             <div className="p-6">
//                 <h1 className="text-4xl font-bold">Payment History</h1>
//                 <p>Welcome, {session.user.name}</p>
//                 {transactions.length === 0 ? (
//                     <p>No transactions found.</p>
//                 ) : (
//                     <div className="mt-4">
//                         {transactions.map((txn, index) => (
//                             <div key={index} className="border p-4 rounded-md mb-4">
//                                 <p>
//                                     <strong>Room Number:</strong> {txn.roomNumber}
//                                 </p>
//                                 <p>
//                                     <strong>Transaction ID:</strong> {txn.transactionId}
//                                 </p>
//                                 <p>
//                                     <strong>Amount:</strong> ₹{txn.amount}
//                                 </p>
//                                 <p>
//                                     <strong>Booking Dates:</strong>{" "}
//                                     {new Date(txn.fromDate).toLocaleDateString()} -{" "}
//                                     {new Date(txn.toDate).toLocaleDateString()}
//                                 </p>
//                                 <p>
//                                     <strong>Date:</strong>{" "}
//                                     {new Date(txn.date).toLocaleDateString()}
//                                 </p>
//                             </div>
//                         ))}
//                     </div>
//                 )}
//             </div>
//         </ProtectedPage>
//     );
// }

"use client";

import ProtectedPage from "@/components/ProtectedPage";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function Payment() {
    const { data: session } = useSession();
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        async function fetchTransactions() {
            const res = await fetch("/api/user-transactions");
            const data = await res.json();
            if (!data.error) {
                setTransactions(data.transactions);
            }
        }
        fetchTransactions();
    }, []);

    if (!session) return <p>Please log in to view payment history.</p>;

    return (
        <ProtectedPage>
            <div className="p-6">
                <h1 className="text-4xl font-bold">Payment History</h1>
                <p>Welcome, {session.user.name}</p>
                {transactions.length === 0 ? (
                    <p>No transactions found.</p>
                ) : (
                    <div className="mt-4">
                        {transactions.map((txn, index) => (
                            <div key={index} className="border p-4 rounded-md mb-4">
                                <p><strong>Room Number:</strong> {txn.roomNumber}</p>
                                <p><strong>Transaction ID:</strong> {txn.transactionId}</p>
                                <p><strong>Amount:</strong> ₹{txn.amount}</p>
                                <p><strong>Booking Dates:</strong> {new Date(txn.fromDate).toLocaleDateString()} - {new Date(txn.toDate).toLocaleDateString()}</p>
                                <p><strong>Date:</strong> {new Date(txn.date).toLocaleDateString()}</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </ProtectedPage>
    );
}
