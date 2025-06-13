// lib/dbConnect.ts
import mongoose from "mongoose";

const dbConnect = async () => {
    if (mongoose.connection.readyState >= 1) {
        return;
    }

    try {
        await mongoose.connect(process.env.DB as string, {
            // Optional: add options if needed
        });
    } catch (err) {
        console.error("MongoDB connection error:", err);
        throw err;
    }
};

export default dbConnect;