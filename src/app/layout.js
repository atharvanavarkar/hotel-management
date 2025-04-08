import ClientSessionProvider from "@/components/ClientSessionProvider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";

export const metadata = {
  title: "Luxe Escape",
  description: "Hotel Booking System",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">
        <ClientSessionProvider>
          <Navbar />
          <main className="flex flex-1">{children}</main>
          <Footer />
        </ClientSessionProvider>
      </body>
    </html>
  );
}