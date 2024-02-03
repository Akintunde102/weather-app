import React from 'react';
import { render, screen } from '@testing-library/react';
import LoadingIcon from './LoadingIcon';

describe('LoadingIcon component', () => {
    it('renders with default props', () => {
        render(<LoadingIcon />);

        const loadingIcon = screen.getByTestId('loading-icon');
        expect(loadingIcon).toBeInTheDocument();

        const loader = loadingIcon.querySelector('.loader');
        expect(loader).toHaveStyle('width: 60px');
        expect(loader).toHaveStyle('height: 60px');
    });

    it('renders with custom width and height props', () => {
        render(<LoadingIcon width="80px" height="80px" />);


        const loadingIcon = screen.getByTestId('loading-icon');
        expect(loadingIcon).toBeInTheDocument();

        const loader = loadingIcon.querySelector('.loader');
        expect(loader).toHaveStyle('width: 80px');
        expect(loader).toHaveStyle('height: 80px');
    });
});
