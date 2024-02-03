'use client'
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import styles from "./component.module.scss";
import Image from 'next/image';
import { ReactNode } from "react";

interface CardHeaderProps {
    icon: StaticImport;
    title: string;
    withDivider?: boolean;
    rightItem?: ReactNode;
}

export default function CardHeader({ icon, title, withDivider = false, rightItem }: CardHeaderProps) {
    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <div className={styles.left}>
                    <Image src={icon} alt="icon" />
                    <span>{title}</span>
                </div>
                {
                    rightItem ? <div className={styles.right}>{rightItem}</div> : <></>
                }
            </div>
            {
                withDivider ? (<div className={styles.divider} data-testid="divider" />) : (<></>)
            }
        </div>
    );
}
