import React from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

function ZipCode(props) {
    return (
        <li class="list-group-item">
            <span >{props.zipcode.zipcode}</span> <FontAwesomeIcon icon={faTrash} onClick={() => props.handleDelete(props.zipcode.id)} />
        </li>
    )
}

export default ZipCode