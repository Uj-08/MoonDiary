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
    const [file, setFile] = useState<string>("");

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

    function handleChange(e: any) {
        setFile(URL.createObjectURL(e.target.files[0]));
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
                        <Image src={file || "/169.png"} alt={"16/9-ratio-image"} fill={true} />
                        {!file && <input id="image-upload" type="file" onChange={handleChange} accept="image/png, image/jpeg" style={{ display: "none" }} />}
                        {!file && <InputFileLabel htmlFor="image-upload">&#8593; Upload Image</InputFileLabel>}
                        {file && <RemoveImage onClick={() => setFile("")} >X Remove Image</RemoveImage>}
                    </PreviewImageContainer>
                    <PreviewData>
                        {preview}
                    </PreviewData>
                </Preview>
            </PreviewContainer>
            <EditorContainer>
                <TitleText type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Blog Title..." />
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