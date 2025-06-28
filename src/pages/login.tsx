import React from "react";
import Head from "next/head";
import { GetServerSideProps } from "next";
import { Container } from "@/components/Pages/Features/Features.styles";
import LoginPage from "@/components/Pages/Login/Login.component";

const Login = () => {
	return (
		<>
			<Head>
				<title>Login | MoonDiary</title>
				<meta name="robots" content="noindex, nofollow" />
				<link rel="canonical" href={`${process.env.NEXT_PUBLIC_BASE_URL}/login`} />
			</Head>
			<Container>
				<LoginPage />
			</Container>
		</>
	);
};

export default Login;

export const getServerSideProps: GetServerSideProps = async ({ req, query }) => {
	const cookieHeader = req.headers.cookie ?? "";
	const origin = typeof query.origin === "string" ? query.origin : "/";

	try {
		const userRes = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/me`, {
			headers: {
				"Content-Type": "application/json",
				"Cookie": cookieHeader,
			},
		});

		if (userRes.ok) {
			const { user } = await userRes.json();

			if (user) {
				return {
					redirect: {
						destination: origin,
						permanent: false,
					},
				};
			}
		}

		return {
			props: {},
		};
	} catch (err) {
		console.error("getServerSideProps error:", err);
		return {
			props: {},
		};
	}
};
