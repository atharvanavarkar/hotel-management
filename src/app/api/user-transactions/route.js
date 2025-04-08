// app/api/user-transactions/route.js

import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import connectDB from "../../../../lib/mongodb";
import User from "../../../../models/User";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

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
    return NextResponse.json({ transactions: user.transactions });
}