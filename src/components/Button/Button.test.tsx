import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Button from './Button';

describe('Button component', () => {
    test('renders correctly', () => {
        const onClick = jest.fn();
        const { getByText } = render(<Button onClick={onClick} title="Click Me" />);
        expect(getByText('Click Me')).toBeInTheDocument();
    });

    test('calls onClick handler when button is clicked', () => {
        const onClick = jest.fn();
        const { getByText } = render(<Button onClick={onClick} title="Click Me" />);
        const button = getByText('Click Me');
        fireEvent.click(button);
        expect(onClick).toHaveBeenCalledTimes(1);
    });
});
