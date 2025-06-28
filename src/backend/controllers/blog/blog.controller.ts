import { NextApiRequest, NextApiResponse } from "next";
import { blogService } from "@/backend/services/blogs/blog.services";

export const blogController = {
	async getBlogBySlug(req: NextApiRequest, res: NextApiResponse) {
		try {
			const { slug } = req.query;
			const sendAll = req.query.sendAll === "true";

			const blog = await blogService.findBySlug(slug as string, sendAll);

			if (!blog) {
				return res.status(404).json({ error: "Blog not found" });
			}

			return res.status(200).json(blog);
		} catch (err) {
			console.error("GET /slug error:", err);
			return res.status(500).json({ error: "Internal server error" });
		}
	},
};
