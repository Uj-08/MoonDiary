import type { NextApiRequest, NextApiResponse } from "next";
import { loginController } from "@/backend/controllers/auth/login.controller";
import { withDatabase } from "@/lib/database";

async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method !== "POST") {
		return res.status(405).json({ error: "Method Not Allowed" });
	}

	return loginController(req, res);
}

export default withDatabase(handler);
