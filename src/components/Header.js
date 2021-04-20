import React,{useState,useContext} from 'react';
import { HashLink } from 'react-router-hash-link';
import covidlogo from '../images/covidlogo.png';
import {IconButton, MenuItem, Select, Tooltip } from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkedAlt,faChartBar,faTable,faVirus } from '@fortawesome/free-solid-svg-icons';
import { CovidDataContext } from '../context/CovidDataContext';

function Header() {
    const {countries,setCountryData}=useContext(CovidDataContext);
    const [country,setCountry]=useState("global");

    const onCountryChange=async (event)=>{
        const countryCode=event.target.value;
        setCountry(countryCode);
        setCountryData(countryCode);
    }

    return (
        <div className="header">
            <div className="title">
                <h1>C</h1>
                <img src={covidlogo} alt="O" className="logo"/>
                <h1>VID-19 Tracker</h1>
            </div>
            <div className="select">
                <Select variant="outlined" value={country} onChange={onCountryChange} className="country-select">
                    <MenuItem value="global">Global</MenuItem>
                    {countries.map((country,index)=>(
                    <MenuItem key={index} value={country.countryCode}>{country.countryName}</MenuItem>
                    ))}
                </Select>
            </div>
            <div className="navigation">
                <HashLink smooth to='#stats' className="link">
                    <Tooltip title="Card Stats">
                        <IconButton aria-label="show-stats" color="inherit">
                        <FontAwesomeIcon icon={faVirus} /> 
                    </IconButton>
                    </Tooltip>
                </HashLink>     
                <HashLink smooth to='#graph' className="link">
                    <Tooltip title="Chart">
                        <IconButton aria-label="show-chart" color="inherit">
                        <FontAwesomeIcon icon={faChartBar} /> 
                    </IconButton>
                    </Tooltip>
                </HashLink>                
                <HashLink smooth to='#map' className="link">
                    <Tooltip title="Map">
                        <IconButton aria-label="show-map" color="inherit">
                            <FontAwesomeIcon icon={faMapMarkedAlt} />
                        </IconButton>
                    </Tooltip>
                 </HashLink>
                 <HashLink smooth to='/#table' className="link">
                    <Tooltip title="Table">
                        <IconButton aria-label="show-table" color="inherit">
                        <FontAwesomeIcon icon={faTable} />
                        </IconButton>
                    </Tooltip>
                </HashLink>
            </div>
        </div>
    )
}

export default Header
