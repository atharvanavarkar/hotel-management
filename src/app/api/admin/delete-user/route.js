// api/admin/delete-user/route.js

// admin/delete-user/route.js

import { NextResponse } from "next/server";
import connectDB from "../../../../../lib/mongodb";
import User from "../../../../../models/User";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function POST(req) {
    const session = await getServerSession(authOptions);
    if (!session?.user?.isAdmin) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const { email } = await req.json();

    try {
        await connectDB();

        const user = await User.findOne({ email });
        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        // ✅ Free up all booked rooms
        for (const booking of user.bookedRooms) {
            await Room.updateOne(
                { roomNumber: booking.roomNumber },
                {
                    $set: {
                        isAvailable: true,
                        currentBooking: null,
                    },
                }
            );
        }

        // ✅ Delete the user
        const result = await User.deleteOne({ _id: user._id });

        return NextResponse.json({
            success: true,
            deletedCount: result.deletedCount,
        });
    } catch (error) {
        console.error("Error deleting user:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}