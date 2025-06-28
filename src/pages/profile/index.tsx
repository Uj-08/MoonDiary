import React from "react";
import { GetServerSideProps } from "next";
import Head from "next/head";
import { PopulatedBlogType } from "@/types/blog";
import ProfileComponent from "@/components/Pages/Profile/Profile.component";
import { ADMIN_EMAILS } from "@/helpers/constants";

const Profile = ({
	blogsArray,
	isAdmin,
}: {
	blogsArray: PopulatedBlogType[];
	isAdmin: boolean;
}) => {
	return (
		<>
			<Head>
				<meta name="robots" content="index,follow" />
				<link rel="canonical" href={`${process.env.NEXT_PUBLIC_BASE_URL}/profile`} />
			</Head>
			<ProfileComponent blogsArray={blogsArray} isAdmin={isAdmin} />
		</>
	);
};

export default Profile;

export const getServerSideProps: GetServerSideProps = async ({ req, query }) => {
	const cookieHeader = req.headers.cookie ?? "";
	const {
		sort = "updatedAt",
		order = "-1",
		showDrafts = "false",
		showPublished = "true",
		fetchLiked = "false",
	} = query;

	const apiBaseUrl = process.env.NEXT_PUBLIC_BASE_URL!;
	const API_INSTANCE = new URL("/api/blogs", apiBaseUrl);
	API_INSTANCE.searchParams.set("sort", String(sort));
	API_INSTANCE.searchParams.set("order", String(order));

	let isAdmin = false;

	try {
		// Try fetching user
		const userRes = await fetch(`${apiBaseUrl}/api/me`, {
			headers: {
				"Content-Type": "application/json",
				"Cookie": cookieHeader,
			},
		});

		if (userRes.ok) {
			const { user } = await userRes.json();
			isAdmin = ADMIN_EMAILS.includes(user.email);
			if (isAdmin) {
				// Admins see drafts/published
				API_INSTANCE.searchParams.set("showDrafts", String(showDrafts));
				API_INSTANCE.searchParams.set("showPublished", String(showPublished));
				API_INSTANCE.searchParams.set("fetchLiked", String(fetchLiked));
			} else {
				API_INSTANCE.searchParams.set("showDrafts", String(false));
				API_INSTANCE.searchParams.set("showPublished", String(false));
				API_INSTANCE.searchParams.set("fetchLiked", String(true));
			}
		} else {
			return {
				redirect: {
					destination: "/login?origin=/profile",
					permanent: false,
				},
			};
		}

		const blogsRes = await fetch(API_INSTANCE.toString(), {
			headers: {
				"Content-Type": "application/json",
				"Cookie": cookieHeader,
			},
		});

		if (!blogsRes.ok) throw new Error(`Failed to fetch blogs. Status ${blogsRes.status}`);

		const blogsArray: PopulatedBlogType[] = await blogsRes.json();

		return {
			props: {
				blogsArray,
				isAdmin,
			},
		};
	} catch (err) {
		console.error("getServerSideProps error:", err);
		// Fallback: show empty profile instead of redirecting
		return {
			props: {
				blogsArray: [],
				isAdmin: false,
			},
		};
	}
};
