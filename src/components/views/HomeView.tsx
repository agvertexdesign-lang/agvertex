import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowRight, 
  MapPin, 
  Clock, 
  Users,
  Box,
  Layers,
  FileText,
  ChevronRight
} from 'lucide-react';

import { usePageContent } from '../../hooks/useCmsData';

interface HomeViewProps {
  setActiveTab?: (tab: string) => void;
  onOpenQuoteModal?: () => void;
  onOpenProjectModal?: (projectId: string) => void;
}

export const HomeView: React.FC<HomeViewProps> = () => {
  const navigate = useNavigate();
  const { pageContent } = usePageContent();
  const home = pageContent.home;
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.defaultMuted = true;
      video.muted = true;
      
      const playVideo = () => {
        video.play().catch((err) => {
          console.warn("HomeView video autoplay blocked:", err);
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

  const CAPABILITY_CARDS = [
    {
      title: home.cap_1_title || 'Product & Mechanical Design',
      image: home.cap_1_img || '/services/product_design.webp',
      icon: Box,
      items: (home.cap_1_desc || '3D CAD Modelling • Drawings, GD&T & BOMs').split('•').map(s => s.trim()),
      link: '/services',
    },
    {
      title: home.cap_2_title || 'Mold & Die Tooling Design',
      image: home.cap_2_img || '/services/injection_mold.webp',
      icon: Layers,
      items: (home.cap_2_desc || 'Mold Layouts • Slides, Lifters & Tooling Support').split('•').map(s => s.trim()),
      link: '/services',
    },
    {
      title: home.cap_3_title || 'CAD Documentation & Manufacturing Support',
      image: home.cap_3_img || '/services/drawings_gdt.webp',
      icon: FileText,
      items: (home.cap_3_desc || 'DFM/DFA • Supplier Coordination').split('•').map(s => s.trim()),
      link: '/services',
    },
  ];

  return (
    <div className="space-y-16 lg:space-y-24 pt-24 lg:pt-28 pb-20 overflow-x-hidden">
      
      {/* 1. HERO SECTION */}
      <section className="max-w-[1440px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Hero Content */}
          <div className="lg:col-span-6 space-y-7">
            <h1 className="text-4xl sm:text-5xl lg:text-[56px] font-heading font-extrabold text-[#0F172A] tracking-tight leading-[1.12]">
              {home.hero_title || 'Engineering Design Built for Manufacturing.'}
            </h1>

            {/* Resized larger, clear and prominent subtitle */}
            <p className="text-base sm:text-lg lg:text-xl text-slate-700 font-medium leading-relaxed max-w-xl">
              {home.hero_subtitle || 'Practical mechanical design support for products, tooling, CAD documentation, and supplier coordination.'}
            </p>

            {/* Badges Row with larger, readable sizing */}
            <div className="flex flex-wrap items-center gap-3.5 pt-1">
              <div className="inline-flex items-center gap-2.5 text-xs sm:text-sm font-sans font-bold text-slate-900 bg-white border border-slate-300 px-4.5 py-2.5 rounded-full shadow-xs">
                <MapPin className="w-4 h-4 text-[#0057FF] shrink-0" />
                {home.badge_1 || 'Canada · New Zealand · India'}
              </div>

              <div className="inline-flex items-center gap-2.5 text-xs sm:text-sm font-sans font-bold text-slate-900 bg-white border border-slate-300 px-4.5 py-2.5 rounded-full shadow-xs">
                <Clock className="w-4 h-4 text-[#0057FF] shrink-0" />
                {home.badge_2 || '15+ Years of Mechanical Design Experience'}
              </div>
            </div>

            {/* Action Buttons with prominent sizing */}
            <div className="flex flex-wrap items-center gap-4 pt-3">
              <button
                onClick={() => navigate('/contact')}
                className="btn-primary px-8 py-4 text-sm sm:text-base font-bold flex items-center gap-2.5 cursor-pointer shadow-xl shadow-blue-500/25 hover:shadow-blue-500/40 transition-all duration-300"
              >
                {home.hero_cta_primary || 'Request a Project Review'}
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => navigate('/services')}
                className="btn-secondary px-7 py-4 text-sm sm:text-base font-bold flex items-center gap-2 cursor-pointer transition-all duration-300"
              >
                {home.hero_cta_secondary || 'Explore Services'}
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right Hero Video (new final.mp4) */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-200/90 bg-slate-950 group">
              <video
                ref={videoRef}
                src="/hero-video.mp4"
                autoPlay
                loop
                muted
                playsInline
                // @ts-ignore
                webkit-playsinline="true"
                preload="auto"
                className="w-full h-[380px] sm:h-[460px] lg:h-[480px] object-cover transition-transform duration-700 group-hover:scale-102"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/25 via-transparent to-transparent pointer-events-none" />
            </div>
          </div>

        </div>
      </section>

      {/* 2. THREE HIGHLIGHT CAPABILITY CARDS WITH PROFESSIONAL IMAGES (Item 2) */}
      <section className="max-w-[1440px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {CAPABILITY_CARDS.map((card, idx) => {
            const Icon = card.icon;
            return (
              <div 
                key={idx}
                onClick={() => navigate(card.link)}
                className="glass-card group bg-gradient-to-b from-white to-slate-50/80 rounded-3xl border border-blue-100 shadow-md hover:shadow-2xl hover:border-blue-500 hover:-translate-y-2.5 transition-all duration-400 cursor-pointer overflow-hidden flex flex-col justify-between relative"
              >
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-600 via-sky-400 to-indigo-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left z-20" />
                <div>
                  {/* High-Resolution Professional Engineering Image */}
                  <div className="h-52 overflow-hidden relative">
                    <img 
                      src={card.image} 
                      alt={`AG Vertex Representative Capability Visual - ${card.title}`}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/20 to-transparent" />
                    
                    <div className="absolute top-4 left-4 z-10">
                      <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#0057FF] via-[#004BE0] to-[#0034B3] text-white flex items-center justify-center shadow-[0_8px_20px_rgba(0,87,255,0.35)] ring-4 ring-white/90 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                        <Icon className="w-6 h-6 filter drop-shadow-xs" />
                      </div>
                    </div>
                  </div>

                  {/* Card Content with larger, readable typography */}
                  <div className="p-7 space-y-4">
                    <h3 className="text-xl font-heading font-extrabold text-[#0F172A] group-hover:text-[#0057FF] transition-colors leading-snug">
                      {card.title}
                    </h3>
                    
                    <div className="flex flex-wrap items-center gap-2 text-sm text-slate-800 font-bold pt-1">
                      <span>{card.items[0]}</span>
                      <span className="text-blue-500 font-bold">•</span>
                      <span>{card.items[1]}</span>
                    </div>
                  </div>
                </div>

                {/* Card Footer Action */}
                <div className="px-7 pb-6 pt-0 flex items-center justify-between text-sm font-extrabold text-[#0057FF]">
                  <span>Explore Capabilities</span>
                  <div className="w-9 h-9 rounded-full bg-blue-50 group-hover:bg-[#0057FF] group-hover:text-white group-hover:translate-x-1 flex items-center justify-center transition-all duration-300">
                    <ChevronRight className="w-5 h-5" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* (Item 3: 5-Step Process Section Removed as requested) */}

      {/* 3. CALL-TO-ACTION BOTTOM BANNER */}
      <section className="max-w-[1440px] mx-auto px-6 lg:px-12">
        <div className="glass-card group bg-gradient-to-br from-white via-slate-50 to-blue-50/50 py-5 px-6 lg:py-7 lg:px-9 rounded-3xl border border-blue-200/90 shadow-lg flex flex-col lg:flex-row items-center justify-between gap-6 relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-600 via-sky-400 to-indigo-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left z-20" />
          
          <div className="flex items-center gap-5 w-full lg:w-auto relative z-10">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#0057FF] via-[#004BE0] to-[#0034B3] text-white flex items-center justify-center shrink-0 shadow-[0_8px_20px_rgba(0,87,255,0.35)] ring-4 ring-blue-50/80 group-hover:scale-108 transition-all duration-300">
              <Users className="w-7 h-7 filter drop-shadow-xs" />
            </div>

            <div className="space-y-1">
              <h3 className="text-xl sm:text-2xl font-heading font-extrabold text-[#0F172A] uppercase tracking-tight">
                LET'S REVIEW YOUR <span className="text-[#0057FF]">DESIGN PROJECT</span>
              </h3>
              <p className="text-sm sm:text-base text-slate-800 font-bold">
                Discuss your design requirements, documentation needs, or supplier coordination challenges.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3.5 w-full lg:w-auto justify-start lg:justify-end shrink-0 relative z-10">
            <button
              onClick={() => navigate('/contact')}
              className="btn-primary px-7 py-3 text-xs sm:text-sm font-extrabold flex items-center gap-2 cursor-pointer shadow-lg shadow-blue-500/20 hover:scale-105 transition-all duration-300"
            >
              Request a Project Review
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => navigate('/services')}
              className="btn-secondary px-6 py-3 text-xs sm:text-sm font-extrabold flex items-center gap-2 cursor-pointer hover:scale-105 transition-all duration-300"
            >
              Explore Services
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>
      </section>

    </div>
  );
};
