"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, Brain, Zap, Sparkles, Github, Star, TrendingUp, Shield } from "lucide-react";
import Link from "next/link";
import dynamic from "next/dynamic";

const LiquidBackground = dynamic(() => import("@/components/liquid-background").then(mod => mod.LiquidBackground), {
  ssr: false
});

export default function Home() {
  return (
    <>
      <LiquidBackground />
      <div className="relative flex min-h-screen flex-col text-foreground">
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
              <Link href="/login" className="hover:text-white transition-colors">Login</Link>
            </nav>
            <Button asChild size="sm" className="bg-white text-black hover:bg-white/90">
              <Link href="/signup">
                Get Started
              </Link>
            </Button>
          </div>
        </header>

        <main className="flex-1">
          {/* Hero Section */}
          <section className="relative min-h-screen flex items-center justify-center px-4 pt-20">
            <div className="max-w-6xl mx-auto text-center space-y-8">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/10 backdrop-blur-sm px-4 py-2 text-sm">
                <Star className="h-4 w-4 text-purple-400 fill-purple-400" />
                <span className="text-purple-200 font-medium">AI-Powered Knowledge System</span>
              </div>

              {/* Main Heading */}
              <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tighter">
                <span className="block text-white">Think</span>
                <span className="block bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                  Organize
                </span>
                <span className="block text-white">Execute</span>
              </h1>

              {/* Subheading */}
              <p className="text-xl sm:text-2xl md:text-3xl text-white/60 max-w-3xl mx-auto leading-relaxed">
                Your second brain. Powered by AI to capture, connect, and amplify your ideas.
              </p>

              {/* CTA */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
                <div className="flex gap-2 w-full sm:w-auto">
                  <Input
                    placeholder="Enter your email"
                    className="h-14 bg-white/10 border-white/20 text-white placeholder:text-white/40 backdrop-blur-sm w-full sm:w-80"
                  />
                  <Button asChild size="lg" className="h-14 px-8 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-semibold">
                    <Link href="/tasks">
                      Start Free <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                </div>
              </div>

              {/* Stats */}
              <div className="flex flex-wrap justify-center gap-8 pt-12 text-white/60">
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-green-400" />
                  <span className="text-sm">10K+ Users</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4 text-blue-400" />
                  <span className="text-sm">Bank-level Security</span>
                </div>
                <div className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-purple-400" />
                  <span className="text-sm">AI-Powered</span>
                </div>
              </div>
            </div>
          </section>

          {/* Features Section */}
          <section id="features" className="relative py-32 px-4">
            <div className="max-w-7xl mx-auto">
              <div className="text-center space-y-4 mb-20">
                <h2 className="text-5xl sm:text-6xl md:text-7xl font-black text-white">
                  Built for <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">creators</span>
                </h2>
                <p className="text-xl text-white/60 max-w-2xl mx-auto">
                  Everything you need to manage your digital life in one place
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <FeatureCard
                  icon={<Brain className="h-8 w-8" />}
                  title="Neural Notes"
                  description="AI automatically links related ideas and surfaces connections you never knew existed."
                  gradient="from-purple-500/20 to-pink-500/20"
                />
                <FeatureCard
                  icon={<Zap className="h-8 w-8" />}
                  title="Instant Capture"
                  description="Capture thoughts at the speed of thinking. Voice, text, or images—we handle it all."
                  gradient="from-blue-500/20 to-cyan-500/20"
                />
                <FeatureCard
                  icon={<Sparkles className="h-8 w-8" />}
                  title="AI Assistant"
                  description="Chat with your knowledge base. Get summaries, insights, and answers instantly."
                  gradient="from-pink-500/20 to-purple-500/20"
                />
                <FeatureCard
                  icon={<TrendingUp className="h-8 w-8" />}
                  title="Smart Tasks"
                  description="Auto-prioritized tasks that adapt to your workflow and deadlines."
                  gradient="from-green-500/20 to-emerald-500/20"
                />
                <FeatureCard
                  icon={<Shield className="h-8 w-8" />}
                  title="Private & Secure"
                  description="Your data is encrypted end-to-end. We can't read it, and neither can anyone else."
                  gradient="from-slate-500/20 to-gray-500/20"
                />
                <FeatureCard
                  icon={<Star className="h-8 w-8" />}
                  title="Workflow Magic"
                  description="Automate repetitive tasks and connect your favorite tools seamlessly."
                  gradient="from-yellow-500/20 to-orange-500/20"
                />
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="relative py-32 px-4">
            <div className="max-w-4xl mx-auto text-center space-y-8">
              <h2 className="text-5xl sm:text-6xl md:text-7xl font-black text-white">
                Ready to <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">level up</span>?
              </h2>
              <p className="text-xl text-white/60">
                Join thousands of creators, founders, and thinkers using ORBIT
              </p>
              <Button asChild size="lg" className="h-16 px-12 text-lg bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white font-semibold">
                <Link href="/tasks">
                  Start Your Journey <ArrowRight className="ml-2 h-6 w-6" />
                </Link>
              </Button>
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer className="relative border-t border-white/10 py-8 backdrop-blur-sm">
          <div className="container flex flex-col items-center justify-center gap-4 px-4">
            <div className="flex items-center gap-2 text-sm text-white/60">
              <Github className="h-4 w-4" />
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors"
              >
                Source code available on GitHub
              </a>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}

function FeatureCard({
  icon,
  title,
  description,
  gradient
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  gradient: string;
}) {
  return (
    <div className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-sm p-8 transition-all duration-500 hover:scale-105 hover:border-white/20 hover:bg-white/10">
      <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
      <div className="relative z-10 space-y-4">
        <div className="text-white group-hover:scale-110 transition-transform duration-500">
          {icon}
        </div>
        <h3 className="text-2xl font-bold text-white">{title}</h3>
        <p className="text-white/60 leading-relaxed">{description}</p>
      </div>
    </div>
  );
}
