import React, { useContext, useState } from "react";
import {
  AdditionalData,
  AdditionalSection,
  BlogTag,
  ButtonContainer,
  Container,
  OverlayContainer,
  PostButton,
  Preview,
  PreviewContainer,
  PreviewImageContainer,
  ReadTimeBadge,
  TagsContainer,
} from "./Blog.styles";
import { PreviewData } from "../Editor/Editor.styles";
import ImageComponent from "../ImageComponent/ImageComponent";
import DynamicCard from "../ArticleCard/ArticleCard.component";
import SkeletalCard from "../ArticleCard/SkeletalCard";
import { ClientContext } from "@/containers/Base/Base";
import Link from "next/link";
import { BlogPreviewContent } from "../Editor/BlogContentStyle";
import { PopulatedBlogType } from "@/types/blog";
import parse from "html-react-parser";
import { useQuery } from "@tanstack/react-query";
import { getReadingTime } from "@/helpers/getReadingTime";
import { stripHtml } from "string-strip-html";
import { deleteBlog } from "@/redux/slices/blogInfo";
import { useDispatch } from "react-redux";
import Modal from "@/containers/Modal/Modal";
import DeleteCard from "../DeletePrompt/DeleteCard";
import { useRouter } from "next/router";
import { AppDispatch } from "@/redux/store";

const ADDITIONAL_CARDS_LENGTH = 4;

// Fetch related blogs
const fetchRelatedBlogs = async (blog: PopulatedBlogType) => {
  if (!blog || !blog.tags?.length) return [];

  try {
    // Fetch related by tags
    const tagIds = blog.tags.map(tag => tag._id);
    const body = {
      tagIds,
      filterBlogId: blog._id
    }
    const blogs = await fetch(`/api/tags?limit=${ADDITIONAL_CARDS_LENGTH}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body)
    });

    let similarBlogs: PopulatedBlogType[] = await blogs.json()

    // Fill extra if needed
    if (similarBlogs.length < ADDITIONAL_CARDS_LENGTH) {
      const filterIds = similarBlogs.map((item) => item._id);
      const fillRes = await fetch(
        `/api/blogs?filterIds=${[blog._id, ...filterIds]}&limit=${ADDITIONAL_CARDS_LENGTH - similarBlogs.length
        }`
      ).then((res) => res.json());

      similarBlogs = [...similarBlogs, ...fillRes];
    }

    return similarBlogs;
  } catch (err) {
    console.error("Failed to fetch related blogs", err);
    return [];
  }
};

const BlogComponent = ({ blog }: { blog: PopulatedBlogType }) => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const client = useContext(ClientContext);
  const text = stripHtml(blog.blogData).result;
  const readingTime = `${getReadingTime(text)} min read`;
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const {
    data: cardData = [],
    isLoading,
    isError
  } = useQuery<PopulatedBlogType[]>({
    queryKey: ["relatedBlogs", blog._id],
    queryFn: () => fetchRelatedBlogs(blog),
    enabled: !!blog?.tags?.length, // Only run if tags exist
    staleTime: 5 * 60 * 1000, // 5 min
  });

  function showDeleteModalHandler(e: React.MouseEvent<HTMLButtonElement>) {
    e.stopPropagation();
    setShowDeleteModal(true);
  }

  async function editBlogHandler(e: React.MouseEvent<HTMLButtonElement>) {
    e.stopPropagation();
    router.push(`/blogs/post/${blog._id}`);
  }

  function deleteBlogHandler(e: React.MouseEvent<HTMLButtonElement>) {
    e.stopPropagation();
    setShowDeleteModal(false);

    // Push first, dispatch right after — ensures user escapes immediately
    router.push("/").then(() => {
      dispatch(deleteBlog(blog._id));
    });
  }

  return (
    <Container>
      <PreviewContainer>
        <Preview>
          <PreviewImageContainer>
            <OverlayContainer>
              <ReadTimeBadge>
                {readingTime}
              </ReadTimeBadge>
            </OverlayContainer>
            {client?.email === blog.authorEmail && (
              <ButtonContainer>
                <PostButton onClick={editBlogHandler} >
                  Edit
                </PostButton>
                <PostButton onClick={showDeleteModalHandler} >
                  Delete
                </PostButton>
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
            <ImageComponent
              aspectRatio={4 / 3}
              src={blog.blogImg}
              alt="MoonDiary Hero"
              isPriority
            />
          </PreviewImageContainer>
          <PreviewData>
            <BlogPreviewContent>
              {blog?.blogData ? parse(blog.blogData) : ""}
            </BlogPreviewContent>
          </PreviewData>
        </Preview>
      </PreviewContainer>

      <AdditionalSection>
        <TagsContainer>
          {blog.tags.map((tag) => (
            <Link key={tag._id.toString()} href={`/features/${tag._id}`}>
              <BlogTag>{`#${tag.name}`}</BlogTag>
            </Link>
          ))}
        </TagsContainer>

        <AdditionalData>
          {(isError || isLoading || cardData.length === 0)
            ? Array.from({ length: ADDITIONAL_CARDS_LENGTH }).map((_, index) => (
              <SkeletalCard key={index} />
            ))
            : cardData.map((relatedBlog: any, idx: number) => (
              <DynamicCard
                key={relatedBlog._id}
                index={idx}
                blog={relatedBlog}
                clientEmail={client?.email}
              />
            ))}
        </AdditionalData>
      </AdditionalSection>
    </Container>
  );
};

export default React.memo(BlogComponent);