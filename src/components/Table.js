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
                <tr>
                    <td title="Cases (confirmed plus probable): Total number of confirmed plus probable cases of COVID-19 reported by the state or territory, ideally per the August 5, 2020 CSTE case definition. Some states are following the older April 5th, 2020 CSTE case definition or using their own custom definitions. Not all states and territories report probable cases. If a state is not reporting probable cases, this field will just represent confirmed cases.">Positives</td>
                    <td>{currentUSValues.positive && currentUSValues.positive.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                    <td title="New cases: The daily increase in parameter Positives, which measures Cases (confirmed plus probable) calculated based on the previous day’s value."><FontAwesomeIcon className={currentUSValues.positiveIncrease > 0 ? "increase" : "decrease"} icon={currentUSValues.positiveIncrease > 0 ? faCaretUp : faCaretDown} aria-label="decrease or increase positive cases" />{currentUSValues.positiveIncrease && currentUSValues.positiveIncrease.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                </tr>
                <tr>
                    <td title="Cumulative hospitalized/Ever hospitalized: Total number of individuals who have ever been hospitalized with COVID-19. Definitions vary by state / territory. Where possible, we report hospitalizations with confirmed or probable COVID-19 cases per the expanded CSTE case definition of April 5th, 2020 approved by the CDC.">Hospitalizations</td>
                    <td>{currentUSValues.hospitalizedCumulative && currentUSValues.hospitalizedCumulative.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                    <td title="New total hospitalizations: Daily increase in parameter Hospitalizations, calculated from the previous day’s value."><FontAwesomeIcon className={currentUSValues.hospitalizedIncrease > 0 ? "increase" : "decrease"} icon={currentUSValues.hospitalizedIncrease > 0 ? faCaretUp : faCaretDown} aria-label="decrease or increase hospitalizations" /> {currentUSValues.hospitalizedIncrease && currentUSValues.hospitalizedIncrease.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                </tr>
                <tr>
                    <td title="Deaths (confirmed and probable): Total fatalities with confirmed OR probable COVID-19 case diagnosis (per the expanded CSTE case definition of April 5th, 2020 approved by the CDC). In states where the information is available, it only tracks fatalities with confirmed OR probable COVID-19 case diagnosis where on the death certificate, COVID-19 is listed as an underlying cause of death according to WHO guidelines.">Deaths</td>
                    <td>{currentUSValues.death && currentUSValues.death.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                    <td title="New deaths: Daily increase in parameter Deaths, calculated from the previous day’s value."><FontAwesomeIcon className={currentUSValues.deathIncrease > 0 ? "increase" : "decrease"} icon={currentUSValues.deathIncrease > 0 ? faCaretUp : faCaretDown} aria-label="decrease or increase deaths" /> {currentUSValues.deathIncrease && currentUSValues.deathIncrease.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                </tr>
            </tbody>
        </table>
    )
}

export default Table