import { useState, useRef, ReactNode } from "react"
import { Editor } from "@tinymce/tinymce-react"
import { BlogTitle, BlogTitleContainer, Button, Container, EditorContainer, InputFileLabel, Preview, PreviewContainer, PreviewData, PreviewImageContainer, RemoveImage, Span, TitleText } from "./Editor.styles";
import Image from "next/image";
import parse from "html-react-parser";
import jwtDecode from "jwt-decode";


function EditorComponent({ sessionId }: {sessionId: string}) {
    const editorRef = useRef<any>(null);
    const [preview, setPreview] = useState<string | ReactNode>("Write Something...");
    const [title, setTitle] = useState("");
    const [imageLinkText, setImageLinkText] = useState("");
    const [imageLink, setImageLink] = useState("");

    let debounce: NodeJS.Timeout | undefined;

    function keyUpHandler() {
        clearTimeout(debounce);
        debounce = setTimeout(() => {
            previewHandler();
        }, 200)
    }

    function previewHandler() {
        const html = editorRef?.current?.getContent();
        if(html) setPreview(parse(html));
    }

    function submitHandler() {
        if(sessionId !== ""){
            const authorObj: {name?: string, picture?:string, email?:string} = jwtDecode(sessionId);
            if(authorObj?.email === "ujjwalpandey24@gmail.com" || authorObj?.email === "sinhashairee6@gmail.com") {
                const html = editorRef.current?.getContent();
                const reqBody = {
                    blogTitle: title,
                    blogImg: imageLink,
                    blogData: html,
                    authorName: authorObj.name,
                    authorPicture: authorObj.picture,
                    authorEmail: authorObj.email,
                    date: Date.now(),
                }
                fetch("/api/blogs", {
                    method: "POST",
                    body: JSON.stringify(reqBody),
                    headers: {
                        "Content-Type": "application/json",
                    }
                })
                    .then(res => res.json())
                    .then(data => console.log(data));
            } else {
                console.log("Unauthorized User");
            }
        } else {
            console.log("Not logged in")
        }
    }

    return (
        <>
        <BlogTitleContainer>
            <BlogTitle>{title || "Blog Title..."}</BlogTitle>
        </BlogTitleContainer>
        <Container>
            <PreviewContainer>
                {/* <Span>Preview:</Span> */}
                <Preview>
                    <PreviewImageContainer>
                        <Image src={imageLink || "/4-3.png"} alt={"4/3-ratio-image"} fill={true} />
                    </PreviewImageContainer>
                    <PreviewData>
                        {preview}
                    </PreviewData>
                </Preview>
            </PreviewContainer>
            <EditorContainer>
                <TitleText type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Blog Title..." />
                <TitleText type="text" value={imageLinkText} onChange={(e) => setImageLinkText(e.target.value)} onBlur={() => setImageLink(imageLinkText)} placeholder="Image Link" />
                <Editor
                    apiKey={process.env.NEXT_PUBLIC_MCE_API}
                    onInit={(evt, editor) => {
                        editorRef.current = editor
                    }}
                    onKeyUp={keyUpHandler}
                    init={{
                        height: 700,
                        content_style: "@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@500&display=swap'); * { font-family: \"Montserrat\", sans-serif;}",
                    }}
                />
                <Button onClick={submitHandler}>
                    Submit
                </Button>
            </EditorContainer>
        </Container>
        </>
    )
}

export default EditorComponent