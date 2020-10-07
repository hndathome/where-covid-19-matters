import React, { useState, useEffect } from "react"
import Layout from "../components/Layout";
import LeafletMap from "../components/LeafletMap"
import { Helmet } from "react-helmet"
import axios from 'axios'

export const ZipCodeDetail = (props) => {
    const { zipcode, item } = props;
    const [hereData, setHereData] = useState();
    const [markers, setMarkers] = useState();
    useEffect(() => {
        const fetchData = async () => {
            try {
                let atLat = item.latitude.toString();
                let atLong = item.longitude.toString();

                atLat = (atLat.startsWith("-")) ? atLat.substring(0, 5) : atLat.substring(0, 4);
                atLong = (atLong.startsWith("-")) ? atLong.substring(0, 5) : atLong.substring(0, 4);
                const gps = `${atLat},${atLong}`

                const hereapiUrl = `https://discover.search.hereapi.com/v1/discover?apikey=${process.env.GATSBY_HERE_API_KEY}&q=Covid&at=${gps}&limit=3`

                const response = await axios.get(hereapiUrl, { headers: { 'Accept': 'application/json' } });
                const { items } = response.data;
                const dataMarkers = items.reduce((accumulator, current) => {
                    return [...accumulator, { markerText: current.title.slice(23), position: [current.position.lat, current.position.lng] }]
                }, []);
                setMarkers(dataMarkers);
                setHereData(response.hereData);
            } catch (error) {
                console.error(error);
            }
        }

        fetchData();
    }, [zipcode, item])

    return (
        <>
            <Helmet>
                <meta charSet="utf-8" />
                <title>{zipcode} Details</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                <link rel="stylesheet" href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css"
                    integrity="sha512-xodZBNTC5n17Xt2atTPuE1HxjVMSvLVW9ocqUKLsCC5CXdbqCmblAshOMAS6/keqq/sMZMZ19scR4PsZChSR7A=="
                    crossorigin="" />
                <script src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js"
                    integrity="sha512-XQoYMqMTK8LvdxXYG3nZ448hOEQiglfqkJs1NOQV44cWnUrBc8PkAOcXy20w0vlaXaVUearIOBhiXZ5V3ynxwA=="
                    crossorigin=""></script>
            </Helmet>
            <Layout>
                {typeof window !== 'undefined' &&
                    <LeafletMap
                        position={[item.latitude, item.longitude]}
                        zoom={9}
                        markers={markers}
                    />
                }
            </Layout>
        </>
    )
}