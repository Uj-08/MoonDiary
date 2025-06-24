import type { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "@/lib/database";
import { authenticate } from "@/lib/authHandler";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method !== "GET") {
		return res.status(405).json({ message: "Method Not Allowed" });
	}

	await connectToDatabase();

	try {
		const user = await authenticate(req, res);
		if (!user) {
			return res.status(401).json({ message: "Not authenticated" }); // was 404
		}

		res.status(200).json({ user });
	} catch (error) {
		console.error("Error in /api/me:", error);
		return res.status(401).json({ message: "Not authenticated" }); // catch also returns 401
	}
}
