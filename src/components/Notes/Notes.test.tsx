import React from 'react';
import { render, waitFor, screen } from '@testing-library/react';
import Notes from './Notes';
import useNoteStore from '@/store/notes';
import { WeatherDataForDisplay } from '@/utils/map-weather-data-for-display';

jest.mock('@/store/notes');


describe('Notes component', () => {
    beforeEach(() => {
        (useNoteStore as any).mockReturnValue({
            notes: [],
            getNotesByLocationFullName: jest.fn(),
            editNote: jest.fn(),
            deleteNote: jest.fn(),
        });
    });

    it('renders loading icon while notes are being fetched', async () => {
        render(<Notes weatherDetails={{ location: { fullName: 'Test Location' } } as WeatherDataForDisplay} />);

        expect(screen.getByTestId('loading-icon')).toBeInTheDocument();

        await waitFor(() => {
            expect(useNoteStore).toHaveBeenCalled();
        });

        await waitFor(() => {
            expect(useNoteStore().getNotesByLocationFullName).toHaveBeenCalledWith('Test Location');
        });
    });

});
