import React, { useMemo, useState } from "react";
import {
  AuthorDetail,
  AuthorProfile,
  BlogAuthor,
  BlogAuthorContainer,
  BlogData,
  BlogHeader,
  BlogTitle,
  ButtonsContainer,
  CardDetails,
  CardReadTimeBadge,
  Container,
  DeleteButton,
  EditButton,
  ImageContainer,
  MainContent,
  MoreTag,
  Tag,
  TagsContainer,
} from "./ArticleCard.styles";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { deleteBlog } from "@/redux/slices/blogInfo";
import Modal from "@/containers/Modal/Modal.component";
import DeleteCard from "../DeletePrompt/DeleteCard.component";
import ShimmerImage from "../ImageComponent/ShimmerImage.component";
import Link from "next/link";
import { useShuffledColors } from "@/hooks/useShuffledColors";
import { stripHtml } from "string-strip-html";
import { ArticleCardTypes } from "./ArticleCard.types";
import { OverlayContainer } from "../Blog/Blog.styles";
import { getReadingTime } from "@/helpers/getReadingTime";

export const ArticleCard = ({ blog, clientEmail, index }: ArticleCardTypes) => {
  const {
    _id,
    slug,
    authorEmail,
    authorName,
    authorPicture,
    blogData,
    blogTitle,
    blogImg,
    updatedAt,
    tags,
    isDraft,
  } = blog;

  const dispatch = useDispatch<AppDispatch>();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const router = useRouter();

  // Format time ago
  const relTime = useMemo(() => {
    if (!updatedAt) return undefined;

    const formatter = new Intl.RelativeTimeFormat("en", { numeric: "auto" });

    const now = Date.now();
    const updated = new Date(updatedAt).getTime();
    const diffInMs = now - updated;

    const seconds = Math.floor(diffInMs / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    let result;
    if (days >= 1) result = formatter.format(-days, "day");
    else if (hours >= 1) result = formatter.format(-hours, "hour");
    else if (minutes >= 1) result = formatter.format(-minutes, "minute");
    else result = formatter.format(-seconds, "second");

    return /^[a-zA-Z\s]+$/.test(result)
      ? result.charAt(0).toUpperCase() + result.slice(1)
      : result;
  }, [updatedAt]);

  const preventLinkClick = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    e.preventDefault();
    e.stopPropagation();
  }

  const showDeleteModalHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    preventLinkClick(e);
    setShowDeleteModal(true);
  };

  const editBlogHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    preventLinkClick(e);
    router.push(`/blogs/post/${_id}`);
  };

  const deleteBlogHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    preventLinkClick(e)
    dispatch(deleteBlog(_id));
    setShowDeleteModal(false);
  };

  const tagClickHandler = (e: React.MouseEvent<HTMLElement, MouseEvent>, tagId: string) => {
    preventLinkClick(e);
    router.push(`/features/${tagId}`);
  };

  const getRandomColor = useShuffledColors();
  const tagColors = useMemo(() => tags.map(() => getRandomColor()), [getRandomColor, tags]);

  const blogBody = stripHtml(blogData || "").result;
  const readingTime = `${getReadingTime(blogBody)} min read`;

  return (
    <div>
      <Link href={`/blogs/${slug}`}>
        <Container $isDraft={isDraft}>
          <ImageContainer>
            <OverlayContainer>
              <CardReadTimeBadge>{readingTime}</CardReadTimeBadge>
            </OverlayContainer>
            <ShimmerImage
              src={blogImg}
              aspectRatio={4 / 3}
              alt={blogTitle}
              isPriority={index <= 3}
            />
          </ImageContainer>
          <CardDetails>
            <MainContent>
              <BlogHeader>
                <TagsContainer>
                  {tags?.slice(0, 2).map((tag, idx) => (
                    <Tag
                      key={tag._id}
                      title={`#${tag.name}`}
                      onClick={(e) => tagClickHandler(e, tag._id)}
                      $maxWidth="90px"
                      $fontSize="12px"
                      $letterSpacing="0.5px"
                      $bgColor={tagColors[idx]}
                    >
                      <span>#{tag.name}</span>
                    </Tag>
                  ))}
                  {tags?.length > 2 && (
                    <MoreTag
                      title={tags
                        .slice(2)
                        .map((tag) => `#${tag.name}`)
                        .join(" ")}
                      color={getRandomColor()}
                    >
                      +{tags.length - 2} more
                    </MoreTag>
                  )}
                </TagsContainer>
              </BlogHeader>
              <BlogTitle title={blogTitle}>{blogTitle}</BlogTitle>
              <BlogData>{blogBody}</BlogData>
            </MainContent>
            <BlogAuthorContainer>
              <BlogAuthor>
                <AuthorProfile>
                  <ShimmerImage
                    src={authorPicture}
                    aspectRatio={1}
                    alt="profile"
                    isPriority={index <= 3}
                  />
                </AuthorProfile>
                <AuthorDetail>
                  <div>{authorName}</div>
                  <div>{relTime}</div>
                </AuthorDetail>
                {clientEmail === authorEmail && (
                  <ButtonsContainer>
                    <EditButton onClick={editBlogHandler}>Edit</EditButton>
                    <DeleteButton onClick={showDeleteModalHandler}>
                      Delete
                    </DeleteButton>
                  </ButtonsContainer>
                )}
                <Modal
                  showModal={showDeleteModal}
                  hideModal={() => setShowDeleteModal(false)}
                >
                  <DeleteCard
                    blogTitle={blogTitle}
                    onDeleteHandler={deleteBlogHandler}
                    onCancelHandler={() => setShowDeleteModal(false)}
                  />
                </Modal>
              </BlogAuthor>
            </BlogAuthorContainer>
          </CardDetails>
        </Container>
      </Link>
    </div>
  );
};

export default React.memo(ArticleCard);