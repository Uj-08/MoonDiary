import Base from "@/containers/Base/Base";
import BlogTitleComponent from "@/components/Blog/BlogTitle/BlogTitle.component";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import BlogComponent from "@/components/Blog/Blog.component";
import { Loading } from "..";
import Image from "next/image";
import { GetServerSideProps } from "next";

export default function Blog({ blogData }) {
    console.log({ blogData })
    return (
        <>
                <Base>
                    <BlogTitleComponent>
                        {blogData?.blogTitle}
                    </BlogTitleComponent>
                    <BlogComponent blogImg={blogData?.blogImg} blogData={blogData?.blogData}/>
                </Base>
        </>
    );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { req, res, query } = context;

    const blogId = query.blogId;

    const resData = await fetch(`https://next-moondiary.netlify.app/api/blogs/${blogId}`);
    const blogData = await resData.json();
        
    return {
      props: {
        blogData: blogData.blog
      }
    }
  }