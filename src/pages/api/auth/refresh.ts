import { getCookie, setCookie } from "cookies-next";
import { verifyRefreshToken, createAccessToken } from "@/lib/auth";
import { connectToDatabase } from "@/lib/database";
import UsersModel from "@/models/Users.model";
import { NextApiRequest, NextApiResponse } from "next";

//function to generate access token from refresh token
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	await connectToDatabase();
	try {
		const refreshToken = await getCookie("refreshToken", { req, res });

		if (!refreshToken) return res.status(401).end();

		const decoded = verifyRefreshToken(refreshToken);
		//check and get user from db
		const user = await UsersModel.findById(decoded.id);

		//if not found, something is wrong. no new user creation from this route.
		if (!user) return res.status(401).end();

		//generate new access token and send.
		const newAccessToken = createAccessToken(user);

		//set access token to the new access token
		setCookie("accessToken", newAccessToken, {
			req,
			res,
			httpOnly: true, // for security (not accessible by JS)
			secure: process.env.NODE_ENV === "production",
			sameSite: "lax",
			maxAge: 60 * 15, // 15 minutes
			path: "/",
		});
		return res.status(200);
	} catch (err) {
		console.log(err);
		return res.status(401).end();
	}
}
