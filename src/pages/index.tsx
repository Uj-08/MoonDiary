import Base from "@/containers/Base/Base"
import HeroSection from "@/components/HeroSection/HeroSection.component"
import ArticleGrid from "@/components/ArticleGrid/ArticleGrid.component"
import { GetServerSideProps } from "next"
import { hasCookie } from "cookies-next"
import { COOKIE_NAME } from "@/constants"
import { useEffect, useState } from "react"
import styled from "styled-components"
import Image from "next/image";

export const Loading = styled.div`
   background-color: white;
   display: flex;
   height: 100dvh;
   width: 100dvw;
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 9999;
   div {
      position: relative;
      height: 70px;
      width: 70px;
      animation: loadingAnimation 0.7s ease-in-out 0s infinite normal forwards;
   }

   @keyframes loadingAnimation {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
   }
`;

export default function Home( sessionId: string ) {

  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("/api/blogs", {
      method: "GET",
      headers: {
          "Content-Type": "application/json",
      }
      })
      .then(res => res.json())
      .then(blogList => setBlogs(blogList?.blogs))
      .then(() => setLoading(false));
  }, []);

  return (
    <>
      {
        loading &&
          <Loading>
            <div>
              <Image src="/logo.png" alt="loading" fill={true} />
            </div>
          </Loading>
      }
      {
        !loading &&
        <Base>
          <HeroSection />
          <ArticleGrid blogs={blogs} />
        </Base>
      }
    </>
  )
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { req, res } = context;

  const isSessionAvailable = hasCookie(COOKIE_NAME, {req, res})
  if(isSessionAvailable) {
    
  }


  return {
    props: {
      sessionId: "kejcbkwejcnewkjnc"
    }
  }
}
