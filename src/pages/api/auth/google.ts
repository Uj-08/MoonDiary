import { connectToDatabase } from "@/lib/database";
import { verifyGoogleToken } from "@/utils/google";
import { createAccessToken, createRefreshToken } from "@/lib/auth";
import type { NextApiRequest, NextApiResponse } from "next";
import { setCookie } from "cookies-next";
import UsersModel from "@/models/Users.model";

//first time login function, to generate access and refresh tokens
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method !== "POST") return res.status(405).end();

	await connectToDatabase();
	const { idToken } = req.body;
	if (!idToken) return res.status(400).json({ error: "Missing token" });

	try {
		//verify if the google token provided, if valid will receive decoded token from google.
		const payload = await verifyGoogleToken(idToken);
		const { sub, email, name, picture } = payload!;

		//check if user exists in the db against the google_id.
		let user = await UsersModel.findOne({ googleId: sub });
		//if user doesn't exist add them.
		user ??= await UsersModel.create({ googleId: sub, email, name, picture });

		//create access and refresh tokens for the verified user.
		const accessToken = createAccessToken(user);
		const refreshToken = createRefreshToken(user);

		setCookie("refreshToken", refreshToken, {
			req,
			res,
			httpOnly: true,
			secure: process.env.NODE_ENV === "production",
			sameSite: "lax",
			path: "/",
			maxAge: 60 * 60 * 24 * 7,
		});

		res.status(200).json({ accessToken });
	} catch (err) {
		console.error(err);
		res.status(401).json({ error: "Invalid ID token" });
	}
}
