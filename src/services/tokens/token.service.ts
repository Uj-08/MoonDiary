import { createAccessToken, createRefreshToken } from "@/lib/auth";

export const generateAuthTokens = (user: any) => {
	const accessToken = createAccessToken(user);
	const refreshToken = createRefreshToken(user);
	return { accessToken, refreshToken };
};
