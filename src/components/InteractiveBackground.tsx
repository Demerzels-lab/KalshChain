'use client';

import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  baseAlpha: number;
}

export function InteractiveBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let particles: Particle[] = [];
    let animationFrameId: number;
    let mouseX = -1000;
    let mouseY = -1000;

    // --- Configuration for "Ash" Feel ---
    const PARTICLE_COUNT = 150; // Increased for more striking effect
    const MOUSE_INFLUENCE_RADIUS = 200; // Increased for more interaction
    const PARTICLE_COLOR = '148, 163, 184'; // Slate-400 (Ash Gray)

    const resize = () => {
      if (canvas && canvas.parentElement) {
        // Set canvas to full window size for better resolution
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        initParticles();
      }
    };

    const initParticles = () => {
      particles = [];
      if (!canvas) return;
      
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const baseAlpha = Math.random() * 0.4 + 0.1; // Varied opacity
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.5, // More initial movement
          vy: (Math.random() - 0.5) * 0.5, 
          size: Math.random() * 3 + 1, // Larger "dust" size - upsized from tiny
          alpha: baseAlpha,
          baseAlpha: baseAlpha,
        });
      }
    };

    const draw = () => {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p) => {
        // --- 1. Movement Physics ---
        p.x += p.vx;
        p.y += p.vy;

        // Add random movement over time
        p.vx += (Math.random() - 0.5) * 0.02; // Random acceleration
        p.vy += (Math.random() - 0.5) * 0.02;

        // Wrap around screen (Infinite Ash)
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        // --- 2. Mouse Interaction ---
        const dx = mouseX - p.x;
        const dy = mouseY - p.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < MOUSE_INFLUENCE_RADIUS) {
          const force = (MOUSE_INFLUENCE_RADIUS - distance) / MOUSE_INFLUENCE_RADIUS;
          const angle = Math.atan2(dy, dx);
          
          // Push particles away gently
          const pushForce = 0.8;
          p.vx -= Math.cos(angle) * force * pushForce * 0.1;
          p.vy -= Math.sin(angle) * force * pushForce * 0.1;
          
          // Brighten particles near mouse
          p.alpha = Math.min(p.baseAlpha + 0.4, 0.8);
        } else {
          // Return to base alpha slowly
          if (p.alpha > p.baseAlpha) {
            p.alpha -= 0.01;
          }
        }

        // Apply friction to stabilize speed
        const maxSpeed = 1.0; // Increased max speed for more dynamic movement
        const friction = 0.95; // Reduced friction for more sustained movement
        p.vx *= friction;
        p.vy *= friction;

        // Enforce minimum drift so they don't stop completely
        if (Math.abs(p.vx) < 0.05) p.vx += (Math.random() - 0.5) * 0.02;
        if (Math.abs(p.vy) < 0.05) p.vy += (Math.random() - 0.5) * 0.02;

        // --- 3. Render ---
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${PARTICLE_COLOR}, ${p.alpha})`;
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', handleMouseMove);
    
    resize();
    draw();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div ref={containerRef} className="fixed inset-0 -z-10 overflow-hidden pointer-events-none bg-white">
      
      {/* LAYER 1: Kinetic Grid (Moving Background) */}
      <div 
        className="absolute inset-0 opacity-[0.08] animate-grid-move"
        style={{
          backgroundImage: `
            linear-gradient(to right, #0f172a 1px, transparent 1px),
            linear-gradient(to bottom, #0f172a 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
      />

      {/* LAYER 2: Ambient Atmosphere (Breathing Orbs) */}
      {/* Top Left - Cyan Primary */}
      <div 
        className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-cyan-primary-400/20 rounded-full blur-[100px] animate-pulse-slow" 
        style={{ animationDuration: '8s' }}
      />
      {/* Bottom Right - Teal Accent */}
      <div 
        className="absolute bottom-[-10%] right-[-10%] w-[40vw] h-[40vw] bg-teal-400/20 rounded-full blur-[100px] animate-float" 
        style={{ animationDuration: '10s' }}
      />
      {/* Center - Subtle Slate Depth */}
      <div 
        className="absolute top-[40%] left-[30%] w-[30vw] h-[30vw] bg-slate-300/15 rounded-full blur-[80px] animate-pulse-slow" 
        style={{ animationDelay: '2s', animationDuration: '12s' }}
      />

      {/* LAYER 3: Tactical Noise (The "Film Grain" Texture) */}
      {/* This mimics the QELVA noise filter exactly using SVG turbulence */}
      <div 
        className="absolute inset-0 opacity-[0.4] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* LAYER 4: Interactive Ash Particles (Canvas) */}
      <canvas 
        ref={canvasRef}
        className="absolute inset-0 w-full h-full opacity-80"
      />
    </div>
  );
}