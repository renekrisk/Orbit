"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Calendar, Flag, CheckCircle2, Circle, ArrowLeft, Star } from "lucide-react";
import { useState, useEffect } from "react";
import Link from "next/link";

type Task = {
    id: string;
    title: string;
    completed: boolean;
    priority: "high" | "medium" | "low";
    dueDate?: string;
};

const MOCK_TASKS: Task[] = [
    { id: "1", title: "Review Q4 roadmap", completed: false, priority: "high", dueDate: "Today" },
    { id: "2", title: "Email marketing team", completed: true, priority: "medium" },
    { id: "3", title: "Update documentation", completed: false, priority: "low", dueDate: "Tomorrow" },
];

export default function TasksPage() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [newTask, setNewTask] = useState("");
    const [isLoaded, setIsLoaded] = useState(false);

    // Load tasks from localStorage
    useEffect(() => {
        const savedTasks = localStorage.getItem("orbit_tasks");
        if (savedTasks) {
            setTasks(JSON.parse(savedTasks));
        } else {
            setTasks(MOCK_TASKS);
        }
        setIsLoaded(true);
    }, []);

    // Save tasks to localStorage
    useEffect(() => {
        if (isLoaded) {
            localStorage.setItem("orbit_tasks", JSON.stringify(tasks));
        }
    }, [tasks, isLoaded]);

    const addTask = () => {
        if (!newTask.trim()) return;
        setTasks([
            {
                id: Math.random().toString(),
                title: newTask,
                completed: false,
                priority: "medium",
                dueDate: "Today"
            },
            ...tasks,
        ]);
        setNewTask("");
    };

    const toggleTask = (id: string) => {
        setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
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
                            <Link href="/tasks" className="text-white font-medium">Tasks</Link>
                            <Link href="/notes" className="hover:text-white transition-colors">Notes</Link>
                        </nav>
                        <div className="w-8" /> {/* Spacer for balance */}
                    </div>
                </header>

                <div className="container max-w-5xl py-32 px-4 md:px-6">
                    {/* Page Header */}
                    <div className="space-y-6 mb-12 text-center">
                        <div className="inline-flex items-center gap-2 rounded-full border border-green-500/30 bg-green-500/10 backdrop-blur-sm px-4 py-2 text-sm">
                            <CheckCircle2 className="h-4 w-4 text-green-400" />
                            <span className="text-green-200 font-medium">Smart Tasks</span>
                        </div>
                        <h1 className="text-5xl md:text-6xl font-black tracking-tighter text-white">
                            Focus on what <span className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">matters</span>
                        </h1>
                        <p className="text-xl text-white/60 max-w-2xl mx-auto">
                            Intelligent task management that adapts to your workflow.
                        </p>
                    </div>

                    {/* Quick Add */}
                    <div className="relative mb-12 group">
                        <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-emerald-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <div className="relative flex gap-3 p-2 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm">
                            <Input
                                placeholder="Add a new task..."
                                value={newTask}
                                onChange={(e) => setNewTask(e.target.value)}
                                onKeyDown={(e) => e.key === "Enter" && addTask()}
                                className="h-14 bg-transparent border-none text-lg text-white placeholder:text-white/40 focus-visible:ring-0"
                            />
                            <Button
                                onClick={addTask}
                                size="lg"
                                className="h-14 px-8 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-semibold rounded-xl"
                            >
                                <Plus className="h-5 w-5" />
                            </Button>
                        </div>
                    </div>

                    {/* Tasks List */}
                    <div className="space-y-4">
                        {tasks.map((task) => (
                            <div
                                key={task.id}
                                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-6 transition-all duration-300 hover:bg-white/10 hover:border-white/20"
                            >
                                <div className="flex items-start gap-4">
                                    <button
                                        onClick={() => toggleTask(task.id)}
                                        className="mt-1 text-white/40 hover:text-green-400 transition-colors"
                                    >
                                        {task.completed ? (
                                            <CheckCircle2 className="h-6 w-6 text-green-400" />
                                        ) : (
                                            <Circle className="h-6 w-6" />
                                        )}
                                    </button>
                                    <div className="flex-1 space-y-2">
                                        <p className={`font-medium text-lg ${task.completed ? "line-through text-white/40" : "text-white"}`}>
                                            {task.title}
                                        </p>
                                        <div className="flex items-center gap-4 text-sm">
                                            {task.dueDate && (
                                                <span className="flex items-center gap-1.5 text-white/60">
                                                    <Calendar className="h-4 w-4" />
                                                    {task.dueDate}
                                                </span>
                                            )}
                                            <span className={`flex items-center gap-1.5 font-medium ${task.priority === 'high' ? 'text-red-400' :
                                                task.priority === 'medium' ? 'text-yellow-400' : 'text-blue-400'
                                                }`}>
                                                <Flag className="h-4 w-4" />
                                                {task.priority}
                                            </span>
                                        </div>
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
