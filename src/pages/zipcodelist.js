import React, { useState, useEffect } from 'react';
import { navigate } from "gatsby";
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

import ZipCode from "../components/ZipCode";
import Layout from '../components/Layout';

function ZipCodeList() {
    const [myZipCodes, setMyZipCodes] = useState([]);
    const [zipCode, setZipCode] = useState("");
    const [smartyStreetUrl, setSmartyStreetUrl] = useState('');
    const [delId, setDelId] = useState('');
    const [delAll, setDelAll] = useState(false);
    const [myStates, setMyStates] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            if (smartyStreetUrl !== '') {
                const responseSmartyStreet = await axios.get(smartyStreetUrl, { headers: { 'Accept': 'application/json' } });
                const { zipcodes } = responseSmartyStreet.data[0];

                if (responseSmartyStreet.data[0].zipcodes === undefined) {
                    alert('Invalid zip code.');
                }
                else {
                    let stateInfo;
                    if (!myStates.hasOwnProperty(zipcodes[0].state_abbreviation)) {
                        const stateInfoUrl = `https://api.covidtracking.com/v1/states/${zipcodes[0].state_abbreviation}/info.json`
                        console.log(stateInfoUrl);
                        const responseStateInfo = await axios.get(stateInfoUrl, { headers: { 'Accept': 'application/json' } });
                        stateInfo = responseStateInfo.data;
                        setMyStates(obj => ({ ...obj, [zipcodes[0].state_abbreviation]: stateInfo }));
                    }
                    else {
                        stateInfo = myStates[zipcodes[0].state_abbreviation];
                    }
                    setMyZipCodes(list => [
                        ...list,
                        {
                            id: zipcodes[0].zipcode,
                            zipcode: zipcodes[0].zipcode,
                            county_fips: zipcodes[0].county_fips,
                            county_name: zipcodes[0].county_name,
                            state_abbreviation: zipcodes[0].state_abbreviation,
                            state: zipcodes[0].state,
                            latitude: zipcodes[0].latitude,
                            longitude: zipcodes[0].longitude,
                            state_info: stateInfo
                        }
                    ]);
                    setZipCode("");
                }
                setSmartyStreetUrl('');
            }
        };

        fetchData();
    }, [smartyStreetUrl]);

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
                state: { myZipCodes },
            }
        )
    }

    return (
        <Layout>
            <div className="container zipcode-form">
                <div className="row">
                    <div className="col-md-6">
                        <div className="card">
                            <h5 className="card-header">My Zip Codes</h5>
                            <ul className="list-group list-group-flush">
                                {/* {myZipCodes.length === 0 && <li className="list-group-item"><strong>Enter a zip to begin your search</strong></li>} */}
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
                                                    <button className="btn btn-outline-secondary" onClick={handleSubmit}><FontAwesomeIcon icon={faPlus} /> zip code</button>
                                                    <button className="btn btn-outline-danger" onClick={handleDeleteAll}><FontAwesomeIcon icon={faTrashAlt} /> all</button>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <br />
                <button className="btn btn-primary" disabled={myZipCodes.length > 0 ? false : true} onClick={handleGetData}>Get data</button>
            </div>
        </Layout>
    );
}

export default ZipCodeList