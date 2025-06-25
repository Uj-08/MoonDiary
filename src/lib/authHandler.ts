import { NextApiRequest } from "next";
import { getCookie, hasCookie, setCookie } from "cookies-next";
import { verifyAccessToken, verifyRefreshToken, createAccessToken } from "@/lib/auth";
import { ACCESS_COOKIE, REFRESH_COOKIE } from "@/helpers/constants";
import { connectToDatabase } from "./database";
import UsersModel from "@/models/Users.model";

export const authenticate = async (req: NextApiRequest, res: any) => {
	const hasRefreshCookie = await hasCookie(REFRESH_COOKIE, { req, res });
	if (!hasRefreshCookie) return null;
	await connectToDatabase();
	const accessToken = (await getCookie(ACCESS_COOKIE, { req, res })) as string;
	const refreshToken = (await getCookie(REFRESH_COOKIE, { req, res })) as string;
	try {
		// 1. Try verifying access token
		const decoded = verifyAccessToken(accessToken);
		const user = await UsersModel.findById(decoded.id);
		if (!user) throw new Error("User not found");
		return user;
	} catch (err: any) {
		console.log(err);
		// 2. If access token fails, try refreshing
		if (refreshToken) {
			try {
				const decoded = verifyRefreshToken(refreshToken);
				const user = await UsersModel.findById(decoded.id);
				if (!user) throw new Error("User not found");

				// issue new access token
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

				return user;
			} catch (refreshErr) {
				console.log(refreshErr);
				throw new Error("Invalid refresh token");
			}
		} else {
			throw new Error("No tokens valid");
		}
	}
};
