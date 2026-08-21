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
import { useCareersData, usePageContent, useSettingsData } from '../../hooks/useCmsData';
import { DEFAULT_CAD_STACK } from '../../lib/api/settings';
import { sendToWhatsApp } from '../../lib/whatsapp';

export const CareersView: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [profileSubmitted, setProfileSubmitted] = useState(false);
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
    cadSoftware: 'Creo Parametric',
    experienceYears: '5-10 Years',
    portfolioLink: '',
    notes: '',
  });

  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const lines = [
      "💼 AG VERTEX — Specialist Profile Submission",
      "----------------------------------------",
      `👤 Name: ${profileForm.name}`,
      `✉️ Email: ${profileForm.email}`,
      `📞 Phone: ${profileForm.phone || 'Not provided'}`,
      `🛠️ Primary Discipline: ${profileForm.primaryDiscipline}`,
      `💻 CAD Software: ${profileForm.cadSoftware}`,
      `⏳ Experience: ${profileForm.experienceYears}`,
      `🔗 Portfolio Link: ${profileForm.portfolioLink || 'Not provided'}`,
      "",
      "📝 Additional Summary / Notes:",
      profileForm.notes || 'Not provided',
    ];

    sendToWhatsApp(lines);
    setProfileSubmitted(true);
    setTimeout(() => {
      setProfileSubmitted(false);
      setModalOpen(false);
      setProfileForm({
        name: '',
        email: '',
        phone: '',
        primaryDiscipline: 'Product Design & Development',
        cadSoftware: 'Creo Parametric',
        experienceYears: '5-10 Years',
        portfolioLink: '',
        notes: '',
      });
    }, 2500);
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
    <div className="space-y-16 lg:space-y-24 pt-36 sm:pt-40 lg:pt-44 pb-20 overflow-x-hidden">
      
      {/* 1. HERO SECTION */}
      <section className="max-w-[1440px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs font-mono font-bold uppercase text-[#0057FF] tracking-widest block">
              {careers.hero_tag || 'CAREERS & COLLABORATION'}
            </span>

            <h1 className="text-4xl sm:text-5xl lg:text-[52px] font-heading font-extrabold text-[#0F172A] tracking-tight leading-[1.12]">
              {careers.hero_title || 'BRING PRACTICAL ENGINEERING IDEAS TO LIFE'}
            </h1>

            <p className="text-sm sm:text-base text-slate-600 font-normal leading-relaxed max-w-lg">
              {careers.hero_desc || 'AG Vertex welcomes experienced mechanical designers, tooling specialists, and CAD professionals interested in future project-based collaboration.'}
            </p>

            <div className="pt-2">
              <button
                onClick={() => setModalOpen(true)}
                className="btn-primary px-7 py-3.5 text-xs font-semibold flex items-center gap-2.5 cursor-pointer shadow-lg shadow-blue-500/25"
              >
                Submit Your Profile
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right Image */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-slate-200/90 bg-slate-900 group">
              <img
                src={careers.hero_img || settings?.images?.careers_team_image || "/images/cad_team_collaboration.jpeg"}
                alt="Engineering Team Collaboration - AG Vertex"
                className="w-full h-[360px] sm:h-[420px] object-cover transition-transform duration-700 group-hover:scale-103"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent pointer-events-none" />
            </div>
          </div>

        </div>
      </section>

      {/* 2. FOUR VALUES ROW */}
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

      {/* 3. OPEN POSITIONS OR ACTIVE NOTICE BOX */}
      <section className="max-w-[1440px] mx-auto px-6 lg:px-12 space-y-6">
        {dbCareers && dbCareers.length > 0 ? (
          <div className="space-y-6 max-w-4xl mx-auto">
            <div className="text-center space-y-2 mb-8">
              <span className="text-xs font-mono font-bold uppercase text-[#0057FF] tracking-widest block">
                CURRENT OPENINGS
              </span>
              <h2 className="text-2xl sm:text-3xl font-heading font-bold text-[#0F172A]">
                Join Our Engineering Network
              </h2>
            </div>

            <div className="space-y-4">
              {dbCareers.map((job) => (
                <div
                  key={job.id}
                  className="glass-card bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/90 shadow-md space-y-4"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-blue-50 text-[#0057FF] border border-blue-100">
                          {job.employment_type}
                        </span>
                        {job.department && (
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-slate-100 text-slate-700">
                            {job.department}
                          </span>
                        )}
                      </div>
                      <h3 className="text-xl font-heading font-bold text-[#0F172A]">
                        {job.title}
                      </h3>
                      <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 mt-1">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-slate-400" />
                          {job.location}
                        </span>
                        {job.experience_required && (
                          <span className="flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5 text-slate-400" />
                            {job.experience_required}
                          </span>
                        )}
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        setProfileForm((prev) => ({
                          ...prev,
                          primaryDiscipline: job.title,
                        }));
                        setModalOpen(true);
                      }}
                      className="btn-primary px-5 py-2.5 text-xs font-semibold shrink-0 flex items-center gap-1.5"
                    >
                      Apply Now <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {job.description && (
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pt-2 border-t border-slate-100">
                      {job.description}
                    </p>
                  )}

                  {job.responsibilities && job.responsibilities.length > 0 && (
                    <div className="space-y-1.5 pt-2">
                      <span className="text-xs font-bold text-slate-800">Responsibilities:</span>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                        {job.responsibilities.map((r, i) => (
                          <li key={i} className="text-xs text-slate-600 flex items-start gap-2">
                            <span className="text-[#0057FF] font-bold">•</span>
                            <span>{r}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {job.requirements && job.requirements.length > 0 && (
                    <div className="space-y-1.5 pt-2">
                      <span className="text-xs font-bold text-slate-800">Requirements:</span>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                        {job.requirements.map((req, i) => (
                          <li key={i} className="text-xs text-slate-600 flex items-start gap-2">
                            <span className="text-emerald-500 font-bold">✓</span>
                            <span>{req}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="glass-card bg-white p-8 lg:p-10 rounded-3xl border border-slate-200/90 shadow-md flex flex-col sm:flex-row items-center gap-6 max-w-3xl mx-auto">
            <div className="w-14 h-14 rounded-2xl bg-blue-50 text-[#0057FF] flex items-center justify-center shrink-0">
              <Briefcase className="w-7 h-7" />
            </div>

            <div className="space-y-1 text-center sm:text-left">
              <h3 className="text-base sm:text-lg font-heading font-bold text-[#0F172A] uppercase">
                NO ACTIVE POSITIONS AT THIS TIME
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed font-normal">
                We are not currently hiring for permanent roles. You may submit your profile for consideration when suitable project-based opportunities arise.
              </p>
            </div>
          </div>
        )}
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

              <div className="pt-2 border-t border-slate-100 flex items-center gap-1.5 text-[11px] font-semibold text-emerald-600">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                <span>Production Ready</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. BOTTOM CALLOUT */}
      <section className="max-w-[1440px] mx-auto px-6 lg:px-12">
        <div className="glass-card bg-slate-900 text-white p-8 lg:p-12 rounded-3xl shadow-xl flex flex-col lg:flex-row items-center justify-between gap-8">
          
          <div className="space-y-2 text-center lg:text-left">
            <h3 className="text-xl sm:text-2xl font-heading font-bold uppercase tracking-tight">
              INTERESTED IN FUTURE PROJECT-BASED WORK?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300">
              Submit your profile and we'll keep you in mind for suitable project-based opportunities.
            </p>
          </div>

          <button
            onClick={() => setModalOpen(true)}
            className="btn-primary px-7 py-3.5 text-xs font-semibold shrink-0 cursor-pointer shadow-lg shadow-blue-500/25"
          >
            Submit Your Profile →
          </button>

        </div>
      </section>

      {/* PROFILE SUBMISSION MODAL */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-md animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full p-8 border border-slate-200 shadow-2xl relative space-y-6 max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-6 right-6 w-8 h-8 rounded-full bg-slate-100 text-slate-500 hover:text-slate-800 flex items-center justify-center cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            {profileSubmitted ? (
              <div className="py-8 text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto" />
                <h3 className="text-xl font-heading font-bold text-[#0F172A]">Profile Submitted!</h3>
                <p className="text-xs text-slate-500">
                  Thank you for your interest. We will contact you when suitable project opportunities arise.
                </p>
              </div>
            ) : (
              <>
                <div className="space-y-1">
                  <span className="text-[10px] font-mono font-bold text-[#0057FF] uppercase tracking-widest block">
                    PROJECT-BASED TALENT NETWORK
                  </span>
                  <h3 className="text-2xl font-heading font-bold text-[#0F172A]">
                    Submit Your Specialist Profile
                  </h3>
                </div>

                <form onSubmit={handleProfileSubmit} className="space-y-4 text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="font-semibold text-slate-700">Full Name *</label>
                      <input
                        type="text"
                        required
                        value={profileForm.name}
                        onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                        placeholder="Alex Mercer"
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
                        placeholder="alex@company.com"
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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

                    <div className="space-y-1">
                      <label className="font-semibold text-slate-700">CAD Experience</label>
                      <select
                        value={profileForm.cadSoftware}
                        onChange={(e) => setProfileForm({ ...profileForm, cadSoftware: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500 bg-white"
                      >
                        <option value="Creo Parametric">PTC Creo Parametric</option>
                        <option value="Siemens NX">Siemens NX</option>
                        <option value="AutoCAD">Autodesk AutoCAD</option>
                        <option value="SolidWorks">Dassault SolidWorks</option>
                      </select>
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

                  <button
                    type="submit"
                    className="w-full btn-primary py-3 text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer"
                  >
                    Submit Profile via WhatsApp <Send className="w-3.5 h-3.5" />
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
