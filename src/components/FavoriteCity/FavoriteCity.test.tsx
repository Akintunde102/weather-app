import React from 'react';
import { render } from '@testing-library/react';
import FavoriteCity from './FavoriteCity';
import { useFavouriteCityStore } from '@/store/cities';


jest.mock('@/store/cities', () => ({
    useFavouriteCityStore: jest.fn(),
}));

describe('FavouriteCity component', () => {
    test('renders loading icon when cities are being hydrated', () => {
        (useFavouriteCityStore as any).mockReturnValue({
            deleteCity: jest.fn(),
            cities: [],
            updateCityLastTemperature: jest.fn(),
            persist: { hasHydrated: () => false },
        });

        const { getByTestId } = render(<FavoriteCity />);
        expect(getByTestId('loading-icon')).toBeInTheDocument();
    });
});
