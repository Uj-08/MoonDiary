import Base from "@/containers/Base/Base"
import HeroSection from "@/components/HeroSection/HeroSection.component"
import ArticleGrid from "@/components/ArticleGrid/ArticleGrid.component"
import { GetServerSideProps } from "next"
import { hasCookie } from "cookies-next"
import { COOKIE_NAME } from "@/constants"

export default function Home( sessionId: string ) {
  return (
      <Base>
        <HeroSection />
        <ArticleGrid />
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
