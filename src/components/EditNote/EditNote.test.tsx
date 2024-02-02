import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { EditNote } from './EditNote';

describe('EditNote component', () => {
    test('allows editing and submitting a note', () => {
        const note = { id: '1', text: 'Initial note', locationFullName: "Queens, New York, USA", date: new Date() };
        const submitNoteMock = jest.fn();

        const { getByDisplayValue, getByAltText } = render(
            <EditNote note={note} submitNote={submitNoteMock} />
        );

        const input = getByDisplayValue('Initial note');
        expect(input).toBeInTheDocument();

        fireEvent.change(input, { target: { value: 'Edited note' } });

        expect(input).toHaveValue('Edited note');

        const submitButton = getByAltText('submit note');
        fireEvent.click(submitButton);

        expect(submitNoteMock).toHaveBeenCalledWith('1', 'Edited note');
    });
});
