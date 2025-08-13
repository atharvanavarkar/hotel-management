// "use client";

// import Link from "next/link";
// import { signIn, signOut, useSession } from "next-auth/react";
// import { useRouter } from "next/navigation";

// export default function Navbar() {
//     const { data: session } = useSession();
//     const router = useRouter();

//     const handleGoogleLogin = async () => {
//         await signIn("google");
//     };

//     const handleSignOut = async () => {
//         await signOut({ callbackUrl: "/" });
//     };

//     return (
//         <nav className="w-full bg-gray-800 text-white py-4">
//             <div className="container mx-auto flex justify-between items-center px-4">
//                 {/* Logo */}
//                 <Link href="/" className="text-2xl font-bold">
//                     Luxe Escape
//                 </Link>

//                 {/* Navigation Links */}
//                 <div className="space-x-4 flex items-center">
//                     <Link href="/">Home</Link>
//                     <Link href="/rooms">Rooms</Link>
//                     <Link href="/dashboard">Profile</Link>
//                     <Link href="/payment">Payments</Link>
//                     {session?.user?.isAdmin && <Link href="/admin">Admin</Link>}

//                     {/* Auth Buttons */}
//                     {!session ? (
//                         <>
//                             <button
//                                 onClick={() => router.push("/login")}
//                                 className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-700"
//                             >
//                                 Login
//                             </button>
//                             <button
//                                 onClick={() => router.push("/signup")}
//                                 className="px-4 py-2 bg-green-600 rounded hover:bg-green-700"
//                             >
//                                 Signup
//                             </button>
//                             <button
//                                 onClick={handleGoogleLogin}
//                                 className="px-4 py-2 bg-red-500 rounded hover:bg-red-600"
//                             >
//                                 Sign in with Google
//                             </button>
//                         </>
//                     ) : (
//                         <button
//                             onClick={handleSignOut}
//                             className="ml-4 px-5 py-2 bg-red-500 rounded hover:bg-red-600"
//                         >
//                             Logout
//                         </button>
//                     )}
//                 </div>
//             </div>
//         </nav>
//     );
// }
"use client";

import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function Navbar() {
    const { data: session } = useSession();
    const router = useRouter();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    // Handle scroll effect
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleGoogleLogin = async () => {
        await signIn("google");
    };

    const handleSignOut = async () => {
        await signOut({ callbackUrl: "/" });
    };

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <nav className={`w-full fixed top-0 z-50 transition-all duration-300 ${isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200'
            : 'bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900'
            }`}>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <Link
                        href="/"
                        className={`text-2xl font-bold transition-colors duration-300 ${isScrolled ? 'text-gray-900' : 'text-white'
                            }`}
                    >
                        <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                            Luxe
                        </span>
                        <span className={isScrolled ? 'text-gray-700' : 'text-gray-300'}>
                            Escape
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-1">
                        {['Home', 'Rooms', 'Profile', 'Review', 'Gallery'].map((item) => (
                            <Link
                                key={item}
                                href={
                                    item === 'Home'
                                        ? '/'
                                        : item === 'Profile'
                                            ? '/dashboard'
                                            :
                                            item === 'Review'
                                                ? '/reviews' : `/${item.toLowerCase()}`
                                }
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:scale-105 ${isScrolled
                                    ? 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                                    : 'text-gray-300 hover:bg-white/10 hover:text-white'
                                    }`}
                            >
                                {item}
                            </Link>
                        ))}

                        {session?.user?.isAdmin && (
                            <Link
                                href="/admin"
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:scale-105 ${isScrolled
                                    ? 'text-orange-600 hover:bg-orange-50 hover:text-orange-700'
                                    : 'text-orange-400 hover:bg-orange-500/10 hover:text-orange-300'
                                    }`}
                            >
                                Admin
                            </Link>
                        )}
                    </div>

                    {/* Desktop Auth Buttons */}
                    <div className="hidden md:flex items-center space-x-3">
                        {!session ? (
                            <>
                                <button
                                    onClick={() => router.push("/login")}
                                    className="px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 hover:scale-105 bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-blue-500/25"
                                >
                                    Login
                                </button>
                                <button
                                    onClick={() => router.push("/signup")}
                                    className="px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 hover:scale-105 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white shadow-lg hover:shadow-green-500/25"
                                >
                                    Sign Up
                                </button>
                                <button
                                    onClick={handleGoogleLogin}
                                    className="px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 hover:scale-105 bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 shadow-lg flex items-center space-x-2"
                                >
                                    <svg className="w-4 h-4" viewBox="0 0 24 24">
                                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                                    </svg>
                                    <span>Google</span>
                                </button>
                            </>
                        ) : (
                            <div className="flex items-center space-x-4">
                                <div className="flex items-center space-x-2">
                                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                                        <span className="text-white text-sm font-medium">
                                            {session.user?.name?.[0] || session.user?.email?.[0] || 'U'}
                                        </span>
                                    </div>
                                    <span className={`text-sm font-medium ${isScrolled ? 'text-gray-700' : 'text-gray-300'
                                        }`}>
                                        {session.user?.name || session.user?.email?.split('@')[0]}
                                    </span>
                                </div>
                                <button
                                    onClick={handleSignOut}
                                    className="px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 hover:scale-105 bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white shadow-lg hover:shadow-red-500/25"
                                >
                                    Logout
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={toggleMobileMenu}
                        className={`md:hidden p-2 rounded-lg transition-colors duration-200 ${isScrolled
                            ? 'text-gray-700 hover:bg-gray-100'
                            : 'text-white hover:bg-white/10'
                            }`}
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            {isMobileMenuOpen ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </button>
                </div>

                {/* Mobile Menu */}
                {isMobileMenuOpen && (
                    <div className={`md:hidden absolute top-full left-0 right-0 transition-all duration-300 ${isScrolled
                        ? 'bg-white/95 backdrop-blur-md border-b border-gray-200'
                        : 'bg-gray-900/95 backdrop-blur-md'
                        }`}>
                        <div className="px-4 py-6 space-y-4">
                            {/* Mobile Navigation Links */}
                            {['Home', 'Rooms', 'Profile', 'Payments'].map((item) => (
                                <Link
                                    key={item}
                                    href={item === 'Profile' ? '/dashboard' : `/${item.toLowerCase()}`}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className={`block px-4 py-3 rounded-lg text-base font-medium transition-colors duration-200 ${isScrolled
                                        ? 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                                        : 'text-gray-300 hover:bg-white/10 hover:text-white'
                                        }`}
                                >
                                    {item}
                                </Link>
                            ))}

                            {session?.user?.isAdmin && (
                                <Link
                                    href="/admin"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className={`block px-4 py-3 rounded-lg text-base font-medium transition-colors duration-200 ${isScrolled
                                        ? 'text-orange-600 hover:bg-orange-50 hover:text-orange-700'
                                        : 'text-orange-400 hover:bg-orange-500/10 hover:text-orange-300'
                                        }`}
                                >
                                    Admin
                                </Link>
                            )}

                            <hr className={`my-4 ${isScrolled ? 'border-gray-200' : 'border-gray-700'}`} />

                            {/* Mobile Auth Section */}
                            {!session ? (
                                <div className="space-y-3">
                                    <button
                                        onClick={() => {
                                            router.push("/login");
                                            setIsMobileMenuOpen(false);
                                        }}
                                        className="w-full px-4 py-3 text-base font-medium rounded-lg transition-all duration-200 bg-blue-600 hover:bg-blue-700 text-white shadow-lg"
                                    >
                                        Login
                                    </button>
                                    <button
                                        onClick={() => {
                                            router.push("/signup");
                                            setIsMobileMenuOpen(false);
                                        }}
                                        className="w-full px-4 py-3 text-base font-medium rounded-lg transition-all duration-200 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white shadow-lg"
                                    >
                                        Sign Up
                                    </button>
                                    <button
                                        onClick={() => {
                                            handleGoogleLogin();
                                            setIsMobileMenuOpen(false);
                                        }}
                                        className="w-full px-4 py-3 text-base font-medium rounded-lg transition-all duration-200 bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 shadow-lg flex items-center justify-center space-x-2"
                                    >
                                        <svg className="w-5 h-5" viewBox="0 0 24 24">
                                            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                                        </svg>
                                        <span>Sign in with Google</span>
                                    </button>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    <div className="flex items-center space-x-3 px-4 py-3">
                                        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                                            <span className="text-white text-lg font-medium">
                                                {session.user?.name?.[0] || session.user?.email?.[0] || 'U'}
                                            </span>
                                        </div>
                                        <div>
                                            <p className={`font-medium ${isScrolled ? 'text-gray-900' : 'text-white'}`}>
                                                {session.user?.name || 'User'}
                                            </p>
                                            <p className={`text-sm ${isScrolled ? 'text-gray-600' : 'text-gray-400'}`}>
                                                {session.user?.email}
                                            </p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => {
                                            handleSignOut();
                                            setIsMobileMenuOpen(false);
                                        }}
                                        className="w-full px-4 py-3 text-base font-medium rounded-lg transition-all duration-200 bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white shadow-lg"
                                    >
                                        Logout
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
}