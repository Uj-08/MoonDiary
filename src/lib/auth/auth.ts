import { JwtPayload } from "@/types/jwt";
import jwt from "jsonwebtoken";

export const createAccessToken = (user: any) => {
	//create access jwt with _id from the Users database.
	return jwt.sign({ id: user._id }, process.env.ACCESS_TOKEN_SECRET!, {
		expiresIn: "15m",
	});
};

export const createRefreshToken = (user: any) => {
	//create refresh jwt with _id from the Users database.
	return jwt.sign({ id: user._id }, process.env.REFRESH_TOKEN_SECRET!, {
		expiresIn: "7d",
	});
};

export const verifyAccessToken = (token: string): JwtPayload => {
	//verify and return decoded token
	return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!) as JwtPayload;
};

export const verifyRefreshToken = (token: string): JwtPayload => {
	//verify and return decoded token
	return jwt.verify(token, process.env.REFRESH_TOKEN_SECRET!) as JwtPayload;
};
