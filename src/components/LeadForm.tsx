
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Loader2, ChevronDown } from 'lucide-react';
import { submitLead } from '../lib/leads';
import { cn } from '../lib/utils';

interface LeadFormProps {
  project?: string;
  plan?: string;
  onSuccess?: () => void;
}

const BRANCHES = ['CSE', 'ECE', 'EEE', 'IT', 'Mech', 'Civil', 'AI&DS', 'Other'];
const YEARS = ['1st Year', '2nd Year', '3rd Year', 'Final Year'];

export const LeadForm: React.FC<LeadFormProps> = ({ project, plan, onSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    college: '',
    email: '',
    branch: '',
    year: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      await submitLead({
        ...formData,
        project,
        plan,
      });
      setSubmitted(true);
      if (onSuccess) {
        onSuccess();
      }
    } catch (err) {
      console.error(err);
      alert('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const inputClasses = "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-apple-blue/50 focus:border-apple-blue transition-all text-sm";
  const labelClasses = "block text-[11px] font-bold text-white/40 uppercase tracking-widest mb-1.5 ml-1";

  return (
    <div className="relative">
      <AnimatePresence mode="wait">
        {submitted && !onSuccess ? (
          <motion.div
            key="success"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="flex flex-col items-center justify-center py-12 text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', damping: 12, stiffness: 200 }}
              className="w-20 h-20 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mb-6"
            >
              <CheckCircle2 size={48} />
            </motion.div>
            <h3 className="text-2xl font-bold mb-2">Request Received!</h3>
            <p className="text-white/50 max-w-sm text-sm">
              Thanks! We've sent details to our team. Check your inbox — a message from VBuildIt team with price-range next steps is on its way.
            </p>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            onSubmit={handleSubmit}
            className="space-y-4"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className={labelClasses}>Full Name</label>
                <input
                  required
                  type="text"
                  placeholder="John Doe"
                  className={inputClasses}
                  value={formData.name}
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              <div>
                <label className={labelClasses}>Mobile Number</label>
                <input
                  required
                  type="tel"
                  pattern="[0-9]{10}"
                  placeholder="10-digit number"
                  className={inputClasses}
                  value={formData.mobile}
                  onChange={e => setFormData({ ...formData, mobile: e.target.value })}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className={labelClasses}>College Name</label>
                <input
                  required
                  type="text"
                  placeholder="University Name"
                  className={inputClasses}
                  value={formData.college}
                  onChange={e => setFormData({ ...formData, college: e.target.value })}
                />
              </div>
              <div>
                <label className={labelClasses}>Branch</label>
                <div className="relative">
                  <select
                    required
                    className={cn(inputClasses, "appearance-none")}
                    value={formData.branch}
                    onChange={e => setFormData({ ...formData, branch: e.target.value })}
                  >
                    <option value="" disabled className="bg-[#1c1c24]">Select Branch</option>
                    {BRANCHES.map(b => (
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
                <input
                  required
                  type="email"
                  placeholder="john@example.com"
                  className={inputClasses}
                  value={formData.email}
                  onChange={e => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
              <div>
                <label className={labelClasses}>Academic Year</label>
                <div className="relative">
                  <select
                    required
                    className={cn(inputClasses, "appearance-none")}
                    value={formData.year}
                    onChange={e => setFormData({ ...formData, year: e.target.value })}
                  >
                    <option value="" disabled className="bg-[#1c1c24]">Select Year</option>
                    {YEARS.map(y => (
                      <option key={y} value={y} className="bg-[#1c1c24]">{y}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 pointer-events-none" size={18} />
                </div>
              </div>
            </div>

            <div className="pt-4">
              <button
                disabled={loading}
                type="submit"
                className="w-full btn-primary py-4 flex items-center justify-center gap-2 text-sm uppercase tracking-widest font-bold"
              >
                {loading ? (
                  <>
                    <Loader2 size={18} className="animate-spin" /> Verifying...
                  </>
                ) : (
                  project ? "Submit Request" : "Unlock Domains"
                )}
              </button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
};
