import React, { useState, useEffect } from "react"
import { Link, navigate } from "gatsby"
import axios from 'axios'
import { getCurrentPosition, getCurrentReverseGeocode, saveReverseGeoCode } from "../geolocation"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faPencilAlt } from '@fortawesome/free-solid-svg-icons';

export default function Layout({ children }) {
    const [geoZip, SetGeoZip] = useState();
    const [geoCity, SetGeoCity] = useState();

    useEffect(() => {
        const fetchData = async (position) => {
            const url = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${position.coords.latitude}&longitude=${position.coords.longitude}&localityLanguage=en`
            const response = await axios.get(url, { headers: { 'Accept': 'application/json' } });
            saveReverseGeoCode({ city: response.data.city, postcode: response.data.postcode });
            SetGeoCity(response.data.city)
            SetGeoZip(response.data.postcode)
        }

        const fetchCoordinates = async () => {
            try {
                const currentReverseGeoCode = getCurrentReverseGeocode();

                if (Object.keys(currentReverseGeoCode).length === 0) {
                    const position = await getCurrentPosition();
                    fetchData(position);
                }
                else {
                    SetGeoCity(currentReverseGeoCode.city)
                    SetGeoZip(currentReverseGeoCode.postcode)
                }
                // Handle coordinates
            } catch (error) {
                // Handle error
                console.error(error);
            }
        };

        fetchCoordinates();
    }, []);
    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link className="nav-link" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <button title="View local and state Covid-19 data" className="btn btn-link nav-link" onClick={event => {
                                event.preventDefault();
                                navigate(
                                    `/details/10001`,
                                    {
                                        state: { updatedItem: {} },
                                    }
                                )
                            }}>New York</button>
                        </li>
                        <li className="nav-item">
                            <button title="View local and state Covid-19 data" className="btn btn-link nav-link" onClick={event => {
                                event.preventDefault();
                                navigate(
                                    `/details/90001`,
                                    {
                                        state: { updatedItem: {} },
                                    }
                                )
                            }}>Los Angeles</button>
                        </li>
                    </ul>
                </div>
                <ul className="navbar-nav nav-gps" style={{ flexDirection: "row" }}>
                    {geoZip &&
                        <li className="nav-item" style={{ paddingRight: "0.5rem" }}  >
                            <button title="View local and state Covid-19 data" className="btn btn-link nav-link" onClick={event => {
                                event.preventDefault();
                                navigate(
                                    `/details/${geoZip}`,
                                    {
                                        state: { updatedItem: {} },
                                    }
                                )
                            }}><FontAwesomeIcon className="bootstrap-primary" fixedWidth icon={faMapMarkerAlt} aria-label="your gps location" />{geoCity}</button>
                        </li>
                    }
                    <li className="nav-item">
                        <Link className="nav-link" to="/zipcodelist"> <FontAwesomeIcon className="bootstrap-primary" fixedWidth icon={faPencilAlt} aria-label="enter zip codes" />Enter zip codes</Link>
                    </li>
                </ul>

            </nav>
            {children}
        </>
    )
}
