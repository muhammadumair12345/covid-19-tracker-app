import React, { useEffect,useState, createContext } from 'react'
import useFetchData from '../customhooks/useFetchData';
import AnimatedNumber from "animated-number-react";
import numeral from 'numeral';

export const CovidDataContext=createContext();

export const CovidDataProvider=({children})=>{
    const [countryInfo,setCountryInfo]=useState({});
    const [mapCountries,setMapCountries]=useState([]);
    const [countries,setCountries]=useState([]);
    const [tableData,setTableData]=useState([]);
    const [mapCenter,setMapCenter]=useState([34.80746,-100.4796]);
    const [mapZoom,setMapZoom]=useState(3);
    const [changeGraph,setChangeGraph]=useState(false);
    const [cardState,setCardState]=useState("cases");

    const fetchCountries=useFetchData("https://disease.sh/v3/covid-19/countries");

    useEffect(() => {
        fetch("https://disease.sh/v3/covid-19/all").
        then(response=>response.json()).
        then(data=>setCountryInfo(data))
      }, [])  

    useEffect(() => {
        const countriesData=fetchCountries.map((country) => ({
            countryName: country.country,
            countryCode: country.countryInfo.iso2,
        }));
        setCountries(countriesData);
        setMapCountries(fetchCountries);
        setTableData(sortData(fetchCountries));
    }, [fetchCountries])

    const setCountryData=async (countryCode)=>{
        const url=countryCode==="global"?"https://disease.sh/v3/covid-19/all":
        `https://disease.sh/v3/covid-19/countries/${countryCode}`;
        countryCode==="global"?setChangeGraph(false):setChangeGraph(true);
        try {
            const response=await fetch(url);
            const data=await response.json();
            setCountryInfo(data);
            if(countryCode!=="global")
            {
                setMapCenter([data.countryInfo.lat,data.countryInfo.long]);
                setMapZoom(4); 
            } 
            else{
                setMapCenter([34.80746,-100.4796]);
                setMapZoom(3); 
            }
        } catch (error) {
            setCountryInfo({});   
        }
    }

    const changeCard=(title)=>{
        setCardState(title==="Recoveries"?"recovered":
        title==="Deaths"?"deaths":"cases");
    }

    const animateNumber=(number)=>{
        return <AnimatedNumber value={number} formatValue={n=>numeral(n).format("0,0")}/>
    }

    const sortData=(data)=>{
        const sortedData=[...data]
        return sortedData.sort((a,b)=>a.cases>b.cases?-1:1);
    }

    return(
        <CovidDataContext.Provider value={{
            countries,countryInfo,cardState
            ,changeGraph,mapCountries,
            mapCenter,mapZoom,tableData,
            changeCard,setCountryData,animateNumber}}>
            {children}
        </CovidDataContext.Provider>
    );
}
