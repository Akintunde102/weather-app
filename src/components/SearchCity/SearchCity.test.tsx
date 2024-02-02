import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import SearchCity from './SearchCity';
import { getCitySuggestions } from '@/utils/requests/geonames';
import '@testing-library/jest-dom'

jest.mock('@/utils/requests/geonames', () => ({
    getCitySuggestions: jest.fn(() => []),
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
        const { getByPlaceholderText } = render(<SearchCity />);
        const input = getByPlaceholderText('Search City');
        fireEvent.change(input, { target: { value: 'New York' } });

        await waitFor(() => {
            expect(getCitySuggestions).toHaveBeenCalledTimes(1);
            expect(getCitySuggestions).toHaveBeenCalledWith('New York');
        });
    });

    test('displays suggestions correctly', async () => {
        const mockSuggestions = [
            { fullName: 'New York, USA', coordinates: '40.7128,-74.0060' },
            { fullName: 'Los Angeles, USA', coordinates: '34.0522,-118.2437' },
        ];
        (getCitySuggestions as any).mockResolvedValueOnce(mockSuggestions);

        const { getByPlaceholderText, getByText } = render(<SearchCity />);
        const input = getByPlaceholderText('Search City');
        fireEvent.change(input, { target: { value: 'New York' } });

        await waitFor(() => {
            expect(getByText('New York, USA')).toBeInTheDocument();
            expect(getByText('Los Angeles, USA')).toBeInTheDocument();
        });
    });
});
