import React, { useState, useEffect } from 'react';
import { navigate } from "gatsby";
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTrashAlt, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { Helmet } from "react-helmet"

import Layout from '../components/Layout';
import ZipCode from "../components/ZipCode";

function ZipCodeList() {
    const [myZipCodes, setMyZipCodes] = useState([]);
    const [zipCode, setZipCode] = useState("");
    const [smartyStreetUrl, setSmartyStreetUrl] = useState('');
    const [delId, setDelId] = useState('');
    const [delAll, setDelAll] = useState(false);
    const [addingZip, setAddingZip] = useState(false);
    const [allStatesInfo, setAllStatesInfo] = useState([]);
    const [allStatesDaily, setAllStatesDaily] = useState([]);

    useEffect(() => {
        try {
            const fetchData = async () => {
                const allStatesInfoUrl = "https://api.covidtracking.com/v1/states/info.json"
                const responseAllStatesInfo = await axios.get(allStatesInfoUrl, { headers: { 'Accept': 'application/json' } });
                setAllStatesInfo(responseAllStatesInfo.data);

                const allStatesDailyUrl = "https://api.covidtracking.com/v1/states/daily.json"
                const responseAllStatesDaily = await axios.get(allStatesDailyUrl, { headers: { 'Accept': 'application/json' } });
                setAllStatesDaily(responseAllStatesDaily.data);
            };

            fetchData();
        } catch (error) {
            console.error(error);
        }
    }, [])

    useEffect(() => {
        const fetchData = async () => {
            if (smartyStreetUrl !== '') {
                setAddingZip(true);
                try {
                    const responseSmartyStreet = await axios.get(smartyStreetUrl, { headers: { 'Accept': 'application/json' } });
                    const { zipcodes } = responseSmartyStreet.data[0];

                    if (responseSmartyStreet.data[0].zipcodes === undefined) {
                        alert('Invalid zip code.');
                    }
                    else {
                        setMyZipCodes(list => [
                            ...list,
                            {
                                id: zipcodes[0].zipcode,
                                zipcode: zipcodes[0].zipcode,
                                county_fips: zipcodes[0].county_fips,
                                county_name: zipcodes[0].county_name,
                                state_abbreviation: zipcodes[0].state_abbreviation.toLowerCase(),
                                state: zipcodes[0].state,
                                latitude: zipcodes[0].latitude,
                                longitude: zipcodes[0].longitude,
                                state_info: allStatesInfo.find(({ state }) => state === zipcodes[0].state_abbreviation),
                                state_daily: allStatesDaily.filter(({ state }) => state === zipcodes[0].state_abbreviation),
                                default_city: zipcodes[0].default_city
                            }
                        ]);

                        setZipCode("");
                    }
                    setSmartyStreetUrl('');
                } catch (error) {
                    console.error(error);
                }
                setAddingZip(false);
            }
        };
        if (myZipCodes.filter(obj => obj.zipcode === zipCode).length === 0) {
            fetchData();
        }
    }, [smartyStreetUrl, allStatesInfo, allStatesDaily]);

    useEffect(() => {
        if (delId !== '') {
            setMyZipCodes(list => list.filter(obj => obj.id !== delId));
            setDelId('');
        }
    }, [delId]);

    useEffect(() => {
        if (delAll) {
            setMyZipCodes([]);
            setDelAll(false);
        }
    }, [delAll]);

    const handleSubmit = event => {
        event.preventDefault();

        //Zip is 5 digits
        if (zipCode && (/^\d{5}$/.test(zipCode))) {
            //Zip already exists
            if (myZipCodes.filter(obj => obj.zipcode === zipCode).length > 0) {
                alert('Zip code already included in list.');
            }
            else {
                setSmartyStreetUrl(`https://us-zipcode.api.smartystreets.com/lookup?key=${process.env.GATSBY_SS_KEY}&zipcode=${zipCode}`);
            }
        }
        else {
            alert('Invalid zip code.');
        }
    };

    const handleDelete = (id) => {
        setDelId(id);
    };

    const handleDeleteAll = event => {
        event.preventDefault();
        setDelAll(true);
    }

    const handleGetData = event => {
        event.preventDefault()
        navigate(
            "/summary/",
            {
                state: { myZipCodes: myZipCodes },
            }
        )
    }

    return (
        <>
            <Helmet
                bodyAttributes={{
                    class: 'my-zipcodes-body'
                }}
            />
            <Layout>
                <div className="container zipcode-form">
                    <div className="row">
                        <div className="col-md-6">

                            <div className="card">
                                <h5 className="card-header">My Zip Codes</h5>
                                <ul className="list-group list-group-flush">
                                    {myZipCodes.length === 0 && <li className="list-group-item"><strong>Empty list, enter at least one zip code.</strong></li>}
                                    {myZipCodes.length > 0 && myZipCodes.map(zip => <ZipCode zipcode={zip} key={zip.id} handleDelete={handleDelete} />)}
                                    <li className="list-group-item">
                                        <form onSubmit={handleSubmit}>
                                            <div className="form-row ">
                                                <div className="input-group">
                                                    <label className="sr-only" htmlFor="zipCode">Zip code</label>
                                                    <input
                                                        className="form-control"
                                                        name="zipCode"
                                                        type="text"
                                                        placeholder={"Zip code"}
                                                        value={zipCode}
                                                        minLength={5}
                                                        maxLength={5}
                                                        onChange={e => setZipCode(e.target.value)}
                                                        aria-label="zip code"
                                                    />
                                                    <div className="input-group-append">
                                                        <button className="btn btn-outline-secondary" data-toggle="tooltip" data-placement="top" title="add zip code" onClick={handleSubmit}><FontAwesomeIcon className={addingZip ? "addclickspin" : "addclickdefault"} icon={addingZip ? faSpinner : faPlus} aria-label="add zip code to list" /></button>
                                                    </div>
                                                </div>
                                            </div>
                                            <br />
                                            <div>
                                                <button className="btn btn-primary" disabled={myZipCodes.length > 0 ? false : true} onClick={handleGetData}>Get data</button>
                                                <button style={{ float: "right" }} disabled={myZipCodes.length > 0 ? false : true} className="btn btn-danger" data-toggle="tooltip" data-placement="top" title="delete all zip codes" onClick={(e) => window.confirm("Are you sure you wish to delete all zip codes?") ? handleDeleteAll(e) : e.preventDefault()}
                                                ><FontAwesomeIcon icon={faTrashAlt} aria-label="delete all zip codes" /></button>
                                            </div>
                                        </form>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </Layout>
        </>
    );
}

export default ZipCodeList