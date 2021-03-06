const path = require("path")

exports.onCreatePage = async ({ page, actions }) => {
    const { createPage } = actions
    console.log("Page - ", page.path)

    if (page.path.match(/^\/details/)) {
        page.matchPath = "/details/*"
        createPage(page)
    }
}

exports.onCreateWebpackConfig = ({ stage, loaders, actions }) => {
    if (stage === "build-html") {
        actions.setWebpackConfig({
            module: {
                rules: [
                    {
                        test: /leaflet/,
                        use: loaders.null(),
                    },
                ],
            },
        })
    }
}
