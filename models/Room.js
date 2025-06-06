const RoomSchema = new mongoose.Schema({
    roomNumber: { type: Number, unique: true, required: true },
    isAvailable: { type: Boolean, default: true },
    currentBooking: {
        fromDate: { type: Date },
        toDate: { type: Date },
        bookedBy: { type: String },
    },
});

export default mongoose.models.Room || mongoose.model("Room", RoomSchema);