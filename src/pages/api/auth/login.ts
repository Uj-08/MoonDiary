import type { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "@/lib/database";
import { loginController } from "@/backend/controllers/auth/auth.controller";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method !== "POST") {
		return res.status(405).json({ error: "Method Not Allowed" });
	}

	await connectToDatabase();
	return loginController(req, res);
}
