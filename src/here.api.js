//`https://discover.search.hereapi.com/v1/discover?apikey={{apiKey}}&q=Covid&at=${gps}&limit=10` covid-19 testing locations
import axios from 'axios'

let hereArray = [];
let gpsMarkers;

const formatPhoneNumber = (phoneNumberString) => {
    let cleaned = ('' + phoneNumberString).replace(/\D/g, '')
    var match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/)
    if (match) {
        var intlCode = (match[1] ? '+1 ' : '')
        return [intlCode, '(', match[2], ') ', match[3], '-', match[4]].join('')
    }
    return ""
}

const hereAPI = {
    getCovid19TestingLocations: async function (gps) {
        let today = new Date();
        today.setHours(0, 0, 0, 0);
        const todayString = today.toString();
        let indexFound = -1;
        try {
            indexFound = hereArray.findIndex(obj => obj.gps === gps);

            if (hereArray.length === 0 || indexFound === -1 || todayString !== hereArray[indexFound].lastDay) {
                const url = `https://discover.search.hereapi.com/v1/discover?apikey=${process.env.GATSBY_HERE_API_KEY}&q=Covid&at=${gps}&limit=10`;
                const response = await axios.get(url, { headers: { 'Accept': 'application/json' } });

                const { items } = response.data;
                const dataMarkers = items && items.filter(current => current.title.startsWith("Covid-19 Testing Site")).reduce((accumulator, current) => {
                    return [...accumulator, { markerText: current.title.slice(23), position: [current.position.lat, current.position.lng], phone: current.contacts[0].phone ? current.contacts[0].phone[0].value : "", formatPhone: formatPhoneNumber(current.contacts[0].phone ? current.contacts[0].phone[0].value : ""), address: current.address }]
                }, []);
                gpsMarkers = dataMarkers;
            }
            else {
                gpsMarkers = hereArray[indexFound].dataMarkers;
            }
        } catch (error) {
            gpsMarkers = undefined;
            console.error(error);
        }

        if (indexFound === -1) {
            hereArray.push({ gps: gps, lastDay: todayString, dataMarkers: [...(gpsMarkers || [])] })
        }
        else {
            hereArray[indexFound].dataMarkers = [...(gpsMarkers || [])];
            hereArray[indexFound].lastDay = todayString;
        }

        return (gpsMarkers || []);
    }
}

export default hereAPI;