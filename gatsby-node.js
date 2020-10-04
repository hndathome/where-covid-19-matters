const path = require("path")

exports.onCreatePage = async ({ page, actions }) => {
    const { createPage } = actions
    console.log("Page - ", page.path)

    if (page.path.match(/^\/app/)) {
        page.matchPath = "/app/*"
        createPage(page)
    }
}