"use client";
export default function Footer() {
    return (
        <footer className="w-full bg-gray-800 text-white py-4 mt-auto">
            <div className="container mx-auto text-center">
                <p>© {new Date().getFullYear()} Luxe Escape. All rights reserved.</p>
            </div>
        </footer>
    );
}