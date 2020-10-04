import React, { useState, useEffect } from 'react'
import axios from "axios"

function ZipCodeList() {
    const [myZipCodes, setMyZipCodes] = useState([]);
    const [zipCode, setZipCode] = useState("");
    const [url, setUrl] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            if (url !== '') {
                const result = await axios.get(url, { headers: { 'Accept': 'application/json' } });
                if (result.data[0].zipcodes === undefined) {
                    alert('Invalid zip code.');
                }
                else {

                    setMyZipCodes([
                        ...myZipCodes,
                        {
                            id: myZipCodes.length,
                            zipcode: result.data[0].zipcodes[0].zipcode,
                            state: result.data[0].zipcodes[0].state_abbreviation
                        }
                    ]);
                    setZipCode("");
                }
            }
        };

        fetchData();
    }, [url]);

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
            <ul>
                {myZipCodes.map(item => (
                    <li key={item.id}>{item.zipcode} {item.state}</li>
                ))}
            </ul>
        </>
    );
}

export default ZipCodeList