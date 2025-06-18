import React, { useState } from "react";
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
import Modal from "@/containers/Modal/Modal";
import DeleteCard from "../DeletePrompt/DeleteCard";
import ImageComponent from "../ImageComponent/ImageComponent";
import Link from "next/link";
import { useShuffledColors } from "@/hooks/useShuffledColors";
import { stripHtml } from 'string-strip-html';
import { ArticleCardTypes } from "./ArticleCard.types";
import { OverlayContainer } from "../Blog/Blog.styles";
import { getReadingTime } from "@/helpers/getReadingTime";

export const ArticleCard = ({ blog, clientEmail, index }: ArticleCardTypes) => {
  const {
    _id,
    // slug,
    authorEmail,
    authorName,
    authorPicture,
    blogData,
    blogTitle,
    blogImg,
    updatedAt,
    tags,
    isDraft
  } = blog;

  const dispatch = useDispatch<AppDispatch>();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const router = useRouter();

  const formatter = new Intl.RelativeTimeFormat("en", { numeric: "auto" });

  let relTime: string | undefined;

  if (updatedAt) {
    const now = Date.now();
    const updated = new Date(updatedAt).getTime();
    const diffInMs = now - updated;

    const seconds = Math.floor(diffInMs / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days >= 1) {
      relTime = formatter.format(-days, "day");
    } else if (hours >= 1) {
      relTime = formatter.format(-hours, "hour");
    } else if (minutes >= 1) {
      relTime = formatter.format(-minutes, "minute");
    } else {
      relTime = formatter.format(-seconds, "second");
    }

    // Capitalize if it's purely alphabetic (e.g., "yesterday", "an hour ago")
    if (/^[a-zA-Z\s]+$/.test(relTime)) {
      relTime = relTime.charAt(0).toUpperCase() + relTime.slice(1);
    }
  }

  function showDeleteModalHandler(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    e.stopPropagation();
    setShowDeleteModal(true);
  }

  async function editBlogHandler(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    e.stopPropagation();
    router.push(`/blogs/post/${_id}`);
  }

  async function deleteBlogHandler(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    e.stopPropagation();
    dispatch(deleteBlog(_id));
    setShowDeleteModal(false);
  }

  const getRandomColor = useShuffledColors();

  const blogBody = (stripHtml(blogData || '')).result;
  const readingTime = `${getReadingTime(blogBody)} min read`;

  return (
    <div>
      <Link href={`/blogs/${blog.slug}`}>
        <Container $isDraft={isDraft}>
          <ImageContainer>
            <OverlayContainer>
              <CardReadTimeBadge>
                {readingTime}
              </CardReadTimeBadge>
            </OverlayContainer>
            <ImageComponent
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
                  {Array.isArray(tags) && tags.length > 0 &&
                    tags.map((tag, idx) => {
                      if (idx <= 1) return (
                        <Tag
                          key={tag._id.toString()}
                          title={`#${tag.name}`}
                          onClick={() => router.push(`/features/${tag._id}`)}

                          $maxWidth={"90px"}
                          $fontSize="12px"
                          $letterSpacing="0.5px"
                          $bgColor={getRandomColor()}
                        >
                          <span>
                            #{tag.name}
                          </span>
                        </Tag>
                      )
                    })
                  }
                  {Array.isArray(tags) && tags.length > 0 && tags.length > 2 &&
                    <MoreTag title={tags.slice(2).map((tag) => `#${tag.name}`).join(" ")} color={getRandomColor()}>+{tags.length - 2} more</MoreTag>
                  }
                </TagsContainer>
              </BlogHeader>
              <BlogTitle title={blogTitle}>{blogTitle}</BlogTitle>
              <BlogData>{blogBody}</BlogData>
            </MainContent>
            <BlogAuthorContainer>
              <BlogAuthor>
                <AuthorProfile>
                  <ImageComponent
                    src={authorPicture}
                    aspectRatio={1}
                    alt={"profile"}
                    isPriority={index <= 3}
                  />
                </AuthorProfile>
                <AuthorDetail>
                  <div>{authorName}</div>
                  <div>{relTime ?? "unknown"}</div>
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
              </BlogAuthor>
            </BlogAuthorContainer>
          </CardDetails>
        </Container>
      </Link>
    </div>
  );
}

export default (ArticleCard);