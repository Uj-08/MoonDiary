import { NextApiRequest, NextApiResponse } from "next";
import { verifyGoogleToken } from "@/backend/utils/google";
import { setAuthTokens } from "@/backend/utils/cookie.utils";
import { findOrCreateUser } from "../users/users.service";

export const loginWithGoogle = async (
	idToken: string,
	req: NextApiRequest,
	res: NextApiResponse
) => {
	const payload = await verifyGoogleToken(idToken);
	if (!payload) throw new Error("Invalid Google token");

	const user = await findOrCreateUser(payload);

	setAuthTokens(user, req, res);

	return { user };
};
