import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
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
        render(<RightDetails weatherDetails={MOCK_WEATHER_DETAILS} />);
        expect(screen.getByText('Add Note')).toBeInTheDocument();
    });

    test('renders list of notes section after adding a note', () => {


        render(<RightDetails weatherDetails={MOCK_WEATHER_DETAILS} />);

        const input = screen.getByPlaceholderText('Type.....');
        fireEvent.change(input, { target: { value: 'Test note' } });

        fireEvent.click(screen.getByText('Add Note'));

        fireEvent.click(screen.getByText('Add'));

        expect(screen.getByText('List of Notes')).toBeInTheDocument();
        expect(screen.queryByText('Add Note')).toBeInTheDocument();
    });

    test('matches snapshot', () => {
        render(
            <RightDetails weatherDetails={MOCK_WEATHER_DETAILS} />
        );
        expect(screen.getByTestId("right-details")).toMatchSnapshot();
    });
});
