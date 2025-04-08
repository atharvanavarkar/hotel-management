// app/api/book-transaction/route.js

import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import connectDB from "../../../../lib/mongodb";
import User from "../../../../models/User";
// Import your NextAuth options from your auth file:
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function POST(request) {
    // Get the session on the server:
    const session = await getServerSession(authOptions);
    if (!session) {
        return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }
    // Expect roomNumber, fromDate, toDate and (optionally) the payment amount in the body:
    const { roomNumber, fromDate, toDate, amount } = await request.json();

    await connectDB();
    const user = await User.findOne({ email: session.user.email });
    if (!user) {
        return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    // Check if the room is already booked in any booking records for the user.
    // (In a real-world application, you’d want a more robust check for date conflicts.)
    const conflict = user.bookedRooms.find(
        (booking) => booking.roomNumber === roomNumber
    );
    if (conflict) {
        return NextResponse.json({ error: "Room already booked" }, { status: 400 });
    }
    // Simulate a payment process by generating a transactionId
    const transactionId = "TXN" + Date.now();

    // Create a booking record – we now store the room number along with booking dates
    const booking = { roomNumber, fromDate, toDate };
    user.bookedRooms.push(booking);

    // Create a transaction record that includes room details, the amount paid, and a transaction id
    const transaction = {
        roomNumber,
        fromDate,
        toDate,
        amount,
        transactionId,
        date: new Date(),
    };
    user.transactions.push(transaction);
    await user.save();

    return NextResponse.json({ success: true, transaction, bookedRooms: user.bookedRooms });
}

// Optionally, you can use GET to fetch all the booked rooms with details (this example aggregates bookings from all users)
export async function GET() {
    await connectDB();
    const users = await User.find();
    const bookedRooms = [];
    users.forEach((user) => {
        user.bookedRooms.forEach((booking) => {
            bookedRooms.push({
                roomNumber: booking.roomNumber,
                fromDate: booking.fromDate,
                toDate: booking.toDate,
                user: user.name,
            });
        });
    });
    return NextResponse.json({ rooms: bookedRooms });
}