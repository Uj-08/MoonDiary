import React, { useContext } from "react";
import {
  AdditionalData,
  AdditionalSection,
  BlogTag,
  Container,
  Preview,
  PreviewContainer,
  PreviewImageContainer,
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

// Fetch related blogs
const fetchRelatedBlogs = async (blog: PopulatedBlogType) => {
  if (!blog || !blog.tags?.length) return [];

  try {
    // Fetch related by tags
    const tagResponses = await Promise.all(
      blog.tags.map((tag) =>
        fetch(`/api/tags/${tag._id}?filterId=${blog._id}`).then((res) =>
          res.json()
        )
      )
    );
    let flatData = tagResponses.flat();

    // Remove duplicates
    let uniqueData = flatData.filter(
      (item, index, self) =>
        index === self.findIndex((t) => t._id === item._id)
    );

    // Fill extra if needed
    if (uniqueData.length <= 3) {
      const filterIds = uniqueData.map((item) => item._id);
      const fillRes = await fetch(
        `/api/blogs/?filterIds=${[blog._id, ...filterIds]}&limit=${
          4 - uniqueData.length
        }`
      ).then((res) => res.json());

      uniqueData = [...uniqueData, ...fillRes];
    }

    return uniqueData;
  } catch (err) {
    console.error("Failed to fetch related blogs", err);
    return [];
  }
};

const BlogComponent = ({ blog }: { blog: PopulatedBlogType }) => {
  const client = useContext(ClientContext);

  const {
    data: cardData = [],
    isLoading,
  } = useQuery({
    queryKey: ["relatedBlogs", blog._id],
    queryFn: () => fetchRelatedBlogs(blog),
    enabled: !!blog?.tags?.length, // Only run if tags exist
    staleTime: 5 * 60 * 1000, // 5 min
  });

  return (
    <Container>
      <PreviewContainer>
        <Preview>
          <PreviewImageContainer>
            <ImageComponent
              aspectRatio={4 / 3}
              src={blog.blogImg}
              alt="hero image"
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
            <Link key={tag._id.toString()} href={`/features/${tag._id}`} legacyBehavior>
              <BlogTag>{`#${tag.name}`}</BlogTag>
            </Link>
          ))}
        </TagsContainer>

        <AdditionalData>
          {isLoading && cardData.length === 0
            ? Array.from({ length: 4 }).map((_, index) => (
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