import { deleteCookie } from "cookies-next";
import type { NextApiRequest, NextApiResponse } from "next";
import { ACCESS_COOKIE, REFRESH_COOKIE } from "@/helpers/constants"; // your cookie names

export default function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method !== "POST") return res.status(405).json({ message: "Method Not Allowed" });

	deleteCookie(ACCESS_COOKIE, { req, res });
	deleteCookie(REFRESH_COOKIE, { req, res });

	res.status(200).json({ message: "Logged out successfully" });
}
