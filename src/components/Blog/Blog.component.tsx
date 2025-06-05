import React, { useEffect, useState } from "react";
import {
  AdditionalData,
  AdditionalSection,
  AdditionalSectionTitle,
  Container,
  Preview,
  PreviewContainer,
  PreviewImageContainer,
} from "./Blog.styles";
import { PreviewData } from "../Editor/Editor.styles";
import ImageComponent from "../ImageComponent/ImageComponent";
import DynamicCard from "../ArticleCard/DynamicCard.component";
import { BlogComponentTypes } from "@/pages/blogs/[blogId]";
import parse from "html-react-parser";

export default function BlogComponent({ blogData }: { blogData: BlogComponentTypes }) {
  const [cardData, setCardData] = useState([])
  useEffect(() => {
    const fetchBlogsByTags = async () => {
      try {
        const responses = await Promise.all(
          blogData?.tags.map(tag =>
            fetch(`/api/tags/${tag._id}?filterId=${blogData._id}`).then(res => res.json())
          )
        );

        setCardData(responses.flat() as [])

      } catch (err) {
        console.error("Failed to fetch blogs by tags", err);
      }
    };

    if (blogData?.tags?.length) {
      fetchBlogsByTags();
    }
  }, [blogData]);
  console.log(typeof (blogData.blogData))
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
          <PreviewData>{blogData?.blogData ? parse(blogData?.blogData) : ""}</PreviewData>
        </Preview>
      </PreviewContainer>
      <AdditionalSection>
        <AdditionalSectionTitle>
          More like this...
        </AdditionalSectionTitle>
        <AdditionalData>
          {cardData.map(((blog: any, idx: number) => {
            return (
              <DynamicCard key={idx} index={idx} blog={blog} clientEmail={"client?.email"} />
            );
          }))}
        </AdditionalData>
      </AdditionalSection>
    </Container>
  );
}
