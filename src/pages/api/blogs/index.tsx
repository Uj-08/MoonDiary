import type { NextApiRequest, NextApiResponse } from 'next'
import connectDB from '@/middleware/mongoose';
import BlogsModel from '@/models/Blogs.model';

async function handler(req: NextApiRequest, res: NextApiResponse) {
    if(req.method === "POST") {
        const body = req.body;
        let newBlog = new BlogsModel({
            blogTitle: body.blogTitle,
            blogImg: body.blogImg,
            blogData: body.blogData,
            authorName: body.authorName,
            authorPicture: body.authorPicture,
            authorEmail: body.authorEmail, 
        });
        try {
            const savedObj = await newBlog.save();
            const id = savedObj._id;
            res.status(201).json({ id })
        } catch (err) {
            console.log(err);
            res.status(500).json({message: "Could not connect to database."})
        }
    }

    else if(req.method === "GET") {
        try {
            let blogs = await BlogsModel.find();
            res.status(200).json({ blogs })
        } catch(err) {
            console.log("error: ", err);
            res.status(500).json({error: err})
        }
    }
} 

export default connectDB(handler);