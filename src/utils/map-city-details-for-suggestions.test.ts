import { mapCityDetailsForSuggestions } from "./map-city-details-for-suggestions";
import { WeatherStackSearchResponse, CitySuggestion } from "./requests/weatherstack";

describe('mapCityDetails', () => {
    it('maps WeatherStackSearchResponse to CitySuggestion array', () => {
        const response: WeatherStackSearchResponse = {
            results: [
                { name: 'City1', country: 'Country1', lat: "123", lon: "456", region: "Asia" },
                { name: 'City2', country: 'Country2', lat: "789", lon: "101", region: "Asia" },
            ],
        };

        const cityDetails: CitySuggestion[] = mapCityDetailsForSuggestions(response);

        expect(cityDetails).toHaveLength(2);

        expect(cityDetails).toEqual([
            { name: 'City1', fullName: 'City1, Country1', coordinates: '123 456' },
            { name: 'City2', fullName: 'City2, Country2', coordinates: '789 101' }
        ]);
    });
});