'use client'
import styles from "@/app/css/details.module.scss";
import Rays from "@/images/icons/ultraviolet.svg";
import Wind from "@/images/icons/wind-turbines.svg"
import Notes from "@/images/icons/notes.svg"
import NotesComponent from "@/components/Notes/Notes"
import Eye from "@/images/icons/eye.svg";
import Humidity from "@/images/icons/humidity.svg";
import { useState } from "react";
import AddNote from "../AddNote/AddNote";
import useNoteStore from "@/store/notes";
import LargeCard from "@/components/LargeCard/LargeCard";
import WeatherCard, { BackgroundVariant } from "@/components/WeatherCard/WeatherCard";
import { WeatherDataForDisplay } from "@/utils/map-weather-data-for-display";
import Button from "../Button/Button";

interface RightDetailsProps {
    weatherDetails: WeatherDataForDisplay;
}

export default function RightDetails({ weatherDetails }: RightDetailsProps) {

    const { weather, location } = weatherDetails;
    const [submissionFeedback, setSubmissionFeedback] = useState<string>("");
    const { addNote } = useNoteStore();
    const [showNoteList, setShowNoteList] = useState(false);

    const submitNote = (note: string) => {
        addNote(note, location.fullName);
        setShowNoteList(true);
    }

    return (
        <div className={styles.rightContainer} data-testid="right-details">
            <div className={styles.rightWeatherCards}>
                <WeatherCard
                    title="Wind"
                    icon={Wind}
                    dataItem={<span>{weather.wind.degree}<sup>&deg;</sup></span>}
                    dataItemDetails={<span>with a speed of {weather.wind.speed} m/h</span>}
                    footerItemDetails={<span>Direction: {weather.wind.dir}</span>}
                    backgroundVariant={BackgroundVariant.transparentBlack}
                />
                <WeatherCard
                    title="UV"
                    icon={Rays}
                    dataItem={<span>{weather.uvIndex}</span>}
                    backgroundVariant={BackgroundVariant.transparentBlack}
                />
                <WeatherCard
                    title="Visibility"
                    icon={Eye}
                    dataItem={<span>{weather.visibility} mi</span>}
                    backgroundVariant={BackgroundVariant.transparentBlack}
                />
                <WeatherCard
                    title="Humidity"
                    icon={Humidity}
                    dataItem={<span>{weather.humidity}%</span>}
                    backgroundVariant={BackgroundVariant.transparentBlack}
                />

            </div>
            <div className={styles.notesContainer}>
                {
                    showNoteList ? (
                        <LargeCard
                            body={
                                <NotesComponent weatherDetails={weatherDetails} />
                            }
                            title="List of Notes"
                            titleIcon={Notes}
                            rightItem={<Button onClick={() => setShowNoteList(false)} title="Add Note" />}
                        />
                    ) : (
                        <LargeCard
                            body={<AddNote setSubmissionFeedback={setSubmissionFeedback} submit={submitNote} />}
                            title="Add Note"
                            titleIcon={Notes}
                            noMarginWrap={true}
                            rightItem={submissionFeedback || <Button onClick={() => setShowNoteList(true)} title="Show List of Notes" />}
                        />
                    )
                }</div>
        </div >
    );
}
