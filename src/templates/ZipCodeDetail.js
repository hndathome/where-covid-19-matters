import React, { useEffect, useState } from "react"
import { Helmet } from "react-helmet"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTwitter } from '@fortawesome/free-brands-svg-icons'

import Layout from "../components/Layout";
import LeafletMap from "../components/LeafletMap"

import Table from "../components/Table"
import Chart from "../components/Chart"

export const ZipCodeDetail = (props) => {
    const { zipcode, item: { latitude, longitude, markers, nytData, state_info, state: geoState, default_city, state_abbreviation, county_series, county_seriesNames, state_daily } } = props;

    const [allDays, setAllDays] = useState([]);
    const [stateCurrent, setStateCurrent] = useState({})
    const [lastUpdateEt, setLastUpdateEt] = useState('')

    useEffect(() => {
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
                <main role="main">
                    <h1>{default_city}, {state_abbreviation.toUpperCase()} {zipcode}</h1>
                    <div className="row">
                        <div className="col-md-4">
                            {nytData.zipCd === "Empty" &&
                                <h5 style={{ textAlign: "center", paddingTop: "200px" }}>No county data available</h5>
                            }
                            {(nytData.zipCd !== undefined && nytData.zipCd !== "Empty") &&
                                <>
                                    <Chart series={county_series} seriesNames={county_seriesNames} xValue="date" yValue="positiveCt" />
                                    <p>Source: <strong><em>The New York Times</em></strong> via <a href="https://anypoint.mulesoft.com/exchange/portals/mulesoft-2778/5a0bd415-9488-4e33-88d6-ba31cbef5957/contact-tracing-exp-api/">COVID-19 Data Tracking API</a></p>
                                </>
                            }
                        </div>
                        <div className="col-md-4">
                            {nytData.zipCd === "Empty" &&
                                <h5 style={{ textAlign: "center", paddingTop: "200px" }}>No county data available</h5>
                            }
                            {(nytData.zipCd !== undefined && nytData.zipCd !== "Empty") &&
                                <>
                                    <Chart series={county_series} seriesNames={county_seriesNames} xValue="date" yValue="deathCt" />
                                    <p>Source: <strong><em>The New York Times</em></strong> via <a href="https://anypoint.mulesoft.com/exchange/portals/mulesoft-2778/5a0bd415-9488-4e33-88d6-ba31cbef5957/contact-tracing-exp-api/">COVID-19 Data Tracking API</a></p>
                                </>
                            }
                        </div>
                        <div className="col-md-4">
                            {typeof window !== 'undefined' &&
                                <>
                                    <LeafletMap
                                        position={[latitude, longitude]}
                                        zoom={8}
                                        markers={markers}
                                    />
                                    <p>Source: <a href="https://developer.here.com/blog/finding-covid-19-testing-sites">HERE Geocoding and Search API</a></p>
                                </>
                            }
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-4">
                            {allDays.length === 0 &&
                                <h5 style={{ textAlign: "center", paddingTop: "200px" }}>No data available</h5>
                            }
                            {(allDays.length > 0) &&
                                <>
                                    <Chart series={allDays} seriesNames={[{
                                        "name": `Positives`
                                    }]} xValue="date" yValue="positive" />
                                    <p>Source: <a href="https://covidtracking.com/">The COVID Tracking Project</a></p>
                                </>
                            }
                        </div>
                        <div className="col-md-4">
                            {allDays.length === 0 &&
                                <h5 style={{ textAlign: "center", paddingTop: "200px" }}>No data available</h5>
                            }
                            {(allDays.length > 0) &&
                                <>
                                    <Chart series={allDays} seriesNames={[{
                                        "name": `Deaths`
                                    }]} xValue="date" yValue="death" />
                                    <p>Source: <a href="https://covidtracking.com/">The COVID Tracking Project</a></p>
                                </>
                            }
                        </div>
                        <div className="col-md-4">
                            {Object.keys(stateCurrent).length !== 0 &&
                                <>
                                    <h4>Current {geoState} Numbers<span style={{ float: "right", fontSize: ".8rem" }}>Last update: {lastUpdateEt}</span></h4>
                                    <div className="table-responsive">
                                        <Table currentValues={stateCurrent} caption={`The most recent COVID data for ${geoState}. The current value may be different than today.`} />
                                    </div>
                                    <p>{geoState} Department of Health</p>
                                    <ul>
                                        <li><a href={state_info.covid19Site}>Covid-19 Site</a></li>
                                        <li><a href={state_info.covid19SiteSecondary}>Covid-19 Secondary Site</a></li>
                                        {state_info.twitter.startsWith('@') && <li><a href={`https://twitter.com/${state_info.twitter.slice(1)}`}><FontAwesomeIcon icon={faTwitter} aria-label="go to twitter" /></a></li>}
                                    </ul>
                                    <p>Source: <a href="https://covidtracking.com/">The COVID Tracking Project</a></p>
                                </>
                            }
                        </div>
                    </div>
                </main>
            </Layout>
        </>
    )
}