'use client'
import styles from "./component.module.scss";
import createUIIndication from "@/utils/createUIIndication";
import { ChangeEvent, Dispatch, FormEvent, FormEventHandler, SetStateAction, SyntheticEvent, useReducer, useState } from "react";

interface AddNoteProps {
    submissionFeedback?: string;
    setSubmissionFeedback: Dispatch<SetStateAction<string>>;
    submit: (note: string) => void;
}

export default function AddNote({ setSubmissionFeedback, submit }: AddNoteProps) {
    const [note, setNote] = useState<string>();

    const { startEnd, start } = createUIIndication(setSubmissionFeedback)


    const handleTextChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setNote(e.target.value);
    };

    const handleSubmit = (e: FormEvent<HTMLButtonElement>) => {
        e.preventDefault();

        if (!note) {
            start("Please Type in notes before Submitting..");
            return;
        }

        submit(note);
        setNote("");
        startEnd({
            startValue: "Submitted Successfully....",
            endValue: "",
            delay: 500
        });
    }

    return (
        <form className={styles.addNoteFormContainer}>
            <textarea
                className={styles.textArea}
                placeholder="Type....."
                onChange={handleTextChange}
                required
                value={note}
            />
            <button
                className={styles.button}
                onClick={handleSubmit}
                type="button"
            >Add</button>
        </form >

    );
}
