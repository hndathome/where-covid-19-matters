import React from "react"

import { navigate } from 'gatsby'

function SummaryCard(props) {
    const { item } = props;
    return (
        <div className="col-md-4">
            <div className="card mb-4 shadow-sm">
                <img className="bd-placeholder-img card-img-top" width="100%" height="225" focusable="false" src="" alt="" />
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
                            }}>get data</button>
                            {/* <Link type="button" to={`/details/${item.zipcode}`} state={item}>View</Link>
                                                <a href={`/details/${item.zipcode}`} type="button" >View</a> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default SummaryCard