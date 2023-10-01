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


function BlogPost() {

    const [sessionId, setSessionId] = useState("")
    const isEditorInit = useSelector((state: RootState) => state.blogInfo.isEditorInit);

    useEffect(() => {
        if(hasCookie(COOKIE_NAME)) {
            const sessionToken = getCookie(COOKIE_NAME) as string;
            setSessionId(sessionToken);
        }
    }, [sessionId])

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