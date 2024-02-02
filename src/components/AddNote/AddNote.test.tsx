import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import AddNote from './AddNote';
import '@testing-library/jest-dom'


describe('AddNote component', () => {
    test('renders correctly', () => {
        const { getByPlaceholderText, getByText } = render(
            <AddNote setSubmissionFeedback={() => { }} submit={() => { }} />
        );
        expect(getByPlaceholderText('Type.....')).toBeInTheDocument();
        expect(getByText('Add')).toBeInTheDocument();
    });

    test('submits note when Add button is clicked', () => {
        const mockSubmit = jest.fn();
        const { getByPlaceholderText, getByText } = render(
            <AddNote setSubmissionFeedback={() => { }} submit={mockSubmit} />
        );

        const input = getByPlaceholderText('Type.....');
        fireEvent.change(input, { target: { value: 'Test note' } });

        const addButton = getByText('Add');
        fireEvent.click(addButton);

        expect(mockSubmit).toHaveBeenCalledTimes(1);
        expect(mockSubmit).toHaveBeenCalledWith('Test note');
    });

    test('displays error if note is empty when Add button is clicked', () => {
        const mockSubmit = jest.fn();
        const { getByText } = render(
            <AddNote setSubmissionFeedback={() => { }} submit={mockSubmit} />
        );

        const addButton = getByText('Add');
        fireEvent.click(addButton);

        expect(mockSubmit).not.toHaveBeenCalled();
    });
});
