'use client'
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import styles from "./component.module.scss";
import { ReactNode } from "react";
import CardHeader from "../CardHeader/CardHeader";

export enum BackgroundVariant {
    transparentGrey = "rgba(45, 47, 56, 0.7)",
    transparentBlack = "rgba(25, 25, 25, 0.7)",
}

interface WeatherCardProps {
    icon: StaticImport;
    title: string;
    dataItem: ReactNode;
    dataItemDetails?: ReactNode;
    footerItemDetails?: ReactNode;
    backgroundVariant?: BackgroundVariant;
}

export default function WeatherCard({ icon, title, dataItem, dataItemDetails, footerItemDetails, backgroundVariant = BackgroundVariant.transparentGrey }: WeatherCardProps) {
    return (
        <div
            data-testid="weather-card"
            className={styles.weatherCard}
            style={{ background: backgroundVariant }}>
            <div className={styles.header}>
                <CardHeader icon={icon} title={title} />
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
                {footerItemDetails}
            </div>
        </div>
    );
}
