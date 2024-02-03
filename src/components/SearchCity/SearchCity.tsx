import { useState } from "react";
import { debounce } from "lodash";
import Link from "next/link";
import { ChangeEvent } from "react";
import { CityDetails, searchForCity } from "@/utils/requests/weatherstack";
import styles from "./component.module.scss";

export default function SearchCity() {
    const [note, setNote] = useState<string>("");
    const [suggestions, setSuggestions] = useState<CityDetails[]>([]);

    const debouncedSearch = debounce(async (value: string) => {
        if (value.length >= 2) {
            const matchingCities = await searchForCity(value);
            setSuggestions(matchingCities);
        } else {
            setSuggestions([]);
        }
    }, 800);

    const handleTextChange = (e: ChangeEvent<HTMLInputElement>) => {
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
                    value={note}
                />
            </form>
            <div className={styles.autoCompleteContainer}>
                {suggestions.map(({ fullName, coordinates }, index) => (
                    <div key={index} className={styles.suggestionCard}>
                        <Link href={`/details?location=${coordinates}`} target="_blank">
                            <div>{fullName}</div>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}
