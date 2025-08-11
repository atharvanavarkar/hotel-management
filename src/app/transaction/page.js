"use client";

import { Suspense } from "react";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";

function TransactionPage() {
    const { data: session } = useSession();
    const searchParams = useSearchParams();
    const roomNumber = searchParams.get("roomNumber");
    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const razorpayKey = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;

    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.async = true;
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    const handlePayment = async (e) => {
        e.preventDefault();
        setLoading(true);

        const roomNum = parseInt(roomNumber, 10);
        const dailyRate = roomNum <= 6 ? 1 : 2000;

        const start = new Date(fromDate);
        const end = new Date(toDate);

        if (end <= start) {
            alert("End date must be after start date.");
            setLoading(false);
            return;
        }

        const diffTime = Math.abs(end - start);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        const amount = dailyRate * diffDays;

        try {
            const res = await fetch("/api/create-order", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ amount }),
            });

            const data = await res.json();

            if (!window.Razorpay) {
                alert("Razorpay SDK not loaded.");
                setLoading(false);
                return;
            }

            const options = {
                key: razorpayKey,
                amount: data.amount,
                currency: "INR",
                name: "Hotel Booking",
                description: `Payment for Room ${roomNum}`,
                order_id: data.id,
                handler: async function (response) {
                    const verifyRes = await fetch("/api/payment-verify", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            razorpay_order_id: response.razorpay_order_id,
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_signature: response.razorpay_signature,
                            roomNumber: roomNum,
                            fromDate,
                            toDate,
                            amount,
                        }),
                    });

                    const verifyData = await verifyRes.json();
                    if (verifyData.success) {
                        alert("Payment successful!");
                        router.push("/payment");
                    } else {
                        alert("Payment verification failed.");
                    }
                },
                prefill: {
                    name: session?.user?.name || "",
                    email: session?.user?.email || "",
                },
                theme: {
                    color: "#38bdf8",
                },
            };

            const razorpay = new window.Razorpay(options);
            razorpay.open();
        } catch (err) {
            console.error("Payment error:", err);
            alert("Something went wrong. Please try again.");
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

export default function TransactionPageWrapper() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <TransactionPage />
        </Suspense>
    );
}