"use client";

import React, {
	useState,
	useEffect,
	useCallback,
	useMemo,
	createContext,
	type ReactNode,
} from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { CredentialResponse } from "@react-oauth/google";

import {
	resetCreatedBlogId,
	resetDeletedBlogId,
	resetErrorState,
	resetSuccessState,
} from "@/redux/slices/blogInfo";
import { RootState } from "@/redux/store";
import { ADMIN_EMAILS } from "@/helpers/constants";
import { ClientType } from "@/types/client";

import Navbar from "@/components/Navbar/Navbar.component";
import FooterComponent from "@/components/Footer/Footer.component";
import HamburgerMenu from "@/components/Navbar/HamburgerMenu/HamburgerMenu.component";
import AddPostButton from "@/components/AddPostButton/AddPostButton";
import Toast from "../Toast/Toast.component";
import Modal from "../Modal/Modal.component";
import LoginCard from "@/components/LoginCard/LoginCard.component";
import { Container, Loader, ToastContainer } from "./Base.styles";

export interface BaseContextType {
	client: ClientType | null;
}
export const BaseContext = createContext<BaseContextType | null>(null);

const Base = ({ children }: { children: ReactNode }) => {
	const [showLoginModal, setShowLoginModal] = useState(false);
	const [showHamburger, setShowHamburger] = useState(false);
	const [client, setClient] = useState<ClientType | null>(null);

	const blogInfo = useSelector((state: RootState) => state.blogInfo);
	const dispatch = useDispatch();
	const router = useRouter();

	// Fetch the authenticated user
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
		} catch (err) {
			console.error("Error fetching user:", err);
			setClient(null);
		}
	}, []);

	useEffect(() => {
		if (!client) fetchClient();
	}, [client, fetchClient]);

	// Login flow
	const handleLoginSuccess = useCallback(
		async (credentialResponse: CredentialResponse) => {
			if (!credentialResponse.credential) return;

			const res = await fetch("/api/auth/login", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ idToken: credentialResponse.credential }),
			});

			setShowLoginModal(false);
			if (res.ok) fetchClient();
			else console.error("Google login failed");
		},
		[fetchClient]
	);

	const handleLogout = useCallback(async () => {
		try {
			await fetch("/api/auth/logout", { method: "POST" });
			setClient(null);
			router.reload(); // or push('/')
		} catch (err) {
			console.error("Logout failed", err);
		}
	}, [router]);

	const handleSignIn = useCallback(() => {
		client ? handleLogout() : setShowLoginModal(true);
	}, [client, handleLogout]);

	// Blog creation/deletion redirect
	useEffect(() => {
		const { blogDeleteStatus, blogPostUpdateStatus } = blogInfo;
		const shouldRedirect = blogDeleteStatus.deletedBlogId || blogPostUpdateStatus.createdBlogId;

		if (!shouldRedirect) return;

		if (router.asPath === "/profile") router.reload();
		else router.push("/profile");

		dispatch(resetDeletedBlogId());
		dispatch(resetCreatedBlogId());
	}, [blogInfo, router, dispatch]);

	// Toast auto-reset
	useEffect(() => {
		if (blogInfo.error.isError) {
			const timeout = setTimeout(() => dispatch(resetErrorState()), 4000);
			return () => clearTimeout(timeout);
		}
		if (blogInfo.success.isSuccessful) {
			const timeout = setTimeout(() => dispatch(resetSuccessState()), 4000);
			return () => clearTimeout(timeout);
		}
	}, [blogInfo.error.isError, blogInfo.success.isSuccessful, dispatch]);

	// Derived state
	const picture =
		client?.picture ??
		"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5BSEPxHF0-PRxJlVMHla55wvcxWdSi8RU2g&s";

	const contextValue = useMemo(() => ({ client }), [client]);

	return (
		<BaseContext.Provider value={contextValue}>
			<Container $showModal={showLoginModal}>
				<Navbar
					signInHandler={handleSignIn}
					signedIn={!!client}
					picture={picture}
					hmbgrClickHandler={() => setShowHamburger(true)}
				/>
				{children}
				<FooterComponent />
			</Container>

			<ToastContainer>
				{!!client?.email &&
					ADMIN_EMAILS.includes(client.email) &&
					!router.asPath.startsWith("/blogs/post") && <AddPostButton />}
				<Toast show={blogInfo.error.isError} message={blogInfo.error.message} isError />
				<Toast
					show={blogInfo.success.isSuccessful}
					message={blogInfo.success.message}
					isError={false}
				/>
			</ToastContainer>

			<HamburgerMenu
				showHamburger={showHamburger}
				setShowHamburger={setShowHamburger}
				signInHandler={handleSignIn}
				signedIn={!!client}
				picture={picture}
			/>

			<Modal
				showModal={
					showLoginModal ||
					blogInfo.blogPostUpdateStatus.isLoading ||
					blogInfo.blogDeleteStatus.isLoading
				}
				hideModal={() => setShowLoginModal(false)}
			>
				{showLoginModal ? <LoginCard successHandler={handleLoginSuccess} /> : <Loader />}
			</Modal>
		</BaseContext.Provider>
	);
};

export default React.memo(Base);
