import React from "react"
import { Helmet } from "react-helmet"

import Layout from "../components/Layout";
import LeafletMap from "../components/LeafletMap"

//https://localcoviddata.com/covid19/v1/cases/covidTracking?state=CA&daysInPast=7

export const ZipCodeDetail = (props) => {
    const { zipcode, item } = props;

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
                        markers={item.markers}
                    />
                }
            </Layout>
        </>
    )
}