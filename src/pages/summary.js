import React from "react"
import { Helmet } from "react-helmet"
import Layout from "../components/Layout"
import SummaryCard from "../components/SummaryCard"

export default function Summary({ location }) {
    let myZipCodes = [];
    if (location.state) {
        myZipCodes = location.state.myZipCodes;
    }
    return (
        <>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Summary Results</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                {/* <link rel="stylesheet" href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css"
                    integrity="sha512-xodZBNTC5n17Xt2atTPuE1HxjVMSvLVW9ocqUKLsCC5CXdbqCmblAshOMAS6/keqq/sMZMZ19scR4PsZChSR7A=="
                    crossorigin="" />
                <script src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js"
                    integrity="sha512-XQoYMqMTK8LvdxXYG3nZ448hOEQiglfqkJs1NOQV44cWnUrBc8PkAOcXy20w0vlaXaVUearIOBhiXZ5V3ynxwA=="
                    crossorigin=""></script> */}
            </Helmet>
            <Layout>
                <main role="main">
                    <section className="jumbotron text-center">
                        <div className="container">
                            <h1>Summary Results</h1>
                            <p className="lead text-muted">&#34;Covid-19 Positive Count&#34; is sourced from <strong><em>The New York Times</em></strong> via <a href="https://anypoint.mulesoft.com/exchange/portals/mulesoft-2778/5a0bd415-9488-4e33-88d6-ba31cbef5957/contact-tracing-exp-api/">COVID-19 Data Tracking API</a>.</p>
                            <p className="lead text-muted">&#34;Covid-19 Testing Locations&#34; are sourced from <strong><em><a href="https://developer.here.com/blog/finding-covid-19-testing-sites">HERE Geocoding and Search API</a></em></strong>.</p>
                            <p className="lead text-muted">State Health Department links are provided by <strong><em><a href="https://covidtracking.com/">The COVID Tracking Project</a></em></strong>.</p>
                        </div>
                    </section>
                    <div className="album py-5 bg-light">
                        <div className="container">
                            <div className={myZipCodes.length > 2 ? "row" : "row justify-content-around"}>
                                {myZipCodes.map(zip => <SummaryCard item={zip} key={zip.id} />)}
                            </div>
                        </div>
                    </div>
                </main>
            </Layout>
        </>
    )
}