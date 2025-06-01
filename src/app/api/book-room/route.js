import { NextResponse } from "next/server";
import connectDB from "../../../../lib/mongodb";
import User from "../../../../models/User";

export async function GET() {
    try {
        await connectDB();
        console.log("Connected to DB");

        const allUsers = await User.find({}, "bookedRooms");
        console.log("Found users:", allUsers.length);

        const today = new Date();

        const allBookedRooms = allUsers.flatMap(user =>
            user.bookedRooms.filter(booking => new Date(booking.toDate) >= today)
        );

        console.log("Total booked rooms:", allBookedRooms.length);

        return NextResponse.json({ rooms: allBookedRooms });
    } catch (error) {
        console.error("Error fetching booked rooms:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

