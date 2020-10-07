import React, { useState, useEffect } from "react"
import Layout from "../components/Layout";

export const ZipCodeDetail = (props) => {
    const { zipcode, item } = props;
    const [hereData, setHereData] = useState();
    console.log(item);

    useEffect(() => {
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
        <Layout>
            <div>
                <pre>{JSON.stringify(hereData, null, 2)}</pre>
            </div>
        </Layout>
    )
}