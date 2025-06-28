import { deleteCookie, setCookie } from "cookies-next";
import { ACCESS_COOKIE, REFRESH_COOKIE } from "@/helpers/constants";
import { createAccessToken, createRefreshToken } from "@/lib/auth/auth";
import { NextApiRequest, NextApiResponse } from "next";

export const setAuthTokens = (user: any, req: NextApiRequest, res: NextApiResponse) => {
	issueAccessToken(user, req, res);
	issueRefreshToken(user, req, res);
};

export const issueAccessToken = async (user: any, req: NextApiRequest, res: NextApiResponse) => {
	const accessToken = createAccessToken(user);
	setCookie(ACCESS_COOKIE, accessToken, {
		req,
		res,
		httpOnly: false,
		secure: process.env.NODE_ENV === "production",
		path: "/",
		sameSite: "lax",
		maxAge: 60 * 15,
	});
};

export const issueRefreshToken = async (user: any, req: NextApiRequest, res: NextApiResponse) => {
	const refreshToken = createRefreshToken(user);
	setCookie(REFRESH_COOKIE, refreshToken, {
		req,
		res,
		httpOnly: true,
		secure: process.env.NODE_ENV === "production",
		path: "/",
		sameSite: "lax",
		maxAge: 60 * 15,
	});
};

export const deleteAccessToken = (req: NextApiRequest, res: NextApiResponse) => {
	deleteCookie(ACCESS_COOKIE, { req, res });
};

export const deleteRefreshToken = (req: NextApiRequest, res: NextApiResponse) => {
	deleteCookie(REFRESH_COOKIE, { req, res });
};

export const deleteAuthTokens = (req: NextApiRequest, res: NextApiResponse) => {
	deleteAccessToken(req, res);
	deleteRefreshToken(req, res);
};
