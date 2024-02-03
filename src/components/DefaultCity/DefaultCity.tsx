'use client'
import styles from "./component.module.scss";
import LoadingIcon from "@/components/LoadingIcon/LoadingIcon";
import { useDefaultCityStore } from "@/store/cities";
import CityCard from "../CityCard/CityCard";
import { INITIAL_DEFAULT_CITIES } from "@/store/init-data/default-cities";
import { useEffect } from "react";
import { sortCitiesByName } from "@/utils/sort-cities";
import Button from "../Button/Button";

export default function DefaultCity() {
    const { deleteCity, cities, _initialized, addCity, setInitialized, updateCityLastTemperature } = useDefaultCityStore();
    const _hasHydrated = (useDefaultCityStore as any)?.persist?.hasHydrated();

    useEffect(() => {
        if (!_initialized && _hasHydrated) {
            (INITIAL_DEFAULT_CITIES ?? []).map((a) => {
                addCity(a);
            });
            setInitialized(true);
        }
    }, [cities, _initialized, _hasHydrated, addCity, setInitialized]);

    const listIsEmpty = (cities || []).length === 0


    if (!_hasHydrated) {
        return <div className={styles.centringContainer}><LoadingIcon /></div>;
    }

    if (listIsEmpty) {
        return <div className={styles.centringContainer}>
            <div className={styles.emptyListContainer}>
                <p className={styles.title}>
                    All Default Cities Removed
                </p>
                <Button onClick={() => {
                    setInitialized(false);
                }} title="Reload Default Cities" />
            </div>
        </div>;
    }

    return sortCitiesByName(cities).map((city, index) => <CityCard updateCityLastTemperature={updateCityLastTemperature} city={city} deleteCity={deleteCity} key={index} />);
}
