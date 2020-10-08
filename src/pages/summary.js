import React from "react"
import Layout from "../components/Layout"
import SummaryCard from "../components/SummaryCard"

export default function Summary({ location }) {
    let myZipCodes = [];
    if (location.state) {
        myZipCodes = location.state.myZipCodes;
    }
    return (
        <Layout>
            <main role="main">
                <section className="jumbotron text-center">
                    <div className="container">
                        <h1>Summary Results</h1>
                        {/* <p className="lead text-muted"></p> */}
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
    )
}