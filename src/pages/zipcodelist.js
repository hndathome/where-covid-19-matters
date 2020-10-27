import React, { useState, useEffect } from 'react';
import { navigate } from "gatsby";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTrashAlt, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { Helmet } from "react-helmet"

import Layout from '../components/Layout';
import ZipCode from "../components/ZipCode";
import covidTracking from "../covidtracking.api";
import smartyStreets from "../smartystreets.api";

function ZipCodeList() {
    const [myZipCodes, setMyZipCodes] = useState([]);
    const [zipCode, setZipCode] = useState('');
    const [lookUpZipCode, setLookUpZipCode] = useState(false);
    const [delId, setDelId] = useState('');
    const [delAll, setDelAll] = useState(false);
    const [addingZip, setAddingZip] = useState(false);
    const [allStatesInfo, setAllStatesInfo] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const responseAllStatesInfo = await covidTracking.getStatesInfo();
                setAllStatesInfo(responseAllStatesInfo);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, [])

    useEffect(() => {
        const fetchData = async () => {
            setAddingZip(true);
            try {
                const responseSmartyStreet = await smartyStreets.lookupZipCode(zipCode);

                if (responseSmartyStreet.zipcodes === undefined) {
                    alert('Invalid zip code.');
                }
                else {
                    const { zipcodes } = responseSmartyStreet;
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
                            default_city: zipcodes[0].default_city
                        }
                    ]);
                    setZipCode("");
                }
            } catch (error) {
                console.error(error);
            }
            setAddingZip(false);
        };

        if (lookUpZipCode && myZipCodes.filter(obj => obj.zipcode === zipCode).length === 0) {
            fetchData();
            setLookUpZipCode(false);
        }
    }, [lookUpZipCode, allStatesInfo, zipCode, myZipCodes]);

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
                setLookUpZipCode(true);
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
        event.preventDefault();
        navigate(
            "/summary/",
            {
                state: { myZipCodes: myZipCodes },
            }
        )
    }

    return (
        <>
            <Helmet>
                <title>Enter Zip Codes</title>
                <body class="my-zipcodes-body" />
                <link rel="preload" href="../assets/coronavirus-covid19-face-mask-1-1.jpg" as="image"></link>
                <link rel="preload" href="../assets/coronavirus-covid19-face-mask-1-2.jpg" as="image"></link>
                <link rel="preload" href="../assets/coronavirus-covid19-face-mask-1-3.jpg" as="image"></link>
            </Helmet>
            <Layout>
                <div className="container zipcode-form">
                    <div className="row">
                        <div className="col-md-6">
                            <div className="card">
                                <h5 className="card-header">Zip Codes</h5>
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
                                                        pattern="^\d{5}$"
                                                        title="Five digit zip code"
                                                    />
                                                    <div className="input-group-append">
                                                        <button type="submit" className="btn btn-outline-secondary" data-toggle="tooltip" data-placement="top" title="add zip code"><FontAwesomeIcon className={addingZip ? "addclickspin" : "addclickdefault"} icon={addingZip ? faSpinner : faPlus} aria-label="add zip code to list" /></button>
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