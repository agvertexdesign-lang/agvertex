import React, { useState, useRef, useEffect } from 'react';

export const HeroCADCanvas: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.defaultMuted = true;
      video.muted = true;
      
      const playVideo = () => {
        video.play().catch((err) => {
          console.warn("HeroCADCanvas video autoplay blocked:", err);
        });
      };
      
      playVideo();

      const handleVisibility = () => {
        if (document.visibilityState === 'visible') {
          playVideo();
        }
      };
      document.addEventListener('visibilitychange', handleVisibility);
      return () => document.removeEventListener('visibilitychange', handleVisibility);
    }
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: x * 10, y: -y * 10 });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full h-[380px] sm:h-[480px] md:h-[580px] flex items-center justify-center select-none"
    >
      {/* Technical Blueprint SVG Drawing Overlay with Dimension Lines */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-30 sm:opacity-40 z-0 stroke-blue-500/40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50%" cy="50%" r="180" strokeWidth="1" strokeDasharray="4 4" />
        <circle cx="50%" cy="50%" r="240" strokeWidth="0.75" />
        
        {/* Dimension callouts */}
        <path d="M 80 100 L 240 100" strokeWidth="1" />
        <text x="140" y="92" fill="#0057FF" fontSize="10" fontFamily="monospace" fontWeight="600">Ø62.5</text>

        {/* Angular Coordinate Crosshairs */}
        <line x1="50%" y1="10%" x2="50%" y2="90%" strokeWidth="0.5" strokeDasharray="2 2" />
        <line x1="10%" y1="50%" x2="90%" y2="50%" strokeWidth="0.5" strokeDasharray="2 2" />
      </svg>

      {/* Radial Blue Ambient Glow Backdrop */}
      <div className="absolute w-[320px] sm:w-[480px] h-[320px] sm:h-[480px] bg-[#0057FF]/15 rounded-full blur-3xl pointer-events-none animate-pulse-glow" />

      {/* Clean High-Definition Video Container */}
      <div
        className="relative z-10 w-full max-w-[340px] sm:max-w-[460px] md:max-w-[520px] aspect-square rounded-3xl overflow-hidden shadow-[0_25px_60px_rgba(0,87,255,0.18)] border border-blue-200/80 bg-white/80 backdrop-blur-md transition-transform duration-300 ease-out"
        style={{
          transform: `perspective(1000px) rotateY(${tilt.x}deg) rotateX(${tilt.y}deg)`
        }}
      >
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          defaultMuted
          playsInline
          // @ts-ignore
          webkit-playsinline="true"
          preload="auto"
          className="w-full h-full object-cover mix-blend-multiply rounded-3xl"
        >
          <source src="/new_final.mp4" type="video/mp4" />
          <source src="/hero_video.mp4" type="video/mp4" />
          <source src="/hero_gearbox_assembly.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Inner Vignette Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#F8FAFC]/40 via-transparent to-transparent pointer-events-none rounded-3xl" />
      </div>

    </div>
  );
};
