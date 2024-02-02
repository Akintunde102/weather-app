import React from 'react';
import { render } from '@testing-library/react';
import MockIcon from "@/images/icons/big-temperature.svg";
import WeatherCard, { BackgroundVariant } from './WeatherCard';

describe('WeatherCard component', () => {
    it('renders title, dataItem, dataItemDetails, and footerItemDetails', () => {
        const { getByText } = render(
            <WeatherCard
                icon={MockIcon}
                title="Test Title"
                dataItem={<div>Data Item</div>}
                dataItemDetails={<div>Data Item Details</div>}
                footerItemDetails={<div>Footer Item Details</div>}
            />
        );

        expect(getByText('Test Title')).toBeInTheDocument();
        expect(getByText('Data Item')).toBeInTheDocument();
        expect(getByText('Data Item Details')).toBeInTheDocument();
        expect(getByText('Footer Item Details')).toBeInTheDocument();
    });

    it('applies background variant correctly', () => {
        const { container } = render(
            <WeatherCard
                icon={MockIcon}
                title="Test Title"
                dataItem={<div>Data Item</div>}
                backgroundVariant={BackgroundVariant.transparentBlack}
            />
        );

        expect(container.firstChild).toHaveStyle('background: rgba(25, 25, 25, 0.7)');
    });

    it('renders CardHeader component with correct props', () => {
        const { getByAltText, getByText } = render(
            <WeatherCard
                icon={MockIcon}
                title="Test Title"
                dataItem={<div>Data Item</div>}
            />
        );

        expect(getByText('Test Title')).toBeInTheDocument();
    });
});
