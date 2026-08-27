import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Mail, 
  MapPin, 
  Calendar, 
  Send, 
  CheckCircle2, 
  Globe2, 
  Clock, 
  ShieldCheck, 
  CheckCircle,
  Building2,
  Layers,
  Phone
} from 'lucide-react';
import { useSettingsData } from '../../hooks/useCmsData';

import { sendToWhatsApp } from '../../lib/whatsapp';
import { submitToWeb3Forms } from '../../lib/web3forms';

export const ContactView: React.FC = () => {
  const { settings } = useSettingsData();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    service: '',
    overview: '',
    timeline: '',
    agreed: false,
  });
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!formData.agreed) {
      setErrorMessage('Please check the consent box to allow us to respond to your inquiry.');
      return;
    }

    const lines = [
      "📌 AG VERTEX — New Project Review Request",
      "----------------------------------------",
      `👤 Name: ${formData.name}`,
      `✉️ Work Email: ${formData.email}`,
      `🏢 Company: ${formData.company || 'Not provided'}`,
      `📞 Phone: ${formData.phone || 'Not provided'}`,
      `🛠️ Service Required: ${formData.service || 'General Inquiry'}`,
      `📅 Preferred Timeline: ${formData.timeline || 'Not specified'}`,
      "",
      "📝 Project Overview:",
      formData.overview,
    ];

    try {
      await submitToWeb3Forms({
        name: formData.name,
        email: formData.email,
        replyto: formData.email,
        company: formData.company || 'Not provided',
        phone: formData.phone || 'Not provided',
        service_required: formData.service || 'General Inquiry',
        timeline: formData.timeline || 'Not specified',
        project_overview: formData.overview,
        to_email: 'agvertexdesign@gmail.com',
      }, `AG VERTEX — New Project Inquiry (${formData.name})`);
    } catch (err) {
      console.warn("Contact Web3Forms submit log:", err);
    }

    setSubmitted(true);
  };

  const GLOBAL_HUBS = [
    {
      country: 'CANADA',
      flag: '🇨🇦',
      city: 'Windsor, Ontario – Business and Client Coordination (Remote)',
      role: 'Client Engineering Coordination',
      details: 'Engineering management, tooling review, OEM standards alignment, and client account delivery.',
    },
    {
      country: 'NEW ZEALAND',
      flag: '🇳🇿',
      city: 'Remote Project Support',
      role: 'Project Support',
      details: 'Regional engineering coordination and timezone-optimized project handover.',
    },
    {
      country: 'INDIA',
      flag: '🇮🇳',
      city: 'Remote CAD and Design Support',
      role: 'Engineering Design & CAD Detailing',
      details: 'Complex 3D CAD modeling, mold & die split engineering, ASME Y14.5 GD&T drafting, and drawing review.',
    },
  ];

  return (
    <div className="space-y-16 lg:space-y-24 pt-24 sm:pt-32 lg:pt-40 pb-20 overflow-x-hidden">
      
      {/* 1. HEADER */}
      <section className="max-w-[1440px] mx-auto px-6 lg:px-12 space-y-4 text-center max-w-3xl">
        <span className="text-sm font-mono font-bold uppercase text-[#0057FF] tracking-widest block">
          GET IN TOUCH
        </span>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-extrabold text-[#0F172A] tracking-tight">
          Request a Project Review
        </h1>
        <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-medium max-w-2xl mx-auto">
          Tell us what you are developing, the engineering support you need, and your preferred timeline.
        </p>
      </section>

      {/* 2. MAIN 2-COLUMN SECTION */}
      <section className="max-w-[1440px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          
          {/* Left Column: Request a Project Review Form */}
          <div className="lg:col-span-7 glass-card bg-white p-8 sm:p-10 rounded-3xl border border-slate-200/90 shadow-xl space-y-6">
            <div className="space-y-1.5">
              <h2 className="text-2xl font-heading font-bold text-[#0F172A] tracking-tight">
                Project Inquiry Details
              </h2>
              <p className="text-sm text-slate-600 font-medium">
                Fill in the details below and a member of our mechanical design team will review your inquiry and respond promptly.
              </p>
            </div>

            {submitted ? (
              <div className="p-8 rounded-2xl bg-emerald-50 text-emerald-900 text-center space-y-3 animate-in fade-in">
                <CheckCircle2 className="w-12 h-12 mx-auto text-emerald-600" />
                <h3 className="font-heading font-bold text-xl">Project Request Sent!</h3>
                <p className="text-sm text-emerald-800 max-w-md mx-auto font-medium">
                  Thank you for contacting AG Vertex. Our team will review your requirements and respond promptly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                
                {errorMessage && (
                  <div className="p-4 rounded-xl bg-red-50 text-red-700 text-xs font-semibold border border-red-200">
                    {errorMessage}
                  </div>
                )}

                {/* Name & Work Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label htmlFor="contact_name" className="text-xs sm:text-sm font-bold text-slate-800 uppercase tracking-wide block">
                      Name *
                    </label>
                    <input
                      id="contact_name"
                      name="name"
                      autoComplete="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Alex Mercer"
                      className="w-full px-4 py-3.5 rounded-xl bg-slate-50 border border-slate-300 text-sm font-medium text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:bg-white focus:ring-2 focus:ring-blue-100 transition-all"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="contact_email" className="text-xs sm:text-sm font-bold text-slate-800 uppercase tracking-wide block">
                      Work Email *
                    </label>
                    <input
                      id="contact_email"
                      name="email"
                      autoComplete="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. alex@company.com"
                      className="w-full px-4 py-3.5 rounded-xl bg-slate-50 border border-slate-300 text-sm font-medium text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:bg-white focus:ring-2 focus:ring-blue-100 transition-all"
                    />
                  </div>
                </div>

                {/* Company & Phone Number */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-2">
                    <label htmlFor="contact_company" className="text-xs sm:text-sm font-bold text-slate-800 uppercase tracking-wide block">
                      Company
                    </label>
                    <input
                      id="contact_company"
                      name="company"
                      autoComplete="organization"
                      type="text"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      placeholder="e.g. Acme Tooling Solutions"
                      className="w-full px-4 py-3.5 rounded-xl bg-slate-50 border border-slate-300 text-sm font-medium text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:bg-white focus:ring-2 focus:ring-blue-100 transition-all"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="contact_service" className="text-xs sm:text-sm font-bold text-slate-800 uppercase tracking-wide block">
                      Service Required *
                    </label>
                    <select
                      id="contact_service"
                      name="service"
                      autoComplete="off"
                      required
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      className="w-full px-4 py-3.5 rounded-xl bg-slate-50 border border-slate-300 text-sm font-medium text-slate-900 focus:outline-none focus:border-blue-600 focus:bg-white focus:ring-2 focus:ring-blue-100 transition-all cursor-pointer"
                    >
                      <option value="">Select a service</option>
                      <option value="Product Design & 3D CAD">Product Design & 3D CAD</option>
                      <option value="Mold & Die Tooling Support">Mold & Die Tooling Support</option>
                      <option value="Drawings, GD&T & BOMs">Drawings, GD&T & BOMs</option>
                      <option value="DFM/DFA & Supplier Coordination">DFM/DFA & Supplier Coordination</option>
                      <option value="Automotive Drawing Review">Automotive Drawing Review</option>
                    </select>
                  </div>
                </div>

                {/* Project Overview */}
                <div className="space-y-2">
                  <label htmlFor="contact_overview" className="text-xs sm:text-sm font-bold text-slate-800 uppercase tracking-wide block">
                    Project Overview *
                  </label>
                  <textarea
                    id="contact_overview"
                    name="overview"
                    autoComplete="off"
                    rows={4}
                    required
                    value={formData.overview}
                    onChange={(e) => setFormData({ ...formData, overview: e.target.value })}
                    placeholder="Briefly describe your component, tooling, drawing, or CAD requirements..."
                    className="w-full px-4 py-3.5 rounded-xl bg-slate-50 border border-slate-300 text-sm font-medium text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600 focus:bg-white focus:ring-2 focus:ring-blue-100 transition-all resize-y"
                  />
                </div>

                {/* Preferred Timeline */}
                <div className="space-y-2">
                  <label htmlFor="contact_timeline" className="text-xs sm:text-sm font-bold text-slate-800 uppercase tracking-wide block">
                    Preferred Timeline
                  </label>
                  <select
                    id="contact_timeline"
                    name="timeline"
                    autoComplete="off"
                    value={formData.timeline}
                    onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                    className="w-full px-4 py-3.5 rounded-xl bg-slate-50 border border-slate-300 text-sm font-medium text-slate-900 focus:outline-none focus:border-blue-600 focus:bg-white focus:ring-2 focus:ring-blue-100 transition-all cursor-pointer"
                  >
                    <option value="">Select a timeline</option>
                    <option value="Immediate (Within 1-2 weeks)">Immediate (Within 1-2 weeks)</option>
                    <option value="Standard (1-2 months)">Standard (1-2 months)</option>
                    <option value="Planning / Future Quarter">Planning / Future Quarter</option>
                  </select>
                </div>

                {/* Checkbox (Unchecked by default) */}
                <div className="space-y-3 pt-1">
                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      id="consent"
                      required
                      checked={formData.agreed}
                      onChange={(e) => setFormData({ ...formData, agreed: e.target.checked })}
                      className="w-4 h-4 rounded border-slate-400 text-[#0057FF] focus:ring-blue-500 cursor-pointer mt-0.5"
                    />
                    <label htmlFor="consent" className="text-xs sm:text-sm text-slate-700 font-medium cursor-pointer">
                      I consent to AG Vertex collecting and using the information provided to review and respond to my inquiry, as described in the <Link to="/privacy" className="text-[#0057FF] hover:underline focus:outline-none font-bold">Privacy Policy</Link>.
                    </label>
                  </div>
                  <div className="pl-7 space-y-2">
                    <p className="text-xs text-slate-500 font-medium">
                      Please do not submit confidential, proprietary, security-sensitive or export-controlled information through this form.
                    </p>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full btn-primary py-4 text-sm font-bold flex items-center justify-center gap-2 shadow-lg shadow-blue-500/25 cursor-pointer"
                  >
                    Submit Project Inquiry <Mail className="w-4 h-4" />
                  </button>
                </div>

              </form>
            )}
          </div>

          {/* Right Column: AG Vertex Company Card */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="glass-card bg-white p-8 sm:p-10 rounded-3xl border border-slate-200/90 shadow-xl space-y-6">
              <h2 className="text-2xl font-heading font-extrabold text-[#0F172A] tracking-tight">
                {settings?.business?.company_name || 'AG Vertex'}
              </h2>

              {/* Contact Details */}
              <div className="space-y-4 text-sm text-slate-800 font-medium">
                <div className="flex items-center gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-blue-50 text-[#0057FF] flex items-center justify-center shrink-0 font-bold">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <span className="font-semibold text-slate-900">
                    {settings?.contact?.address || 'Canada · New Zealand · India'}
                  </span>
                </div>

                <div className="flex items-center gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-blue-50 text-[#0057FF] flex items-center justify-center shrink-0 font-bold">
                    <Mail className="w-5 h-5" />
                  </div>
                  <a href={`mailto:${settings?.contact?.email || 'agvertexdesign@gmail.com'}`} className="font-semibold text-[#0057FF] hover:underline">
                    {settings?.contact?.email || 'agvertexdesign@gmail.com'}
                  </a>
                </div>

                <div className="flex items-center gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-blue-50 text-[#0057FF] flex items-center justify-center shrink-0 font-bold">
                    <Calendar className="w-5 h-5" />
                  </div>
                  <span className="font-semibold text-slate-900">
                    Monday–Friday, 9 AM–5 PM ET
                  </span>
                </div>
              </div>

              {/* Engineering Support Tagline */}
              <div className="pt-4 border-t border-slate-200 space-y-2">
                <span className="text-xs font-mono font-bold text-[#0057FF] uppercase tracking-wider block">
                  Engineering Support
                </span>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                  Product Design · Mold & Die Design · 3D CAD Modelling · Drawings, GD&T & BOMs · Automotive Drawing Review
                </p>
              </div>

              {/* What happens next */}
              <div className="pt-4 border-t border-slate-200 space-y-3">
                <span className="text-xs font-mono font-bold text-slate-900 uppercase tracking-wider block">
                  What happens next
                </span>
                <ul className="space-y-2.5 text-xs sm:text-sm text-slate-700 font-medium">
                  <li className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-blue-100 text-[#0057FF] font-bold text-xs flex items-center justify-center shrink-0">1</span>
                    <span>We review your project brief</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-blue-100 text-[#0057FF] font-bold text-xs flex items-center justify-center shrink-0">2</span>
                    <span>We clarify scope and timing</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-blue-100 text-[#0057FF] font-bold text-xs flex items-center justify-center shrink-0">3</span>
                    <span>You receive the recommended next step</span>
                  </li>
                </ul>
              </div>
            </div>


          </div>

        </div>
      </section>

      {/* 3. GLOBAL FOOTPRINT SECTION (Matching user request: India, Canada, New Zealand) */}
      <section className="max-w-[1440px] mx-auto px-6 lg:px-12 space-y-10">
        
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-200 text-[#0057FF] text-xs font-mono font-extrabold tracking-widest uppercase shadow-xs">
            <Globe2 className="w-4 h-4 text-[#0057FF]" />
            REMOTE TEAM LOCATIONS
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-extrabold text-[#0F172A] tracking-tight uppercase">
            Distributed Design Collaboration
          </h2>

          <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-semibold">
            AG Vertex coordinates projects remotely from Windsor, Ontario, with team support in India and New Zealand based on project requirements.
          </p>
        </div>

        {/* Global Map Display Banner */}
        <div className="glass-card group bg-white p-3 sm:p-5 lg:p-6 rounded-3xl border border-blue-200/80 shadow-2xl relative overflow-hidden">
          <div className="relative rounded-2xl overflow-hidden bg-slate-50 border border-blue-100">
            <img
              src="/images/map.png"
              alt="AG Vertex Remote Team Locations Map - Canada, India, New Zealand"
              loading="lazy"
              decoding="async"
              className="w-full h-auto object-cover min-h-[340px] sm:min-h-[440px]"
            />

            {/* Connecting SVG Dotted Curved Arcs */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none z-10" viewBox="0 0 1000 500" preserveAspectRatio="none">
              {/* Arc 1: Canada to India */}
              <path
                d="M 280 180 Q 480 100 640 260"
                fill="none"
                stroke="#0057FF"
                strokeWidth="2.5"
                strokeDasharray="6 6"
                className="opacity-70 animate-pulse"
              />
              {/* Arc 2: India to New Zealand */}
              <path
                d="M 640 260 Q 720 340 850 420"
                fill="none"
                stroke="#0057FF"
                strokeWidth="2.5"
                strokeDasharray="6 6"
                className="opacity-70 animate-pulse"
              />
              {/* Arc 3: Canada to New Zealand */}
              <path
                d="M 280 180 Q 550 380 850 420"
                fill="none"
                stroke="#0057FF"
                strokeWidth="1.5"
                strokeDasharray="4 4"
                className="opacity-40"
              />
            </svg>

            {/* FLOATING LOCATION CARD 1: CANADA */}
            <div className="absolute top-[14%] left-[2%] sm:top-[20%] sm:left-[8%] md:left-[12%] z-20 transition-all duration-300 hover:scale-105">
              <div className="flex items-center gap-2.5 px-3 py-1.5 sm:px-4 sm:py-2.5 rounded-2xl bg-white/95 backdrop-blur-md border border-blue-200 shadow-xl shadow-blue-500/15">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-[#0057FF] text-white flex items-center justify-center font-bold shadow-md shadow-blue-500/30 shrink-0">
                  <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </div>
                <div className="text-left">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[9px] sm:text-[10px] font-mono font-extrabold text-[#0057FF] bg-blue-50 px-1.5 py-0.5 rounded border border-blue-100 uppercase">CA</span>
                    <span className="text-xs sm:text-sm font-heading font-extrabold text-[#0F172A] uppercase tracking-wide">CANADA</span>
                  </div>
                  <span className="text-[10px] sm:text-xs text-slate-600 font-semibold block">Canada</span>
                </div>
              </div>
            </div>

            {/* FLOATING LOCATION CARD 2: INDIA */}
            <div className="absolute top-[38%] left-[46%] sm:top-[42%] sm:left-[54%] md:left-[58%] z-20 transition-all duration-300 hover:scale-105">
              <div className="flex items-center gap-2.5 px-3 py-1.5 sm:px-4 sm:py-2.5 rounded-2xl bg-white/95 backdrop-blur-md border border-blue-200 shadow-xl shadow-blue-500/15">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-[#0057FF] text-white flex items-center justify-center font-bold shadow-md shadow-blue-500/30 shrink-0">
                  <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </div>
                <div className="text-left">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[9px] sm:text-[10px] font-mono font-extrabold text-[#0057FF] bg-blue-50 px-1.5 py-0.5 rounded border border-blue-100 uppercase">IN</span>
                    <span className="text-xs sm:text-sm font-heading font-extrabold text-[#0F172A] uppercase tracking-wide">INDIA</span>
                  </div>
                  <span className="text-[10px] sm:text-xs text-slate-600 font-semibold block">India</span>
                </div>
              </div>
            </div>

            {/* FLOATING LOCATION CARD 3: NEW ZEALAND */}
            <div className="absolute top-[64%] left-[48%] sm:top-[70%] sm:left-[66%] md:left-[72%] z-20 transition-all duration-300 hover:scale-105">
              <div className="flex items-center gap-2.5 px-3 py-1.5 sm:px-4 sm:py-2.5 rounded-2xl bg-white/95 backdrop-blur-md border border-blue-200 shadow-xl shadow-blue-500/15">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-[#0057FF] text-white flex items-center justify-center font-bold shadow-md shadow-blue-500/30 shrink-0">
                  <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </div>
                <div className="text-left">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[9px] sm:text-[10px] font-mono font-extrabold text-[#0057FF] bg-blue-50 px-1.5 py-0.5 rounded border border-blue-100 uppercase">NZ</span>
                    <span className="text-xs sm:text-sm font-heading font-extrabold text-[#0F172A] uppercase tracking-wide">NEW ZEALAND</span>
                  </div>
                  <span className="text-[10px] sm:text-xs text-slate-600 font-semibold block">New Zealand</span>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* 3 Remote Team Location Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {GLOBAL_HUBS.map((hub, idx) => (
            <div
              key={idx}
              className="glass-card bg-gradient-to-b from-white via-slate-50/80 to-blue-50/40 p-8 rounded-3xl border border-blue-200/80 shadow-lg hover:shadow-2xl hover:border-blue-500 hover:-translate-y-1.5 transition-all duration-300 space-y-4 flex flex-col justify-between group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-3xl filter drop-shadow-xs">{hub.flag}</span>
                </div>

                <div className="space-y-1">
                  <h3 className="text-2xl font-heading font-extrabold text-[#0F172A] group-hover:text-[#0057FF] transition-colors uppercase tracking-wide">
                    {hub.country}
                  </h3>
                  <div className="flex items-center gap-1.5 text-sm font-bold text-slate-700">
                    <MapPin className="w-4 h-4 text-[#0057FF] shrink-0" />
                    <span className="leading-snug">{hub.city}</span>
                  </div>
                </div>

                {hub.role && (
                  <div className="pt-3 border-t border-slate-200 space-y-2">
                    <span className="text-xs font-mono font-extrabold text-[#0057FF] uppercase tracking-wider block">
                      {hub.role}
                    </span>
                    <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-semibold">
                      {hub.details}
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

      </section>

    </div>
  );
};
