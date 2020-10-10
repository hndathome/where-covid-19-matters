import React from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faMinus, faInfoCircle, faCaretUp, faCaretDown } from '@fortawesome/free-solid-svg-icons'

function Table(props) {
    const { currentValues, caption } = props;
    return (
        <table className="table table-sm" data={currentValues}>
            <caption>
                <p>{caption}</p>
                <p>Source: <a href="https://covidtracking.com/">The COVID Tracking Project</a></p>
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
                    <td><FontAwesomeIcon fixedWidth className="bootstrap-primary" icon={faInfoCircle} aria-label="information on Parameter Positives" /> Positives</td>
                    <td>
                        {currentValues.positive === null && "no data is available"}
                        {currentValues.positive && currentValues.positive.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                    </td>
                    <td style={{ whiteSpace: "nowrap" }}>
                        {currentValues.positiveIncrease !== 0 &&
                            <FontAwesomeIcon fixedWidth className={currentValues.positiveIncrease > 0 ? "increase" : "decrease"} icon={currentValues.positiveIncrease > 0 ? faCaretUp : faCaretDown} aria-label="decrease or increase positive cases" />
                        }
                        {currentValues.positiveIncrease === null && "no data is available"}
                        {currentValues.positiveIncrease && currentValues.positiveIncrease.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                    </td>
                </tr>
                <tr >
                    <td colSpan="99999" className="hiddenRow">
                        <div className="accordian-body collapse" id="trPositives">
                            <div>
                                <p><strong>Cases (confirmed plus probable)</strong></p>
                                <p>Total number of <strong>confirmed plus probable cases</strong> of COVID-19 reported by the state or territory, ideally per the <a href="https://wwwn.cdc.gov/nndss/conditions/coronavirus-disease-2019-covid-19/case-definition/2020/08/05/">August 5, 2020 CSTE case definition</a>. Some states are following the older <a href="https://wwwn.cdc.gov/nndss/conditions/coronavirus-disease-2019-covid-19/case-definition/2020/">April 5th, 2020 CSTE case definition</a> or using their own custom definitions. Not all states and territories report probable cases. If a state is not reporting probable cases, this field will just represent confirmed cases. </p>
                            </div>
                            <div>
                                <p><strong>Change: New cases</strong></p>
                                <div><p>The daily increase in <em>Positives</em>, which measures <strong>Cases (confirmed plus probable)</strong> calculated based on the previous day’s value. </p></div>
                            </div>
                        </div>
                    </td>
                </tr>
                <tr data-toggle="collapse" data-target="#trNegatives">
                    <td><FontAwesomeIcon fixedWidth className="bootstrap-primary" icon={faInfoCircle} aria-label="information on Parameter Negatives" /> Negatives</td>
                    <td>
                        {currentValues.negative === null && "no data is available"}
                        {currentValues.negative && currentValues.negative.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                    </td>
                    <td style={{ whiteSpace: "nowrap" }}>
                        {currentValues.negativeIncrease !== 0 &&
                            <FontAwesomeIcon fixedWidth className="decrease" icon={currentValues.negativeIncrease > 0 ? faPlus : faMinus} aria-label="decrease or increase negative cases" />
                        }
                        {currentValues.negativeIncrease === null && "no data is available"}
                        {currentValues.negativeIncrease && currentValues.negativeIncrease.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                    </td>
                </tr>
                <tr >
                    <td colSpan="99999" className="hiddenRow">
                        <div className="accordian-body collapse" id="trNegatives">
                            <div>
                                <p><strong>Negative PCR tests (people)</strong></p>
                                <p>Total number of <strong>unique people with a completed PCR test that returns negative</strong>. For states / territories that do not report this number directly, we compute it using one of several methods, depending on which data points the state provides. Due to complex reporting procedures, this number might be mixing units and therefore, at best, it should only be considered an estimate of the number of people with a completed PCR test that return negative. </p>
                            </div>
                            <div>
                                <p><strong>Change</strong></p>
                                <p>Increase in <em>Negatives</em> computed by subtracting the value of <em>Negatives</em> for the previous day from the value for <em>Negatives</em> from the current day.</p>
                            </div>
                        </div>
                    </td>
                </tr>
                <tr data-toggle="collapse" data-target="#trTotalTestResults">
                    <td><FontAwesomeIcon fixedWidth className="bootstrap-primary" icon={faInfoCircle} aria-label="information on Parameter Total Test Results" /> Total Test Results</td>
                    <td>
                        {currentValues.totalTestResults === null && "no data is available"}
                        {currentValues.totalTestResults && currentValues.totalTestResults.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                    </td>
                    <td style={{ whiteSpace: "nowrap" }}>
                        {currentValues.totalTestResultsIncrease !== 0 &&
                            <FontAwesomeIcon fixedWidth className="decrease" icon={currentValues.totalTestResultsIncrease > 0 ? faPlus : faMinus} aria-label="decrease or increase totalTestResults cases" />
                        }
                        {currentValues.totalTestResultsIncrease === null && "no data is available"}
                        {currentValues.totalTestResultsIncrease && currentValues.totalTestResultsIncrease.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                    </td>
                </tr>
                <tr >
                    <td colSpan="99999" className="hiddenRow">
                        <div className="accordian-body collapse" id="trTotalTestResults">
                            <div>
                                <p><strong>Total test results</strong></p>
                                <p>In most states, the <em>Total Test Results</em> field is currently computed by adding positive and negative values because, historically, some states do not report totals, and to work around different reporting cadences for cases and tests. In Colorado, the District of Columbia, Hawaii, Minnesota, North Dakota, Rhode Island, Virginia, and Washington, where reliable testing encounters figures are available with a complete time series, we directly report those figures in this field. In Alabama, Alaska, Arkansas, Georgia, Idaho, Kentucky, Massachusetts, Missouri, and New Hampshire, where reliable specimens figures are available with a complete time series, we directly report those figures in this field. In Arizona and South Dakota, where reliable unique people figures are available with a complete time series, we directly report those figures in this field. We are in the process of switching all states over to use directly reported total figures, using a policy of preferring testing encounters, specimens, and people, in that order.</p>
                            </div>
                            <div>
                                <p><strong>Change: New tests</strong></p>
                                <p>Daily increase in <em>Total Test Results</em>, calculated from the previous day’s value. This calculation includes all the caveats associated with Total tests/<em>Total Test Results</em>, and we recommend against using it at the state/territory level.</p>                            </div>
                        </div>
                    </td>
                </tr>
                <tr data-toggle="collapse" data-target="#trHospitalizations" >
                    <td><FontAwesomeIcon fixedWidth className="bootstrap-primary" icon={faInfoCircle} aria-label="information on Parameter Hospitalizations" /> Hospitalizations</td>
                    <td>
                        {currentValues.hospitalizedCumulative === null && "no data is available"}
                        {currentValues.hospitalizedCumulative && currentValues.hospitalizedCumulative.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                    </td>
                    <td style={{ whiteSpace: "nowrap" }}>
                        {currentValues.hospitalizedIncrease !== 0 &&
                            < FontAwesomeIcon fixedWidth className={currentValues.hospitalizedIncrease > 0 ? "increase" : "decrease"} icon={currentValues.hospitalizedIncrease > 0 ? faCaretUp : faCaretDown} aria-label="decrease or increase hospitalizations" />
                        }
                        {currentValues.hospitalizedIncrease === null && "no data is available"}
                        {currentValues.hospitalizedIncrease && currentValues.hospitalizedIncrease.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                    </td>
                </tr>
                <tr>
                    <td colSpan="99999" className="hiddenRow">
                        <div className="accordian-body collapse" id="trHospitalizations">
                            <div>
                                <p><strong>Cumulative hospitalized/Ever hospitalized</strong></p>
                                <p>Total number of individuals who have <strong>ever been hospitalized with COVID-19</strong>. Definitions vary by state / territory. Where possible, we report hospitalizations with confirmed or probable COVID-19 cases per the expanded <a href="https://cdn.ymaws.com/www.cste.org/resource/resmgr/2020ps/Interim-20-ID-01_COVID-19.pdf">CSTE case definition</a> of April 5th, 2020 <a href="https://wwwn.cdc.gov/nndss/conditions/coronavirus-disease-2019-covid-19/case-definition/2020/">approved by the CDC</a>.</p>
                            </div>
                            <div>
                                <p><strong>Change: New total hospitalizations</strong></p>
                                <p>Daily increase in <em>Hospitalizations</em>, calculated from the previous day’s value.</p>
                            </div>
                        </div>
                    </td>
                </tr>
                <tr data-toggle="collapse" data-target="#trHospitalizedCurrently">
                    <td><FontAwesomeIcon fixedWidth className="bootstrap-primary" icon={faInfoCircle} aria-label="information on Parameter Hospitalized Currently" /> Hospitalized Currently</td>
                    <td>
                        {currentValues.hospitalizedCurrently === null && "no data is available"}
                        {currentValues.hospitalizedCurrently && currentValues.hospitalizedCurrently.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                    </td>
                    <td>Not Applicable</td>
                </tr>
                <tr>
                    <td colSpan="99999" className="hiddenRow">
                        <div className="accordian-body collapse" id="trHospitalizedCurrently">
                            <div>
                                <p><strong>Currently hospitalized/Now hospitalized</strong></p>
                                <p>Individuals who are <strong>currently hospitalized with COVID-19</strong>. Definitions vary by state / territory. Where possible, we report hospitalizations with confirmed or probable COVID-19 cases per the expanded <a href="https://cdn.ymaws.com/www.cste.org/resource/resmgr/2020ps/Interim-20-ID-01_COVID-19.pdf">CSTE case definition</a> of April 5th, 2020 <a href="https://wwwn.cdc.gov/nndss/conditions/coronavirus-disease-2019-covid-19/case-definition/2020/">approved by the CDC</a>.</p>
                            </div>
                        </div>
                    </td>
                </tr>
                <tr data-toggle="collapse" data-target="#trInIcuCurrently">
                    <td><FontAwesomeIcon fixedWidth className="bootstrap-primary" icon={faInfoCircle} aria-label="information on Parameter In Icu Currently" /> In Icu Currently</td>
                    <td>
                        {currentValues.inIcuCurrently === null && "no data is available"}
                        {currentValues.inIcuCurrently && currentValues.inIcuCurrently.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                    </td>
                    <td>Not Applicable</td>
                </tr>
                <tr>
                    <td colSpan="99999" className="hiddenRow">
                        <div className="accordian-body collapse" id="trInIcuCurrently">
                            <div>
                                <p><strong>Currently in ICU/Now in ICU</strong></p>
                                <p>Individuals who are <strong>currently hospitalized in the Intensive Care Unit with COVID-19</strong>. Definitions vary by state / territory. Where possible, we report patients in the ICU with confirmed or probable COVID-19 cases per the expanded <a href="https://cdn.ymaws.com/www.cste.org/resource/resmgr/2020ps/Interim-20-ID-01_COVID-19.pdf">CSTE case definition</a> of April 5th, 2020 <a href="https://wwwn.cdc.gov/nndss/conditions/coronavirus-disease-2019-covid-19/case-definition/2020/">approved by the CDC</a>.</p>
                            </div>
                        </div>
                    </td>
                </tr>
                <tr data-toggle="collapse" data-target="#trOnVentilatorCurrently">
                    <td><FontAwesomeIcon fixedWidth className="bootstrap-primary" icon={faInfoCircle} aria-label="information on Parameter On Ventilator Currently" /> On Ventilator Currently</td>
                    <td>
                        {currentValues.onVentilatorCurrently === null && "no data is available"}
                        {currentValues.onVentilatorCurrently && currentValues.onVentilatorCurrently.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                    </td>
                    <td>Not Applicable</td>
                </tr>
                <tr>
                    <td colSpan="99999" className="hiddenRow">
                        <div className="accordian-body collapse" id="trOnVentilatorCurrently">
                            <div>
                                <p><strong>Currently on ventilator/Now on ventilator</strong></p>
                                <p>Individuals who are <strong>currently hospitalized under advanced ventilation with COVID-19</strong>. Definitions vary by state / territory. Where possible, we report patients on ventilation with confirmed or probable COVID-19 cases per the expanded <a href="https://cdn.ymaws.com/www.cste.org/resource/resmgr/2020ps/Interim-20-ID-01_COVID-19.pdf">CSTE case definition</a> of April 5th, 2020 <a href="https://wwwn.cdc.gov/nndss/conditions/coronavirus-disease-2019-covid-19/case-definition/2020/">approved by the CDC</a>.</p>
                            </div>
                        </div>
                    </td>
                </tr>
                <tr data-toggle="collapse" data-target="#trDeaths" >
                    <td><FontAwesomeIcon fixedWidth className="bootstrap-primary" icon={faInfoCircle} aria-label="information on Parameter Deaths" /> Deaths</td>
                    <td>
                        {currentValues.death === null && "no data is available"}
                        {currentValues.death && currentValues.death.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                    </td>
                    <td style={{ whiteSpace: "nowrap" }}>
                        {currentValues.deathIncrease !== 0 &&
                            <FontAwesomeIcon fixedWidth className={currentValues.deathIncrease > 0 ? "increase" : "decrease"} icon={currentValues.deathIncrease > 0 ? faCaretUp : faCaretDown} aria-label="decrease or increase deaths" />
                        }
                        {currentValues.deathIncrease === null && "no data is available"}
                        {currentValues.deathIncrease && currentValues.deathIncrease.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                    </td>
                </tr>
                <tr>
                    <td colSpan="99999" className="hiddenRow">
                        <div className="accordian-body collapse" id="trDeaths">
                            <div>
                                <p><strong>Deaths (confirmed and probable)</strong></p>
                                <p>Total <strong>fatalities with confirmed OR probable COVID-19 case diagnosis</strong> (per the expanded <a href="https://cdn.ymaws.com/www.cste.org/resource/resmgr/2020ps/Interim-20-ID-01_COVID-19.pdf">CSTE case definition</a> of April 5th, 2020 <a href="https://wwwn.cdc.gov/nndss/conditions/coronavirus-disease-2019-covid-19/case-definition/2020/">approved by the CDC</a>). In states where the information is available, it only tracks fatalities with confirmed OR probable COVID-19 case diagnosis where on the death certificate, <strong>COVID-19 is listed as an underlying cause of death</strong> according to <a href="https://www.who.int/classifications/icd/Guidelines_Cause_of_Death_COVID-19.pdf?ua=1">WHO guidelines</a>.</p>
                            </div>
                            <div>
                                <p><strong>Change: New deaths</strong></p>
                                <p>Daily increase in <em>Deaths</em>, calculated from the previous day’s value.</p>
                            </div>
                        </div>
                    </td>
                </tr>
                <tr data-toggle="collapse" data-target="#trRecovered">
                    <td><FontAwesomeIcon fixedWidth className="bootstrap-primary" icon={faInfoCircle} aria-label="information on Parameter Recovered" /> Recovered</td>
                    <td>
                        {currentValues.recovered === null && "no data is available"}
                        {currentValues.recovered && currentValues.recovered.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                    </td>
                    <td>Not Applicable</td>
                </tr>
                <tr>
                    <td colSpan="99999" className="hiddenRow">
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