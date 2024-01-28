import axios, { AxiosInstance, AxiosResponse } from 'axios';
import Logger from '../logger';

interface City {
    name: string;
    population: number;
}

interface GeoNamesParams {
    q: string;
    maxRows: number;
    orderby: 'population';
    style: 'FULL';
    username: string;
}

interface GeonamesAdminCodes1 {
    ISO3166_2: string;
}

interface GeoLocation {
    adminCode1: string;
    lng: string;
    distance: string;
    geonameId: number;
    toponymName: string;
    countryId: string;
    fcl: string;
    population: number;
    countryCode: string;
    name: string;
    fclName: string;
    adminCodes1: GeonamesAdminCodes1;
    countryName: string;
    fcodeName: string;
    adminName1: string;
    lat: string;
    fcode: string;
}

const requestInstance: AxiosInstance = axios.create({
    baseURL: "http://api.geonames.org",
    params: {
        username: process.env.NEXT_PUBLIC_GEONAMES_USERNAME
    }
});

export const getLargestCities = async (params: Partial<Omit<GeoNamesParams, "username">>): Promise<City[]> => {

    try {
        const defaultParams = {
            q: '',
            maxRows: 15,
            orderby: 'population',
            style: 'FULL',
        };

        const response: AxiosResponse<any> = await requestInstance.get("/searchJSON", {
            params: {
                ...defaultParams,
                ...params,
            }
        });

        if (response.status === 200) {
            const cities: City[] = response.data.geonames.map((cityData: any) => ({
                name: cityData.name,
                population: cityData.population
            }));
            return cities;
        }

        throw new Error(`Error: ${response.status}`);

    } catch (error) {
        throw new Error(`Error: ${error}`);
    }
}


export const showCity = async (coordinates: GeolocationCoordinates): Promise<string | null> => {

    const { longitude, latitude } = coordinates;
    try {
        const response: AxiosResponse<{ geonames: GeoLocation[] }> = await requestInstance.get("/findNearbyJSON", {
            params: {
                lat: latitude,
                lng: longitude,
            }
        });

        const city = response.data.geonames[0]?.adminName1;
        return city || null;
    } catch (error) {
        Logger.error("Error:", error);
        return null;
    }
}

