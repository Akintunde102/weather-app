'use client'
import styles from "@/app/css/details.module.scss";
import Rays from "@/images/icons/ultraviolet.svg";
import Wind from "@/images/icons/wind-turbines.svg"
import Notes from "@/images/icons/notes.svg"
import NotesComponent from "@/components/Notes/Notes";
import { useEffect, useState } from "react";
import AddNote from "../AddNote/AddNote";
import useNoteStore, { Note } from "@/store/notes";
import LargeCard from "@/components/LargeCard/LargeCard";
import WeatherCard, { BackgroundVariant } from "@/components/WeatherCard/WeatherCard";
import { WeatherDataForDisplay } from "@/utils/map-weather-data-for-display";

interface RightDetailsProps {
    weatherDetails: WeatherDataForDisplay;
}

export default function RightDetails({ weatherDetails }: RightDetailsProps) {

    const { weather, location } = weatherDetails;
    const [submissionFeedback, setSubmissionFeedback] = useState<string>("");
    const { notes, addNote, getNotesByLocationFullName } = useNoteStore();

    const [notesInView, setNotesInView] = useState<Note[]>();

    useEffect(() => {
        const notes = getNotesByLocationFullName(location.fullName);
        setNotesInView(notes);
    }, [getNotesByLocationFullName, notes]);

    const submitNote = (note: string) => {
        addNote(note, location.fullName);
    }

    return (
        <div className={styles.rightContainer}>
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
            </div>
            <LargeCard
                body={<AddNote setSubmissionFeedback={setSubmissionFeedback} submit={submitNote} />}
                title="Add Note"
                titleIcon={Notes}
                leftTitle={submissionFeedback}
            />
            <LargeCard
                body={<NotesComponent weatherDetails={weatherDetails} />}
                title="List of Notes"
                titleIcon={Notes}
            />
        </div>
    );
}
