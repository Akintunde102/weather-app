'use client'
import styles from "./component.module.scss";
import Image from 'next/image';
import { Note } from "@/store/notes";
import TinyPencil from "@/images/icons/tiny-pencil.svg";
import TinyDumpster from "@/images/icons/tiny-dumpster.svg";
import { formatDistanceToNow } from "date-fns";
import { useState } from "react";
import { EditNote } from "../EditNote/EditNote";

interface NoteCardProps {
    note: Note;
    editNote: (id: string, newText: string) => void;
    deleteNote: (id: string) => void;
}

export default function NoteCard({ note, editNote, deleteNote }: NoteCardProps) {
    const { date, text, id } = note;

    const [editMode, setEditMode] = useState(false);

    const submitNoteHandler = (id: string, newText: string) => {
        editNote(id, newText);
        setEditMode(false);
    }

    return (
        <div className={styles.noteContainer} data-testid="note-card">{
            editMode ? <EditNote note={note} submitNote={submitNoteHandler} /> : <>
                <div className={styles.content}>
                    {text}
                </div>
                <div className={styles.footer}>
                    <div className={styles.left}>
                        {formatDistanceToNow(date, { addSuffix: true })}
                    </div>
                    <div className={styles.right}>
                        <Image src={TinyPencil} alt="Tiny Edit Icon" onClick={() => { setEditMode(true) }} />
                        <Image src={TinyDumpster} alt="Tiny Delete Icon" onClick={() => {
                            deleteNote(id);
                        }} />
                    </div>
                </div>
            </>
        }
        </div>
    )
}


