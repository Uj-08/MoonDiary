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
// import parse from "html-react-parser";

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
    ]
  };
  clientEmail?: string;
  index: number;
}

export default function DynamicCard({ blog, clientEmail, index }: DynamicCardTypes) {
  const {
    _id,
    authorEmail,
    authorName,
    authorPicture,
    blogData,
    blogTitle,
    blogImg,
    updatedAt,
    tags,
  } = blog;
  // const [blogDataText, setBlogDataText] = useState(removeTags(blogData));
  const blogDeleteStatus = useSelector(
    (state: RootState) => state.blogInfo.blogDeleteStatus
  );
  const dispatch = useDispatch<AppDispatch>();
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    if (blogDeleteStatus.deletedBlogId) {
      router.replace(router.asPath);
      dispatch(resetDeletedBlogId());
    }
  }, [blogDeleteStatus.deletedBlogId]);

  // useEffect(() => {
  //   setBlogDataText(removeTags(blogData));
  // }, [blogData]);

  const router = useRouter();

  function routeHandler() {
    router.push(`/blogs/${_id}`);
  }

  function removeTags(blogData: string) {
    if (blogData === null || blogData === "") return false;
    else blogData = blogData.toString();

    // Regular expression to identify HTML tags in
    // the input string. Replacing the identified
    // HTML tag with a null string.
    const plainText = blogData
      .replace(/<[^>]*>/g, "")           // remove HTML tags
      .replace(/&[a-z]+;|&#\d+;/gi, " ") // remove HTML entities
      .replace(/\s+/g, " ")              // collapse multiple spaces
      .trim();
    return plainText;
  }

  const formatter = new Intl.RelativeTimeFormat("en");
  let relTime;
  if (updatedAt) {
    const diff = new Date().getTime() - new Date(updatedAt).getTime();
    let diffTime = diff / (1000 * 60 * 60 * 24);
    if (diffTime > 1) {
      relTime = formatter?.format(-Math.floor(diffTime), "days");
    } else {
      diffTime = diff / (1000 * 60 * 60);
      relTime = formatter?.format(-diffTime.toPrecision(2), "hours");
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

  return (
    <Container onClick={routeHandler}>
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
                tags.map((tag) => <Tag key={tag._id}>#{tag.name}</Tag>)
              }
            </TagsContainer>
          </BlogHeader>
          <BlogTitle>{blogTitle}</BlogTitle>
          <BlogData>{removeTags(blogData)}</BlogData>
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
            {showDeleteModal && (
              <Modal
                hideModal={(e) => {
                  e.stopPropagation();
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
            )}
          </BlogAuthor>
        </BlogAuthorContainer>
      </CardDetails>
    </Container>
  );
}
