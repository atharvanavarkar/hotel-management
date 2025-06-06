"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const router = useRouter();
    const [form, setForm] = useState({ email: "", password: "" });
    const [error, setError] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();
        const res = await signIn("credentials", {
            ...form,
            redirect: false,
        });

        if (res.ok) router.push("/");
        else setError("Invalid credentials");
    };

    return (
        <div className="max-w-md mx-auto mt-12 p-4 border rounded">
            <h1 className="text-xl font-bold mb-4">Login</h1>
            <form onSubmit={handleLogin} className="space-y-4">
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
                <button className="bg-blue-500 text-white px-4 py-2 rounded w-full" type="submit">
                    Login
                </button>
                <button
                    type="button"
                    onClick={() => signIn("google")}
                    className="bg-red-500 text-white px-4 py-2 rounded w-full"
                >
                    Login with Google
                </button>
                {error && <p className="text-red-500">{error}</p>}
            </form>
        </div>
    );
}