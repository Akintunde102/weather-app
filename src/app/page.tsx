'use client'
import { useRouter } from "next/navigation";
import styles from "./page.module.css";
import { useEffect, useState } from "react";
import { showCity } from "../utils/requests/geonames";

export default function Home() {
  const [location, setLocation] = useState<GeolocationCoordinates | null>(null);
  const [error, setError] = useState<string | null>(null);

  const { push } = useRouter();

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude, } = position.coords;
          const stringifiedCoords = `${latitude},${longitude}`
          push("/details?location=" + stringifiedCoords);
          setLocation(position.coords);
          setError(null);
        },
        (error) => {
          setError(error.message);
        }
      );
    } else {
      setError('Geolocation is not supported by this browser.');
    }
  }, [push]);

  return (
    <main className={styles.main}>
      <div className={styles.description}>
      </div>
    </main>
  );
}
