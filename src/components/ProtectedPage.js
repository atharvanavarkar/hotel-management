"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProtectedPage({ children }) {
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (status === "loading") return;
        if (!session) router.push("/api/auth/signin"); // redirect to sign in if not logged in
    }, [session, status, router]);

    if (!session) {
        return <p>Loading...</p>;
    }

    return children;
}