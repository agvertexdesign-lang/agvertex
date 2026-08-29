import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowRight, 
  Box, 
  Layers, 
  Cpu, 
  Users, 
  Crosshair, 
  AlertCircle, 
  CheckCircle2 
} from 'lucide-react';

interface IndustriesViewProps {
  onOpenQuoteModal?: () => void;
}

export const IndustriesView: React.FC<IndustriesViewProps> = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<string>('automotive');

  const INDUSTRIES = [
    {
      id: 'automotive',
      name: 'Automotive Components',
      title: 'AUTOMOTIVE COMPONENT DESIGN SUPPORT',
      tagline: 'From concept development to production-ready engineering documentation.',
      description: '3D component design and detailed documentation for suspension, steering, wheel-end, molded-plastic, and electromechanical parts—developed with manufacturability and supplier coordination in mind.',
      badges: ['Product Development', 'GD&T / DFM', 'Supplier Coordination'],
      image: '/images/cad_workstation_single.webp',
      imageBadge: 'AUTOMOTIVE COMPONENT DESIGN & DOCUMENTATION',
      needs: [
        'Production-ready component design',
        'Drawing discrepancies and design changes',
        'Manufacturing feasibility and supplier alignment',
      ],
      supports: [
        '3D CAD modelling and design refinement',
        'Drawing review, GD&T, and documentation',
        'Supplier coordination and issue resolution',
      ],
      ctaLabel: 'REQUEST AN AUTOMOTIVE PROJECT REVIEW',
    },
    {
      id: 'injection-molded',
      name: 'Injection-Molded Products',
      title: 'INJECTION-MOLDED PRODUCT & TOOLING DESIGN',
      tagline: 'Practical mold designs, parting strategies, and DFM optimization.',
      description: 'Comprehensive engineering support for plastic injection-molded components, multi-cavity tooling layouts, sliders, lifters, and shop-floor manufacturing documentation.',
      badges: ['Mold Layouts', 'Parting Line DFM', 'Toolmaker Detailing'],
      image: '/services/injection_mold.webp',
      imageBadge: 'PRECISION INJECTION MOLD TOOLING',
      needs: [
        'Complex parting line generation and lifter mechanisms',
        'Eliminating sink marks, warpage, and tooling flash',
        'Tool component fabrication drawings for shop floor',
      ],
      supports: [
        'Full 3D mold tooling assembly modeling & splits',
        'DFM analysis for draft angles, ribs, and uniform walls',
        'Electrode extraction and detail manufacturing prints',
      ],
      ctaLabel: 'REQUEST A MOLD DESIGN PROJECT REVIEW',
    },
    {
      id: 'industrial-products',
      name: 'Industrial Products',
      title: 'INDUSTRIAL PRODUCTS & MACHINERY SUPPORT',
      tagline: 'Heavy-duty mechanical design, weldments, and automation tooling.',
      description: 'Robust engineering design for specialized industrial machinery, structural sheet metal enclosures, welded frames, and custom automated assembly fixtures.',
      badges: ['Machine Design', 'Sheet Metal', 'Assembly Fixtures'],
      image: '/services/industrial_metrology.webp',
      imageBadge: 'INDUSTRIAL PRODUCTS CAD & METROLOGY',
      needs: [
        'Custom machinery & structural weldment design',
        'ASME compliant fabrication drawings & BOMs',
        'Assembly fixture design and supplier sign-off',
      ],
      supports: [
        'Parametric 3D CAD machine & enclosure modeling',
        'Detailed weldment drafting with weld symbols & BOMs',
        'Fabrication coordination and drawing validation',
      ],
      ctaLabel: 'REQUEST AN INDUSTRIAL PROJECT REVIEW',
    },
    {
      id: 'electromechanical',
      name: 'Electromechanical Components',
      title: 'ELECTROMECHANICAL PACKAGING & ENCLOSURES',
      tagline: 'Electronics enclosures, thermal packaging, and connector integration.',
      description: 'High-density packaging for PCBs, battery modules, wiring harnesses, and ruggedized weatherproof enclosures with tight environmental ingress sealing.',
      badges: ['Enclosure Design', 'Ingress Sealing', 'Connector Packaging'],
      image: '/services/cad_modelling.webp',
      imageBadge: 'ELECTROMECHANICAL PACKAGING DESIGN',
      needs: [
        'Tight space envelope & thermal management packaging',
        'IP-rated sealing gaskets and fastening design',
        'Wire routing and connector interference checks',
      ],
      supports: [
        '3D CAD spatial packaging and tolerance stack analysis',
        'Molded / die-cast enclosure design with seal grooves',
        'Production manufacturing documentation & BOMs',
      ],
      ctaLabel: 'REQUEST AN ELECTROMECHANICAL REVIEW',
    },
  ];

  const currentInd = INDUSTRIES.find((i) => i.id === activeTab) || INDUSTRIES[0];

  return (
    <div className="space-y-16 lg:space-y-24 pt-24 lg:pt-28 pb-20 overflow-x-hidden">
      
      {/* 1. HEADER (Matching PDF Page 5) */}
      <section className="max-w-[1440px] mx-auto px-6 lg:px-12 space-y-4 text-center max-w-3xl">
        <span className="text-xs font-mono font-bold uppercase text-[#0057FF] tracking-widest block">
          INDUSTRIES WE SUPPORT
        </span>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-extrabold text-[#0F172A] tracking-tight">
          ENGINEERING SUPPORT FOR MANUFACTURING
        </h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal max-w-2xl mx-auto">
          Practical mechanical design, tooling, drawing, and supplier support across automotive and manufacturing sectors.
        </p>
      </section>

      {/* 2. CATEGORY PILL TABS */}
      <section className="max-w-[1440px] mx-auto px-6 lg:px-12">
        <div className="flex flex-wrap items-center justify-center gap-3">
          {INDUSTRIES.map((ind) => (
            <button
              key={ind.id}
              onClick={() => setActiveTab(ind.id)}
              className={`px-5 sm:px-6 py-2.5 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer ${
                activeTab === ind.id
                  ? 'bg-[#0057FF] text-white shadow-lg shadow-blue-500/25'
                  : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              {ind.name}
            </button>
          ))}
        </div>
      </section>

      {/* 3. ACTIVE TAB MAIN CONTENT CARD (Matching PDF Page 5) */}
      <section className="max-w-[1440px] mx-auto px-6 lg:px-12">
        <div className="glass-card bg-white p-8 lg:p-12 rounded-3xl border border-slate-200/90 shadow-xl space-y-10">
          
          {/* Top Row: Details & Image */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-7 space-y-5">
              <h2 className="text-2xl sm:text-3xl font-heading font-bold text-[#0F172A] uppercase tracking-tight">
                {currentInd.title}
              </h2>

              <p className="text-xs sm:text-sm font-semibold text-[#0057FF]">
                {currentInd.tagline}
              </p>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                {currentInd.description}
              </p>

              <div className="flex flex-wrap gap-2.5 pt-2">
                {currentInd.badges.map((b, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-blue-50 text-[#0057FF] text-xs font-mono font-semibold"
                  >
                    <Crosshair className="w-3.5 h-3.5" />
                    {b}
                  </span>
                ))}
              </div>
            </div>

            {/* Right Image */}
            <div className="lg:col-span-5 relative rounded-2xl overflow-hidden shadow-lg border border-slate-200 h-64 sm:h-72">
              <img
                src={currentInd.image}
                alt={currentInd.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-4">
                <span className="text-[10px] font-mono text-white font-semibold uppercase tracking-wider">
                  {currentInd.imageBadge}
                </span>
              </div>
            </div>

          </div>

          {/* Bottom Row: Needs vs Supports (2 Columns) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6 border-t border-slate-100">
            
            {/* Left: Typical Client Needs */}
            <div className="p-6 rounded-2xl bg-rose-50/50 border border-rose-100 space-y-3">
              <h3 className="text-xs font-mono font-bold text-rose-700 uppercase tracking-wider flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-rose-600" />
                TYPICAL CLIENT NEEDS
              </h3>
              <ul className="space-y-2 text-xs text-slate-700">
                {currentInd.needs.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-rose-500 font-bold">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right: How AG Vertex Supports */}
            <div className="p-6 rounded-2xl bg-emerald-50/50 border border-emerald-100 space-y-3">
              <h3 className="text-xs font-mono font-bold text-emerald-700 uppercase tracking-wider flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                HOW AG VERTEX SUPPORTS
              </h3>
              <ul className="space-y-2 text-xs text-slate-700">
                {currentInd.supports.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-emerald-600 font-bold">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>

          {/* Bottom CTA Button */}
          <div className="pt-2 text-center">
            <button
              onClick={() => navigate('/contact')}
              className="btn-primary px-8 py-4 text-xs font-semibold inline-flex items-center gap-2 shadow-lg shadow-blue-500/25 cursor-pointer"
            >
              {currentInd.ctaLabel}
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      </section>

    </div>
  );
};
