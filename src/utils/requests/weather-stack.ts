import axios, { AxiosResponse } from 'axios';
import Logger from '../logger';

interface WeatherStackLocationRequest {
    type: string;
    query: string;
    language: string;
    unit: string;
}

interface WeatherStackLocationData {
    name: string;
    country: string;
    region: string;
    lat: string;
    lon: string;
    timezone_id: string;
    localtime: string;
    localtime_epoch: number;
    utc_offset: string;
}

export interface WeatherStackCurrentWeather {
    observation_time: string;
    temperature: number;
    weather_code: number;
    weather_icons: string[];
    weather_descriptions: string[];
    wind_speed: number;
    wind_degree: number;
    wind_dir: string;
    pressure: number;
    precip: number;
    humidity: number;
    cloudcover: number;
    feelslike: number;
    uv_index: number;
    visibility: number;
    is_day: "yes" | "no";
}

interface WeatherStackApiResponse {
    request: WeatherStackLocationRequest;
    location: WeatherStackLocationData;
    current: WeatherStackCurrentWeather;
}

export const fetchWeatherData = async (cityNameOrCoordinates: string) => {
    try {
        const response: AxiosResponse<WeatherStackApiResponse> = await axios.get('http://api.weatherstack.com/current', {
            params: {
                access_key: process.env.NEXT_PUBLIC_ACCESS_KEY,
                query: cityNameOrCoordinates
            }
        });

        return response.data.current;
    } catch (error) {
        Logger.error('Error fetching weather data:', error);
        throw error;
    }
};

