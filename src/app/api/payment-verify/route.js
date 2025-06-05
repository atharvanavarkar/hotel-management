import { NextResponse } from "next/server";
import crypto from "crypto";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import connectDB from "../../../../lib/mongodb";
import User from "../../../../models/User";

export async function POST(req) {
    const session = await getServerSession(authOptions);
    if (!session) return NextResponse.json({ error: "Not authenticated" }, { status: 401 });

    const body = await req.json();
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, roomNumber, fromDate, toDate, amount } = body;

    const expectedSignature = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
        .update(razorpay_order_id + "|" + razorpay_payment_id)
        .digest("hex");

    if (expectedSignature !== razorpay_signature) {
        return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
    }

    await connectDB();
    const user = await User.findOne({ email: session.user.email });
    const transactionId = razorpay_payment_id;

    user.transactions.push({
        roomNumber,
        fromDate,
        toDate,
        amount,
        transactionId,
        date: new Date(),
    });

    user.bookedRooms.push({
        roomNumber,
        fromDate,
        toDate,
        bookedBy: session.user.email
    });

    await user.save();

    return NextResponse.json({ success: true, transaction: { transactionId } });
}