import type { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '@/middleware/mongoose';
import BlogsModel from '@/models/Blogs.model';
import TagsModel from '@/models/Tags.model';
import jwtDecode from 'jwt-decode';
import { HttpMethod } from '@/helpers/apiHelpers';
import { ClientType } from '@/types/client';
import { SortOrder } from 'mongoose';

async function handler(req: NextApiRequest, res: NextApiResponse) {
    switch (req.method) {
        case HttpMethod.GET:
            try {
                const sessionToken = req.headers['x-session-token'];
                let clientEmail = null;

                let { sort = "updatedAt", order = "-1", limit, filterIds, showDrafts } = req.query;

                if (sessionToken) {
                    try {
                        const decoded: ClientType = jwtDecode(sessionToken as string);
                        clientEmail = decoded?.email;
                    } catch (e) {
                        console.log(e)
                    }
                }

                let mongoQuery: Record<string, any> = {}

                if (clientEmail !== null) {
                    if (showDrafts === "true") {
                        mongoQuery = {
                            $and: [
                                { isDraft: { $eq: true } },
                                { authorEmail: { $eq: clientEmail } }
                            ]
                        }
                    } else {
                        mongoQuery = {
                            $and: [
                                { isDraft: { $ne: true } },
                                { authorEmail: { $eq: clientEmail } }
                            ]
                        }
                    }
                } else {
                    mongoQuery = {
                        isDraft: { $ne: true }
                    }
                }

                // Allowed sort fields and orders
                const ALLOWED_SORT_FIELDS = ["updatedAt", "createdAt", "filterIds", "blogTitle"];
                const ALLOWED_ORDER_VALUES = ["1", "-1"];

                const filterIdsArray = filterIds && (filterIds as string).split(",")
                // Validate
                if (!ALLOWED_SORT_FIELDS.includes(sort as string)) sort = "updatedAt";
                if (!ALLOWED_ORDER_VALUES.includes(order as string)) order = "-1";

                // Handle filterId (exclude this blog ID if provided)
                if (Array.isArray(filterIdsArray) && filterIdsArray?.length > 0) {
                    mongoQuery._id = { $nin: filterIdsArray };
                }

                const sortOptions: { [key: string]: SortOrder } = {
                    [sort as string]: Number(order) as SortOrder,
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
                return res.status(500).json(err);
            }
        case HttpMethod.POST:
            try {
                const body = req.body;

                // Normalize tags to remove duplicates and trim whitespace
                const cleanTags = [...new Set((body.tags as string[]).map(t => t.trim()))];

                // Find or create tags
                const tagDocs = await Promise.all(cleanTags.map(async name => {
                    let tag = await TagsModel.findOne({ name });
                    tag ??= await TagsModel.create({ name });
                    return tag;
                }));

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
                    tags: tagDocs.map(tag => tag._id),
                });

                // Update blogIds in tag docs
                await Promise.all(tagDocs.map(tag =>
                    TagsModel.findByIdAndUpdate(tag._id, {
                        $addToSet: { blogIds: newBlog._id },
                    })
                ));

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

export default connectDB(handler);