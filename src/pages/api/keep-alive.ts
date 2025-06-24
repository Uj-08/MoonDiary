import type { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "@/lib/database";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	try {
		await connectToDatabase(); // ensure MongoDB is pinged
		res.status(200).json({ success: true, message: "Keep-alive successful" });
	} catch (error) {
		console.error("Keep-alive error:", error);
		res.status(500).json({ success: false, message: "Keep-alive failed" });
	}
}
