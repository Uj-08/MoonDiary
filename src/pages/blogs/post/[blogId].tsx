import Base from "@/containers/Base/Base";
import EditorComponent from "@/components/Editor/Editor.component";
import NextHead from 'next/head';
import { getCookie, hasCookie } from "cookies-next";
import { COOKIE_NAME } from "@/constants";
import { GetServerSideProps } from "next";


function BlogPost({ sessionId, blogData }: { sessionId: string; blogData: { blogTitle: string; blogImg: string; blogData: string; blogId: string } }) {
    return (
        <>
            <NextHead>
                <title>Blog Post</title>
            </NextHead>
            <Base>
                <EditorComponent blogData={blogData} sessionId={sessionId} />
            </Base>
        </>
    )
}

export default BlogPost;

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { req, res, query } = context;
    const blogId = query.blogId;

    const isSessionAvailable = hasCookie(COOKIE_NAME, { req, res })
    const resData = await fetch(`${process.env.BASE_URL}/api/blogs/${blogId}`);
    const blogData = await resData.json();

    let sessionId;

    if (isSessionAvailable) {
        sessionId = getCookie(COOKIE_NAME, { req, res });
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
            blogData: {
                ...blogData,
                blogId
            },
            sessionId
        }
    }
}