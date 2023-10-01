import Base from "@/containers/Base/Base"
import HeroSection from "@/components/HeroSection/HeroSection.component"
import ArticleGrid from "@/components/ArticleGrid/ArticleGrid.component"
import { GetServerSideProps } from "next"
import { hasCookie } from "cookies-next"
import { COOKIE_NAME } from "@/constants"
import styled from "styled-components"

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
      animation: loadingAnimation 1.5s ease-in-out 0s infinite alternate forwards;
   }

   @keyframes loadingAnimation {
    0% {
      transform: rotate(0deg);
    }
    50% {
      transform: rotate(360deg);
    }
    100% {
      transform: rotate(720deg);
    }
   }
`;

export default function Home({blogsData}: {blogsData: any}) {

  return (
    <Base>
      <HeroSection/>
      <ArticleGrid blogs={blogsData.blogs}/>
    </Base>
  )
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { req, res } = context;

  const isSessionAvailable = hasCookie(COOKIE_NAME, {req, res})
  if(isSessionAvailable) {
    
  }

  const resData = await fetch("https://next-moondiary.netlify.app/api/blogs");
  const blogsData = await resData.json();
      

  return {
    props: {
      blogsData: blogsData
    }
  }
}
