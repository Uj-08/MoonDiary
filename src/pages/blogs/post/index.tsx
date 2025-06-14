import Base from "@/containers/Base/Base";
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

    if (isSessionAvailable) {
        sessionId = getCookie(COOKIE_NAME, { req, res });
    } else {
        return {
            redirect: {
                permanent: false,
                destination: "/",
            },
        };
    }

    return {
        props: {
            sessionId,
        },
    };
};
