import React, { useState, useRef, ReactNode, useContext } from "react";
import Image from "next/image";
import { Editor } from "@tinymce/tinymce-react";
import { useDispatch } from "react-redux";
import parse from "html-react-parser";
import slugify from "slugify";

import { AppDispatch } from "@/redux/store";
import { postBlog, updateBlog } from "@/redux/slices/blogInfo";
import ShimmerImage from "../ImageComponent/ShimmerImage.component";
import InputTagComponent from "./TagSuggestion/TagSuggestion.component";
import DraftToggle from "./ToogleDraft/ToogleDraft.component";
import placeholderImage from "public/4-3.png";

import {
	BlogTitle,
	BlogTitleContainer,
	Button,
	Container,
	DraftField,
	EditorContainer,
	Preview,
	PreviewContainer,
	PreviewData,
	PreviewImageContainer,
	TitleText,
} from "./Editor.styles";
import { blogContentStyle, BlogPreviewContent } from "./BlogContentStyle";
import { BlogType } from "@/types/blog";
import { EditorComponentProps } from "./Editor.types";
import EditorInitButton from "./EditorIntitButton/EditorIntitButton.component";
import { Shimmer } from "../ImageComponent/ShimmerImage.styles";
import { BaseContext, BaseContextType } from "@/containers/Base/Base";

const EditorComponent = ({ blog }: EditorComponentProps) => {
	const editorRef = useRef<any>(null);
	const dispatch = useDispatch<AppDispatch>();

	const [preview, setPreview] = useState<string | ReactNode>(
		blog?.blogData ? (parse(blog.blogData) as ReactNode) : "Write Something..."
	);
	const [title, setTitle] = useState(blog?.blogTitle ?? "");
	const [description, setDescription] = useState(blog?.description ?? "");
	const [imageLinkText, setImageLinkText] = useState(blog?.blogImg ?? "");
	const [imageLink, setImageLink] = useState(blog?.blogImg ?? "");
	const [tagsArr, setTagsArr] = useState<string[]>([]);
	const [isDraft, setIsDraft] = useState(blog?.isDraft ?? true);
	const [isEditorInit, setIsEditorInit] = useState(false);
	const [shouldInitEditor, setShouldInitEditor] = useState(false);
	const context = useContext<BaseContextType | null>(BaseContext);

	let debounce: NodeJS.Timeout | undefined;

	const keyUpHandler = () => {
		clearTimeout(debounce);
		debounce = setTimeout(previewHandler, 200);
	};

	const previewHandler = () => {
		const html = editorRef.current?.getContent();
		if (html) setPreview(parse(html));
	};

	const submitHandler = () => {
		const html = editorRef.current?.getContent();
		const generatedSlug = slugify(title, { lower: true, strict: true });

		if (context?.client?.email) {
			const authorObj: { name?: string; picture?: string; email?: string } = context.client;

			const reqBody = {
				...blog,
				blogTitle: title,
				slug: generatedSlug,
				description,
				blogImg: imageLink,
				blogData: html,
				authorName: authorObj.name as string,
				authorPicture: authorObj.picture as string,
				authorEmail: authorObj.email as string,
				isDraft,
				tags: tagsArr,
			};

			dispatch(blog ? updateBlog(reqBody as BlogType) : postBlog(reqBody));
		}
	};

	const initializeEditor = () => {
		setShouldInitEditor(true);
	};

	return (
		<>
			<BlogTitleContainer>
				<BlogTitle>{title || "Blog Title..."}</BlogTitle>
			</BlogTitleContainer>

			<Container>
				<PreviewContainer>
					<Preview>
						<PreviewImageContainer>
							{imageLink === "" ? (
								<Image src={placeholderImage} alt="placeholder" placeholder="blur" fill />
							) : (
								<ShimmerImage src={imageLink} alt={"hero"} aspectRatio={4 / 3} isPriority />
							)}
						</PreviewImageContainer>

						<PreviewData>
							<BlogPreviewContent>{preview}</BlogPreviewContent>
						</PreviewData>
					</Preview>
				</PreviewContainer>

				<EditorContainer>
					<DraftField>
						Draft: <DraftToggle isDraft={isDraft} setIsDraft={setIsDraft} />
					</DraftField>

					<TitleText
						type="text"
						value={title}
						onChange={(e) => setTitle(e.target.value)}
						placeholder="Title..."
					/>

					<TitleText
						type="text"
						value={imageLinkText}
						onChange={(e) => setImageLinkText(e.target.value)}
						onBlur={() => setImageLink(imageLinkText)}
						placeholder="Image Link"
					/>

					<InputTagComponent tags={blog?.tags} setTagsArr={setTagsArr} />

					<TitleText
						type="text"
						value={description}
						onChange={(e) => setDescription(e.target.value)}
						placeholder="Description..."
					/>

					<EditorContainer>
						<EditorInitButton
							shouldInitEditor={shouldInitEditor}
							initializeEditor={initializeEditor}
						/>
						{!isEditorInit && <Shimmer className="shimmer" $isLoading />}
						{shouldInitEditor && (
							<Editor
								initialValue={blog?.blogData}
								apiKey={process.env.NEXT_PUBLIC_MCE_KEY}
								onInit={(_, editor) => {
									editorRef.current = editor;
									setIsEditorInit(true);
								}}
								onKeyUp={keyUpHandler}
								init={{
									height: 700,
									placeholder: "Start writing your blog here...",
									plugins: "autolink link image lists code table hr preview fullscreen",
									toolbar:
										"undo redo | formatselect | bold italic underline blockquote | alignleft aligncenter alignright alignjustify | bullist numlist | link image table | code fullscreen preview",
									branding: false,
									content_style: blogContentStyle,
								}}
							/>
						)}
					</EditorContainer>

					<Button onClick={submitHandler}>{blog?.blogTitle ? "Update" : "Submit"}</Button>
				</EditorContainer>
			</Container>
		</>
	);
};

export default React.memo(EditorComponent);
