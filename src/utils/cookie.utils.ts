import { setCookie } from "cookies-next";
import { ACCESS_COOKIE, REFRESH_COOKIE } from "@/helpers/constants";

export const setAuthCookies = (req: any, res: any, accessToken: string, refreshToken: string) => {
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
