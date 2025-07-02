import { NextApiRequest, NextApiResponse } from "next";
import { withDatabase } from "@/lib/database";
import { blogController } from "@/backend/controllers/blog/blog.controller";
import { HttpMethod } from "@/helpers/apiHelpers";

async function handler(req: NextApiRequest, res: NextApiResponse) {
	if (req.method === HttpMethod.GET) {
		return blogController.getBlogBySlug(req, res);
	}

	return res.status(405).json({ error: "Method Not Allowed" });
}

export default withDatabase(handler);
