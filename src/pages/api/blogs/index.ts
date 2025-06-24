import type { NextApiRequest, NextApiResponse } from "next";
import BlogsModel from "@/models/Blogs.model";
import TagsModel from "@/models/Tags.model";
import jwtDecode from "jwt-decode";
import { HttpMethod } from "@/helpers/apiHelpers";
import { ClientType } from "@/types/client";
import { FilterQuery, SortOrder } from "mongoose";
import { BlogType } from "@/types/blog";
import { withDatabase } from "@/lib/database";

async function handler(req: NextApiRequest, res: NextApiResponse) {
	switch (req.method) {
		case HttpMethod.GET:
			try {
				const sessionToken = req.headers["x-session-token"];
				let clientEmail: string | null = null;

				let { sort, order, limit, filterIds, showDrafts, showPublished } = req.query;

				// Decode session token
				if (sessionToken) {
					try {
						const decoded: ClientType = jwtDecode(sessionToken as string);
						clientEmail = decoded?.email || null;
					} catch (e) {
						console.error("JWT decode error:", e);
					}
				}

				const isLoggedIn = !!clientEmail;
				const isDraftView = showDrafts === "true";
				const isPublishedView = showPublished === "true";

				// Initialize base query
				const mongoQuery: FilterQuery<BlogType> = {
					isDraft: isDraftView,
				};

				//Bring all the blogs written by author
				if (isLoggedIn && (isDraftView || isPublishedView)) {
					mongoQuery.authorEmail = clientEmail;
				}

				// Handle excluded blog IDs
				const filterIdsArray = typeof filterIds === "string" ? filterIds.split(",") : [];
				if (filterIdsArray.length > 0) {
					mongoQuery._id = { $nin: filterIdsArray };
				}

				// Validate sort field & order
				const ALLOWED_SORT_FIELDS = ["updatedAt", "createdAt", "filterIds", "blogTitle"];
				const ALLOWED_ORDER_VALUES = ["1", "-1"];

				const validatedSort = ALLOWED_SORT_FIELDS.includes(sort as string)
					? (sort as string)
					: "updatedAt";
				const validatedOrder = ALLOWED_ORDER_VALUES.includes(order as string)
					? (order as string)
					: "-1";

				const sortOptions: Record<string, SortOrder> = {
					[validatedSort]: Number(validatedOrder) as SortOrder,
				};

				// Fetch blogs
				const blogs = await BlogsModel.find(mongoQuery)
					.populate("tags", "name")
					.sort(sortOptions)
					.limit(limit ? Number(limit) : 0)
					.lean();

				return res.status(200).json(blogs);
			} catch (err) {
				console.error("GET error:", err);
				return res.status(500).json({ error: "Internal server error" });
			}
		case HttpMethod.POST:
			try {
				const body = req.body;

				// Normalize tags to remove duplicates and trim whitespace
				const cleanTags = [...new Set((body.tags as string[]).map((t) => t.trim()))];

				// Find or create tags
				const tagDocs = await Promise.all(
					cleanTags.map(async (name) => {
						let tag = await TagsModel.findOne({ name });
						tag ??= await TagsModel.create({ name });
						return tag;
					})
				);

				// Create the new blog
				const newBlog = new BlogsModel({
					blogTitle: body.blogTitle,
					slug: body.slug,
					seoDescription: body.seoDescription,
					blogImg: body.blogImg,
					blogData: body.blogData,
					authorName: body.authorName,
					authorPicture: body.authorPicture,
					authorEmail: body.authorEmail,
					isDraft: body.isDraft,
					tags: tagDocs.map((tag) => tag._id),
				});

				// Update blogIds in tag docs
				await Promise.all(
					tagDocs.map((tag) =>
						TagsModel.findByIdAndUpdate(tag._id, {
							$addToSet: { blogIds: newBlog._id },
						})
					)
				);

				const savedBlog = await newBlog.save();
				return res.status(201).json({ id: savedBlog._id });
			} catch (err) {
				console.error("POST error:", err);
				return res.status(500).json(err);
			}

		default:
			return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
	}
}

export default withDatabase(handler);
