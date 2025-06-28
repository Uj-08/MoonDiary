import { setCookie } from "cookies-next";
import { ACCESS_COOKIE, REFRESH_COOKIE } from "@/helpers/constants";
import { createAccessToken } from "@/lib/auth/auth";
import { NextApiRequest, NextApiResponse } from "next";

export const setAuthTokens = (
	req: NextApiRequest,
	res: NextApiResponse,
	accessToken: string,
	refreshToken: string
) => {
	setCookie(ACCESS_COOKIE, accessToken, {
		req,
		res,
		httpOnly: false,
		secure: process.env.NODE_ENV === "production",
		sameSite: "lax",
		path: "/",
		maxAge: 60 * 15,
	});

	setCookie(REFRESH_COOKIE, refreshToken, {
		req,
		res,
		httpOnly: true,
		secure: process.env.NODE_ENV === "production",
		sameSite: "lax",
		path: "/",
		maxAge: 60 * 60 * 24 * 7,
	});
};

export const issueNewAccessToken = async (user: any, req: NextApiRequest, res: NextApiResponse) => {
	const newAccessToken = createAccessToken(user);
	setCookie(ACCESS_COOKIE, newAccessToken, {
		req,
		res,
		httpOnly: false,
		secure: process.env.NODE_ENV === "production",
		path: "/",
		sameSite: "lax",
		maxAge: 60 * 15,
	});
};
