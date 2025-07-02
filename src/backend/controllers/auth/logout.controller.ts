import type { NextApiRequest, NextApiResponse } from "next";
import { logoutUser } from "@/backend/services/auth/logout.service";

export const logoutController = (req: NextApiRequest, res: NextApiResponse) => {
	if (req.method !== "POST") {
		return res.status(405).json({ message: "Method Not Allowed" });
	}

	try {
		logoutUser(req, res);
		return res.status(200).json({ message: "Logged out successfully" });
	} catch (error) {
		console.error("Logout error:", error);
		return res.status(500).json({ message: "Logout failed" });
	}
};
