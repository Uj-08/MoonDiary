import { useState, useRef, ReactNode } from "react"
import { Editor } from "@tinymce/tinymce-react"
import { BlogTitle, BlogTitleContainer, Button, Container, DraftField, EditorContainer, Preview, PreviewContainer, PreviewData, PreviewImageContainer, RemoveImage, Span, TitleText } from "./Editor.styles";
import parse from "html-react-parser";
import jwtDecode from "jwt-decode";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { postBlog, updateBlog } from "@/redux/slices/blogInfo";
import ImageComponent, { Shimmer } from "../ImageComponent/ImageComponent";
import InputTagComponent from "./InputTagComponent/InputTagComponent";
import IsDraftToggle from "./ToogleDraft";
import slugify from "slugify";

function EditorComponent({ sessionId, blogData }: { sessionId: string; blogData?: { blogTitle: string; blogImg: string; blogData: string; blogId: string, isDraft: boolean, tags: [{ _id: string, name: string }] } }) {
    const editorRef = useRef<any>(null);
    const [preview, setPreview] = useState<string | ReactNode>(blogData?.blogData ? parse(blogData?.blogData) : "Write Something...");
    const [title, setTitle] = useState(blogData?.blogTitle || "");
    const [seoDescription, setSeoDescription] = useState(blogData?.seoDescription || "");
    const [imageLinkText, setImageLinkText] = useState(blogData?.blogImg || "");
    const [imageLink, setImageLink] = useState(blogData?.blogImg || "");
    const [tagsArr, setTagsArr] = useState<string[]>([]);
    const [isDraft, setIsDraft] = useState(blogData?.isDraft ?? true)
    const [isEditorInit, setIsEditorInit] = useState(false);
    const dispatch = useDispatch<AppDispatch>();

    let debounce: NodeJS.Timeout | undefined;

    function keyUpHandler() {
        clearTimeout(debounce);
        debounce = setTimeout(() => {
            previewHandler();
        }, 200)
    }

    function previewHandler() {
        const html = editorRef?.current?.getContent();
        if (html) setPreview(parse(html));
    }

    function submitHandler() {
        const html = editorRef?.current?.getContent();
        const generatedSlug = slugify(title, {
            lower: true,
            strict: true
        });
        if (sessionId !== "") {
            const authorObj: { name?: string, picture?: string, email?: string } = jwtDecode(sessionId);
            if (blogData) {
                const reqBody = {
                    blogId: blogData.blogId,
                    blogTitle: title,
                    slug: generatedSlug,
                    seoDescription: seoDescription,
                    blogImg: imageLink,
                    blogData: html,
                    authorName: authorObj.name as string,
                    authorPicture: authorObj.picture as string,
                    authorEmail: authorObj.email as string,
                    isDraft: isDraft,
                    tags: tagsArr,
                }
                dispatch(updateBlog(reqBody));
            } else {
                const reqBody = {
                    blogTitle: title,
                    slug: generatedSlug,
                    seoDescription: seoDescription,
                    blogImg: imageLink,
                    blogData: html,
                    authorName: authorObj.name as string,
                    authorPicture: authorObj.picture as string,
                    authorEmail: authorObj.email as string,
                    isDraft: isDraft,
                    tags: tagsArr,
                }
                dispatch(postBlog(reqBody));
            }
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
                            <ImageComponent
                                src={imageLink || "/4-3.png"}
                                alt={"4/3-ratio-image"}
                                aspectRatio={4 / 3}
                                isPriority
                            />
                        </PreviewImageContainer>
                        <PreviewData>
                            {preview}
                        </PreviewData>
                    </Preview>
                </PreviewContainer>
                <EditorContainer>
                    <DraftField>
                        Draft: <IsDraftToggle isDraft={isDraft} setIsDraft={setIsDraft} />
                    </DraftField>
                    <TitleText type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title..." />
                    <TitleText type="text" value={seoDescription} onChange={(e) => setSeoDescription(e.target.value)} placeholder="SEO description..." />
                    <InputTagComponent tags={blogData?.tags} setTagsArr={setTagsArr} />
                    <TitleText type="text" value={imageLinkText} onChange={(e) => setImageLinkText(e.target.value)} onBlur={() => setImageLink(imageLinkText)} placeholder="Image Link" />
                    <EditorContainer>
                        {!isEditorInit &&
                            <Shimmer className="shimmer" isLoading />
                        }
                        <Editor
                            initialValue={blogData?.blogData}
                            apiKey={process.env.NEXT_PUBLIC_MCE_API}
                            onInit={(evt, editor) => {
                                editorRef.current = editor;
                                setIsEditorInit(true);
                            }}
                            onKeyUp={keyUpHandler}
                            init={{
                                height: 700,
                                content_style: "@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@500&display=swap'); * { font-family: \"Montserrat\", sans-serif;}  @media (max-width: 670px) {body {font-size: 95%;}} @media (max-width: 570px) {body {font-size: 90%;}} @media (max-width: 470px) {body {font-size: 85%;}} @media (max-width: 400px) {body {font-size: 80%;}}",
                            }}
                        />
                    </EditorContainer>
                    <Button onClick={submitHandler}>
                        {
                            blogData?.blogTitle ? "Update" : "Submit"
                        }
                    </Button>
                </EditorContainer>
            </Container>
        </>
    )
}

export default EditorComponent