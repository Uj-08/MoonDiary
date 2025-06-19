import React from 'react'
import { BlogPageTypes } from './BlogPage.types'
import BlogTitleComponent from '@/components/Blog/BlogTitle/BlogTitle.component'
import BlogComponent from '@/components/Blog/Blog.component'

const BlogPage = ({ blog }: BlogPageTypes) => {
  return (
    <>
      <BlogTitleComponent>
        {blog.blogTitle}
      </BlogTitleComponent>
      <BlogComponent blog={blog} />
    </>
  )
}

export default BlogPage