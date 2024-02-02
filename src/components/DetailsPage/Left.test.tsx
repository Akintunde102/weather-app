import React from 'react';
import { render } from '@testing-library/react';
import LeftDetails from './Left';
import { WeatherDataForDisplay } from '@/utils/map-weather-data-for-display';
import { MOCK_WEATHER_DETAILS } from '@/test/__mocks__/weather-details';

jest.mock('@/components/FavCityButton/FavCityButton', () => () => <div data-testid="fav-city-button"></div>);

describe('LeftDetails component', () => {

    test('renders weather details correctly', () => {


        const { getByText, getByAltText, getByTestId } = render(
            <LeftDetails weatherDetails={MOCK_WEATHER_DETAILS} />
        );

        expect(getByText('Queens, New York, USA')).toBeInTheDocument();
        expect(getByText('25')).toBeInTheDocument();
        expect(getByText('Feels like')).toBeInTheDocument();
        expect(getByText('Precipitation is currently at 0')).toBeInTheDocument();
        expect(getByText('Pressure: 1015 atm')).toBeInTheDocument();
        expect(getByAltText('location icon')).toBeInTheDocument();
        expect(getByTestId('fav-city-button')).toBeInTheDocument();
    });

    test('matches snapshot', () => {

        const { container } = render(
            <LeftDetails weatherDetails={MOCK_WEATHER_DETAILS} />
        );

        expect(container).toMatchSnapshot();
    });
});
