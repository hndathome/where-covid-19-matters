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

    return (
        <Map center={position} zoom={zoom} key={keyMap}>
            <TileLayer
                url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
                attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
            />

            {(markers && markers.length > 0) && markers.map((datapoint, index) => <Marker position={datapoint.position} key={index}>
                <Popup>{datapoint.markerText}</Popup>
            </Marker>)}

        </Map>
    );
}
export default LeafletMap
