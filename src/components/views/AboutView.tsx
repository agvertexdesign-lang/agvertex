import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Target, 
  Eye, 
  ShieldCheck, 
  HeartHandshake, 
  Calendar, 
  Box, 
  Crosshair, 
  Users, 
  ArrowRight,
  CheckCircle2
} from 'lucide-react';
import { usePageContent, useSettingsData } from '../../hooks/useCmsData';
import { DEFAULT_CAD_STACK } from '../../lib/api/settings';

interface AboutViewProps {
  setActiveTab?: (tab: string) => void;
  onOpenQuoteModal?: () => void;
}

export const AboutView: React.FC<AboutViewProps> = () => {
  const navigate = useNavigate();
  const { settings } = useSettingsData();
  const { pageContent } = usePageContent();
  const about = pageContent.about;

  const PILLARS = [
    {
      icon: Target,
      title: about.pillar_1_title || 'OUR MISSION',
      desc: about.pillar_1_desc || 'To deliver practical and precise mechanical design solutions that support manufacturability, quality, and efficient product development.',
    },
    {
      icon: Eye,
      title: about.pillar_2_title || 'OUR VISION',
      desc: about.pillar_2_desc || 'To be a trusted mechanical design partner for manufacturers, tooling companies, and automotive suppliers across Canada.',
    },
    {
      icon: ShieldCheck,
      title: about.pillar_3_title || 'CORE VALUES',
      desc: about.pillar_3_desc || 'Technical Integrity · Quality · Collaboration · Confidentiality · Continuous Improvement',
    },
    {
      icon: HeartHandshake,
      title: about.pillar_4_title || 'OUR PROMISE',
      desc: about.pillar_4_desc || "Clear communication, carefully developed deliverables, and engineering support focused on each client's technical and manufacturing requirements.",
    },
  ];

  const DOMAIN_CARDS = [
    {
      title: about.exp_1_title || 'PRODUCT DEVELOPMENT',
      desc: about.exp_1_desc || 'Mechanical components and assemblies developed with performance, manufacturability, and production requirements in mind.',
      image: about.exp_1_img || '/services/product_design.png',
    },
    {
      title: about.exp_2_title || 'TOOLING EXPERIENCE',
      desc: about.exp_2_desc || 'Practical experience supporting injection molds, hot-runner systems, mold components, and pressure die-casting applications.',
      image: about.exp_2_img || '/services/injection_mold.png',
    },
    {
      title: about.exp_3_title || 'AUTOMOTIVE COMPONENTS',
      desc: about.exp_3_desc || 'Experience with suspension, steering, wheel-end components, engineering drawings, GD&T, and supplier coordination.',
      image: about.exp_3_img || '/images/control_arm_component.png',
    },
    {
      title: about.exp_4_title || 'CAD & DOCUMENTATION',
      desc: about.exp_4_desc || '3D models, drawings, BOMs, and controlled documentation using established CAD workflows.',
      image: about.exp_4_img || '/images/cad_workstation_single.jpeg',
    },
  ];

  const STATS = [
    {
      icon: Calendar,
      value: '15+ YEARS',
      label: 'Mechanical Design Experience',
    },
    {
      icon: Box,
      value: '3D CAD',
      label: 'Parts, Assemblies & Tooling',
    },
    {
      icon: Crosshair,
      value: 'GD&T / DFM',
      label: 'Manufacturing-Focused Design',
    },
    {
      icon: Users,
      value: 'SUPPLIER SUPPORT',
      label: 'Drawing Review & Coordination',
    },
  ];

  return (
    <div className="space-y-20 lg:space-y-28 pt-24 sm:pt-32 lg:pt-40 pb-20 overflow-x-hidden">
      
      {/* 1. HERO SECTION (Distinct headline and enlarged font sizing) */}
      <section className="max-w-[1440px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Text */}
          <div className="lg:col-span-6 space-y-7">
            <span className="text-xs sm:text-sm font-mono font-bold uppercase text-[#0057FF] tracking-widest block">
              {about.hero_tag || 'ABOUT AG VERTEX'}
            </span>

            {/* Distinct headline tailored for About Page */}
            <h1 className="text-4xl sm:text-5xl lg:text-[54px] font-heading font-extrabold text-[#0F172A] tracking-tight leading-[1.12]">
              {about.hero_title || 'Practical Mechanical Design Experience.'}
            </h1>

            {/* Resized larger and highly readable paragraph */}
            <p className="text-base sm:text-lg lg:text-xl text-slate-700 font-medium leading-relaxed max-w-xl">
              {about.hero_desc || 'AG Vertex is a Windsor, Ontario-based mechanical design consultancy. Our experienced team supports product development, tooling, 3D CAD, drawings, GD&T, DFM/DFA, automotive drawing review and supplier coordination.'}
            </p>

            <div className="pt-2">
              <button
                onClick={() => navigate('/contact')}
                className="btn-primary px-8 py-4 text-sm sm:text-base font-bold flex items-center gap-2.5 cursor-pointer shadow-xl shadow-blue-500/25 hover:shadow-blue-500/40 transition-all duration-300"
              >
                Request a Project Review
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right Image (Dual Monitor CAD Station from PDF Page 10) */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-200/90 bg-slate-900 group">
              <img
                src={settings?.images?.about_hero_image || "/images/cad_workstation_single.jpeg"}
                alt="CAD Workstation Visual - AG Vertex Mechanical Design Consultancy"
                loading="lazy"
                decoding="async"
                className="w-full h-[380px] sm:h-[450px] object-cover transition-transform duration-700 group-hover:scale-103"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-transparent to-transparent flex items-end p-6 sm:p-8">
                <div className="space-y-1.5">
                  <span className="text-xs sm:text-sm font-mono font-bold text-blue-400 uppercase tracking-wider block">
                    MANUFACTURING-FOCUSED MECHANICAL DESIGN
                  </span>
                  <p className="text-xs sm:text-sm text-white font-medium">
                    Product, tooling, CAD and drawing support.
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 2. FOUR PILLARS (With enlarged font size and comfortable padding) */}
      <section className="max-w-[1440px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {PILLARS.map((p, idx) => {
            const PillarIcon = p.icon;
            return (
              <div
                key={idx}
                className="glass-card bg-white p-8 rounded-3xl border border-slate-200/90 shadow-md space-y-4 hover:shadow-xl hover:border-blue-400 transition-all duration-300 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="w-14 h-14 rounded-2xl bg-blue-50 text-[#0057FF] flex items-center justify-center shadow-inner">
                    <PillarIcon className="w-7 h-7" />
                  </div>
                  
                  <h3 className="text-base sm:text-lg font-heading font-bold text-[#0F172A] uppercase tracking-wide">
                    {p.title}
                  </h3>

                  <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
                    {p.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. EXPERIENCE BEHIND AG VERTEX */}
      <section className="max-w-[1440px] mx-auto px-6 lg:px-12 space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs sm:text-sm font-mono font-bold uppercase text-[#0057FF] tracking-widest block">
            EXPERIENCE BEHIND AG VERTEX
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-[#0F172A] tracking-tight">
            15+ YEARS OF MECHANICAL DESIGN EXPERIENCE
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-slate-600 leading-relaxed font-normal">
            The AG Vertex team brings experience across product development, injection molding, hot-runner systems, automotive components and manufacturing-focused mechanical design.
          </p>
        </div>

        {/* 4 Domain Cards with Photos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {DOMAIN_CARDS.map((card, idx) => (
            <div
              key={idx}
              className="glass-card bg-white overflow-hidden rounded-3xl border border-slate-200/90 shadow-md group flex flex-col justify-between hover:shadow-xl transition-all duration-300"
            >
              <div>
                <div className="h-48 overflow-hidden relative">
                  <img
                    src={card.image}
                    alt={card.title}
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />
                </div>

                <div className="p-6 sm:p-7 space-y-2.5">
                  <h3 className="text-sm sm:text-base font-heading font-bold text-[#0F172A] uppercase tracking-wide">
                    {card.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                    {card.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 4 Summary Stat Pills */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
          {STATS.map((stat, idx) => {
            const StatIcon = stat.icon;
            return (
              <div
                key={idx}
                className="glass-card bg-white p-6 rounded-2xl border border-slate-200/90 shadow-xs flex items-center gap-4 hover:border-blue-300 transition-colors"
              >
                <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#0057FF] flex items-center justify-center shrink-0">
                  <StatIcon className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-base font-heading font-bold text-[#0F172A] uppercase">
                    {stat.value}
                  </div>
                  <div className="text-xs sm:text-sm text-slate-500 font-medium">
                    {stat.label}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </section>

      {/* 4. SOFTWARE & CAD STACK SECTION */}
      <section className="max-w-[1440px] mx-auto px-6 lg:px-12 space-y-10">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs sm:text-sm font-mono font-bold uppercase text-[#0057FF] tracking-widest block">
            ENGINEERING CAD STACK
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-extrabold text-[#0F172A] tracking-tight">
            {about.cad_stack_title || 'SOFTWARE & CAD PROFICIENCY'}
          </h2>
          <p className="text-sm sm:text-base text-slate-600 font-normal leading-relaxed">
            {about.cad_stack_desc || 'We collaborate using industry-standard engineering suites and enterprise PLM workflows.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {(about.cad_items || DEFAULT_CAD_STACK).map((tool) => (
            <div
              key={tool.id || tool.name}
              className="glass-card bg-white p-7 rounded-3xl border border-slate-200/90 shadow-md space-y-5 flex flex-col justify-between hover:border-blue-400 hover:shadow-xl transition-all duration-300 group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between gap-3">
                  {tool.logo_url ? (
                    <div className="h-20 max-w-[170px] px-4 py-3 rounded-2xl bg-white border border-slate-200/90 flex items-center justify-center shrink-0 shadow-sm group-hover:scale-105 group-hover:border-blue-300 transition-all overflow-hidden">
                      <img
                        src={tool.logo_url}
                        alt={tool.name}
                        className="w-full h-full object-contain max-h-14"
                        onError={(e) => { (e.target as HTMLElement).style.display = 'none'; }}
                      />
                    </div>
                  ) : (
                    <div className="h-20 px-5 rounded-2xl bg-blue-50 text-[#0057FF] flex items-center justify-center shrink-0 font-bold text-sm border border-blue-100">
                      {tool.badge}
                    </div>
                  )}

                  <span className="px-3 py-1 rounded-full bg-blue-50 text-[#0057FF] text-[10px] font-mono font-bold tracking-wider uppercase border border-blue-100">
                    {tool.badge}
                  </span>
                </div>

                <div className="space-y-1">
                  <h3 className="text-base font-heading font-extrabold text-[#0F172A] uppercase tracking-wide group-hover:text-[#0057FF] transition-colors">
                    {tool.name}
                  </h3>
                  <p className="text-xs font-mono font-semibold text-slate-500">
                    {tool.category}
                  </p>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed font-normal">
                  {tool.desc}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center gap-2 text-[11px] font-semibold text-emerald-600">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>Production Ready</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. CALL TO ACTION BANNER */}
      <section className="max-w-[1440px] mx-auto px-6 lg:px-12">
        <div className="glass-card bg-white p-8 lg:p-12 rounded-3xl border border-slate-200/90 shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <div className="lg:col-span-8 space-y-4">
            <span className="text-xs sm:text-sm font-mono font-bold uppercase text-[#0057FF] tracking-widest block">
              START A CONVERSATION
            </span>
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-bold text-[#0F172A] uppercase tracking-tight">
              DISCUSS YOUR ENGINEERING PROJECT
            </h3>
            <p className="text-sm sm:text-base lg:text-lg text-slate-600 leading-relaxed font-normal max-w-xl">
              Let's review your requirements and define a practical design path forward.
            </p>
            <div className="pt-2">
              <button
                onClick={() => navigate('/contact')}
                className="btn-primary px-8 py-4 text-xs sm:text-sm font-bold flex items-center gap-2 cursor-pointer shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all duration-300"
              >
                Request a Project Review
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="lg:col-span-4 rounded-2xl overflow-hidden h-52 border border-slate-200 shadow-md">
            <img
              src={settings?.images?.about_facility_image || "/services/drawing_validation.png"}
              alt="Discuss Your Engineering Project"
              className="w-full h-full object-cover"
            />
          </div>

        </div>
      </section>

    </div>
  );
};
