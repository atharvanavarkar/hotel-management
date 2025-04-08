"use client";
import Link from "next/link";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Navbar() {
    const { data: session, status } = useSession();
    const router = useRouter();

    const handleAuthClick = async () => {
        if (!session) {
            // Trigger sign in with Google
            await signIn("google");
        } else {
            // If already signed in, redirect to dashboard
            router.push("/dashboard");
        }
    };

    return (
        <nav className="w-full bg-gray-800 text-white py-4">
            <div className="container mx-auto flex justify-between items-center px-4">
                {/* Site logo / title */}
                <Link href="/" className="text-2xl font-bold">
                    Luxe Escape
                </Link>
                {/* Navigation links */}
                <div className="space-x-4 flex items-center">
                    <Link href="/">Home</Link>
                    <Link href="/rooms">Rooms</Link>
                    <Link href="/dashboard">Dashboard</Link>
                    <Link href="/payment">Payments</Link>
                    {/* Authentication button */}
                    <button
                        onClick={handleAuthClick}
                        className="ml-4 px-4 py-2 bg-blue-500 rounded hover:bg-blue-600"
                    >
                        {!session ? "Login / Signup" : "Dashboard"}
                    </button>
                </div>
            </div>
        </nav>
    );
}