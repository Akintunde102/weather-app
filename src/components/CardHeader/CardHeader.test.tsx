import React from 'react';
import { render, screen } from '@testing-library/react';
import MockIcon from "@/images/icons/big-temperature.svg";
import CardHeader from './CardHeader';

describe('CardHeader component', () => {
    const mockIcon = MockIcon

    test('renders correctly with required props', () => {
        render(
            <CardHeader icon={mockIcon} title="Test Title" />
        );

        const iconImage = screen.getByAltText('icon');
        expect(iconImage).toBeInTheDocument();

        const titleElement = screen.getByText('Test Title');
        expect(titleElement).toBeInTheDocument();
    });

    test('renders correctly with optional rightItem prop', () => {
        const mockRightItem = <button>Right Item</button>;
        render(
            <CardHeader icon={mockIcon} title="Test Title" rightItem={mockRightItem} />
        );
        const rightItemButton = screen.getByText('Right Item');
        expect(rightItemButton).toBeInTheDocument();
    });

    test('renders correctly with divider when withDivider is true', () => {
        render(
            <CardHeader icon={mockIcon} title="Test Title" withDivider={true} />
        );
        const dividerElement = screen.getByTestId('divider');
        expect(dividerElement).toBeInTheDocument();
    });

    test('does not render divider when withDivider is false', () => {
        render(
            <CardHeader icon={mockIcon} title="Test Title" withDivider={false} />
        );
        const dividerElement = screen.queryByTestId('divider');
        expect(dividerElement).not.toBeInTheDocument();
    });
});
