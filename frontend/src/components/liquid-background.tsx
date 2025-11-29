"use client";

import { useEffect, useRef, useState } from "react";

export function LiquidBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (!mounted) return;

        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let animationId: number;

        const setCanvasSize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        // Initial size set
        setCanvasSize();
        window.addEventListener("resize", setCanvasSize);

        // Particle system
        class Particle {
            x: number;
            y: number;
            vx: number;
            vy: number;
            radius: number;
            color: string;

            constructor(w: number, h: number) {
                this.x = Math.random() * w;
                this.y = Math.random() * h;
                this.vx = (Math.random() - 0.5) * 0.5;
                this.vy = (Math.random() - 0.5) * 0.5;
                this.radius = Math.random() * 100 + 50;

                const colors = [
                    "rgba(124, 58, 237, 0.15)", // purple
                    "rgba(168, 85, 247, 0.15)", // violet
                    "rgba(59, 130, 246, 0.15)", // blue
                    "rgba(147, 51, 234, 0.15)", // purple-600
                ];
                this.color = colors[Math.floor(Math.random() * colors.length)];
            }

            update(w: number, h: number) {
                this.x += this.vx;
                this.y += this.vy;

                if (this.x < 0 || this.x > w) this.vx *= -1;
                if (this.y < 0 || this.y > h) this.vy *= -1;
            }

            draw() {
                if (!ctx) return;
                const gradient = ctx.createRadialGradient(
                    this.x,
                    this.y,
                    0,
                    this.x,
                    this.y,
                    this.radius
                );
                gradient.addColorStop(0, this.color);
                gradient.addColorStop(1, "rgba(0, 0, 0, 0)");

                ctx.fillStyle = gradient;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        const particles: Particle[] = [];
        for (let i = 0; i < 15; i++) {
            particles.push(new Particle(canvas.width, canvas.height));
        }

        const animate = () => {
            if (!canvas || !ctx) return;
            ctx.fillStyle = "rgba(15, 23, 42, 0.1)";
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            particles.forEach((particle) => {
                particle.update(canvas.width, canvas.height);
                particle.draw();
            });

            animationId = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.removeEventListener("resize", setCanvasSize);
            cancelAnimationFrame(animationId);
        };
    }, [mounted]);

    // Return null on server/initial render to prevent hydration mismatch
    if (!mounted) return null;

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 -z-10 bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 pointer-events-none"
            style={{ zIndex: -10 }}
        />
    );
}
