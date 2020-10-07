import React from "react"
import { ZipCodeDetail } from "../templates/ZipCodeDetail"
import { Location, Router } from "@reach/router"

const Details = () => (
    <Location>
        {({ location }) => (
            <Router location={location}>
                <ZipCodeDetail path="/details/:zipcode" item={location.state.updatedItem} />
            </Router>
        )}
    </Location>
)

export default Details