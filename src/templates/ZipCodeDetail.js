import React, { useEffect, useState } from "react"
import { Helmet } from "react-helmet"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTwitter } from '@fortawesome/free-brands-svg-icons'
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons'

import Layout from "../components/Layout";
import LeafletMap from "../components/LeafletMap"

import Table from "../components/Table"
import Chart from "../components/Chart"
import TestLocation from "../components/TestLocation"

export const ZipCodeDetail = (props) => {
    const { zipcode, item: { latitude, longitude, markers, nytData, state_info, state: geoState, default_city, state_abbreviation, county_series, county_seriesNames, state_daily } } = props;
    const [allDays, setAllDays] = useState([]);
    const [stateCurrent, setStateCurrent] = useState({})
    const [lastUpdateEt, setLastUpdateEt] = useState('')

    useEffect(() => {
        if (state_daily[0]) {
            setStateCurrent(state_daily[0]);
            let newDate = new Date(state_daily[0].lastUpdateEt || state_daily[0].lastModified || state_daily[0].datechecked)
            setLastUpdateEt(newDate.toLocaleString());
            let stateDaily = state_daily.map(obj => {
                var temp = Object.assign({}, obj);
                var tempDate = obj.date.toString();
                temp.date = `${tempDate.slice(4, 6)}-${tempDate.slice(6, 8)}-${tempDate.slice(0, 4)}`
                return temp;
            });
            stateDaily.reverse();
            setAllDays([stateDaily]);
        }
    }, [state_daily]);

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
                <div className="container">
                    <main role="main">
                        <h1 style={{ marginTop: "20px", textAlign: "right" }}>{default_city}, {state_abbreviation.toUpperCase()} {zipcode}</h1>
                        <h3 className="pb-3 mb-4 font-italic border-bottom">Local Covid-19 Information</h3>
                        <div className="row featurette">
                            <div className="col-md-4">
                                {nytData.zipCd === "Empty" &&
                                    <h5 style={{ textAlign: "center", paddingTop: "200px" }}>No county data available</h5>
                                }
                                {(nytData.zipCd !== undefined && nytData.zipCd !== "Empty") &&
                                    <>
                                        <div className="row">
                                            <div className="col-12">
                                                <p style={{ textAlign: "right" }}><strong>Covid-19 Positives</strong></p>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-12">
                                                <Chart series={county_series} seriesNames={county_seriesNames} xValue="date" yValue="positiveCt" />
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-12">
                                                <p>Source: <strong><em>The New York Times</em></strong> via <a href="https://anypoint.mulesoft.com/exchange/portals/mulesoft-2778/5a0bd415-9488-4e33-88d6-ba31cbef5957/contact-tracing-exp-api/">COVID-19 Data Tracking API</a></p>
                                            </div>
                                        </div>
                                    </>
                                }
                            </div>
                            <div className="col-md-4">
                                {nytData.zipCd === "Empty" &&
                                    <h5 style={{ textAlign: "center", paddingTop: "200px" }}>No county data available</h5>
                                }
                                {(nytData.zipCd !== undefined && nytData.zipCd !== "Empty") &&
                                    <>
                                        <div className="row">
                                            <div className="col-12">
                                                <p style={{ textAlign: "right" }}><strong>Covid-19 Deaths</strong></p>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-12">
                                                <Chart series={county_series} seriesNames={county_seriesNames} xValue="date" yValue="deathCt" />
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-12">
                                                <p>Source: <strong><em>The New York Times</em></strong> via <a href="https://anypoint.mulesoft.com/exchange/portals/mulesoft-2778/5a0bd415-9488-4e33-88d6-ba31cbef5957/contact-tracing-exp-api/">COVID-19 Data Tracking API</a></p>
                                            </div>
                                        </div>
                                    </>
                                }
                            </div>
                            <div className="col-md-4">
                                <div className="row">
                                    <div className="col-12">
                                        <>
                                            <div className="card mb-4 box-shadow">
                                                <LeafletMap
                                                    className="card-img-top"
                                                    position={[latitude, longitude]}
                                                    zoom={8}
                                                    markers={markers}
                                                />
                                                <div className="card-body">
                                                    <p>Source: <a href="https://developer.here.com/blog/finding-covid-19-testing-sites">HERE Geocoding and Search API</a></p>
                                                    <p data-toggle="collapse" data-target="#divLocations"><FontAwesomeIcon fixedWidth className="bootstrap-primary" icon={faInfoCircle} aria-label="show list of Covid-19 locations" />Covid-19 Testing Locations</p>
                                                    <div className="accordian-body collapse" id="divLocations">
                                                        <ul className="list-group list-group-flush">
                                                            {markers.length === 0 && <li className="list-group-item"><strong>No locations found.</strong></li>}
                                                            {markers.length > 0 && markers.map((location, index) => <TestLocation datapoint={location} key={index} />)}
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                        </>
                                    </div>
                                </div>

                            </div>
                        </div>
                        <h3 className="pb-3 mb-4 font-italic border-bottom"><div className="row">
                            <div className="col-md-6">
                                State Covid-19 Information
                            </div>
                            <div className="col-md-6">
                                <ul className="list-group list-group-horizontal" style={{ fontSize: "16px", float: "right" }}>
                                    <li className="list-group-item"><a href={state_info.covid19Site}>Covid-19 Site</a></li>
                                    <li className="list-group-item"><a href={state_info.covid19SiteSecondary}>Covid-19 Secondary Site</a></li>
                                    {state_info.twitter.startsWith('@') && <li className="list-group-item"><a href={`https://twitter.com/${state_info.twitter.slice(1)}`}><FontAwesomeIcon icon={faTwitter} aria-label="go to twitter" /></a></li>}
                                </ul>
                            </div>
                        </div></h3>
                        <div className="row featurette">
                            <div className="col-md-4">
                                {allDays.length === 0 &&
                                    <h5 style={{ textAlign: "center", paddingTop: "200px" }}>No data available</h5>
                                }
                                {(allDays.length > 0) &&
                                    <>
                                        <div className="row">
                                            <div className="col-12">
                                                <p style={{ textAlign: "right" }}><strong>{geoState} Covid-19 Positives</strong></p>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-12">
                                                <Chart series={allDays} seriesNames={[{
                                                    "name": `Positives`
                                                }]} xValue="date" yValue="positive" />
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-12">
                                                <p>Source: <a href="https://covidtracking.com/">The COVID Tracking Project</a></p>
                                            </div>
                                        </div>
                                    </>
                                }
                            </div>
                            <div className="col-md-4">
                                {allDays.length === 0 &&
                                    <h5 style={{ textAlign: "center", paddingTop: "200px" }}>No data available</h5>
                                }
                                {(allDays.length > 0) &&
                                    <>
                                        <div className="row">
                                            <div className="col-12">
                                                <p style={{ textAlign: "right" }}><strong>{geoState} Covid-19 Deaths</strong></p>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-12">
                                                <Chart series={allDays} seriesNames={[{
                                                    "name": `Deaths`
                                                }]} xValue="date" yValue="death" />
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-12">
                                                <p>Source: <a href="https://covidtracking.com/">The COVID Tracking Project</a></p>
                                            </div>
                                        </div>
                                    </>
                                }
                            </div>
                            <div className="col-md-4">
                                {(stateCurrent && Object.keys(stateCurrent).length !== 0) &&
                                    <>
                                        <div className="row">
                                            <div className="col-12">
                                                <h4>Current {geoState} Numbers<span style={{ float: "right", fontSize: ".8rem" }}>Last update: {lastUpdateEt}</span></h4>
                                                <div className="table-responsive">
                                                    <Table currentValues={stateCurrent} caption={`The most recent COVID data for ${geoState}. The current value may be different than today.`} />
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                }
                            </div>
                        </div>
                    </main>
                </div>
            </Layout>
        </>
    )
}