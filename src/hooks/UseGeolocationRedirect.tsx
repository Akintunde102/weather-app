import { useEffect } from "react";
import { useRouter } from "next/navigation";
import useMetaStore from "@/store/meta";

const useGeolocationRedirect = () => {
    const { push } = useRouter();
    const { alreadyRedirectedToCityPage, updateCityPageRedirection } = useMetaStore()

    useEffect(() => {
        if (typeof window !== 'undefined' && window.navigator && !alreadyRedirectedToCityPage) {
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
    }, [push, alreadyRedirectedToCityPage]);
};

export default useGeolocationRedirect;
