import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '@/lib/dbConnect';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        await dbConnect(); // ensure MongoDB is pinged
        res.status(200).json({ success: true, message: 'Keep-alive successful' });
    } catch (error) {
        console.error("Keep-alive error:", error);
        res.status(500).json({ success: false, message: 'Keep-alive failed' });
    }
}