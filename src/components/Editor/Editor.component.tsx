import { useState, useRef } from "react"
import { Editor } from "@tinymce/tinymce-react"
import { Button, Container, EditorContainer, Preview, PreviewContainer, PreviewData, PreviewImageContainer } from "./Editor.styles";
import Image from "next/image";
import parse from "html-react-parser";


function EditorComponent() {
    const editorRef = useRef(null);
    const [preview, setPreview] = useState("");
    const [file, setFile] = useState();

    let debounce;

    function keyUpHandler() {
        clearTimeout(debounce);
        debounce = setTimeout(() => {
            previewHandler();
        }, 300)
    }

    function previewHandler() {
        let html = editorRef.current.getContent();
        setPreview(parse(html));
    }

    function submitHandler() {
        console.log(editorRef.current.getContent())
    }

    function handleChange(e: any) {
        setFile(URL.createObjectURL(e.target.files[0]));
    }

    return (
        <Container>
            <PreviewContainer>
                <span>Preview:</span>
                <Preview>
                    <PreviewImageContainer>
                        <Image src={file || "/169.png"} alt={"16/9"} fill={true} />
                        {!file && <input type="file" onChange={handleChange} />}
                    </PreviewImageContainer>
                    <PreviewData>
                        {preview}
                    </PreviewData>
                </Preview>
            </PreviewContainer>
            <EditorContainer>
                <Editor
                    apiKey={process.env.NEXT_PUBLIC_MCE_API}
                    onInit={(evt, editor) => {
                        editorRef.current = editor
                    }}
                    onKeyUp={keyUpHandler}
                    init={{
                        height: 500,
                        content_style: "@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@500&display=swap'); * { font-family: \"Montserrat\", sans-serif;}",
                    }}
                />
                <Button onClick={submitHandler}>
                    Submit
                </Button>
            </EditorContainer>
        </Container>
    )
}

export default EditorComponent