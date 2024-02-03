import Logger from '../logger';

export interface CityDetails {
    name: string;
    fullName: string;
    coordinates: string;
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

interface GeonamesResponse {
    geonames: GeoLocation[];
    totlaResultsCount: Number;
}


export const getCitySuggestions = async (query: string): Promise<CityDetails[]> => {
    try {
        const queryParams = new URLSearchParams({
            q: query,
            maxRows: "7",
            orderby: 'relevance',
            style: 'FULL',
            username: process.env.NEXT_PUBLIC_GEONAMES_USERNAME || "",
        });

        const response = await fetch(`http://api.geonames.org/searchJSON?${queryParams.toString()}`, { cache: "no-store" });

        const data: GeonamesResponse = await response.json();


        const cities = data.geonames.map(({ name, countryName = "Earth", lat, lng }) => ({
            name,
            fullName: `${name}, ${countryName}`,
            coordinates: `${lat} ${lng}`
        }));

        return cities;
    } catch (error) {
        Logger.info("Error at getCitySuggestions", error);
        return [];
    }
}