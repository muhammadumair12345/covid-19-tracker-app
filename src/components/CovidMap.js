import React from 'react';
import '../App.css';
import {MapContainer,MapConsumer,TileLayer,Circle,Popup} from "react-leaflet";
import numeral from 'numeral';

const casesTypeColors={
    cases:{
        hex:"#f09819",
        multiplyer:400,
    },
    recovered:{
        hex:"#56ab2f",
        multiplyer:800,
    },
    deaths:{
        hex:"rgb(165 0 0)",
        multiplyer:1200,
    }
}

function CovidMap({countries,casesType,center,zoom}) {
      
    return (
        <MapContainer className="map">
            <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <MapConsumer>
                {(map) => {
                map.setView(center,zoom);
                return null
                }}
            </MapConsumer>
            {countries.map((country,index)=>(
                <Circle
                    key={index}
                    center={[country.countryInfo.lat,country.countryInfo.long]}
                    fillOpacity={0.4}
                    pathOptions={{ 
                        color:casesTypeColors[casesType].hex,
                        fillColor:casesTypeColors[casesType].hex 
                    }}
                    radius={
                    Math.sqrt(country[casesType])*casesTypeColors[casesType].multiplyer}>
                    <Popup>
                        <div className="info-container">
                            <div className="info-image" style={{backgroundImage:`url(${country.countryInfo.flag})`}}>
                            </div>
                            <div className="info-name">{country.country}</div>
                            <div className="info-cases">Cases: {numeral(country.cases).format("0,0")}</div>
                            <div className="info-recovered">Recovered: {numeral(country.recovered).format("0,0")}</div>
                            <div className="info-deaths">Deaths: {numeral(country.deaths).format("0,0")}</div>
                        </div>
                    </Popup>
                </Circle>
            ))}
        </MapContainer>
    )
}

export default React.memo(CovidMap)
