import { CitySuggestion, WeatherStackSearchResponse } from "./requests/weatherstack";

export const mapCityDetailsForSuggestions = (response: WeatherStackSearchResponse): CitySuggestion[] => {
    if (response.error) {
        return [];
    }

    return response.results.map(({ name, country, lat, lon }) => {
        return {
            name,
            fullName: `${name}, ${country}`,
            coordinates: `${lat} ${lon}`
        };
    });
};
