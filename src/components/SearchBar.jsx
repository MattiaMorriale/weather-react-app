import { searchCities } from "../functions";
import { useEffect, useState } from "react";

function SearchBar({selectedCity}) {
    const [input, setInput] = useState("");
    const [cityList, setCityList] = useState([]);
    const [debounce, setDebounce] = useState('');

    useEffect(() => {
      const timer = setTimeout(() => {
        setDebounce(input);
      }, 3000);
      return () => clearTimeout(timer);
    }, [input])

    const handleChange = async (event) => {
        if (event.target.value.length >= 1) {
          setInput(
            event.target.value[0].toUpperCase() + event.target.value.slice(1)
          );
        } else {
          setInput(event.target.value);
        }
        if (event.target.value.length >= 3) {
          const results = await searchCities(event.target.value);
          setCityList(results);
        } else {
          setCityList([]);
        }
      };

    const handleSelect = (city) => {
        setInput('');
        setCityList([]);
        selectedCity(city);
    }


    return (
        <>
        <div className="relative">
            <div className={input.length >= 3 ? 'bg-white px-2.5 py-2 rounded-t-3xl rounded-bottom  flex flex-col shadow-xl' : 'bg-white px-2.5 py-2 rounded-3xl flex flex-col shadow-xl'} >
                <div className='flex justify-between'>
                    <input type="text" className='py-2.5 ps-3 w-full text-md text-gray-900 bg-transparent border-none appearance-none focus:outline-none focus:ring-0 peer' value={input} onChange={handleChange} placeholder='Search a location'/>
                </div>
            </div>
            {input.length >= 3 && cityList.length > 0 && (
                <div className='bg-white w-full rounded-b-3xl slide-bottom py-4 border absolute'>
                    <ul>
                    {cityList.map((city, index) => (
                        <li key={city.name + index} onClick={() => handleSelect(city)} className='px-2.5 hover:bg-slate-200 cursor-pointer'>
                            {city.name}, {city.admin1}, {city.country}
                        </li>
                    ))}
                    </ul>
                </div>
            )}
        </div>
        </>
    )
}

export default SearchBar;