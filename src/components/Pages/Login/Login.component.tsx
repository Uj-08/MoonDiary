import React, { useCallback } from "react";
import { useBaseContext } from "@/hooks/useBaseContext";
import { CredentialResponse } from "@react-oauth/google";
import { useRouter } from "next/router";
import LoginCardComponent from "@/components/LoginCard/LoginCard.component";
import { CardContainer } from "./Login.styles";
import { Container } from "../TagPage/TagPage.styles";

const LoginPage = () => {
	const router = useRouter();
	const { setClient } = useBaseContext();
	const fetchClient = useCallback(async () => {
		try {
			const res = await fetch("/api/me");
			if (res.status === 401 || res.status === 403) {
				setClient(null);
				return;
			}
			if (!res.ok) throw new Error("Unexpected error");

			const { user } = await res.json();
			setClient(user);
			router.push((router.query?.origin as string) ?? "/");
		} catch (err) {
			console.error("Error fetching user:", err);
			setClient(null);
		}
	}, [router, setClient]);
	const handleLoginSuccess = useCallback(
		async (credentialResponse: CredentialResponse) => {
			if (!credentialResponse.credential) return;

			const res = await fetch("/api/auth/login", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ idToken: credentialResponse.credential }),
			});

			if (res.ok) fetchClient();
			else console.error("Google login failed");
		},
		[fetchClient]
	);
	return (
		<CardContainer>
			<LoginCardComponent successHandler={handleLoginSuccess} />
		</CardContainer>
	);
};

export default LoginPage;
