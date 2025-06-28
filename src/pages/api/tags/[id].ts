import { NextApiRequest, NextApiResponse } from "next";
import BlogsModel from "@/models/Blogs.model";
import TagsModel from "@/models/Tags.model";
import { HttpMethod } from "@/helpers/apiHelpers";
import mongoose from "mongoose";
import { withDatabase } from "@/lib/database";

async function handler(req: NextApiRequest, res: NextApiResponse) {
	const id = Array.isArray(req.query.id) ? req.query.id[0] : req.query.id;
	const filterId = Array.isArray(req.query.filterId) ? req.query.filterId[0] : req.query.filterId;

	switch (req.method) {
		case HttpMethod.GET:
			if (!id) return res.status(400).json({ error: "Missing tag ID" });

			try {
				const tag = await TagsModel.findById(id);
				if (!tag) return res.status(404).json({ error: "Tag not found" });

				const filteredBlogIds = tag.blogIds.filter(
					(bid: mongoose.Types.ObjectId) => bid.toString() !== filterId
				);

				const ALLOWED_SORT_FIELDS = ["updatedAt", "createdAt", "blogTitle"];
				const ALLOWED_ORDER_VALUES = ["1", "-1"];

				let sort = Array.isArray(req.query.sort)
					? req.query.sort[0]
					: req.query.sort || "updatedAt";
				let order = Array.isArray(req.query.order) ? req.query.order[0] : req.query.order || "-1";

				if (!ALLOWED_SORT_FIELDS.includes(sort)) sort = "updatedAt";
				if (!ALLOWED_ORDER_VALUES.includes(order)) order = "-1";

				const sortOption: Record<string, 1 | -1> = { [sort]: Number(order) as 1 | -1 };

				const blogs = await BlogsModel.find({
					_id: { $in: filteredBlogIds },
					isDraft: { $ne: true },
				})
					.sort(sortOption)
					.populate("tags", "name")
					.lean();

				return res.status(200).json({
					tagName: tag.name,
					blogsArray: blogs,
				});
			} catch (err) {
				console.error("Error fetching tag blogs:", err);
				return res.status(500).json({ error: "Internal server error" });
			}

		default:
			return res.status(405).json({ error: "Method not allowed" });
	}
}

export default withDatabase(handler);
