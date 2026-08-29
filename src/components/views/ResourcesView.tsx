import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Search, 
  ArrowRight, 
  Clock, 
  Tag, 
  BookOpen, 
  MessageSquare, 
  CheckCircle2, 
  X 
} from 'lucide-react';

interface ResourcesViewProps {
  onOpenQuoteModal?: () => void;
}

export const ResourcesView: React.FC<ResourcesViewProps> = () => {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState<string>('All');
  const [selectedArticle, setSelectedArticle] = useState<any | null>(null);

  const FILTERS = ['All', 'Product Design', 'Mold Design', 'CAD & Drawings', 'Automotive'];

  const ARTICLES = [
    {
      id: 'art-1',
      category: 'Product Design',
      title: 'Designing Plastic Parts for Injection Molding',
      desc: 'Practical DFM checks for wall thickness, draft, ribs, bosses and parting line strategy.',
      image: '/services/dfm_dfa.webp',
      readTime: '5 min read',
      content: 'Proper DFM for injection molded parts requires uniform wall thickness to prevent sink marks, minimum 1-2 degree draft angles for clean ejection, and properly proportioned ribs and bosses.',
    },
    {
      id: 'art-2',
      category: 'Mold Design',
      title: 'GD&T Drawing Review: Common Issues to Check',
      desc: 'A focused review of datums, tolerances, feature control frames and drawing clarity.',
      image: '/services/injection_mold.webp',
      readTime: '4 min read',
      content: 'Common GD&T drafting oversights include improperly constrained datum reference frames, conflicting basic dimensions, and insufficient material condition modifiers (MMC/LMC).',
    },
    {
      id: 'art-3',
      category: 'CAD & Drawings',
      title: 'From 3D CAD Model to Production Drawing',
      desc: 'How modelling decisions, tolerances, BOMs and revision control support manufacturing.',
      image: '/services/cad_modelling.webp',
      readTime: '5 min read',
      content: 'Transitioning from parametric 3D CAD to shop-floor ready 2D prints requires clear datum definitions, synchronized BOM tables, and strict revision control.',
    },
  ];

  const featuredGuide = {
    title: 'Automotive Drawing Review: A Practical Checklist',
    desc: 'Key checks for dimensions, GD&T, materials, revisions, manufacturability and supplier clarification.',
    image: '/services/drawing_validation.webp',
    readTime: '6 min read',
    category: 'Automotive',
    content: 'Reviewing automotive supplier prints requires structured datum verification, ASME Y14.5 feature control frame checks, and clear material notes before tooling kick-off.',
  };

  const filteredArticles = ARTICLES.filter(
    (a) => activeFilter === 'All' || a.category === activeFilter
  );

  return (
    <div className="space-y-16 lg:space-y-24 pt-24 lg:pt-28 pb-20 overflow-x-hidden">
      
      {/* 1. HEADER (Matching PDF Page 7) */}
      <section className="max-w-[1440px] mx-auto px-6 lg:px-12 space-y-4 max-w-4xl">
        <span className="text-xs font-mono font-bold uppercase text-[#0057FF] tracking-widest block">
          ENGINEERING KNOWLEDGE HUB
        </span>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-extrabold text-[#0F172A] tracking-tight">
          Resources & Insights
        </h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
          Practical guidance on product design, tooling, 3D CAD, GD&T, DFM and automotive drawing review.
        </p>
      </section>

      {/* 2. FILTER PILLS */}
      <section className="max-w-[1440px] mx-auto px-6 lg:px-12">
        <div className="flex flex-wrap items-center gap-2.5">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`px-5 py-2 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer ${
                activeFilter === f
                  ? 'bg-[#0057FF] text-white shadow-md shadow-blue-500/25'
                  : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </section>

      {/* 3. FEATURED PRACTICAL GUIDE & ARTICLES (Matching PDF Page 7) */}
      <section className="max-w-[1440px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Featured Practical Guide */}
          <div className="lg:col-span-7 glass-card bg-white rounded-3xl overflow-hidden border border-slate-200/90 shadow-xl space-y-6 p-8 lg:p-10 flex flex-col justify-between">
            <div className="space-y-4">
              <span className="text-[11px] font-mono font-bold text-[#0057FF] uppercase tracking-wider block">
                FEATURED PRACTICAL GUIDE
              </span>

              <h2 className="text-2xl sm:text-3xl font-heading font-bold text-[#0F172A] tracking-tight">
                {featuredGuide.title}
              </h2>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                {featuredGuide.desc}
              </p>

              <div className="flex items-center gap-4 text-xs text-slate-500 font-medium pt-1">
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-[#0057FF]" />
                  {featuredGuide.readTime}
                </span>
                <span>•</span>
                <span className="text-[#0057FF] font-semibold">{featuredGuide.category}</span>
              </div>
            </div>

            {/* Featured Guide Image */}
            <div className="rounded-2xl overflow-hidden h-64 relative border border-slate-200 shadow-md">
              <img
                src={featuredGuide.image}
                alt={featuredGuide.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="pt-2">
              <button
                onClick={() => setSelectedArticle(featuredGuide)}
                className="btn-primary px-7 py-3 text-xs font-semibold inline-flex items-center gap-2 cursor-pointer shadow-lg shadow-blue-500/25"
              >
                Read Guide <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right Column: 3 Articles + Need Guidance Box */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* 3 Articles */}
            <div className="space-y-4">
              {filteredArticles.map((art) => (
                <div
                  key={art.id}
                  onClick={() => setSelectedArticle(art)}
                  className="glass-card bg-white p-6 rounded-3xl border border-slate-200/90 shadow-md hover:shadow-lg hover:border-blue-400 transition-all duration-300 cursor-pointer flex gap-5 items-center"
                >
                  <div className="w-24 h-24 rounded-2xl overflow-hidden shrink-0 border border-slate-200">
                    <img
                      src={art.image}
                      alt={art.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="space-y-1.5 flex-1">
                    <h3 className="text-xs font-heading font-bold text-[#0F172A] leading-snug">
                      {art.title}
                    </h3>
                    <p className="text-[11px] text-slate-600 line-clamp-2 leading-relaxed font-normal">
                      {art.desc}
                    </p>
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#0057FF] hover:underline pt-0.5">
                      Read Article <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Need Guidance Box (Matching PDF Page 7) */}
            <div className="glass-card bg-white p-6 rounded-3xl border border-blue-200/90 shadow-md flex items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#0057FF] flex items-center justify-center shrink-0">
                  <MessageSquare className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-xs font-heading font-bold text-[#0F172A]">
                    Need guidance for your project?
                  </h4>
                  <p className="text-[11px] text-slate-500 font-normal">
                    Discuss your requirements with AG Vertex.
                  </p>
                </div>
              </div>

              <button
                onClick={() => navigate('/contact')}
                className="btn-primary px-4 py-2.5 text-xs font-semibold shrink-0 cursor-pointer"
              >
                Request Review →
              </button>
            </div>

          </div>

        </div>
      </section>

      {/* ARTICLE MODAL */}
      {selectedArticle && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-md animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-xl w-full p-8 border border-slate-200 shadow-2xl relative space-y-5">
            <button
              onClick={() => setSelectedArticle(null)}
              className="absolute top-6 right-6 w-8 h-8 rounded-full bg-slate-100 text-slate-500 hover:text-slate-800 flex items-center justify-center cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <span className="text-[10px] font-mono font-bold text-[#0057FF] uppercase tracking-widest block">
              {selectedArticle.category}
            </span>

            <h3 className="text-2xl font-heading font-bold text-[#0F172A]">
              {selectedArticle.title}
            </h3>

            <div className="h-52 rounded-2xl overflow-hidden border border-slate-200">
              <img
                src={selectedArticle.image}
                alt={selectedArticle.title}
                className="w-full h-full object-cover"
              />
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              {selectedArticle.content || selectedArticle.desc}
            </p>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <button
                onClick={() => setSelectedArticle(null)}
                className="btn-secondary px-5 py-2 text-xs font-semibold"
              >
                Close
              </button>

              <button
                onClick={() => {
                  setSelectedArticle(null);
                  navigate('/contact');
                }}
                className="btn-primary px-5 py-2 text-xs font-semibold flex items-center gap-2"
              >
                Discuss Requirements <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
