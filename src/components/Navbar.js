// "use client";
// import Link from "next/link";
// import { signIn, useSession } from "next-auth/react";
// import { useRouter } from "next/navigation";
// import { signOut } from "next-auth/react";

// export default function Navbar() {
//     const { data: session, status } = useSession();
//     const router = useRouter();

//     const handleAuthClick = async () => {
//         if (!session) {

//             await signIn("google");
//         } else {
//             // If already signed in, redirect to dashboard
//             onClick = {() => signOut()
// }
//         }
//     };

// return (
//     <nav className="w-full bg-gray-800 text-white py-4">
//         <div className="container mx-auto flex justify-between items-center px-4">
//             {/* Site logo / title */}
//             <Link href="/" className="text-2xl font-bold">
//                 Luxe Escape
//             </Link>
//             {/* Navigation links */}
//             <div className="space-x-4 flex items-center">
//                 <Link href="/">Home</Link>
//                 <Link href="/rooms">Rooms</Link>
//                 <Link href="/dashboard">Profile</Link>
//                 <Link href="/payment">Payments</Link>
//                 {/* Authentication button */}
//                 <button
//                     onClick={handleAuthClick}
//                     className="ml-4 px-5 py-2 bg-red-500 rounded hover:bg-blue-600"
//                 >
//                     {!session ? "Login / Signup" : "Logout"}
//                 </button>
//             </div>
//         </div>
//     </nav>
// );
// }
"use client";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Navbar() {
    const { data: session, status } = useSession();
    const router = useRouter();

    const handleAuthClick = async () => {
        if (!session) {
            await signIn("google");
        } else {
            await signOut({ callbackUrl: "/" }); // optional: redirect to home after logout
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
                    <Link href="/dashboard">Profile</Link>
                    <Link href="/payment">Payments</Link>

                    {/* Auth Button */}
                    <button
                        onClick={handleAuthClick}
                        className="ml-4 px-5 py-2 bg-red-500 rounded hover:bg-red-600"
                    >
                        {session ? "Logout" : "Login / Signup"}
                    </button>
                </div>
            </div>
        </nav>
    );
}
