import Base from "@/containers/Base/Base";
import EditorComponent from "@/components/Editor/Editor.component";
import NextHead from 'next/head';
import { getCookie, hasCookie } from "cookies-next";
import { COOKIE_NAME } from "@/constants";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
// import { Loading } from "@/pages";
// import Image from "next/image";
import { GetServerSideProps } from "next";
import { useEffect } from "react";
import { updateIsEditorInit } from "@/redux/slices/blogInfo";


function BlogPost({ sessionId, blogData }: { sessionId: string; blogData: { blogTitle: string; blogImg: string; blogData: string; blogId: string } }) {
    const isEditorInit = useSelector((state: RootState) => state.blogInfo.isEditorInit);
    const dispatch = useDispatch<AppDispatch>();
    useEffect(() => {
        return () => {
            if (isEditorInit) dispatch(updateIsEditorInit(false));
        }
    }, [])
    return (
        <>
            <NextHead>
                <title>Blog Post</title>
            </NextHead>
            {/* {!isEditorInit && 
                <Loading>
                    <div>
                        <Image src="/logo.png" alt="loading" fill={true}/>
                    </div>
              </Loading>
            } */}
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
    const resData = await fetch(`https://next-moondiary.netlify.app/api/blogs/${blogId}`);
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
                ...blogData.blog,
                blogId
            },
            sessionId
        }
    }
}