import { City } from "@/store/cities";

export function sortCitiesByName(cities: City[]) {
    return cities.sort((a, b) => {
        if (a.name < b.name) {
            return -1;
        }
        if (a.name > b.name) {
            return 1;
        }
        return 0;
    });
}