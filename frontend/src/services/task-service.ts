import { storage } from "./storage";

export type Task = {
    id: string;
    title: string;
    completed: boolean;
    priority: "high" | "medium" | "low";
    dueDate?: string;
};

const STORAGE_KEY = "orbit_tasks";

const MOCK_TASKS: Task[] = [
    { id: "1", title: "Review Q4 roadmap", completed: false, priority: "high", dueDate: "Today" },
    { id: "2", title: "Email marketing team", completed: true, priority: "medium" },
    { id: "3", title: "Update documentation", completed: false, priority: "low", dueDate: "Tomorrow" },
];

export const taskService = {
    getAll: (): Task[] => {
        return storage.get<Task[]>(STORAGE_KEY, MOCK_TASKS);
    },

    saveAll: (tasks: Task[]): void => {
        storage.set(STORAGE_KEY, tasks);
    },

    add: (title: string): Task[] => {
        const tasks = taskService.getAll();
        const newTask: Task = {
            id: Math.random().toString(),
            title,
            completed: false,
            priority: "medium",
            dueDate: "Today"
        };
        const updatedTasks = [newTask, ...tasks];
        taskService.saveAll(updatedTasks);
        return updatedTasks;
    },

    toggle: (id: string): Task[] => {
        const tasks = taskService.getAll();
        const updatedTasks = tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t);
        taskService.saveAll(updatedTasks);
        return updatedTasks;
    }
};
