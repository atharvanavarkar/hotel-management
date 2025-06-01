// app/api/book-transaction/route.js

// import { NextResponse } from "next/server";
// import { getServerSession } from "next-auth/next";
// import connectDB from "../../../../lib/mongodb";
// import User from "../../../../models/User";
// // Import your NextAuth options from your auth file:
// import { authOptions } from "@/app/api/auth/[...nextauth]/route";


// export async function POST(request) {
//     const session = await getServerSession(authOptions);
//     if (!session) {
//         return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
//     }

//     const { roomNumber, fromDate, toDate, amount } = await request.json();
//     await connectDB();

//     const user = await User.findOne({ email: session.user.email });
//     if (!user) {
//         return NextResponse.json({ error: "User not found" }, { status: 404 });
//     }

//     // Check globally if room is booked during that time range
//     const allUsers = await User.find();
//     const isRoomBooked = allUsers.some(u =>
//         u.bookedRooms.some(b =>
//             b.roomNumber === roomNumber &&
//             isOverlapping(fromDate, toDate, b.fromDate, b.toDate)
//         )
//     );

//     if (isRoomBooked) {
//         return NextResponse.json({ error: "Room already booked for those dates" }, { status: 400 });
//     }

//     // Simulate transaction ID
//     const transactionId = "TXN" + Date.now();

//     // Add booking
//     const booking = {
//         roomNumber,
//         fromDate,
//         toDate,
//         bookedBy: session.user.email,
//     };
//     user.bookedRooms.push(booking);

//     const transaction = {
//         roomNumber,
//         fromDate,
//         toDate,
//         amount,
//         transactionId,
//         date: new Date(),
//     };
//     user.transactions.push(transaction);
//     await user.save();
//     return NextResponse.json({ success: true, transaction, bookedRooms: user.bookedRooms });
// }
// export async function GET() {
//     const session = await getServerSession(authOptions);
//     if (!session) {
//         return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
//     }

//     await connectDB();
//     const user = await User.findOne({ email: session.user.email });

//     if (!user) {
//         return NextResponse.json({ error: "User not found" }, { status: 404 });
//     }

//     return NextResponse.json({ rooms: user.bookedRooms });
// } 
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import connectDB from "../../../../lib/mongodb";
import User from "../../../../models/User";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

// Helper to check for date overlap
function isOverlapping(start1, end1, start2, end2) {
    return (
        new Date(start1) <= new Date(end2) &&
        new Date(start2) <= new Date(end1)
    );
}

export async function POST(request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
        }

        const { roomNumber, fromDate, toDate, amount } = await request.json();

        await connectDB();

        const user = await User.findOne({ email: session.user.email });
        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        const allUsers = await User.find();
        const isRoomBooked = allUsers.some(u =>
            u.bookedRooms.some(b =>
                b.roomNumber === roomNumber &&
                isOverlapping(fromDate, toDate, b.fromDate, b.toDate)
            )
        );

        if (isRoomBooked) {
            return NextResponse.json({ error: "Room already booked for those dates" }, { status: 400 });
        }

        const transactionId = "TXN" + Date.now();
        const booking = {
            roomNumber,
            fromDate,
            toDate,
            bookedBy: session.user.email,
        };
        user.bookedRooms.push(booking);

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

    } catch (err) {
        console.error("POST /api/book-transaction error:", err);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

export async function GET() {
    const session = await getServerSession(authOptions);
    if (!session) {
        return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    await connectDB();
    const user = await User.findOne({ email: session.user.email });
    if (!user) {
        return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ rooms: user.bookedRooms });
}
