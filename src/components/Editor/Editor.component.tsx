import { useState, useRef, ReactNode } from "react"
import { Editor } from "@tinymce/tinymce-react"
import { Button, Container, EditorContainer, InputFileLabel, Preview, PreviewContainer, PreviewData, PreviewImageContainer, RemoveImage, Span } from "./Editor.styles";
import Image from "next/image";
import parse from "html-react-parser";


function EditorComponent() {
    const editorRef = useRef<any>(null);
    const [preview, setPreview] = useState<string | ReactNode>("");
    const [file, setFile] = useState<string>("");

    let debounce: NodeJS.Timeout | undefined;

    function keyUpHandler() {
        clearTimeout(debounce);
        debounce = setTimeout(() => {
            previewHandler();
        }, 300)
    }

    function previewHandler() {
        const html = editorRef?.current?.getContent();
        if(html) setPreview(parse(html));
    }

    function submitHandler() {
        console.log(editorRef.current?.getContent())
    }

    function handleChange(e: any) {
        setFile(URL.createObjectURL(e.target.files[0]));
    }

    return (
        <Container>
            <PreviewContainer>
                <Span>Preview:</Span>
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