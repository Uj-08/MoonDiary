import type { NextApiRequest, NextApiResponse } from 'next'
import fs from "fs";
import path from "path";
import { MongoClient } from 'mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if(req.method === "POST") {
        const body = req.body;
        const blogTitle = body.blogTitle;
        const blogData = body.blogData;
        const authorName = body.authorName;
        const authorPicture = body.authorPicture;
        const authorEmail = body.authorEmail;
        const date = body.date;

        const newBlog = {
            blogTitle: blogTitle,
            blogData: blogData,
            authorName: authorName,
            authorPicture: authorPicture,
            authorEmail: authorEmail,
            date: date,
        };

        // const filePath = path.join(process.cwd(), "data", "blogdata.json");
        // const fileData = fs.readFileSync(filePath);
        // const data = JSON.parse(fileData);
        // data.push(newBlog);
        // fs.writeFileSync(filePath, JSON.stringify(data));
        try {
            const client = MongoClient.connect(process.env.DB as string);
            const db = (await client).db();
            await db.collection("blogs").insertOne(newBlog);
            (await client).close();
        } catch (err) {
            console.log(err);
            res.status(500).json({message: "Could not connect to database."})
        }
        res.status(201).json({message: "Success", newBlog: newBlog})
    }

    if(req.method === "GET") {
        res.status(200).json({ response: "data" })
    }
} 