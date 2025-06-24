import mongoose from "mongoose";
import type { NextApiRequest, NextApiResponse, NextApiHandler } from "next";

let isConnected = false;

export const connectToDatabase = async () => {
	if (isConnected || mongoose.connection.readyState >= 1) return;

	try {
		await mongoose.connect(process.env.MONGO_URI as string, {
			dbName: process.env.MONGO_DB_NAME, // optional
		});
		isConnected = true;
	} catch (error) {
		console.error("MongoDB connection error:", error);
		throw error;
	}
};

export const withDatabase =
	(handler: NextApiHandler) => async (req: NextApiRequest, res: NextApiResponse) => {
		try {
			await connectToDatabase();
			return handler(req, res);
		} catch (error) {
			return res.status(500).json({ error: "Database connection failed" });
		}
	};
