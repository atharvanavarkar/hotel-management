"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignupPage() {
    const router = useRouter();
    const [form, setForm] = useState({ name: "", email: "", password: "" });
    const [error, setError] = useState("");

    const handleSignup = async (e) => {
        e.preventDefault();
        const res = await fetch("/api/auth/signup", {
            method: "POST",
            body: JSON.stringify(form),
        });

        const data = await res.json();

        if (res.ok) {
            router.push("/login");
        } else {
            setError(data.error || "Signup failed");
        }
    };

    return (
        <div className="max-w-md mx-auto mt-12 p-4 border rounded">
            <h1 className="text-xl font-bold mb-4">Sign Up</h1>
            <form onSubmit={handleSignup} className="space-y-4">
                <input
                    type="text"
                    placeholder="Name"
                    className="w-full p-2 border rounded"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    required
                />
                <input
                    type="email"
                    placeholder="Email"
                    className="w-full p-2 border rounded"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    className="w-full p-2 border rounded"
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                    required
                />
                <button className="bg-green-500 text-white px-4 py-2 rounded w-full" type="submit">
                    Sign Up
                </button>
                {error && <p className="text-red-500">{error}</p>}
            </form>
        </div>
    );
}