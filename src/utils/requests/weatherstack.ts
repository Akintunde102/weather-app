import Logger from "../logger";
import { mapWeatherDataForDisplay } from "../map-weather-data-for-display";

export interface CityDetails {
    name: string;
    fullName: string;
    coordinates: string;
};

export interface WeatherStackSearchResponse {
    results: { name: string, country: string, lat: string, lon: string, region: string }[];
    error: Record<string, string>
}

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


export const searchForCity = async (cityName: string): Promise<CityDetails[]> => {
    try {
        const response = await fetch(`https://api.weatherstack.com/autocomplete?access_key=${process.env.NEXT_PUBLIC_WEATHER_STACK_ACCESS_KEY}&query=${cityName}`, { cache: 'no-store' });
        const data: WeatherStackSearchResponse = await response.json();

        console.log("re")
        if (data.error) {
            return [];
        }

        return data.results.map(({ name, country, lat, lon }) => {
            return {
                name,
                fullName: `${name}, ${country}`,
                coordinates: `${lat} ${lon}`
            }
        });
    } catch (error) {
        Logger.error('Error fetching weather data:', error);
        throw error;
    }
};



