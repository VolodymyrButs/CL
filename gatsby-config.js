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
    developMiddleware: app => {
        app.use(
            '/send-form',
            createProxyMiddleware({
                target: process.env.PORT,
                changeOrigin: true,
            })
        )
    },
    plugins: [
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
        'gatsby-plugin-sharp',
        'gatsby-plugin-typescript',
        'gatsby-plugin-styled-components',
        {
            resolve: `gatsby-plugin-prefetch-google-fonts`,
            options: {
                fonts: [
                    {
                        family: `Open Sans`,
                        variants: [`400`, `600`, `700`],
                    },
                ],
            },
        },
        {
            resolve: 'gatsby-plugin-manifest',
            options: {
                name: 'gatsby-starter-default',
                short_name: 'starter', // eslint-disable-line camelcase
                start_url: '/', // eslint-disable-line camelcase
                background_color: '#663399', // eslint-disable-line camelcase
                theme_color: '#663399', // eslint-disable-line camelcase
                display: 'minimal-ui',
                icon: `static/icon.png`,
            },
        },
    ],
}
