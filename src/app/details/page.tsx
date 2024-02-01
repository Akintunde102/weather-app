'use client'
import styles from "../css/details.module.scss";
import LeftDetails from "@/components/DetailsPage/Left";
import RightDetails from "@/components/DetailsPage/Right";
import { generateRandomNumber } from "@/utils/generate-random-number";
import { mapWeatherDataForDisplay } from "@/utils/map-weather-data-for-display";
import { fetchWeatherData } from "@/utils/requests/weatherstack";
import { useSearchParams } from 'next/navigation'
import { Suspense } from "react";

const getWeatherData = async (cityNameOrCoordinates: string) => {
    return fetchWeatherData(cityNameOrCoordinates);
};

async function DetailsPage() {
    const searchParams = useSearchParams();

    const cityNameOrCoordinates = searchParams.get('location');

    if (!cityNameOrCoordinates) {
        throw "Please Set City Name or Cooordinates"
    };

    const data = await getWeatherData(cityNameOrCoordinates);

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

export default async function SuspensedDetailsPage() {
    return (
        <Suspense>
            <DetailsPage />
        </Suspense>
    )
}




