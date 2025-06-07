import React, { useEffect, useState } from "react";
import {
  AboutCard,
  AdditionalData,
  AdditionalSection,
  AdditionalSectionTitle,
  Author,
  AuthorBio,
  AuthorName,
  AuthorProfile,
  Container,
  Preview,
  PreviewContainer,
  PreviewImageContainer,
  TagsContainer,
} from "./Blog.styles";
import { PreviewData } from "../Editor/Editor.styles";
import ImageComponent from "../ImageComponent/ImageComponent";
import DynamicCard from "../ArticleCard/DynamicCard.component";
import { BlogComponentTypes } from "@/pages/blogs/[blogId]";
import parse from "html-react-parser";
import { Tag } from "../ArticleCard/Card.styles";
import SkeletalCard from "../ArticleCard/SkeletalCard";

export default function BlogComponent({ blogData }: { blogData: BlogComponentTypes }) {
  const [cardData, setCardData] = useState([])
  const [isCardDataLoading, setIsCardDataLoading] = useState(true)
  useEffect(() => {
    const fetchBlogsByTags = async () => {
      try {
        const responses = await Promise.all(
          blogData?.tags.map(tag =>
            fetch(`/api/tags/${tag._id}?filterId=${blogData._id}`).then(res => res.json())
          )
        );

        setCardData(responses.flat() as [])
        setIsCardDataLoading(false)
      } catch (err) {
        console.error("Failed to fetch blogs by tags", err);
      }
    };

    if (blogData?.tags?.length) {
      fetchBlogsByTags();
    }
  }, [blogData]);

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
        <TagsContainer>
          {
            blogData.tags.map((tag) => <Tag key={tag._id} fontSize="14px" letterSpacing="0.8px" bgColor={getRandomColor()} >#{tag.name}</Tag>)
          }
        </TagsContainer>

        {
          (blogData?.authorEmail === "sinhashairee6@gmail.com" ||
            blogData?.authorEmail === "psykidbiz@gmail.com") &&
          <AboutCard>
            <Author>
              <AuthorProfile>
                <ImageComponent
                  src={blogData?.authorPicture}
                  aspectRatio={1}
                  alt={"profile picture"}
                />
              </AuthorProfile>
              <AuthorName>{blogData?.authorName}</AuthorName>
            </Author>
            <AuthorBio>"Rolling in and out of Hindu college with my degree in English literature wasn’t enough to curb my craving for expression. Pursuing and juggling various creative skills like dancing, music and theatre has broadened my interests and passion to look out for the next new lesson. Forever trying to wrap my head around this perpetual tease called existence."</AuthorBio>
          </AboutCard>
        }
        {(isCardDataLoading && cardData.length === 0) &&
          <>
            <AdditionalSectionTitle height="45px"/>
            <AdditionalData>
              {Array.from({ length: 4 }).map((_, index) => (
                <SkeletalCard key={index} />
              ))}
            </AdditionalData>
          </>
        }
        {(!isCardDataLoading && cardData.length > 0) &&
          <>
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
          </>
        }
      </AdditionalSection>
    </Container>
  );
}
