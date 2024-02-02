import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import NoteCard from './NoteCard';
import { MOCK_NOTE } from '@/test/__mocks__/note';

describe('NoteCard component', () => {

    const editNoteMock = jest.fn();
    const deleteNoteMock = jest.fn();

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('renders note text and footer elements', () => {
        const { getByText } = render(
            <NoteCard note={MOCK_NOTE} editNote={editNoteMock} deleteNote={deleteNoteMock} />
        );

        expect(getByText(MOCK_NOTE.text)).toBeInTheDocument();
        expect(getByText('less than a minute ago')).toBeInTheDocument();
    });

    it('calls editNote when edit icon is clicked', () => {
        const { getByAltText, getByTestId } = render(
            <NoteCard note={MOCK_NOTE} editNote={editNoteMock} deleteNote={deleteNoteMock} />
        );

        fireEvent.click(getByAltText('Tiny Edit Icon'));


        const editNote = getByTestId('edit-note');
        expect(editNote).toBeInTheDocument();
    });

    it('calls deleteNote when delete icon is clicked', () => {
        const { getByAltText } = render(
            <NoteCard note={MOCK_NOTE} editNote={editNoteMock} deleteNote={deleteNoteMock} />
        );

        fireEvent.click(getByAltText('Tiny Delete Icon'));
        expect(deleteNoteMock).toHaveBeenCalledWith(MOCK_NOTE.id);
    });
});
