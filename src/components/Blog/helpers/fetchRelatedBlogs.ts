import { ADDITIONAL_CARDS_LENGTH } from "@/helpers/constants";
import { PopulatedBlogType } from "@/types/blog";

export const fetchRelatedBlogs = async (blog: PopulatedBlogType) => {
    if (!blog?.tags?.length) return [];

    try {
        // Fetch related by tags
        const tagIds = blog.tags.map(tag => tag._id);
        const body = {
            tagIds,
            filterBlogId: blog._id
        }
        const blogs = await fetch(`/api/tags?limit=${ADDITIONAL_CARDS_LENGTH}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body)
        });

        let similarBlogs: PopulatedBlogType[] = await blogs.json()

        // Fill extra if needed
        if (similarBlogs.length < ADDITIONAL_CARDS_LENGTH) {
            const filterIds = similarBlogs.map((item) => item._id);
            const fillRes = await fetch(
                `/api/blogs?filterIds=${[blog._id, ...filterIds]}&limit=${ADDITIONAL_CARDS_LENGTH - similarBlogs.length
                }`
            ).then((res) => res.json());

            similarBlogs = [...similarBlogs, ...fillRes];
        }

        return similarBlogs;
    } catch (err) {
        console.error("Failed to fetch related blogs", err);
        return [];
    }
};