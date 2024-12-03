import { useState, useEffect } from 'react'
import { weatherData } from '../functions';
import WeatherData from './WeatherData';
import SearchBar from './SearchBar';
import Accordion from './Accordion';
import './MainComponent.css'

function MainComponent() {

    let animatedSvg = "src/assets/animated/";

    const [cityObject, setCityObject] = useState({});
    const [boolean, setBoolean] = useState(false);
    
    const date = new Date();
    let final = date.getMinutes();

    if(final < 10) {
      final = '0' + final;
    }

    const currentDate = date.toLocaleDateString();
    const currentTime = date.getHours() + ':' + final;
    
    const arrayTemps = [];
    const arrayTimes = [];
    const arrayCodes = [];

    const retrieveData = async (name) => {
      const latitude = name.latitude;
      const longitude = name.longitude
      

      const calApi = await weatherData(latitude, longitude);

      const newArray = calApi.hourly.temperature_2m;
      const newArrayTimes = calApi.hourly.time;
      const newArrayCodes = calApi.hourly.weather_code;
      
      for (let i = 0; i < 7; i++) {
      arrayTemps.push(newArray.splice(0, 24));
      arrayTimes.push(newArrayTimes.splice(0, 24));
      arrayCodes.push(newArrayCodes.splice(0, 24));
      }
      
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
          daily: calApi.daily,
          arrayCodes: arrayCodes,
          arrayTemps: arrayTemps,
          arrayTimes: arrayTimes,
        })
        

        setBoolean(true);
        console.log(cityObject, arrayTemps, arrayTimes, calApi)
      }

      let condition; 

      if(boolean === false) {
        condition = (
          <div className='my-24 w-full'>
            <h5 className='text-center text-white uppercase font-bold text-3xl'>Cerca una Città per avere le informazioni metereologiche!</h5>
          </div>

        );
      } else {
        condition = (
            <>
              <div className='grid grid-cols-2'>
                <div className='p-5 grid grid-rows-2 gap-5'>

                  <div href="#" className="flex justify-between w-full p-6 backdrop-blur-sm border border-white rounded-lg shadow-xl ">
                    <div className='p-4 w-full flex'>
                      <div className='w-full flex justify-between gap-10'>
                        <div className='flex flex-col justify-between'>  
                          <div>
                            <h5 className="mb-2 text-2xl font-bold tracking-tight text-white uppercase">{cityObject.cityName}, {cityObject.region}, {cityObject.country}</h5>
                            <h4 className='text-white'>Previsione:</h4>
                            <p className='text-white font-bold'>{currentDate} | {currentTime}</p>
                            <div className='flex gap-5'>
                              <h5 className="text-8xl font-bold tracking-tight text-white">{cityObject.temp.current.temperature_2m}°C</h5>
                              <div className='flex flex-col items-center justify-end gap-1'>
                                <h5 className="font-bold text-3xl text-white text-center">{cityObject.temp.daily.temperature_2m_max[0]}°</h5>
                                <hr className='border w-full'/>
                                <h5 className="font-bold text-3xl text-white">{cityObject.temp.daily.temperature_2m_min[0]}°</h5>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className='w-full flex justify-end'>
                          <img src={animatedSvg + 'cloudy-1-day.svg'} className='w-52 h-52' />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div href="#" className="flex justify-between w-full p-6 backdrop-blur-sm border border-white rounded-lg shadow-xl ">
                    <div className='p-4 w-1/3 flex justify-between'>
                      <div>
                        <p className="font-normal text-white">Umidità: {cityObject.temp.current.relative_humidity_2m} %</p>
                        <p className="font-normal text-white">Precipitazioni: {cityObject.temp.current.precipitation} %</p>
                      </div>
                    </div>
                    <div className='p-4 w-1/3'>
                      <h5 className="mb-2 text-2xl font-bold tracking-tight text-white">Vento</h5>
                      <p className="font-normal text-white">Velocità: {cityObject.temp.current.wind_speed_10m} Km/h</p>
                      <p className="font-normal text-white">Direzione: {cityObject.temp.current.wind_direction_10m}°</p>
                    </div>
                  </div>

                </div>
                <div className='p-5'>
                  <Accordion DayForecastWind={cityObject.daily} DayForecastCodes={cityObject.arrayCodes} DayForecastHourly={cityObject.arrayTemps} DayForecastTimes={cityObject.arrayTimes} DayForecastDaily={cityObject.temp.daily}></Accordion>
                </div>
              </div>
            </>
          );
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
      {condition}
    </>
  )
}

export default MainComponent
