import { NextResponse } from "next/server";
import connectDB from "../../../../../lib/mongodb";
import User from "../../../../../models/User";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function POST(req) {
    const session = await getServerSession(authOptions);
    if (!session?.user?.isAdmin) return NextResponse.json({ error: "Unauthorized" }, { status: 403 });

    const { email, roomNumber, fromDate, toDate } = await req.json();
    await connectDB();

    const user = await User.findOne({ email });
    if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

    user.bookedRooms = user.bookedRooms.filter(b =>
        !(b.roomNumber === roomNumber && b.fromDate.toISOString() === fromDate && b.toDate.toISOString() === toDate)
    );
    await user.save();

    return NextResponse.json({ success: true });
}