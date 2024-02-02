'use client'
import styles from "./component.module.scss";
import { CityDetails, getCitySuggestions } from "@/utils/requests/geonames";
import { debounce } from "lodash";
import Link from "next/link";
import { ChangeEvent, useState } from "react";

export default function SearchCity() {
    const [note, setNote] = useState<string>("");
    const [suggestions, setSuggestions] = useState<CityDetails[]>([]);

    const debouncedSearch = debounce(async (value: string) => {
        const matchingCities = await getCitySuggestions(value);
        setSuggestions(matchingCities);
    }, 300);


    const handleTextChange = async (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setNote(value);
        debouncedSearch(value);
    };

    return (
        <div className={styles.container}>
            <form className={styles.formContainer}>
                <input
                    className={styles.textArea}
                    placeholder="Search City"
                    onChange={handleTextChange}
                    required
                    value={note}
                />
            </form >
            <div className={styles.autoCompleteContainer}>
                {suggestions.map(({ fullName, coordinates }, index) => {
                    return (
                        <div key={index} className={styles.suggestionCard}>
                            <Link href={`/details?location=${coordinates}`} target="_blank">
                                <div>
                                    {fullName}
                                </div>
                            </Link>
                        </div>
                    )
                })}
            </div>
        </div>
    );
}
