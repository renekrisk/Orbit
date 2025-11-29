"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sparkles, Send, X, MessageSquare } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

type Message = {
    role: "user" | "assistant";
    content: string;
};

export function AIChat() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        { role: "assistant", content: "Hi! I'm Orbit AI. Ask me anything about your notes or tasks." }
    ]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, isOpen]);

    const sendMessage = async () => {
        if (!input.trim()) return;

        const userMsg = { role: "user" as const, content: input };
        setMessages(prev => [...prev, userMsg]);
        setInput("");
        setIsLoading(true);

        // Mock AI response
        setTimeout(() => {
            const responses = [
                "I found a note about that in 'Project Ideas'.",
                "You have a task due tomorrow related to this.",
                "Based on your notes, you should prioritize the marketing email.",
                "I've added that to your task list."
            ];
            const randomResponse = responses[Math.floor(Math.random() * responses.length)];

            setMessages(prev => [...prev, { role: "assistant", content: randomResponse }]);
            setIsLoading(false);
        }, 1500);
    };

    return (
        <>
            <Button
                size="icon"
                className={cn(
                    "fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg transition-all duration-300 hover:scale-105 z-50",
                    isOpen && "rotate-90 scale-0 opacity-0"
                )}
                onClick={() => setIsOpen(true)}
            >
                <Sparkles className="h-6 w-6" />
            </Button>

            <div
                className={cn(
                    "fixed bottom-6 right-6 w-[350px] sm:w-[400px] h-[500px] bg-background border rounded-2xl shadow-2xl flex flex-col transition-all duration-300 z-50 overflow-hidden",
                    isOpen ? "scale-100 opacity-100 translate-y-0" : "scale-95 opacity-0 translate-y-10 pointer-events-none"
                )}
            >
                <div className="flex items-center justify-between p-4 border-b bg-muted/50">
                    <div className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
                            <Sparkles className="h-4 w-4 text-primary-foreground" />
                        </div>
                        <div>
                            <h3 className="font-semibold text-sm">Orbit AI</h3>
                            <p className="text-xs text-muted-foreground">Always active</p>
                        </div>
                    </div>
                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setIsOpen(false)}>
                        <X className="h-4 w-4" />
                    </Button>
                </div>

                <div className="flex-1 overflow-y-auto p-4 space-y-4" ref={scrollRef}>
                    {messages.map((msg, i) => (
                        <div
                            key={i}
                            className={cn(
                                "flex w-max max-w-[80%] flex-col gap-2 rounded-lg px-3 py-2 text-sm",
                                msg.role === "user"
                                    ? "ml-auto bg-primary text-primary-foreground"
                                    : "bg-muted"
                            )}
                        >
                            {msg.content}
                        </div>
                    ))}
                    {isLoading && (
                        <div className="bg-muted w-max rounded-lg px-3 py-2 text-sm">
                            <span className="animate-pulse">Thinking...</span>
                        </div>
                    )}
                </div>

                <div className="p-4 border-t bg-background">
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            sendMessage();
                        }}
                        className="flex items-center gap-2"
                    >
                        <Input
                            placeholder="Ask your notes..."
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            className="flex-1"
                        />
                        <Button type="submit" size="icon" disabled={isLoading}>
                            <Send className="h-4 w-4" />
                        </Button>
                    </form>
                </div>
            </div>
        </>
    );
}
