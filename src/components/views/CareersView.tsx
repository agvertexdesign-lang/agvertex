import React, { useState } from 'react';
import { 
  ArrowRight, 
  Layers, 
  HeartHandshake, 
  ShieldCheck, 
  GraduationCap, 
  Briefcase, 
  Cpu,
  Boxes,
  PenTool,
  CheckCircle2, 
  X, 
  Send,
  MapPin,
  Clock,
  ChevronDown
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCareersData, usePageContent, useSettingsData } from '../../hooks/useCmsData';
import { DEFAULT_CAD_STACK } from '../../lib/api/settings';
import { submitToWeb3Forms } from '../../lib/web3forms';

export const CareersView: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [profileSubmitted, setProfileSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const { careers: dbCareers } = useCareersData();
  const { settings } = useSettingsData();
  const { pageContent } = usePageContent();
  const careers = pageContent.careers;
  const [expandedJob, setExpandedJob] = useState<string | null>(null);
  const [profileForm, setProfileForm] = useState({
    name: '',
    email: '',
    phone: '',
    primaryDiscipline: 'Product Design & Development',
    cadTools: ['PTC Creo Parametric'] as string[],
    linkedin: '',
    notes: '',
    resumeName: '',
    agreed: false,
  });

  const CAD_TOOL_OPTIONS = [
    'PTC Creo Parametric',
    'Siemens NX',
    'Dassault SolidWorks',
    'Autodesk AutoCAD',
  ];

  const toggleCadTool = (tool: string) => {
    setProfileForm((prev) => {
      const exists = prev.cadTools.includes(tool);
      const updated = exists 
        ? prev.cadTools.filter(t => t !== tool)
        : [...prev.cadTools, tool];
      return { ...prev, cadTools: updated };
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      setErrorMessage('Résumé file size exceeds 5 MB limit. Please select a smaller file.');
      e.target.value = '';
      return;
    }

    setProfileForm(prev => ({ ...prev, resumeName: file.name }));
    setErrorMessage('');
  };

  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!profileForm.agreed) {
      setErrorMessage('Please accept the consent terms before submitting your profile.');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await submitToWeb3Forms({
        name: profileForm.name,
        email: profileForm.email,
        phone: profileForm.phone || 'Not provided',
        discipline: profileForm.primaryDiscipline,
        cad_tools: profileForm.cadTools.join(', '),
        linkedin_url: profileForm.linkedin || 'Not provided',
        resume_filename: profileForm.resumeName || 'Not attached',
        experience_summary: profileForm.notes || 'Not provided',
        consent_accepted: 'Yes',
      }, "AG VERTEX — New Specialist Profile Submission");

      if (response.success) {
        setProfileSubmitted(true);
      } else {
        setErrorMessage(response.message || 'Submission error. Please try again.');
      }
    } catch {
      setErrorMessage('Failed to submit profile. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const VALUES = [
    {
      icon: Layers,
      title: careers.val_1_title || 'PRACTICAL ENGINEERING',
      desc: careers.val_1_desc || 'We solve real design problems with practical, manufacturable solutions.',
    },
    {
      icon: HeartHandshake,
      title: careers.val_2_title || 'FLEXIBLE COLLABORATION',
      desc: careers.val_2_desc || 'Work with us on a project basis or as an independent specialist.',
    },
    {
      icon: ShieldCheck,
      title: careers.val_3_title || 'TECHNICAL INTEGRITY',
      desc: careers.val_3_desc || 'We stand for accuracy, reliability, and clear communication in every deliverable.',
    },
    {
      icon: GraduationCap,
      title: careers.val_4_title || 'CONTINUOUS LEARNING',
      desc: careers.val_4_desc || 'We encourage knowledge sharing and ongoing growth in engineering.',
    },
  ];

  const SOFTWARE_TOOLS = [
    {
      name: 'PTC Creo Parametric',
      category: 'Parametric 3D CAD & Surfacing',
      desc: 'Advanced surface modeling, mechanism design, large assemblies, and associative 2D drawing generation.',
      badge: 'CREO',
      color: 'from-emerald-500 to-emerald-700',
    },
    {
      name: 'Siemens NX',
      category: 'PLM & High-End Tooling',
      desc: 'Complex injection mold design, progressive dies, parting line splits, and multi-axis machining CAD data.',
      badge: 'SIEMENS NX',
      color: 'from-cyan-500 to-blue-700',
    },
    {
      name: 'Autodesk AutoCAD',
      category: '2D Drafting & Plant Layouts',
      desc: 'Precision engineering prints, geometric tolerance layout, plant schematics, and legacy DWG translation.',
      badge: 'AUTOCAD',
      color: 'from-rose-500 to-red-700',
    },
    {
      name: 'Dassault SolidWorks',
      category: 'Mechanical Design & DFM',
      desc: 'Machine design, sheet metal enclosures, weldments, ASME Y14.5 GD&T drafting, and integrated BOM control.',
      badge: 'SOLIDWORKS',
      color: 'from-blue-600 to-indigo-800',
    },
  ];

  return (
    <div className="space-y-16 lg:space-y-24 pt-24 sm:pt-32 lg:pt-40 pb-20 overflow-x-hidden">
      
      {/* 1. HERO SECTION */}
      <section className="max-w-[1440px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs font-mono font-bold uppercase text-[#0057FF] tracking-widest block">
              {careers.hero_tag || 'CAREERS & COLLABORATION'}
            </span>

            <h1 className="text-4xl sm:text-5xl lg:text-[52px] font-heading font-extrabold text-[#0F172A] tracking-tight leading-[1.12]">
              {careers.hero_title || 'PROJECT-BASED ENGINEERING COLLABORATION'}
            </h1>

            <p className="text-sm sm:text-base text-slate-600 font-normal leading-relaxed max-w-lg">
              {careers.hero_desc || 'AG Vertex welcomes experienced mechanical designers, tooling specialists, and CAD professionals interested in future project-based collaboration.'}
            </p>

            <div className="pt-2">
              <button
                onClick={() => setModalOpen(true)}
                className="btn-primary px-7 py-3.5 text-xs font-semibold flex items-center gap-2.5 cursor-pointer shadow-lg shadow-blue-500/25"
              >
                Submit Specialist Profile
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right Image */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-200/90 bg-slate-900 group">
              <img
                src={careers.hero_img || settings?.images?.careers_team_image || "/images/cad_team_collaboration.jpeg"}
                alt="Representative mechanical design collaboration"
                loading="lazy"
                decoding="async"
                className="w-full h-[360px] sm:h-[420px] object-cover transition-transform duration-700 group-hover:scale-103"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent pointer-events-none" />
            </div>
          </div>

        </div>
      </section>

      {/* 2. ACTIVE NOTICE BOX (Callout 5: Placed directly below hero before value cards) */}
      <section className="max-w-[1440px] mx-auto px-6 lg:px-12">
        <div className="glass-card bg-white p-8 sm:p-12 rounded-3xl border border-slate-200/90 shadow-xl max-w-3xl mx-auto text-center space-y-5">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-slate-700 font-mono text-xs font-bold uppercase tracking-wider">
            <Clock className="w-3.5 h-3.5 text-[#0057FF]" /> STATUS NOTICE
          </div>

          <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-[#0F172A] tracking-tight">
            NO ACTIVE PERMANENT POSITIONS
          </h2>

          <p className="text-base text-slate-600 font-medium leading-relaxed max-w-xl mx-auto">
            AG Vertex is not actively recruiting permanent employees at this time. However, experienced mechanical design consultants, tooling specialists, and CAD professionals are welcome to submit their profiles for future project-based collaboration.
          </p>

          <div className="pt-3">
            <button
              onClick={() => setModalOpen(true)}
              className="btn-primary px-8 py-3.5 text-xs sm:text-sm font-bold inline-flex items-center gap-2 cursor-pointer shadow-lg shadow-blue-500/25"
            >
              Submit Specialist Profile <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* 3. FOUR VALUES ROW */}
      <section className="max-w-[1440px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {VALUES.map((v, idx) => {
            const ValIcon = v.icon;
            return (
              <div
                key={idx}
                className="glass-card bg-white p-7 rounded-3xl border border-slate-200/90 shadow-md space-y-4 hover:border-blue-400 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#0057FF] flex items-center justify-center">
                  <ValIcon className="w-6 h-6" />
                </div>
                
                <h3 className="text-xs font-heading font-bold text-[#0F172A] uppercase tracking-wide">
                  {v.title}
                </h3>

                <p className="text-xs text-slate-600 leading-relaxed font-normal">
                  {v.desc}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* 4. SOFTWARE & CAD PROFICIENCY (Replaced Areas of Interest as requested) */}
      <section className="max-w-[1440px] mx-auto px-6 lg:px-12 space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-mono font-bold uppercase text-[#0057FF] tracking-widest block">
            ENGINEERING CAD STACK
          </span>
          <h2 className="text-2xl sm:text-3xl font-heading font-bold text-[#0F172A]">
            Software & CAD Proficiency
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 font-normal">
            We collaborate using industry-standard engineering suites and enterprise PLM workflows.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {((pageContent.about?.cad_items && pageContent.about.cad_items.length > 0) ? pageContent.about.cad_items : DEFAULT_CAD_STACK).map((tool) => (
            <div
              key={tool.id || tool.name}
              className="glass-card bg-white p-7 rounded-3xl border border-slate-200/90 shadow-md hover:shadow-xl hover:border-blue-400 transition-all duration-300 flex flex-col justify-between space-y-4 group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
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
                    <div className="h-20 px-5 rounded-2xl bg-blue-50 text-[#0057FF] flex items-center justify-center shrink-0 font-bold text-xs border border-blue-100">
                      {tool.badge}
                    </div>
                  )}

                  <span className="text-[10px] font-mono font-bold text-[#0057FF] bg-blue-50 px-2.5 py-1 rounded-full border border-blue-100">
                    {tool.badge}
                  </span>
                </div>

                <h3 className="text-base font-heading font-bold text-[#0F172A] group-hover:text-[#0057FF] transition-colors">
                  {tool.name}
                </h3>

                <span className="text-[11px] font-mono font-semibold text-slate-400 block">
                  {tool.category}
                </span>

                <p className="text-xs text-slate-600 leading-relaxed font-normal">
                  {tool.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. BOTTOM CALLOUT */}
      <section className="max-w-[1440px] mx-auto px-6 lg:px-12">
        <div className="glass-card bg-white border border-slate-200/90 p-8 lg:p-12 rounded-3xl shadow-xl flex flex-col lg:flex-row items-center justify-between gap-8">
          
          <div className="space-y-2 text-center lg:text-left">
            <h3 className="text-xl sm:text-2xl font-heading font-bold text-[#0F172A] uppercase tracking-tight">
              INTERESTED IN FUTURE PROJECT-BASED WORK?
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 font-medium">
              Submit your profile and we'll keep you in mind for suitable project-based opportunities.
            </p>
          </div>

          <button
            onClick={() => setModalOpen(true)}
            className="btn-primary px-7 py-3.5 text-xs font-semibold shrink-0 cursor-pointer shadow-lg shadow-blue-500/25 flex items-center gap-2"
          >
            Submit Specialist Profile →
          </button>

        </div>
      </section>

      {/* PROFILE SUBMISSION MODAL */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-md animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full p-8 border border-slate-200 shadow-2xl relative space-y-6 max-h-[90vh] overflow-y-auto">
            <button
              aria-label="Close profile form"
              onClick={() => setModalOpen(false)}
              className="absolute top-6 right-6 w-8 h-8 rounded-full bg-slate-100 text-slate-500 hover:text-slate-800 flex items-center justify-center cursor-pointer transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            {profileSubmitted ? (
              <div className="py-8 text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto" />
                <h3 className="text-xl font-heading font-bold text-[#0F172A]">Profile Submitted Securely!</h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  Thank you for your interest. Your profile has been received and retained for future project-based collaboration opportunities.
                </p>
              </div>
            ) : (
              <>
                <div className="space-y-1 pr-6">
                  <span className="text-[10px] font-mono font-bold text-[#0057FF] uppercase tracking-widest block">
                    PROJECT-BASED TALENT NETWORK
                  </span>
                  <h3 className="text-2xl font-heading font-bold text-[#0F172A]">
                    SUBMIT YOUR SPECIALIST PROFILE
                  </h3>
                </div>

                {errorMessage && (
                  <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-600 font-medium">
                    {errorMessage}
                  </div>
                )}

                <form onSubmit={handleProfileSubmit} className="space-y-4 text-xs">
                  {/* Callout 11: Neutral placeholders */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="font-semibold text-slate-700">Full Name *</label>
                      <input
                        type="text"
                        required
                        value={profileForm.name}
                        onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                        placeholder="Your full name"
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="font-semibold text-slate-700">Email Address *</label>
                      <input
                        type="email"
                        required
                        value={profileForm.email}
                        onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                        placeholder="name@email.com"
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="font-semibold text-slate-700">Discipline *</label>
                    <select
                      value={profileForm.primaryDiscipline}
                      onChange={(e) => setProfileForm({ ...profileForm, primaryDiscipline: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500 bg-white"
                    >
                      <option value="Product Design & Development">Product Design & Development</option>
                      <option value="Injection Mold Design">Injection Mold Design</option>
                      <option value="Die-Casting Die Design">Die-Casting Die Design</option>
                      <option value="3D CAD Modelling">3D CAD Modelling</option>
                      <option value="Drawings, GD&T & BOMs">Drawings, GD&T & BOMs</option>
                      <option value="Automotive Drawing Review">Automotive Drawing Review</option>
                    </select>
                  </div>

                  {/* Callout 12: Allow Multiple CAD Tools */}
                  <div className="space-y-1.5">
                    <label className="font-semibold text-slate-700 block">CAD Tools (Select all that apply) *</label>
                    <div className="grid grid-cols-2 gap-2 pt-0.5">
                      {CAD_TOOL_OPTIONS.map((tool) => (
                        <label
                          key={tool}
                          className="flex items-center gap-2 text-xs font-normal text-slate-700 bg-slate-50 px-3 py-2 rounded-xl border border-slate-200 hover:border-blue-300 cursor-pointer transition-all"
                        >
                          <input
                            type="checkbox"
                            checked={profileForm.cadTools.includes(tool)}
                            onChange={() => toggleCadTool(tool)}
                            className="w-3.5 h-3.5 rounded border-slate-300 text-[#0057FF] focus:ring-blue-500"
                          />
                          <span className="truncate">{tool}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Callout 13: Add Résumé Upload & LinkedIn URL */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="font-semibold text-slate-700 block">Résumé / CV (PDF or DOCX, max 5 MB)</label>
                      <input
                        type="file"
                        accept=".pdf,.doc,.docx"
                        onChange={handleFileChange}
                        className="w-full text-xs text-slate-500 file:mr-2 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-blue-50 file:text-[#0057FF] hover:file:bg-blue-100 cursor-pointer"
                      />
                      {profileForm.resumeName && (
                        <p className="text-[10px] text-emerald-600 font-medium truncate">Selected: {profileForm.resumeName}</p>
                      )}
                    </div>

                    <div className="space-y-1">
                      <label className="font-semibold text-slate-700 block">LinkedIn URL (Optional)</label>
                      <input
                        type="url"
                        value={profileForm.linkedin}
                        onChange={(e) => setProfileForm({ ...profileForm, linkedin: e.target.value })}
                        placeholder="https://linkedin.com/in/your-profile"
                        className="w-full px-4 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="font-semibold text-slate-700">Experience / Summary</label>
                    <textarea
                      rows={3}
                      value={profileForm.notes}
                      onChange={(e) => setProfileForm({ ...profileForm, notes: e.target.value })}
                      placeholder="Briefly describe your tooling, automotive, or CAD background..."
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  {/* Callout 15: Required Consent Checkbox & Data Retention Statement */}
                  <div className="space-y-2 pt-2 border-t border-slate-100">
                    <div className="flex items-start gap-2.5">
                      <input
                        type="checkbox"
                        id="careersConsent"
                        required
                        checked={profileForm.agreed}
                        onChange={(e) => setProfileForm({ ...profileForm, agreed: e.target.checked })}
                        className="w-4 h-4 rounded border-slate-300 text-[#0057FF] focus:ring-blue-500 cursor-pointer mt-0.5 shrink-0"
                      />
                      <label htmlFor="careersConsent" className="text-[11px] text-slate-700 font-medium cursor-pointer leading-tight">
                        I agree to the processing and retention of my submitted profile information for future project collaboration opportunities under our <Link to="/privacy" className="text-[#0057FF] underline font-semibold">Privacy Policy</Link>.
                      </label>
                    </div>

                    <p className="text-[10px] text-slate-500 font-normal leading-relaxed pl-6">
                      Data-retention statement: Submitted profile information will only be used to consider future collaboration opportunities. Retained securely for up to 24 months.
                    </p>
                  </div>

                  {/* Callout 14: Submit Profile Securely */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full btn-primary py-3.5 text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-blue-500/20 disabled:opacity-50"
                  >
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    {isSubmitting ? 'Submitting Profile...' : 'Submit Profile Securely'}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}

    </div>
  );
};
