import React, { useEffect, useRef, useState } from 'react';

interface PreloaderProps {
  onComplete?: () => void;
}

const TOTAL_DURATION_MS = 2200;

export const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState('INITIALIZING MECHANICAL DESIGN SUITE...');
  const [isDone, setIsDone] = useState(false);

  // Stable ref so onComplete changes never re-trigger the animation
  const onCompleteRef = useRef(onComplete);
  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    let rafId: number;
    let startTime: number | null = null;
    let completed = false;

    const finish = () => {
      if (completed) return;
      completed = true;
      setProgress(100);
      // Brief pause at 100% so the bar is visibly full before fade-out
      setTimeout(() => {
        setIsDone(true);
        if (onCompleteRef.current) onCompleteRef.current();
      }, 150);
    };

    const tick = (timestamp: number) => {
      if (completed) return;

      if (startTime === null) {
        startTime = timestamp;
      }

      const elapsed = timestamp - startTime;
      const rawProgress = Math.min((elapsed / TOTAL_DURATION_MS) * 100, 100);

      setProgress(rawProgress);

      if (rawProgress < 35) {
        setStatusText('INITIALIZING MECHANICAL DESIGN SUITE...');
      } else if (rawProgress < 75) {
        setStatusText('LOADING CAD DATA & DRAWING ENGINE...');
      } else {
        setStatusText('SYSTEM READY. WELCOME TO AG VERTEX.');
      }

      if (rawProgress >= 100) {
        finish();
      } else {
        rafId = requestAnimationFrame(tick);
      }
    };

    // Hard safety cutoff — if rAF itself gets suspended (e.g. tab hidden) for too long
    const safetyTimer = setTimeout(finish, TOTAL_DURATION_MS + 800);

    rafId = requestAnimationFrame(tick);

    return () => {
      completed = true;
      cancelAnimationFrame(rafId);
      clearTimeout(safetyTimer);
    };
  }, []); // Runs exactly once — no external deps, no resets

  if (isDone) return null;

  return (
    <div
      className={`fixed inset-0 z-[100] bg-[#F8FAFC] flex flex-col items-center justify-center p-6 transition-opacity duration-300 ease-out ${
        progress >= 100 ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Background Subtle Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-[#0057FF]/10 rounded-full blur-3xl pointer-events-none animate-pulse" />

      <div className="relative z-10 flex flex-col items-center max-w-xs sm:max-w-sm w-full space-y-6 text-center">

        {/* Brand Logo */}
        <div className="relative">
          <div className="p-3.5 sm:p-4 rounded-2xl bg-white/90 backdrop-blur-md border border-slate-200 shadow-xl">
            <img
              src="/ag_vertex_logo.png"
              alt="AG VERTEX Logo"
              className="h-9 sm:h-11 w-auto object-contain"
            />
          </div>
        </div>

        {/* Status Text & Progress percentage */}
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-[#0057FF] text-[10px] font-mono font-bold tracking-widest uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-[#0057FF] animate-ping" />
            {statusText}
          </div>

          <div className="text-3xl sm:text-4xl font-heading font-bold text-[#0F172A] font-mono tracking-tight">
            {Math.floor(progress)}%
          </div>
        </div>

        {/* High-Precision Progress Bar */}
        <div className="w-full h-2 rounded-full bg-slate-200/80 overflow-hidden relative border border-slate-300/50 shadow-inner">
          <div
            className="h-full bg-gradient-to-r from-[#0057FF] to-[#2D8CFF] rounded-full shadow-[0_0_12px_rgba(0,87,255,0.6)]"
            style={{
              width: `${progress}%`,
              transition: 'width 0.05s linear',
            }}
          />
        </div>

        {/* Footprint */}
        <div className="flex items-center justify-between w-full text-[10px] font-mono text-slate-500 border-t border-slate-200/80 pt-3">
          <span>WINDSOR, ONTARIO</span>
          <span>AG VERTEX</span>
        </div>

      </div>

    </div>
  );
};
