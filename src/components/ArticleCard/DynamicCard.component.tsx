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
} from "./Card.styles";
import Image from "next/image";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { deleteBlog, resetDeletedBlogId } from "@/redux/slices/blogInfo";
import Modal from "@/containers/Modal/Modal";
import DeleteCard from "../DeletePrompt/DeleteCard";
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
  };
  clientEmail?: string;
}

export default function DynamicCard({ blog, clientEmail }: DynamicCardTypes) {
  const {
    _id,
    authorEmail,
    authorName,
    authorPicture,
    blogData,
    blogTitle,
    blogImg,
    updatedAt,
  } = blog;
  const [blogDataText, setBlogDataText] = useState(removeTags(blogData));
  const [blogImage, setBlogImage] = useState(
    blogImg ?? "https://www.urbansplash.co.uk/images/placeholder-16-9.jpg"
  );
  const [authorImage, setAuthorImage] = useState(
    authorPicture ??
      "https://st3.depositphotos.com/6672868/13701/v/450/depositphotos_137014128-stock-illustration-user-profile-icon.jpg"
  );
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

  useEffect(() => {
    setBlogDataText(removeTags(blogData));
  }, [blogData]);

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
    return blogData.replace(/(<([^>]+)>)/gi, "");
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
        <Image
          onError={() =>
            setBlogImage(
              "https://www.urbansplash.co.uk/images/placeholder-16-9.jpg"
            )
          }
          src={blogImage}
          fill={true}
          alt={"card-hero-img"}
        />
      </ImageContainer>
      <CardDetails>
        <MainContent>
          <BlogHeader>{/* to be added */}</BlogHeader>
          <BlogTitle>{blogTitle}</BlogTitle>
          <BlogData>{blogDataText}</BlogData>
        </MainContent>
        <BlogAuthorContainer>
          <BlogAuthor>
            <AuthorProfile>
              <Image
                src={authorImage}
                onError={() =>
                  setAuthorImage(
                    "https://st3.depositphotos.com/6672868/13701/v/450/depositphotos_137014128-stock-illustration-user-profile-icon.jpg"
                  )
                }
                fill={true}
                alt="profile"
              />
            </AuthorProfile>
            <AuthorDetail>
              <div>{authorName}</div>
              <div>{relTime || "unknown"}</div>
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
