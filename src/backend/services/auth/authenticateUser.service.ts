import { getCookie, hasCookie } from "cookies-next";
import { ACCESS_COOKIE, REFRESH_COOKIE } from "@/helpers/constants";
import UsersModel from "@/models/Users.model";
import { NextApiRequest, NextApiResponse } from "next";
import { issueNewAccessToken } from "@/backend/utils/cookie.utils";
import { verifyAccessToken, verifyRefreshToken } from "@/lib/auth/auth";

export const authenticateUser = async (req: NextApiRequest, res: NextApiResponse) => {
	const hasRefresh = await hasCookie(REFRESH_COOKIE, { req, res });
	if (!hasRefresh) return null;

	const accessToken = (await getCookie(ACCESS_COOKIE, { req, res })) as string;
	const refreshToken = (await getCookie(REFRESH_COOKIE, { req, res })) as string;

	try {
		const decoded = verifyAccessToken(accessToken);
		const user = await UsersModel.findById(decoded.id);
		if (!user) throw new Error("User not found");
		return user;
	} catch {
		if (!refreshToken) throw new Error("No valid tokens");

		const decoded = verifyRefreshToken(refreshToken);
		const user = await UsersModel.findById(decoded.id);
		if (!user) throw new Error("User not found");

		await issueNewAccessToken(user, req, res);
		return user;
	}
};
