import type { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '@/middleware/mongoose';
import BlogsModel from '@/models/Blogs.model';
import TagsModel from '@/models/Tags.model';
import jwtDecode from 'jwt-decode';
import { HttpMethod } from '@/helpers/apiHelpers';

async function handler(req: NextApiRequest, res: NextApiResponse) {
    switch (req.method) {
        case HttpMethod.GET:
            try {
                const sessionToken = req.headers['x-session-token'];
                let clientEmail = null;

                if (sessionToken) {
                    try {
                        const decoded: any = jwtDecode(sessionToken as string);
                        clientEmail = decoded?.email;
                    } catch (e) {
                        console.log(e)
                    }
                }

                const query = clientEmail
                    ? {
                        $or: [
                            { isDraft: { $ne: true } },
                            { authorEmail: clientEmail }
                        ]
                    }
                    : { isDraft: { $ne: true } };

                // Allowed sort fields and orders
                const ALLOWED_SORT_FIELDS = ["updatedAt", "createdAt", "blogTitle"];
                const ALLOWED_ORDER_VALUES = ["1", "-1"];

                let { sort = "updatedAt", order = "-1", limit, filterIds } = req.query;
                const filterIdsArray = filterIds && (filterIds as string).split(",")
                // Validate
                if (!ALLOWED_SORT_FIELDS.includes(sort)) sort = "updatedAt";
                if (!ALLOWED_ORDER_VALUES.includes(order)) order = "-1";

                // Handle filterId (exclude this blog ID if provided)
                if (Array.isArray(filterIdsArray) && filterIdsArray?.length > 0) {
                    query._id = { $nin: filterIdsArray };
                }

                // Fetch blogs
                const blogs = await BlogsModel.find(query)
                    .populate("tags", "name")
                    .sort({ [sort]: Number(order) })
                    .limit(limit ? Number(limit) : 0);

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