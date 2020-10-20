//`https://us-zipcode.api.smartystreets.com/lookup?auth-id=YOUR+AUTH-ID+HERE&auth-token=YOUR+AUTH-TOKEN+HERE&zipcode=${zipCode}` zip code validation
import axios from 'axios'

let zipCodeArray = [];
let zipCodeData;

const smartyStreets = {
    lookupZipCode: async function (zipCode) {
        let indexFound = -1;
        try {
            indexFound = zipCodeArray.findIndex(obj => obj.zipCode === zipCode);

            if (zipCodeArray.length === 0 || indexFound === -1) {
                const url = `https://us-zipcode.api.smartystreets.com/lookup?auth-id=${process.env.SS_AUTH_ID}&auth-token=${process.env.SS_AUTH_TOKEN}&zipcode=${zipCode}`;
                const response = await axios.get(url, { headers: { 'Accept': 'application/json' } });
                zipCodeData = response.data[0];
                console.log("new")
            }
            else {
                zipCodeData = { ...zipCodeArray[indexFound].zipCodeData };
                console.log("old")
            }
        } catch (error) {
            zipCodeData = undefined;
            console.error(error);
        }

        if (indexFound === -1) {
            zipCodeArray.push({ zipCode: zipCode, zipCodeData: { ...zipCodeData } })
        }
        else {
            zipCodeArray[indexFound].zipCodeData = { ...zipCodeData };
        }

        return zipCodeData;
    }
}

export default smartyStreets;