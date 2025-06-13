/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: 'https://moondiary.netlify.app', // replace with your actual domain
    generateRobotsTxt: true,
    exclude: ['/blogs/post*'], // excludes /blogs/post and anything starting with it
    robotsTxtOptions: {
        policies: [
            {
                userAgent: '*',
                allow: '/',
                disallow: ['/blogs/post*'], // disallow all variations (e.g., /blogs/post, /blogs/post/123)
            },
        ],
    },
};