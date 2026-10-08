import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Loader2, Lightbulb, ChevronDown } from 'lucide-react';
import { CONFIG } from '../config';
import { cn } from '../lib/utils';

const BRANCHES = ['CSE', 'ECE', 'EEE', 'IT', 'Mech', 'Civil', 'AI&DS', 'Other'];
const YEARS = ['1st Year', '2nd Year', '3rd Year', 'Final Year'];

export const IdeaForm: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  // SAME registration fields as LeadForm + idea
  const [form, setForm] = useState({
    name: '',
    mobile: '',
    college: '',
    email: '',
    branch: '',
    year: '',
    idea: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      // 1) Own SMTP: same-origin first (Vercel), then local backend (dev).
      // Owner-only mail to vbuildit8@gmail.com, no auto-reply.
      let ok = false;
      for (const url of ['/api/idea', 'http://localhost:3001/api/idea']) {
        try {
          const res = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(form),
          });
          const data = await res.json().catch(() => ({}));
          if (res.ok && data.ok === true) {
            ok = true;
            break;
          }
        } catch {
          // try next endpoint
        }
      }
      // 2) Fallback: FormSubmit to owner only (no _autoresponse)
      if (!ok) {
        await fetch(`https://formsubmit.co/ajax/${CONFIG.email}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({
            Name: form.name,
            Mobile: form.mobile,
            College: form.college,
            Email: form.email,
            Branch: form.branch,
            Year: form.year || '-',
            Idea: form.idea,
            Project: `Custom Idea: ${form.idea.slice(0, 80)}`,
            _subject: `New Custom Idea from ${form.name}`,
            _template: 'table',
            _captcha: 'false',
            _replyto: form.email,
          }),
        });
      }
      setSent(true);
    } catch (err) {
      console.error(err);
      alert('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const inputClasses =
    'w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-apple-blue/50 focus:border-apple-blue transition-all text-sm';
  const labelClasses = 'block text-[11px] font-bold text-white/40 uppercase tracking-widest mb-1.5 ml-1';

  return (
    <div className="relative">
      <AnimatePresence mode="wait">
        {sent ? (
          <motion.div
            key="idea-success"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="flex flex-col items-center justify-center py-10 text-center"
          >
            <div className="w-16 h-16 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mb-4">
              <CheckCircle2 size={36} />
            </div>
            <h3 className="text-xl font-bold mb-2">Idea Received!</h3>
            <p className="text-white/50 max-w-sm text-sm">
              Thanks {form.name || 'there'}! Our team will review your idea and contact you soon.
            </p>
          </motion.div>
        ) : (
          <motion.form key="idea-form" onSubmit={handleSubmit} className="space-y-4">
            <div className="text-center mb-2">
              <div className="w-12 h-12 bg-yellow-400/10 rounded-2xl flex items-center justify-center mx-auto mb-3 text-yellow-400">
                <Lightbulb size={24} />
              </div>
              <h3 className="text-xl font-extrabold">
                Have an <span className="text-gradient">Idea?</span>
              </h3>
              <p className="text-white/50 text-sm mt-1">
                Mana projects lo di kakunda meeku emaina project unte — same details ivvandi, we build it.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className={labelClasses}>Full Name</label>
                <input required type="text" placeholder="John Doe" className={inputClasses}
                  value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
              </div>
              <div>
                <label className={labelClasses}>Mobile Number</label>
                <input required type="tel" pattern="[0-9]{10}" placeholder="10-digit number" className={inputClasses}
                  value={form.mobile} onChange={(e) => setForm({ ...form, mobile: e.target.value })} />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className={labelClasses}>College Name</label>
                <input required type="text" placeholder="University Name" className={inputClasses}
                  value={form.college} onChange={(e) => setForm({ ...form, college: e.target.value })} />
              </div>
              <div>
                <label className={labelClasses}>Branch</label>
                <div className="relative">
                  <select required className={cn(inputClasses, 'appearance-none')}
                    value={form.branch} onChange={(e) => setForm({ ...form, branch: e.target.value })}>
                    <option value="" disabled className="bg-[#1c1c24]">Select Branch</option>
                    {BRANCHES.map((b) => (
                      <option key={b} value={b} className="bg-[#1c1c24]">{b}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 pointer-events-none" size={18} />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className={labelClasses}>Email ID</label>
                <input required type="email" placeholder="john@example.com" className={inputClasses}
                  value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
              </div>
              <div>
                <label className={labelClasses}>Academic Year</label>
                <div className="relative">
                  <select required className={cn(inputClasses, 'appearance-none')}
                    value={form.year} onChange={(e) => setForm({ ...form, year: e.target.value })}>
                    <option value="" disabled className="bg-[#1c1c24]">Select Year</option>
                    {YEARS.map((y) => (
                      <option key={y} value={y} className="bg-[#1c1c24]">{y}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 pointer-events-none" size={18} />
                </div>
              </div>
            </div>

            <div>
              <label className={labelClasses}>Your Project Idea</label>
              <textarea required rows={4} placeholder="Meeku em project kavalo 2-3 lines lo cheppandi..."
                className={`${inputClasses} resize-none`}
                value={form.idea} onChange={(e) => setForm({ ...form, idea: e.target.value })} />
            </div>

            <button disabled={loading} type="submit"
              className="w-full py-3 rounded-xl bg-yellow-400 text-black text-sm uppercase tracking-widest font-bold hover:bg-yellow-300 transition-all active:scale-[0.98] flex items-center justify-center gap-2">
              {loading ? (
                <><Loader2 size={18} className="animate-spin" /> Sending...</>
              ) : (
                'We Build It'
              )}
            </button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
};
