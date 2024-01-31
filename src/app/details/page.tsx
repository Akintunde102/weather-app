'use client'
import styles from "../css/details.module.scss";
import LeftDetails from "@/components/DetailsPage/Left";
import RightDetails from "@/components/DetailsPage/Right";
import { fetchWeatherData } from "@/utils/requests/weatherstack";
import { useSearchParams } from 'next/navigation'

export const getWeatherData = async (cityNameOrCoordinates: string) => {
    return fetchWeatherData(cityNameOrCoordinates);
};

export default async function DetailsPage() {
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




