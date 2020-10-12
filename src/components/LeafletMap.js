import React, { useEffect } from 'react'
import { Map, TileLayer, Marker, Popup } from 'react-leaflet'
import Leaflet from 'leaflet';

function LeafletMap(props) {
    const { position, zoom, markers, keyMap } = props;
    useEffect(() => {
        Leaflet.Icon.Default.imagePath = '../node_modules/leaflet'

        delete Leaflet.Icon.Default.prototype._getIconUrl;

        Leaflet.Icon.Default.mergeOptions({
            iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
            iconUrl: require('leaflet/dist/images/marker-icon.png'),
            shadowUrl: require('leaflet/dist/images/marker-shadow.png')
        });
    }, []);

    const formatPhoneNumber = (phoneNumberString) => {
        let cleaned = ('' + phoneNumberString).replace(/\D/g, '')
        var match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/)
        if (match) {
            var intlCode = (match[1] ? '+1 ' : '')
            return [intlCode, '(', match[2], ') ', match[3], '-', match[4]].join('')
        }
        return null
    }

    return (
        <Map center={position} zoom={zoom} key={keyMap}>
            <TileLayer
                url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
                attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
            />
            {(markers && markers.length > 0) && markers.map((datapoint, index) => <Marker position={datapoint.position} key={index}>
                <Popup>
                    <div>
                        <address>
                            {datapoint.markerText}<br />
                            {datapoint.address.houseNumber && datapoint.address.houseNumber} {datapoint.address.street}<br />
                            {`${datapoint.address.city}, ${datapoint.address.stateCode} ${datapoint.address.postalCode}`}<br />
                            {datapoint.contacts[0].phone[0].value && <a href={`tel:${datapoint.contacts[0].phone[0].value}`}>{formatPhoneNumber(datapoint.contacts[0].phone[0].value)}</a>}
                        </address>
                    </div>
                </Popup>
            </Marker>)}
        </Map>
    );
}
export default LeafletMap
