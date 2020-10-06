import React from "react"
import { navigate } from 'gatsby'
import { VictoryChart, VictoryLine } from "victory";

function SummaryCard(props) {
    const { item } = props;
    return (
        <div className="col-md-4">
            <div className="card mb-4 shadow-sm">
                <div width="100%" height="225" className="bd-placeholder-img card-img-top">
                    <VictoryChart >
                        <VictoryLine />
                    </VictoryChart>
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
                            }}>get details</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default SummaryCard