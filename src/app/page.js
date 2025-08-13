"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 }); // start centered
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    setMounted(true);

    const n = 20;
    const p = Array.from({ length: n }).map(() => {
      const left = Math.random() * 100;
      const top = Math.random() * 100;
      const duration = 3 + Math.random() * 4;
      const delay = Math.random() * 2;
      const size = 1 + Math.random() * 2;
      const opacity = 0.12 + Math.random() * 0.28;
      return { left, top, duration, delay, size, opacity };
    });
    setParticles(p);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mounted]);

  const stats = [
    { number: "500+", label: "Happy Guests" },
    { number: "4.9", label: "Rating" },
    { number: "24/7", label: "Service" },
  ];

  return (
    <main className="relative min-h-screen overflow-hidden">
      {/* FULL-BLEED HERO BACKGROUND (breaks out of any parent max-width) */}
      <div className="relative left-1/2 -translate-x-1/2 w-screen">
        {/* background gradient covers the whole screen width */}
        <div className="relative min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
          {/* Animated Background - render only after mount to avoid SSR/client mismatch */}
          {mounted && (
            <>
              <div className="absolute inset-0 pointer-events-none">
                {/* radial spotlight follows mouse */}
                <div
                  className="absolute inset-0 opacity-30 pointer-events-none transition-all"
                  style={{
                    background: `radial-gradient(600px circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(120,119,198,0.25), transparent 40%)`,
                  }}
                />

                {/* colored glows (static positions) */}
                <div className="absolute top-10 left-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" />
                <div className="absolute top-32 right-10 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" />
                <div className="absolute bottom-10 left-1/3 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" />
              </div>

              {/* Floating Particles (client-rendered only) */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {particles.map((pt, i) => (
                  <div
                    key={i}
                    className="absolute rounded-full bg-white"
                    style={{
                      left: `${pt.left}%`,
                      top: `${pt.top}%`,
                      width: `${pt.size}px`,
                      height: `${pt.size}px`,
                      opacity: pt.opacity,
                      animation: `float ${pt.duration}s ease-in-out ${pt.delay}s infinite`,
                    }}
                    aria-hidden="true"
                  />
                ))}
              </div>
            </>
          )}

          {/* HERO CONTENT (centered inside max width) */}
          <section className="relative z-10 flex items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8">
            <div
              className={`w-full text-center transition-all duration-700 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                }`}
            >
              {/* Premium Badge */}
              <div className="inline-flex items-center px-4 py-2 mb-8 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white/90 text-sm font-medium">
                <div className="w-2 h-2 bg-yellow-400 rounded-full mr-2 animate-pulse" />
                Premium Luxury Experience
              </div>

              {/* Centered content container: keeps text readable on large screens */}
              <div className="max-w-screen-xl mx-auto">
                {/* Main Heading */}
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white mb-6 leading-tight">
                  <span className="block bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
                    WELCOME TO
                  </span>
                  <span className="block bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 bg-clip-text text-transparent">
                    LUXE ESCAPE
                  </span>
                </h1>

                {/* Subtitle */}
                <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-200 mt-6 mb-8 mx-auto leading-relaxed px-4 max-w-4xl">
                  Welcome to our <span className="text-yellow-400 font-semibold">Cozy Haven</span>, where
                  <span className="text-pink-400 font-semibold"> Comfort Meets Style</span> and
                  <span className="text-purple-400 font-semibold"> Exceptional Service</span> Elevates Every Experience
                </p>

                {/* Stats Row */}
                <div className="flex flex-wrap justify-center gap-6 sm:gap-8 mb-12 px-4">
                  {stats.map((stat, index) => (
                    <div key={index} className="text-center group">
                      <div className="text-2xl sm:text-3xl font-bold text-yellow-400 group-hover:scale-110 transition-transform duration-300">
                        {stat.number}
                      </div>
                      <div className="text-sm text-gray-300 mt-1">{stat.label}</div>
                    </div>
                  ))}
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center px-4">
                  <a href="/rooms" className="w-full sm:w-auto">
                    <button className="group relative w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-yellow-400 to-yellow-600 text-black text-lg font-bold rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-yellow-400/25 overflow-hidden">
                      <span className="relative z-10">Book Your Escape Now</span>
                      <div className="absolute inset-0 bg-gradient-to-r from-yellow-300 to-yellow-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </button>
                  </a>
                  <a href="/gallery" className="w-full sm:w-auto">
                    <button className="group w-full sm:w-auto px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 text-white text-lg font-semibold rounded-2xl transition-all duration-300 hover:bg-white/20 hover:scale-105 hover:shadow-xl">
                      <span className="group-hover:text-yellow-400 transition-colors duration-300">Explore Amenities</span>
                    </button>
                  </a>
                </div>

                {/* Trust Indicators */}
                <div className="mt-16 pt-8 border-t border-white/10">
                  <p className="text-gray-400 text-sm mb-4">Trusted by luxury travelers worldwide</p>
                  <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
                    {["★★★★★", "Premium", "Verified", "Secure"].map((badge, idx) => (
                      <span key={idx} className="text-white/70 text-sm font-medium px-3 py-1 border border-white/20 rounded-full">
                        {badge}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0% {
            transform: translateY(0px);
            opacity: 0.9;
          }
          50% {
            transform: translateY(-18px);
            opacity: 0.6;
          }
          100% {
            transform: translateY(0px);
            opacity: 0.9;
          }
        }
      `}</style>
    </main>
  );
}