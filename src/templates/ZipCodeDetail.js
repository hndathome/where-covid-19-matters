
import React, { useState, useEffect } from "react"

export const ZipCodeDetail = (props) => {

    //county data
    //`https://cors-anywhere.herokuapp.com/https://localcoviddata.com/covid19/v1/cases/newYorkTimes?zipCode=${result.data[0].zipcodes[0].zipcode}&daysInPast=7`

    //const [person, setPerson] = useState()
    useEffect(() => {
        console.log("ZipCodeDetail.js")
        console.log(props.item);
        /* fetch(`https://discover.search.hereapi.com/v1/discover?apikey=${process.env.GATSBY_HERE_API_KEY}&q=Covid&at=36.03,-94.15&limit=3`)
            .then(x => x.json())
            .then(x => setPerson(x)) */
    }, [props.zipcode])

    return (
        <div>
            {/* <pre>{JSON.stringify(person, null, 2)}</pre> */}
        </div>
    )
}