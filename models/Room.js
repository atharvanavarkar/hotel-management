import mongoose from "mongoose"; // ✅ Import mongoose

const RoomSchema = new mongoose.Schema({
    roomNumber: { type: Number, unique: true, required: true },
    isAvailable: { type: Boolean, default: true },
    currentBooking: {
        fromDate: { type: Date },
        toDate: { type: Date },
        bookedBy: { type: String },
    },
});

// Avoid model overwrite issues in Next.js hot-reload
export default mongoose.models.Room || mongoose.model("Room", RoomSchema);