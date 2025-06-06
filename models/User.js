/*
import mongoose from "mongoose";

// Schema to store booking details for each room booking

const BookingSchema = new mongoose.Schema({
    roomNumber: { type: Number, required: true },
    fromDate: { type: Date, required: true },
    toDate: { type: Date, required: true },
    bookedBy: { type: String, required: true }, // <-- NEW FIELD (email of user)
});

// Schema to store detailed transaction information
const TransactionSchema = new mongoose.Schema({
    roomNumber: { type: Number, required: true },
    fromDate: { type: Date, required: true },
    toDate: { type: Date, required: true },
    amount: { type: Number, required: true },
    transactionId: { type: String, required: true },
    date: { type: Date, default: Date.now },
    razorpayOrderId: { type: String },
    razorpayPaymentId: { type: String },
    razorpaySignature: { type: String },
});
const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    bookedRooms: [BookingSchema], // Updated to hold objects with room and date range
    transactions: [TransactionSchema], // Updated to include room details and transaction id
});

export default mongoose.models.User || mongoose.model("User", UserSchema);
*/


import mongoose from "mongoose";

const BookingSchema = new mongoose.Schema({
    roomNumber: { type: Number, required: true },
    fromDate: { type: Date, required: true },
    toDate: { type: Date, required: true },
    bookedBy: { type: String, required: true },
});



const TransactionSchema = new mongoose.Schema({
    roomNumber: { type: Number, required: true },
    fromDate: { type: Date, required: true },
    toDate: { type: Date, required: true },
    amount: { type: Number, required: true },
    transactionId: { type: String, required: true },
    date: { type: Date, default: Date.now },
    razorpayOrderId: { type: String },
    razorpayPaymentId: { type: String },
    razorpaySignature: { type: String },
});

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String },
    bookedRooms: [BookingSchema],
    transactions: [TransactionSchema],
    isAdmin: { type: Boolean, default: false }, // ✅ new field
});

export default mongoose.models.User || mongoose.model("User", UserSchema);