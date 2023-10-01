import Base from "@/containers/Base/Base";
import EditorComponent from "@/components/Editor/Editor.component";
import NextHead from 'next/head';
import { useEffect, useState } from "react";
import { getCookie, hasCookie } from "cookies-next";
import { COOKIE_NAME } from "@/constants";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { Loading } from "@/pages";
import Image from "next/image";
import { GetServerSideProps } from "next";


function BlogPost({ sessionId }: { sessionId: string }) {
    const isEditorInit = useSelector((state: RootState) => state.blogInfo.isEditorInit);
    return (
        <>
            <NextHead>
                <title>MoonDiary | Post</title>
            </NextHead>
            {!isEditorInit && 
                <Loading>
                    <div>
                        <Image src="/logo.png" alt="loading" fill={true}/>
                    </div>
              </Loading>
            }
            <Base>  
                <EditorComponent sessionId={sessionId}/>
            </Base>
        </>
    )
}

export default BlogPost;

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { req, res } = context;

    const isSessionAvailable = hasCookie(COOKIE_NAME, {req, res})

    let sessionId;

    if(isSessionAvailable) {
         sessionId = getCookie(COOKIE_NAME, {req, res});
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
        sessionId
      }
    }
  }