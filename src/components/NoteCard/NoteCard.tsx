'use client'
import styles from "./component.module.scss";
import { Note } from "@/store/notes";
import { formatDistanceToNow } from "date-fns";

interface NoteCardProps {
    note: Note;
}

export default function NoteCard({ note }: NoteCardProps) {
    const { date, text } = note;
    return (
        <div className={styles.noteContainer}>
            <div className={styles.content}>
                {text}
            </div>
            <div className={styles.footer}>
                {formatDistanceToNow(date, { addSuffix: true })}
            </div>
        </div>
    )
}


