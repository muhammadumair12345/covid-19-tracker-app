import React, { useContext } from 'react';
import '../App.css';
import 'leaflet/dist/leaflet.css';
import CovidMap from './CovidMap';
import {Card, Typography} from '@material-ui/core';
import { CovidDataContext } from '../context/CovidDataContext';

const Map = () => {
    const {mapCountries,mapCenter,mapZoom,cardState}=useContext(CovidDataContext);

    return (
        <Card id="map" className="map-container">
            <Typography className="map-title">Covid Map</Typography>
            <CovidMap
                countries={mapCountries}
                casesType={cardState}
                center={mapCenter}
                zoom={mapZoom}
            /> 
        </Card>
    )
}

export default Map
