const isBrowser = typeof window !== `undefined`

const getReverseGeoCode = () =>
    window.localStorage.reverseGeoCode
        ? JSON.parse(window.localStorage.reverseGeoCode)
        : {}

const setReverseGeoCode = reverseGeoCode => (window.localStorage.reverseGeoCode = JSON.stringify(reverseGeoCode))

export const saveReverseGeoCode = ({ city, postcode }) => {
    if (!isBrowser) return false
    setReverseGeoCode({ city: city, postcode: postcode });
}

export const getCurrentReverseGeocode = () => isBrowser && getReverseGeoCode()

export const getCurrentPosition = (options = {}) => {
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, options);
    });
}