import React from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretUp, faCaretDown } from '@fortawesome/free-solid-svg-icons'

function Table(props) {
    const { currentUSValues } = props;
    return (
        <table className="table table-striped table-sm" data={currentUSValues}>
            <thead>
                <tr>
                    <th scope="col">Parameter</th>
                    <th scope="col">Value</th>
                    <th scope="col">Change</th>
                </tr>
            </thead>
            <tbody>
                <tr><td>Positives</td><td>{currentUSValues.positive && currentUSValues.positive.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td><td><FontAwesomeIcon className={currentUSValues.positiveIncrease > 0 ? "increase" : "decrease"} icon={currentUSValues.positiveIncrease > 0 ? faCaretUp : faCaretDown} aria-label="decrease or increase positive cases" /> {currentUSValues.positiveIncrease && currentUSValues.positiveIncrease.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td></tr>
                <tr><td>Hospitalizations</td><td>{currentUSValues.hospitalizedCumulative && currentUSValues.hospitalizedCumulative.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td><td><FontAwesomeIcon className={currentUSValues.hospitalizedIncrease > 0 ? "increase" : "decrease"} icon={currentUSValues.hospitalizedIncrease > 0 ? faCaretUp : faCaretDown} aria-label="decrease or increase hospitalizations" /> {currentUSValues.hospitalizedIncrease && currentUSValues.hospitalizedIncrease.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td></tr>
                <tr><td>Deaths</td><td>{currentUSValues.death && currentUSValues.death.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td><td><FontAwesomeIcon className={currentUSValues.deathIncrease > 0 ? "increase" : "decrease"} icon={currentUSValues.deathIncrease > 0 ? faCaretUp : faCaretDown} aria-label="decrease or increase deaths" /> {currentUSValues.deathIncrease && currentUSValues.deathIncrease.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td></tr>
            </tbody>
        </table>
    )
}

export default Table