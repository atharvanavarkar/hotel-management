import Link from "next/link";

export default function Home() {
  return (
    // <main className="flex flex-col items-center min-h-screen">
    <section className="flex flex-1 items-center justify-center">
      <div className="w-full text-center py-16">
        <h1 className="text-6xl font-bold">WELCOME TO LUXE ESCAPE</h1>
        <p className="text-lg text-gray-600 mt-4">
          Welcome to our Cozy Haven, where Comfort Meets Style and Exceptional Service Elevates Every Experience
        </p>
        <Link href="/rooms">
          <button className="mt-6 px-6 py-3 bg-black text-white text-lg font-semibold rounded-md">
            Book now
          </button>
        </Link>
      </div>
    </section>
    // </main>
  );
}

