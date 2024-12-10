import './Accordion.css';
import { useState } from 'react';

function Accordion({DayForecastHourly,  DayForecastTimes, DayForecastDaily, DayForecastCodes, DayForecastWind, WeatherCode}) {

    const [isActiveIndex, setIsActiveIndex] = useState(null);

    let staticSvg = "src/assets/static/";

    const Day = [
        'Domenica',
        'Lunedì',
        'Martedì',
        'Mercoledì',
        'Giovedì',
        'Venerdì',
        'Sabato',
    ]

    const inconWeatherCode = (code) => {
      return staticSvg + WeatherCode[code].icon
    }

    const getDay = (date) => {
        const newDay = new Date(date).getDate();
        const currentDay = new Date().toISOString();
        const currentDate = new Date(currentDay).getDate();

        if(newDay === currentDate) {
            return 'Oggi';
        } else {
            const newDate = new Date(date);
            return Day[newDate.getDay()];
        }
    }

    const date = (date) => {
        const newDate = new Date(date);
        let final = newDate.getHours();

        if(final < 10) {
            final = '0' + final;
        }

        return (final + ':00')
    }


    const showRow = (e) => {

        const targetId = e.currentTarget.id;

        setIsActiveIndex(targetId === isActiveIndex  ? null : targetId );

    }

    // riprendi da qua quello che devi sistemare ovvero, le classi dell'accordion 


return (
    <>

        <div className='flex flex-col items-center backdrop-blur-sm border border-white rounded-lg'>
            <h1 className='text-white font-semibold text-xl py-9'>Prevsioni per 7 giorni</h1>
            <div  className='flex items-center justify-between w-full p-4 text-white font-medium'>
                <div className='w-1/4'>
                    <h2>Giorni</h2>
                </div>
                <div className='w-1/4 text-center'>
                    <h2>Previsioni</h2>
                </div>
                <div className='flex w-1/4 justify-center'>
                    <h2>Min e Max</h2>
                </div>
                <div className='w-1/4 text-end hidden sm:block'>
                    <h2>Vento</h2>
                </div>
            </div>
            {DayForecastTimes.map((forecastTimes, i) => (
                <div className='w-full' key={i + 1}>
                    <div id={'active' + i} className={isActiveIndex === 'active' + i ? "overflow-hidden border flex items-center justify-between w-full p-4 font-medium rtl:text-right text-gray-500 border-white backdrop-blur-sm  bg-gray-50 cursor-pointer" : "overflow-hidden flex items-center justify-between w-full p-4 font-medium rtl:text-right text-white gap-3  cursor-pointer" } onClick={showRow}>
                        <div className='w-1/4'>
                            <h2>{getDay(forecastTimes[i])}</h2>
                        </div>
                        <div className='w-1/4 flex justify-center items-center'>
                            <img className='h-7' src={inconWeatherCode(DayForecastWind.weather_code[i])}/>
                        </div>
                        <div className='flex w-1/4 justify-center'>
                            <h2>{DayForecastWind.temperature_2m_min[i].toFixed(0)}°</h2>
                            <span className='px-1'>|</span>
                            <h2>{DayForecastWind.temperature_2m_max[i].toFixed(0)}°</h2>
                        </div>
                        <div className='w-1/4 text-end hidden sm:block'>
                            <h2>{DayForecastWind.wind_speed_10m_max[i]} Km/h</h2>
                        </div>
                    </div>
                  
                    <div className={isActiveIndex === 'active' + i ? "border border-white accordion-slide-bottom backdrop-blur-sm rounded-b-lg" : "border border-white accordion-slide-bottom-hidden backdrop-blur-sm overflow-hidden rounded-b-lg " }>
                        <div className='sm:hidden px-5 pt-5 text-white'>
                            <h2 className='text-xl'><span className='font-bold'>Vento</span>: {DayForecastWind.wind_speed_10m_max[i]} Km/h</h2>
                        </div>
                        <div className="p-5 flex flex-col flex-wrap overflow-x-scroll">
                            <div className='flex justify-start gap-5 text-white'>
                                {DayForecastHourly[i].map((forecastHours, ind) => (
                                    <div key={ind + 1} className='flex flex-col items-center mx-1 text-white'>
                                        <span className='select-none text-sm'>{date(forecastTimes[ind])}</span>
                                        <img src={inconWeatherCode(DayForecastCodes[i][ind])} className='h-5 my-2' />
                                        <span className='select-none text-xl font-semibold'>{forecastHours.toFixed(0)}°</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
        
    </>
)

}

export default Accordion;