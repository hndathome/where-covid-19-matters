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
import covidTracking from "../covidtracking.api"
import smartyStreets from "../smartystreets.api"
import hereAPI from "../here.api"
import localCovid from "../localcoviddata.api"

export const ZipCodeDetail = (props) => {
    const { zipcode, item } = props;
    const [allDays, setAllDays] = useState([]);
    const [stateCurrent, setStateCurrent] = useState({})
    const [lastUpdateEt, setLastUpdateEt] = useState('')
    const [allStateDaily, setAllStateDaily] = useState();
    const [itemKeysCount, setItemKeysCount] = useState(Object.keys(item).length);
    const [pageItem, setPageItem] = useState({ ...item });
    const [stateAbbr, setStateAbbr] = useState(item.state_abbreviation)
    const [isValid, setIsValid] = useState(true);
    const [pageZipCode, setPageZipCode] = useState(item.zipcode);

    useEffect(() => {
        //navigated directly to link
        const fetchData = async () => {
            try {
                const responseAllStatesInfo = await covidTracking.getStatesInfo();
                const responseSmartyStreet = await smartyStreets.lookupZipCode(zipcode);

                if (responseSmartyStreet.zipcodes === undefined) {
                    alert('Invalid zip code.');
                    setIsValid(false);
                }
                else {
                    const { zipcodes } = responseSmartyStreet;

                    let atLat = zipcodes[0].latitude.toString();
                    let atLong = zipcodes[0].longitude.toString();
                    const gps = `${atLat},${atLong}`
                    const markers = await hereAPI.getCovid19TestingLocations(gps);

                    const response = await localCovid.getLocalCovidData(zipcode);
                    let nytData;
                    let county_seriesNames;
                    let county_series;

                    const responseAllStateDaily = await covidTracking.getHistoricStateData(zipcodes[0].state_abbreviation.toLowerCase());
                    setAllStateDaily(responseAllStateDaily);
                    setStateCurrent(responseAllStateDaily[0]);
                    let newDate = new Date(responseAllStateDaily[0].lastUpdateEt || responseAllStateDaily[0].lastModified || responseAllStateDaily[0].datechecked)
                    setLastUpdateEt(newDate.toLocaleString());
                    let stateDaily = responseAllStateDaily.map(obj => {
                        var temp = Object.assign({}, obj);
                        var tempDate = obj.date.toString();
                        temp.date = `${tempDate.slice(4, 6)}-${tempDate.slice(6, 8)}-${tempDate.slice(0, 4)}`
                        return temp;
                    });
                    stateDaily.reverse();
                    setAllDays([stateDaily]);

                    if (Object.keys(response).length === 0) {
                        nytData = { zipCd: "Empty" };
                    }
                    else {
                        nytData = response;
                        const { counties } = response;

                        county_seriesNames = counties.reduce((accumulator, current) => {
                            return [...accumulator, { name: current.countyName }]
                        }, []);

                        county_series =
                            counties.reduce((accumulator, current) => {
                                return [...accumulator, current.historicData.sort((a, b) => a.date.localeCompare(b.date)).map(obj => {
                                    var temp = Object.assign({}, obj);
                                    temp.date = `${obj.date.slice(5)}-${obj.date.slice(0, 4)}`
                                    return temp;
                                })];
                            }, []);
                    }

                    let createdItem = {
                        id: zipcodes[0].zipcode,
                        zipcode: zipcodes[0].zipcode,
                        county_fips: zipcodes[0].county_fips,
                        county_name: zipcodes[0].county_name,
                        state_abbreviation: zipcodes[0].state_abbreviation.toLowerCase(),
                        state: zipcodes[0].state,
                        latitude: zipcodes[0].latitude,
                        longitude: zipcodes[0].longitude,
                        state_info: responseAllStatesInfo.find(({ state }) => state === zipcodes[0].state_abbreviation),
                        default_city: zipcodes[0].default_city,
                        markers: markers,
                        nytData: nytData,
                        county_seriesNames: county_seriesNames,
                        county_series: county_series
                    }
                    setItemKeysCount(Object.keys(createdItem).length);
                    setPageItem({ ...createdItem });
                    setStateAbbr(zipcodes[0].state_abbreviation.toLowerCase())
                    setPageZipCode(zipcodes[0].zipcode)
                }
            } catch (error) {
                console.error(error);
            }
        };

        if (itemKeysCount === 0 || (pageZipCode !== zipcode)) {
            fetchData();
        }
    }, [itemKeysCount, zipcode, pageZipCode]);

    useEffect(() => {
        const fetchData = async () => {
            const responseAllStateDaily = await covidTracking.getHistoricStateData(stateAbbr);
            setAllStateDaily(responseAllStateDaily);
            setStateCurrent(responseAllStateDaily[0]);
            let newDate = new Date(responseAllStateDaily[0].lastUpdateEt || responseAllStateDaily[0].lastModified || responseAllStateDaily[0].datechecked)
            setLastUpdateEt(newDate.toLocaleString());
            let stateDaily = responseAllStateDaily.map(obj => {
                var temp = Object.assign({}, obj);
                var tempDate = obj.date.toString();
                temp.date = `${tempDate.slice(4, 6)}-${tempDate.slice(6, 8)}-${tempDate.slice(0, 4)}`
                return temp;
            });
            stateDaily.reverse();
            setAllDays([stateDaily]);
        }
        if (stateAbbr && !allStateDaily) {
            fetchData();
        }
    }, [stateAbbr, allStateDaily]);

    return (
        <>
            <Helmet>
                <meta charSet="utf-8" />
                <title>Detailed Covid-19 Data for {zipcode}</title>
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
                        {!isValid &&
                            <h2 style={{ marginTop: "40px", textAlign: "center" }}><span><a className="btn btn-primary btn-lg" href="/zipcodelist" role="button">Enter zip codes &raquo;</a></span></h2>
                        }
                        {((!stateAbbr && isValid) || pageItem.zipcode !== zipcode) &&
                            <h2 className="loading">Loading<span>.</span><span>.</span><span>.</span></h2>
                        }
                        {(stateAbbr && pageItem.zipcode === zipcode) &&
                            <>
                                <h1 style={{ marginTop: "20px", textAlign: "right" }}>{pageItem.default_city}, {stateAbbr.toUpperCase()} {zipcode}</h1>
                                <h3 className="pb-3 mb-4 font-italic border-bottom">Local Covid-19 Information</h3>
                                <div className="row featurette" style={{ marginBottom: "20px" }}>
                                    <div className="album py-5 bg-light" style={{ width: "100%" }}>
                                        <div className="container">
                                            <div className="row">
                                                {pageItem.nytData.zipCd === "Empty" &&
                                                    <>
                                                        <div className="col-lg-4" style={{ padding: "0 12px 24px 12px" }}>
                                                            <div className="card mb-4 box-shadow">
                                                                <img className="third-slide card-img-top"
                                                                    src="data:image/gif;base64,R0lGODlhAQABAIAAAHd3dwAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw=="
                                                                    alt="No county data available" style={{ height: "337px" }} />
                                                                <div className="card-body">
                                                                    <h5 style={{ textAlign: "center" }}>No county data available</h5>
                                                                    <p>Source: <strong><em>The New York Times</em></strong> via <a href="https://anypoint.mulesoft.com/exchange/portals/mulesoft-2778/5a0bd415-9488-4e33-88d6-ba31cbef5957/contact-tracing-exp-api/">COVID-19 Data Tracking API</a></p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-lg-4" style={{ padding: "0 12px 24px 12px" }}>
                                                            <div className="card mb-4 box-shadow">
                                                                <img className="third-slide card-img-top"
                                                                    src="data:image/gif;base64,R0lGODlhAQABAIAAAHd3dwAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw=="
                                                                    alt="No county data available" style={{ height: "337px" }} />
                                                                <div className="card-body">
                                                                    <h5 style={{ textAlign: "center" }}>No county data available</h5>
                                                                    <p>Source: <strong><em>The New York Times</em></strong> via <a href="https://anypoint.mulesoft.com/exchange/portals/mulesoft-2778/5a0bd415-9488-4e33-88d6-ba31cbef5957/contact-tracing-exp-api/">COVID-19 Data Tracking API</a></p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </>
                                                }
                                                {(pageItem.nytData.zipCd !== undefined && pageItem.nytData.zipCd !== "Empty") &&
                                                    <>
                                                        <div className="col-lg-4">
                                                            <div className="card mb-4 box-shadow">
                                                                <Chart className="card-img-top" series={pageItem.county_series} seriesNames={pageItem.county_seriesNames} xValue="date" yValue="positiveCt" />
                                                                <div className="card-body">
                                                                    <h5 style={{ textAlign: "center" }}>Covid-19 Positives</h5>
                                                                    <p>Source: <strong><em>The New York Times</em></strong> via <a href="https://anypoint.mulesoft.com/exchange/portals/mulesoft-2778/5a0bd415-9488-4e33-88d6-ba31cbef5957/contact-tracing-exp-api/">COVID-19 Data Tracking API</a></p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-lg-4">
                                                            <div className="card mb-4 box-shadow">
                                                                <Chart className="card-img-top" series={pageItem.county_series} seriesNames={pageItem.county_seriesNames} xValue="date" yValue="deathCt" />
                                                                <div className="card-body">
                                                                    <h5 style={{ textAlign: "center" }}>Covid-19 Deaths</h5>
                                                                    <p>Source: <strong><em>The New York Times</em></strong> via <a href="https://anypoint.mulesoft.com/exchange/portals/mulesoft-2778/5a0bd415-9488-4e33-88d6-ba31cbef5957/contact-tracing-exp-api/">COVID-19 Data Tracking API</a></p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </>
                                                }
                                                <div className="col-lg-4">
                                                    <div className="card mb-4 box-shadow">
                                                        <div className="card-img-top">
                                                            <LeafletMap
                                                                position={[pageItem.latitude, pageItem.longitude]}
                                                                zoom={8}
                                                                markers={pageItem.markers}
                                                            />
                                                        </div>
                                                        <div className="card-body">
                                                            <p>Source: <a href="https://developer.here.com/blog/finding-covid-19-testing-sites">HERE Geocoding and Search API</a></p>
                                                            <p data-toggle="collapse" data-target="#divLocations"><FontAwesomeIcon fixedWidth className="bootstrap-primary" icon={faInfoCircle} aria-label="show list of Covid-19 locations" /> Covid-19 Testing Locations</p>
                                                            <div className="accordian-body collapse" id="divLocations">
                                                                <ul className="list-group list-group-flush">
                                                                    {pageItem.markers.length === 0 && <li className="list-group-item"><strong>No locations found.</strong></li>}
                                                                    {pageItem.markers.length > 0 && pageItem.markers.map((location, index) => <TestLocation datapoint={location} key={index} />)}
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <h3 className="pb-3 mb-4 font-italic border-bottom">
                                    <div className="row">
                                        <div className="col-md-6">
                                            State Covid-19 Information
                                        </div>
                                        <div className="col-md-6">
                                            <ul className="list-group list-group-horizontal" style={{ fontSize: "16px", float: "right" }}>
                                                <li className="list-group-item"><a href={pageItem.state_info.covid19Site}>Covid-19 Site</a></li>
                                                <li className="list-group-item"><a href={pageItem.state_info.covid19SiteSecondary}>Covid-19 Secondary Site</a></li>
                                                {pageItem.state_info.twitter.startsWith('@') && <li className="list-group-item"><a href={`https://twitter.com/${pageItem.state_info.twitter.slice(1)}`}><FontAwesomeIcon icon={faTwitter} aria-label="go to twitter" /></a></li>}
                                            </ul>
                                        </div>
                                    </div>
                                </h3>
                                <div className="row featurette" style={{ marginBottom: "20px" }}>
                                    <div className="album py-5 bg-light" style={{ width: "100%" }}>
                                        <div className="container">
                                            <div className="row">
                                                {allDays.length === 0 &&
                                                    <>
                                                        <div className="col-lg-4" style={{ padding: "0 12px 24px 12px" }}>
                                                            <div className="card mb-4 box-shadow">
                                                                <img className="third-slide card-img-top"
                                                                    src="data:image/gif;base64,R0lGODlhAQABAIAAAHd3dwAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw=="
                                                                    alt="No county data available" style={{ height: "337px" }} />
                                                                <div className="card-body">
                                                                    <h5 style={{ textAlign: "center" }}>No state data available</h5>
                                                                    <p>Source: <a href="https://covidtracking.com/">The COVID Tracking Project</a></p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-lg-4" style={{ padding: "0 12px 24px 12px" }}>
                                                            <div className="card mb-4 box-shadow">
                                                                <img className="third-slide card-img-top"
                                                                    src="data:image/gif;base64,R0lGODlhAQABAIAAAHd3dwAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw=="
                                                                    alt="No county data available" style={{ height: "337px" }} />
                                                                <div className="card-body">
                                                                    <h5 style={{ textAlign: "center" }}>No state data available</h5>
                                                                    <p>Source: <a href="https://covidtracking.com/">The COVID Tracking Project</a></p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </>
                                                }
                                                {(allDays.length > 0) &&
                                                    <>
                                                        <div className="col-lg-4">
                                                            <div className="card mb-4 box-shadow">
                                                                <Chart className="card-img-top" series={allDays} seriesNames={[{
                                                                    "name": `Positives`
                                                                }]} xValue="date" yValue="positive" />
                                                                <div className="card-body">
                                                                    <h5 style={{ textAlign: "center" }}>{pageItem.state} Covid-19 Positives</h5>
                                                                    <p>Source: <a href="https://covidtracking.com/">The COVID Tracking Project</a></p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="col-lg-4">
                                                            <div className="card mb-4 box-shadow">
                                                                <Chart className="card-img-top" series={allDays} seriesNames={[{
                                                                    "name": `Deaths`
                                                                }]} xValue="date" yValue="death" />
                                                                <div className="card-body">
                                                                    <h5 style={{ textAlign: "center" }}>{pageItem.state} Covid-19 Deaths</h5>
                                                                    <p>Source: <a href="https://covidtracking.com/">The COVID Tracking Project</a></p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </>
                                                }
                                                <div className="col-lg-4">
                                                    {(stateCurrent && Object.keys(stateCurrent).length !== 0) &&
                                                        <>
                                                            <div className="row">
                                                                <div className="col-12">
                                                                    <h4>Current {pageItem.state} Numbers<span style={{ float: "right", fontSize: ".8rem" }}>Last update: {lastUpdateEt}</span></h4>
                                                                    <div className="table-responsive">
                                                                        <Table currentValues={stateCurrent} caption={`The most recent COVID data for ${pageItem.state}. The current value may be different than today.`} />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </>
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </>
                        }
                    </main>
                </div>
            </Layout >
        </>
    )
}