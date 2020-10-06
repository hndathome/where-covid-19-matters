import React from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'

function ZipCode(props) {
    return (
        <li className="list-group-item">
            <span >{props.zipcode.zipcode}</span> <FontAwesomeIcon icon={faTrashAlt} style={{ color: "red" }} onClick={() => props.handleDelete(props.zipcode.id)} />
        </li>
    )
}

export default ZipCode