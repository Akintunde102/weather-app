import React from 'react';
import { render, waitFor, screen } from '@testing-library/react';
import DefaultCity from './DefaultCity';
import { useDefaultCityStore } from '@/store/cities';

jest.mock('@/store/cities', () => ({
    useDefaultCityStore: jest.fn(),
}));

describe('DefaultCity component', () => {
    test('renders loading icon while initializing', async () => {
        (useDefaultCityStore as any).mockReturnValueOnce({
            deleteCity: jest.fn(),
            cities: [],
            _initialized: false,
            addCity: jest.fn(),
            setInitialized: jest.fn(),
            updateCityLastTemperature: jest.fn(),
        });

        render(<DefaultCity />);
        const loadingIcon = screen.getByTestId('loading-icon');
        expect(loadingIcon).toBeInTheDocument();

        await waitFor(() => {
            expect(useDefaultCityStore).toHaveBeenCalledTimes(1);
        });
    });
});
