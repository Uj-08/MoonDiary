import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    const baseUrl = process.env.BASE_URL;

    const robots = `
User-agent: *
Allow: /

Sitemap: ${baseUrl}/sitemap.xml
  `.trim();

    res.setHeader("Content-Type", "text/plain");
    res.write(robots);
    res.end();
}