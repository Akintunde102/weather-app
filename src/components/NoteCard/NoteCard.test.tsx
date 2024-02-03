import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import NoteCard from './NoteCard';
import { MOCK_NOTE } from '@/test/__mocks__/note';

describe('NoteCard component', () => {

    const editNoteMock = jest.fn();
    const deleteNoteMock = jest.fn();

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('renders note text and footer elements', () => {
        render(
            <NoteCard note={MOCK_NOTE} editNote={editNoteMock} deleteNote={deleteNoteMock} />
        );


        expect(screen.getByText(MOCK_NOTE.text)).toBeInTheDocument();
        expect(screen.getByText('less than a minute ago')).toBeInTheDocument();
    });

    it('calls editNote when edit icon is clicked', () => {
        render(
            <NoteCard note={MOCK_NOTE} editNote={editNoteMock} deleteNote={deleteNoteMock} />
        );


        fireEvent.click(screen.getByAltText('Tiny Edit Icon'));


        const editNote = screen.getByTestId('edit-note');
        expect(editNote).toBeInTheDocument();
    });

    it('calls deleteNote when delete icon is clicked', () => {
        render(
            <NoteCard note={MOCK_NOTE} editNote={editNoteMock} deleteNote={deleteNoteMock} />
        );


        fireEvent.click(screen.getByAltText('Tiny Delete Icon'));
        expect(deleteNoteMock).toHaveBeenCalledWith(MOCK_NOTE.id);
    });
});
