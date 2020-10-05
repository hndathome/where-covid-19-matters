import React from "react"
import SummaryCard from "../components/SummaryCard"

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
                    {/* <p className="lead text-muted"></p> */}
                </div>
            </section>
            <div className="album py-5 bg-light">
                <div className="container">
                    <div className="row">
                        {location.state.myZipCodes.map(zip => <SummaryCard item={zip} key={zip.id} />)}
                    </div>
                </div>
            </div>
        </main>

    )
}