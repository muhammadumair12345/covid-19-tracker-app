import React,{useState,useEffect,useContext} from 'react';
import {Bar} from 'react-chartjs-2';
import {Typography} from '@material-ui/core';
import numeral from 'numeral';
import { CovidDataContext } from '../context/CovidDataContext';


function BarGraph() {
    const [barGraphData,setBarGraphData]=useState({});
    const {countryInfo}=useContext(CovidDataContext);  

    useEffect(() => {
        const chart=()=>{
            setBarGraphData({
                labels:["Total Cases","Recoveries","Deaths"],
                datasets: [
                  {
                    data: [countryInfo.cases,countryInfo.recovered,countryInfo.deaths],
                    backgroundColor: ["#f09819","#56ab2f","rgb(165 0 0)"],
                  },
                ],
              });
        }
        chart()
    },[countryInfo])

    return (
        <div>
            <Typography className="bar-graph-title">{countryInfo.country} Total Stats</Typography>
            <Bar
                data={barGraphData}
                options={{
                    legend:{
                        display:false,
                    },
                    scales: {
                        yAxes: [{
                        ticks: {
                            callback: function (value) {
                                return numeral(value).format("0.0a");
                            },
                        }
                        }],
                    }  
                }}
            />
        </div>
    )
}

export default React.memo(BarGraph)
