import React from 'react';
import { render } from '@testing-library/react';
import MockIcon from "@/images/icons/big-temperature.svg";
import CardHeader from './CardHeader';

describe('CardHeader component', () => {
    const mockIcon = MockIcon

    test('renders correctly with required props', () => {
        const { getByAltText, getByText } = render(
            <CardHeader icon={mockIcon} title="Test Title" />
        );
        const iconImage = getByAltText('icon');
        expect(iconImage).toBeInTheDocument();

        const titleElement = getByText('Test Title');
        expect(titleElement).toBeInTheDocument();
    });

    test('renders correctly with optional rightItem prop', () => {
        const mockRightItem = <button>Right Item</button>;
        const { getByText } = render(
            <CardHeader icon={mockIcon} title="Test Title" rightItem={mockRightItem} />
        );
        const rightItemButton = getByText('Right Item');
        expect(rightItemButton).toBeInTheDocument();
    });

    test('renders correctly with divider when withDivider is true', () => {
        const { container } = render(
            <CardHeader icon={mockIcon} title="Test Title" withDivider={true} />
        );
        const dividerElement = container.querySelector('.divider');
        expect(dividerElement).toBeInTheDocument();
    });

    test('does not render divider when withDivider is false', () => {
        const { container } = render(
            <CardHeader icon={mockIcon} title="Test Title" withDivider={false} />
        );
        const dividerElement = container.querySelector('.divider');
        expect(dividerElement).not.toBeInTheDocument();
    });
});
