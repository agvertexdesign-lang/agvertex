import React, { useState, useCallback } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { MessageCircle, X, CheckCircle2, Zap, ShieldCheck, Send } from 'lucide-react';
import { AdminApp } from './admin/AdminApp';
import { AdminProvider } from './admin/context/AdminContext';
import { Preloader } from './components/common/Preloader';
import { ScrollToTop } from './components/common/ScrollToTop';
import { ScrollDownIndicator } from './components/common/ScrollDownIndicator';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { BackgroundParticlesCanvas } from './components/three/BackgroundParticlesCanvas';
import { HomeView } from './components/views/HomeView';
import { AboutView } from './components/views/AboutView';
import { ServicesView } from './components/views/ServicesView';
import { PortfolioView } from './components/views/PortfolioView';
import { CaseStudyView } from './components/views/CaseStudyView';
import { TechnologiesView } from './components/views/TechnologiesView';
import { ProcessView } from './components/views/ProcessView';
import { CareersView } from './components/views/CareersView';
import { ContactView } from './components/views/ContactView';
import { FAQView } from './components/views/FAQView';
import { PrivacyView } from './components/views/PrivacyView';
import { useSEO } from './hooks/useSEO';
import { sendToWhatsApp } from './lib/whatsapp';
import { submitToWeb3Forms } from './lib/web3forms';

export default function App() {
  const navigate = useNavigate();
  useSEO();
  const [preloaderComplete, setPreloaderComplete] = useState<boolean>(false);
  const handlePreloaderComplete = useCallback(() => {
    setPreloaderComplete(true);
  }, []);
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState<boolean>(false);
  const [quoteSubmitted, setQuoteSubmitted] = useState<boolean>(false);
  const [quoteForm, setQuoteForm] = useState({
    name: '',
    email: '',
    phone: '',
    service: 'CAD Modeling',
    timeline: 'Standard (1-2 Weeks)',
    description: '',
  });

  const handleNavigate = (tabOrPath: string) => {
    const cleanPath = tabOrPath.startsWith('/')
      ? tabOrPath
      : tabOrPath === 'home'
      ? '/'
      : `/${tabOrPath}`;
    navigate(cleanPath);
  };

  const handleQuoteSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const lines = [
      "⚡ AG VERTEX — Instant Quote & DFM Specs",
      "----------------------------------------",
      `👤 Name: ${quoteForm.name}`,
      `✉️ Work Email: ${quoteForm.email}`,
      `📞 Phone: ${quoteForm.phone || 'Not provided'}`,
      `🛠️ Engineering Service: ${quoteForm.service}`,
      `📅 Preferred Timeline: ${quoteForm.timeline}`,
      "",
      "📝 Project Specifications:",
      quoteForm.description || 'Not provided',
    ];

    sendToWhatsApp(lines);

    try {
      await submitToWeb3Forms({
        name: quoteForm.name,
        email: quoteForm.email,
        replyto: quoteForm.email,
        phone: quoteForm.phone || 'Not provided',
        engineering_service: quoteForm.service,
        timeline: quoteForm.timeline,
        project_specifications: quoteForm.description || 'Not provided',
        to_email: 'contact@agvertex.ca',
      }, `AG VERTEX — New Quote Request (${quoteForm.name})`);
    } catch (err) {
      console.warn("Quote Web3Forms submit log:", err);
    }

    setQuoteSubmitted(true);
    
    setTimeout(() => {
      setQuoteSubmitted(false);
      setIsQuoteModalOpen(false);
      setQuoteForm({
        name: '',
        email: '',
        phone: '',
        service: 'CAD Modeling',
        timeline: 'Standard (1-2 Weeks)',
        description: '',
      });
    }, 2500);
  };

  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  // Admin CMS — completely separate layout, no public navbar/footer
  if (isAdminRoute) {
    return (
      <AdminProvider>
        <Routes>
          <Route path="/admin/*" element={<AdminApp />} />
        </Routes>
      </AdminProvider>
    );
  }

  return (
    <div className="min-h-screen bg-[#EBF2FA] text-[#0F172A] relative overflow-x-hidden selection:bg-[#0057FF] selection:text-white">
      {/* 0. INITIAL PRELOADER SCREEN — nothing else renders until this is done */}
      <Preloader onComplete={handlePreloaderComplete} />

      {/* 1. SCROLL RESET & FLOATING INDICATORS */}
      <ScrollToTop />
      <ScrollDownIndicator />

      {/* GLOBAL DYNAMIC TOPOGRAPHIC CONTOUR BACKGROUND - Gated to save CPU during preloader */}
      {preloaderComplete && <BackgroundParticlesCanvas />}

      {/* GLOBAL HEADER NAVBAR */}
      <Navbar
        onOpenQuoteModal={() => setIsQuoteModalOpen(true)}
      />

      {/* MULTI-PAGE VIEW ROUTER */}
      <main className="relative">
        <Routes>
              <Route
                path="/"
                element={
                  <HomeView
                    setActiveTab={handleNavigate}
                    onOpenQuoteModal={() => setIsQuoteModalOpen(true)}
                    onOpenProjectModal={() => handleNavigate('/case-study')}
                  />
                }
              />
              <Route
                path="/about"
                element={
                  <AboutView
                    setActiveTab={handleNavigate}
                    onOpenQuoteModal={() => setIsQuoteModalOpen(true)}
                  />
                }
              />
              <Route
                path="/services"
                element={<ServicesView onOpenQuoteModal={() => setIsQuoteModalOpen(true)} />}
              />
              <Route
                path="/portfolio"
                element={
                  <PortfolioView
                    setActiveTab={handleNavigate}
                    onOpenQuoteModal={() => setIsQuoteModalOpen(true)}
                  />
                }
              />
              <Route
                path="/case-study"
                element={
                  <CaseStudyView
                    setActiveTab={handleNavigate}
                    onOpenQuoteModal={() => setIsQuoteModalOpen(true)}
                  />
                }
              />
              <Route
                path="/technologies"
                element={<TechnologiesView onOpenQuoteModal={() => setIsQuoteModalOpen(true)} />}
              />
              <Route
                path="/process"
                element={<ProcessView onOpenQuoteModal={() => setIsQuoteModalOpen(true)} />}
              />
              <Route path="/careers" element={<CareersView />} />
              <Route path="/contact" element={<ContactView />} />
              <Route
                path="/faq"
                element={<FAQView onOpenQuoteModal={() => setIsQuoteModalOpen(true)} />}
              />
              <Route path="/privacy" element={<PrivacyView />} />
              <Route
                path="*"
                element={
                  <HomeView
                    setActiveTab={handleNavigate}
                    onOpenQuoteModal={() => setIsQuoteModalOpen(true)}
                    onOpenProjectModal={() => handleNavigate('/case-study')}
                  />
                }
              />
        </Routes>
      </main>

      {/* GLOBAL FOOTER */}
      <Footer
        onOpenQuoteModal={() => setIsQuoteModalOpen(true)}
      />

      {/* GLOBAL INSTANT PROJECT ESTIMATOR & QUOTE MODAL */}
      {isQuoteModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 lg:p-8 border border-slate-200 shadow-2xl relative space-y-6 max-h-[90vh] overflow-y-auto">
            
            <button
              onClick={() => setIsQuoteModalOpen(false)}
              className="absolute top-6 right-6 w-9 h-9 rounded-full bg-slate-100 text-slate-500 hover:text-[#0F172A] hover:bg-slate-200 flex items-center justify-center transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {quoteSubmitted ? (
              <div className="py-12 text-center space-y-4 animate-in zoom-in-95 duration-300">
                <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-500 flex items-center justify-center mx-auto shadow-inner">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-heading font-bold text-[#0F172A]">Request Received!</h3>
                <p className="text-xs text-slate-500 max-w-md mx-auto">
                  Our engineering team is evaluating your specifications. Expect an initial technical proposal within 24 business hours.
                </p>
                <span className="inline-block px-4 py-1.5 rounded-full bg-blue-50 text-[#0057FF] text-xs font-mono font-bold">
                  NDA COVERED AUTOMATICALLY
                </span>
              </div>
            ) : (
              <>
                <div className="space-y-1">
                  <span className="text-[11px] font-mono font-bold text-[#0057FF] uppercase tracking-widest flex items-center gap-1.5">
                    <Zap className="w-3.5 h-3.5" /> PROJECT REVIEW & TECHNICAL ESTIMATE
                  </span>
                  <h3 className="text-2xl font-heading font-bold text-[#0F172A]">Request a Project Review</h3>
                  <p className="text-xs text-slate-500">Fill out your specifications for a technical review and practical design proposal.</p>
                </div>

                <form onSubmit={handleQuoteSubmit} className="space-y-4 text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="font-semibold text-slate-700">Full Name *</label>
                      <input
                        type="text"
                        required
                        value={quoteForm.name}
                        onChange={(e) => setQuoteForm({ ...quoteForm, name: e.target.value })}
                        placeholder="John Doe"
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="font-semibold text-slate-700">Work Email *</label>
                      <input
                        type="email"
                        required
                        value={quoteForm.email}
                        onChange={(e) => setQuoteForm({ ...quoteForm, email: e.target.value })}
                        placeholder="john@company.com"
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="font-semibold text-slate-700">Engineering Service Required *</label>
                      <select
                        value={quoteForm.service}
                        onChange={(e) => setQuoteForm({ ...quoteForm, service: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500 bg-white"
                      >
                        <option value="Product Design">Product Design & CAD</option>
                        <option value="CAD Modeling">3D Parametric CAD Modeling</option>
                        <option value="CAE Simulation">CAE / FEA Structural Simulation</option>
                        <option value="Reverse Engineering">Reverse Engineering & 3D Scanning</option>
                        <option value="Manufacturing Support">Manufacturing & DFM Support</option>
                        <option value="Prototyping">Rapid Prototyping & 3D Printing</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="font-semibold text-slate-700">Target Timeline</label>
                      <select
                        value={quoteForm.timeline}
                        onChange={(e) => setQuoteForm({ ...quoteForm, timeline: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500 bg-white"
                      >
                        <option value="Urgent (1-3 Days)">Urgent (1-3 Days)</option>
                        <option value="Standard (1-2 Weeks)">Standard (1-2 Weeks)</option>
                        <option value="Flexible (> 1 Month)">Flexible (&gt; 1 Month)</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="font-semibold text-slate-700">Project Description & Requirements</label>
                    <textarea
                      rows={3}
                      value={quoteForm.description}
                      onChange={(e) => setQuoteForm({ ...quoteForm, description: e.target.value })}
                      placeholder="Describe your design specifications, dimensions, material requirements, or target CAD software..."
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  <div className="pt-2 flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-[10px] text-slate-400 font-mono">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                      <span>256-BIT ENCRYPTED & NDA SAFE</span>
                    </div>

                    <button
                      type="submit"
                      className="btn-primary px-7 py-3 text-xs font-semibold flex items-center gap-2 shadow-lg shadow-blue-500/25 cursor-pointer"
                    >
                      Submit Specs via WhatsApp <Send className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </form>
              </>
            )}

          </div>
        </div>
      )}

      {/* GLOBAL WHATSAPP FLOATING BUTTON */}
      {!isAdminRoute && (
        <button
          onClick={() => sendToWhatsApp("")}
          className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-emerald-500 hover:bg-emerald-600 text-white rounded-full shadow-lg shadow-emerald-500/30 flex items-center justify-center transition-transform hover:scale-110 cursor-pointer"
          aria-label="Contact us on WhatsApp"
        >
          <MessageCircle className="w-7 h-7" />
        </button>
      )}

    </div>
  );
}
