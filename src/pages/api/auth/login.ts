import { connectToDatabase } from "@/lib/database";
import { verifyGoogleToken } from "@/utils/google";
import { createAccessToken, createRefreshToken } from "@/lib/auth";
import type { NextApiRequest, NextApiResponse } from "next";
import { setCookie } from "cookies-next";
import UsersModel from "@/models/Users.model";
import { ACCESS_COOKIE, REFRESH_COOKIE } from "@/helpers/constants";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method !== "POST") return res.status(405).end();

	await connectToDatabase();
	const { idToken } = req.body;
	if (!idToken) return res.status(400).json({ error: "Missing token" });

	try {
		const payload = await verifyGoogleToken(idToken);
		if (!payload) throw new Error("Invalid Google token");

		const {
			sub: googleId,
			email,
			name,
			picture,
			given_name,
			family_name,
			email_verified,
		} = payload;

		// Try to find user by Google ID
		let user = await UsersModel.findOne({ googleId });

		// If user doesn't exist, create a new one
		if (!user) {
			user = await UsersModel.create({
				googleId,
				email,
				name,
				picture,
				given_name,
				family_name,
				email_verified,
			});
		} else {
			// Sync user data if any fields have changed
			const updates: Partial<typeof user> = {};
			if (user.email !== email) updates.email = email;
			if (user.name !== name) updates.name = name;
			if (user.picture !== picture) updates.picture = picture;
			if (user.given_name !== given_name) updates.given_name = given_name;
			if (user.family_name !== family_name) updates.family_name = family_name;
			if (user.email_verified !== email_verified) updates.email_verified = email_verified;

			// Only update if there are differences
			if (Object.keys(updates).length > 0) {
				await UsersModel.updateOne({ _id: user._id }, updates);
			}
		}

		const accessToken = createAccessToken(user);
		const refreshToken = createRefreshToken(user);

		setCookie(ACCESS_COOKIE, accessToken, {
			req,
			res,
			httpOnly: false,
			secure: process.env.NODE_ENV === "production",
			sameSite: "lax",
			maxAge: 60 * 15,
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
