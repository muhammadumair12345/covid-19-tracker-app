import React, { useContext } from 'react';
import { CovidDataContext } from '../context/CovidDataContext';
import InfoCard from './InfoCard';

const CovidStats = () => {
    const {countryInfo}=useContext(CovidDataContext);  

    return (
        <div id="stats" className="covid-stats">
            <InfoCard title="Active Cases" today={countryInfo.todayCases} total={countryInfo.cases}/>
            <InfoCard title="Recoveries" today={countryInfo.todayRecovered} total={countryInfo.recovered}/>
            <InfoCard title="Deaths" today={countryInfo.todayDeaths} total={countryInfo.deaths}/>
        </div>
    )
}

export default CovidStats
