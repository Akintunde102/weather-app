import React from 'react';
import { render, screen } from '@testing-library/react';
import LeftDetails from './Left';
import { MOCK_WEATHER_DETAILS } from '@/test/__mocks__/weather-details';

jest.mock('@/components/FavCityButton/FavCityButton',
    () => function FavCityMock() {
        return <div data-testid="fav-city-button"></div>
    }
);

describe('LeftDetails component', () => {

    test('renders weather details correctly', () => {

        render(
            <LeftDetails weatherDetails={MOCK_WEATHER_DETAILS} />
        );

        expect(screen.getByText('Queens, New York, USA')).toBeInTheDocument();
        expect(screen.getByText('25')).toBeInTheDocument();
        expect(screen.getByText('Feels like')).toBeInTheDocument();
        expect(screen.getByText('Precipitation is currently at 0')).toBeInTheDocument();
        expect(screen.getByText('Pressure: 1015 atm')).toBeInTheDocument();
        expect(screen.getByAltText('location icon')).toBeInTheDocument();
        expect(screen.getByTestId('fav-city-button')).toBeInTheDocument();
    });

    test('matches snapshot', () => {
        render(
            <LeftDetails weatherDetails={MOCK_WEATHER_DETAILS} />
        );
        expect(screen.getByTestId("left-details")).toMatchSnapshot();
    });
});
