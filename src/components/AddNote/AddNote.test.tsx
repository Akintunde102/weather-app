import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import AddNote from './AddNote';
import '@testing-library/jest-dom'


describe('AddNote component', () => {
    test('renders correctly', () => {
        render(
            <AddNote setSubmissionFeedback={() => { }} submit={() => { }} />
        );
        expect(screen.getByPlaceholderText('Type.....')).toBeInTheDocument();
        expect(screen.getByText('Add')).toBeInTheDocument();
    });

    test('submits note when Add button is clicked', () => {
        const mockSubmit = jest.fn();
        render(
            <AddNote setSubmissionFeedback={() => { }} submit={mockSubmit} />
        );

        const input = screen.getByPlaceholderText('Type.....');
        fireEvent.change(input, { target: { value: 'Test note' } });

        const addButton = screen.getByText('Add');
        fireEvent.click(addButton);

        expect(mockSubmit).toHaveBeenCalledTimes(1);
        expect(mockSubmit).toHaveBeenCalledWith('Test note');
    });

    test('displays error if note is empty when Add button is clicked', () => {
        const mockSubmit = jest.fn();
        render(
            <AddNote setSubmissionFeedback={() => { }} submit={mockSubmit} />
        );

        const addButton = screen.getByText('Add');
        fireEvent.click(addButton);

        expect(mockSubmit).not.toHaveBeenCalled();
    });
});
