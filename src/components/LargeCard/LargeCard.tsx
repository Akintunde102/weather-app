'use client'
import styles from "./component.module.scss";
import CardHeader from "@/components/CardHeader/Cardheader";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import { ReactNode } from "react";

interface LargeCardProps {
    body: ReactNode;
    title: string;
    leftTitle?: string;
    titleIcon: StaticImport;
    noMarginWrap?: boolean;
}

export default function LargeCard({ body, title, leftTitle, titleIcon, noMarginWrap = false }: LargeCardProps) {
    return (
        <div className={styles.container} style={noMarginWrap ? {} : {
            marginTop: "4%"
        }}>
            <CardHeader icon={titleIcon} title={title} withDivider leftTitle={leftTitle} />
            <div className={styles.body}>
                {body}
            </div>
        </div>
    );
}