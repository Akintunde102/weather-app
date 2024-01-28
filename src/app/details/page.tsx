'use client'
import styles from "../details.module.scss";
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from "react";
import { WeatherStackCurrentWeather, fetchWeatherData } from "../../utils/requests/weather-stack";
import Image from 'next/image';
import Location from "../../images/icons/location.svg"
import WeatherCard from "../../components/WeatherCard";
import Temperature from "../../images/icons/temperature.svg";
import WaterDrop from "../../images/icons/water-drop.svg";
import Eye from "../../images/icons/eye.svg";
import Humidity from "../../images/icons/humidity.svg";


export default function Details() {
    const searchParams = useSearchParams()
    const location = searchParams.get('location');

    const [weatherDetails, setWeatherDetails] = useState<WeatherStackCurrentWeather>();
    // const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!location) {
            throw new Error("Please Set the City or Coordinates")
        };

        // setLoading(true);

        // fetchWeatherData(location).then((weatherData) => {
        //     console.log({ weatherData });
        //     setWeatherDetails(weatherData);
        //     setTimeout(() => setLoading(false), 1000);
        //     setLoading(false);
        // });

        // fetchWeatherData(city).then((weatherData) => {
        //     setWeatherDetails(weatherData);
        //     setTimeout(() => setLoading(false), 1000);
        //     setLoading(false);
        // })
    }, [location]);



    return (
        <div className={styles.main}>
            <div className={styles.pageContainer}>
                <div className={styles.container}>
                    <div className={styles.leftContainer}>
                        <div className={styles.headerPill}>
                            <div className={styles.locationContainer}>
                                <Image src={Location} alt="location icon" />
                                <span className={styles.locationTag}>Hanoi, Vietnam</span>
                            </div>
                        </div>
                        <div className={styles.fullContentBar}>
                            <div className={styles.centerData}>
                                <div className={styles.tempData}>
                                    <div className={styles.degreeTemp}>28<sup>&deg;</sup></div>
                                    <div className={styles.wetness}>Rainy Day</div>
                                    <div className={styles.tempStatement}>
                                        Today, expect a rainy day with temperatures reaching a maximum of 28°C. Make sure to get your umbrella and raincoat before heading out.
                                    </div>
                                </div>
                            </div>
                            <div className={styles.weatherCards}>
                                <WeatherCard
                                    title="Feels like"
                                    icon={Temperature}
                                    dataItem={<span>30<sup>&deg;</sup></span>}
                                />
                                <WeatherCard
                                    title="Precipitation"
                                    icon={WaterDrop}
                                    dataItem={<span>2.3"</span>}
                                    dataItemDetails={<span>in last 24h</span>}
                                />
                                <WeatherCard title="Visibility" icon={Eye} dataItem={<span>6 mi</span>} />
                                <WeatherCard title="Humidity" icon={Humidity} dataItem={<span>82%</span>} />
                            </div>
                        </div>
                    </div>

                    <div className={styles.rightContainer}>
                        <div className={styles.headerPill}>
                            <div className={styles.locationContainer}>
                                <Image src={Location} alt="location icon" />
                                <span className={styles.locationTag}>Hanoi, Vietnam</span>
                            </div>
                        </div>


                    </div>

                </div>
            </div>

        </div >

    );
}
