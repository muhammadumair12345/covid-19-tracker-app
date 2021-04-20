import React,{useContext} from 'react';
import LineGraph from './LineGraph';
import {Card} from '@material-ui/core';
import BarGraph from './BarGraph';
import { CovidDataContext } from '../context/CovidDataContext';

const Graphs = () => {
    const {changeGraph}=useContext(CovidDataContext);
    return (
        <Card id="graph" className="graphs-container">
            {
             changeGraph===true?
             <BarGraph/>:
             <LineGraph/>
            }
        </Card>
    )
}

export default Graphs
