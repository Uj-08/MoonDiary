import { NextApiRequest, NextApiResponse } from "next";
import { verifyGoogleToken } from "@/utils/google";
import { setAuthCookies } from "@/utils/cookie.utils";
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

	setAuthCookies(req, res, accessToken, refreshToken);

	return { user, accessToken, refreshToken };
};
