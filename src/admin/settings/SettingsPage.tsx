import React, { useEffect, useState } from 'react';
import { settingsApi, ContactSettings, SocialSettings, BusinessSettings, SectionImagesSettings } from '../../lib/api/settings';
import { mediaApi } from '../../lib/api/media';
import { toast } from '../components/Toast';
import { Save, Loader2, Phone, Linkedin, Building2, Image as ImageIcon, Upload, RotateCcw } from 'lucide-react';

const DEFAULT_IMAGES: SectionImagesSettings = {
  about_hero_image: '/images/cad_workstation_single.jpeg',
  about_facility_image: '/services/drawing_validation.png',
  careers_team_image: '/images/cad_team_collaboration.jpeg',
  home_hero_image: '',
};

export function SettingsPage() {
  const [contact, setContact] = useState<ContactSettings>({
    phone: '',
    email: 'agvertexdesign@gmail.com',
    address: 'Canada · New Zealand · India',
    whatsapp: '',
    contact_form_email: 'agvertexdesign@gmail.com',
  });
  const [social, setSocial] = useState<SocialSettings>({ linkedin: '', instagram: '', facebook: '', youtube: '' });
  const [business, setBusiness] = useState<BusinessSettings>({ company_name: '', tagline: '', short_description: '', business_hours: '' });
  const [images, setImages] = useState<SectionImagesSettings>(DEFAULT_IMAGES);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<string | null>(null);
  const [uploadingKey, setUploadingKey] = useState<string | null>(null);

  useEffect(() => {
    settingsApi.getAllSettings().then(all => {
      setContact(all.contact);
      setSocial(all.social);
      setBusiness(all.business);
      if (all.images) setImages(all.images);
      setLoading(false);
    });
  }, []);

  const saveContact = async () => {
    setSaving('contact');
    try {
      await settingsApi.updateSetting('contact', contact);
      try {
        const cached = localStorage.getItem('ag_settings');
        if (cached) {
          const parsed = JSON.parse(cached);
          parsed.contact = contact;
          localStorage.setItem('ag_settings', JSON.stringify(parsed));
        }
      } catch (err) {
        console.warn(err);
      }
      toast.success('Contact settings saved.');
    } catch (e: any) {
      toast.error('Save failed: ' + e.message);
    } finally {
      setSaving(null);
    }
  };

  const saveSocial = async () => {
    setSaving('social');
    try {
      await settingsApi.updateSetting('social', social);
      try {
        const cached = localStorage.getItem('ag_settings');
        if (cached) {
          const parsed = JSON.parse(cached);
          parsed.social = social;
          localStorage.setItem('ag_settings', JSON.stringify(parsed));
        }
      } catch (err) {
        console.warn(err);
      }
      toast.success('Social links saved.');
    } catch (e: any) {
      toast.error('Save failed: ' + e.message);
    } finally {
      setSaving(null);
    }
  };

  const saveBusiness = async () => {
    setSaving('business');
    try {
      await settingsApi.updateSetting('business', business);
      try {
        const cached = localStorage.getItem('ag_settings');
        if (cached) {
          const parsed = JSON.parse(cached);
          parsed.business = business;
          localStorage.setItem('ag_settings', JSON.stringify(parsed));
        }
      } catch (err) {
        console.warn(err);
      }
      toast.success('Business info saved.');
    } catch (e: any) {
      toast.error('Save failed: ' + e.message);
    } finally {
      setSaving(null);
    }
  };

  const saveImages = async () => {
    setSaving('images');
    try {
      await settingsApi.updateSetting('images', images);
      try {
        const cached = localStorage.getItem('ag_settings');
        if (cached) {
          const parsed = JSON.parse(cached);
          parsed.images = images;
          localStorage.setItem('ag_settings', JSON.stringify(parsed));
        }
      } catch (err) {
        console.warn(err);
      }
      toast.success('Page & section images saved successfully.');
    } catch (e: any) {
      toast.error('Save failed: ' + e.message);
    } finally {
      setSaving(null);
    }
  };

  const handleImageUpload = async (key: keyof SectionImagesSettings, file: File) => {
    setUploadingKey(key);
    try {
      const media = await mediaApi.upload(file, `Website section image for ${key}`);
      setImages(prev => ({ ...prev, [key]: media.public_url }));
      toast.success('Image uploaded! Remember to click Save Page Images.');
    } catch (e: any) {
      toast.error('Image upload failed: ' + e.message);
    } finally {
      setUploadingKey(null);
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center h-64"><Loader2 className="w-6 h-6 animate-spin text-[#0057FF]" /></div>;
  }

  return (
    <div className="space-y-8 max-w-3xl">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Contact & Settings</h1>
        <p className="text-sm text-slate-500 mt-1">Manage your business contact info, social links, company details, and section images.</p>
      </div>

      {/* Website Page & Section Images Manager */}
      <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
        <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
          <div className="w-9 h-9 rounded-xl bg-blue-50 text-[#0057FF] flex items-center justify-center">
            <ImageIcon className="w-4.5 h-4.5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-900">Website Page & Section Images</h2>
            <p className="text-xs text-slate-500">Upload custom images for key sections on your website pages.</p>
          </div>
        </div>

        <div className="space-y-6">
          {[
            {
              key: 'about_hero_image' as const,
              label: 'About Us — Hero CAD Workstation Image',
              desc: 'Main image shown on the About Us page header section.',
              defaultImg: '/images/cad_workstation_single.jpeg',
            },
            {
              key: 'about_facility_image' as const,
              label: 'About Us — Facility / Precision Equipment Image',
              desc: 'Secondary image shown near the bottom of the About Us page.',
              defaultImg: '/services/drawing_validation.png',
            },
            {
              key: 'careers_team_image' as const,
              label: 'Careers — Team Collaboration Image',
              desc: 'Main banner image shown on the Careers page.',
              defaultImg: '/images/cad_team_collaboration.jpeg',
            },
          ].map(field => {
            const currentUrl = images[field.key] || field.defaultImg;
            const isUploading = uploadingKey === field.key;

            return (
              <div key={field.key} className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wide">{field.label}</h3>
                    <p className="text-xs text-slate-500">{field.desc}</p>
                  </div>
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
                          if (file) handleImageUpload(field.key, file);
                        }}
                      />
                    </label>
                    {images[field.key] !== field.defaultImg && (
                      <button
                        type="button"
                        onClick={() => setImages(prev => ({ ...prev, [field.key]: field.defaultImg }))}
                        className="px-2.5 py-1.5 rounded-lg bg-slate-200 hover:bg-slate-300 text-slate-700 text-xs font-semibold transition-colors inline-flex items-center gap-1"
                        title="Reset to default image"
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
                      src={currentUrl}
                      alt={field.label}
                      className="w-full h-full object-cover"
                      onError={e => { (e.target as HTMLImageElement).src = field.defaultImg; }}
                    />
                  </div>
                  <input
                    type="text"
                    value={images[field.key] || ''}
                    onChange={e => setImages(prev => ({ ...prev, [field.key]: e.target.value }))}
                    placeholder={`Default: ${field.defaultImg}`}
                    className="flex-1 px-3 py-2 rounded-lg border border-slate-300 text-xs bg-white focus:outline-none focus:border-[#0057FF] transition-all font-mono"
                  />
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex justify-end pt-2">
          <button
            onClick={saveImages}
            disabled={saving === 'images'}
            className="px-5 py-2.5 rounded-xl bg-[#0057FF] text-white text-sm font-bold hover:bg-blue-600 flex items-center gap-2 disabled:opacity-60 shadow-sm shadow-blue-500/20"
          >
            {saving === 'images' ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            Save Page Images
          </button>
        </div>
      </section>

      {/* Contact Information */}
      <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-5">
        <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
          <div className="w-9 h-9 rounded-xl bg-blue-50 text-[#0057FF] flex items-center justify-center">
            <Phone className="w-4.5 h-4.5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-900">Contact Information</h2>
            <p className="text-xs text-slate-500">Displayed on the Contact page and footer.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {[
            { key: 'phone', label: 'Phone Number', placeholder: '+1 (289) 683-1234' },
            { key: 'email', label: 'Business Email', placeholder: 'agvertexdesign@gmail.com' },
            { key: 'contact_form_email', label: 'Contact Form Email', placeholder: 'Where form submissions go' },
            { key: 'whatsapp', label: 'WhatsApp Number (Optional)', placeholder: '+1 (289) ...' },
          ].map(field => (
            <div key={field.key} className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wide block">{field.label}</label>
              <input
                type="text"
                value={(contact as any)[field.key]}
                onChange={e => setContact(c => ({ ...c, [field.key]: e.target.value }))}
                placeholder={field.placeholder}
                className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm bg-slate-50 focus:outline-none focus:border-[#0057FF] focus:bg-white focus:ring-2 focus:ring-blue-100 transition-all"
              />
            </div>
          ))}
          <div className="sm:col-span-2 space-y-1.5">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wide block">Address</label>
            <input
              type="text"
              value={contact.address}
              onChange={e => setContact(c => ({ ...c, address: e.target.value }))}
              placeholder="Canada · New Zealand · India"
              className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm bg-slate-50 focus:outline-none focus:border-[#0057FF] focus:bg-white focus:ring-2 focus:ring-blue-100 transition-all"
            />
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <button onClick={saveContact} disabled={saving === 'contact'} className="px-5 py-2.5 rounded-xl bg-[#0057FF] text-white text-sm font-bold hover:bg-blue-600 flex items-center gap-2 disabled:opacity-60 shadow-sm shadow-blue-500/20">
            {saving === 'contact' ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            Save Contact Info
          </button>
        </div>
      </section>

      {/* Social Links */}
      <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-5">
        <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
          <div className="w-9 h-9 rounded-xl bg-blue-50 text-[#0057FF] flex items-center justify-center">
            <Linkedin className="w-4.5 h-4.5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-900">Social Media Links</h2>
            <p className="text-xs text-slate-500">Displayed in the footer. Leave blank to hide.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {[
            { key: 'linkedin', label: 'LinkedIn URL', placeholder: 'https://linkedin.com/company/...' },
            { key: 'instagram', label: 'Instagram URL', placeholder: 'https://instagram.com/...' },
            { key: 'facebook', label: 'Facebook URL', placeholder: 'https://facebook.com/...' },
            { key: 'youtube', label: 'YouTube URL', placeholder: 'https://youtube.com/@...' },
          ].map(field => (
            <div key={field.key} className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wide block">{field.label}</label>
              <input
                type="url"
                value={(social as any)[field.key]}
                onChange={e => setSocial(s => ({ ...s, [field.key]: e.target.value }))}
                placeholder={field.placeholder}
                className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm bg-slate-50 focus:outline-none focus:border-[#0057FF] focus:bg-white focus:ring-2 focus:ring-blue-100 transition-all"
              />
            </div>
          ))}
        </div>

        <div className="flex justify-end pt-2">
          <button onClick={saveSocial} disabled={saving === 'social'} className="px-5 py-2.5 rounded-xl bg-[#0057FF] text-white text-sm font-bold hover:bg-blue-600 flex items-center gap-2 disabled:opacity-60">
            {saving === 'social' ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            Save Social Links
          </button>
        </div>
      </section>

      {/* Business Info */}
      <section className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-5">
        <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
          <div className="w-9 h-9 rounded-xl bg-blue-50 text-[#0057FF] flex items-center justify-center">
            <Building2 className="w-4.5 h-4.5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-900">Business Information</h2>
            <p className="text-xs text-slate-500">Company tagline and description used in SEO and footers.</p>
          </div>
        </div>

        <div className="space-y-5">
          {[
            { key: 'company_name', label: 'Company Name', placeholder: 'AG Vertex' },
            { key: 'tagline', label: 'Tagline / Headline', placeholder: 'Precision Mechanical Design & Engineering Partner' },
            { key: 'business_hours', label: 'Business Hours', placeholder: 'Monday – Friday, 9 AM – 5 PM EST' },
          ].map(field => (
            <div key={field.key} className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wide block">{field.label}</label>
              <input
                type="text"
                value={(business as any)[field.key]}
                onChange={e => setBusiness(b => ({ ...b, [field.key]: e.target.value }))}
                placeholder={field.placeholder}
                className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm bg-slate-50 focus:outline-none focus:border-[#0057FF] focus:bg-white focus:ring-2 focus:ring-blue-100 transition-all"
              />
            </div>
          ))}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wide block">Short Description</label>
            <textarea rows={3} value={business.short_description} onChange={e => setBusiness(b => ({ ...b, short_description: e.target.value }))} placeholder="Brief company description for SEO and meta tags" className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm bg-slate-50 focus:outline-none focus:border-[#0057FF] focus:bg-white focus:ring-2 focus:ring-blue-100 transition-all resize-y" />
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <button onClick={saveBusiness} disabled={saving === 'business'} className="px-5 py-2.5 rounded-xl bg-[#0057FF] text-white text-sm font-bold hover:bg-blue-600 flex items-center gap-2 disabled:opacity-60">
            {saving === 'business' ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            Save Business Info
          </button>
        </div>
      </section>
    </div>
  );
}
