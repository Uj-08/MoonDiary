import EditorComponent from "@/components/Editor/Editor.component";
import NextHead from "next/head";
import { getCookie, hasCookie } from "cookies-next";
import { COOKIE_NAME } from "@/helpers/constants";
import { GetServerSideProps } from "next";

function BlogPost({ sessionId }: { sessionId: string }) {
	return (
		<>
			<NextHead>
				<title>New Post | MoonDiary</title>
				<meta name="robots" content="noindex, nofollow" />
			</NextHead>
			<EditorComponent sessionId={sessionId} />
		</>
	);
}

export default BlogPost;

export const getServerSideProps: GetServerSideProps = async (context) => {
	const { req, res } = context;

	const isSessionAvailable = hasCookie(COOKIE_NAME, { req, res });

	let sessionId;

	try {
		if (isSessionAvailable) sessionId = await getCookie(COOKIE_NAME, { req, res });
		else throw new Error(`not logged in`);

		return {
			props: {
				sessionId,
			},
		};
	} catch (error) {
		console.log(error);
		return {
			redirect: {
				destination: "/",
				permanent: false,
			},
		};
	}
};
