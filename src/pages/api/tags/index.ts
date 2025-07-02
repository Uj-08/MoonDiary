import type { NextApiRequest, NextApiResponse } from "next";
import TagsModel from "@/models/Tags.model";
import { HttpMethod } from "@/helpers/apiHelpers";
import BlogModel from "@/models/Blogs.model";
import { withDatabase } from "@/lib/database";

async function handler(req: NextApiRequest, res: NextApiResponse) {
	switch (req.method) {
		case HttpMethod.GET: {
			const search = req.query.search as string | undefined;
			try {
				if (search !== undefined) {
					if (search.trim() === "") {
						return res.status(400).json({ error: "Search query is required." });
					}

					const tags = await TagsModel.find({
						name: new RegExp(search, "i"),
					})
						.limit(3)
						.lean();

					return res.status(200).json({ tags });
				} else {
					const tags = await TagsModel.aggregate([
						{
							$lookup: {
								from: "blogs",
								localField: "blogIds",
								foreignField: "_id",
								as: "blogs",
							},
						},
						{
							$addFields: {
								validBlogs: {
									$filter: {
										input: "$blogs",
										as: "blog",
										cond: { $ne: ["$$blog.isDraft", true] },
									},
								},
							},
						},
						{
							$addFields: {
								nonDraftCount: { $size: "$validBlogs" },
							},
						},
						{
							$match: {
								nonDraftCount: { $gt: 0 },
							},
						},
						{
							$project: {
								blogs: 0, // remove full blog objects
								validBlogs: 0, // optional: remove if not needed
							},
						},
					]).sort({ name: 1 });

					return res.status(200).json(tags);
				}
			} catch (err) {
				console.error("Tag search error:", err);
				return res.status(500).json(err);
			}
		}

		case HttpMethod.POST: {
			try {
				const { limit } = req.query;
				const { tagIds, filterBlogId } = req.body;

				if (!Array.isArray(tagIds) || tagIds.length === 0) {
					return res.status(400).json({ error: "tagIds must be a non-empty array." });
				}

				const query: any = {
					tags: { $in: tagIds },
					isDraft: false,
				};

				if (filterBlogId) {
					query._id = { $ne: filterBlogId };
				}

				const blogsQuery = BlogModel.find(query).populate("tags", "name").lean();

				if (limit) {
					blogsQuery.limit(Number(limit));
				}

				const blogs = await blogsQuery;

				return res.status(200).json(blogs);
			} catch (err) {
				console.error("POST error:", err);
				return res.status(500).json({ error: "Internal server error." });
			}
		}

		default:
			return res.status(405).json({ error: "Method not allowed" });
	}
}

export default withDatabase(handler);
