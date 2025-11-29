"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Plus, Hash, Sparkles, Brain, ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useAI } from "@/hooks/use-ai";

type Note = {
    id: string;
    title: string;
    content: string;
    tags: string[];
    date: string;
};

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

export default function NotesPage() {
    const [notes, setNotes] = useState<Note[]>([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [newNote, setNewNote] = useState("");
    const [isLoaded, setIsLoaded] = useState(false);
    const { extractKeywords, isReady } = useAI();

    // Load notes from localStorage
    useEffect(() => {
        const savedNotes = localStorage.getItem("orbit_notes");
        if (savedNotes) {
            setNotes(JSON.parse(savedNotes));
        } else {
            setNotes(MOCK_NOTES);
        }
        setIsLoaded(true);
    }, []);

    // Save notes to localStorage
    useEffect(() => {
        if (isLoaded) {
            localStorage.setItem("orbit_notes", JSON.stringify(notes));
        }
    }, [notes, isLoaded]);

    const addNote = async () => {
        if (!newNote.trim()) return;

        const tags = await extractKeywords(newNote);

        setNotes([
            {
                id: Math.random().toString(),
                title: "New Note",
                content: newNote,
                tags: tags,
                date: "Just now"
            },
            ...notes,
        ]);
        setNewNote("");
    };

    return (
        <>
            <div className="fixed inset-0 -z-10 bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950" />
            <div className="relative min-h-screen text-foreground">
                {/* Floating Header */}
                <header className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-full max-w-5xl px-4">
                    <div className="flex h-14 items-center justify-between rounded-full border border-white/10 bg-black/40 backdrop-blur-xl px-6 shadow-2xl">
                        <Link href="/" className="flex items-center gap-2 font-bold text-lg">
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-purple-500 to-blue-500">
                                <span className="text-white text-sm font-bold">O</span>
                            </div>
                            <span className="text-white">ORBIT</span>
                        </Link>
                        <nav className="hidden md:flex items-center gap-6 text-sm text-white/80">
                            <Link href="/#features" className="hover:text-white transition-colors">Features</Link>
                            <Link href="/tasks" className="hover:text-white transition-colors">Tasks</Link>
                            <Link href="/notes" className="text-white font-medium">Notes</Link>
                        </nav>
                        <div className="w-8" />
                    </div>
                </header>

                <div className="container max-w-5xl py-32 px-4 md:px-6">
                    {/* Page Header */}
                    <div className="space-y-6 mb-12 text-center">
                        <div className="inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/10 backdrop-blur-sm px-4 py-2 text-sm">
                            <Brain className="h-4 w-4 text-purple-400" />
                            <span className="text-purple-200 font-medium">Neural Notes</span>
                            {isReady && (
                                <span className="flex h-2 w-2 rounded-full bg-green-500 animate-pulse ml-2" title="AI Active" />
                            )}
                        </div>
                        <h1 className="text-5xl md:text-6xl font-black tracking-tighter text-white">
                            Capture your <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">thoughts</span>
                        </h1>
                        <p className="text-xl text-white/60 max-w-2xl mx-auto">
                            AI-powered note taking that organizes itself.
                        </p>
                    </div>

                    {/* Search & Capture */}
                    <div className="grid gap-6 md:grid-cols-[1fr_1.5fr] mb-12">
                        {/* Search */}
                        <div className="relative group">
                            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            <div className="relative flex items-center px-4 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm h-full min-h-[3.5rem]">
                                <Search className="h-5 w-5 text-white/40 mr-3" />
                                <input
                                    placeholder="Search your mind..."
                                    className="bg-transparent border-none text-white placeholder:text-white/40 focus:outline-none w-full h-full"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                        </div>

                        {/* Quick Capture */}
                        <div className="relative group">
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            <div className="relative flex gap-3 p-2 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm">
                                <Input
                                    placeholder="Type a note..."
                                    value={newNote}
                                    onChange={(e) => setNewNote(e.target.value)}
                                    onKeyDown={(e) => e.key === "Enter" && addNote()}
                                    className="h-14 bg-transparent border-none text-lg text-white placeholder:text-white/40 focus-visible:ring-0"
                                />
                                <Button
                                    onClick={addNote}
                                    size="lg"
                                    className="h-14 px-8 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-semibold rounded-xl"
                                >
                                    <Sparkles className="h-5 w-5" />
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* Notes Grid */}
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {notes.filter(n => n.title.toLowerCase().includes(searchQuery.toLowerCase()) || n.content.toLowerCase().includes(searchQuery.toLowerCase())).map((note) => (
                            <div
                                key={note.id}
                                className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm p-6 transition-all duration-300 hover:scale-[1.02] hover:bg-white/10 hover:border-white/20 hover:shadow-2xl"
                            >
                                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                <div className="relative z-10 space-y-4">
                                    <div className="flex items-start justify-between">
                                        <h3 className="font-bold text-xl text-white group-hover:text-purple-300 transition-colors">
                                            {note.title}
                                        </h3>
                                        <span className="text-xs text-white/40 font-mono">{note.date}</span>
                                    </div>
                                    <p className="text-white/60 line-clamp-3 leading-relaxed">
                                        {note.content}
                                    </p>
                                    <div className="flex flex-wrap gap-2 pt-2">
                                        {note.tags.map(tag => (
                                            <span key={tag} className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/5 text-xs text-white/60 border border-white/5 group-hover:border-white/10 group-hover:bg-white/10 transition-colors">
                                                <Hash className="h-3 w-3" />
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}
