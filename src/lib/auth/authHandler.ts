import { NextApiRequest } from "next";
import { authenticateUser } from "@/backend/services/auth/authenticateUser.service";

export const authenticate = async (req: NextApiRequest, res: any) => {
	const user = await authenticateUser(req, res);
	return user;
};
