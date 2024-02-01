'use client'
import styles from "./component.module.scss";
import Image from 'next/image';
import Star from "@/images/icons/star.svg";
import FilledStar from "@/images/icons/filled-star.svg";

import { WeatherDataForDisplay } from "@/utils/map-weather-data-for-display";
import { useFavouriteCityStore, } from "@/store/cities";
import { useEffect, useState } from "react";
import LoadingIcon from "@/components/LoadingIcon/LoadingIcon";

interface FavCityButtonProps {
    weatherDetails: WeatherDataForDisplay;
}

export default function FavCityButton({ weatherDetails, }: FavCityButtonProps) {
    const { isCityPresent, addCity, deleteCity, cities } = useFavouriteCityStore();

    const [favState, setFavState] = useState<boolean | undefined>();
    const { location, weather } = weatherDetails;



    useEffect(() => {
        const cityHasBeenFavourited = isCityPresent(location.fullName);
        setFavState(cityHasBeenFavourited);
    }, [isCityPresent, cities, location]);

    if (favState === undefined) {
        return <LoadingIcon width="36px" height="36px" />;
    }

    if (favState) {
        return <Image src={FilledStar} alt="favorited star icon" onClick={() => {
            deleteCity(location.fullName)
        }}
            className={styles.button}
        />;
    }

    return <Image
        src={Star}
        alt={`star icon`}
        onClick={() => {
            addCity({
                name: location.exact,
                fullName: location.fullName,
                coordinates: location.coordinates,
                country: location.country,
                lastTemperature: String(weather.temperature)
            })
        }}
        className={styles.button}
    />

}
