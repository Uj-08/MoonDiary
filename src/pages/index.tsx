import Base from "@/containers/Base/Base"
import HeroSection from "@/components/HeroSection/HeroSection.component"
import ArticleGrid from "@/components/ArticleGrid/ArticleGrid.component"

export default function Home() {
  return (
      <Base>
        <HeroSection />
        <ArticleGrid />
      </Base>
  )
}
