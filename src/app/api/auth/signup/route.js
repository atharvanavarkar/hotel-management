import { NextResponse } from "next/server";
import connectDB from "../../../../../lib/mongodb";
import User from "../../../../../models/User";
import bcrypt from "bcryptjs";

export async function POST(req) {
    const { name, email, password } = await req.json();
    await connectDB();

    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return NextResponse.json({ error: "User already exists" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
        name,
        email,
        password: hashedPassword,
        bookedRooms: [],
        transactions: [],
        isAdmin: false,
    });

    await newUser.save();
    return NextResponse.json({ success: true });
}