import Logger from "../logger";
import { mapWeatherDataForDisplay } from "../map-weather-data-for-display";

export const fetchWeatherData = async (cityNameOrCoordinates: string) => {
    try {
        const response = await fetch(`https://api.weatherstack.com/current?access_key=${process.env.NEXT_PUBLIC_WEATHER_STACK_ACCESS_KEY}&query=${cityNameOrCoordinates}`, { cache: 'no-store' });
        const data = await response.json();
        return mapWeatherDataForDisplay(data as any);
    } catch (error) {
        Logger.error('Error fetching weather data:', error);
        throw error;
    }
};