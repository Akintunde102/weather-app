'use client'
import styles from "@/app/css/details.module.scss";
import Image from 'next/image';
import Location from "@/images/icons/location.svg"
import Temperature from "@/images/icons/temperature.svg";
import WaterDrop from "@/images/icons/water-drop.svg";
import Eye from "@/images/icons/eye.svg";

import Humidity from "@/images/icons/humidity.svg";
import WeatherCard from "@/components/WeatherCard/WeatherCard";
import { WeatherDataForDisplay } from "@/utils/map-weather-data-for-display";
import FavCityButton from "@/components/FavCityButton/FavCityButton";

interface LeftDetailsProps {
    weatherDetails: WeatherDataForDisplay;
}

export default function LeftDetails({ weatherDetails }: LeftDetailsProps) {

    const { weather, location } = weatherDetails;


    return (
        <div className={styles.leftContainer}>
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
                <div className={styles.leftWeatherCards}>
                    <div className={styles.leftWeatherCardsRow}>
                        <WeatherCard
                            title="Feels like"
                            icon={Temperature}
                            dataItem={<span>{weather.feelsLike}<sup>&deg;</sup></span>}
                        // footerItemDetails={<span>Humidity is making it feel warmer</span>}
                        />
                        <WeatherCard
                            title="Precipitation"
                            icon={WaterDrop}
                            dataItem={<span>{weather.precipitation}</span>}
                            dataItemDetails={<span>in last 24h</span>}
                        // footerItemDetails={<span>{weather.precipitation}</span>}
                        />
                    </div>
                    <div className={styles.leftWeatherCardsRow}>
                        <WeatherCard title="Visibility" icon={Eye} dataItem={<span>{weather.visibility} mi</span>} />
                        <WeatherCard title="Humidity" icon={Humidity} dataItem={<span>{weather.humidity}%</span>} />
                    </div>
                </div>
            </div>
        </div>
    );
}
