import React from "react";
import Head from "next/head";
import { GetStaticProps } from "next";
import styled from "styled-components";
import ImageComponent from "@/components/ImageComponent/ImageComponent";

export const AboutCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: "Montserrat", sans-serif;
  font-size: 13px;
  gap: 12px;
  max-width: 300px;

  background: linear-gradient(45deg, #7a0bc099, #e94ce999);
  border-radius: 8px;
  padding: 30px 12px;
  color: white;
  box-shadow: 0 2px 6px rgba(122, 11, 192, 0.15);
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    box-shadow: 0 4px 12px rgba(255, 77, 155, 0.2);
  }
`;

export const Author = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
`;

export const AuthorName = styled.h3`
  font-weight: bold;
  font-size: 20px;
`;

export const AuthorBio = styled.p`
  font-style: italic;
  line-height: 17px;
`;

export const AuthorProfile = styled.div`
  position: relative;
  height: 70px;
  width: 70px;
  border-radius: 100%;
  overflow: hidden;
  text-align: left;
  img {
    width: 100%;
    object-fit: cover;
  }
`;

export const Container = styled.div`
  height: calc(100dvh - 100px);
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 60px;
  margin-bottom: -100px;
`

const AboutMe = () => {
  return (
    <>
      <Head>
        <title>About Me | MoonDiary</title>
      </Head>
      <Container>
        <AboutCard>
          <Author>
            <AuthorProfile>
              <ImageComponent
                src={"https://old-moondiary.netlify.app/img/pro.jpg"}
                aspectRatio={1}
                alt={"profile picture"}
              />
            </AuthorProfile>
            <AuthorName>{"Shairee Sinha"}</AuthorName>
          </Author>
          <AuthorBio>
            {
              "Rolling in and out of Hindu college with my degree in English literature wasn’t enough to curb my craving for expression. Pursuing and juggling various creative skills like dancing, music and theatre has broadened my interests and passion to look out for the next new lesson. Forever trying to wrap my head around this perpetual tease called existence."
            }
          </AuthorBio>
        </AboutCard>
      </Container>
    </>
  );
};

export default React.memo(AboutMe);

// ✅ Changed from getServerSideProps to getStaticProps
export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {}, // No props needed here
    revalidate: 3600, // Optional: regenerate every hour (ISR)
  };
};