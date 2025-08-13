"use client";

import { useEffect, useMemo, useState } from "react";

const seedReviews = [
    {
        id: 1,
        name: "Alice Johnson",
        rating: 5,
        date: "March 15, 2024",
        title: "Amazing stay!",
        comment: "The villa was beautiful and the service was top-notch.",
    },
    {
        id: 2,
        name: "Sam Patel",
        rating: 5,
        date: "March 10, 2024",
        title: "Perfect weekend",
        comment: "Lovely staff, superb breakfast.",
    },
];

export default function ReviewsPage() {
    const [reviews, setReviews] = useState([]);
    const [newReview, setNewReview] = useState({
        name: "",
        email: "",
        rating: 5,
        title: "",
        comment: "",
    });
    const [showWriteReview, setShowWriteReview] = useState(false);

    // Load reviews once
    useEffect(() => {
        try {
            const stored = localStorage.getItem("reviews");
            if (stored) setReviews(JSON.parse(stored));
            else setReviews(seedReviews);
        } catch {
            setReviews(seedReviews);
        }
    }, []);

    // Persist reviews
    useEffect(() => {
        try {
            localStorage.setItem("reviews", JSON.stringify(reviews));
        } catch { }
    }, [reviews]);

    const stats = useMemo(() => {
        const total = reviews.length;
        const sum = reviews.reduce((a, r) => a + (Number(r.rating) || 0), 0);
        const average = total ? Math.round((sum / total) * 10) / 10 : 0;
        const counts = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
        reviews.forEach((r) => {
            const k = Math.min(5, Math.max(1, Number(r.rating) || 0));
            counts[k]++;
        });
        const breakdown = Object.fromEntries(
            [5, 4, 3, 2, 1].map((k) => [k, total ? Math.round((counts[k] / total) * 100) : 0])
        );
        return { average, total, breakdown };
    }, [reviews]);

    const renderStars = (rating, size = "w-5 h-5") => (
        <div className="flex items-center">
            {[1, 2, 3, 4, 5].map((s) => (
                <svg
                    key={s}
                    className={`${size} ${s <= rating ? "text-yellow-400" : "text-gray-300"}`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
            ))}
        </div>
    );

    const handleSubmitReview = (e) => {
        e.preventDefault();
        const { name, email, title, comment, rating } = newReview;
        if (!name || !email || !title || !comment) {
            alert("Please fill all fields.");
            return;
        }
        const newItem = {
            id: Date.now(),
            name,
            email,
            title,
            comment,
            rating: Math.max(1, Math.min(5, Number(rating) || 5)),
            date: new Date().toLocaleDateString(),
        };
        // newest-first
        setReviews((prev) => [newItem, ...prev]);
        setNewReview({ name: "", email: "", rating: 5, title: "", comment: "" });
        setShowWriteReview(false);
    };

    // Helpful + persist
    const handleHelpful = (id) => {
        setReviews((prev) => prev.map((r) => (r.id === id ? { ...r, helpful: (r.helpful || 0) + 1 } : r)));
    };

    return (
        <div className="w-full bg-gray-50">
            {/* full-bleed hero */}
            <div className="w-full bg-gradient-to-r from-gray-900 to-gray-700 text-white py-20">
                <div className="max-w-screen-xl mx-auto px-6">
                    <h1 className="text-5xl font-bold">
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">Reviews</span>
                    </h1>
                    <p className="mt-3 text-gray-300 max-w-2xl">
                        See what our guests are saying about their luxurious experiences.
                    </p>
                </div>
            </div>

            {/* main content: two-column grid with fixed left width on lg */}
            <div className="w-full max-w-screen-xl mx-auto px-6 py-12">
                <div
                    className="grid grid-cols-1 gap-8"
                    // use arbitrary property for a fixed left column on large screens:
                    // we fall back to a single column for small screens
                    style={{ gridTemplateColumns: window.innerWidth >= 1024 ? "360px 1fr" : "1fr" }}
                >
                    {/* LEFT: summary (sticky on large screens) */}
                    <aside className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl p-6 lg:sticky lg:top-24">
                        <div className="text-left">
                            <div className="text-4xl font-bold">{stats.average || 0}</div>
                            <div className="mt-2">{renderStars(Math.round(stats.average || 0), "w-5 h-5")}</div>
                            <div className="mt-2 text-sm text-blue-100">Based on {stats.total} review{stats.total !== 1 ? "s" : ""}</div>

                            <div className="mt-6 space-y-1">
                                <div className="text-sm">Rating breakdown</div>
                                {[5, 4, 3, 2, 1].map((r) => (
                                    <div key={r} className="flex items-center gap-3 text-sm">
                                        <div className="w-6 text-right font-medium">{r}</div>
                                        <div className="flex-1 bg-white/20 h-2 rounded-full">
                                            <div className="bg-yellow-400 h-2 rounded-full" style={{ width: `${stats.breakdown[r]}%` }} />
                                        </div>
                                        <div className="w-12 text-right">{stats.breakdown[r]}%</div>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-6">
                                <button
                                    onClick={() => setShowWriteReview(true)}
                                    className="w-full px-4 py-3 bg-white text-blue-600 rounded-lg font-semibold shadow"
                                >
                                    Write a Review
                                </button>
                            </div>
                        </div>
                    </aside>

                    {/* RIGHT: reviews list */}
                    <main className="space-y-6">
                        {reviews.length === 0 ? (
                            <div className="bg-white p-6 rounded-lg shadow">No reviews yet.</div>
                        ) : (
                            reviews.map((rv) => (
                                <article key={rv.id} className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
                                    <div className="flex justify-between items-start mb-3">
                                        <div>
                                            <h3 className="text-lg font-semibold">{rv.title}</h3>
                                            <div className="text-sm text-gray-500">— {rv.name} • {rv.date}</div>
                                        </div>
                                        <div>{renderStars(rv.rating)}</div>
                                    </div>

                                    <p className="text-gray-700 mb-4">{rv.comment}</p>

                                    <div className="flex items-center justify-between text-sm">
                                        <button
                                            onClick={() => handleHelpful(rv.id)}
                                            className="text-gray-500 hover:text-blue-600 flex items-center gap-2"
                                        >
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                                            </svg>
                                            Helpful ({rv.helpful || 0})
                                        </button>

                                        <div className="text-xs text-gray-400">Verified Guest: {rv.verified ? "Yes" : "No"}</div>
                                    </div>
                                </article>
                            ))
                        )}
                    </main>
                </div>
            </div>

            {/* modal */}
            {showWriteReview && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-6">
                    <div className="bg-white rounded-lg w-full max-w-md p-6">
                        <h2 className="text-xl font-semibold mb-4">Write a Review</h2>
                        <form onSubmit={handleSubmitReview} className="space-y-3">
                            <input
                                className="w-full border px-3 py-2 rounded"
                                placeholder="Name"
                                value={newReview.name}
                                onChange={(e) => setNewReview((s) => ({ ...s, name: e.target.value }))}
                                required
                            />
                            <input
                                className="w-full border px-3 py-2 rounded"
                                placeholder="Email"
                                type="email"
                                value={newReview.email}
                                onChange={(e) => setNewReview((s) => ({ ...s, email: e.target.value }))}
                                required
                            />
                            <input
                                className="w-full border px-3 py-2 rounded"
                                placeholder="Title"
                                value={newReview.title}
                                onChange={(e) => setNewReview((s) => ({ ...s, title: e.target.value }))}
                                required
                            />
                            <textarea
                                className="w-full border px-3 py-2 rounded"
                                placeholder="Comment"
                                rows={4}
                                value={newReview.comment}
                                onChange={(e) => setNewReview((s) => ({ ...s, comment: e.target.value }))}
                                required
                            />
                            <div className="flex items-center gap-3">
                                <label className="text-sm">Rating</label>
                                <select
                                    className="border px-2 py-1 rounded"
                                    value={newReview.rating}
                                    onChange={(e) => setNewReview((s) => ({ ...s, rating: parseInt(e.target.value) }))}
                                >
                                    {[1, 2, 3, 4, 5].map((n) => (
                                        <option key={n} value={n}>
                                            {n}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="flex justify-end gap-3 mt-2">
                                <button type="button" onClick={() => setShowWriteReview(false)} className="px-4 py-2 rounded border">
                                    Cancel
                                </button>
                                <button type="submit" className="px-4 py-2 rounded bg-blue-600 text-white">
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
