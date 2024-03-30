import { useEffect, useState } from 'react'
import Card from './components/Card'
import HistoricalDataList from './components/HistoricalDataList'
import './App.css'

function App() {
  // const [locationSearchInput, setLocationSearchInput] = useState("");
  const [list, setList] = useState(null)
  const [dates, setDates] = useState([]);
  const [maxTemps, setMaxTemps] = useState([]);
  const [minTemps, setMinTemps] = useState([]);
  const [maxMaxtemp, setMaxMaxTemp] = useState(null);
  const [minMintemp, setMinMinTemp] = useState(null);
  const [avgTemp, setAvgTemp] = useState(null);
  const [precip, setPrecip] = useState([]);
  const [dateSearchInput, setDateSearchInput] = useState("");
  const [minPrecipInput, setMinPrecipInput] = useState("");
  const API_KEY = import.meta.env.VITE_APP_API_KEY;


  useEffect(() => {
    const fetchData = async() => {
      const response = await fetch(`https://api.weatherbit.io/v2.0/history/daily?city=Boston&start_date=2024-03-05&end_date=2024-03-28&key=`+API_KEY);
      const json = await response.json();
      setList(json);
    }
    fetchData().catch(console.error);
  },[])

  // const searchLocation = locationSearchValue => {
  //   setLocationSearchInput(locationSearchValue);
  //   if(locationSearchValue!=""){

  //   }
  // }
  const searchDate = locationSearchValue => {
    setDateSearchInput(locationSearchValue);
    if(locationSearchValue!=""){

    }
  }
  const searchMinPrecip = locationSearchValue => {
    setMinPrecipInput(locationSearchValue);
    if(locationSearchValue!=""){

    }
  }

  return (
    <div>
      <h1>Weather Dashboard</h1>
      {/* <div className='location-input-header'>Type in a City or Town name</div>
      <input 
        type="text"
        placeholder="Location"
        onChange={(inputString) => searchLocation(inputString)}
      /> */}

      <div className='card-container'>
        <Card 
          catName="Maximum Temperature"
          catData={maxMaxtemp}
        />
        <Card 
          catName="Minimum Temperature"
          catData={minMintemp}
        />
        <Card 
          catName="Average Temperature"
          catData={avgTemp}
        />
      </div>
      <form className='filter-container'>
        <input 
          type="text"
          placeholder="Search by Date"
          onSubmit={(inputString) => searchDate(inputString)}
        />
        <input
          type="text"
          placeholder="Minimum Precipitation"
          onSubmit={(inputString) => searchMinPrecip(inputString)}
        />
        <button type="submit">Search</button>
      </form>
      <div className='list-container'>
          <HistoricalDataList/>
      </div>
    </div>
  )
}

export default App
