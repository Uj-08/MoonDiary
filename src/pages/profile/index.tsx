import React from "react";
import { GetServerSideProps } from "next";
import Head from "next/head";
import { PopulatedBlogType } from "@/types/blog";
import ProfileComponent from "@/components/Pages/Profile/Profile.component";

const Profile = ({
	blogsArray,
	sessionId,
}: {
	blogsArray: PopulatedBlogType[];
	sessionId: string;
}) => {
	return (
		<>
			<Head>
				<meta name="robots" content="index,follow" />
				<link rel="canonical" href={`${process.env.NEXT_PUBLIC_BASE_URL}/profile`} />
			</Head>
			<ProfileComponent blogsArray={blogsArray} sessionId={sessionId} />
		</>
	);
};

export default Profile;

export const getServerSideProps: GetServerSideProps = async (context) => {
	const { req, query } = context;
	const cookieHeader = req.headers.cookie ?? "";
	const { sort = "updatedAt", order = "-1", showDrafts = "false", showPublished = "true" } = query;

	const API_INSTANCE = new URL("/api/blogs", process.env.NEXT_PUBLIC_BASE_URL);
	API_INSTANCE.searchParams.set("sort", String(sort));
	API_INSTANCE.searchParams.set("order", String(order));
	API_INSTANCE.searchParams.set("showDrafts", String(showDrafts));
	API_INSTANCE.searchParams.set("showPublished", String(showPublished));

	let token = "";

	try {
		const apiRes = await fetch(API_INSTANCE, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				"Cookie": cookieHeader, // ✅ Manually pass cookies for SSR call
			},
		});

		if (!apiRes.ok) throw new Error(`API responded with status ${apiRes.status}`);

		const blogsArray: PopulatedBlogType[] = await apiRes.json();

		return {
			props: {
				blogsArray,
				sessionId: token,
			},
		};
	} catch (error: any) {
		console.log(error);
		return {
			redirect: {
				destination: "/500",
				permanent: false,
			},
		};
	}
};
