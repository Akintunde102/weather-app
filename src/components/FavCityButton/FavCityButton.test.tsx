import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import FavCityButton from './FavCityButton';
import { useFavouriteCityStore } from '@/store/cities';
import { MOCK_WEATHER_DATA_FOR_DISPLAY } from '@/test/__mocks__/weather-details';

jest.mock('@/store/cities', () => ({
    useFavouriteCityStore: jest.fn(),
}));

describe('FavCityButton component', () => {

    test('renders loading icon when favState is undefined', () => {
        (useFavouriteCityStore as any).mockReturnValue({
            isCityPresent: jest.fn(),
            addCity: jest.fn(),
            deleteCity: jest.fn(),
            cities: [],
        });

        render(<FavCityButton weatherDetails={MOCK_WEATHER_DATA_FOR_DISPLAY} />);

        const { getByTestId } = screen;

        expect(getByTestId('loading-icon')).toBeInTheDocument();
    });

    test('renders filled star when favState is true', () => {
        (useFavouriteCityStore as any).mockReturnValue({
            isCityPresent: jest.fn(() => true),
            addCity: jest.fn(),
            deleteCity: jest.fn(),
            cities: [],
        });

        render(<FavCityButton weatherDetails={MOCK_WEATHER_DATA_FOR_DISPLAY} />);

        const { getByAltText } = screen;
        expect(getByAltText('favorited star icon')).toBeInTheDocument();
    });

    test('renders empty star when favState is false', () => {
        (useFavouriteCityStore as any).mockReturnValue({
            isCityPresent: jest.fn(() => false),
            addCity: jest.fn(),
            deleteCity: jest.fn(),
            cities: [],
        });

        render(<FavCityButton weatherDetails={MOCK_WEATHER_DATA_FOR_DISPLAY} />);
        const { getByAltText } = screen;
        expect(getByAltText('star icon')).toBeInTheDocument();
    });

    test('calls addCity when clicking on empty star', () => {
        const addCityMock = jest.fn();
        (useFavouriteCityStore as any).mockReturnValue({
            isCityPresent: jest.fn(() => false),
            addCity: addCityMock,
            deleteCity: jest.fn(),
            cities: [],
        });

        render(<FavCityButton weatherDetails={MOCK_WEATHER_DATA_FOR_DISPLAY} />);

        const { getByAltText } = screen;
        fireEvent.click(getByAltText('star icon'));

        expect(addCityMock).toHaveBeenCalled();
    });

    test('calls deleteCity when clicking on filled star', () => {
        const deleteCityMock = jest.fn();
        (useFavouriteCityStore as any).mockReturnValue({
            isCityPresent: jest.fn(() => true),
            addCity: jest.fn(),
            deleteCity: deleteCityMock,
            cities: [],
        });

        render(<FavCityButton weatherDetails={MOCK_WEATHER_DATA_FOR_DISPLAY} />);

        const { getByAltText } = screen;
        fireEvent.click(getByAltText('favorited star icon'));

        expect(deleteCityMock).toHaveBeenCalled();
    });
});
