import EditorComponent from "@/components/Editor/Editor.component";
import Head from 'next/head';
import { getCookie, hasCookie } from "cookies-next";
import { COOKIE_NAME } from "@/helpers/constants";
import { GetServerSideProps } from "next";
import jwtDecode from "jwt-decode";
import { ClientType } from "@/types/client";
import { PopulatedBlogType } from "@/types/blog";
import { EditorComponentProps } from "@/components/Editor/Editor.types";

const BlogPost = ({ sessionId, blog }: EditorComponentProps ) => {
    return (
        <>
            <Head>
                <title>{blog?.blogTitle ? `${blog.blogTitle} | MoonDiary` : "MoonDiary | Edit Blog"}</title>
                <meta name="robots" content="noindex, nofollow" />
            </Head>
            <EditorComponent blog={blog} sessionId={sessionId} />
        </>
    );
}

export default BlogPost;

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { req, res, query } = context;
    const { blogId } = query;

    if (!blogId || typeof blogId !== "string") {
        return {
            redirect: {
                destination: "/404",
                permanent: false,
            },
        };
    }

    try {
        // Check session
        if (!hasCookie(COOKIE_NAME, { req, res })) throw new Error("No session cookie");

        const sessionToken = await getCookie(COOKIE_NAME, { req, res });
        if (!sessionToken || typeof sessionToken !== "string") throw new Error("Invalid session token");

        const clientObj: ClientType = jwtDecode(sessionToken);

        // Fetch blog
        const API_INSTANCE = new URL(`/api/blogs/${blogId}`, process.env.BASE_URL);
        const apiRes = await fetch(API_INSTANCE);

        if (!apiRes.ok) throw new Error(`API error: ${apiRes.status}`);

        const blog: PopulatedBlogType = await apiRes.json();

        // Author check
        if (clientObj.email !== blog.authorEmail) throw new Error("Unauthorized: author mismatch");

        return {
            props: {
                blog,
                sessionId: sessionToken,
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