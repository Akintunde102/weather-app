import Logger from "../logger";

interface CityInfoCoordinates {
    lon: number;
    lat: number;
}

export interface CityInfo {
    geoname_id: string;
    name: string;
    ascii_name: string;
    alternate_names: string[];
    latitude: string;
    longitude: string;
    feature_class: string;
    feature_code: string;
    country_code: string;
    country_code_2: string | null;
    admin1_code: string | null;
    admin2_code: string | null;
    admin3_code: string | null;
    admin4_code: string | null;
    population: number;
    elevation: number | null;
    dem: number;
    timezone: string;
    modification_date: string;
    country: string;
    coordinates: CityInfoCoordinates;
}


export interface OpenDataSoftResponse {
    results: CityInfo[];
    total_count: number;
}


export const mapCityInfoForDisplay = (cityInfo: CityInfo) => {
    return {
        name: cityInfo.name,
        coordinates: `${cityInfo.latitude} ${cityInfo.longitude}`,
        population: cityInfo.population,
        country: cityInfo.country
    }
}


export const get15LargestCities = async () => {
    try {
        const response = await fetch("https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/geonames-all-cities-with-a-population-500/records?order_by=population%20desc&limit=15", { cache: "no-store" });

        const data: OpenDataSoftResponse = await response.json();

        return data.results.map(mapCityInfoForDisplay).sort((a, b) => {
            if (a.name < b.name) { return -1; }
            if (a.name > b.name) { return 1; }
            return 0;
        })
    } catch (error) {
        Logger.error("Error at get15LargestCities", error);
        return [];
    }
}