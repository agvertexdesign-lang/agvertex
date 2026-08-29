import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Search, 
  ArrowRight, 
  Box, 
  Layers, 
  PenTool, 
  FileText, 
  CheckCircle2, 
  X,
  Lock,
  Loader2
} from 'lucide-react';
import { useShowcaseVisibility, useShowcaseData } from '../../hooks/useCmsData';

interface PortfolioViewProps {
  setActiveTab?: (tab: string) => void;
  onOpenQuoteModal?: () => void;
}

export const PortfolioView: React.FC<PortfolioViewProps> = () => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [selectedProject, setSelectedProject] = useState<any | null>(null);
  const { enabled: showcaseEnabled, loading: visibilityLoading } = useShowcaseVisibility();
  const { projects: dbProjects, loading: projectsLoading } = useShowcaseData();

  const CATEGORIES = [
    { id: 'All', label: 'All Capabilities' },
    { id: 'Product Design', label: 'Product Design' },
    { id: 'Mold & Die Design', label: 'Mold & Die Design' },
    { id: '3D CAD', label: '3D CAD' },
    { id: 'Drawing Review', label: 'Drawing Review' },
  ];

  // Map DB projects from Supabase (CMS) — only show what is published in CMS
  const activeProjectsList = (dbProjects || []).map(p => ({
    id: p.id,
    tag: p.category ? p.category.toUpperCase() : 'PROJECT',
    title: p.title,
    desc: p.description,
    image: p.image_url || '/services/product_design.webp',
    category: p.category || 'Product Design',
    tools: p.client ? `Client: ${p.client} · Year: ${p.project_year}` : `Year: ${p.project_year || 'Recent'}`,
  }));

  const filteredProjects = activeProjectsList.filter(
    (p) => activeCategory === 'All' || p.category === activeCategory
  );

  if (!visibilityLoading && !showcaseEnabled) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center pt-36 sm:pt-40 pb-20 px-6">
        <div className="max-w-md w-full text-center space-y-5 bg-white p-8 sm:p-10 rounded-3xl border border-slate-200 shadow-xl">
          <div className="w-16 h-16 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mx-auto">
            <Lock className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 font-heading">Showcase Inactive</h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            The capability showcase section is currently under scheduled engineering updates. Please explore our core services or get in touch directly.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => navigate('/services')}
              className="flex-1 btn-primary py-3 text-xs font-semibold"
            >
              Explore Services
            </button>
            <button
              onClick={() => navigate('/contact')}
              className="flex-1 btn-secondary py-3 text-xs font-semibold"
            >
              Contact Us
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-16 lg:space-y-24 pt-36 sm:pt-40 lg:pt-44 pb-20 overflow-x-hidden">
      
      {/* 1. HEADER (Matching PDF Page 6) */}
      <section className="max-w-[1440px] mx-auto px-6 lg:px-12 space-y-4 max-w-4xl">
        <span className="text-xs font-mono font-bold uppercase text-[#0057FF] tracking-widest block">
          ENGINEERING CAPABILITY SHOWCASE
        </span>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-extrabold text-[#0F172A] tracking-tight">
          MANUFACTURING-FOCUSED DESIGN CAPABILITIES
        </h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
          Representative examples of product design, tooling, CAD modelling, drawing review, and supplier support.
        </p>
      </section>

      {/* 2. MAIN LAYOUT: SIDEBAR + 6 CARDS + CTA CARD (Matching PDF Page 6) */}
      <section className="max-w-[1440px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Sidebar: Capability Index */}
          <div className="lg:col-span-3 glass-card bg-white p-6 rounded-3xl border border-slate-200/90 shadow-md space-y-4">
            <span className="text-[11px] font-mono font-bold text-slate-400 uppercase tracking-wider block">
              CAPABILITY INDEX
            </span>

            <div className="space-y-1.5">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`w-full text-left px-4 py-3 rounded-2xl text-xs font-semibold transition-all duration-200 cursor-pointer flex items-center justify-between ${
                    activeCategory === cat.id
                      ? 'bg-blue-50 text-[#0057FF] font-bold border border-blue-200'
                      : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <span>{cat.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Right Grid: Showcase Cards OR Empty State */}
          <div className="lg:col-span-9 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredProjects.length === 0 ? (
              <div className="sm:col-span-2 xl:col-span-3 glass-card bg-white rounded-3xl p-12 sm:p-16 border border-slate-200 text-center space-y-4 shadow-sm">
                <div className="w-16 h-16 rounded-2xl bg-blue-50 text-[#0057FF] flex items-center justify-center mx-auto">
                  <Box className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-slate-800 font-heading">No Showcase Projects Published Yet</h3>
                <p className="text-sm text-slate-500 max-w-md mx-auto leading-relaxed font-normal">
                  Showcase projects will appear here as soon as they are added and set to Published in the CMS.
                </p>
              </div>
            ) : (
              filteredProjects.map((item) => (
              <div
                key={item.id}
                onClick={() => setSelectedProject(item)}
                className="glass-card bg-white rounded-3xl overflow-hidden border border-slate-200/90 shadow-md hover:shadow-xl hover:border-blue-400 transition-all duration-300 group cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="h-44 overflow-hidden relative">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />
                    
                    <div className="absolute top-3.5 left-3.5">
                      <span className="px-3 py-1 rounded-full bg-slate-900/80 backdrop-blur-md text-white text-[10px] font-mono font-bold border border-slate-700">
                        {item.tag}
                      </span>
                    </div>
                  </div>

                  <div className="p-6 space-y-2">
                    <h3 className="text-sm font-heading font-bold text-[#0F172A] group-hover:text-[#0057FF] transition-colors leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed font-normal">
                      {item.desc}
                    </p>
                  </div>
                </div>

                <div className="px-6 pb-6 pt-1 flex items-center justify-between text-xs font-semibold text-[#0057FF]">
                  <span>Explore Details</span>
                  <div className="w-7 h-7 rounded-full bg-blue-50 group-hover:bg-[#0057FF] group-hover:text-white flex items-center justify-center transition-colors">
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            ))
          )}

            {/* Need Support Card (Blue Card matching PDF Page 6) */}
            <div className="glass-card bg-[#0057FF] text-white p-8 rounded-3xl shadow-xl flex flex-col justify-between space-y-6 relative overflow-hidden">
              <div className="space-y-3 relative z-10">
                <h3 className="text-xl sm:text-2xl font-heading font-bold leading-tight">
                  Need support on a design or tooling project?
                </h3>
                <p className="text-xs text-blue-100 leading-relaxed">
                  Our engineering team can help from concept through production support.
                </p>
              </div>

              <div className="relative z-10">
                <button
                  onClick={() => navigate('/contact')}
                  className="w-full py-3 px-4 rounded-xl bg-white text-[#0057FF] font-semibold text-xs hover:bg-blue-50 transition-colors flex items-center justify-center gap-2 shadow-md cursor-pointer"
                >
                  Request a Project Review <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 3. DISCLAIMER (Matching PDF Page 6) */}
      <section className="max-w-[1440px] mx-auto px-6 lg:px-12 text-center">
        <p className="text-[11px] font-mono text-slate-500 flex items-center justify-center gap-2">
          <span>🛡️</span> Representative capability visuals. Client work is shown only with authorization.
        </p>
      </section>

      {/* PROJECT MODAL */}
      {selectedProject && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-md animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-xl w-full p-8 border border-slate-200 shadow-2xl relative space-y-5">
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-6 right-6 w-8 h-8 rounded-full bg-slate-100 text-slate-500 hover:text-slate-800 flex items-center justify-center cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <span className="text-[10px] font-mono font-bold text-[#0057FF] uppercase tracking-widest block">
              {selectedProject.tag}
            </span>

            <h3 className="text-2xl font-heading font-bold text-[#0F172A]">
              {selectedProject.title}
            </h3>

            <div className="h-56 rounded-2xl overflow-hidden border border-slate-200">
              <img
                src={selectedProject.image}
                alt={selectedProject.title}
                className="w-full h-full object-cover"
              />
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              {selectedProject.desc}
            </p>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs font-mono text-slate-400">
                Tools: {selectedProject.tools}
              </span>

              <button
                onClick={() => {
                  setSelectedProject(null);
                  navigate('/contact');
                }}
                className="btn-primary px-5 py-2 text-xs font-semibold flex items-center gap-2"
              >
                Request Review <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
