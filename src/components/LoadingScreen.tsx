'use client';

import { useEffect, useState } from 'react';

interface LoadingScreenProps {
  onComplete: () => void;
}

export function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const duration = 1500; // 1.5 seconds
    const startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const rawProgress = Math.min(elapsed / duration, 1);
      
      // Apply easing function for smoother feel
      const easedProgress = easeOutCubic(rawProgress);
      const percentage = easedProgress * 100;
      
      setProgress(percentage);

      if (rawProgress < 1) {
        requestAnimationFrame(animate);
      } else {
        setTimeout(onComplete, 200); // Small delay after reaching 100%
      }
    };

    requestAnimationFrame(animate);

    return () => {
      // Cleanup if component unmounts
    };
  }, [onComplete]);

  // Easing function for smoother animation
  const easeOutCubic = (t: number): number => {
    return 1 - Math.pow(1 - t, 3);
  };

  return (
    <div className="fixed inset-0 bg-white flex items-center justify-center z-50 overflow-hidden">
      {/* LAYER 1: Subtle Grid Pattern */}
      <div
        className="absolute inset-0 opacity-[0.02] animate-grid-move"
        style={{
          backgroundImage: `
            linear-gradient(to right, #0f172a 1px, transparent 1px),
            linear-gradient(to bottom, #0f172a 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
      />

      {/* LAYER 2: Ambient Light Orbs */}
      <div
        className="absolute top-[-10%] left-[-10%] w-[30vw] h-[30vw] bg-cyan-primary-400/10 rounded-full blur-[80px] animate-pulse-slow"
        style={{ animationDuration: '6s' }}
      />
      <div
        className="absolute bottom-[-10%] right-[-10%] w-[25vw] h-[25vw] bg-teal-400/10 rounded-full blur-[80px] animate-float"
        style={{ animationDuration: '8s' }}
      />
      <div
        className="absolute top-[50%] left-[60%] w-[20vw] h-[20vw] bg-slate-300/8 rounded-full blur-[60px] animate-pulse-slow"
        style={{ animationDelay: '1s', animationDuration: '10s' }}
      />

      {/* LAYER 3: Subtle Noise Texture */}
      <div
        className="absolute inset-0 opacity-[0.15] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.6' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative z-10 text-center space-y-8 max-w-md mx-auto px-6">
        {/* Logo/Brand */}
        <div className="space-y-4">
          <div className="w-16 h-16 mx-auto bg-gradient-to-br from-cyan-primary-500 to-teal-500 rounded-2xl flex items-center justify-center shadow-xl shadow-cyan-primary-500/20">
            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center shadow-inner">
              <div className="w-4 h-4 bg-cyan-primary-500 rounded" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-slate-900">KalshChain</h1>
        </div>

        {/* Loading Text */}
        <div className="space-y-2">
          <p className="text-cyan-primary-600 font-mono text-sm tracking-wider uppercase font-semibold">
            Initializing Privacy Engine
          </p>

          {/* Progress Bar */}
          <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden shadow-inner">
            <div
              className="h-full bg-gradient-to-r from-cyan-primary-500 to-teal-500 rounded-full transition-all duration-75 ease-linear shadow-sm"
              style={{
                width: `${progress}%`,
                boxShadow: '0 0 8px rgba(6, 182, 212, 0.4)'
              }}
            />
          </div>

          <p className="text-slate-600 text-sm font-medium">
            {Math.round(progress)}%
          </p>
        </div>

        {/* Subtle hint */}
        <p className="text-slate-500 text-xs leading-relaxed">
          Establishing secure connection to Solana network...
        </p>
      </div>
    </div>
  );
}