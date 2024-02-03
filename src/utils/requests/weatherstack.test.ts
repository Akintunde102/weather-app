import { fetchWeatherData } from './weatherstack';
import { mapWeatherDataForDisplay } from '../map-weather-data-for-display';
import { MOCK_WEATHER_DATA_FROM_API } from '@/test/__mocks__/weather-details';

jest.mock('../map-weather-data-for-display');
global.fetch = jest.fn();

jest.mock('../logger', () => ({
    error: jest.fn(),
}));


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
