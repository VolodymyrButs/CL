const { createProxyMiddleware } = require('http-proxy-middleware')

let activeEnv =
    process.env.GATSBY_ACTIVE_ENV || process.env.NODE_ENV || 'development'

require('dotenv').config({
    path: `.env.${activeEnv}`,
})
// eslint-disable-next-line no-console
console.log(`Using environment config: '${activeEnv}'`, process.env.PORT)
module.exports = {
    pathPrefix: process.env.PREFIX,
    siteMetadata: {
        title: 'Clearline Website',
        description:
            'The company «Clearline» develops interior design projects for residential and non-residential premises, working drawings for construction and finishing works, design drawings for the production of furniture and kitchens on an individual order, we carry out all types of repair work, we carry out supervision of compliance with project documentation, we are engaged in final decoration premises',
        author: 'Buts Development',
        siteUrl: process.env.SITE_ADDRESS,
    },
    developMiddleware: (app) => {
        app.use(
            '/send-form',
            createProxyMiddleware({
                target: `http://${process.env.API_URL}${process.env.API_PORT}`,
                changeOrigin: true,
            })
        )
    },
    plugins: [
        {
            resolve: `gatsby-plugin-google-gtag`,
            options: {
                trackingIds: [
                    process.env.GA_ID,
                    process.env.GADS_ID,
                    process.env.GA4_ID,
                ],
                pluginConfig: {
                    head: true,
                },
            },
        },
        {
            resolve: `gatsby-plugin-facebook-pixel`,
            options: {
                pixelId: process.env.GATSBY_FB_PIXEL_ID,
            },
        },
        `gatsby-alias-imports`,
        {
            resolve: 'gatsby-plugin-react-svg',
            options: {
                rule: {
                    include: /assets/, // See below to configure properly
                },
            },
        },
        {
            resolve: `gatsby-transformer-yaml-full`,
            options: {
                plugins: [
                    `gatsby-yaml-full-markdown`, // Enable !markdown tags
                ],
            },
        },
        'gatsby-plugin-react-helmet',
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                name: `markdown-pages`,
                path: `${__dirname}/data`,
            },
        },
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                name: `works`,
                path: `${__dirname}/data/works`,
            },
        },
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                name: `images`,
                path: `${__dirname}/src/assets/images`,
            },
        },
        `gatsby-transformer-remark`,
        'gatsby-transformer-sharp',
        'gatsby-plugin-typescript',
        'gatsby-plugin-styled-components',
        {
            resolve: `gatsby-plugin-sharp`,
            options: {
                pngCompressionSpeed: 10,
            },
        },
        /*        {
            resolve: `gatsby-plugin-prefetch-google-fonts`,
            options: {
                fonts: [
                    {
                        family: `Open Sans`,
                        variants: [`400`, `600`, `700`],
                    },
                ],
            },
        }, */
        {
            resolve: 'gatsby-plugin-manifest',
            options: {
                name: 'clearline',
                short_name: 'CL', // eslint-disable-line camelcase
                start_url: '/', // eslint-disable-line camelcase
                background_color: '#663399', // eslint-disable-line camelcase
                theme_color: '#663399', // eslint-disable-line camelcase
                display: 'fullscreen',
                icon: `static/favicon.png`,
                // eslint-disable-next-line camelcase
                icon_options: {
                    purpose: `maskable`, // eslint-disable-line camelcase
                },
            },
        },
        'gatsby-plugin-offline',
    ],
}
