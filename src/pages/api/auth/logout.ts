import type { NextApiRequest, NextApiResponse } from "next";
import { logoutController } from "@/backend/controllers/auth/logout.controller";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
	return logoutController(req, res);
}
