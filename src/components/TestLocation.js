import React from "react"
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'

const formatPhoneNumber = (phoneNumberString) => {
    let cleaned = ('' + phoneNumberString).replace(/\D/g, '')
    var match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/)
    if (match) {
        var intlCode = (match[1] ? '+1 ' : '')
        return [intlCode, '(', match[2], ') ', match[3], '-', match[4]].join('')
    }
    return null
}

function TestLocation(props) {
    const { datapoint } = props
    return (
        <li className="list-group-item">
            <address>
                {datapoint.markerText}<br />
                {datapoint.address.houseNumber && datapoint.address.houseNumber} {datapoint.address.street}<br />
                {`${datapoint.address.city}, ${datapoint.address.stateCode} ${datapoint.address.postalCode}`}<br />
                {datapoint.contacts[0].phone[0].value && <a href={`tel:${datapoint.contacts[0].phone[0].value}`}>{formatPhoneNumber(datapoint.contacts[0].phone[0].value)}</a>}
            </address>
        </li>
    )
}

export default TestLocation