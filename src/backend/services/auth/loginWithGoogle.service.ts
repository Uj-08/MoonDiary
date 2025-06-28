import { NextApiRequest, NextApiResponse } from "next";
import { verifyGoogleToken } from "@/backend/utils/google";
import { setAuthTokens } from "@/backend/utils/cookie.utils";
import { findOrCreateUser } from "../users/users.service";
import { generateAuthTokens } from "../tokens/token.service";

export const loginWithGoogle = async (
	idToken: string,
	req: NextApiRequest,
	res: NextApiResponse
) => {
	const payload = await verifyGoogleToken(idToken);
	if (!payload) throw new Error("Invalid Google token");

	const user = await findOrCreateUser(payload);
	const { accessToken, refreshToken } = generateAuthTokens(user);

	setAuthTokens(req, res, accessToken, refreshToken);

	return { user, accessToken, refreshToken };
};
