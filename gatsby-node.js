const path = require("path")

exports.onCreatePage = async ({ page, actions }) => {
    const { createPage } = actions
    console.log("Page - ", page.path)

    if (page.path.match(/^\/app/)) {
        createPage({
            path: "/app",
            matchPath: "/app/*",
            component: path.resolve(`src/pages/app.js`),
        })
    }
}