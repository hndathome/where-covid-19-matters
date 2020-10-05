
import React, { useState, useEffect } from "react"

export const ZipCodeDetail = (props) => {

    const { zipcode, item } = props;
    //county data
    //`https://cors-anywhere.herokuapp.com/https://localcoviddata.com/covid19/v1/cases/newYorkTimes?zipCode=${result.data[0].zipcodes[0].zipcode}&daysInPast=7`

    const [hereData, setHereData] = useState()
    useEffect(() => {
        console.log("ZipCodeDetail.js")
        console.log(item);
        let atLat = item.latitude.toString();
        let atLong = item.longitude.toString();

        atLat = (atLat.startsWith("-")) ? atLat.substring(0, 5) : atLat.substring(0, 4);
        atLong = (atLong.startsWith("-")) ? atLong.substring(0, 5) : atLong.substring(0, 4);
        const gps = `${atLat},${atLong}`

        fetch(`https://discover.search.hereapi.com/v1/discover?apikey=${process.env.GATSBY_HERE_API_KEY}&q=Covid&at=${gps}&limit=3`)
            .then(x => x.json())
            .then(x => setHereData(x))
    }, [zipcode, item])

    return (
        <div>
            <pre>{JSON.stringify(hereData, null, 2)}</pre>
        </div>
    )
}