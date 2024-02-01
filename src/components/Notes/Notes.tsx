'use client'
import styles from "./component.module.scss";
import LoadingIcon from "@/components/LoadingIcon/LoadingIcon";
import useNoteStore, { Note } from "@/store/notes";
import { useState, useEffect } from "react";
import NoteCard from "../NoteCard/NoteCard";
import { WeatherDataForDisplay } from "@/utils/map-weather-data-for-display";

interface NotesProps {
    weatherDetails: WeatherDataForDisplay;
}

export default function Notes({ weatherDetails }: NotesProps) {
    const { notes, getNotesByLocationFullName, editNote, deleteNote } = useNoteStore();

    const [notesInView, setNotesInView] = useState<Note[]>();

    const { location } = weatherDetails;

    useEffect(() => {
        const notes = getNotesByLocationFullName(location.fullName);
        setNotesInView(notes);
    }, [getNotesByLocationFullName, notes, location]);


    const listIsEmpty = (notesInView || []).length === 0


    if (notesInView === undefined) {
        return <div className={styles.centringContainer}><LoadingIcon /></div>;
    }

    if (listIsEmpty) {
        return <div className={styles.centringContainer}>No Notes Yet</div>;
    }

    return notesInView.map((note, i) => <NoteCard note={note} editNote={editNote} deleteNote={deleteNote} key={i} />);
}
