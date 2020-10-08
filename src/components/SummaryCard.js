import React, { useEffect, useState } from "react";
import { navigate } from 'gatsby';
import axios from 'axios';
import { VictoryLine, VictoryChart, VictoryTheme, VictoryAxis, VictoryLegend } from "victory";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTwitter } from '@fortawesome/free-brands-svg-icons'
import LeafletMap from "../components/LeafletMap"

function SummaryCard(props) {
    const { item, item: { zipcode, state_info, state: geoState } } = props;
    const { covid19Site, covid19SiteSecondary, twitter } = state_info;

    let atLat = item.latitude.toString();
    let atLong = item.longitude.toString();
    atLat = (atLat.startsWith("-")) ? atLat.substring(0, 5) : atLat.substring(0, 4);
    atLong = (atLong.startsWith("-")) ? atLong.substring(0, 5) : atLong.substring(0, 4);
    const gps = `${atLat},${atLong}`
    const hereapiUrl = `https://discover.search.hereapi.com/v1/discover?apikey=${process.env.GATSBY_HERE_API_KEY}&q=Covid&at=${gps}&limit=3`
    const [hereData, setHereData] = useState({});
    const [markers, setMarkers] = useState([]);

    const nytUrl = `https://cors-anywhere.herokuapp.com/https://localcoviddata.com/covid19/v1/cases/newYorkTimes?zipCode=${zipcode}&daysInPast=7`
    const [nytData, setNYTData] = useState({});
    const [lastUpdated, setLastUpdated] = useState('');

    const [keyMap, setKeyMap] = useState(Math.random());

    useEffect(() => {
        const listItemMap = document.getElementById(`listItemMap${zipcode}`);

        const isActive = () => {
            if (listItemMap !== null && listItemMap.classList.contains('active')) {
                setKeyMap(Math.random())
            }
        }

        if (listItemMap !== null) {
            listItemMap.addEventListener('click', () => isActive());
            setKeyMap(Math.random());
        }
    }, [zipcode])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(hereapiUrl, { headers: { 'Accept': 'application/json' } });
                const { items } = response.data;
                const dataMarkers = items.reduce((accumulator, current) => {
                    return [...accumulator, { markerText: current.title.slice(23), position: [current.position.lat, current.position.lng] }]
                }, []);
                setMarkers(dataMarkers);
                setHereData(response.hereData);
            } catch (error) {
                console.error(error);
            }
        }

        fetchData();
    }, [hereapiUrl])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(nytUrl, { headers: { 'Accept': 'application/json' } });
                let respData;

                if (Object.keys(response.data).length === 0) {
                    respData = { zipCd: "Empty" };
                }
                else {
                    respData = response.data;
                    const myDate = respData.counties[0].historicData[0].date
                    setLastUpdated(`${myDate.slice(5)}-${myDate.slice(0, 4)}`);
                }
                //setUpdatedItem({ ...item, county_info: respData });
                setNYTData(respData);
            } catch (error) {
                //setUpdatedItem({ ...item, county_info: { zipCd: "Empty" } });
                setNYTData({ zipCd: "Empty" });
                console.error(error);
            }
        };
        fetchData();
    }, [nytUrl]);

    const chartPalette = ["#264653", "#2a9d8f", "#e9c46a", "#f4a261", "#e76f51"]
    const Chart = (props) => {
        const { data } = props;
        if (data.zipCd === undefined) {
            return (
                <h2 className="loading" style={{ textAlign: "center" }}>Loading<span>.</span><span>.</span><span>.</span></h2>
            );
        }

        if (data.zipCd === "Empty") {
            return (
                <h5 style={{ textAlign: "center" }}>No county data available</h5>
            );
        }

        const { counties } = data;
        const countyNames = counties.reduce((accumulator, current) => {
            return [...accumulator, { name: current.countyName }]
        }, []);

        const series = counties.reduce((accumulator, current) => {
            return [...accumulator, current.historicData.sort((a, b) => a.date.localeCompare(b.date))]
        }, []);

        return (
            <VictoryChart theme={VictoryTheme.material} domainPadding={1} padding={55}>
                <VictoryAxis
                    fixLabelOverlap
                    style={{ tickLabels: { padding: 16, fontSize: 8 } }}
                />
                <VictoryAxis dependentAxis />
                {series.length > 0 && series.map((dataset, index) => <VictoryLine data={dataset} x="date" y="positiveCt" key={index} style={{
                    data: { stroke: chartPalette[index], strokeWidth: 3 },
                    parent: { border: "1px solid #ccc" }
                }} />)}
                <VictoryLegend x={5} y={5}
                    orientation="horizontal"
                    gutter={10}
                    colorScale={chartPalette}
                    data={countyNames}
                />
            </VictoryChart>
        );
    };

    return (
        <div className="col-md-4">
            <div className="card mb-4 shadow-sm">
                <div width="100%" height="225" className="bd-placeholder-img card-img-top">
                    {/*  */}
                    <div id={`myCarousel${zipcode}`} className="carousel slide" data-ride="carousel" style={{ marginBottom: 0 }}>
                        <ol className="carousel-indicators">
                            <li style={{ backgroundColor: "#007bff" }} data-target={`#myCarousel${zipcode}`} data-slide-to="0" className="active"></li>
                            <li id={`listItemMap${zipcode}`} style={{ backgroundColor: "#007bff" }} data-target={`#myCarousel${zipcode}`} data-slide-to="1" ></li>
                            <li style={{ backgroundColor: "#007bff" }} data-target={`#myCarousel${zipcode}`} data-slide-to="2"></li>
                        </ol>
                        <div className="carousel-inner">
                            <div className="carousel-item active">
                                <Chart data={nytData} />
                                {/*<div className="container">
                                    <div className="carousel-caption text-left">
                                        <h1>Example headline.</h1>
                                        <p>Cras justo odio, dapibus ac facilisis in, egestas eget quam. Donec id elit non mi porta gravida at eget metus. Nullam id dolor id nibh ultricies vehicula ut id elit.</p>
                                        <p><a className="btn btn-lg btn-primary" href="#" role="button">Sign up today</a></p>
                                    </div> 
                                </div>*/}
                            </div>
                            <div className="carousel-item">
                                {typeof window !== 'undefined' &&
                                    <LeafletMap
                                        position={[item.latitude, item.longitude]}
                                        zoom={9}
                                        markers={markers}
                                        key={keyMap}
                                    />
                                }
                                <p style={{ textAlign: "center", marginTop: "1rem" }}>Covid-19 Testing Locations</p>
                                {/* <div className="container">
                                    <div className="carousel-caption text-center">
                                        <p>Covid-19 Testing Locations</p>
                                    </div>
                                </div> */}
                            </div>

                            <div className="carousel-item">
                                <img className="third-slide" src="data:image/gif;base64,R0lGODlhAQABAIAAAHd3dwAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==" alt="Third slide" />
                                <div className="container">
                                    <div className="carousel-caption">
                                        <p>{geoState} Department of Health</p>
                                        <ul>
                                            <li><a className="covid19-links" href={covid19Site}>Covid19 Site</a></li>
                                            <li><a className="covid19-links" href={covid19SiteSecondary}>Covid19 Secondary Site</a></li>
                                            {twitter.startsWith('@') && <li><a className="covid19-links" href={`https://twitter.com/${twitter.slice(1)}`}><FontAwesomeIcon icon={faTwitter} aria-label="go to twitter" /></a></li>}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="card-body">
                    <h5 className="card-text">{zipcode}</h5>
                    <div className="d-flex justify-content-between align-items-center">
                        <div className="btn-group">
                            <button className="btn btn-sm btn-secondary" onClick={event => {
                                event.preventDefault();
                                const updatedItem = { ...item, county_info: nytData, markers: markers, hereData: hereData };
                                navigate(
                                    `/details/${zipcode}`,
                                    {
                                        state: { updatedItem: updatedItem },
                                    }
                                )
                            }}>View details</button>
                        </div>
                        <small className="text-muted">{lastUpdated}</small>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default SummaryCard