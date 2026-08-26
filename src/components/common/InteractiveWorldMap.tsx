import React from 'react';
import { MapPin } from 'lucide-react';

// Mercator projection formula:
//   x = (lon + 180) / 360 * 1000
//   y = (90 - lat) / 180 * 500
//
// Hub nodes:
//   Canada  (Ottawa)   lon=-75.7, lat=45.4  → cx≈290, cy≈124
//   India   (Mumbai)   lon=72.9,  lat=19.1  → cx≈703, cy≈197
//   NZ      (Auckland) lon=174.8, lat=-36.9 → cx≈986, cy≈352

export const InteractiveWorldMap: React.FC = () => {
  return (
    <div className="w-full relative select-none" style={{ paddingTop: '48px', paddingBottom: '48px' }}>
      <div
        className="w-full max-w-[1200px] mx-auto relative"
        style={{ aspectRatio: '2 / 1', overflow: 'visible' }}
      >
        {/* ── SVG WORLD MAP ── */}
        <svg
          viewBox="0 0 1000 500"
          className="w-full h-full absolute inset-0"
          style={{ overflow: 'visible' }}
        >
          <defs>
            {/* Fine blue dot grid */}
            <pattern id="wm-dot" x="0" y="0" width="18" height="18" patternUnits="userSpaceOnUse">
              <circle cx="1.5" cy="1.5" r="1.4" fill="rgba(0,87,255,0.07)" />
            </pattern>

            {/* Node glow */}
            <radialGradient id="wm-glow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#0057FF" stopOpacity="0.40" />
              <stop offset="100%" stopColor="#0057FF" stopOpacity="0" />
            </radialGradient>

            {/* Arc gradient */}
            <linearGradient id="wm-arc" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%"   stopColor="#0057FF" stopOpacity="0.7" />
              <stop offset="50%"  stopColor="#38BDF8" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#0057FF" stopOpacity="0.7" />
            </linearGradient>
          </defs>

          {/* Dot-grid background */}
          <rect width="1000" height="500" fill="url(#wm-dot)" />

          {/* Lat/lon grid lines */}
          <g stroke="rgba(0,87,255,0.06)" strokeWidth="0.7">
            {[50,100,150,200,250,300,350,400,450].map(y =>
              <line key={`h${y}`} x1="0" y1={y} x2="1000" y2={y} />
            )}
            {[100,200,300,400,500,600,700,800,900].map(x =>
              <line key={`v${x}`} x1={x} y1="0" x2={x} y2="500" />
            )}
          </g>

          {/* Equator dashed */}
          <line x1="0" y1="250" x2="1000" y2="250"
            stroke="rgba(0,87,255,0.14)" strokeWidth="1" strokeDasharray="4 8" />

          {/* ── CONTINENT PATHS (Simplified Mercator, real Earth shapes) ── */}
          <g
            fill="rgba(0,87,255,0.09)"
            stroke="rgba(0,87,255,0.30)"
            strokeWidth="1.1"
            strokeLinejoin="round"
            strokeLinecap="round"
          >

            {/* ━━━ NORTH AMERICA ━━━ */}
            {/* Main body: Alaska → Arctic Canada → East Coast → Gulf → Pacific */}
            <path d="
              M 62,105 L 70,85 L 78,68 L 90,55 L 105,48 L 122,46 L 142,44
              L 165,40 L 192,38 L 220,38 L 252,42 L 285,48 L 318,56
              L 342,66 L 356,80 L 362,100 L 355,122 L 342,140
              L 325,158 L 308,176 L 298,196 L 286,215 L 276,232
              L 268,252 L 260,268 L 252,278 L 242,268 L 230,255
              L 215,242 L 200,228 L 185,215 L 170,200 L 155,188
              L 140,172 L 125,158 L 108,142 L 92,128 L 76,116 Z
            "/>
            {/* Alaska western tip */}
            <path d="M 62,105 L 50,110 L 38,110 L 28,102 L 32,92 L 44,90 L 56,96 Z" />
            {/* Baja California */}
            <path d="M 195,202 L 200,195 L 205,192 L 208,200 L 204,215 L 198,218 Z" />
            {/* Central America isthmus */}
            <path d="M 260,268 L 270,262 L 280,268 L 275,285 L 264,292 L 255,282 Z" />
            {/* Cuba */}
            <path d="M 262,196 L 278,192 L 292,194 L 296,202 L 280,207 L 264,204 Z" />
            {/* Hispaniola + lesser antilles (dots) */}
            <circle cx="302" cy="198" r="3" />
            <circle cx="316" cy="200" r="2" />
            <circle cx="325" cy="202" r="2" />

            {/* GREENLAND */}
            <path d="
              M 318,24 L 342,12 L 368,15 L 395,26 L 408,46 L 404,66
              L 390,76 L 368,80 L 348,75 L 330,60 L 320,44 Z
            "/>

            {/* ━━━ SOUTH AMERICA ━━━ */}
            <path d="
              M 264,292 L 278,282 L 298,278 L 325,272 L 350,272
              L 372,280 L 390,298 L 400,322 L 398,350 L 388,382
              L 372,415 L 352,448 L 330,460 L 310,458 L 292,445
              L 278,428 L 268,405 L 260,378 L 256,348 L 254,318
              L 258,298 Z
            "/>

            {/* ━━━ EUROPE ━━━ */}
            {/* Main body */}
            <path d="
              M 452,102 L 460,84 L 470,70 L 482,62 L 498,58
              L 518,56 L 538,56 L 558,60 L 572,68 L 578,82
              L 575,98 L 565,112 L 552,126 L 540,140 L 525,150
              L 508,152 L 492,148 L 475,140 L 460,128 L 452,115 Z
            "/>
            {/* Iberian Peninsula */}
            <path d="M 452,115 L 460,128 L 455,142 L 448,150 L 440,144 L 438,130 L 444,116 Z" />
            {/* Scandinavia */}
            <path d="M 498,58 L 504,44 L 516,36 L 530,38 L 540,46 L 538,56 L 518,56 Z" />
            <path d="M 516,36 L 522,22 L 536,22 L 548,30 L 548,42 L 540,46 L 530,38 Z" />
            {/* UK */}
            <path d="M 450,90 L 458,84 L 465,90 L 462,104 L 452,102 Z" />
            {/* Ireland */}
            <path d="M 442,95 L 450,90 L 452,102 L 444,106 Z" />
            {/* Italy boot */}
            <path d="M 505,150 L 516,152 L 520,168 L 515,180 L 506,182 L 498,172 L 496,158 Z" />
            {/* Greece */}
            <path d="M 542,148 L 548,142 L 556,148 L 554,158 L 545,162 L 540,155 Z" />

            {/* ━━━ AFRICA ━━━ */}
            <path d="
              M 450,160 L 470,154 L 495,152 L 522,152 L 548,155
              L 568,164 L 585,182 L 596,208 L 598,238 L 595,268
              L 584,302 L 566,338 L 545,375 L 522,410 L 502,425
              L 482,422 L 462,408 L 448,388 L 438,362 L 434,335
              L 436,305 L 440,275 L 444,245 L 448,215 L 450,185 Z
            "/>
            {/* Horn of Africa */}
            <path d="M 598,238 L 614,228 L 625,240 L 620,255 L 605,262 L 596,252 Z" />
            {/* Madagascar */}
            <path d="M 590,318 L 600,308 L 610,318 L 608,342 L 596,352 L 585,342 Z" />

            {/* ━━━ ASIA (main Eurasian body) ━━━ */}
            <path d="
              M 578,82 L 602,75 L 632,68 L 665,60 L 702,52 L 740,46
              L 778,42 L 818,42 L 858,48 L 895,58 L 925,72 L 950,92
              L 965,115 L 962,140 L 950,162 L 932,178 L 912,192
              L 890,205 L 870,218 L 852,235 L 838,252 L 825,268
              L 812,285 L 798,298 L 778,308 L 758,310 L 738,308
              L 718,298 L 700,282 L 682,268 L 665,252 L 648,236
              L 632,220 L 618,205 L 604,190 L 592,175 L 582,158
              L 578,138 L 576,115 L 578,95 Z
            "/>
            {/* Arabian Peninsula */}
            <path d="
              M 594,175 L 608,168 L 622,170 L 632,182 L 635,200
              L 630,220 L 618,232 L 608,228 L 598,218 L 594,200 Z
            "/>
            {/* ★ INDIA PENINSULA ★ (node here: cx=700, cy=202) */}
            <path d="
              M 660,222 L 678,212 L 700,208 L 718,215 L 722,232
              L 718,252 L 708,270 L 696,280 L 680,275 L 666,260
              L 658,242 L 658,228 Z
            "/>
            {/* Sri Lanka */}
            <path d="M 714,282 L 720,276 L 726,284 L 720,292 Z" />
            {/* Indochina */}
            <path d="
              M 758,242 L 780,230 L 808,228 L 832,238 L 835,258
              L 825,278 L 808,292 L 790,298 L 772,285 L 760,265 Z
            "/>
            {/* Malay Peninsula */}
            <path d="M 790,298 L 800,295 L 808,305 L 805,322 L 796,325 L 788,315 Z" />
            {/* Korea */}
            <path d="M 858,158 L 866,150 L 873,156 L 870,170 L 860,174 L 854,168 Z" />
            {/* Japan (Honshu) */}
            <path d="M 878,148 L 895,138 L 908,146 L 910,162 L 900,172 L 882,170 Z" />
            {/* Japan (Kyushu/Shikoku) */}
            <path d="M 870,172 L 882,170 L 888,182 L 882,195 L 870,192 L 864,182 Z" />
            {/* Taiwan */}
            <path d="M 832,208 L 838,202 L 843,210 L 838,218 Z" />
            {/* Philippines (Luzon) */}
            <path d="M 845,218 L 858,212 L 864,222 L 858,234 L 846,234 Z" />
            {/* Mindanao */}
            <path d="M 858,240 L 866,235 L 872,242 L 868,252 L 858,252 Z" />
            {/* Borneo */}
            <path d="
              M 808,270 L 825,262 L 845,265 L 858,278 L 860,298
              L 842,308 L 820,308 L 808,298 Z
            "/>
            {/* Sumatra */}
            <path d="M 762,280 L 800,262 L 818,268 L 820,285 L 798,298 L 775,298 Z" />
            {/* Java */}
            <path d="M 778,308 L 815,302 L 848,305 L 852,318 L 822,325 L 788,322 Z" />
            {/* Sulawesi (simplified) */}
            <path d="M 862,282 L 872,275 L 882,280 L 880,295 L 870,302 L 858,298 Z" />
            {/* Papua New Guinea */}
            <path d="M 900,295 L 930,288 L 952,295 L 958,308 L 938,318 L 915,318 L 900,308 Z" />

            {/* ━━━ AUSTRALIA ━━━ */}
            <path d="
              M 802,308 L 838,298 L 875,295 L 910,298 L 940,312
              L 955,332 L 955,360 L 945,388 L 926,408 L 902,422
              L 876,428 L 848,426 L 822,416 L 802,398 L 790,378
              L 786,355 L 790,328 Z
            "/>
            {/* Tasmania */}
            <path d="M 900,432 L 910,428 L 920,436 L 914,448 L 900,448 Z" />

            {/* ━━━ NEW ZEALAND ━━━ (node cx≈986, cy≈352) */}
            {/* North Island */}
            <path d="M 958,344 L 970,336 L 980,344 L 984,358 L 978,374 L 966,380 L 956,368 Z" />
            {/* South Island */}
            <path d="M 952,380 L 966,376 L 980,384 L 980,402 L 966,414 L 950,410 L 942,396 Z" />

          </g>

          {/* ── ANIMATED DASHED CONNECTION ARCS ── */}
          {/* Canada → India */}
          <path
            d="M 290 124 Q 538 18 700 202"
            fill="none"
            stroke="url(#wm-arc)"
            strokeWidth="1.8"
            strokeDasharray="5 5"
            strokeLinecap="round"
          />
          {/* India → New Zealand */}
          <path
            d="M 700 202 Q 842 262 970 352"
            fill="none"
            stroke="url(#wm-arc)"
            strokeWidth="1.8"
            strokeDasharray="5 5"
            strokeLinecap="round"
          />

          {/* ── GLOW HALOS ── */}
          <circle cx="290" cy="124" r="30" fill="url(#wm-glow)" />
          <circle cx="700" cy="202" r="30" fill="url(#wm-glow)" />
          <circle cx="970" cy="352" r="30" fill="url(#wm-glow)" />

          {/* ── PING RINGS ── */}
          <circle cx="290" cy="124" r="14" fill="rgba(0,87,255,0.12)" className="animate-ping" />
          <circle cx="700" cy="202" r="14" fill="rgba(0,87,255,0.12)" className="animate-ping" style={{ animationDelay: '0.5s' }} />
          <circle cx="970" cy="352" r="14" fill="rgba(0,87,255,0.12)" className="animate-ping" style={{ animationDelay: '1s' }} />

          {/* ── NODE DOTS ── */}
          <circle cx="290" cy="124" r="7" fill="#0057FF" stroke="white" strokeWidth="2.5" />
          <circle cx="700" cy="202" r="7" fill="#0057FF" stroke="white" strokeWidth="2.5" />
          <circle cx="970" cy="352" r="7" fill="#0057FF" stroke="white" strokeWidth="2.5" />
        </svg>

        {/* ── FLOATING GLASS BADGES ── */}

        {/* CANADA  (node at 29% / 24.8%) */}
        <div
          className="absolute z-20 hover:scale-105 transition-transform duration-300 cursor-default"
          style={{ left: '29%', top: '5%', transform: 'translateX(-50%)' }}
        >
          <div className="flex flex-col items-center gap-1">
            <div className="glass-card px-3 py-2 rounded-2xl bg-white/92 backdrop-blur-md border border-blue-200/80 shadow-xl flex items-center gap-2.5 whitespace-nowrap">
              <div className="w-7 h-7 rounded-xl bg-[#0057FF] text-white flex items-center justify-center shrink-0 shadow-md shadow-blue-500/25">
                <MapPin className="w-3.5 h-3.5" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-[8px] font-mono font-black text-[#0057FF] bg-blue-50 px-1 py-0.5 rounded border border-blue-100 leading-none">CA</span>
                  <span className="text-[11px] font-heading font-extrabold text-[#0F172A] uppercase tracking-wide">CANADA</span>
                </div>
                <span className="text-[10px] font-semibold text-slate-500 block mt-0.5">Canada (Headquarters)</span>
              </div>
            </div>
            {/* connector line */}
            <div className="w-px h-5 bg-blue-400/50" />
          </div>
        </div>

        {/* INDIA  (node at 70% / 40.4%) */}
        <div
          className="absolute z-20 hover:scale-105 transition-transform duration-300 cursor-default"
          style={{ left: '70%', top: '22%', transform: 'translateX(-50%)' }}
        >
          <div className="flex flex-col items-center gap-1">
            <div className="glass-card px-3 py-2 rounded-2xl bg-white/92 backdrop-blur-md border border-blue-200/80 shadow-xl flex items-center gap-2.5 whitespace-nowrap">
              <div className="w-7 h-7 rounded-xl bg-[#0057FF] text-white flex items-center justify-center shrink-0 shadow-md shadow-blue-500/25">
                <MapPin className="w-3.5 h-3.5" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-[8px] font-mono font-black text-[#0057FF] bg-blue-50 px-1 py-0.5 rounded border border-blue-100 leading-none">IN</span>
                  <span className="text-[11px] font-heading font-extrabold text-[#0F172A] uppercase tracking-wide">INDIA</span>
                </div>
                <span className="text-[10px] font-semibold text-slate-500 block mt-0.5">Engineering & CAD Hub</span>
              </div>
            </div>
            <div className="w-px h-5 bg-blue-400/50" />
          </div>
        </div>

        {/* NEW ZEALAND  (node at 97% / 70.4%) — badge anchored to right edge */}
        <div
          className="absolute z-20 hover:scale-105 transition-transform duration-300 cursor-default"
          style={{ right: '0%', top: '54%' }}
        >
          <div className="flex flex-col items-end gap-1">
            <div className="glass-card px-3 py-2 rounded-2xl bg-white/92 backdrop-blur-md border border-blue-200/80 shadow-xl flex items-center gap-2.5 whitespace-nowrap">
              <div className="w-7 h-7 rounded-xl bg-[#0057FF] text-white flex items-center justify-center shrink-0 shadow-md shadow-blue-500/25">
                <MapPin className="w-3.5 h-3.5" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-[8px] font-mono font-black text-[#0057FF] bg-blue-50 px-1 py-0.5 rounded border border-blue-100 leading-none">NZ</span>
                  <span className="text-[11px] font-heading font-extrabold text-[#0F172A] uppercase tracking-wide">NEW ZEALAND</span>
                </div>
                <span className="text-[10px] font-semibold text-slate-500 block mt-0.5">APAC Operations</span>
              </div>
            </div>
            <div className="w-px h-5 bg-blue-400/50 ml-auto mr-6" />
          </div>
        </div>

      </div>
    </div>
  );
};
