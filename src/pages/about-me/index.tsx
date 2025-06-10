import React from "react";
import Base from "@/containers/Base/Base";
import Head from "next/head";
import { GetServerSideProps } from "next";
import { hasCookie } from "cookies-next";
import { COOKIE_NAME } from "@/constants";
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
  @media (max-width: 920px) {
    display: none;
  }

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
  /* letter-spacing: 0.9px; */
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

const AboutMe = ({ blogsData }: { blogsData: any }) => {
    return (
        <>
            <Head>
                <title>MoonDiary - About Me</title>
                {/* <link rel="preload" as="image" href="/cover.jpeg" /> */}
            </Head>
            <Base>
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        height: "75dvh",
                    }}
                >
                    <AboutCard>
                        <Author>
                            <AuthorProfile>
                                <ImageComponent
                                    src={"https://moondiary.netlify.app/img/pro.jpg"}
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
                </div>
            </Base>
        </>
    );
};

export default React.memo(AboutMe);

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { req, res } = context;

    const isSessionAvailable = hasCookie(COOKIE_NAME, { req, res });
    if (isSessionAvailable) {
    }

    //   const resData = await fetch(`${process.env.BASE_URL}/api/blogs`, {
    //     method: 'GET',
    //     headers: {
    //       'Content-Type': 'application/json',
    //       'x-session-token': getCookie("clientMD", context) as string,
    //     },
    //   });
    //   const blogsData = await resData.json();

    return {
        props: {
            //   blogsData: blogsData,
        },
    };
};
