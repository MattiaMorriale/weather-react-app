import { useState, useEffect } from 'react'
import { weatherData } from '../functions';
import WeatherData from './WeatherData';
import SearchBar from './SearchBar';
import './MainComponent.css'

function MainComponent() {

    const [cityObject, setCityObject] = useState({});
    const [boolean, setBoolean] = useState(false);
    
    const date = new Date();
    const currentDate = date.toLocaleDateString();
    const currentTime = date.getHours() + ':' + date.getMinutes();

    const retrieveData = async (name) => {
      const latitude = name.latitude;
      const longitude = name.longitude

      const calApi = await weatherData(latitude, longitude);
      
      setCityObject(
        {
          cityName: name.name,
          region: name.admin1,
          country: name.country,
          countryCode: name.country_code,
          latitude: name.latitude,
          longitude: name.longitude,
          elevation: name.elevation,
          temp: calApi,
        })
        
        setBoolean(true);
        console.log(cityObject)
      }
      
  return (
    <>
      <div className='p-8 flex justify-between items-center relative'>
        <div>
          <h1 className='text-3xl uppercase text-white font-bold'>React Weather</h1>
        </div>
        <div className='max-w-sm w-full z-10 absolute right-5 top-1/2 -translate-y-1/2'>
            <SearchBar selectedCity={retrieveData}></SearchBar>
        </div>
      </div>

      {boolean &&
        (
          <div className='grid grid-cols-2'>
            <div className='p-5'>
              <div href="#" className="flex justify-between w-full p-6 backdrop-blur-sm border border-white rounded-lg shadow-xl ">
                <div className='p-4 w-1/3'>
                  <h5 className="mb-2 text-2xl font-bold tracking-tight text-white">{cityObject.cityName}, {cityObject.region}, {cityObject.country}</h5>
                  <h4 className='text-white'>Previsione:</h4>
                  <p className='text-white font-bold'>{currentDate} | {currentTime}</p>
                </div>
                <div className='border-x p-4 w-1/3 flex justify-between'>
                  <div>
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-white">{cityObject.temp.current.temperature_2m}°C</h5>
                    <p className="font-normal text-white">Umidità: {cityObject.temp.current.relative_humidity_2m} %</p>
                    <p className="font-normal text-white">Precipitazioni: {cityObject.temp.current.precipitation} %</p>
                  </div>
                  <div>
                    <h5 className="font-bold text-xl text-white text-center">{cityObject.temp.daily.temperature_2m_max[0]}°</h5>
                    <hr />
                    <h5 className="font-bold text-xl text-white text-center">{cityObject.temp.daily.temperature_2m_min[0]}°</h5>
                  </div>
                </div>
                <div className='p-4 w-1/3'>
                  <h5 className="mb-2 text-2xl font-bold tracking-tight text-white">Vento</h5>
                  <p className="font-normal text-white">Velocità: {cityObject.temp.current.wind_speed_10m} Km/h</p>
                  <p className="font-normal text-white">Direzione: {cityObject.temp.current.wind_direction_10m}°</p>
                </div>
              </div>
            </div>
          </div>

        )
      }
      
    </>
  )
}

export default MainComponent
