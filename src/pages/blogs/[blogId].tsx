import Base from "@/containers/Base/Base";
import BlogTitleComponent from "@/components/Blog/BlogTitle/BlogTitle.component";
import BlogComponent from "@/components/Blog/Blog.component";
import { GetServerSideProps } from "next";
import Head from "next/head";

export default function Blog({ blogData }: { blogData: { blogTitle: string; blogImg: string; blogData: string } }) {
    return (
      <>
      <Head>
        <title>{blogData.blogTitle}</title>
      </Head>
        <Base>
            <BlogTitleComponent>
                {blogData.blogTitle}
            </BlogTitleComponent>
            <BlogComponent blogImg={blogData.blogImg} blogData={blogData.blogData}/>
        </Base>
      </>
    );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { query } = context;

    const blogId = query.blogId;

    const resData = await fetch(`https://next-moondiary.netlify.app/api/blogs/${blogId}`);
    const blogData = await resData.json();
        
    return {
      props: {
        blogData: blogData.blog
      }
    }
  }