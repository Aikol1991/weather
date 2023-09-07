import React, {useState} from 'react';
import axios from 'axios';
import {RiCelsiusLine } from 'react-icons/ri';
import {WiHumidity} from 'react-icons/wi';
import {BsWind} from 'react-icons/bs';
import {BsCloudSun} from 'react-icons/bs';

function App() {
    const [data, setData] = useState({});
    const [location, setLocation] = useState("");

    const url =  `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&lang=en&appid=6a611ace4060caabe388b436a7d85af3`

    const searchLocation = (event) => {
    if (event.key === 'Enter') {
    axios.get(url).then((response) => {
      setData(response.data);
      console.log(response.data)
    })
    setLocation("");
    console.log(data)
  }
}

  return (
    <div className="App">
      <div className='search'>
        <input 
        value={location}
        onChange={(event) => setLocation(event.target.value)}
        onKeyPress={searchLocation}
        placeholder="Type in the city"
        type="text"/>
      </div>
      <div className='container'>
        <div className='top'>
          <div className='location'>
            <h1>{data.name}</h1>
          </div>
          <div className='temp'>
            {data.main ? <h2>{data.main.temp.toFixed()} <RiCelsiusLine/></h2> : null}
          </div>
          <div className='description'>
            {data.weather ? <h3>{data.weather[0].description} <BsCloudSun/></h3> : null}
          </div>
        </div>
        {data.name !== undefined && (
          <div className='bottom'>
            <div className='feels'>
              {data.main ? (
                <p className='bold'>{data.main.feels_like.toFixed()} <RiCelsiusLine/></p>
              ) : null}
              <p>feels_like</p>
            </div>
            <div className='humidity'>
              {data.main ? <p className='bold'>{data.main.humidity} <WiHumidity/></p> : null}
              <p>humidity</p>
            </div>
            <div className='wind'>
              {data.wind ? (
              <p className='bold'>{data.wind.speed.toFixed()} m/s <BsWind/></p> ) : null}
              <p>wind speed</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
