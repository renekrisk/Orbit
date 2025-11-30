"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { ArrowLeft, Mail, Lock, Github } from "lucide-react";

export default function LoginPage() {
    return (
        <>
            <div className="fixed inset-0 -z-10 bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950" />
            <div className="relative min-h-screen flex flex-col items-center justify-center p-4 text-foreground">

                {/* Back Button */}
                <div className="absolute top-8 left-8">
                    <Button asChild variant="ghost" className="text-white/60 hover:text-white hover:bg-white/10">
                        <Link href="/">
                            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Orbit
                        </Link>
                    </Button>
                </div>

                <div className="w-full max-w-md space-y-8">
                    {/* Header */}
                    <div className="text-center space-y-2">
                        <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-blue-500 mb-4">
                            <span className="text-white text-xl font-bold">O</span>
                        </div>
                        <h1 className="text-3xl font-bold tracking-tight text-white">Welcome back</h1>
                        <p className="text-white/60">Enter your credentials to access your workspace</p>
                    </div>

                    {/* Card */}
                    <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 space-y-6 shadow-2xl">
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-white/80">Email</label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-3 h-5 w-5 text-white/40" />
                                    <Input
                                        placeholder="name@example.com"
                                        className="pl-10 h-11 bg-white/5 border-white/10 text-white placeholder:text-white/30 focus-visible:ring-purple-500"
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-white/80">Password</label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-3 h-5 w-5 text-white/40" />
                                    <Input
                                        type="password"
                                        placeholder="••••••••"
                                        className="pl-10 h-11 bg-white/5 border-white/10 text-white placeholder:text-white/30 focus-visible:ring-purple-500"
                                    />
                                </div>
                            </div>
                        </div>

                        <Button className="w-full h-11 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-semibold">
                            Sign In
                        </Button>

                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <span className="w-full border-t border-white/10" />
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="bg-slate-950 px-2 text-white/40">Or continue with</span>
                            </div>
                        </div>

                        <Button variant="outline" className="w-full h-11 border-white/10 bg-white/5 text-white hover:bg-white/10 hover:text-white">
                            <Github className="mr-2 h-4 w-4" /> Github
                        </Button>
                    </div>

                    <p className="text-center text-sm text-white/60">
                        Don't have an account?{" "}
                        <Link href="/signup" className="font-medium text-purple-400 hover:text-purple-300 transition-colors">
                            Sign up
                        </Link>
                    </p>
                </div>
            </div>
        </>
    );
}
