import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import CityCard from './CityCard';
import * as weatherstack from '@/utils/requests/weatherstack';
import '@testing-library/jest-dom'

jest.mock('@/utils/requests/weatherstack', () => ({
    fetchWeatherData: jest.fn(),
}));

describe('CityCard component', () => {
    test('renders correctly with city data', async () => {
        const mockCity = {
            coordinates: '40.7128,-74.0060',
            name: 'New York',
            fullName: 'New York, USA',
            country: 'USA',
            lastTemperature: '20',
            id: '1',
        };
        (weatherstack.fetchWeatherData as jest.Mock).mockResolvedValueOnce({ weather: { temperature: 20 } });

        const mockDeleteCity = jest.fn();
        const mockUpdateCityLastTemperature = jest.fn();

        const { getByText, getByAltText } = render(
            <CityCard
                city={mockCity}
                deleteCity={mockDeleteCity}
                updateCityLastTemperature={mockUpdateCityLastTemperature}
            />
        );

        expect(getByText('New York, USA')).toBeInTheDocument();
        expect(getByText('20')).toBeInTheDocument();
        expect(getByAltText('cancel-icon')).toBeInTheDocument();
        expect(getByAltText('temperature icon')).toBeInTheDocument();

        fireEvent.click(getByAltText('cancel-icon'));
        await waitFor(() => {
            expect(mockDeleteCity).toHaveBeenCalledWith('New York, USA');
        });

        expect(weatherstack.fetchWeatherData).toHaveBeenCalledTimes(1);
        expect(weatherstack.fetchWeatherData).toHaveBeenCalledWith('40.7128,-74.0060');
    });
});
