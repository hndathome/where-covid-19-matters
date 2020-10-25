import React, { useEffect, useState } from "react";
import { navigate } from 'gatsby';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTwitter } from '@fortawesome/free-brands-svg-icons'
import { Carousel } from 'react-bootstrap';
import LeafletMap from "../components/LeafletMap"
import Chart from "../components/Chart"
import hereAPI from "../here.api"
import localCovid from "../localcoviddata.api"

function SummaryCard(props) {
    const { item, item: { zipcode, state_info, state: geoState, default_city, state_abbreviation } } = props;
    const { covid19Site, covid19SiteSecondary, twitter } = state_info;

    const [markers, setMarkers] = useState([]);
    const [nytData, setNYTData] = useState({});
    const [lastUpdated, setLastUpdated] = useState('');
    const [seriesNames, setSeriesNames] = useState([]);
    const [series, setSeries] = useState([]);
    const [keyMap, setKeyMap] = useState(Math.random());

    useEffect(() => {
        const fetchData = async () => {
            try {
                let atLat = item.latitude.toString();
                let atLong = item.longitude.toString();
                const gps = `${atLat},${atLong}`
                const dataMarkers = await hereAPI.getCovid19TestingLocations(gps);
                setMarkers(dataMarkers);
            } catch (error) {
                console.error(error);
            }
        }

        fetchData();
    }, [item.latitude, item.longitude])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await localCovid.getLocalCovidData(zipcode);
                let respData;

                if (Object.keys(response).length === 0) {
                    respData = { zipCd: "Empty" };
                }
                else {
                    respData = response;

                    const myDate = respData.counties[0].historicData[0].date;
                    setLastUpdated(`${myDate.slice(5)}-${myDate.slice(0, 4)}`);

                    const { counties } = response;
                    setSeriesNames(counties.reduce((accumulator, current) => {
                        return [...accumulator, { name: current.countyName }]
                    }, []))

                    setSeries(counties.reduce((accumulator, current) => {
                        return [...accumulator, current.historicData.sort((a, b) => a.date.localeCompare(b.date)).map(obj => {
                            var temp = Object.assign({}, obj);
                            temp.date = `${obj.date.slice(5)}-${obj.date.slice(0, 4)}`
                            return temp;
                        })];
                    }, []));
                }
                setNYTData(respData);
            } catch (error) {
                setNYTData({ zipCd: "Empty" });
                console.error(error);
            }
        };
        fetchData();
    }, [zipcode]);

    const handleSelect = (selectedIndex, e) => {
        if (selectedIndex === 1) {
            setKeyMap(Math.random());
        }
    };

    return (
        <div className="col-lg-4">
            <div className="card mb-4 shadow-sm">
                <div width="100%" height="225" className="bd-placeholder-img card-img-top">
                    <Carousel interval={null} onSelect={handleSelect} id={`myCarousel${zipcode}`} className="carousel slide">
                        <Carousel.Item className="carousel-item">
                            {nytData.zipCd === undefined &&
                                <h2 className="loading" style={{ textAlign: "center" }}>Loading<span>.</span><span>.</span><span>.</span></h2>
                            }
                            {nytData.zipCd === "Empty" &&
                                <>
                                    <img class="third-slide"
                                        src="data:image/gif;base64,R0lGODlhAQABAIAAAHd3dwAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw=="
                                        alt="No county data available" />
                                    <div class="carousel-container">
                                        <div class="my-carousel-caption">
                                            <p style={{ textAlign: "center" }}>No county data available</p>
                                        </div>
                                    </div>
                                </>
                            }
                            {(nytData.zipCd !== undefined && nytData.zipCd !== "Empty") &&
                                <>
                                    <Chart series={series} seriesNames={seriesNames} xValue="date" yValue="positiveCt" />
                                    <div className="container">
                                        <Carousel.Caption className="bottom-caption-title">
                                            <p style={{ color: "black", textAlign: "center" }}>Covid-19 Positive Count</p>
                                        </Carousel.Caption>
                                    </div>
                                </>
                            }
                        </Carousel.Item>
                        <Carousel.Item className="carousel-item">
                            {typeof window !== 'undefined' &&
                                <LeafletMap
                                    position={[item.latitude, item.longitude]}
                                    zoom={8}
                                    markers={markers}
                                    key={keyMap}
                                />
                            }
                            <div className="container" style={{ width: "100%" }}>
                                <Carousel.Caption className="bottom-caption-title" style={{ width: "100%" }}>
                                    <p style={{ color: "black" }}>{`Covid-19 Testing Locations: ${markers.length}`}</p>
                                </Carousel.Caption>
                            </div>
                        </Carousel.Item>
                        <Carousel.Item className="carousel-item">
                            <>
                                <img class="third-slide"
                                    src="data:image/gif;base64,R0lGODlhAQABAIAAAHd3dwAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw=="
                                    alt="background for state health department links" />
                                <div class="carousel-container">
                                    <div class="my-carousel-caption">
                                        <p>{geoState} Department of Health</p>
                                        <ul>
                                            <li><a className="covid19-links" href={covid19Site}>Covid-19 Site</a></li>
                                            <li><a className="covid19-links" href={covid19SiteSecondary}>Covid-19 Secondary Site</a></li>
                                            {twitter.startsWith('@') && <li><a className="covid19-links" href={`https://twitter.com/${twitter.slice(1)}`}><FontAwesomeIcon icon={faTwitter} aria-label="go to twitter" /></a></li>}
                                        </ul>
                                    </div>
                                </div>
                            </>
                        </Carousel.Item>
                    </Carousel>
                </div>
                <div className="card-body summary-card-body">
                    <h5 className="card-text">{default_city}, {state_abbreviation.toUpperCase()} {zipcode}</h5>
                    <div className="d-flex justify-content-between align-items-center">
                        {nytData.zipCd !== undefined && <>
                            <div className="btn-group">
                                <button className="btn btn-sm btn-secondary" onClick={event => {
                                    event.preventDefault();
                                    navigate(
                                        `/details/${zipcode}`,
                                        {
                                            state: { updatedItem: { ...item, nytData: nytData, markers: markers, county_series: series, county_seriesNames: seriesNames } },
                                        }
                                    )
                                }}>View details</button>
                            </div>
                            <small className="text-muted">{lastUpdated}</small>
                        </>}
                    </div>
                </div>
            </div>
        </div>
    )
}
export default SummaryCard