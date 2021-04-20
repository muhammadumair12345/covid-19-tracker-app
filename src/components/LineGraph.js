import React,{useState,useEffect} from 'react';
import {Line} from 'react-chartjs-2';
import {Typography} from '@material-ui/core';
import numeral from 'numeral';


function LineGraph() {
    const [lineGraphData,setLineGraphData]=useState({});

    const chart=({cases,deaths,recovered})=>{
        let casesOf = [];
        let deathsOf=[];
        let recoveredOf=[];
        let datesOf=[];

        for(let properties in cases){
            datesOf.push(properties);
            casesOf.push(cases[properties]);
        }

        for(let properties in deaths){
            deathsOf.push(deaths[properties]);
        }

        for(let properties in recovered){
            recoveredOf.push(recovered[properties]);
        }

        setLineGraphData({
            labels:datesOf,
            datasets: [
              {
                label: "Active Cases",
                data: casesOf,
                fill: false,
                borderColor: "#f09819",
              },
              {
                label: "Recoveries",
                data: recoveredOf,
                fill: false,
                borderColor: "#56ab2f",
              },
              {
                label: "Deaths",
                data: deathsOf,
                fill: false,
                borderColor: "rgb(165 0 0)",
              }
            ],
          });
    }

    useEffect(() => {
        const getHistoricalData=async ()=>{
            const response=await fetch("https://disease.sh/v3/covid-19/historical/all?lastdays=120");
            const data=await response.json();
            chart(data)
          }
          getHistoricalData();

    }, [])
    return (
        <div>
            <Typography className="line-graph-title">Global Total Stats</Typography>
            <Line 
              data={lineGraphData}
              options={ {
                legend: {
                  display:false,
                  align:'start',
                  position:'left',
                  labels: {
                    boxWidth:15,
                    fontFamily:"Helvetica",
                  }
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

export default React.memo(LineGraph)
