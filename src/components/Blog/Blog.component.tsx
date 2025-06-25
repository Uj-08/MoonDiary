import React, { useCallback, useContext, useEffect, useState } from "react";
import {
	ButtonContainer,
	Container,
	OverlayContainer,
	PostButton,
	Preview,
	PreviewContainer,
	PreviewImageContainer,
	MetaBadge,
	ViewsIcon,
	MetaDivision,
} from "./Blog.styles";
import { PreviewData } from "../Editor/Editor.styles";
import ShimmerImage from "../ImageComponent/ShimmerImage.component";
import { BaseContext, BaseContextType } from "@/containers/Base/Base";
import { BlogPreviewContent } from "../Editor/BlogContentStyle";
import { PopulatedBlogType } from "@/types/blog";
import parse from "html-react-parser";
import { getReadingTime } from "@/helpers/getReadingTime";
import { stripHtml } from "string-strip-html";
import { deleteBlog } from "@/redux/slices/blogInfo";
import { useDispatch } from "react-redux";
import Modal from "@/containers/Modal/Modal.component";
import DeleteCard from "../DeletePrompt/DeleteCard.component";
import { useRouter } from "next/router";
import { AppDispatch } from "@/redux/store";
import AdditionalSectionComponent from "./AdditionalSection/AdditionalSection.component";

const BlogComponent = ({ blog }: { blog: PopulatedBlogType }) => {
	const { _id, isDraft, views, authorEmail, blogTitle, blogData, blogImg } = blog;
	const dispatch = useDispatch<AppDispatch>();
	const router = useRouter();
	const context = useContext<BaseContextType | null>(BaseContext);
	const text = stripHtml(blogData).result;
	const readingTime = `${getReadingTime(text)} min read`;
	const [showDeleteModal, setShowDeleteModal] = useState(false);

	const showDeleteModalHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.stopPropagation();
		setShowDeleteModal(true);
	};

	const editBlogHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.stopPropagation();
		router.push(`/blogs/post/${_id}`);
	};

	const deleteBlogHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.stopPropagation();
		setShowDeleteModal(false);
		router.push("/").then(() => {
			dispatch(deleteBlog(_id));
		});
	};

	const registerViewHandler = useCallback(async () => {
		try {
			await fetch(`/api/blogs/${_id}?action=view`);
		} catch (err) {
			console.log(err);
		}
	}, [_id]);

	useEffect(() => {
		const key = `viewed-${_id}`;
		if (!isDraft && !sessionStorage.getItem(key)) {
			registerViewHandler();
			sessionStorage.setItem(key, "true");
		}
	}, [_id, isDraft, registerViewHandler]);

	return (
		<Container>
			<PreviewContainer>
				<Preview>
					<PreviewImageContainer>
						<OverlayContainer>
							<MetaBadge>
								<MetaDivision>{readingTime}</MetaDivision>
								{/* <LikeDivision>+{55}</LikeDivision>
								<MetaDivision>
									<CommentsIcon />
									{23}
								</MetaDivision> */}
								<MetaDivision>
									<ViewsIcon />
									{views}
								</MetaDivision>
							</MetaBadge>
						</OverlayContainer>
						{context?.client?.email === authorEmail && (
							<ButtonContainer>
								<PostButton onClick={editBlogHandler}>Edit</PostButton>
								<PostButton onClick={showDeleteModalHandler}>Delete</PostButton>
							</ButtonContainer>
						)}
						<Modal
							showModal={showDeleteModal}
							hideModal={() => {
								setShowDeleteModal(false);
							}}
						>
							<DeleteCard
								blogTitle={blogTitle}
								onDeleteHandler={deleteBlogHandler}
								onCancelHandler={() => {
									setShowDeleteModal(false);
								}}
							/>
						</Modal>
						<ShimmerImage aspectRatio={4 / 3} src={blogImg} alt="MoonDiary Hero" isPriority />
					</PreviewImageContainer>
					<PreviewData>
						<BlogPreviewContent>{blog?.blogData ? parse(blogData) : ""}</BlogPreviewContent>
					</PreviewData>
				</Preview>
			</PreviewContainer>
			<AdditionalSectionComponent blog={blog} client={context?.client} />
		</Container>
	);
};

export default React.memo(BlogComponent);
