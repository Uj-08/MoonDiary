import { NextApiRequest, NextApiResponse } from "next";
import BlogsModel from "@/models/Blogs.model";
import { HttpMethod } from "@/helpers/apiHelpers";
import { withDatabase } from "@/lib/database";

async function handler(req: NextApiRequest, res: NextApiResponse) {
	const { slug } = req.query;

	switch (req.method) {
		case HttpMethod.GET:
			try {
				const sendAll = req.query.sendAll === "true";
				const blog = await BlogsModel.findOne({ slug })
					.populate("tags", sendAll ? "" : "name")
					.lean();
				return res.status(200).json(blog);
			} catch (err) {
				console.error("GET error:", err);
				return res.status(500).json(err);
			}
		default:
			return res.status(405).json({ error: "Method Not Allowed" });
	}
}

export default withDatabase(handler);
