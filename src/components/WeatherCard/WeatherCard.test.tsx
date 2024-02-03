import React from 'react';
import { render, screen } from '@testing-library/react';
import MockIcon from "@/images/icons/big-temperature.svg";
import WeatherCard, { BackgroundVariant } from './WeatherCard';

describe('WeatherCard component', () => {
    it('renders title, dataItem, dataItemDetails, and footerItemDetails', () => {
        render(
            <WeatherCard
                icon={MockIcon}
                title="Test Title"
                dataItem={<div>Data Item</div>}
                dataItemDetails={<div>Data Item Details</div>}
                footerItemDetails={<div>Footer Item Details</div>}
            />
        );

        expect(screen.getByText('Test Title')).toBeInTheDocument();
        expect(screen.getByText('Data Item')).toBeInTheDocument();
        expect(screen.getByText('Data Item Details')).toBeInTheDocument();
        expect(screen.getByText('Footer Item Details')).toBeInTheDocument();
    });

    it('applies background variant correctly', () => {
        render(
            <WeatherCard
                icon={MockIcon}
                title="Test Title"
                dataItem={<div>Data Item</div>}
                backgroundVariant={BackgroundVariant.transparentBlack}
            />
        );

        expect(screen.getByTestId("weather-card")).toHaveStyle('background: rgba(25, 25, 25, 0.7)');
    });

    it('renders CardHeader component with correct props', () => {
        render(
            <WeatherCard
                icon={MockIcon}
                title="Test Title"
                dataItem={<div>Data Item</div>}
            />
        );

        expect(screen.getByText('Test Title')).toBeInTheDocument();
    });
});
