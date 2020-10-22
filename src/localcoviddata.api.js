//`https://localcoviddata.com/covid19/v1/cases/newYorkTimes?zipCode=${zipCode}&daysInPast=7` county 7 days

let localCovidArray = [];
let localCovidData;

const localCovid = {
    getLocalCovidData: async function (zipCode) {
        let today = new Date();
        today.setHours(0, 0, 0, 0);
        let todayString = today.toString();
        let indexFound = -1;
        try {
            indexFound = localCovidArray.findIndex(obj => obj.zipCode === zipCode);

            if (localCovidArray.length === 0 || indexFound === -1 || todayString !== localCovidArray[indexFound].lastDay) {
                const url = `https://localcoviddata.com/covid19/v1/cases/newYorkTimes?zipCode=${zipCode}&daysInPast=7`;
                const allOriginsUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(url)}`;

                const response = await fetch(allOriginsUrl)
                    .then(response => {
                        if (response.ok) return response.json()
                        throw new Error('Network response was not ok.')
                    })
                    .then(data => JSON.parse(data.contents));

                localCovidData = response;
            }
            else {
                localCovidData = { ...localCovidArray[indexFound].localCovidData };
            }
        } catch (error) {
            localCovidData = undefined;
            console.error(error);
        }

        if (indexFound === -1) {
            localCovidArray.push({ zipCode: zipCode, lastDay: todayString, localCovidData: { ...localCovidData } })
        }
        else {
            localCovidArray[indexFound].localCovidData = { ...localCovidData };
            localCovidArray[indexFound].lastDay = todayString;
        }
        return localCovidData;
    }
}

export default localCovid;