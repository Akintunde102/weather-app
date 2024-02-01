'use client'
import styles from "../css/details.module.scss";
import LeftDetails from "@/components/DetailsPage/Left";
import RightDetails from "@/components/DetailsPage/Right";
import { generateRandomNumber } from "@/utils/generate-random-number";
import { mapWeatherDataForDisplay } from "@/utils/map-weather-data-for-display";
import { fetchWeatherData } from "@/utils/requests/weatherstack";
import { useSearchParams } from 'next/navigation'

export const getWeatherData = async (cityNameOrCoordinates: string) => {
    return fetchWeatherData(cityNameOrCoordinates);
};

export default function DetailsPage() {
    const searchParams = useSearchParams();

    const cityNameOrCoordinates = searchParams.get('location');

    if (!cityNameOrCoordinates) {
        throw "Please Set City Name or Cooordinates"
    };

    const data = mapWeatherDataForDisplay({
        "request": {
            "type": "LatLon",
            "query": "Lat -23.55 and Lon -46.64",
            "language": "en",
            "unit": "m"
        },
        "location": {
            "name": "Sao Paulo",
            "country": "Brazil",
            "region": "Sao Paulo",
            "lat": "-23.533",
            "lon": "-46.617",
            "timezone_id": "America\/Sao_Paulo",
            "localtime": "2024-01-30 05:28",
            "localtime_epoch": 1706592480,
            "utc_offset": "-3.0"
        },
        "current": {
            "observation_time": "08:28 AM",
            "temperature": generateRandomNumber(-10, 40),
            "weather_code": 113,
            "weather_icons": [
                "https:\/\/cdn.worldweatheronline.com\/images\/wsymbols01_png_64\/wsymbol_0008_clear_sky_night.png"
            ],
            "weather_descriptions": [
                "Clear"
            ],
            "wind_speed": 4,
            "wind_degree": 340,
            "wind_dir": "NNW",
            "pressure": 1015,
            "precip": 0,
            "humidity": 83,
            "cloudcover": 0,
            "feelslike": 20,
            "uv_index": 1,
            "visibility": 10,
            "is_day": "no"
        }
    });

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




