import React from "react";
import Head from "next/head";
import { stripHtml } from "string-strip-html";
import Base from "@/containers/Base/Base";
import BlogTitleComponent from "@/components/Blog/BlogTitle/BlogTitle.component";
import BlogComponent from "@/components/Blog/Blog.component";
import { GetStaticProps, GetStaticPaths } from "next";
import BlogsModel from "@/models/Blogs.model";
import dbConnect from "@/lib/dbConnect";
import { PopulatedBlogType } from "@/types/blog";

const Blog = ({ blog }: { blog: PopulatedBlogType }) => {
  //SEO
  const description = blog?.seoDescription || (stripHtml(blog.blogData || '').result.replace(/\s+/g, ' ').trim().slice(0, 160) + '...');
  const keywords = blog?.tags?.map(tag => tag.name).join(', ');

  const datePublished = new Date(blog.createdAt).toISOString();
  const dateModified = new Date(blog.updatedAt || blog.createdAt).toISOString();
  const url = `https://moondiary.netlify.app/blogs/${blog.slug}`

  return (
    <>
      <Head>
        <title>{blog.blogTitle} | MoonDiary</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="author" content={blog.authorName} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        <meta name="robots" content="index,follow" />

        <link
          rel="canonical"
          href={url}
        />

        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            "headline": blog.blogTitle,
            "image": blog.blogImg,
            "author": {
              "@type": "Person",
              "name": blog.authorName
            },
            "publisher": {
              "@type": "Organization",
              "name": "MoonDiary",
              "logo": {
                "@type": "ImageObject",
                "url": "https://moondiary.netlify.app/logo.png"
              }
            },
            "datePublished": datePublished,
            "dateModified": dateModified,
            "description": description,
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": `${url}`  // ← using ID for now
            }
          })}
        </script>

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="article" />
        <meta property="og:title" content={blog.blogTitle} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={blog.blogImg} />
        <meta property="og:url" content={url} />
        <meta property="article:published_time" content={datePublished} />
        <meta property="article:modified_time" content={dateModified} />
        <meta property="article:author" content={blog.authorName} />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={blog.blogTitle} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={blog.blogImg} />
      </Head>
      <Base>
        <BlogTitleComponent>
          {blog.blogTitle}
        </BlogTitleComponent>
        <BlogComponent blog={blog} />
      </Base>
    </>
  );
}

export default React.memo(Blog)

export const getStaticProps: GetStaticProps = async (context) => {
  const { slug } = context.params as { slug: string };

  try {
    await dbConnect();

    // Ensure Tags model is registered
    await import('@/models/Tags.model');

    const blogDoc = await BlogsModel.findOne({ slug }).populate("tags").lean();

    if (!blogDoc) {
      return { notFound: true };
    }

    return {
      props: {
        blog: JSON.parse(JSON.stringify(blogDoc)),
      },
      revalidate: 3600,
    };
  } catch (err) {
    console.error("Error fetching blog:", err);
    return { notFound: true };
  }
};

export const getStaticPaths: GetStaticPaths = async () => {
  await dbConnect();
  const blogs = await BlogsModel.find({}, "slug");

  const paths = blogs.map((blog) => ({
    params: { slug: blog.slug },
  }));

  return {
    paths,
    fallback: "blocking",
  };
};