import {useEffect,useState} from 'react'

const useFetchData = (url) => {
    const [fetchData,setFetchData]=useState([]);

    useEffect(() => {
        const getFetchData = async () => {
            try {
                const response=await fetch("https://disease.sh/v3/covid-19/countries");
                const data=await response.json();
                setFetchData(data);   
            } catch (error) {
                setFetchData([]);   
            }
          };
          getFetchData(); 
    }, [url])
    
    return fetchData;
}

export default useFetchData
