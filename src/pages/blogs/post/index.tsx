import Base from "@/containers/Base/Base";
import EditorComponent from "@/components/Editor/Editor.component";
import NextHead from 'next/head';


function BlogPost() {

    return (
        <>
            <NextHead>
                <title>MoonDiary | Post</title>
            </NextHead>
            <Base>  
                <EditorComponent />
            </Base>
        </>
    )
}

export default BlogPost;