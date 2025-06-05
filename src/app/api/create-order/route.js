import { NextResponse } from "next/server";
import Razorpay from "razorpay";

export async function POST(req) {
    const { amount } = await req.json();

    const instance = new Razorpay({
        key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        key_secret: process.env.RAZORPAY_KEY_SECRET
    });

    const order = await instance.orders.create({
        amount: amount * 100,
        currency: "INR",
        receipt: "receipt_order_id_" + Date.now(),
    });

    return NextResponse.json(order);
}