'use client'
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import styles from "../app/weather-card.module.scss";
import Image from 'next/image';
import { ReactNode } from "react";

interface WeatherCardProps {
    icon: StaticImport;
    title: string;
    dataItem: ReactNode;
    dataItemDetails?: ReactNode;
    footerItemDetails?: ReactNode;
}

export default function WeatherCard({ icon, title, dataItem, dataItemDetails }: WeatherCardProps) {
    return (
        <div className={styles.weatherCard}>
            <div className={styles.header}>
                <Image src={icon} alt="temperature icon" />
                <span>{title}</span>
            </div>
            <div className={styles.body}>
                <div className={styles.dataItem}>
                    {dataItem}
                </div>
                <div className={styles.dataItemDetails}>
                    {dataItemDetails}
                </div>
            </div>

            <div className={styles.footerItemDetails}>
                {dataItemDetails}
            </div>
        </div>
    );
}
