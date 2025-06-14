import Base from "@/containers/Base/Base";
import EditorComponent from "@/components/Editor/Editor.component";
import NextHead from 'next/head';
import { getCookie, hasCookie } from "cookies-next";
import { COOKIE_NAME } from "@/helpers/constants";
import { GetServerSideProps } from "next";
import jwtDecode from "jwt-decode";
import { ClientType } from "@/types/client";
import { PopulatedBlogType } from "@/types/blog";


function BlogPost({ sessionId, blog }: { sessionId: string; blog: PopulatedBlogType }) {
    return (
        <>
            <NextHead>
                <title>MoonDiary | New Blog</title>
            </NextHead>
            <EditorComponent blog={blog} sessionId={sessionId} />
        </>
    )
}

export default BlogPost;

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { req, res, query } = context;
    const blogId = query.blogId;

    const isSessionAvailable = hasCookie(COOKIE_NAME, { req, res })
    const resData = await fetch(`${process.env.BASE_URL}/api/blogs/${blogId}`);
    const blog: PopulatedBlogType = await resData.json();

    let sessionId;

    if (isSessionAvailable) {
        sessionId = getCookie(COOKIE_NAME, { req, res });
        const clientObj: ClientType = jwtDecode(sessionId as string);
        if (clientObj.email !== blog.authorEmail)
            return {
                redirect: {
                    permanent: false,
                    destination: "/"
                }
            }
    } else {
        return {
            redirect: {
                permanent: false,
                destination: "/"
            }
        }
    }

    return {
        props: {
            blog,
            sessionId
        }
    }
}