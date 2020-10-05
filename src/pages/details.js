import React from "react"
import { ZipCodeDetail } from "../templates/ZipCodeDetail"
import { Router } from "@reach/router"

const Details = () => {
    return (
        <Router>
            <ZipCodeDetail path="/details/:zipcode" />
        </Router>
    )
}

export default Details