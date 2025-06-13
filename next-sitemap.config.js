/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: 'https://moondiary.netlify.app',
    generateRobotsTxt: true,
    exclude: ['/blogs/post*'],
    robotsTxtOptions: {
        policies: [
            {
                userAgent: '*',
                allow: '/',
                disallow: ['/blogs/post*'],
            },
        ],
    },

    transform: async (config, path) => {
        let priority = 0.5;
        let changefreq = 'monthly';
        if (path === '/') {
            priority = 1.0;
            changefreq = 'daily';
        }
        else if (path.startsWith('/blogs')) {
            priority = 0.8;
            changefreq = 'weekly';
        } else if (path.startsWith('/features')) {
            priority = 0.6;
            changefreq = 'daily';
        } else if (path.startsWith('/about') || path.startsWith('/contact')) {
            changefreq = 'weekly';
        }
        // else if (path.startsWith('/privacy') || path.startsWith('/terms')) {
        //     priority = 0.3;
        //     changefreq = 'yearly';
        // }

        return {
            loc: path,
            lastmod: new Date().toISOString(),
            priority,
            changefreq,
        };
    },
};