'use client'
import styles from "../css/details.module.scss";
import LeftDetails from "@/components/DetailsPage/Left";
import RightDetails from "@/components/DetailsPage/Right";
import LoadingIcon from "@/components/LoadingIcon/LoadingIcon";
import createUIIndication from "@/utils/createUIIndication";
import { WeatherDataForDisplay } from "@/utils/map-weather-data-for-display";
import { fetchWeatherData } from "@/utils/requests/weatherstack";
import { useSearchParams } from 'next/navigation'
import { Suspense, useEffect, useState } from "react";

function DetailsPage() {
    const searchParams = useSearchParams();

    const cityNameOrCoordinates = searchParams.get('location');

    const [data, setData] = useState<WeatherDataForDisplay>();

    const dataState = createUIIndication(setData);

    if (!cityNameOrCoordinates) {
        throw "Please Set City Name or Cooordinates"
    };

    useEffect(() => {
        if (!data) {
            fetchWeatherData(cityNameOrCoordinates).then((data) => {
                dataState.delayed({
                    delay: 1500,
                    value: data
                })
            })
        }
    }, [cityNameOrCoordinates, dataState, data]);

    if (!data) {

        return (
            <div className={styles.main}>
                <div className={styles.pageContainer}>
                    <div className={styles.container}>
                        <div className="centringContainer">
                            <LoadingIcon />
                        </div>
                    </div>
                </div>
            </div>)
    }

    return (
        <div className={styles.main}>
            <div className={styles.pageContainer}>
                <div className={styles.container}>
                    <LeftDetails weatherDetails={data} />
                    <RightDetails weatherDetails={data} />
                </div>
            </div>
        </div >
    );
}

export default function SuspensedDetailsPage() {
    return (
        <Suspense>
            <DetailsPage />
        </Suspense>
    )
}




