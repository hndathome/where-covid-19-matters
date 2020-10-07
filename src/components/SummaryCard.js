import React, { useEffect, useState } from "react";
import { navigate, Link } from 'gatsby';
import { VictoryLine, VictoryChart, VictoryTheme, VictoryAxis, VictoryLegend } from "victory";
import axios from 'axios';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTwitter } from '@fortawesome/free-brands-svg-icons'

//covid-19 testing locations
//`https://discover.search.hereapi.com/v1/discover?apikey=${process.env.GATSBY_HERE_API_KEY}&q=Covid&at=36.03,-94.15&limit=3`

//`https://api.covidtracking.com/v1/states/ar/current.json`

function SummaryCard(props) {
    const { item, item: { zipcode, state_info, state: geoState }, } = props;
    const { covid19Site, covid19SiteSecondary, twitter } = state_info;

    const nytUrl = `https://cors-anywhere.herokuapp.com/https://localcoviddata.com/covid19/v1/cases/newYorkTimes?zipCode=${zipcode}&daysInPast=7`
    const [nytData, setNYTData] = useState({});
    const [lastUpdated, setLastUpdated] = useState('');

    const chartPalette = ["#264653", "#2a9d8f", "#e9c46a", "#f4a261", "#e76f51"]

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(nytUrl, { headers: { 'Accept': 'application/json' } });
                const respData = Object.keys(response.data).length === 0 ? { zipCd: "Empty" } : response.data;
                setNYTData(respData);
            } catch (error) {
                setNYTData({ zipCd: "Empty" });
                console.error(error);
            }
        };
        fetchData();
    }, [nytUrl]);

    const Chart = (props) => {
        const { data } = props;
        if (data.zipCd === undefined) {
            return (
                <h2 style={{ textAlign: "center" }}>Loading data ...</h2>
            );
        }

        if (data.zipCd === "Empty") {
            return (
                <h2 style={{ textAlign: "center" }}>No data available</h2>
            );
        }

        const { counties } = data;
        const countyNames = counties.reduce((accumulator, current) => {
            return [...accumulator, { name: current.countyName }]
        }, []);

        const series = counties.reduce((accumulator, current) => {
            return [...accumulator, current.historicData]
        }, []);

        return (
            <>
                <VictoryChart theme={VictoryTheme.material} domainPadding={0} padding={55}>
                    <VictoryAxis
                        fixLabelOverlap
                        style={{ tickLabels: { padding: 16, fontSize: 8 } }}
                    />
                    <VictoryAxis dependentAxis />
                    {series.length > 0 && series.map((dataset, index) => <VictoryLine data={dataset.reverse()} x="date" y="positiveCt" key={index} style={{
                        data: { stroke: chartPalette[index] },
                        parent: { border: "1px solid #ccc" }
                    }} />)}
                    <VictoryLegend x={5} y={5}
                        orientation="horizontal"
                        gutter={10}
                        colorScale={chartPalette}
                        data={countyNames}
                    />
                </VictoryChart>
            </>
        );
    };

    return (
        <div className="col-md-4">
            <div className="card mb-4 shadow-sm">
                <div width="100%" height="225" className="bd-placeholder-img card-img-top">
                    <Chart data={nytData} />
                </div>
                <div className="card-body">
                    <p className="card-text">{zipcode}</p>
                    <p>{geoState} Department of Health</p>
                    <ul>
                        <li><a href={covid19Site}>Covid19 Site</a></li>
                        <li><a href={covid19SiteSecondary}>Covid19 Secondary Site</a></li>
                        <li><a href={`https://twitter.com/${twitter.slice(1)}`}><FontAwesomeIcon icon={faTwitter} /> </a></li>
                    </ul>
                    <div className="d-flex justify-content-between align-items-center">
                        <div className="btn-group">
                            <button className="btn btn-sm btn-secondary" onClick={event => {
                                event.preventDefault();
                                navigate(
                                    `/details/${zipcode}`,
                                    {
                                        state: { item },
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