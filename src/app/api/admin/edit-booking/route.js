import { NextResponse } from "next/server";
import connectDB from "../../../../../lib/mongodb";
import User from "../../../../../models/User";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function POST(req) {
    const session = await getServerSession(authOptions);
    if (!session?.user?.isAdmin) return NextResponse.json({ error: "Unauthorized" }, { status: 403 });

    const { email, roomNumber, fromDate, toDate, newFromDate, newToDate } = await req.json();
    await connectDB();

    const user = await User.findOne({ email });
    if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

    const booking = user.bookedRooms.find(b =>
        b.roomNumber === roomNumber && b.fromDate.toISOString() === fromDate && b.toDate.toISOString() === toDate
    );

    if (!booking) return NextResponse.json({ error: "Booking not found" }, { status: 404 });

    booking.fromDate = new Date(newFromDate);
    booking.toDate = new Date(newToDate);
    await user.save();

    return NextResponse.json({ success: true });
}