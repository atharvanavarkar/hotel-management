// import mongoose from "mongoose";

// const UserSchema = new mongoose.Schema({
//     name: String,
//     email: { type: String, unique: true },
//     bookedRooms: [{ type: Number }], // List of booked room numbers
//     transactions: [{ amount: Number, date: Date }], // Payment history
// });

// export default mongoose.models.User || mongoose.model("User", UserSchema);
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
});
const roomSchema = new mongoose.Schema({
    isBooked: { type: Boolean, default: false },
    bookedBy: { type: String, default: null }, // email of the user who booked
});
const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    bookedRooms: [BookingSchema], // Updated to hold objects with room and date range
    transactions: [TransactionSchema], // Updated to include room details and transaction id
});

export default mongoose.models.User || mongoose.model("User", UserSchema);