import { NextApiRequest, NextApiResponse } from "next";

// Helper function to format blog posts into XML
const generateSitemap = (blogs: any[]) => {
    const baseUrl = process.env.BASE_URL;

    const urls = blogs
        .map((blog) => {
            return `
  <url>
    <loc>${baseUrl}/blogs/${blog.slug}</loc>
    <lastmod>${new Date(
                blog.updatedAt || blog.createdAt
            ).toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`;
        })
        .join("");

    return `<?xml version="1.0" encoding="UTF-8"?>
<urlset
  xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
>
  ${urls}
</urlset>`;
};

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const response = await fetch(`${process.env.BASE_URL}/api/blogs`);
    const blogs = await response.json();

    const sitemap = generateSitemap(blogs);

    res.setHeader("Content-Type", "application/xml");
    res.write(sitemap);
    res.end();
}
