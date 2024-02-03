import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import SearchCity from './SearchCity';
import '@testing-library/jest-dom'
import { searchForCity } from '@/utils/requests/weatherstack';

jest.mock('@/utils/requests/weatherstack', () => ({
    searchForCity: jest.fn(() => []),
}));

describe('SearchCity component', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    test('renders correctly', () => {
        const { getByPlaceholderText } = render(<SearchCity />);
        expect(getByPlaceholderText('Search City')).toBeInTheDocument();
    });

    test('searches for city suggestions on input change', async () => {
        render(<SearchCity />);
        const input = screen.getByPlaceholderText('Search City');
        fireEvent.change(input, { target: { value: 'New York' } });

        await waitFor(() => {
            expect(searchForCity).toHaveBeenCalledTimes(1);
            expect(searchForCity).toHaveBeenCalledWith('New York');
        });
    });

    test('displays suggestions correctly', async () => {
        const mockSuggestions = [
            { fullName: 'New York, USA', coordinates: '40.7128,-74.0060' },
            { fullName: 'Los Angeles, USA', coordinates: '34.0522,-118.2437' },
        ];
        (searchForCity as any).mockResolvedValueOnce(mockSuggestions);

        render(<SearchCity />);
        const { getByPlaceholderText, getByText } = screen;
        const input = getByPlaceholderText('Search City');
        fireEvent.change(input, { target: { value: 'New York' } });

        await waitFor(() => {
            expect(getByText('New York, USA')).toBeInTheDocument();
            expect(getByText('Los Angeles, USA')).toBeInTheDocument();
        });
    });
});
