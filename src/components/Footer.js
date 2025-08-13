// "use client";
// export default function Footer() {
//     return (
//         <footer className="w-full bg-gray-800 text-white py-4 mt-auto">
//             <div className="container mx-auto text-center">
//                 <p>© {new Date().getFullYear()} Luxe Escape. All rights reserved.</p>
//             </div>
//         </footer>
//     );
// }
"use client";
import Link from "next/link";
import { useState } from "react";

export default function Footer() {
    const [email, setEmail] = useState("");
    const [isSubscribed, setIsSubscribed] = useState(false);

    const handleNewsletterSubmit = (e) => {
        e.preventDefault();
        if (email) {
            setIsSubscribed(true);
            setEmail("");
            setTimeout(() => setIsSubscribed(false), 3000);
        }
    };

    return (
        <footer className="w-full bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white mt-auto">
            {/* Main Footer Content */}
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                    {/* Brand Section */}
                    <div className="lg:col-span-1 space-y-6">
                        <div>
                            <h3 className="text-3xl font-bold mb-4">
                                <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                                    Luxe
                                </span>
                                <span className="text-gray-300">Escape</span>
                            </h3>
                            <p className="text-gray-400 text-sm leading-relaxed">
                                Experience unparalleled luxury and comfort at our premium hotel.
                                Where every stay becomes an unforgettable escape.
                            </p>
                        </div>

                        {/* Social Media Icons */}
                        <div className="flex space-x-4">
                            {[
                                { name: 'Facebook', icon: 'M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z' },
                                { name: 'Twitter', icon: 'M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z' },
                                { name: 'Instagram', icon: 'M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987c6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM12.017 21.986c-5.51 0-9.999-4.488-9.999-9.999c0-5.51 4.489-9.999 9.999-9.999c5.51 0 9.999 4.489 9.999 9.999c0 5.511-4.489 9.999-9.999 9.999z M15.996 6.9c-.147 0-.292.011-.434.032c-.142.021-.288.052-.428.094c-.14.042-.274.097-.402.165c-.128.068-.25.149-.365.243c-.115.094-.222.201-.316.316c-.094.115-.175.237-.243.365c-.068.128-.123.262-.165.402c-.042.14-.073.286-.094.428c-.021.142-.032.287-.032.434v6.2c0 .147.011.292.032.434c.021.142.052.288.094.428c.042.14.097.274.165.402c.068.128.149.25.243.365c.094.115.201.222.316.316c.115.094.237.175.365.243c.128.068.262.123.402.165c.14.042.286.073.428.094c.142.021.287.032.434.032h.001c.147 0 .292-.011.434-.032c.142-.021.288-.052.428-.094c.14-.042.274-.097.402-.165c.128-.068.25-.149.365-.243c.115-.094.222-.201.316-.316c.094-.115.175-.237.243-.365c.068-.128.123-.262.165-.402c.042-.14.073-.286.094-.428c.021-.142.032-.287.032-.434v-6.2c0-.147-.011-.292-.032-.434c-.021-.142-.052-.288-.094-.428c-.042-.14-.097-.274-.165-.402c-.068-.128-.149-.25-.243-.365c-.094-.115-.201-.222-.316-.316c-.115-.094-.237-.175-.365-.243c-.128-.068-.262-.123-.402-.165c-.14-.042-.286-.073-.428-.094c-.142-.021-.287-.032-.434-.032H15.996z M15.996 8.9h.004c.139 0 .279.006.418.018c.139.012.277.03.414.054c.137.024.271.055.403.093c.132.038.26.083.385.135c.125.052.245.111.361.178c.116.067.226.142.332.225c.106.083.206.173.299.271c.093.098.179.203.258.315c.079.112.15.231.212.355c.062.124.116.253.161.387c.045.134.081.271.107.411c.026.14.043.281.051.423c.008.142.012.284.012.426v.002c0 .142-.004.284-.012.426c-.008.142-.025.283-.051.423c-.026.14-.062.277-.107.411c-.045.134-.099.263-.161.387c-.062.124-.133.243-.212.355c-.079.112-.165.217-.258.315c-.093.098-.193.188-.299.271c-.106.083-.216.158-.332.225c-.116.067-.236.126-.361.178c-.125.052-.253.097-.385.135c-.132.038-.266.069-.403.093c-.137.024-.275.042-.414.054c-.139.012-.279.018-.418.018H15.996c-.139 0-.279-.006-.418-.018c-.139-.012-.277-.03-.414-.054c-.137-.024-.271-.055-.403-.093c-.132-.038-.26-.083-.385-.135c-.125-.052-.245-.111-.361-.178c-.116-.067-.226-.142-.332-.225c-.106-.083-.206-.173-.299-.271c-.093-.098-.179-.203-.258-.315c-.079-.112-.15-.231-.212-.355c-.062-.124-.116-.253-.161-.387c-.045-.134-.081-.271-.107-.411c-.026-.14-.043-.281-.051-.423c-.008-.142-.012-.284-.012-.426v-.002c0-.142.004-.284.012-.426c.008-.142.025-.283.051-.423c.026-.14.062-.277.107-.411c.045-.134.099-.263.161-.387c.062-.124.133-.243.212-.355c.079-.112.165-.217.258-.315c.093-.098.193-.188.299-.271c.106-.083.216-.158.332-.225c.116-.067.236-.126.361-.178c.125-.052.253-.097.385-.135c.132-.038.266-.069.403-.093c.137-.024.275-.042.414-.054c.139-.012.279-.018.418-.018z' },
                                { name: 'LinkedIn', icon: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z' }
                            ].map((social) => (
                                <a
                                    key={social.name}
                                    href="#"
                                    className="w-10 h-10 bg-gray-700 hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-600 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg"
                                    aria-label={social.name}
                                >
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d={social.icon} />
                                    </svg>
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="space-y-6">
                        <h4 className="text-lg font-semibold text-white border-b border-gray-700 pb-2">
                            Quick Links
                        </h4>
                        <ul className="space-y-3">
                            {[
                                { name: 'Home', href: '/' },
                                { name: 'Rooms & Suites', href: '/rooms' },
                                { name: 'Gallery', href: '/gallery' },
                                { name: 'Reviews', href: '/reviews' },
                            ].map((link) => (
                                <li key={link.name}>
                                    <Link
                                        href={link.href}
                                        className="text-gray-400 hover:text-white hover:translate-x-2 transition-all duration-300 inline-block"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Services */}
                    <div className="space-y-6">
                        <h4 className="text-lg font-semibold text-white border-b border-gray-700 pb-2">
                            Services
                        </h4>
                        <ul className="space-y-3">
                            {[
                                'Luxury Accommodation',
                                'Spa & Wellness',
                                'Fine Dining',
                                'Event Planning',
                            ].map((service) => (
                                <li key={service} className="text-gray-400 hover:text-white transition-colors duration-300">
                                    {service}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Newsletter & Contact */}
                    <div className="space-y-6">
                        <h4 className="text-lg font-semibold text-white border-b border-gray-700 pb-2">
                            Stay Connected
                        </h4>

                        {/* Newsletter */}

                        {/* Contact Info */}
                        <div className="space-y-3 pt-4">
                            <div className="flex items-center space-x-3 text-gray-400">
                                <svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                                </svg>
                                <span className="text-sm">contact@luxeescape.com</span>
                            </div>
                            <div className="flex items-center space-x-3 text-gray-400">
                                <svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                                </svg>
                                <span className="text-sm">+1 (555) 123-4567</span>
                            </div>
                            <div className="flex items-start space-x-3 text-gray-400">
                                <svg className="w-5 h-5 text-blue-500 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                                </svg>
                                <span className="text-sm">123 Luxury Avenue<br />Paradise City, PC 12345</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-gray-700">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                        <p className="text-gray-400 text-sm text-center md:text-left">
                            © {new Date().getFullYear()} Luxe Escape. All rights reserved.
                        </p>

                        <div className="flex flex-wrap justify-center md:justify-end space-x-6 text-sm">
                            {[
                                'Privacy Policy',
                                'Terms of Service',
                                'Cookie Policy',
                                'Accessibility'
                            ].map((item, index, array) => (
                                <span key={item}>
                                    <Link
                                        href={`/${item.toLowerCase().replace(/\s+/g, '-')}`}
                                        className="text-gray-400 hover:text-white transition-colors duration-300"
                                    >
                                        {item}
                                    </Link>
                                    {index < array.length - 1 && (
                                        <span className="text-gray-600 ml-6">|</span>
                                    )}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Decorative Wave */}
            <div className="absolute bottom-0 left-0 right-0 overflow-hidden">
                <svg
                    className="absolute bottom-0 left-0 right-0 h-12 w-full text-gray-800 opacity-20"
                    preserveAspectRatio="none"
                    viewBox="0 0 1200 120"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
                        opacity=".25"
                        fill="currentColor"
                    />
                    <path
                        d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
                        opacity=".5"
                        fill="currentColor"
                    />
                    <path
                        d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"
                        fill="currentColor"
                    />
                </svg>
            </div>
        </footer>
    );
}