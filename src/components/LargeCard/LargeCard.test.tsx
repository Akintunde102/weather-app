import React from 'react';
import { render } from '@testing-library/react';
import MockIcon from "@/images/icons/big-temperature.svg";
import LargeCard from './LargeCard';

jest.mock('@/components/CardHeader/CardHeader', () => ({
    __esModule: true,
    default: jest.fn(() => <div data-testid="mocked-card-header"></div>),
}));

describe('LargeCard component', () => {
    it('renders with provided props', () => {
        const title = 'Test Title';
        const body = <div>Test Body</div>;
        const rightItem = <button>Test Button</button>;
        const noMarginWrap = true;

        const { getByText, getByTestId } = render(
            <LargeCard
                title={title}
                body={body}
                titleIcon={MockIcon}
                rightItem={rightItem}
                noMarginWrap={noMarginWrap}
            />
        );
        expect(getByText('Test Body')).toBeInTheDocument();
        expect(getByTestId('mocked-card-header')).toBeInTheDocument();
    });
});
