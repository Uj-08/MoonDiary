import React from "react";
import Head from "next/head";
import Base from "@/containers/Base/Base";
import BlogTitleComponent from "@/components/Blog/BlogTitle/BlogTitle.component";
import BlogComponent from "@/components/Blog/Blog.component";
import { GetServerSideProps } from "next";
export interface BlogComponentTypes {
    _id: string,
    blogTitle: string;
    blogImg: string;
    blogData: string;
    tags: Array<{
      _id: string,
    }>
}

const Blog = ({ blogData }: {blogData: BlogComponentTypes}) => {
  return (
    <>
      <Head>
        <title>{blogData.blogTitle}</title>
      </Head>
      <Base>
        <BlogTitleComponent>
          {blogData.blogTitle}
        </BlogTitleComponent>
        <BlogComponent blogData={blogData} />
      </Base>
    </>
  );
}

export default React.memo(Blog)

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { query } = context;

  const blogId = query.blogId;

  const resData = await fetch(`${process.env.BASE_URL}/api/blogs/${blogId}`);
  const blogData = await resData.json();

  return {
    props: {
      blogData: blogData.blog
    }
  }
}