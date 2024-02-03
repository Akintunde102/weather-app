import { render } from '@testing-library/react';
import { useRouter } from 'next/navigation';
import useMetaStore from '@/store/meta';
import useGeolocationRedirect from './useGeolocationRedirect';
import { UseBoundStore } from 'zustand';

jest.mock('next/navigation');
jest.mock('@/store/meta');

describe('useGeolocationRedirect', () => {
    let mockUseRouter: jest.MockedFunction<typeof useRouter>;
    let mockUseMetaStore: jest.MockedFunction<typeof useMetaStore>;
    let mockPush: jest.Mock;
    let mockUpdateCityPageRedirection: jest.Mock;

    beforeEach(() => {
        mockPush = jest.fn();
        mockUseRouter = useRouter as jest.MockedFunction<typeof useRouter>;
        mockUseRouter.mockReturnValue({
            push: mockPush
        } as any);

        mockUpdateCityPageRedirection = jest.fn();
        mockUseMetaStore = useMetaStore as jest.MockedFunction<typeof useMetaStore>;
        mockUseMetaStore.mockReturnValue({
            alreadyRedirectedToCityPage: false,
            updateCityPageRedirection: mockUpdateCityPageRedirection,
        });
        (mockUseMetaStore as UseBoundStore<any>).persist = { hasHydrated: jest.fn().mockReturnValue(true) }
    });

    it('should redirect to city page when geolocation is available and not redirected yet', async () => {
        const mockGetCurrentPosition = jest.fn().mockImplementationOnce((success: PositionCallback) =>
            Promise.resolve(
                success({
                    coords: {
                        latitude: 40.7128,
                        longitude: -74.006,
                    }
                } as GeolocationPosition)
            )
        );

        (global.navigator as any).geolocation = {
            getCurrentPosition: mockGetCurrentPosition,
        } as any;

        const TestComponent = () => {
            useGeolocationRedirect();
            return null;
        };

        render(<TestComponent />);

        await new Promise(resolve => setTimeout(resolve, 0));
        expect(mockGetCurrentPosition).toHaveBeenCalledTimes(1);
        expect(mockUpdateCityPageRedirection).toHaveBeenCalledWith(true);
        expect(mockPush).toHaveBeenCalledWith('/details?location=40.7128,-74.006');
    });
});
