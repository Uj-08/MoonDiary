import React from "react";
import Head from "next/head";
import { stripHtml } from "string-strip-html";
import Base from "@/containers/Base/Base";
import BlogTitleComponent from "@/components/Blog/BlogTitle/BlogTitle.component";
import BlogComponent from "@/components/Blog/Blog.component";
import { GetServerSideProps } from "next";
export interface BlogComponentTypes {
  _id: string,
  blogTitle: string;
  blogImg: string;
  blogData: string;
  seoDescription?: string
  createdAt: Date;
  updatedAt: Date;
  tags: Array<{
    _id: string,
    name: string
  }>
  authorName: string;
}

const Blog = ({ blogData }: { blogData: BlogComponentTypes }) => {

  //SEO
  const description = blogData?.seoDescription || (stripHtml(blogData.blogData || '').result.replace(/\s+/g, ' ').trim().slice(0, 160) + '...');
  const keywords = blogData?.tags?.map(tag => tag.name).join(', ');

  const published_time = new Date(blogData.createdAt).toISOString();
  const modified_time = new Date(blogData.updatedAt || blogData.createdAt).toISOString();

  return (
    <>
      <Head>
        <title>{blogData.blogTitle} | MoonDiary</title>
        <meta name="description" content={description}></meta>
        <meta name="keywords" content={keywords}></meta>

        <meta property="og:image" content={blogData.blogImg}></meta>

        <meta name="author" content={blogData?.authorName} />
        <meta name="article:published_time" content={published_time} />
        <meta name="article:modified_time" content={modified_time} />

        <meta property="og:title" content={blogData.blogTitle} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={blogData.blogImg} />
        {/* <meta property="og:url" content={`https://next-moondiary.netlify.app/blog/${blogData.slug}`} /> */}
        <meta property="og:type" content="article" />
        <meta property="article:author" content={blogData.authorName} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={blogData.blogTitle} />
        <meta name="twitter:description" content={description || ''} />
        <meta name="twitter:image" content={blogData.blogImg} />
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
      blogData: blogData
    }
  }
}