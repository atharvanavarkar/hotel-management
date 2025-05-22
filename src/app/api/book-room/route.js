import { NextResponse } from "next/server";
import connectDB from "../../../../lib/mongodb";
import User from "../../../../models/User";

export async function GET() {
    await connectDB();
    console.log("Connected to DB");

    const allUsers = await User.find({}, "bookedRooms");
    console.log("Found users:", allUsers.length);

    const allBookedRooms = allUsers.flatMap(user => user.bookedRooms);
    console.log("Total booked rooms:", allBookedRooms.length);

    return NextResponse.json({ rooms: allBookedRooms });
}

