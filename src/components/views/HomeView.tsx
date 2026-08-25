import React from 'react';
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

  const CAPABILITY_CARDS = [
    {
      title: home.cap_1_title || 'Product & Mechanical Design',
      image: home.cap_1_img || '/services/product_design.png',
      icon: Box,
      items: (home.cap_1_desc || '3D CAD Modelling • Drawings, GD&T & BOMs').split('•').map(s => s.trim()),
      link: '/services',
    },
    {
      title: home.cap_2_title || 'Mold & Die Tooling Design',
      image: home.cap_2_img || '/services/injection_mold.png',
      icon: Layers,
      items: (home.cap_2_desc || 'Mold Layouts • Slides, Lifters & Tooling Support').split('•').map(s => s.trim()),
      link: '/services',
    },
    {
      title: home.cap_3_title || 'CAD Documentation & Manufacturing Support',
      image: home.cap_3_img || '/services/drawings_gdt.png',
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
              <div className="inline-flex items-center gap-2.5 text-xs sm:text-sm font-mono font-semibold text-slate-700 bg-white/95 border border-slate-200/90 px-4 py-2 rounded-full shadow-xs">
                <MapPin className="w-4 h-4 text-[#0057FF] shrink-0" />
                {home.badge_1 || 'Canada · New Zealand · India'}
              </div>

              <div className="inline-flex items-center gap-2.5 text-xs sm:text-sm font-mono font-semibold text-slate-700 bg-white/95 border border-slate-200/90 px-4 py-2 rounded-full shadow-xs">
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
                src="/hero-video.mp4"
                autoPlay
                loop
                muted
                playsInline
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
                className="glass-card bg-white rounded-3xl border border-slate-200/90 shadow-md hover:shadow-2xl hover:border-blue-400 transition-all duration-300 cursor-pointer overflow-hidden group flex flex-col justify-between"
              >
                <div>
                  {/* High-Resolution Professional Engineering Image */}
                  <div className="h-52 overflow-hidden relative">
                    <img 
                      src={card.image} 
                      alt={`AG Vertex Representative Capability Visual - ${card.title}`}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/20 to-transparent" />
                    
                    <div className="absolute top-4 left-4">
                      <div className="w-10 h-10 rounded-xl bg-white/90 backdrop-blur-md text-[#0057FF] flex items-center justify-center shadow-md">
                        <Icon className="w-5 h-5" />
                      </div>
                    </div>
                  </div>

                  {/* Card Content with larger, readable typography */}
                  <div className="p-7 space-y-4">
                    <h3 className="text-lg sm:text-xl font-heading font-bold text-[#0F172A] group-hover:text-[#0057FF] transition-colors leading-snug">
                      {card.title}
                    </h3>
                    
                    <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm text-slate-600 font-medium pt-1">
                      <span>{card.items[0]}</span>
                      <span className="text-slate-300 font-bold">•</span>
                      <span>{card.items[1]}</span>
                    </div>
                  </div>
                </div>

                {/* Card Footer Action */}
                <div className="px-7 pb-6 pt-0 flex items-center justify-between text-xs sm:text-sm font-bold text-[#0057FF]">
                  <span>Explore Capabilities</span>
                  <div className="w-8 h-8 rounded-full bg-blue-50 group-hover:bg-[#0057FF] group-hover:text-white flex items-center justify-center transition-colors">
                    <ChevronRight className="w-4 h-4" />
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
        <div className="glass-card bg-white p-8 lg:p-12 rounded-3xl border border-slate-200/90 shadow-xl flex flex-col lg:flex-row items-center justify-between gap-8">
          
          <div className="flex items-center gap-6 w-full lg:w-auto">
            <div className="w-16 h-16 rounded-2xl bg-blue-50 text-[#0057FF] flex items-center justify-center shrink-0 shadow-inner">
              <Users className="w-8 h-8" />
            </div>

            <div className="space-y-1.5">
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-heading font-bold text-[#0F172A] uppercase tracking-tight">
                LET'S REVIEW YOUR <span className="text-[#0057FF]">ENGINEERING PROJECT</span>
              </h3>
              <p className="text-sm sm:text-base text-slate-600 font-medium">
                Discuss your design requirements, documentation needs, or supplier coordination challenges.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4 w-full lg:w-auto justify-start lg:justify-end shrink-0">
            <button
              onClick={() => navigate('/contact')}
              className="btn-primary px-8 py-4 text-xs sm:text-sm font-bold flex items-center gap-2 cursor-pointer shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all duration-300"
            >
              Request a Project Review
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => navigate('/services')}
              className="btn-secondary px-7 py-4 text-xs sm:text-sm font-bold flex items-center gap-2 cursor-pointer transition-all duration-300"
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
