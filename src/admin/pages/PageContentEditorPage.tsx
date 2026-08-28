import React, { useEffect, useState } from 'react';
import { settingsApi, WebsitePageContent, DEFAULT_PAGE_CONTENT, DEFAULT_CAD_STACK } from '../../lib/api/settings';
import { mediaApi } from '../../lib/api/media';
import { toast } from '../components/Toast';
import { Save, Loader2, Home, Info, Briefcase, Upload, RotateCcw, Image as ImageIcon, Type, Sparkles, Cpu } from 'lucide-react';

export function PageContentEditorPage() {
  const [content, setContent] = useState<WebsitePageContent>(DEFAULT_PAGE_CONTENT);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'home' | 'about' | 'careers'>('home');
  const [saving, setSaving] = useState(false);
  const [uploadingField, setUploadingField] = useState<string | null>(null);

  useEffect(() => {
    settingsApi.getPageContent().then(data => {
      setContent(data);
      setLoading(false);
    });
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      await settingsApi.updatePageContent(content);
      try {
        localStorage.setItem('ag_page_content', JSON.stringify(content));
      } catch (err) {
        console.warn('Cache write failed:', err);
      }
      toast.success('Page content & images saved successfully! Live website updated.');
    } catch (e: any) {
      toast.error('Save failed: ' + e.message);
    } finally {
      setSaving(false);
    }
  };

  const handleFileUpload = async (page: 'home' | 'about' | 'careers', fieldKey: string, file: File) => {
    const fieldId = `${page}.${fieldKey}`;
    setUploadingField(fieldId);
    try {
      const media = await mediaApi.upload(file, `Image for ${page} page - ${fieldKey}`);
      setContent(prev => ({
        ...prev,
        [page]: {
          ...prev[page],
          [fieldKey]: media.public_url,
        },
      }));
      toast.success('Image uploaded! Click Save Changes to publish live.');
    } catch (e: any) {
      toast.error('Upload failed: ' + e.message);
    } finally {
      setUploadingField(null);
    }
  };

  const updateField = (page: 'home' | 'about' | 'careers', fieldKey: string, value: string) => {
    setContent(prev => ({
      ...prev,
      [page]: {
        ...prev[page],
        [fieldKey]: value,
      },
    }));
  };

  const resetField = (page: 'home' | 'about' | 'careers', fieldKey: string) => {
    const defaultVal = (DEFAULT_PAGE_CONTENT[page] as any)[fieldKey];
    updateField(page, fieldKey, defaultVal);
  };

  const updateCadItem = (index: number, field: string, value: string) => {
    const currentItems = content.about.cad_items && content.about.cad_items.length > 0
      ? [...content.about.cad_items]
      : [...DEFAULT_CAD_STACK];
    
    currentItems[index] = {
      ...currentItems[index],
      [field]: value,
    };

    setContent(prev => ({
      ...prev,
      about: {
        ...prev.about,
        cad_items: currentItems,
      },
    }));
  };

  const handleCadLogoUpload = async (index: number, file: File) => {
    const fieldId = `cad_logo_${index}`;
    setUploadingField(fieldId);
    try {
      const media = await mediaApi.upload(file, `CAD Software Logo ${index}`);
      updateCadItem(index, 'logo_url', media.public_url);
      toast.success('Software logo uploaded! Click Save Page Content to publish live.');
    } catch (e: any) {
      toast.error('Upload failed: ' + e.message);
    } finally {
      setUploadingField(null);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-7 h-7 animate-spin text-[#0057FF]" />
      </div>
    );
  }

  const renderImageUploader = (page: 'home' | 'about' | 'careers', fieldKey: string, label: string, defaultUrl: string) => {
    const currentValue = (content[page] as any)[fieldKey] || defaultUrl;
    const fieldId = `${page}.${fieldKey}`;
    const isUploading = uploadingField === fieldId;

    return (
      <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <label className="text-xs font-bold text-slate-800 uppercase tracking-wide flex items-center gap-1.5">
            <ImageIcon className="w-3.5 h-3.5 text-[#0057FF]" />
            {label}
          </label>
          <div className="flex items-center gap-2">
            <label className="cursor-pointer px-3 py-1.5 rounded-lg bg-blue-50 hover:bg-blue-100 text-[#0057FF] text-xs font-bold transition-colors inline-flex items-center gap-1.5 border border-blue-200">
              {isUploading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Upload className="w-3.5 h-3.5" />}
              {isUploading ? 'Uploading...' : 'Upload Image'}
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={e => {
                  const file = e.target.files?.[0];
                  if (file) handleFileUpload(page, fieldKey, file);
                }}
              />
            </label>
            {currentValue !== defaultUrl && (
              <button
                type="button"
                onClick={() => resetField(page, fieldKey)}
                className="px-2.5 py-1.5 rounded-lg bg-slate-200 hover:bg-slate-300 text-slate-700 text-xs font-semibold transition-colors inline-flex items-center gap-1"
                title="Reset to default"
              >
                <RotateCcw className="w-3 h-3" />
                Reset
              </button>
            )}
          </div>
        </div>

        <div className="flex items-center gap-4 pt-1">
          <div className="w-24 h-16 rounded-lg overflow-hidden border border-slate-300 bg-slate-900 shrink-0">
            <img
              src={currentValue}
              alt={label}
              className="w-full h-full object-cover"
              onError={e => { (e.target as HTMLImageElement).src = defaultUrl; }}
            />
          </div>
          <input
            type="text"
            value={currentValue}
            onChange={e => updateField(page, fieldKey, e.target.value)}
            placeholder={`Default: ${defaultUrl}`}
            className="flex-1 px-3 py-2 rounded-lg border border-slate-300 text-xs bg-white focus:outline-none focus:border-[#0057FF] transition-all font-mono"
          />
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-8 max-w-4xl">

      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2.5">
            <Type className="w-6 h-6 text-[#0057FF]" />
            Website Page Content & Images
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Edit text, headings, descriptions, and images for all pages on your live website.
          </p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="px-6 py-2.5 rounded-xl bg-[#0057FF] text-white text-sm font-bold hover:bg-blue-600 flex items-center gap-2 disabled:opacity-60 shadow-md shadow-blue-500/20 shrink-0 cursor-pointer"
        >
          {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          Save Page Content
        </button>
      </div>

      {/* Page Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-0">
        {[
          { id: 'home' as const, label: 'Home Page', icon: Home },
          { id: 'about' as const, label: 'About Us Page', icon: Info },
          { id: 'careers' as const, label: 'Careers Page', icon: Briefcase },
        ].map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-5 py-3 font-bold text-sm border-b-2 transition-all cursor-pointer ${
                isActive
                  ? 'border-[#0057FF] text-[#0057FF] bg-blue-50/50 rounded-t-xl'
                  : 'border-transparent text-slate-500 hover:text-slate-900 hover:bg-slate-100/60 rounded-t-xl'
              }`}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* HOME PAGE TAB */}
      {activeTab === 'home' && (
        <div className="space-y-8 animate-in fade-in">
          {/* Hero Section */}
          <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-5">
            <h2 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#0057FF]" />
              Home Page — Hero Section
            </h2>

            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wide block">Hero Title</label>
                <input
                  type="text"
                  value={content.home.hero_title}
                  onChange={e => updateField('home', 'hero_title', e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm font-semibold bg-slate-50 focus:bg-white focus:border-[#0057FF] transition-all"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wide block">Hero Subtitle</label>
                <textarea
                  rows={3}
                  value={content.home.hero_subtitle}
                  onChange={e => updateField('home', 'hero_subtitle', e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm bg-slate-50 focus:bg-white focus:border-[#0057FF] transition-all"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wide block">Badge 1 Text</label>
                  <input
                    type="text"
                    value={content.home.badge_1}
                    onChange={e => updateField('home', 'badge_1', e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm bg-slate-50 focus:bg-white focus:border-[#0057FF]"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wide block">Badge 2 Text</label>
                  <input
                    type="text"
                    value={content.home.badge_2}
                    onChange={e => updateField('home', 'badge_2', e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm bg-slate-50 focus:bg-white focus:border-[#0057FF]"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* 3 Main Capability Cards */}
          <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
            <h2 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#0057FF]" />
              Home Page — 3 Main Capability Cards
            </h2>

            {[
              { num: 1, titleKey: 'cap_1_title', descKey: 'cap_1_desc', imgKey: 'cap_1_img', defaultImg: '/services/product_design.png' },
              { num: 2, titleKey: 'cap_2_title', descKey: 'cap_2_desc', imgKey: 'cap_2_img', defaultImg: '/services/injection_mold.png' },
              { num: 3, titleKey: 'cap_3_title', descKey: 'cap_3_desc', imgKey: 'cap_3_img', defaultImg: '/services/drawings_gdt.png' },
            ].map(card => (
              <div key={card.num} className="p-5 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-4">
                <p className="text-xs font-mono font-bold text-[#0057FF] uppercase">Capability Card #{card.num}</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 uppercase block">Card Title</label>
                    <input
                      type="text"
                      value={(content.home as any)[card.titleKey]}
                      onChange={e => updateField('home', card.titleKey, e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm bg-white"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 uppercase block">Card Subtitle / Bullet</label>
                    <input
                      type="text"
                      value={(content.home as any)[card.descKey]}
                      onChange={e => updateField('home', card.descKey, e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm bg-white"
                    />
                  </div>
                </div>
                {renderImageUploader('home', card.imgKey, `Card #${card.num} Image`, card.defaultImg)}
              </div>
            ))}
          </section>
        </div>
      )}

      {/* ABOUT PAGE TAB */}
      {activeTab === 'about' && (
        <div className="space-y-8 animate-in fade-in">
          {/* Hero Section */}
          <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-5">
            <h2 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#0057FF]" />
              About Page — Hero Section
            </h2>

            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wide block">Hero Title</label>
                <input
                  type="text"
                  value={content.about.hero_title}
                  onChange={e => updateField('about', 'hero_title', e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm font-semibold bg-slate-50 focus:bg-white focus:border-[#0057FF]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wide block">Hero Description Paragraph</label>
                <textarea
                  rows={4}
                  value={content.about.hero_desc}
                  onChange={e => updateField('about', 'hero_desc', e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm bg-slate-50 focus:bg-white focus:border-[#0057FF]"
                />
              </div>

              {renderImageUploader('about', 'hero_img', 'About Us — Hero CAD Workstation Image', '/images/cad_workstation_single.jpeg')}
            </div>
          </section>

          {/* 4 Pillars / Core Values Cards */}
          <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
            <h2 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#0057FF]" />
              About Page — 4 Core Pillars Cards (Mission, Vision, Values, Promise)
            </h2>

            {[
              { num: 1, titleKey: 'pillar_1_title', descKey: 'pillar_1_desc' },
              { num: 2, titleKey: 'pillar_2_title', descKey: 'pillar_2_desc' },
              { num: 3, titleKey: 'pillar_3_title', descKey: 'pillar_3_desc' },
              { num: 4, titleKey: 'pillar_4_title', descKey: 'pillar_4_desc' },
            ].map(card => (
              <div key={card.num} className="p-5 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-4">
                <p className="text-xs font-mono font-bold text-[#0057FF] uppercase">Pillar Card #{card.num}</p>
                <div className="space-y-3">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 uppercase block">Card Title</label>
                    <input
                      type="text"
                      value={(content.about as any)[card.titleKey]}
                      onChange={e => updateField('about', card.titleKey, e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm bg-white"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 uppercase block">Card Description Paragraph</label>
                    <textarea
                      rows={2}
                      value={(content.about as any)[card.descKey]}
                      onChange={e => updateField('about', card.descKey, e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm bg-white"
                    />
                  </div>
                </div>
              </div>
            ))}
          </section>

          {/* 4 Experience Cards */}
          <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
            <h2 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#0057FF]" />
              About Page — 4 Engineering Experience Cards
            </h2>

            {[
              { num: 1, titleKey: 'exp_1_title', descKey: 'exp_1_desc', imgKey: 'exp_1_img', defaultImg: '/services/product_design.png' },
              { num: 2, titleKey: 'exp_2_title', descKey: 'exp_2_desc', imgKey: 'exp_2_img', defaultImg: '/services/injection_mold.png' },
              { num: 3, titleKey: 'exp_3_title', descKey: 'exp_3_desc', imgKey: 'exp_3_img', defaultImg: '/services/drawing_validation.png' },
              { num: 4, titleKey: 'exp_4_title', descKey: 'exp_4_desc', imgKey: 'exp_4_img', defaultImg: '/images/cad_workstation_single.jpeg' },
            ].map(card => (
              <div key={card.num} className="p-5 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-4">
                <p className="text-xs font-mono font-bold text-[#0057FF] uppercase">Experience Card #{card.num}</p>
                <div className="space-y-3">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 uppercase block">Title</label>
                    <input
                      type="text"
                      value={(content.about as any)[card.titleKey]}
                      onChange={e => updateField('about', card.titleKey, e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm bg-white"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 uppercase block">Description</label>
                    <textarea
                      rows={2}
                      value={(content.about as any)[card.descKey]}
                      onChange={e => updateField('about', card.descKey, e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm bg-white"
                    />
                  </div>
                </div>
                {renderImageUploader('about', card.imgKey, `Card #${card.num} Image`, card.defaultImg)}
              </div>
            ))}

            {renderImageUploader('about', 'facility_img', 'About Us — Bottom Facility / Review Image', '/services/drawing_validation.png')}
          </section>

          {/* Engineering CAD Stack Software Section */}
          <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
            <h2 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
              <Cpu className="w-4 h-4 text-[#0057FF]" />
              About Page — Software & CAD Proficiency Stack (Logos & Software Details)
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wide block">Section Title</label>
                <input
                  type="text"
                  value={content.about.cad_stack_title || 'SOFTWARE & CAD PROFICIENCY'}
                  onChange={e => updateField('about', 'cad_stack_title', e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm bg-slate-50 focus:bg-white focus:border-[#0057FF]"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wide block">Section Subtitle</label>
                <input
                  type="text"
                  value={content.about.cad_stack_desc || 'We collaborate using industry-standard engineering suites and enterprise PLM workflows.'}
                  onChange={e => updateField('about', 'cad_stack_desc', e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm bg-slate-50 focus:bg-white focus:border-[#0057FF]"
                />
              </div>
            </div>

            {((content.about.cad_items && content.about.cad_items.length > 0) ? content.about.cad_items : DEFAULT_CAD_STACK).map((tool, idx) => {
              const fieldId = `cad_logo_${idx}`;
              const isUploading = uploadingField === fieldId;

              return (
                <div key={tool.id || idx} className="p-5 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-4">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-mono font-bold text-[#0057FF] uppercase">CAD Software Tool #{idx + 1}</p>
                    <label className="cursor-pointer px-3 py-1.5 rounded-lg bg-blue-50 hover:bg-blue-100 text-[#0057FF] text-xs font-bold transition-colors inline-flex items-center gap-1.5 border border-blue-200">
                      {isUploading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Upload className="w-3.5 h-3.5" />}
                      {isUploading ? 'Uploading Logo...' : 'Upload Brand Logo'}
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={e => {
                          const file = e.target.files?.[0];
                          if (file) handleCadLogoUpload(idx, file);
                        }}
                      />
                    </label>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700 uppercase block">Software Name</label>
                      <input
                        type="text"
                        value={tool.name}
                        onChange={e => updateCadItem(idx, 'name', e.target.value)}
                        className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm bg-white"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700 uppercase block">Category / Discipline</label>
                      <input
                        type="text"
                        value={tool.category}
                        onChange={e => updateCadItem(idx, 'category', e.target.value)}
                        className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm bg-white"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-700 uppercase block">Badge Tag (e.g. CREO)</label>
                      <input
                        type="text"
                        value={tool.badge}
                        onChange={e => updateCadItem(idx, 'badge', e.target.value)}
                        className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm bg-white"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 uppercase block">Description / Capabilities</label>
                    <textarea
                      rows={2}
                      value={tool.desc}
                      onChange={e => updateCadItem(idx, 'desc', e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm bg-white"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 uppercase block">Brand Logo Image URL</label>
                    <div className="flex items-center gap-3">
                      {tool.logo_url && (
                        <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 p-1.5 flex items-center justify-center shrink-0">
                          <img src={tool.logo_url} alt={tool.name} className="w-full h-full object-contain" />
                        </div>
                      )}
                      <input
                        type="text"
                        value={tool.logo_url || ''}
                        onChange={e => updateCadItem(idx, 'logo_url', e.target.value)}
                        placeholder="https://... logo URL"
                        className="flex-1 px-3.5 py-2 rounded-xl border border-slate-300 text-xs font-mono bg-white"
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </section>
        </div>
      )}

      {/* CAREERS PAGE TAB */}
      {activeTab === 'careers' && (
        <div className="space-y-8 animate-in fade-in">
          {/* Hero Section */}
          <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-5">
            <h2 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#0057FF]" />
              Careers Page — Hero Section
            </h2>

            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wide block">Tagline Label</label>
                <input
                  type="text"
                  value={content.careers.hero_tag}
                  onChange={e => updateField('careers', 'hero_tag', e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm bg-slate-50 focus:bg-white focus:border-[#0057FF]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wide block">Hero Main Title</label>
                <input
                  type="text"
                  value={content.careers.hero_title}
                  onChange={e => updateField('careers', 'hero_title', e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm font-semibold bg-slate-50 focus:bg-white focus:border-[#0057FF]"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wide block">Hero Paragraph</label>
                <textarea
                  rows={3}
                  value={content.careers.hero_desc}
                  onChange={e => updateField('careers', 'hero_desc', e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm bg-slate-50 focus:bg-white focus:border-[#0057FF]"
                />
              </div>

              {renderImageUploader('careers', 'hero_img', 'Careers — Team Collaboration Image', '/images/cad_team_collaboration.jpeg')}
            </div>
          </section>

          {/* 4 Values Cards */}
          <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
            <h2 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#0057FF]" />
              Careers Page — 4 Value Cards
            </h2>

            {[
              { num: 1, titleKey: 'val_1_title', descKey: 'val_1_desc' },
              { num: 2, titleKey: 'val_2_title', descKey: 'val_2_desc' },
              { num: 3, titleKey: 'val_3_title', descKey: 'val_3_desc' },
              { num: 4, titleKey: 'val_4_title', descKey: 'val_4_desc' },
            ].map(val => (
              <div key={val.num} className="p-4 rounded-2xl border border-slate-200 bg-slate-50/50 space-y-3">
                <p className="text-xs font-mono font-bold text-[#0057FF] uppercase">Value Card #{val.num}</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 uppercase block">Title</label>
                    <input
                      type="text"
                      value={(content.careers as any)[val.titleKey]}
                      onChange={e => updateField('careers', val.titleKey, e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm bg-white"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 uppercase block">Description</label>
                    <input
                      type="text"
                      value={(content.careers as any)[val.descKey]}
                      onChange={e => updateField('careers', val.descKey, e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm bg-white"
                    />
                  </div>
                </div>
              </div>
            ))}
          </section>
        </div>
      )}

      {/* Bottom Save Bar */}
      <div className="sticky bottom-4 bg-slate-900 text-white rounded-2xl p-4 shadow-2xl flex items-center justify-between gap-4 border border-slate-800 z-20">
        <div>
          <p className="text-xs font-bold text-white">Save Changes to Live Website</p>
          <p className="text-[11px] text-slate-400">All updated titles, text, and images will be published immediately.</p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="px-6 py-2.5 rounded-xl bg-[#0057FF] text-white text-xs font-bold hover:bg-blue-600 flex items-center gap-2 disabled:opacity-60 cursor-pointer shadow-md shadow-blue-500/30"
        >
          {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          Save Page Content
        </button>
      </div>

    </div>
  );
}
