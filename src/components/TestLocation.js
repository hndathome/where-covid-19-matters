import React from "react"

function TestLocation(props) {
    const { datapoint } = props
    return (
        <li className="list-group-item">
            <address>
                {datapoint.markerText}<br />
                {datapoint.address.houseNumber && datapoint.address.houseNumber} {datapoint.address.street}<br />
                {`${datapoint.address.city}, ${datapoint.address.stateCode} ${datapoint.address.postalCode}`}<br />
                {datapoint.phone && <a href={`tel:${datapoint.phone}`}>{datapoint.formatPhone}</a>}
            </address>
        </li>
    )
}

export default TestLocation