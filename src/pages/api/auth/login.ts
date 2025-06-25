import { connectToDatabase } from "@/lib/database";
import { verifyGoogleToken } from "@/utils/google";
import { createAccessToken, createRefreshToken } from "@/lib/auth";
import type { NextApiRequest, NextApiResponse } from "next";
import { setCookie } from "cookies-next";
import UsersModel from "@/models/Users.model";
import { ACCESS_COOKIE, REFRESH_COOKIE } from "@/helpers/constants";

//first time login function, to generate access and refresh tokens
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method !== "POST") return res.status(405).end();

	await connectToDatabase();
	const { idToken } = req.body;
	if (!idToken) return res.status(400).json({ error: "Missing token" });

	try {
		//verify if the google token provided, if valid will receive decoded token from google.
		const payload = await verifyGoogleToken(idToken);
		const { sub, email, name, picture, given_name, family_name, email_verified } = payload!;

		//check if user exists in the db against the google_id.
		let user = await UsersModel.findOne({ googleId: sub });
		//if user doesn't exist add them.
		user ??= await UsersModel.create({
			googleId: sub,
			email,
			name,
			picture,
			given_name,
			family_name,
			email_verified,
		});

		//create access and refresh tokens for the verified user.
		const accessToken = createAccessToken(user);
		const refreshToken = createRefreshToken(user);

		setCookie(ACCESS_COOKIE, accessToken, {
			req,
			res,
			httpOnly: false, // for security (not accessible by JS)
			secure: process.env.NODE_ENV === "production",
			sameSite: "lax",
			maxAge: 60 * 15, // 15 minutes
			path: "/",
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
		return res.status(200).end();
	} catch (err) {
		console.error(err);
		res.status(401).json({ error: "Invalid ID token" });
	}
}
