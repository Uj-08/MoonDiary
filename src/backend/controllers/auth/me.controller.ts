import type { NextApiRequest, NextApiResponse } from "next";
import { authenticate } from "@/lib/auth/authHandler";

export const meController = async (req: NextApiRequest, res: NextApiResponse) => {
	if (req.method !== "GET") {
		return res.status(405).json({ message: "Method Not Allowed" });
	}

	try {
		const user = await authenticate(req, res);
		if (!user) {
			return res.status(401).json({ message: "Not authenticated" });
		}

		return res.status(200).json({ user });
	} catch (error) {
		console.error("Error in meController:", error);
		return res.status(500).json({ message: "Internal server error" });
	}
};
