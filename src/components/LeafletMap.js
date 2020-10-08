import React from 'react'
import { Map, TileLayer, Marker, Popup } from 'react-leaflet'

// class LeafletMap extends React.Component {
function LeafletMap(props) {
    const { position, zoom, markers, keyMap } = props;
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
