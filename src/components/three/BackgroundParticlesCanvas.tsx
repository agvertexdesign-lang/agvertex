import React, { useEffect, useRef } from 'react';

export const BackgroundParticlesCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Track mouse position for interactive contour warp
    let mouse = { x: -1000, y: -1000, active: false };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.active = true;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
      mouse.active = false;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    const resize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', resize);

    let time = 0;

    // Number of contour isolines across height
    const contourCount = 28;

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      time += 0.008;

      // 1. Moving Subtle CAD Grid Layer (Bright crisp white grid lines)
      const gridSize = 80;
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.45)';
      ctx.lineWidth = 1;

      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // 2. Render Topographic / FEA Elevation Contour Lines in Glowing White
      const lineSpacing = height / contourCount;

      for (let i = 0; i < contourCount + 4; i++) {
        const baseY = (i - 2) * lineSpacing;
        const isMajorContour = i % 5 === 0;

        ctx.beginPath();
        ctx.lineWidth = isMajorContour ? 2.2 : 1.3;
        ctx.strokeStyle = isMajorContour
          ? 'rgba(255, 255, 255, 0.95)'
          : 'rgba(255, 255, 255, 0.6)';

        let firstPoint = true;

        // Draw smooth contour curve across horizontal width
        for (let x = 0; x <= width + 40; x += 25) {
          // Multi-frequency wave calculation for natural topography
          const wave1 = Math.sin(x * 0.003 + time + i * 0.35) * 35;
          const wave2 = Math.cos(x * 0.0015 - time * 0.8 + i * 0.2) * 45;
          const wave3 = Math.sin(x * 0.005 + time * 1.2) * 15;

          let y = baseY + wave1 + wave2 + wave3;

          // Interactive Mouse Displacement (Cursor pushes/curves contour lines)
          if (mouse.active) {
            const dx = x - mouse.x;
            const dy = y - mouse.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            const radius = 220;

            if (dist < radius) {
              const push = (1 - dist / radius) * 45;
              // Repel y away from cursor
              y += (dy > 0 ? 1 : -1) * push;
            }
          }

          if (firstPoint) {
            ctx.moveTo(x, y);
            firstPoint = false;
          } else {
            ctx.lineTo(x, y);
          }
        }

        ctx.stroke();

      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Dynamic Animated Ambient Orbs in Background */}
      <div className="absolute top-1/4 -left-20 w-[600px] h-[600px] bg-[#0057FF]/12 rounded-full blur-[140px] animate-orb-float-1" />
      <div className="absolute top-2/3 -right-20 w-[700px] h-[700px] bg-[#2D8CFF]/15 rounded-full blur-[160px] animate-orb-float-2" />

      {/* Topographic Contour Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 opacity-100"
      />
    </div>
  );
};
