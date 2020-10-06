import React, { useEffect, useState } from "react";
import { navigate } from 'gatsby';
import { VictoryLine, VictoryChart, VictoryTheme, VictoryAxis } from "victory";
import axios from 'axios';

//state data, below desired keys
//notes
//covid19Site
//covid19SiteSecondary
//twitter
//`https://api.covidtracking.com/v1/states/ar/info.json`

//covid-19 testing locations
//`https://discover.search.hereapi.com/v1/discover?apikey=${process.env.GATSBY_HERE_API_KEY}&q=Covid&at=36.03,-94.15&limit=3`


//`https://api.covidtracking.com/v1/states/ar/current.json`

function SummaryCard(props) {
    const { item, item: { zipcode } } = props;
    const nytUrl = `https://cors-anywhere.herokuapp.com/https://localcoviddata.com/covid19/v1/cases/newYorkTimes?zipCode=${zipcode}&daysInPast=7`


    const [nytData, setNYTData] = useState({});

    const exampleData = [
        { date: "2019-12-10", volume: 16197 },
        { date: "2019-12-9", volume: 32010 },
        { date: "2019-12-8", volume: 26518 },
        { date: "2019-12-7", volume: 18606 },
        { date: "2019-12-6", volume: 16795 },
        { date: "2019-12-5", volume: 28607 },
        { date: "2019-12-4", volume: 23621 }
    ];

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get(nytUrl, { headers: { 'Accept': 'application/json' } });
            setNYTData(response.data);
        };
        fetchData();
    }, [nytUrl]);

    const Chart = (props) => {
        const { data } = props;

        if (data.zipCd === undefined) {
            return (<></>);
        }

        const { counties } = data;
        const countyNames = counties.reduce((accumulator, current) => {
            return [...accumulator, current.countyName]
        }, []);
        console.log(countyNames);

        return (
            <VictoryChart theme={VictoryTheme.material} domainPadding={0} padding={55}>
                <VictoryAxis
                    fixLabelOverlap
                    style={{ tickLabels: { padding: 16, fontSize: 8 } }}
                />
                <VictoryAxis dependentAxis />
                <VictoryLine data={exampleData} x="date" y="volume" />
            </VictoryChart>
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
                    <div className="d-flex justify-content-between align-items-center">
                        <div className="btn-group">
                            <button className="btn btn-sm btn-outline-secondary" onClick={event => {
                                event.preventDefault()
                                navigate(
                                    `/details/${zipcode}`,
                                    {
                                        state: { item },
                                    }
                                )
                            }}>View details</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default SummaryCard