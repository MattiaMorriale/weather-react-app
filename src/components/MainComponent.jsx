import { useState, useEffect } from 'react'
import { weatherData } from '../functions';
import WeatherData from './WeatherData';
import SearchBar from './SearchBar';
import Accordion from './Accordion';
import './MainComponent.css'

function MainComponent() {

  const weatherConditions = {
    0: {
      description: "Cielo Sereno",
      icon: "clear-day.svg",
    },

    1: {
      description: "Principalmente Sereno",
      icon: "clear-day.svg",
    },
    2: {
      description: "Parzialmente nuvoloso",
      icon: "cloudy-1-day.svg",
    },
    3: {
      description: "Coperto",
      icon: "cloudy.svg",
    },
    45: {
      description: "Nebbia",
      icon: "fog.svg",
    },

    48: {
      description: "Nebbia ghiacciata",
      icon: "depositing-rain-fog.svg",
    },
    51: {
      description: "Pioggia leggera",
      icon: "rainy-1-day.svg",
    },
    53: {
      description: "Pioggia moderata",
      icon: "rainy-2-day.svg",
    },
    55: {
      description: "Pioggia intensa",
      icon: "rainy-3-day.svg",
    },

    56: {
      description: "Pioggia gelata leggera",
      icon: "rain-and-sleet-mix.svg",
    },

    57: {
      description: "Pioggia gelata intensa",
      icon: "rain-and-sleet-mix.svg",
    },

    61: {
      description: "Pioggia leggera",
      icon: "rainy-1.svg",
    },

    63: {
      description: "Pioggia moderata",
      icon: "rainy-2.svg",
    },

    65: {
      description: "Pioggia intensa",
      icon: "rainy-3.svg",
    },

    66: {
      description: "Pioggia gelata leggera",
      icon: "rain-and-snow-mix.svg",
    },

    67: {
      description: "Pioggia gelata intensa",
      icon: "rain-and-snow-mix.svg",
    },

    71: {
      description: "Neve leggera",
      icon: "snowy-1.svg",
    },

    73: {
      description: "Neve moderata",
      icon: "snowy-2.svg",
    },

    75: {
      description: "Neve intensa",
      icon: "snowy-3.svg",
    },

    77: {
      description: "Grani di neve",
      icon: "snowy-3.svg",
    },

    80: {
      description: "Rovesci di pioggia leggera",
      icon: "rainy-3.svg",
    },

    81: {
      description: "Rovesci di pioggia moderata",
      icon: "rainy-3.svg",
    },
    82: {
      description: "Rovesci di pioggia intensa",
      icon: "rainy-3.svg",
    },

    85: {
      description: "Rovesci di neve leggera",
      icon: "snowy-1-day.svg",
    },

    86: {
      description: "Rovesci di neve intensa",
      icon: "snowy-3.svg",
    },

    95: {
      description: "Temporale con pioggia leggera o moderata",
      icon: "thunderstorms.svg",
    },

    96: {
      description: "Temporale con grandine leggera",
      icon: "thunderstorms.svg",
    },

    99: {
      description: "Temporale con grandine intensa",
      icon: "hail.svg",
    },
  };

    let animatedSvg = "src/assets/animated/";
    let staticSvg = "src/assets/static/";

    const [cityObject, setCityObject] = useState({});
    const [boolean, setBoolean] = useState(false);
    
    const date = new Date();
    let final = date.getMinutes();

    if(final < 10) {
      final = '0' + final;
    }

    const currentDate = date.toLocaleDateString();
    
    const arrayTemps = [];
    const arrayTimes = [];
    const arrayCodes = [];

    const inconAnimWeatherCode = (code) => {
      return animatedSvg + weatherConditions[code].icon
    }

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
      
      const dateHour = (date) => {
        const newDate = new Date(date);
        let final = newDate.getHours() + ':' + newDate.getMinutes();

        return (final)
    }


      let condition; 

      if(boolean === false) {
        condition = (
          <div className='-mt-32 flex justify-center items-center h-full w-full'>
            <img className=' w-48' src="weather_p.png" alt="#" />
          </div>

        );
      } else {
        condition = (
            <>
              <div className=' grid lg:grid-cols-2 grid-cols-1'>
                <div className='p-5 flex flex-col gap-10'>
                  <div href="#" className="flex justify-between w-full p-6 backdrop-blur-sm border border-white rounded-lg shadow-xl ">
                    <div className='w-full flex'>
                      <div className='w-full flex justify-between gap-10'>
                        <div className='flex flex-col justify-between'>  
                          <div className='flex flex-col justify-between h-full'>
                            <div className='flex gap-5 mb-3'>
                              <h5 className="text-8xl font-bold text-white">{cityObject.temp.current.temperature_2m.toFixed(0)}°</h5>
                              <div className='hidden md:flex flex-col items-center justify-end gap-1'>
                                <h5 className="font-bold text-3xl text-white text-center">{cityObject.temp.daily.temperature_2m_max[0].toFixed(0)}°</h5>
                                <hr className='border w-full'/>
                                <h5 className="font-bold text-3xl text-white">{cityObject.temp.daily.temperature_2m_min[0].toFixed(0)}°</h5>
                              </div>
                            </div>
                            <h5 className="mb-2 ps-2.5 text-2xl font-bold tracking-tight text-white uppercase">{cityObject.cityName}</h5>
                            <div className='ps-2.5 '>
                              <h4 className='text-white'>Previsione:</h4>
                              <p className='text-white font-bold'>{currentDate}</p>
                            </div>
                          </div>
                        </div>
                        <div className='w-full flex justify-end'>
                          <img src={inconAnimWeatherCode(cityObject.temp.current.weather_code)} className='w-52 h-52' />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div href="#" className="gap-y-5 flex flex-wrap justify-center w-full p-6 backdrop-blur-sm border border-white rounded-lg shadow-xl ">
                    <div className='w-1/2 flex justify-center md:border-e-0 p-3'>
                      <div>
                      <h5 className="mb-2 text-2xl font-bold tracking-tight text-white">Dettagli</h5>
                        <p className="font-normal text-white">Umidità: {cityObject.temp.current.relative_humidity_2m} %</p>
                        <p className="font-normal text-white">Precipitazioni: {cityObject.temp.current.precipitation} %</p>
                      </div>
                    </div>
                    <div className='w-1/2 flex justify-center p-3'>
                    <div>
                      <h5 className="mb-2 text-2xl font-bold tracking-tight text-white">Vento</h5>
                      <p className="font-normal text-white">Velocità: {cityObject.temp.current.wind_speed_10m} <span className='text-smç'>Km/h</span></p>
                      <p className="font-normal text-white">Direzione: {cityObject.temp.current.wind_direction_10m}°</p>
                    </div>
                    </div>
                    <div className='w-full flex flex-wrap justify-around border-t p-3'>
                      <div className='text-white flex flex-col items-center justify-between'>
                        <img className='h-16' src={staticSvg + 'sunrise.png'} />
                        <p>{dateHour(cityObject.daily.sunrise[0])}</p>
                      </div>
                      <div className='text-white flex flex-col items-center justify-between'>
                        <img className='h-16' src={staticSvg + 'sunset.png'} />
                        <p>{dateHour(cityObject.daily.sunset[0])}</p>
                      </div>
                    </div>
                  </div>

                </div>
                <div className='p-5'>
                  <Accordion WeatherCode={weatherConditions} DayForecastWind={cityObject.daily} DayForecastCodes={cityObject.arrayCodes} DayForecastHourly={cityObject.arrayTemps} DayForecastTimes={cityObject.arrayTimes} DayForecastDaily={cityObject.temp.daily}></Accordion>
                </div>
              </div>
            </>
          );
      }
      
  return (
    <>
      <div className='p-8 flex justify-between items-center'>
        <div className='hidden md:block'>
          <img className='filter invert' src="weather_p.png" alt="#" />
        </div>
        <div className='w-full md:max-w-sm z-10 '>
            <SearchBar selectedCity={retrieveData}></SearchBar>
        </div>
      </div>
      {condition}
    </>
  )
}

export default MainComponent
