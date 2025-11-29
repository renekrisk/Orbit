"use client";

import * as React from "react";
import { Command } from "cmdk";
import { Calculator, Calendar, CreditCard, Settings, Smile, User, Search } from "lucide-react";
import { useRouter } from "next/navigation";

export function CommandPalette() {
    const [open, setOpen] = React.useState(false);
    const router = useRouter();

    React.useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                setOpen((open) => !open);
            }
        };

        document.addEventListener("keydown", down);
        return () => document.removeEventListener("keydown", down);
    }, []);

    const runCommand = React.useCallback((command: () => void) => {
        setOpen(false);
        command();
    }, []);

    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-[20vh] bg-black/50 backdrop-blur-sm">
            <Command className="w-full max-w-lg rounded-xl border bg-popover text-popover-foreground shadow-2xl overflow-hidden">
                <div className="flex items-center border-b px-3" cmdk-input-wrapper="">
                    <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
                    <Command.Input
                        placeholder="Type a command or search..."
                        className="flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
                    />
                </div>
                <Command.List className="max-h-[300px] overflow-y-auto overflow-x-hidden p-2">
                    <Command.Empty className="py-6 text-center text-sm">No results found.</Command.Empty>

                    <Command.Group heading="Suggestions" className="px-2 py-1.5 text-xs font-medium text-muted-foreground">
                        <Command.Item onSelect={() => runCommand(() => router.push('/tasks'))} className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none aria-selected:bg-accent aria-selected:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50">
                            <Calendar className="mr-2 h-4 w-4" />
                            <span>Tasks</span>
                        </Command.Item>
                        <Command.Item onSelect={() => runCommand(() => router.push('/notes'))} className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none aria-selected:bg-accent aria-selected:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50">
                            <Smile className="mr-2 h-4 w-4" />
                            <span>Notes</span>
                        </Command.Item>
                        <Command.Item onSelect={() => runCommand(() => router.push('/'))} className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none aria-selected:bg-accent aria-selected:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50">
                            <Calculator className="mr-2 h-4 w-4" />
                            <span>Home</span>
                        </Command.Item>
                    </Command.Group>

                    <Command.Separator className="-mx-1 h-px bg-border" />

                    <Command.Group heading="Settings" className="px-2 py-1.5 text-xs font-medium text-muted-foreground">
                        <Command.Item className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none aria-selected:bg-accent aria-selected:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50">
                            <User className="mr-2 h-4 w-4" />
                            <span>Profile</span>
                            <span className="ml-auto text-xs tracking-widest text-muted-foreground">⌘P</span>
                        </Command.Item>
                        <Command.Item className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none aria-selected:bg-accent aria-selected:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50">
                            <CreditCard className="mr-2 h-4 w-4" />
                            <span>Billing</span>
                            <span className="ml-auto text-xs tracking-widest text-muted-foreground">⌘B</span>
                        </Command.Item>
                        <Command.Item className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none aria-selected:bg-accent aria-selected:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50">
                            <Settings className="mr-2 h-4 w-4" />
                            <span>Settings</span>
                            <span className="ml-auto text-xs tracking-widest text-muted-foreground">⌘S</span>
                        </Command.Item>
                    </Command.Group>
                </Command.List>
            </Command>
        </div>
    );
}
