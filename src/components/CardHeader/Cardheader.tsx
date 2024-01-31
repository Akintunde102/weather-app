'use client'
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import styles from "./component.module.scss";
import Image from 'next/image';

interface CardHeaderProps {
    icon: StaticImport;
    title: string;
    withDivider?: boolean;
    leftTitle?: string;
}

export default function CardHeader({ icon, title, withDivider = false, leftTitle }: CardHeaderProps) {
    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <div className={styles.left}>
                    <Image src={icon} alt="icon" />
                    <span>{title}</span>
                </div>
                {
                    leftTitle ? <div className={styles.right}>{leftTitle}</div> : <></>
                }
            </div>

            {
                withDivider ? (<div className={styles.divider} />) : (<></>)
            }

        </div>
    );
}
