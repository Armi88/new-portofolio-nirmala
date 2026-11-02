'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Play, Pause } from 'lucide-react';
import { cn } from '../../lib/utils';

export interface WaveFieldProps {
  headline?: string;
  className?: string;
}

export function WaveField({
  headline = "HARMONIC",
  className = "",
}: WaveFieldProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isRunning, setIsRunning] = useState(true);

  const pointerRef = useRef({ x: -2000, y: -2000, targetX: -2000, targetY: -2000 });
  const isRunningRef = useRef(isRunning);
  isRunningRef.current = isRunning;

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    let animId = 0;
    let time = 0;

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const rect = entry.contentRect;
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        canvas.width = Math.floor(rect.width * dpr);
        canvas.height = Math.floor(rect.height * dpr);
        canvas.style.width = `${rect.width}px`;
        canvas.style.height = `${rect.height}px`;
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.scale(dpr, dpr);
      }
    });
    resizeObserver.observe(container);

    const render = () => {
      if (isRunningRef.current) {
        time += 0.015;
      }

      const width = container.clientWidth;
      const height = container.clientHeight;
      const pointer = pointerRef.current;

      pointer.x += (pointer.targetX - pointer.x) * 0.1;
      pointer.y += (pointer.targetY - pointer.y) * 0.1;

      const isDark = document.documentElement.classList.contains('dark') || true;
      ctx.fillStyle = isDark ? '#0e1120' : '#ffffff';
      ctx.fillRect(0, 0, width, height);

      const lines = 32;
      const stepY = height / (lines + 1);

      for (let i = 0; i < lines; i++) {
        const yBase = stepY * (i + 1);
        ctx.beginPath();
        const points = 100;
        const stepX = width / points;

        for (let p = 0; p <= points; p++) {
          const x = p * stepX;
          const dx = x - pointer.x;
          const dy = yBase - pointer.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const influence = dist < 250 ? (1 - dist / 250) * 35 : 0;

          const wave = Math.sin(p * 0.1 + time + i * 0.2) * 18 + Math.cos(p * 0.05 - time * 0.8) * 12;
          const y = yBase + wave - influence;

          if (p === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }

        const alpha = 0.15 + (i / lines) * 0.45;
        ctx.strokeStyle = `rgba(209, 179, 213, ${alpha})`;
        ctx.lineWidth = 1.2;
        ctx.stroke();
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);
    return () => {
      cancelAnimationFrame(animId);
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      onMouseMove={(e) => {
        const rect = containerRef.current?.getBoundingClientRect();
        if (rect) {
          pointerRef.current.targetX = e.clientX - rect.left;
          pointerRef.current.targetY = e.clientY - rect.top;
        }
      }}
      onMouseLeave={() => {
        pointerRef.current.targetX = -2000;
        pointerRef.current.targetY = -2000;
      }}
      className={cn("wave-field-container relative flex h-[340px] md:h-[380px] w-full select-none flex-col justify-between overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-xl dark:border-zinc-800 dark:bg-[#040507]", className)}
    >
      <canvas ref={canvasRef} className="wave-field-canvas absolute inset-0 block h-full w-full cursor-crosshair" />
      <div className="wave-field-overlay relative z-20 flex h-full w-full flex-col justify-between p-6 md:p-8">
        <header className="wave-field-header flex w-full items-center justify-between font-mono text-[11px] text-zinc-600 dark:text-zinc-400">
          <div className="wave-field-badge flex items-center gap-2">
            <span className="wave-field-indicator-dot" />
            <span className="wave-field-indicator-label">WAVE FIELD OSCILLATOR</span>
          </div>
          <button
            type="button"
            onClick={() => setIsRunning(!isRunning)}
            className="wave-field-btn flex items-center gap-1.5 rounded-lg border border-zinc-300 bg-zinc-100/80 px-2.5 py-1.5 backdrop-blur-md transition-colors hover:bg-zinc-200 dark:border-zinc-800 dark:bg-zinc-900/70 dark:hover:bg-zinc-800"
          >
            {isRunning ? <Pause className="size-3 w-3.5 h-3.5" /> : <Play className="size-3 w-3.5 h-3.5" />}
            <span>{isRunning ? "FREEZE" : "RUN"}</span>
          </button>
        </header>
        <main className="wave-field-main pointer-events-none flex flex-col items-center justify-center text-center text-zinc-900 mix-blend-difference dark:text-white">
          <h2 className="wave-field-headline font-mono text-4xl sm:text-5xl md:text-6xl font-black tracking-tighter uppercase">{headline}</h2>
          <p className="wave-field-subtext text-xs tracking-widest uppercase opacity-75 mt-1 font-mono">Interactive Motion Canvas</p>
        </main>
        <footer className="wave-field-footer flex w-full items-center justify-between text-[11px] font-mono text-zinc-400">
          <span>INTERACTIVE PHYSICS</span>
          <span>MOUSE REACTIVE</span>
        </footer>
      </div>
    </div>
  );
}

export default WaveField;
