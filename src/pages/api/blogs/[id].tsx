import { NextApiRequest, NextApiResponse } from "next";
import connectDB from '@/middleware/mongoose';
import BlogsModel from '@/models/Blogs.model';

async function handler(req: NextApiRequest, res: NextApiResponse) {
    const {id} = req.query;
    if(req.method === "GET") {
        try {
            let blog = await BlogsModel.findById(id);
            res.status(200).json({ blog })
        } catch(err) {
            console.log("error: ", err);
            res.status(500).json({error: err})
        }
    }
    else if(req.method === "DELETE") {
        try {
            await BlogsModel.findByIdAndDelete(id);
            res.status(200).json({ id });
        } catch(err) {
            console.log("error: ", err);
            res.status(500).json({error: err})
        }
    }
    else if(req.method === "PUT") {
        try {
            await BlogsModel.findByIdAndUpdate(id, req.body);
            res.status(200).json({ id });
        } catch(err) {
            console.log("error: ", err);
            res.status(500).json({ error: err });
        }
    }
} 

export default connectDB(handler);