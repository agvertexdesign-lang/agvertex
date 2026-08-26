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
import { supabase } from '../../lib/supabase';
import { submitToWeb3Forms } from '../../lib/web3forms';
import { sendToWhatsApp } from '../../lib/whatsapp';

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

  const [selectedFile, setSelectedFile] = useState<File | null>(null);

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

    setSelectedFile(file);
    setProfileForm(prev => ({ ...prev, resumeName: file.name }));
    setErrorMessage('');
  };

  const uploadResume = async (file: File): Promise<string | null> => {
    try {
      const ext = file.name.split('.').pop() || 'pdf';
      const cleanName = file.name.replace(/[^a-zA-Z0-9_.-]/g, '_');
      const storagePath = `resumes/${Date.now()}_${cleanName}`;

      // Primary upload: Supabase Storage bucket
      const { error: uploadError } = await supabase.storage
        .from('cms-images')
        .upload(storagePath, file, { cacheControl: '3600', upsert: true });

      if (!uploadError) {
        const { data } = supabase.storage
          .from('cms-images')
          .getPublicUrl(storagePath);

        if (data?.publicUrl) {
          return data.publicUrl;
        }
      } else {
        console.warn('Supabase storage upload error:', uploadError);
      }
    } catch (e) {
      console.warn('Supabase upload exception:', e);
    }

    // Secondary fallback upload: tmpfiles.org
    try {
      const form = new FormData();
      form.append('file', file);
      const res = await fetch('https://tmpfiles.org/api/v1/upload', {
        method: 'POST',
        body: form
      });
      const json = await res.json();
      if (json?.data?.url) {
        return json.data.url.replace('tmpfiles.org/', 'tmpfiles.org/dl/');
      }
    } catch (e) {
      console.warn('Fallback file upload error:', e);
    }

    return null;
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
      let cvPublicUrl: string | null = null;
      if (selectedFile) {
        cvPublicUrl = await uploadResume(selectedFile);
      }

      const response = await submitToWeb3Forms({
        "Full Name": profileForm.name,
        "Email Address": profileForm.email,
        "replyto": profileForm.email,
        "Discipline": profileForm.primaryDiscipline,
        "CAD Tools": profileForm.cadTools.join(', '),
        "LinkedIn Profile": profileForm.linkedin || 'Not provided',
        "Résumé File Name": profileForm.resumeName || 'Not attached',
        "CV Document Link (Click to Download)": cvPublicUrl || 'Upload failed / Not attached',
        "Experience Summary": profileForm.notes || 'Not provided',
        "to_email": 'agvertexdesign@gmail.com',
      }, `AG VERTEX — New CV Submission (${profileForm.name})`);

      if (response.success) {
        setProfileSubmitted(true);
      } else {
        setErrorMessage(response.message || 'Failed to send application email. Please try again.');
      }
    } catch (err: any) {
      console.error("Application email submission error:", err);
      setErrorMessage('Failed to send application email. Please try again.');
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

      {/* 2. ACTIVE NOTICE BOX */}
      <section className="max-w-[1440px] mx-auto px-6 lg:px-12">
        <div className="glass-card group bg-gradient-to-br from-white via-slate-50 to-blue-50/50 py-5 px-6 sm:py-7 sm:px-10 rounded-3xl border border-blue-200/90 shadow-lg max-w-3xl mx-auto text-center space-y-3.5 relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-600 via-sky-400 to-indigo-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left z-20" />
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 border border-blue-200 text-[#0057FF] font-mono text-xs font-extrabold uppercase tracking-wider shadow-xs">
            <Clock className="w-3.5 h-3.5 text-[#0057FF]" /> STATUS NOTICE
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-extrabold text-[#0F172A] tracking-tight">
            NO ACTIVE PERMANENT POSITIONS
          </h2>

          <p className="text-sm sm:text-base text-slate-800 font-bold leading-relaxed max-w-xl mx-auto">
            AG Vertex is not actively recruiting permanent employees at this time. However, experienced mechanical design consultants, tooling specialists, and CAD professionals are welcome to submit their profiles for future project-based collaboration.
          </p>
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
                className="glass-card group p-7 rounded-3xl border border-blue-200/80 shadow-lg hover:border-blue-500 hover:shadow-2xl hover:-translate-y-2 transition-all duration-400 relative overflow-hidden bg-gradient-to-b from-white via-slate-50/95 to-blue-50/50"
              >
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-600 via-sky-400 to-indigo-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left z-20" />
                
                <div className="space-y-5 relative z-10">
                  <div className="w-13 h-13 rounded-2xl bg-gradient-to-br from-[#0057FF] via-[#004BE0] to-[#0034B3] text-white flex items-center justify-center shadow-[0_8px_20px_rgba(0,87,255,0.3)] ring-4 ring-blue-50/80 group-hover:ring-blue-100 group-hover:scale-110 group-hover:rotate-3 transition-all duration-400">
                    <ValIcon className="w-6.5 h-6.5 filter drop-shadow-xs" />
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="text-base font-heading font-extrabold text-[#0F172A] uppercase tracking-wide group-hover:text-[#0057FF] transition-colors duration-300">
                      {v.title}
                    </h3>

                    <p className="text-sm text-slate-800 leading-relaxed font-semibold">
                      {v.desc}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
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
                <h3 className="text-xl font-heading font-bold text-[#0F172A]">Application Sent to Email!</h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  Thank you for your interest. Your profile and CV have been sent directly to <strong className="text-slate-800">agvertexdesign@gmail.com</strong> for review.
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
                        <p className="text-[10px] text-emerald-600 font-medium truncate">✓ {profileForm.resumeName} (File sent to agvertexdesign@gmail.com)</p>
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

                  {/* Submit Profile via Email */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full btn-primary py-3.5 text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-blue-500/20 disabled:opacity-50"
                  >
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    {isSubmitting ? 'Sending Application...' : 'Submit Profile Securely via Email'}
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
