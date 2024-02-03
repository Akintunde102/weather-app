import { MOCK_WEATHER_DATA_FROM_API } from '@/test/__mocks__/weather-details';
import { mapWeatherDataForDisplay } from './map-weather-data-for-display';

describe('mapWeatherDataForDisplay', () => {
    it('should map weather data correctly', () => {
        const mappedData = mapWeatherDataForDisplay(MOCK_WEATHER_DATA_FROM_API);

        expect(mappedData.weather.feelsLike).toBe(8);
        expect(mappedData.weather.pressure).toBe(1010);
        expect(mappedData.weather.precipitation).toBe(0);
        expect(mappedData.weather.temperature).toBe(10);
        expect(mappedData.weather.uvIndex).toBe(5);
        expect(mappedData.weather.wind.speed).toBe(15);
        expect(mappedData.weather.wind.dir).toBe('S');
        expect(mappedData.weather.wind.degree).toBe(180);
        expect(mappedData.weather.description).toBe('Sunny');
        expect(mappedData.weather.is_day).toBe('yes');
        expect(mappedData.weather.note).toBe('Today, expect a day with temperatures reaching a maximum of 10°C.');
        expect(mappedData.weather.visibility).toBe(10);
        expect(mappedData.weather.humidity).toBe(50);

        expect(mappedData.location.country).toBe('United States');
        expect(mappedData.location.region).toBe('New York');
        expect(mappedData.location.exact).toBe('New York');
        expect(mappedData.location.fullName).toBe('New York, New York, United States');
        expect(mappedData.location.coordinates).toBe('40.7128 -74.0060');

        expect(mappedData.time).toBe('2022-02-04 12:00');
    });
});
