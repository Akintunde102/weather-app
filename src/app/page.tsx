'use client'
import { useRouter } from "next/navigation";
import styles from "../app/css/page.module.css";
import { useEffect } from "react";
import CityLight from "@/images/icons/city-lights.svg"
import LargeCard from "@/components/LargeCard/LargeCard";
import SearchCity from "@/components/SearchCity/SearchCity";
import FavouriteCity from "@/components/FavoriteCity/FavoriteCity";
import DefaultCity from "@/components/DefaultCity/DefaultCity";

export default function HomePage() {
  const { push } = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined' && window.navigator) {
      const locationIsSupported = navigator.geolocation;

      if (locationIsSupported) {
        navigator.permissions.query({ name: 'geolocation' }).then((result) => {
          if (result.state === 'granted') {
            navigator.geolocation.getCurrentPosition(
              (position) => {
                const { latitude, longitude, } = position.coords;
                const stringifiedCoords = `${latitude},${longitude}`
                push("/details?location=" + stringifiedCoords);
              },
              (error) => {
                throw error;
              }
            );
            return;
          }
        });
      }
    }
  }, [push]);

  return (
    <div className={styles.main}>
      <div className={styles.pageContainer}>
        <div className={styles.container}>
          <div className={styles.leftContainer}>
            <div className={styles.fullContentBar}>
              <div className={styles.favouriteCities}>
                <LargeCard
                  body={<FavouriteCity />}
                  title="Favourite Cities"
                  titleIcon={CityLight}
                />
              </div>
              <div className={styles.searchContainer}>
                <SearchCity />
              </div>
            </div>
          </div>
          <div className={styles.rightContainer}>
            <LargeCard
              body={<DefaultCity />}
              title="Cities"
              titleIcon={CityLight}
              noMarginWrap={true}
            />
          </div>
        </div>
      </div>
    </div >
  );
}
