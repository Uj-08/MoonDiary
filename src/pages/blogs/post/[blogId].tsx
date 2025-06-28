import EditorComponent from "@/components/Editor/Editor.component";
import Head from "next/head";
import { getCookie, hasCookie } from "cookies-next";
import { ACCESS_COOKIE, COOKIE_NAME } from "@/helpers/constants";
import { GetServerSideProps } from "next";
import jwtDecode from "jwt-decode";
import { ClientType } from "@/types/client";
import { PopulatedBlogType } from "@/types/blog";
import { EditorComponentProps } from "@/components/Editor/Editor.types";

const BlogPost = ({ blog }: EditorComponentProps) => {
	return (
		<>
			<Head>
				<title>{blog?.blogTitle ? `${blog.blogTitle} | MoonDiary` : "MoonDiary | Edit Blog"}</title>
				<meta name="robots" content="noindex, nofollow" />
			</Head>
			<EditorComponent blog={blog} />
		</>
	);
};

export default BlogPost;

export const getServerSideProps: GetServerSideProps = async (context) => {
	const { req, query } = context;
	const { blogId } = query;
	const cookieHeader = req.headers.cookie ?? "";

	if (!blogId || typeof blogId !== "string") {
		return {
			redirect: {
				destination: "/404",
				permanent: false,
			},
		};
	}

	try {
		const meRes = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/me`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				"Cookie": cookieHeader, // ✅ Manually pass cookies for SSR call
			},
		});
		if (!meRes.ok) throw new Error("Cannot authenticate");

		const clientObj: ClientType = (await meRes.json()).user;
		console.log({ clientObj });

		// Fetch blog
		const API_INSTANCE = new URL(`/api/blogs/${blogId}`, process.env.NEXT_PUBLIC_BASE_URL);
		const apiRes = await fetch(API_INSTANCE);

		if (!apiRes.ok) throw new Error(`API error: ${apiRes.status}`);
		const blog: PopulatedBlogType = await apiRes.json();

		// Author check
		if (clientObj.email !== blog.authorEmail) throw new Error("Unauthorized: author mismatch");

		return {
			props: {
				blog,
			},
		};
	} catch (error) {
		console.error("Error in getServerSideProps:", error);
		return {
			redirect: {
				destination: `/500?origin=/post/${query.blogId}`,
				permanent: false,
			},
		};
	}
};
