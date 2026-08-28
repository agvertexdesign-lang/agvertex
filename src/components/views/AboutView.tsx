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
  CheckCircle2,
  Lock
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
              {about.hero_desc || 'AG Vertex is a multi-national mechanical design consultancy operating across Canada, New Zealand, and India. Our experienced engineering team supports product development, tooling, 3D CAD, drawings, GD&T, DFM/DFA, automotive drawing review and supplier coordination.'}
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

      {/* 2. FOUR PILLARS */}
      <section className="max-w-[1440px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {PILLARS.map((p, idx) => {
            const PillarIcon = p.icon;
            return (
              <div
                key={idx}
                className="glass-card group p-8 rounded-3xl border border-blue-200/60 shadow-md hover:shadow-2xl hover:border-blue-500 hover:-translate-y-2 transition-all duration-400 flex flex-col justify-between relative overflow-hidden bg-gradient-to-b from-white via-slate-50/80 to-blue-50/40"
              >
                {/* Top Animated Glowing Accent Line */}
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-600 via-sky-400 to-indigo-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />

                <div className="space-y-6 relative z-10">
                  {/* Glowing Blue Icon Badge */}
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#0057FF] via-[#004BE0] to-[#0034B3] text-white flex items-center justify-center shadow-[0_8px_20px_rgba(0,87,255,0.25)] ring-4 ring-blue-50 group-hover:ring-blue-100 group-hover:scale-108 transition-all duration-300">
                    <PillarIcon className="w-7 h-7 filter drop-shadow-xs" />
                  </div>
                  
                  <div className="space-y-2.5">
                    <h3 className="text-lg font-heading font-extrabold text-[#0F172A] uppercase tracking-wide group-hover:text-[#0057FF] transition-colors duration-300">
                      {p.title}
                    </h3>

                    <p className="text-base text-slate-800 leading-relaxed font-semibold">
                      {p.desc}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 2.5 CONFIDENTIALITY & INTELLECTUAL PROPERTY SECTION */}
      <section className="max-w-[1440px] mx-auto px-6 lg:px-12 py-6 sm:py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Image: generated security and trust design */}
          <div className="lg:col-span-5 relative order-2 lg:order-1">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-blue-200/50 bg-[#EBF2FA]/40 p-4 group">
              <img
                src="/images/data_security_ip.png"
                alt="AG Vertex Data Security and IP Protection"
                loading="lazy"
                decoding="async"
                className="w-full h-auto rounded-2xl object-cover shadow-inner group-hover:scale-102 transition-transform duration-500"
              />
              <div className="absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-blue-500/20 pointer-events-none transition-all duration-500" />
            </div>
          </div>

          {/* Right Text: trust building copy */}
          <div className="lg:col-span-7 space-y-6 order-1 lg:order-2">
            <span className="text-xs sm:text-sm font-mono font-bold uppercase text-[#0057FF] tracking-widest block">
              IP PROTECTION & CONFIDENTIALITY
            </span>

            <h2 className="text-3xl sm:text-4xl lg:text-[44px] font-heading font-extrabold text-[#0F172A] tracking-tight leading-[1.15]">
              Protecting Your Innovative Designs
            </h2>

            <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-semibold">
              At AG Vertex, we understand that your design concepts, CAD datasets, and engineering files represent your core competitive advantage. We handle your intellectual property with strict professional discretion and established data-handling protocols.
            </p>

            <div className="space-y-4 pt-2">
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#0057FF] flex items-center justify-center shrink-0 border border-blue-100 shadow-xs">
                  <ShieldCheck className="w-5.5 h-5.5" />
                </div>
                <div>
                  <h4 className="text-base font-heading font-bold text-[#0F172A]">
                    Mutual Non-Disclosure Agreements
                  </h4>
                  <p className="text-sm text-slate-600 font-medium">
                    We routinely execute standard NDAs prior to reviewing any proprietary project drawings, models, or design parameters.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#0057FF] flex items-center justify-center shrink-0 border border-blue-100 shadow-xs">
                  <Lock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-base font-heading font-bold text-[#0F172A]">
                    Secure Data Management
                  </h4>
                  <p className="text-sm text-slate-600 font-medium">
                    Your CAD files and technical documentation are handled securely using controlled access and established digital safety practices.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#0057FF] flex items-center justify-center shrink-0 border border-blue-100 shadow-xs">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-base font-heading font-bold text-[#0F172A]">
                    100% Client Ownership
                  </h4>
                  <p className="text-sm text-slate-600 font-medium">
                    All created assemblies, component prints, parametric models, and deliverables remain completely under your ownership and control.
                  </p>
                </div>
              </div>
            </div>
          </div>

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
          <p className="text-sm sm:text-base lg:text-lg text-slate-800 leading-relaxed font-bold">
            The AG Vertex team brings experience across product development, injection molding, hot-runner systems, automotive components and manufacturing-focused mechanical design.
          </p>
        </div>

        {/* 4 Domain Cards with Photos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {DOMAIN_CARDS.map((card, idx) => (
            <div
              key={idx}
              className="glass-card group bg-gradient-to-b from-white to-slate-50 overflow-hidden rounded-3xl border border-slate-200/90 shadow-md flex flex-col justify-between hover:shadow-2xl hover:border-blue-400 hover:-translate-y-2 transition-all duration-400 relative"
            >
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-500 via-sky-400 to-indigo-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left z-20" />
              <div>
                <div className="h-48 overflow-hidden relative">
                  <img
                    src={card.image}
                    alt={card.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
                </div>

                <div className="p-6 sm:p-7 space-y-3">
                  <h3 className="text-base sm:text-lg font-heading font-bold text-[#0F172A] uppercase tracking-wide group-hover:text-[#0057FF] transition-colors">
                    {card.title}
                  </h3>
                  <p className="text-sm sm:text-base text-slate-800 leading-relaxed font-semibold">
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
              className="glass-card group p-7 rounded-3xl border border-blue-100 shadow-md flex flex-col justify-between hover:border-blue-500 hover:shadow-2xl hover:-translate-y-2 transition-all duration-400 relative overflow-hidden bg-gradient-to-br from-white via-slate-50/90 to-blue-50/30"
            >
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-600 via-sky-400 to-indigo-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left z-20" />
              <div className="space-y-5 relative z-10 flex flex-col justify-between h-full">
                <div className="space-y-4">
                  {/* Logo and Badge Stack */}
                  <div className="flex flex-col gap-3">
                    {tool.logo_url ? (
                      <div className="h-20 w-full px-4 py-3 rounded-2xl bg-white border border-slate-200/90 flex items-center justify-center shadow-sm group-hover:scale-103 group-hover:border-blue-400 group-hover:shadow-md transition-all duration-300 overflow-hidden">
                        <img
                          src={tool.logo_url}
                          alt={tool.name}
                          className="w-auto h-full object-contain max-h-14"
                          onError={(e) => { (e.target as HTMLElement).style.display = 'none'; }}
                        />
                      </div>
                    ) : (
                      <div className="h-20 w-full rounded-2xl bg-blue-50 text-[#0057FF] flex items-center justify-center font-bold text-sm border border-blue-100">
                        {tool.badge}
                      </div>
                    )}

                    <div className="flex">
                      <span className="px-4 py-1.5 rounded-full bg-blue-50 text-[#0057FF] text-xs font-mono font-bold tracking-wider uppercase border border-blue-200 group-hover:bg-[#0057FF] group-hover:text-white transition-colors duration-300 text-center flex items-center justify-center min-h-[32px] leading-tight">
                        {tool.badge}
                      </span>
                    </div>
                  </div>

                  {/* Software Name & Category */}
                  <div className="space-y-1">
                    <h3 className="text-lg font-heading font-extrabold text-[#0F172A] uppercase tracking-wide group-hover:text-[#0057FF] transition-colors duration-300">
                      {tool.name}
                    </h3>
                    <p className="text-xs font-mono font-bold text-blue-600">
                      {tool.category}
                    </p>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-slate-800 leading-relaxed font-semibold">
                    {tool.desc}
                  </p>
                </div>
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
