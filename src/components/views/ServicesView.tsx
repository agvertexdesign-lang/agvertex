import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  X,
  Loader2,
} from 'lucide-react';
import { useServicesData } from '../../hooks/useCmsData';
import { Service } from '../../lib/api/services';

interface ServicesViewProps {
  onOpenQuoteModal?: () => void;
}

// Numbered badge colours by display_order
const BADGE_NUMS = ['01', '02', '03', '04', '05', '06', '07', '08'];

// Fallback image when none set in CMS
const FALLBACK_IMG = '/services/product_design.png';

export const ServicesView: React.FC<ServicesViewProps> = () => {
  const navigate = useNavigate();
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const { services, loading } = useServicesData();

  const PROCESS_STEPS = [
    { num: '1', title: 'REQUIREMENTS', desc: 'Understand goals, constraints and technical requirements.' },
    { num: '2', title: 'CAD DEVELOPMENT', desc: 'Create models, assemblies and detailed design solutions.' },
    { num: '3', title: 'DRAWING REVIEW', desc: 'Validate design intent, GD&T and documentation accuracy.' },
    { num: '4', title: 'SUPPLIER COORDINATION', desc: 'Support manufacturing handoff, prototypes and engineering changes.' },
  ];

  return (
    <div className="space-y-16 lg:space-y-24 pt-24 sm:pt-32 lg:pt-40 pb-20 overflow-x-hidden">

      {/* 1. HEADER */}
      <section className="max-w-[1440px] mx-auto px-6 lg:px-12 space-y-4 text-center">
        <span className="text-xs sm:text-sm font-mono font-bold uppercase text-[#0057FF] tracking-widest block">
          OUR CAPABILITIES
        </span>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-extrabold text-[#0F172A] tracking-tight">
          ENGINEERING DESIGN SERVICES
        </h1>
        <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-medium max-w-2xl mx-auto">
          Manufacturing-focused mechanical design support—from product development and tooling design to detailed CAD documentation and supplier coordination.
        </p>
      </section>

      {/* 2. SERVICE CARDS — fully from CMS */}
      <section className="max-w-[1440px] mx-auto px-6 lg:px-12">
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <Loader2 className="w-8 h-8 animate-spin text-[#0057FF]" />
          </div>
        ) : services.length === 0 ? (
          <div className="text-center py-20 text-slate-400">
            <p className="text-lg font-medium">No services available at this time.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {services.map((svc, idx) => (
              <div
                key={svc.id}
                className="glass-card bg-white p-7 sm:p-8 rounded-3xl border border-slate-200/90 shadow-md hover:shadow-xl hover:border-blue-400 transition-all duration-300 flex flex-col justify-between group"
              >
                <div className="flex flex-col sm:flex-row gap-6 items-start">

                  {/* Image */}
                  <div className="w-full sm:w-52 h-52 rounded-2xl overflow-hidden shrink-0 relative border border-slate-200 shadow-sm bg-slate-900">
                    <img
                      src={svc.image_url || FALLBACK_IMG}
                      alt={svc.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      onError={(e) => { (e.target as HTMLImageElement).src = FALLBACK_IMG; }}
                    />
                    <div className="absolute top-3 left-3">
                      <span className="px-3 py-1 rounded-full bg-slate-900/80 backdrop-blur-md text-white text-[11px] font-mono font-bold border border-slate-700">
                        {BADGE_NUMS[svc.display_order - 1] ?? String(svc.display_order).padStart(2, '0')}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="space-y-3 flex-1 w-full">
                    <h2 className="text-xl sm:text-2xl font-heading font-bold text-[#0F172A] uppercase tracking-wide">
                      {svc.title}
                    </h2>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      {svc.short_desc}
                    </p>
                  </div>
                </div>

                {/* Footer */}
                <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-end">
                  <button
                    onClick={() => setSelectedService(svc)}
                    className="btn-secondary px-5 py-2.5 text-xs sm:text-sm font-bold flex items-center gap-2 cursor-pointer hover:border-blue-500 hover:text-[#0057FF] transition-all"
                  >
                    View Details
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* 3. PROCESS STEPS */}
      <section className="max-w-[1440px] mx-auto px-6 lg:px-12">
        <div className="glass-card bg-white p-8 lg:p-10 rounded-3xl border border-slate-200/90 shadow-md">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {PROCESS_STEPS.map((step, idx) => (
              <div key={idx} className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#0057FF] flex items-center justify-center shrink-0 font-mono font-bold text-sm">
                  {step.num}
                </div>
                <div className="space-y-1">
                  <h4 className="text-xs sm:text-sm font-heading font-bold text-[#0F172A] uppercase">{step.title}</h4>
                  <p className="text-xs text-slate-600 leading-relaxed font-normal">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. CTA BANNER */}
      <section className="max-w-[1440px] mx-auto px-6 lg:px-12 text-center">
        <div className="glass-card bg-white p-10 lg:p-14 rounded-3xl border border-slate-200/90 shadow-xl space-y-5 max-w-3xl mx-auto">
          <h3 className="text-2xl sm:text-3xl font-heading font-bold text-[#0F172A] uppercase tracking-tight">
            HAVE A PROJECT TO DISCUSS?
          </h3>
          <p className="text-sm sm:text-base text-slate-600 max-w-xl mx-auto font-normal">
            Let's review your design requirements, documentation needs, or supplier drawing challenges.
          </p>
          <div className="pt-2">
            <button
              onClick={() => navigate('/contact')}
              className="btn-primary px-8 py-4 text-xs sm:text-sm font-bold inline-flex items-center gap-2 shadow-lg shadow-blue-500/25 cursor-pointer"
            >
              Request a Project Review
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* SERVICE DETAIL MODAL */}
      {selectedService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/70 backdrop-blur-md animate-in fade-in overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-9 border border-slate-200 shadow-2xl relative space-y-6 my-8 max-h-[90vh] overflow-y-auto">

            {/* Close */}
            <button
              onClick={() => setSelectedService(null)}
              className="absolute top-6 right-6 w-9 h-9 rounded-full bg-slate-100 text-slate-500 hover:text-slate-900 hover:bg-slate-200 flex items-center justify-center cursor-pointer transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className="space-y-2 pr-8">
              <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-[#0057FF] bg-blue-50 px-3 py-1 rounded-full">
                <span>{BADGE_NUMS[selectedService.display_order - 1] ?? String(selectedService.display_order).padStart(2, '0')}</span>
                <span>•</span>
                <span>AG VERTEX ENGINEERING</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-heading font-extrabold text-[#0F172A]">
                {selectedService.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
                {selectedService.short_desc}
              </p>
            </div>

            {/* Image */}
            {selectedService.image_url && (
              <div className="h-52 sm:h-60 rounded-2xl overflow-hidden border border-slate-200 shadow-md relative">
                <img
                  src={selectedService.image_url}
                  alt={selectedService.title}
                  className="w-full h-full object-cover"
                  onError={(e) => { (e.target as HTMLImageElement).src = FALLBACK_IMG; }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent flex items-end p-4">
                  <span className="text-xs font-mono font-bold text-white uppercase">AG VERTEX MANUFACTURING-FOCUSED MECHANICAL DESIGN</span>
                </div>
              </div>
            )}

            {/* Full description */}
            {selectedService.full_desc && (
              <div className="space-y-2">
                <h4 className="text-xs font-mono font-bold text-slate-700 uppercase tracking-wider">Service Details</h4>
                <p className="text-sm text-slate-600 leading-relaxed whitespace-pre-line">
                  {selectedService.full_desc}
                </p>
              </div>
            )}

            {/* Actions */}
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-4">
              <button
                onClick={() => setSelectedService(null)}
                className="btn-secondary px-5 py-2.5 text-xs sm:text-sm font-semibold cursor-pointer"
              >
                Close
              </button>
              <button
                onClick={() => { setSelectedService(null); navigate('/contact'); }}
                className="btn-primary px-6 py-2.5 text-xs sm:text-sm font-bold flex items-center gap-2 cursor-pointer shadow-lg shadow-blue-500/25"
              >
                Request a Project Review <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
