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
	LikeDivision,
	CommentsIcon,
	OverlayRightContainer,
	ShimmerContainer,
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
import { Shimmer } from "../ImageComponent/ShimmerImage.styles";

const BlogComponent = ({ blog }: { blog: PopulatedBlogType }) => {
	const { _id, isDraft, /*authorEmail,*/ blogTitle, blogData, blogImg } = blog;
	const dispatch = useDispatch<AppDispatch>();
	const router = useRouter();
	const context = useContext<BaseContextType | null>(BaseContext);
	const text = stripHtml(blogData).result;
	const readingTime = `${getReadingTime(text)} min read`;
	const [showDeleteModal, setShowDeleteModal] = useState(false);
	const [isMetaLoading, setIsMetaLoading] = useState(true);
	const [likesState, setLikesState] = useState(0);
	const [viewsState, setViewsState] = useState(0);

	// const showDeleteModalHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
	// 	e.stopPropagation();
	// 	setShowDeleteModal(true);
	// };

	// const editBlogHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
	// 	e.stopPropagation();
	// 	router.push(`/blogs/post/${_id}`);
	// };

	const deleteBlogHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.stopPropagation();
		setShowDeleteModal(false);
		router.push("/").then(() => {
			dispatch(deleteBlog(_id));
		});
	};

	const fetchMetaData = useCallback(async () => {
		try {
			setIsMetaLoading(true);
			const metaRes = await fetch(`/api/blogs/${_id}`);
			if (!metaRes.ok) throw new Error("Error");
			const metaData = await metaRes.json();
			if (metaData?.views) setViewsState(metaData.views);
			if (metaData?.likes) setLikesState(metaData.likes);
			setIsMetaLoading(false);
		} catch (err) {
			console.log(err);
		}
	}, [_id]);

	useEffect(() => {
		fetchMetaData();
	}, [fetchMetaData]);

	const registerViewHandler = useCallback(async () => {
		try {
			await fetch(`/api/blogs/${_id}?action=view`);
		} catch (err) {
			console.log(err);
		}
	}, [_id]);

	const toggleLikeHandler = useCallback(async () => {
		try {
			const res = await fetch(`/api/blogs/${_id}?action=like`);
			if (res.ok) {
				const likeRes = await res.json();
				const isLiked = Boolean(likeRes.liked);
				setLikesState((prev) => (isLiked ? prev + 1 : prev - 1));
			}
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
							</MetaBadge>
						</OverlayContainer>
						<OverlayRightContainer>
							<MetaBadge>
								{isMetaLoading ? (
									<ShimmerContainer>
										<Shimmer $isLoading={isMetaLoading} />
									</ShimmerContainer>
								) : (
									<>
										<LikeDivision onClick={toggleLikeHandler}>+{likesState}</LikeDivision>
										<MetaDivision>
											<ViewsIcon />
											{viewsState}
										</MetaDivision>
									</>
								)}
							</MetaBadge>
						</OverlayRightContainer>
						{/* {context?.client?.email === authorEmail && (
							<ButtonContainer>
								<PostButton onClick={editBlogHandler}>Edit</PostButton>
								<PostButton onClick={showDeleteModalHandler}>Delete</PostButton>
							</ButtonContainer>
						)} */}
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
