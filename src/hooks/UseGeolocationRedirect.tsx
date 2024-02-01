import { useEffect } from "react";
import { useRouter } from "next/navigation";
import useMetaStore from "@/store/meta";

const useGeolocationRedirect = () => {
    const { push } = useRouter();
    const { alreadyRedirectedToCityPage, updateCityPageRedirection } = useMetaStore();
    const _hasHydrated = (useMetaStore as any)?.persist?.hasHydrated();

    useEffect(() => {
        if (typeof window !== 'undefined' && window.navigator && _hasHydrated && !alreadyRedirectedToCityPage) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    const stringifiedCoords = `${latitude},${longitude}`;
                    updateCityPageRedirection(true);
                    push("/details?location=" + stringifiedCoords);
                },
                (error) => {
                    throw error;
                }
            );
            return;
        }
    }, []);
};

export default useGeolocationRedirect;
