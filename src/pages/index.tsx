import Base from "@/containers/Base/Base"
import HeroSection from "@/components/HeroSection/HeroSection.component"
import ArticleGrid from "@/components/ArticleGrid/ArticleGrid.component"
import { GetServerSideProps } from "next"
import { hasCookie } from "cookies-next"
import { COOKIE_NAME } from "@/constants"
import { useEffect, useState } from "react"

export default function Home( sessionId: string ) {

  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    fetch("/api/blogs", {
      method: "GET",
      headers: {
          "Content-Type": "application/json",
      }
      })
      .then(res => res.json())
      .then(blogList => setBlogs(blogList?.blogs));
  }, []);

  return (
      <Base>
        <HeroSection />
        <ArticleGrid blogs={blogs} />
      </Base>
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
