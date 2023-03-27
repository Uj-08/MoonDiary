import Base from "@/containers/Base/Base";
import BlogTitleComponent from "@/components/Blog/BlogTitle/BlogTitle.component";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import BlogComponent from "@/components/Blog/Blog.component";

export default function Blog() {
    const [blogData, setBlogData] = useState<{blogTitle: string, blogImg: string, blogData: string}>();
    const router = useRouter()
    useEffect(() => {
        if(router.isReady){
            const blogId = router.query.blogId;
            fetch(`/api/blogs/${blogId}`)
            .then(data => data.json())
            .then(data => setBlogData(data.blog))
        }
    }, [router.isReady, router.query.blogId])
    console.log(blogData)
    return (
        <Base>
            <BlogTitleComponent>
                {blogData?.blogTitle}
            </BlogTitleComponent>
            <BlogComponent blogImg={blogData?.blogImg} blogData={blogData?.blogData}/>
        </Base>
    );
}