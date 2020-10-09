import React from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInfoCircle, faCaretUp, faCaretDown } from '@fortawesome/free-solid-svg-icons'

function Table(props) {
    const { currentUSValues } = props;
    return (
        <table className="table table-sm" data={currentUSValues}>
            <caption>
                <p>The most recent COVID data for the US. The most recent data may not be from today.</p>
                <p>Source: <a href="https://covidtracking.com/data/api">The COVID Tracking Project</a></p>
            </caption>
            <thead>
                <tr className="table-primary">
                    <th scope="col">Parameter</th>
                    <th scope="col">Value</th>
                    <th scope="col">Change</th>
                </tr>
            </thead>
            <tbody>
                <tr data-toggle="collapse" data-target="#trPositives">
                    <td><FontAwesomeIcon className="bootstrap-primary" fixedWidth icon={faInfoCircle} aria-label="information on Parameter Positives" /> Positives</td>
                    <td>{currentUSValues.positive && currentUSValues.positive.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                    <td><FontAwesomeIcon className={currentUSValues.positiveIncrease > 0 ? "increase" : "decrease"} icon={currentUSValues.positiveIncrease > 0 ? faCaretUp : faCaretDown} aria-label="decrease or increase positive cases" /> {currentUSValues.positiveIncrease && currentUSValues.positiveIncrease.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                </tr>
                <tr >
                    <td colspan="99999" className="hiddenRow">
                        <div className="accordian-body collapse" id="trPositives">
                            <div>
                                <p><strong>Positives: Cases (confirmed plus probable)</strong></p>
                                <p>Total number of <strong>confirmed plus probable cases</strong> of COVID-19 reported by the state or territory, ideally per the <a href="https://wwwn.cdc.gov/nndss/conditions/coronavirus-disease-2019-covid-19/case-definition/2020/08/05/">August 5, 2020 CSTE case definition</a>. Some states are following the older <a href="https://wwwn.cdc.gov/nndss/conditions/coronavirus-disease-2019-covid-19/case-definition/2020/">April 5th, 2020 CSTE case definition</a> or using their own custom definitions. Not all states and territories report probable cases. If a state is not reporting probable cases, this field will just represent confirmed cases. </p>
                            </div>
                            <div>
                                <p><strong>Change: New cases</strong></p>
                                <div><p>The daily increase in <em>Positives</em>, which measures <strong>Cases (confirmed plus probable)</strong> calculated based on the previous day’s value. </p></div>
                            </div>
                        </div>
                    </td>
                </tr>
                <tr data-toggle="collapse" data-target="#trHospitalizations" >
                    <td><FontAwesomeIcon className="bootstrap-primary" fixedWidth icon={faInfoCircle} aria-label="information on Parameter Hospitalizations" /> Hospitalizations</td>
                    <td>{currentUSValues.hospitalizedCumulative && currentUSValues.hospitalizedCumulative.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                    <td><FontAwesomeIcon className={currentUSValues.hospitalizedIncrease > 0 ? "increase" : "decrease"} icon={currentUSValues.hospitalizedIncrease > 0 ? faCaretUp : faCaretDown} aria-label="decrease or increase hospitalizations" /> {currentUSValues.hospitalizedIncrease && currentUSValues.hospitalizedIncrease.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                </tr>
                <tr>
                    <td colspan="99999" className="hiddenRow">
                        <div className="accordian-body collapse" id="trHospitalizations">
                            <div>
                                <p><strong>Hospitalizations: Cumulative hospitalized/Ever hospitalized</strong></p>
                                <p>Total number of individuals who have <strong>ever been hospitalized with COVID-19</strong>. Definitions vary by state / territory. Where possible, we report hospitalizations with confirmed or probable COVID-19 cases per the expanded <a href="https://cdn.ymaws.com/www.cste.org/resource/resmgr/2020ps/Interim-20-ID-01_COVID-19.pdf">CSTE case definition</a> of April 5th, 2020 <a href="https://wwwn.cdc.gov/nndss/conditions/coronavirus-disease-2019-covid-19/case-definition/2020/">approved by the CDC</a>.</p>
                            </div>
                            <div>
                                <p><strong>Change: New total hospitalizations</strong></p>
                                <p>Daily increase in <em>Hospitalizations</em>, calculated from the previous day’s value.</p>
                            </div>
                        </div>
                    </td>
                </tr>
                <tr fixedWidth data-toggle="collapse" data-target="#trDeaths" >
                    <td><FontAwesomeIcon className="bootstrap-primary" icon={faInfoCircle} aria-label="information on Parameter Deaths" /> Deaths</td>
                    <td>{currentUSValues.death && currentUSValues.death.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                    <td><FontAwesomeIcon className={currentUSValues.deathIncrease > 0 ? "increase" : "decrease"} icon={currentUSValues.deathIncrease > 0 ? faCaretUp : faCaretDown} aria-label="decrease or increase deaths" /> {currentUSValues.deathIncrease && currentUSValues.deathIncrease.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                </tr>
                <tr>
                    <td colspan="99999" className="hiddenRow">
                        <div className="accordian-body collapse" id="trDeaths">
                            <div>
                                <p><strong>Deaths: Deaths (confirmed and probable)</strong></p>
                                <p>Total <strong>fatalities with confirmed OR probable COVID-19 case diagnosis</strong> (per the expanded <a href="https://cdn.ymaws.com/www.cste.org/resource/resmgr/2020ps/Interim-20-ID-01_COVID-19.pdf">CSTE case definition</a> of April 5th, 2020 <a href="https://wwwn.cdc.gov/nndss/conditions/coronavirus-disease-2019-covid-19/case-definition/2020/">approved by the CDC</a>). In states where the information is available, it only tracks fatalities with confirmed OR probable COVID-19 case diagnosis where on the death certificate, <strong>COVID-19 is listed as an underlying cause of death</strong> according to <a href="https://www.who.int/classifications/icd/Guidelines_Cause_of_Death_COVID-19.pdf?ua=1">WHO guidelines</a>.</p>
                            </div>
                            <div>
                                <p><strong>Change: New deaths</strong></p>
                                <p>Daily increase in <em>Deaths</em>, calculated from the previous day’s value.</p>
                            </div>
                        </div>
                    </td>
                </tr>
                <tr fixedWidth data-toggle="collapse" data-target="#trRecovered">
                    <td><FontAwesomeIcon className="bootstrap-primary" icon={faInfoCircle} aria-label="information on Parameter Recovered" /> Recovered</td>
                    <td>{currentUSValues.recovered && currentUSValues.recovered.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</td>
                    <td>Not Applicable</td>
                </tr>
                <tr>
                    <td colspan="99999" className="hiddenRow">
                        <div className="accordian-body collapse" id="trRecovered">
                            <div>
                                <p><strong>Recovered</strong></p>
                                <div><p>Total number of <strong>people that are identified as recovered from COVID-19</strong>. States provide very disparate definitions on what constitutes a “recovered” COVID-19 case. Types of “recovered” cases include those who are discharged from hospitals, released from isolation after meeting CDC guidance on <a href="https://www.cdc.gov/coronavirus/2019-ncov/hcp/disposition-in-home-patients.html">symptoms cessation</a>, or those who have not been identified as fatalities after a number of days (30 or more) post disease onset. Specifics vary for each state or territory.</p></div>
                            </div>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    )
}

export default Table