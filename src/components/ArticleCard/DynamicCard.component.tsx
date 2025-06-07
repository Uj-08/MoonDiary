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
    isDraft
  } = blog;

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

  const colorPalette = [
    "#B101B1", // Primary rich magenta
    "#7A0BC0", // Deep violet — an elegant, darker shade
    "#3F0071", // Midnight purple — adds depth
    "#F31559", // Bold reddish-pink — energizing contrast
    "#C70A80", // Muted raspberry — complementary and cohesive
    "#009FBD", // Cool cyan — balances the heat
    "#FF6D28", // Warm orange — vibrant highlight
    "#A367B1", // Soft lilac — eases intensity while staying on theme
  ];

  let usedIndex: number[] = [];

  const getRandomInt = (max: number): number => {
    if (usedIndex.length >= max) {
      usedIndex = [];
    }

    let randIndex = Math.floor(Math.random() * max);

    while (usedIndex.includes(randIndex)) {
      randIndex = Math.floor(Math.random() * max);
    }

    usedIndex.push(randIndex);
    return randIndex;
  };

  const getRandomColor = (): string => {
    return colorPalette[getRandomInt(colorPalette.length)];
  };
  return (
    <Container onClick={routeHandler} isDraft={isDraft}>
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
                  if (idx <= 1) return <Tag title={`#${tag.name}`} maxWidth={"90px"} fontSize="12px" letterSpacing="0.5px" bgColor={getRandomColor()} key={tag._id}><span>#{tag.name}</span></Tag>
                })
              }
              {Array.isArray(tags) && tags.length > 0 && tags.length > 2 &&
                <MoreTag title={tags.slice(2).map((tag) => `#${tag.name}`).join(" ")} color={getRandomColor()}>+{tags.length - 2} more</MoreTag>
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
            <Modal
              show={showDeleteModal}
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
  );
}
