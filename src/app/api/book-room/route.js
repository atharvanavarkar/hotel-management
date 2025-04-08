import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import connectDB from "../../../../lib/mongodb";
import User from "../../../../models/User";
// Import your NextAuth options from your auth file:
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function POST(request) {
    // Get the session on the server
    const session = await getServerSession(authOptions);
    if (!session) {
        return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const { roomNumber } = await request.json();

    await connectDB();
    const user = await User.findOne({ email: session.user.email });
    if (!user) {
        return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Check if the room is already booked (in this simple example, just checking the user's bookedRooms)
    if (user.bookedRooms.includes(roomNumber)) {
        return NextResponse.json({ error: "Room already booked" }, { status: 400 });
    }

    // Book the room by adding the room number to the user's bookedRooms array
    user.bookedRooms.push(roomNumber);
    await user.save();

    return NextResponse.json({ success: true, bookedRooms: user.bookedRooms });
}

export async function GET() {
    await connectDB();
    const users = await User.find(); // Fetch all users with booked rooms

    // Create an array of booked rooms
    const bookedRooms = users.reduce((rooms, user) => {
        user.bookedRooms.forEach((room) => {
            rooms.push({ number: room, booked: true });
        });
        return rooms;
    }, []);

    return NextResponse.json({ rooms: bookedRooms });
}