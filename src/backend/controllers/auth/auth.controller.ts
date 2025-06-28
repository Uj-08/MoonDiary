import { loginWithGoogle } from "@/backend/services/auth/loginWithGoogle.service";
import type { NextApiRequest, NextApiResponse } from "next";

export const loginController = async (req: NextApiRequest, res: NextApiResponse) => {
	try {
		const { idToken } = req.body;
		if (!idToken) {
			return res.status(400).json({ error: "Missing ID token" });
		}

		const { user } = await loginWithGoogle(idToken, req, res);
		return res.status(200).json({ success: true, user });
	} catch (error) {
		console.error("Login Error:", error);
		return res.status(401).json({ error: "Invalid login attempt" });
	}
};
