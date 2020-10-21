//`https://api.covidtracking.com/v1/us/daily.json` historic us
//`https://api.covidtracking.com/v1/states/daily.json` all states historic
//`https://api.covidtracking.com/v1/states/info.json` all states info

//https://api.covidtracking.com/v1/states/ca/daily.json
import axios from 'axios'

let historicUSData;
let lastGetHistoricUSData;

let StatesInfo;
let lastGetStatesInfo;

let historicStatesData;
let lastGetHistoricStatesData;

let historicStateData;
let historicStateArray = [];

const covidTracking = {
    getHistoricUSData: async function () {
        let today = new Date();
        today.setHours(0, 0, 0, 0);
        let todayString = today.toString();
        try {
            if (!historicUSData || lastGetHistoricUSData === undefined || todayString !== lastGetHistoricUSData) {
                const url = `https://api.covidtracking.com/v1/us/daily.json`;
                const response = await axios.get(url, { headers: { 'Accept': 'application/json' } });
                historicUSData = response.data;
            }
        } catch (error) {
            console.error(error);
        }
        lastGetHistoricUSData = todayString;
        return historicUSData;
    },
    getHistoricStateData: async function (stateAbbr) {
        let today = new Date();
        today.setHours(0, 0, 0, 0);
        let todayString = today.toString();
        let indexFound = -1;
        try {
            indexFound = historicStateArray.findIndex(obj => obj.stateAbbr === stateAbbr);
            if (historicStateArray.length === 0 || indexFound === -1 || todayString !== historicStateArray[indexFound].lastDay) {
                const url = `https://api.covidtracking.com/v1/states/${stateAbbr.toLowerCase()}/daily.json`;
                const response = await axios.get(url, { headers: { 'Accept': 'application/json' } });
                historicStateData = response.data;
            }
            else {
                historicStateData = historicStateArray[indexFound].historicStateData;
            }
        } catch (error) {
            historicUSData = undefined;
            console.error(error);
        }

        if (indexFound === -1) {
            historicStateArray.push({ stateAbbr: stateAbbr, lastDay: todayString, historicStateData: [...(historicStateData || [])] })
        }
        else {
            historicStateArray[indexFound].historicStateData = [...(historicStateData || [])];
            historicStateArray[indexFound].lastDay = todayString;
        }

        return historicStateData;
    },
    getStatesInfo: async function getStatesInfo() {
        let today = new Date();
        today.setHours(0, 0, 0, 0);
        let todayString = today.toString();
        try {
            if (!StatesInfo || lastGetStatesInfo === undefined || todayString !== lastGetStatesInfo) {
                const url = `https://api.covidtracking.com/v1/states/info.json`;
                const response = await axios.get(url, { headers: { 'Accept': 'application/json' } });
                StatesInfo = response.data;
            }
        } catch (error) {
            console.error(error);
        }
        lastGetStatesInfo = todayString;
        return StatesInfo;
    },
    getHistoricStatesData: async function () {
        let today = new Date();
        today.setHours(0, 0, 0, 0);
        let todayString = today.toString();
        try {
            if (!historicStatesData || lastGetHistoricStatesData === undefined || todayString !== lastGetHistoricStatesData) {
                const url = `https://api.covidtracking.com/v1/states/daily.json`;
                const response = await axios.get(url, { headers: { 'Accept': 'application/json' } });
                historicStatesData = response.data;
            }
        } catch (error) {
            console.error(error);
        }
        lastGetHistoricStatesData = todayString;
        return historicStatesData;
    }
}

export default covidTracking;