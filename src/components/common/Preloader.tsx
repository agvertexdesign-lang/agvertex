import React, { useEffect, useRef, useState } from 'react';

interface PreloaderProps {
  onComplete?: () => void;
}

const TOTAL_DURATION_MS = 4000; // 4 seconds

export const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [displayNumber, setDisplayNumber] = useState(0);
  const [statusText, setStatusText] = useState('INITIALIZING MECHANICAL DESIGN SUITE...');
  const [isDone, setIsDone] = useState(false);
  const [fadeAway, setFadeAway] = useState(false);

  // Refs to touch the DOM directly — bypasses React batching entirely
  const barRef = useRef<HTMLDivElement>(null);
  const onCompleteRef = useRef(onComplete);
  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    let rafId: number;
    let startTime: number | null = null;
    let completed = false;

    // Kick the CSS bar animation immediately via a direct style mutation.
    // CSS transitions run on the GPU compositor thread — completely
    // independent of React rendering and JS main-thread load.
    const bar = barRef.current;
    if (bar) {
      // Start at scaleX(0), force layout flush, then animate to scaleX(1)
      // GPU compositor guarantees this animation is never blocked by CPU work
      bar.style.transform = 'scaleX(0)';
      bar.getBoundingClientRect(); // flush layout
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          if (!completed) bar.style.transform = 'scaleX(1)';
        });
      });
    }

    const finish = () => {
      if (completed) return;
      completed = true;
      setDisplayNumber(100);
      setFadeAway(true);
      
      if (onCompleteRef.current) onCompleteRef.current();

      // Smooth unmount after 300ms opacity transition finishes
      setTimeout(() => {
        setIsDone(true);
      }, 300);
    };

    // rAF loop drives ONLY the text counter + status label
    // These are low-frequency updates (~10fps effective) so batching is fine
    const tick = (timestamp: number) => {
      if (completed) return;
      if (startTime === null) startTime = timestamp;

      const elapsed = timestamp - startTime;
      const pct = Math.min((elapsed / TOTAL_DURATION_MS) * 100, 100);

      setDisplayNumber(Math.floor(pct));

      if (pct < 35) {
        setStatusText('INITIALIZING MECHANICAL DESIGN SUITE...');
      } else if (pct < 75) {
        setStatusText('LOADING CAD DATA & DRAWING ENGINE...');
      } else {
        setStatusText('SYSTEM READY. WELCOME TO AG VERTEX.');
      }

      if (pct >= 100) {
        finish();
      } else {
        rafId = requestAnimationFrame(tick);
      }
    };

    // Safety cutoff if tab goes background mid-load
    const safetyTimer = setTimeout(finish, TOTAL_DURATION_MS + 1000);

    rafId = requestAnimationFrame(tick);

    return () => {
      completed = true;
      cancelAnimationFrame(rafId);
      clearTimeout(safetyTimer);
    };
  }, []);

  if (isDone) return null;

  return (
    <div className={`fixed inset-0 z-[100] bg-[#F8FAFC] flex flex-col items-center justify-center p-6 transition-all duration-300 ease-out ${
      fadeAway ? 'opacity-0 scale-98 pointer-events-none' : 'opacity-100 scale-100'
    }`}>

      {/* Background Ambient Glow */}
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
            {displayNumber}%
          </div>
        </div>

        {/* Progress Bar — driven by CSS transition on the DOM ref, not React state */}
        <div className="w-full h-2.5 rounded-full bg-slate-200/80 overflow-hidden relative border border-slate-300/50 shadow-inner">
          <div
            ref={barRef}
            className="h-full w-full bg-gradient-to-r from-[#0057FF] to-[#2D8CFF] shadow-[0_0_14px_rgba(0,87,255,0.7)]"
            style={{
              transform: 'scaleX(0)',
              transformOrigin: 'left',
              // scaleX is composited on the GPU — absolutely immune to main thread/React rendering lag
              transition: `transform ${TOTAL_DURATION_MS}ms linear`,
              willChange: 'transform',
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
