import { useState, useEffect } from 'react'
import axios from 'axios'
import './MainComponent.css'

function MainComponent() {

    const [input, setInput] = useState("");
    const [selectedCity, setSelectedCity] = useState([]);
    const [weatherData, setWeatherData] = useState({});

    const apiUrl = 'https://geocoding-api.open-meteo.com/v1/search?name=';
    const apiUrlWeather = 'https://api.open-meteo.com/v1/forecast?';

    let arrayListItems = [];

    const handleChange = (e) => {
      setInput(e.target.value);
      if (input.length >= 3) {
        axios.get(`${apiUrl}${e.target.value}`).then((dataCities) => {
          
          let cities = dataCities.data.results;

          cities.map((name, index) =>
            arrayListItems.push(
              <li key={name.name + index} onClick={searchData} className='px-2.5 hover:bg-slate-200 cursor-pointer'>
                {name.name}, {name.admin1}, {name.country}
              </li>
            ),
          )

          setSelectedCity(arrayListItems)
        })
      }
    };

    const searchData = (e) => {
      let latitudine;
      let longitudine;  

      e.preventDefault();

      axios.get(`${apiUrl}${input}`).then((city) => {
        latitudine = city.data.results[0].latitude;
        longitudine = city.data.results[0].longitude;

        retrieveData(latitudine, longitudine);
      })
      console.log(input);

      setInput("");
    };

    const retrieveData = (latitudine, longitudine) => {
      axios.get(`${apiUrlWeather}latitude=${latitudine}&longitude=${longitudine}&hourly=temperature_2m`).then((temperature) => {
        console.log(temperature)
      })
    };

    

  return (
    <>
      <div className='p-8 flex justify-between items-center bg-slate-400 relative'>
        <div>
          <h1 className='text-3xl uppercase text-white font-bold'>React Weather</h1>
        </div>
        <div className='max-w-sm w-full z-10 absolute right-5 top-1/2 -translate-y-1/2'>
          <form onSubmit={searchData}>
            <div className={input.length >= 3 ? 'bg-white px-2.5 py-2 rounded-t-3xl rounded-bottom  flex flex-col shadow relative' : 'bg-white px-2.5 py-2 rounded-3xl flex flex-col shadow relative'} >
              <div className='flex justify-between'>
                <input type="text" className='py-2.5 ps-3 w-full text-md text-gray-900 bg-transparent appearance-none focus:outline-none focus:ring-0 peer' value={input} onChange={handleChange} placeholder='Search a location'/>
                <button className=' px-3 py-2 rounded-3xl bg-slate-400 text-white font-bold' type='submit'>
                  <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"/>
                  </svg>
                </button>
              </div>
            </div>
          </form>
              {input.length >= 3 && 
              <div className='absolute bg-white w-full rounded-b-3xl slide-bottom py-4 border'>
                <ul>
                  {selectedCity}
                </ul>
              </div>
              }
        </div>
      </div>

{/* ti sei fermato qua... devi stampare le robe... fallo o ti uccido nel sonno */}

      <div className='p-5 grid-rows-1'>
        <div href="#" class="block w-full p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100">
          <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900">{input}</h5>
          <p class="font-normal text-gray-700 dark:text-gray-400">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
        </div>
      </div>
      <div className='p-5 flex gap-5'>
        <div href="#" class="block w-full p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100">
          <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Noteworthy technology acquisitions 2021</h5>
          <p class="font-normal text-gray-700 dark:text-gray-400">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
        </div>
        <div href="#" class="block w-full p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100">
          <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Noteworthy technology acquisitions 2021</h5>
          <p class="font-normal text-gray-700 dark:text-gray-400">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
        </div>
      </div>
    </>
  )
}

export default MainComponent
