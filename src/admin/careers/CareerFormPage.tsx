import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { careersApi, CareerInsert } from '../../lib/api/careers';
import { toast } from '../components/Toast';
import { ArrowLeft, Loader2, Save, Globe, Plus, X } from 'lucide-react';

const EMPTY: CareerInsert = {
  title: '',
  department: '',
  location: 'Canada · New Zealand · India',
  employment_type: 'Project-Based',
  experience_required: '',
  description: '',
  responsibilities: [],
  requirements: [],
  skills: [],
  application_email: 'agvertexdesign@gmail.com',
  closing_date: null,
  status: 'draft',
};

function ArrayEditor({ label, items, onChange }: { label: string; items: string[]; onChange: (v: string[]) => void }) {
  const [input, setInput] = useState('');
  const add = () => {
    if (!input.trim()) return;
    onChange([...items, input.trim()]);
    setInput('');
  };
  const remove = (i: number) => onChange(items.filter((_, idx) => idx !== i));
  return (
    <div className="space-y-2">
      <label className="text-xs font-bold text-slate-700 uppercase tracking-wide block">{label}</label>
      <div className="flex gap-2">
        <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && (e.preventDefault(), add())} placeholder="Type and press Enter or Add" className="flex-1 px-4 py-2.5 rounded-xl border border-slate-300 text-sm bg-slate-50 focus:outline-none focus:border-[#0057FF] focus:bg-white focus:ring-2 focus:ring-blue-100 transition-all" />
        <button type="button" onClick={add} className="px-3 py-2.5 rounded-xl bg-[#0057FF] text-white text-sm font-bold hover:bg-blue-600"><Plus className="w-4 h-4" /></button>
      </div>
      {items.length > 0 && (
        <div className="flex flex-wrap gap-2 pt-1">
          {items.map((item, i) => (
            <span key={i} className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-medium">
              {item}
              <button type="button" onClick={() => remove(i)} className="text-slate-400 hover:text-red-500"><X className="w-3 h-3" /></button>
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

export function CareerFormPage() {
  const { id } = useParams<{ id: string }>();
  const isEdit = Boolean(id && id !== 'new');
  const navigate = useNavigate();
  const [form, setForm] = useState<CareerInsert>(EMPTY);
  const [loading, setLoading] = useState(isEdit);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (isEdit && id) {
      careersApi.getById(id).then(data => {
        if (data) {
          const { id: _id, created_at, updated_at, ...rest } = data as any;
          setForm(rest);
        }
        setLoading(false);
      });
    }
  }, [id, isEdit]);

  const set = (key: keyof CareerInsert, value: any) => setForm(f => ({ ...f, [key]: value }));

  const handleSave = async (status: 'draft' | 'published') => {
    if (!form.title.trim()) { toast.error('Job title is required.'); return; }
    setSaving(true);
    try {
      const payload = { ...form, status };
      if (isEdit && id) {
        await careersApi.update(id, payload);
      } else {
        await careersApi.create(payload);
      }
      toast.success(status === 'published' ? 'Listing published.' : 'Draft saved.');
      navigate('/admin/careers');
    } catch (e: any) {
      toast.error('Save failed: ' + e.message);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="flex items-center justify-center h-64"><Loader2 className="w-6 h-6 animate-spin text-[#0057FF]" /></div>;

  return (
    <div className="space-y-6 max-w-3xl">
      <div className="flex items-center gap-4">
        <button onClick={() => navigate('/admin/careers')} className="w-9 h-9 rounded-xl bg-white border border-slate-200 text-slate-600 flex items-center justify-center hover:bg-slate-50">
          <ArrowLeft className="w-4 h-4" />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-slate-900">{isEdit ? 'Edit Listing' : 'Add Career Listing'}</h1>
          <p className="text-sm text-slate-500 mt-0.5">Published listings appear on the Careers page.</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-sm">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="sm:col-span-2 space-y-1.5">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wide block">Job Title *</label>
            <input type="text" value={form.title} onChange={e => set('title', e.target.value)} placeholder="e.g. Senior CAD Designer" className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm bg-slate-50 focus:outline-none focus:border-[#0057FF] focus:bg-white focus:ring-2 focus:ring-blue-100 transition-all" />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wide block">Department</label>
            <input type="text" value={form.department} onChange={e => set('department', e.target.value)} placeholder="e.g. Tooling Engineering" className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm bg-slate-50 focus:outline-none focus:border-[#0057FF] focus:bg-white focus:ring-2 focus:ring-blue-100 transition-all" />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wide block">Employment Type</label>
            <select value={form.employment_type} onChange={e => set('employment_type', e.target.value)} className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm bg-slate-50 focus:outline-none focus:border-[#0057FF] focus:bg-white focus:ring-2 focus:ring-blue-100 transition-all">
              <option>Project-Based</option>
              <option>Full-Time</option>
              <option>Part-Time</option>
              <option>Contract</option>
              <option>Remote</option>
            </select>
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wide block">Location</label>
            <input type="text" value={form.location} onChange={e => set('location', e.target.value)} className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm bg-slate-50 focus:outline-none focus:border-[#0057FF] focus:bg-white focus:ring-2 focus:ring-blue-100 transition-all" />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wide block">Experience Required</label>
            <input type="text" value={form.experience_required} onChange={e => set('experience_required', e.target.value)} placeholder="e.g. 5+ Years" className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm bg-slate-50 focus:outline-none focus:border-[#0057FF] focus:bg-white focus:ring-2 focus:ring-blue-100 transition-all" />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-bold text-slate-700 uppercase tracking-wide block">Job Description</label>
          <textarea rows={5} value={form.description} onChange={e => set('description', e.target.value)} placeholder="Overview of the role and responsibilities" className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm bg-slate-50 focus:outline-none focus:border-[#0057FF] focus:bg-white focus:ring-2 focus:ring-blue-100 transition-all resize-y" />
        </div>

        <ArrayEditor label="Key Responsibilities" items={form.responsibilities} onChange={v => set('responsibilities', v)} />
        <ArrayEditor label="Requirements" items={form.requirements} onChange={v => set('requirements', v)} />
        <ArrayEditor label="Skills & Tools" items={form.skills} onChange={v => set('skills', v)} />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wide block">Application Email</label>
            <input type="email" value={form.application_email} onChange={e => set('application_email', e.target.value)} className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm bg-slate-50 focus:outline-none focus:border-[#0057FF] focus:bg-white focus:ring-2 focus:ring-blue-100 transition-all" />
          </div>
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700 uppercase tracking-wide block">Closing Date (Optional)</label>
            <input type="date" value={form.closing_date || ''} onChange={e => set('closing_date', e.target.value || null)} className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm bg-slate-50 focus:outline-none focus:border-[#0057FF] focus:bg-white focus:ring-2 focus:ring-blue-100 transition-all" />
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-3">
        <button onClick={() => handleSave('draft')} disabled={saving} className="w-full sm:w-auto px-6 py-3 rounded-xl border border-slate-300 text-sm font-bold text-slate-700 bg-white hover:bg-slate-50 flex items-center justify-center gap-2 disabled:opacity-50">
          {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}Save as Draft
        </button>
        <button onClick={() => handleSave('published')} disabled={saving} className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#0057FF] text-white text-sm font-bold hover:bg-blue-600 flex items-center justify-center gap-2 disabled:opacity-50 shadow-md shadow-blue-500/20">
          {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Globe className="w-4 h-4" />}Publish Listing
        </button>
        <button onClick={() => navigate('/admin/careers')} className="w-full sm:w-auto px-6 py-3 rounded-xl text-sm font-semibold text-slate-500 hover:text-slate-700">Cancel</button>
      </div>
    </div>
  );
}
