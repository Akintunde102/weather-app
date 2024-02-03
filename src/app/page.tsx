'use client'
import styles from "../app/css/page.module.scss";
import CityLight from "@/images/icons/city-lights.svg"
import LargeCard from "@/components/LargeCard/LargeCard";
import SearchCity from "@/components/SearchCity/SearchCity";
import FavouriteCity from "@/components/FavoriteCity/FavoriteCity";
import DefaultCity from "@/components/DefaultCity/DefaultCity";
import useGeolocationRedirect from "@/hooks/useGeolocationRedirect";

export default function HomePage() {
  useGeolocationRedirect();

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
