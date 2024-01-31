'use client'
import styles from "./component.module.scss";
import LoadingIcon from "@/components/LoadingIcon/LoadingIcon";
import { useDefaultCityStore } from "@/store/cities";
import CityCard from "../CityCard/CityCard";
import { INITIAL_DEFAULT_CITIES } from "@/store/init-data/default-cities";
import { useEffect } from "react";
import { sortCitiesByName } from "@/utils/sort-cities";

export default function DefaultCity() {
    const { deleteCity, cities, _initialized, addCity, setInitialized } = useDefaultCityStore();
    const _hasHydrated = useDefaultCityStore.persist.hasHydrated();


    useEffect(() => {
        if (!_initialized && _hasHydrated) {
            (INITIAL_DEFAULT_CITIES ?? []).map((a) => {
                addCity(a);
            });
            setInitialized(true);
        }
    }, [cities, _initialized])


    const listIsEmpty = (cities || []).length === 0


    if (!_hasHydrated) {
        return <div className={styles.centringContainer}><LoadingIcon /></div>;
    }

    if (listIsEmpty) {
        return <div className={styles.centringContainer}>
            <div style={{
                textAlign: "center",
                fontSize: "18px"
            }}><p>
                    All Default Cities Removed
                </p>
                <button style={{
                    padding: "10px",
                    margin: "30px",
                    borderRadius: "5px",
                    border: "none"
                }}

                    onClick={() => {
                        setInitialized(false);
                    }}

                > Reload Default Cities</button>
            </div>
        </div>;
    }

    return sortCitiesByName(cities).map((city, index) => <CityCard city={city} deleteCity={deleteCity} key={index} />);
}
