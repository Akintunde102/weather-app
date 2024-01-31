import { v4 as uuidv4 } from 'uuid';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Note {
    id: string;
    text: string;
    date: Date;
    locationFullName: string;
}

interface NoteStore {
    notes: Note[];
    addNote: (note: string, locationFullName: string) => void;
    deleteNote: (id: string) => void;
    editNote: (id: string, newText: string) => void;
    getNotesByLocationFullName: (locationFullName: string) => Note[];
}

const createNote = (text: string, locationFullName: string): Note => {
    return {
        id: uuidv4(),
        text,
        locationFullName,
        date: new Date(),
    };
};

const useNoteStore = create<NoteStore>()(
    persist(
        (set, get) => ({
            notes: get()?.notes || [],
            addNote: (note, locationFullName) =>
                set((state) => ({
                    notes: [createNote(note, locationFullName), ...state.notes],
                })),
            deleteNote: (id) =>
                set((state) => ({
                    notes: state.notes.filter((note) => note.id !== id),
                })),
            editNote: (id, newText) =>
                set((state) => ({
                    notes: state.notes.map((note) =>
                        note.id === id ? { ...note, text: newText, date: new Date() } : note
                    ),
                })),
            getNotesByLocationFullName: (locationFullName) =>
                get().notes.filter((note) => note.locationFullName === locationFullName),
        }),
        {
            name: 'notes',
        }
    )
);

export default useNoteStore;
