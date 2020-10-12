import React from "react"
import { Helmet } from "react-helmet"

import Layout from "../components/Layout";
import LeafletMap from "../components/LeafletMap"

import Table from "../components/Table"
import Chart from "../components/Chart"

export const ZipCodeDetail = (props) => {
    const { zipcode, item, item: { latitude, longitude, markers, nytData, state_current, state_info, state: geoState, default_city, state_abbreviation, county_series, county_seriesNames } } = props;
    let lastUpdateEt = new Date(state_current.lastUpdateEt || state_current.lastModified || state_current.datechecked)
    lastUpdateEt = lastUpdateEt.toLocaleString();
    const last30days = [item.state_daily.slice(0, 30).reverse().map(obj => {
        var temp = Object.assign({}, obj);
        var tempDate = obj.date.toString();
        temp.date = `${tempDate.slice(4, 6)}-${tempDate.slice(6, 8)}-${tempDate.slice(0, 4)}`
        return temp;
    })];
    return (
        <>
            <Helmet>
                <meta charSet="utf-8" />
                <title>{zipcode} Details</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                <link rel="stylesheet" href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css"
                    integrity="sha512-xodZBNTC5n17Xt2atTPuE1HxjVMSvLVW9ocqUKLsCC5CXdbqCmblAshOMAS6/keqq/sMZMZ19scR4PsZChSR7A=="
                    crossorigin="" />
                <script src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js"
                    integrity="sha512-XQoYMqMTK8LvdxXYG3nZ448hOEQiglfqkJs1NOQV44cWnUrBc8PkAOcXy20w0vlaXaVUearIOBhiXZ5V3ynxwA=="
                    crossorigin=""></script>
            </Helmet>
            <Layout>
                <main role="main">
                    <div className="row">
                        <div className="col-md-4">
                            {nytData.zipCd === "Empty" &&
                                <h5 style={{ textAlign: "center", paddingTop: "200px" }}>No county data available</h5>
                            }
                            {(nytData.zipCd !== undefined && nytData.zipCd !== "Empty") &&
                                <Chart series={county_series} seriesNames={county_seriesNames} xValue="date" yValue="positiveCt" />
                            }
                        </div>
                        <div className="col-md-4">
                            {nytData.zipCd === "Empty" &&
                                <h5 style={{ textAlign: "center", paddingTop: "200px" }}>No county data available</h5>
                            }
                            {(nytData.zipCd !== undefined && nytData.zipCd !== "Empty") &&
                                <Chart series={county_series} seriesNames={county_seriesNames} xValue="date" yValue="deathCt" />
                            }
                        </div>
                        <div className="col-md-4">
                            {typeof window !== 'undefined' &&
                                <LeafletMap
                                    position={[latitude, longitude]}
                                    zoom={8}
                                    markers={markers}
                                />
                            }
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-4">
                            {Object.keys(state_current).length !== 0 &&
                                <>
                                    <h4>Current {geoState} Numbers<span style={{ float: "right", fontSize: ".8rem" }}>Last update: {lastUpdateEt}</span></h4>
                                    <div className="table-responsive">
                                        <Table currentValues={state_current} caption={`The most recent COVID data for ${geoState}. The current value may be different than today.`} />
                                    </div>
                                </>
                            }
                        </div>
                        <div className="col-md-4">
                            {last30days.length === 0 &&
                                <h5 style={{ textAlign: "center", paddingTop: "200px" }}>No data available</h5>
                            }
                            {(last30days.length > 0) &&
                                <Chart series={last30days} seriesNames={[{
                                    "name": `${geoState}: Positives`
                                }]} xValue="date" yValue="positive" />
                            }
                        </div>
                        <div className="col-md-4">

                        </div>
                    </div>


                </main>
            </Layout>
        </>
    )
}