import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import RightDetails from './Right';
import { MOCK_WEATHER_DETAILS } from '@/test/__mocks__/weather-details';

jest.mock('@/store/notes', () => ({
    __esModule: true,
    default: jest.fn(() => ({
        addNote: jest.fn(),
        notes: [],
        getNotesByLocationFullName: jest.fn()
    })),
}));

describe('RightDetails component', () => {
    test('renders add note section by default', () => {
        const { getByText } = render(<RightDetails weatherDetails={MOCK_WEATHER_DETAILS} />);
        expect(getByText('Add Note')).toBeInTheDocument();
    });

    test('renders list of notes section after adding a note', () => {


        const { getByText, queryByText, getByPlaceholderText } = render(<RightDetails weatherDetails={MOCK_WEATHER_DETAILS} />);

        const input = getByPlaceholderText('Type.....');
        fireEvent.change(input, { target: { value: 'Test note' } });

        fireEvent.click(getByText('Add Note'));

        fireEvent.click(getByText('Add'));

        expect(getByText('List of Notes')).toBeInTheDocument();
        expect(queryByText('Add Note')).toBeInTheDocument();
    });

    test('matches snapshot', () => {

        const { container } = render(
            <RightDetails weatherDetails={MOCK_WEATHER_DETAILS} />
        );

        expect(container).toMatchSnapshot();
    });
});
