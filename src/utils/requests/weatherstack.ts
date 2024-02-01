import { generateRandomNumber } from "../generate-random-number";
import Logger from "../logger";
import { mapWeatherDataForDisplay } from "../map-weather-data-for-display";

export const fetchWeatherData = async (cityNameOrCoordinates: string) => {
    try {
        // const response = await fetch(`http://api.weatherstack.com/current?access_key=${process.env.NEXT_PUBLIC_WEATHER_STACK_ACCESS_KEY}&query=${cityNameOrCoordinates}`, { cache: 'no-store' });
        // const data = await response.json();

        const promiseDelay = generateRandomNumber(1000, 4000);

        const mockData = {
            "request": {
                "type": "LatLon",
                "query": "Lat -23.55 and Lon -46.64",
                "language": "en",
                "unit": "m"
            },
            "location": {
                "name": "Sao Paulo",
                "country": "Brazil",
                "region": "Sao Paulo",
                "lat": "-23.533",
                "lon": "-46.617",
                "timezone_id": "America\/Sao_Paulo",
                "localtime": "2024-01-30 05:28",
                "localtime_epoch": 1706592480,
                "utc_offset": "-3.0"
            },
            "current": {
                "observation_time": "08:28 AM",
                "temperature": generateRandomNumber(-10, 40),
                "weather_code": 113,
                "weather_icons": [
                    "https:\/\/cdn.worldweatheronline.com\/images\/wsymbols01_png_64\/wsymbol_0008_clear_sky_night.png"
                ],
                "weather_descriptions": [
                    "Clear"
                ],
                "wind_speed": 4,
                "wind_degree": 340,
                "wind_dir": "NNW",
                "pressure": 1015,
                "precip": 0,
                "humidity": 83,
                "cloudcover": 0,
                "feelslike": 20,
                "uv_index": 1,
                "visibility": 10,
                "is_day": "no"
            }
        }

        const data = await (() => new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(mockData);
            }, promiseDelay);
        }))();

        return mapWeatherDataForDisplay(data);
    } catch (error) {
        Logger.error('Error fetching weather data:', error);
        throw error;
    }
};