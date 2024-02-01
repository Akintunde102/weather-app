'use client'
import styles from "./component.module.scss";
import LoadingIcon from "@/components/LoadingIcon/LoadingIcon";
import { useFavouriteCityStore } from "@/store/cities";
import CityCard from "../CityCard/CityCard";
import { sortCitiesByName } from "@/utils/sort-cities";

export default function FavouriteCity() {
    const { deleteCity, cities, updateCityLastTemperature } = useFavouriteCityStore();

    const _hasHydrated = (useFavouriteCityStore as any)?.persist?.hasHydrated();


    const listIsEmpty = (cities || []).length === 0


    if (!_hasHydrated) {
        return <div className={styles.centringContainer}><LoadingIcon /></div>;
    }

    if (listIsEmpty) {
        return <div className={styles.centringContainer}>No Favourite Cities</div>;
    }

    return sortCitiesByName(cities).map((city, index) => <CityCard updateCityLastTemperature={updateCityLastTemperature} city={city} deleteCity={deleteCity} key={index} />);
}
