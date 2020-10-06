import React from "react"
import Layout from "../components/Layout"
import SummaryCard from "../components/SummaryCard"

export default function Summary({ location }) {
    return (
        <Layout>
            <main role="main">
                <section className="jumbotron text-center">
                    <div className="container">
                        <h1>COVID-19 Summary Results</h1>
                        {/* <p className="lead text-muted"></p> */}
                    </div>
                </section>
                <div className="album py-5 bg-light">
                    <div className="container">
                        <div className={location.state.myZipCodes.length > 2 ? "row" : "row justify-content-around"}>
                            {location.state.myZipCodes.map(zip => <SummaryCard item={zip} key={zip.id} />)}
                        </div>
                    </div>
                </div>
            </main>
        </Layout>
    )
}