"use client";
import { useState } from "react";

export default function Gallery() {
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [selectedImage, setSelectedImage] = useState(null);

    const categories = [
        { id: "all", name: "All", icon: "🏨" },
        { id: "rooms", name: "Rooms", icon: "🛏️" },
        { id: "dining", name: "Dining", icon: "🍽️" },
        { id: "spa", name: "Spa & Wellness", icon: "🧘" },
        { id: "amenities", name: "Amenities", icon: "🏊" },
        { id: "events", name: "Events", icon: "🎉" }
    ];

    const images = [
        // Rooms
        { id: 1, category: "rooms", title: "Presidential Suite", description: "Luxurious presidential suite with panoramic city views", src: "https://images.unsplash.com/photo-1611892440504-42a792e24d32?w=800" },
        { id: 2, category: "rooms", title: "Ocean View Suite", description: "Elegant suite overlooking the pristine coastline", src: "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800" },
        { id: 3, category: "rooms", title: "Deluxe Room", description: "Comfortable deluxe accommodation with modern amenities", src: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800" },

        // Dining
        { id: 4, category: "dining", title: "Fine Dining Restaurant", description: "Award-winning culinary experience with world-class chefs", src: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800" },
        { id: 5, category: "dining", title: "Private Dining", description: "Intimate dining experience for special occasions", src: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800" },

        { id: 6, category: "spa", title: "Luxury Spa Treatment", description: "Rejuvenating treatments in our world-class spa facility", src: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800" },
        { id: 7, category: "spa", title: "Wellness Center", description: "State-of-the-art fitness and wellness facilities", src: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800" },

        // Amenities
        { id: 8, category: "amenities", title: "Infinity Pool", description: "Stunning infinity pool with panoramic views", src: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800" },
        { id: 9, category: "amenities", title: "Hotel Lobby", description: "Grand lobby showcasing elegant architecture and design", src: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800" },
        { id: 10, category: "amenities", title: "Garden Terrace", description: "Beautifully landscaped gardens and outdoor spaces", src: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800" },

        // Events
        { id: 11, category: "events", title: "Wedding Venue", description: "Perfect setting for your dream wedding celebration", src: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&q=80" },
        { id: 12, category: "events", title: "Conference Hall", description: "Modern conference facilities for business events", src: "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=800" },
    ];

    const filteredImages = selectedCategory === "all"
        ? images
        : images.filter(img => img.category === selectedCategory);

    return (
        <div className="min-h-screen bg-gray-50 pt-20">
            {/* Hero Section */}
            <div className="relative bg-gradient-to-r from-gray-900 to-gray-700 text-white py-24">
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="container mx-auto px-4 relative z-10 text-center">
                    <h1 className="text-5xl md:text-6xl font-bold mb-6">
                        <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                            Gallery
                        </span>
                    </h1>
                    <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                        Discover the elegance and luxury that awaits you at Luxe Escape
                    </p>
                </div>
            </div>

            {/* Category Filter */}
            <div className="container mx-auto px-4 py-12">
                <div className="flex flex-wrap justify-center gap-4 mb-12">
                    {categories.map((category) => (
                        <button
                            key={category.id}
                            onClick={() => setSelectedCategory(category.id)}
                            className={`px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 hover:scale-105 ${selectedCategory === category.id
                                ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                                : 'bg-white text-gray-700 hover:bg-gray-100 shadow-md'
                                }`}
                        >
                            <span className="mr-2">{category.icon}</span>
                            {category.name}
                        </button>
                    ))}
                </div>

                {/* Image Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredImages.map((image) => (
                        <div
                            key={image.id}
                            className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 cursor-pointer"
                            onClick={() => setSelectedImage(image)}
                        >
                            <img
                                src={image.src}
                                alt={image.title}
                                className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <div className="absolute bottom-4 left-4 right-4 text-white">
                                    <h3 className="font-semibold text-lg mb-1">{image.title}</h3>
                                    <p className="text-sm text-gray-300">{image.description}</p>
                                </div>
                            </div>
                            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <div className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Stats Section */}
                <div className="mt-20 bg-gradient-to-r from-blue-600 to-purple-700 rounded-2xl p-8 text-white">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
                        <div>
                            <div className="text-3xl font-bold mb-2">50+</div>
                            <div className="text-blue-200">Luxury Rooms</div>
                        </div>
                        <div>
                            <div className="text-3xl font-bold mb-2">5</div>
                            <div className="text-blue-200">Star Rating</div>
                        </div>
                        <div>
                            <div className="text-3xl font-bold mb-2">10+</div>
                            <div className="text-blue-200">Amenities</div>
                        </div>
                        <div>
                            <div className="text-3xl font-bold mb-2">24/7</div>
                            <div className="text-blue-200">Concierge</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal for Image Preview */}
            {selectedImage && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90" onClick={() => setSelectedImage(null)}>
                    <div className="relative max-w-4xl w-full max-h-[90vh] bg-white rounded-2xl overflow-hidden" onClick={e => e.stopPropagation()}>
                        <button
                            onClick={() => setSelectedImage(null)}
                            className="absolute top-4 right-4 z-10 w-10 h-10 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-colors duration-200"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                        <img
                            src={selectedImage.src}
                            alt={selectedImage.title}
                            className="w-full h-96 object-cover"
                        />
                        <div className="p-6">
                            <h2 className="text-2xl font-bold text-gray-900 mb-2">{selectedImage.title}</h2>
                            <p className="text-gray-600">{selectedImage.description}</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}