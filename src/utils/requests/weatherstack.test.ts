import { CitySuggestion, WeatherStackSearchResponse, fetchWeatherData, searchForCity } from './weatherstack';
import { mapWeatherDataForDisplay } from '../map-weather-data-for-display';
import { MOCK_WEATHER_DATA_FROM_API } from '@/test/__mocks__/weather-details';

jest.mock('../map-weather-data-for-display');
global.fetch = jest.fn();

jest.mock('../logger', () => ({
    error: jest.fn(),
}));


describe("weatherStack", () => {

    describe('fetchWeatherData', () => {

        beforeEach(() => {
            (global.fetch as jest.MockedFunction<typeof fetch>).mockResolvedValue({
                json: jest.fn().mockResolvedValue(MOCK_WEATHER_DATA_FROM_API),
            } as any);
        });

        afterEach(() => {
            jest.clearAllMocks();
        });

        it('should fetch weather data for a city and map it correctly', async () => {
            await fetchWeatherData('New York');

            expect(fetch).toHaveBeenCalledWith(
                `https://api.weatherstack.com/current?access_key=${process.env.NEXT_PUBLIC_WEATHER_STACK_ACCESS_KEY}&query=New York`,
                { cache: 'no-store' }
            );

            expect(mapWeatherDataForDisplay).toHaveBeenCalledWith(MOCK_WEATHER_DATA_FROM_API);
        });

        it('should throw an error and log it if fetching weather data fails', async () => {
            const errorMessage = 'Network error';
            (global.fetch as jest.MockedFunction<typeof fetch>).mockRejectedValueOnce(new Error(errorMessage));

            await expect(fetchWeatherData('New York')).rejects.toThrowError(errorMessage);
            expect(mapWeatherDataForDisplay).not.toHaveBeenCalled();
        });
    });


    describe('searchForCity', () => {
        it('returns an array of CitySuggestion', async () => {
            const mockResponse: WeatherStackSearchResponse = {
                results: [
                    { name: 'City1', country: 'Country1', lat: "123", lon: "456", region: "Asia" },
                    { name: 'City2', country: 'Country2', lat: "789", lon: "101", region: "Asia" },
                ]
            };

            (fetch as jest.MockedFunction<typeof fetch>).mockResolvedValueOnce({
                json: jest.fn().mockResolvedValueOnce(mockResponse)
            } as any);

            const citySuggestions: CitySuggestion[] = await searchForCity('CityName');

            expect(citySuggestions).toHaveLength(2);
            expect(citySuggestions).toEqual([
                { name: 'City1', coordinates: '123 456', "fullName": "City1, Country1" },
                { name: 'City2', coordinates: '789 101', "fullName": "City2, Country2", }
            ]);
        });

        it('handles API error', async () => {
            const mockErrorResponse: WeatherStackSearchResponse = {
                error: { code: 404, type: 'not_found', info: 'City not found' },
                results: []
            };

            (fetch as jest.MockedFunction<typeof fetch>).mockResolvedValueOnce({
                json: jest.fn().mockResolvedValueOnce(mockErrorResponse)
            } as any);

            const citySuggestions: CitySuggestion[] = await searchForCity('NonExistentCity');

            expect(citySuggestions).toHaveLength(0);
        });

        it('handles network errors', async () => {
            (fetch as jest.MockedFunction<typeof fetch>).mockRejectedValueOnce(new Error('Network error'));

            await expect(searchForCity('CityName')).rejects.toThrow('Network error');
        });
    });

})

