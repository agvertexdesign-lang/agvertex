import React from 'react';
import { MapPin } from 'lucide-react';

export const InteractiveWorldMap: React.FC = () => {
  return (
    <div className="w-full relative select-none py-4">
      {/* SVG Map Canvas blending 100% seamlessly into website background */}
      <div className="w-full max-w-[1100px] mx-auto relative aspect-[2/1]">
        <svg
          viewBox="0 0 1000 500"
          className="w-full h-full overflow-visible drop-shadow-sm"
          style={{ background: 'transparent' }}
        >
          <defs>
            {/* Soft Radial Blue Glow Gradient */}
            <radialGradient id="nodeGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#0057FF" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#0057FF" stopOpacity="0" />
            </radialGradient>

            {/* Arc Gradient */}
            <linearGradient id="arcGradCanadaIndia" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#0057FF" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#38BDF8" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#0057FF" stopOpacity="0.8" />
            </linearGradient>

            <linearGradient id="arcGradIndiaNZ" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0057FF" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#38BDF8" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#0057FF" stopOpacity="0.8" />
            </linearGradient>

            {/* Subtle Dot Grid Pattern */}
            <pattern id="worldDotGrid" x="0" y="0" width="16" height="16" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1.2" fill="#0057FF" fillOpacity="0.08" />
            </pattern>
          </defs>

          {/* Background Technical Grid Fill */}
          <rect width="1000" height="500" fill="url(#worldDotGrid)" rx="24" />

          {/* WORLD CONTINENT VECTOR PATHS - Clean Technical Blueprint Outlines */}
          <g fill="rgba(0, 87, 255, 0.05)" stroke="rgba(0, 87, 255, 0.22)" strokeWidth="1.2" strokeLinejoin="round">
            {/* North America */}
            <path d="M120,60 L240,40 L310,70 L340,110 L300,160 L260,180 L220,240 L180,220 L150,170 L110,130 L90,90 Z M280,100 L350,80 L380,110 L320,130 Z" />
            
            {/* South America */}
            <path d="M250,250 L310,265 L340,320 L310,430 L270,450 L240,380 L230,300 Z" />
            
            {/* Europe */}
            <path d="M460,70 L530,60 L570,90 L550,140 L490,160 L450,120 L440,85 Z" />
            
            {/* Africa */}
            <path d="M440,180 L560,170 L580,240 L540,350 L480,370 L440,290 L430,220 Z" />
            
            {/* Asia */}
            <path d="M570,60 L780,45 L870,100 L840,200 L790,260 L710,270 L660,220 L580,170 Z" />
            
            {/* Australia */}
            <path d="M780,310 L870,300 L890,360 L840,410 L770,390 L750,340 Z" />
            
            {/* New Zealand */}
            <path d="M885,405 L900,395 L910,420 L895,445 Z" />
          </g>

          {/* DOTTED CONNECTING FLIGHT ARCS */}
          {/* Arc 1: Canada (240, 145) to India (690, 230) */}
          <path
            d="M 240 145 Q 465 50 690 230"
            fill="none"
            stroke="url(#arcGradCanadaIndia)"
            strokeWidth="2.5"
            strokeDasharray="6 6"
            className="animate-pulse"
          />

          {/* Arc 2: India (690, 230) to New Zealand (895, 425) */}
          <path
            d="M 690 230 Q 790 310 895 425"
            fill="none"
            stroke="url(#arcGradIndiaNZ)"
            strokeWidth="2.5"
            strokeDasharray="6 6"
            className="animate-pulse"
          />

          {/* NODE 1: CANADA (240, 145) */}
          <g transform="translate(240, 145)">
            <circle r="30" fill="url(#nodeGlow)" />
            <circle r="14" fill="#0057FF" fillOpacity="0.15" className="animate-ping" />
            <circle r="7" fill="#0057FF" stroke="#FFFFFF" strokeWidth="2" />
          </g>

          {/* NODE 2: INDIA (690, 230) */}
          <g transform="translate(690, 230)">
            <circle r="30" fill="url(#nodeGlow)" />
            <circle r="14" fill="#0057FF" fillOpacity="0.15" className="animate-ping" />
            <circle r="7" fill="#0057FF" stroke="#FFFFFF" strokeWidth="2" />
          </g>

          {/* NODE 3: NEW ZEALAND (895, 425) */}
          <g transform="translate(895, 425)">
            <circle r="30" fill="url(#nodeGlow)" />
            <circle r="14" fill="#0057FF" fillOpacity="0.15" className="animate-ping" />
            <circle r="7" fill="#0057FF" stroke="#FFFFFF" strokeWidth="2" />
          </g>
        </svg>

        {/* FLOATING GLASS LOCATION BADGES OVERLAY */}
        
        {/* CANADA BADGE (Top Left ~24% X, ~29% Y) */}
        <div 
          className="absolute left-[24%] top-[20%] -translate-x-1/2 -translate-y-full mb-3 z-10 transition-transform duration-300 hover:scale-105"
        >
          <div className="glass-card px-4 py-2.5 rounded-2xl bg-white/90 backdrop-blur-md border border-blue-200/90 shadow-xl flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-[#0057FF] text-white flex items-center justify-center shrink-0 shadow-md shadow-blue-500/20">
              <MapPin className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] font-mono font-black text-[#0057FF] bg-blue-50 px-1.5 py-0.5 rounded border border-blue-100">
                  CA
                </span>
                <span className="text-xs font-heading font-extrabold text-[#0F172A] tracking-wider uppercase">
                  CANADA
                </span>
              </div>
              <span className="text-[11px] font-bold text-slate-600 block">
                Canada (Headquarters)
              </span>
            </div>
          </div>
        </div>

        {/* INDIA BADGE (Middle Right ~69% X, ~46% Y) */}
        <div 
          className="absolute left-[69%] top-[38%] -translate-x-1/2 -translate-y-full mb-3 z-10 transition-transform duration-300 hover:scale-105"
        >
          <div className="glass-card px-4 py-2.5 rounded-2xl bg-white/90 backdrop-blur-md border border-blue-200/90 shadow-xl flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-[#0057FF] text-white flex items-center justify-center shrink-0 shadow-md shadow-blue-500/20">
              <MapPin className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] font-mono font-black text-[#0057FF] bg-blue-50 px-1.5 py-0.5 rounded border border-blue-100">
                  IN
                </span>
                <span className="text-xs font-heading font-extrabold text-[#0F172A] tracking-wider uppercase">
                  INDIA
                </span>
              </div>
              <span className="text-[11px] font-bold text-slate-600 block">
                Engineering & CAD Hub
              </span>
            </div>
          </div>
        </div>

        {/* NEW ZEALAND BADGE (Bottom Right ~89.5% X, ~85% Y) */}
        <div 
          className="absolute left-[89.5%] top-[76%] -translate-x-1/2 -translate-y-full mb-3 z-10 transition-transform duration-300 hover:scale-105"
        >
          <div className="glass-card px-4 py-2.5 rounded-2xl bg-white/90 backdrop-blur-md border border-blue-200/90 shadow-xl flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-[#0057FF] text-white flex items-center justify-center shrink-0 shadow-md shadow-blue-500/20">
              <MapPin className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] font-mono font-black text-[#0057FF] bg-blue-50 px-1.5 py-0.5 rounded border border-blue-100">
                  NZ
                </span>
                <span className="text-xs font-heading font-extrabold text-[#0F172A] tracking-wider uppercase">
                  NEW ZEALAND
                </span>
              </div>
              <span className="text-[11px] font-bold text-slate-600 block">
                APAC Quality & Operations
              </span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
