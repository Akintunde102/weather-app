'use client'
import styles from "./component.module.scss"
import Cancel from "@/images/icons/delete.svg"
import BigTemperature from "@/images/icons/big-temperature.svg";
import Link from "next/link";
import Image from 'next/image';
import { City } from "@/store/cities";
import { fetchWeatherData } from "@/utils/requests/weatherstack";
import { useEffect, useState } from "react";
import LoadingIcon from "../LoadingIcon/LoadingIcon";

interface CityCardProps {
    city: City;
    deleteCity: (locationFullName: string) => void;
    updateCityTemperature: (locationFullName: string, temperature: string) => void
}


export default function CityCard({ city, deleteCity }: CityCardProps) {

    const { coordinates, name, fullName, country } = city;

    const [temperature, setTemperature] = useState<number>();

    const fetchCityTemperature = async (cityNameOrCoordinates: string) => {
        const weatherDetails = await fetchWeatherData(cityNameOrCoordinates);
        return weatherDetails.weather.temperature;
    }

    useEffect(() => {
        fetchCityTemperature(coordinates).then(temperature => {
            setTemperature(temperature)
        })
    }, [])



    return (
        <Link href={`/details?location=${coordinates}`} target="_blank">
            <div className={styles.noteContainer}>
                <div style={{
                    display: "flex",
                    flexDirection: "row"
                }}>
                    <div className={styles.content}>
                        {name}, {country}
                    </div>
                    <div className={styles.removeCityButton} onClick={(e) => {
                        e.preventDefault();
                        deleteCity(fullName);
                    }} >
                        <Image src={Cancel} alt="cancel-icon" />
                    </div>
                </div>
                <div className={styles.footer}>
                    <div className={styles.inlineContainer}>
                        <Image src={BigTemperature} alt="temperature icon" />
                        {temperature === undefined ?
                            <LoadingIcon width="36px" height="36px" />
                            : <span className={styles.info}>{temperature}<sup>&deg;</sup></span>
                        }

                    </div>
                </div>
            </div>
        </Link>
    )

}
