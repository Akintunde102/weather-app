import axios, { AxiosInstance } from 'axios';

interface WeatherRequest {
    apikey: string;
    location: [number, number];
    fields: string[];
    units: string;
    timesteps: string[];
    startTime: string;
    endTime: string;
    timezone: string;
}

interface WeatherResponse {
    data: any;
}


const requestInstance: AxiosInstance = axios.create({
    baseURL: "https://api.tomorrow.io/v4",
    params: {
        apikey: process.env.NEXT_PUBLIC_TOMORROW_IO_API_KEY
    }
});


export const getWeatherRecentHistory = async (cityNameOrCoordinates: string) => {
    try {
        const response = await requestInstance.get("/weather/history/recent", {
            params: {
                location: cityNameOrCoordinates
            }
        });
        return response.data;
    } catch (err) {
        throw err;
    }
}


export const fetchWeatherTimeLineData = async (request: WeatherRequest): Promise<WeatherResponse> => {

    try {
        const response = await requestInstance.get<WeatherResponse>("/timelines", {
            params: {
                ...request
            }
        });
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch weather data: ' + error);
    }
}
