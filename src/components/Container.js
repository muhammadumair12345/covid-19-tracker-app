import React from 'react';
import '../App.css';
import {BrowserRouter as Router} from "react-router-dom";  
import CovidStats from './CovidStats';
import CovidTable from './CovidTable';
import Graphs from './Graphs';
import Header from './Header';
import Map from './Map';

function Container() {
    return (
        <Router>
            <Header/>
            <div className="section">
                <CovidStats/>
                <Graphs/>
                <Map/>
                <CovidTable/>
            </div>
        </Router>
    )
}

export default Container
