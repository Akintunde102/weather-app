'use client'
import styles from "./component.module.scss";
import LoadingIcon from "@/components/LoadingIcon/LoadingIcon";
import { useFavouriteCityStore } from "@/store/cities";
import CityCard from "../CityCard/CityCard";
import { sortCitiesByName } from "@/utils/sort-cities";
import useNoteStore, { Note } from "@/store/notes";
import { useState, useEffect } from "react";
import NoteCard from "../NoteCard/NoteCard";
import { WeatherDataForDisplay } from "@/utils/map-weather-data-for-display";

interface NotesProps {
    weatherDetails: WeatherDataForDisplay;
}

export default function Notes({ weatherDetails }: NotesProps) {
    const { notes, addNote, getNotesByLocationFullName } = useNoteStore();

    const [notesInView, setNotesInView] = useState<Note[]>();

    const { location } = weatherDetails;

    useEffect(() => {
        const notes = getNotesByLocationFullName(location.fullName);
        setNotesInView(notes);
    }, [getNotesByLocationFullName, notes]);


    const listIsEmpty = (notesInView || []).length === 0


    if (notesInView === undefined) {
        return <div className={styles.centringContainer}><LoadingIcon /></div>;
    }

    if (listIsEmpty) {
        return <div className={styles.centringContainer}>No Notes Yet</div>;
    }

    return notesInView.map((note, i) => <NoteCard note={note} key={i} />);
}
