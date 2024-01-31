import { CityInfo } from "./requests/opendatasoft"

export const mapCityInfoForDisplay = (cityInfo: CityInfo) => {
    return {
        name: cityInfo.name,
        coordinates: `${cityInfo.latitude} ${cityInfo.longitude}`,
        population: cityInfo.population,
        country: cityInfo.country
    }
}