import Base from "@/containers/Base/Base";
import EditorComponent from "@/components/Editor/Editor.component";
import NextHead from "next/head";
import { getCookie, hasCookie } from "cookies-next";
import { COOKIE_NAME } from "@/constants";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { GetServerSideProps } from "next";
import { useEffect } from "react";
import { updateIsEditorInit } from "@/redux/slices/blogInfo";

function BlogPost({ sessionId }: { sessionId: string }) {
    const isEditorInit = useSelector(
        (state: RootState) => state.blogInfo.isEditorInit
    );
    const dispatch = useDispatch<AppDispatch>();
    useEffect(() => {
        return () => {
            if (isEditorInit) dispatch(updateIsEditorInit(false));
        };
    }, []);
    return (
        <>
            <NextHead>
                <title>MoonDiary | Post</title>
            </NextHead>
            <Base>
                <EditorComponent sessionId={sessionId} />
            </Base>
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
