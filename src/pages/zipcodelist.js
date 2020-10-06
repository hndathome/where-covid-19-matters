import React, { useState, useEffect } from 'react'
import { navigate } from "gatsby"
import axios from "axios"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faTrashAlt } from '@fortawesome/free-solid-svg-icons'

import ZipCode from "../components/ZipCode"
import Layout from '../components/Layout';

function ZipCodeList() {
    const [myZipCodes, setMyZipCodes] = useState([]);
    const [zipCode, setZipCode] = useState("");
    const [url, setUrl] = useState('');
    const [delId, setDelId] = useState('');
    const [delAll, setDelAll] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            if (url !== '') {
                const result = await axios.get(url, { headers: { 'Accept': 'application/json' } });
                if (result.data[0].zipcodes === undefined) {
                    alert('Invalid zip code.');
                }
                else {
                    setMyZipCodes(list => [
                        ...list,
                        {
                            id: result.data[0].zipcodes[0].zipcode,
                            zipcode: result.data[0].zipcodes[0].zipcode,
                            county_fips: result.data[0].zipcodes[0].county_fips,
                            county_name: result.data[0].zipcodes[0].county_name,
                            state_abbreviation: result.data[0].zipcodes[0].state_abbreviation,
                            state: result.data[0].zipcodes[0].state,
                            latitude: result.data[0].zipcodes[0].latitude,
                            longitude: result.data[0].zipcodes[0].longitude
                        }
                    ]);
                    setZipCode("");
                }
                setUrl('');
            }
        };

        fetchData();
    }, [url]);

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
                setUrl(`https://us-zipcode.api.smartystreets.com/lookup?key=${process.env.GATSBY_SS_KEY}&zipcode=${zipCode}`);
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
                                            <div class="input-group">
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
                                                <div class="input-group-append">
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
                <button className="btn btn-primary" disabled={myZipCodes.length > 0 ? false : true} onClick={event => {
                    event.preventDefault()
                    navigate(
                        "/summary/",
                        {
                            state: { myZipCodes },
                        }
                    )
                }}>Get data</button>
            </div>
        </Layout>
    );
}

export default ZipCodeList