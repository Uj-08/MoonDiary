import Base from "@/containers/Base/Base";
import EditorComponent from "@/components/Editor/Editor.component";
import NextHead from 'next/head';
import { useEffect, useState } from "react";
import { getCookie, hasCookie } from "cookies-next";
import { COOKIE_NAME } from "@/constants";


function BlogPost() {

    const [sessionId, setSessionId] = useState("")

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
            <Base>  
                <EditorComponent sessionId={sessionId}/>
            </Base>
        </>
    )
}

export default BlogPost;