import React from "react"
import { ZipCodeDetail } from "../templates/ZipCodeDetail"
import { Location, Router } from "@reach/router"

/* const Details = ({ location }) => {
    console.log("details.js");
    console.log(location.state.item);
    return (

        <Router>
            <ZipCodeDetail path="/details/:zipcode" item={location.state.item} />
        </Router>
    )
} */


const Details = () => (
    <Location>
        {({ location }) => (
            <Router location={location}>
                <ZipCodeDetail path="/details/:zipcode" item={location.state.item} />
            </Router>
        )}
    </Location>
)

export default Details