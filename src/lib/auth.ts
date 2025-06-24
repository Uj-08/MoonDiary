import jwt from "jsonwebtoken";

export const createAccessToken = (user: any) => {
	return jwt.sign({ id: user._id }, process.env.ACCESS_TOKEN_SECRET!, {
		expiresIn: "15m",
	});
};

export const createRefreshToken = (user: any) => {
	return jwt.sign({ id: user._id }, process.env.REFRESH_TOKEN_SECRET!, {
		expiresIn: "7d",
	});
};

export const verifyAccessToken = (token: string) => {
	return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!);
};

export const verifyRefreshToken = (token: string) => {
	return jwt.verify(token, process.env.REFRESH_TOKEN_SECRET!);
};
