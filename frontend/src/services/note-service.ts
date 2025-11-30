import { storage } from "./storage";

export type Note = {
    id: string;
    title: string;
    content: string;
    tags: string[];
    date: string;
};

const STORAGE_KEY = "orbit_notes";

const MOCK_NOTES: Note[] = [
    {
        id: "1",
        title: "Project Phoenix Ideas",
        content: "Key features for the new launch include AI integration and real-time collaboration...",
        tags: ["project", "ideas", "urgent"],
        date: "2h ago"
    },
    {
        id: "2",
        title: "Meeting Notes: Design Sync",
        content: "Discussed the new color palette. Action items: Update global CSS variables...",
        tags: ["meeting", "design"],
        date: "5h ago"
    },
    {
        id: "3",
        title: "Book Recommendations",
        content: "1. The Pragmatic Programmer\n2. Clean Code\n3. Designing Data-Intensive Applications",
        tags: ["learning", "books"],
        date: "1d ago"
    },
];

export const noteService = {
    getAll: (): Note[] => {
        return storage.get<Note[]>(STORAGE_KEY, MOCK_NOTES);
    },

    saveAll: (notes: Note[]): void => {
        storage.set(STORAGE_KEY, notes);
    },

    add: (content: string, tags: string[] = []): Note[] => {
        const notes = noteService.getAll();
        const newNote: Note = {
            id: Math.random().toString(),
            title: "New Note",
            content,
            tags,
            date: "Just now"
        };
        const updatedNotes = [newNote, ...notes];
        noteService.saveAll(updatedNotes);
        return updatedNotes;
    }
};
