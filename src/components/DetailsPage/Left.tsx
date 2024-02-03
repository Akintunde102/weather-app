'use client'
import styles from "@/app/css/details.module.scss";
import Image from 'next/image';
import Location from "@/images/icons/location.svg"
import Temperature from "@/images/icons/temperature.svg";
import WeatherCard from "@/components/WeatherCard/WeatherCard";
import { WeatherDataForDisplay } from "@/utils/map-weather-data-for-display";
import FavCityButton from "@/components/FavCityButton/FavCityButton";

interface LeftDetailsProps {
    weatherDetails: WeatherDataForDisplay;
}

export default function LeftDetails({ weatherDetails }: LeftDetailsProps) {
    const { weather, location } = weatherDetails;

    return (
        <div className={styles.leftContainer} data-testid="left-details">
            <div className={styles.headerPill}>
                <div className={styles.headerPillBody}>
                    <div className={styles.locationContainer}>
                        <Image src={Location} alt="location icon" />
                        <span className={styles.locationTag}>
                            {location.fullName}
                        </span>
                    </div>
                    <span className={styles.rightTag} title="Make Favourite">
                        <FavCityButton weatherDetails={weatherDetails} />
                    </span>
                </div>
            </div>
            <div className={styles.fullContentBar}>
                <div className={styles.centerData}>
                    <div className={styles.tempData}>
                        <div className={styles.degreeTemp}>{weather.temperature}<sup>&deg;</sup></div>
                        <div className={styles.wetness}>{weather.description}</div>
                        <div className={styles.tempStatement}>
                            {weather.note}
                        </div>
                    </div>
                </div>
                <div className={styles.leftWeatherCardsContainer}>
                    <WeatherCard
                        title="Feels like"
                        icon={Temperature}
                        dataItem={<span>{weather.feelsLike}<sup>&deg;</sup></span>}
                        dataItemDetails={<span>Precipitation is currently at {`${weather.precipitation}`}</span>}
                        footerItemDetails={<span>Pressure: {`${weather.pressure}`} atm</span>}
                    />
                </div>
            </div>
        </div>
    );
}
