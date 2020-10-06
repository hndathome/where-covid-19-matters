import React from "react"
import { navigate } from 'gatsby'
import { VictoryLine, VictoryChart, VictoryTheme, VictoryAxis } from "victory";

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
    const { item } = props;

    const data = [
        { date: "2019-12-10", volume: 16197 },
        { date: "2019-12-9", volume: 32010 },
        { date: "2019-12-8", volume: 26518 },
        { date: "2019-12-7", volume: 18606 },
        { date: "2019-12-6", volume: 16795 },
        { date: "2019-12-5", volume: 28607 },
        { date: "2019-12-4", volume: 23621 }
    ];

    const Chart = () => {
        return (
            <VictoryChart theme={VictoryTheme.material} domainPadding={0} padding={55}>
                <VictoryAxis
                    fixLabelOverlap
                    style={{ tickLabels: { padding: 16, fontSize: 8 } }}
                />
                <VictoryAxis dependentAxis />
                <VictoryLine data={data} x="date" y="volume" />
            </VictoryChart>
        );
    };

    return (
        <div className="col-md-4">
            <div className="card mb-4 shadow-sm">
                <div width="100%" height="225" className="bd-placeholder-img card-img-top">
                    <Chart />
                </div>
                <div className="card-body">
                    <p className="card-text">{item.zipcode}</p>
                    <div className="d-flex justify-content-between align-items-center">
                        <div className="btn-group">
                            <button className="btn btn-sm btn-outline-secondary" onClick={event => {
                                event.preventDefault()
                                navigate(
                                    `/details/${item.zipcode}`,
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