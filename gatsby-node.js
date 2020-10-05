const path = require("path")

exports.onCreatePage = async ({ page, actions }) => {
    const { createPage } = actions
    console.log("Page - ", page.path)

    if (page.path.match(/^\/details/)) {
        page.matchPath = "/details/*"
        createPage(page)
    }
}