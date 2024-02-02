'use client'
import styles from "./component.module.scss";
import { Note } from "@/store/notes";
import Tick from "@/images/icons/tick.svg";
import Image from "next/image";
import { ChangeEvent, useState } from "react";

interface EditNoteProps {
    note: Note;
    submitNote: (id: string, text: string) => void
}

export function EditNote({ note, submitNote }: EditNoteProps) {

    const { text: initialText, id } = note;

    const [text, setText] = useState(initialText);

    const submitNoteHandler = (e: any) => {
        e.preventDefault()
        submitNote(id, text);
    }

    const onEditHandler = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        const value = e.target.value;
        setText(value);
    }

    return (
        <div className={styles.container} data-testid="edit-note">
            <input value={text} className={styles.input} autoFocus onChange={onEditHandler} />
            <div className={styles.submitContainer} >
                <Image src={Tick} alt="submit note" onClick={submitNoteHandler} className={styles.submitButton} />
            </div>
        </div>
    )
}
