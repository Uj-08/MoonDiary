import React, { useState, useEffect } from "react";
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
  Container,
  DeleteButton,
  EditButton,
  ImageContainer,
  MainContent,
  MoreTag,
  Tag,
  TagsContainer,
} from "./Card.styles";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { deleteBlog, resetDeletedBlogId } from "@/redux/slices/blogInfo";
import Modal from "@/containers/Modal/Modal";
import DeleteCard from "../DeletePrompt/DeleteCard";
import ImageComponent from "../ImageComponent/ImageComponent";
import Link from "next/link";
import { useShuffledColors } from "@/hooks/useShuffledColors";
import { stripHtml } from 'string-strip-html';

export interface DynamicCardTypes {
  blog: {
    _id: string;
    authorEmail: string;
    authorName: string;
    authorPicture: string;
    blogData: string;
    blogTitle: string;
    blogImg: string;
    updatedAt: string;
    tags: [
      {
        _id: string
        name: string
      }
    ],
    isDraft: boolean
  };
  clientEmail?: string;
  index: number;
}

export default function DynamicCard({ blog, clientEmail, index }: DynamicCardTypes) {
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

  const blogDeleteStatus = useSelector(
    (state: RootState) => state.blogInfo.blogDeleteStatus
  );
  const dispatch = useDispatch<AppDispatch>();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (blogDeleteStatus.deletedBlogId) {
      router.replace(router.asPath);
      dispatch(resetDeletedBlogId());
    }
  }, [blogDeleteStatus.deletedBlogId, dispatch, router]);

  const blogBody = stripHtml(blogData)

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
    e.stopPropagation();
    setShowDeleteModal(true);
  }

  async function editBlogHandler(e: React.MouseEvent<HTMLButtonElement>) {
    e.stopPropagation();
    router.push(`blogs/post/${_id}`);
  }

  async function deleteBlogHandler(e: React.MouseEvent<HTMLButtonElement>) {
    e.stopPropagation();
    const reqObj = {
      blogId: _id,
    };
    dispatch(deleteBlog(reqObj));
    setShowDeleteModal(false);
  }

  const getRandomColor = useShuffledColors();

  return (
    <Link href={`/blogs/${_id}`} legacyBehavior>
      <Container isDraft={isDraft}>
        <ImageContainer>
          <ImageComponent
            src={blogImg}
            aspectRatio={4 / 3}
            alt={"Card Image"}
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
                      <Link key={tag._id} href={`/features/${tag._id}`} legacyBehavior>
                        <Tag title={`#${tag.name}`} maxWidth={"90px"} fontSize="12px" letterSpacing="0.5px" bgColor={getRandomColor()} ><span>#{tag.name}</span></Tag>
                      </Link>

                    )
                  })
                }
                {Array.isArray(tags) && tags.length > 0 && tags.length > 2 &&
                  <MoreTag title={tags.slice(2).map((tag) => `#${tag.name}`).join(" ")} color={getRandomColor()}>+{tags.length - 2} more</MoreTag>
                }
              </TagsContainer>
            </BlogHeader>
            <BlogTitle>{blogTitle}</BlogTitle>
            <BlogData>{blogBody.result}</BlogData>
          </MainContent>
          <BlogAuthorContainer>
            <BlogAuthor>
              <AuthorProfile>
                <ImageComponent
                  src={authorPicture}
                  aspectRatio={1}
                  alt={"profile picture"}
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
  );
}
