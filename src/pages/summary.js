import React from "react"

export default function Summary({ location }) {
    return (
        //covid-19 testing locations
        //`https://discover.search.hereapi.com/v1/discover?apikey=${process.env.GATSBY_HERE_API_KEY}&q=Covid&at=36.03,-94.15&limit=3`

        //state data, below desired keys
        //notes
        //covid19Site
        //covid19SiteSecondary
        //twitter
        //`https://api.covidtracking.com/v1/states/ar/info.json`
        <main role="main">
            <section className="jumbotron text-center">
                <div className="container">
                    <h1>COVID-19 Summary Results</h1>
                    {/* <p className="lead text-muted">An album of <a href="https://www.kingarthurbaking.com/recipes">King Arthur Baking recipes</a> baked during COVID-19 quarantine.</p> */}
                </div>
            </section>
            <div className="album py-5 bg-light">
                <div className="container">
                    <div className="row">
                        {location.state.myZipCodes.map((item, index) => (
                            <div className="col-md-4">
                                <div className="card mb-4 shadow-sm">
                                    <img className="bd-placeholder-img card-img-top" width="100%" height="225" focusable="false" src="" alt="" />
                                    <div className="card-body">
                                        <p className="card-text">{item.zipcode}</p>
                                        {/* text-truncate */}
                                        <div className="d-flex justify-content-between align-items-center">
                                            {/* <div className="btn-group">
                                                <a href={node.name} type="button" className="btn btn-sm btn-outline-secondary">View</a>
                                            </div> */}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </main>

    )
}