import React, { useState, useEffect } from 'react'
import { navigate } from "gatsby"
import axios from "axios"

import ZipCode from "../components/ZipCode"

function ZipCodeList() {
    const [myZipCodes, setMyZipCodes] = useState([]);
    const [zipCode, setZipCode] = useState("");
    const [url, setUrl] = useState('');
    const [delId, setDelId] = useState('');

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

    return (
        <>
            <form onSubmit={handleSubmit}>
                <label>
                    <input
                        name="zipCode"
                        type="text"
                        value={zipCode}
                        minLength={5}
                        maxLength={5}
                        onChange={e => setZipCode(e.target.value)}
                    />
                </label>
            </form>
            <div className="card">
                <h5 className="card-header">My Zip Codes</h5>
                <ul className="list-group list-group-flush">
                    {myZipCodes.length > 0 && myZipCodes.map(zip => <ZipCode zipcode={zip} key={zip.id} handleDelete={handleDelete} />)}
                </ul>
            </div>
            <button onClick={event => {
                event.preventDefault()
                navigate(
                    "/summary/",
                    {
                        state: { myZipCodes },
                    }
                )
            }}>get data</button>
        </>
    );
}

export default ZipCodeList