import React, { useContext, useEffect, useState } from "react";
import {
  // AboutCard,
  AdditionalData,
  AdditionalSection,
  // Author,
  // AuthorBio,
  // AuthorName,
  // AuthorProfile,
  BlogTag,
  Container,
  Preview,
  PreviewContainer,
  PreviewImageContainer,
  TagsContainer,
} from "./Blog.styles";
import { PreviewData } from "../Editor/Editor.styles";
import ImageComponent from "../ImageComponent/ImageComponent";
import DynamicCard from "../ArticleCard/DynamicCard.component";
import { BlogComponentTypes } from "@/pages/blogs/[slug]";
import parse from "html-react-parser";
import SkeletalCard from "../ArticleCard/SkeletalCard";
import { ClientContext } from "@/containers/Base/Base";
import Link from "next/link";
import { BlogPreviewContent } from "../Editor/BlogContentStyle";

export default function BlogComponent({ blogData }: { blogData: BlogComponentTypes }) {
  const [cardData, setCardData] = useState([])
  const [isCardDataLoading, setIsCardDataLoading] = useState(true)
  useEffect(() => {
    const fetchFillData = async (limit: number, filterIds: String[]) => {
      try {
        const blogs = await fetch(`/api/blogs/?filterIds=${[blogData._id, ...filterIds]}&limit=${limit}`)
          .then(res => res.json())
        return blogs;
      } catch (err) {
        console.error("Failed to fetch blogs by tags", err);
        return [];
      }
    };
    const fetchBlogsByTags = async () => {
      let additionalBlogs = [];
      try {
        const responses = await Promise.all(
          blogData?.tags.map(tag =>
            fetch(`/api/tags/${tag._id}?filterId=${blogData._id}`)
              .then(res => res.json())
              .then(data => data.blogs)
          )
        );
        const flatData = responses.flat();

        let uniqueData = flatData.filter(
          (item, index, self) => {
            return index === self.findIndex((t) => t._id === item._id) // Replace `id` with your unique key
          }
        );
        if (uniqueData.length <= 2) {
          const filterIds = uniqueData.map(ud => ud._id) ?? []
          additionalBlogs = await fetchFillData(3 - uniqueData.length, filterIds)
          uniqueData = [
            ...uniqueData,
            ...additionalBlogs
          ]
        }
        setCardData(uniqueData as []);
      } catch (err) {
        console.error("Failed to fetch blogs by tags", err);
      } finally {
        setIsCardDataLoading(false);
      }
    };

    if (blogData?.tags?.length) {
      setCardData([]);
      setIsCardDataLoading(true)
      fetchBlogsByTags();
    }
  }, [blogData]);

  const client = useContext(ClientContext);

  return (
    <Container>
      <PreviewContainer>
        <Preview>
          <PreviewImageContainer>
            <ImageComponent
              aspectRatio={4 / 3}
              src={blogData.blogImg}
              alt="hero image"
              isPriority
            />
          </PreviewImageContainer>
          <PreviewData>
            <BlogPreviewContent>
              {blogData?.blogData ? parse(blogData?.blogData) : ""}
            </BlogPreviewContent>
          </PreviewData>
        </Preview>
      </PreviewContainer>
      <AdditionalSection>
        <TagsContainer>
          {
            blogData.tags.map((tag) => {
              return (
                <Link key={tag._id} href={`/features/${tag._id}`} legacyBehavior>
                  <BlogTag>{`#${tag.name}`}</BlogTag>
                </Link>
              )
            })
          }
        </TagsContainer>

        <AdditionalData>
          {
            (isCardDataLoading && cardData.length === 0) ?
              Array.from({ length: 3 }).map((_, index) => (
                <SkeletalCard key={index} />
              )) :
              cardData.map(((blog: any, idx: number) => {
                return (
                  <DynamicCard key={idx} index={idx} blog={blog} clientEmail={client?.email} />
                );
              }))
          }
        </AdditionalData>
      </AdditionalSection>
    </Container>
  );
}
