require('source-map-support').install()
const path = require('path')
require('ts-node').register({
    compilerOptions: {
        module: 'commonjs',
        target: 'es2017',
    },
})
const { languages } = require('./src/i18n/languages')
const translationsCache = {}

exports.createPages = async function({ actions, graphql }) {
    const result = await graphql(`
        {
            allProjectsYaml(sort: { fields: date, order: DESC }) {
                edges {
                    node {
                        parent {
                            ... on File {
                                name
                                id
                            }
                        }
                    }
                }
            }
        }
    `)

    if (result.errors) {
        return Promise.reject(result.errors)
    }

    return result.data.allProjectsYaml.edges.forEach(
        ({
            node: {
                parent: { name, id },
            },
        }) => {
            Object.keys(languages).map(lang => {
                // Use the values defined in "locales" to construct the path
                const { pathPrefix, isDefault } = languages[lang]
                const localizedPath = isDefault
                    ? `/works/${name}`
                    : `${pathPrefix}/works/${name}`

                if (!translationsCache[lang]) {
                    const translationJson = require(`./src/translations/${lang}`)
                    translationsCache[lang] = translationJson
                }
                actions.createPage({
                    path: localizedPath,
                    component: path.resolve(`./src/layout/Project.tsx`),
                    context: {
                        imageFolder: `works/projects/images/${name}`,
                        id,
                        locale: lang,
                        localeResources: translationsCache[lang],
                    },
                })
            })
        }
    )
}
// Based upon https://github.com/gatsbyjs/gatsby/tree/master/examples/using-i18n
exports.onCreatePage = ({ page, actions }) => {
    const { createPage, deletePage } = actions

    // First delete the incoming page that was automatically created by Gatsby
    // So everything old page in src/pages/ will be deleted
    deletePage(page)

    Object.keys(languages).map(lang => {
        // Use the values defined in "locales" to construct the path
        const { pathPrefix, isDefault } = languages[lang]
        const localizedPath = isDefault
            ? page.path
            : `${pathPrefix}${page.path}`

        if (!translationsCache[lang]) {
            const translationJson = require(`./src/translations/${lang}`)
            translationsCache[lang] = translationJson
        }
        return createPage({
            // Pass on everything from the original page
            ...page,
            path: localizedPath,
            // Pass in the locale as context to every page
            context: {
                ...page.context,
                locale: lang,
                localeResources: translationsCache[lang],
            },
        })
    })
}
