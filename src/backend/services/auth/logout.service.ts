import type { NextApiRequest, NextApiResponse } from "next";
import { deleteAuthTokens } from "@/backend/utils/cookie.utils";

export const logoutUser = (req: NextApiRequest, res: NextApiResponse) => {
	deleteAuthTokens(req, res);
};
