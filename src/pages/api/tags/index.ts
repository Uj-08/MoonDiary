import type { NextApiRequest, NextApiResponse } from "next";
import connectDB from "@/middleware/mongoose";
import TagsModel from "@/models/Tags.model";
import { HttpMethod } from "@/helpers/apiHelpers";

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
                    }).limit(3).lean();

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
                                blogs: 0,        // remove full blog objects
                                validBlogs: 0,   // optional: remove if not needed
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

        default:
            return res.status(405).json({ error: "Method not allowed" });
    }
}

export default connectDB(handler);
