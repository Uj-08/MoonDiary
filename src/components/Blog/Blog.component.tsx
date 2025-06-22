import React, { useContext, useState } from "react";
import {
	ButtonContainer,
	Container,
	OverlayContainer,
	PostButton,
	Preview,
	PreviewContainer,
	PreviewImageContainer,
	ReadTimeBadge,
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
	const dispatch = useDispatch<AppDispatch>();
	const router = useRouter();
	const context = useContext<BaseContextType | null>(BaseContext);
	const text = stripHtml(blog.blogData).result;
	const readingTime = `${getReadingTime(text)} min read`;
	const [showDeleteModal, setShowDeleteModal] = useState(false);

	const showDeleteModalHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.stopPropagation();
		setShowDeleteModal(true);
	};

	const editBlogHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.stopPropagation();
		router.push(`/blogs/post/${blog._id}`);
	};

	const deleteBlogHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.stopPropagation();
		setShowDeleteModal(false);
		router.push("/").then(() => {
			dispatch(deleteBlog(blog._id));
		});
	};

	return (
		<Container>
			<PreviewContainer>
				<Preview>
					<PreviewImageContainer>
						<OverlayContainer>
							<ReadTimeBadge>{readingTime}</ReadTimeBadge>
						</OverlayContainer>
						{context?.client?.email === blog.authorEmail && (
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
								blogTitle={blog.blogTitle}
								onDeleteHandler={deleteBlogHandler}
								onCancelHandler={() => {
									setShowDeleteModal(false);
								}}
							/>
						</Modal>
						<ShimmerImage aspectRatio={4 / 3} src={blog.blogImg} alt="MoonDiary Hero" isPriority />
					</PreviewImageContainer>
					<PreviewData>
						<BlogPreviewContent>{blog?.blogData ? parse(blog.blogData) : ""}</BlogPreviewContent>
					</PreviewData>
				</Preview>
			</PreviewContainer>
			<AdditionalSectionComponent blog={blog} client={context?.client} />
		</Container>
	);
};

export default React.memo(BlogComponent);
