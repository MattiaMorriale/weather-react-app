import axios from "axios";

const apiUrl = 'https://geocoding-api.open-meteo.com/v1/search?name=';
const apiUrlWeather = 'https://api.open-meteo.com/v1/forecast?';

export const searchCities = async(input) => {
    const resultsData = await  axios.get(`${apiUrl}${input}`);

    return resultsData.data.results || [];
} 

export const weatherData = async(latitude, longitude) => {
    const resultsData = await axios.get(`${apiUrlWeather}latitude=${latitude}&longitude=${longitude}&current=weather_code,temperature_2m,relative_humidity_2m,precipitation,wind_speed_10m,wind_direction_10m&hourly=temperature_2m,weather_code&daily=sunset,sunrise,temperature_2m_max,temperature_2m_min,weather_code,wind_speed_10m_max&timezone=Europe%2FBerlin`)

    return resultsData.data;
}
