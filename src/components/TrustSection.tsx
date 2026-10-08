
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, MessageSquare, ShieldCheck, GraduationCap } from 'lucide-react';
import { TESTIMONIALS, FAQS } from '../data/testimonials';
import { MacWindow } from './MacWindow';
import { cn } from '../lib/utils';

const Step = ({ icon: Icon, title, desc, index }: { icon: any, title: string, desc: string, index: number }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.1 }}
    className="flex flex-col items-center text-center p-6"
  >
    <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 text-apple-blue shadow-xl">
      <Icon size={32} />
    </div>
    <h3 className="text-xl font-bold mb-2">{title}</h3>
    <p className="text-sm text-white leading-relaxed">{desc}</p>
  </motion.div>
);

export const TrustSection = ({ onReserve }: { onReserve: () => void }) => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <section id="trust" className="py-32 px-4 space-y-40">
      {/* How it works */}
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">The Workflow</h2>
          <p className="text-white">From engineering concept to final submission in 1-2 weeks.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <Step index={0} icon={GraduationCap} title="Select Concept" desc="Browse our verified hardware and software domain catalog." />
          <Step index={1} icon={MessageSquare} title="Connect" desc="Submit your interest and our team contacts you via email quickly." />
          <Step index={2} icon={ShieldCheck} title="Deliver" desc="Receive full source code, hardware diagrams, and professional documentation in 1-2 weeks." />
        </div>
      </div>

      {/* Testimonials */}
      <div id="testimonials" className="max-w-7xl mx-auto overflow-hidden">
        <div className="text-center mb-20">
          <h2 className="text-4xl font-bold mb-4">Student Success Stories</h2>
          <p className="text-white">Real reviews from students across top engineering colleges. Most projects are delivered in 1-2 weeks.</p>
        </div>
        <div className="flex flex-wrap justify-center gap-6">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass-card p-6 w-full max-w-md"
            >
              <div className="bg-white/5 rounded-2xl p-4 mb-3">
                <p className="text-sm text-white leading-relaxed">"{t.text}"</p>
              </div>
              <div className="flex flex-col ml-1">
                <span className="text-xs font-bold text-white">{t.name}</span>
                <span className="text-[10px] text-white">{t.college}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* FAQ */}
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Got Questions?</h2>
          <p className="text-white">Everything you need to know about our project studio.</p>
        </div>
        <MacWindow className="border border-white/5 shadow-2xl">
          <div className="divide-y divide-white/5">
            {FAQS.map((faq, i) => (
              <div key={i} className="group">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-white/5 transition-colors"
                >
                  <span className="font-semibold text-white group-hover:text-white transition-colors">{faq.question}</span>
                  <ChevronDown className={cn("text-white/30 transition-transform duration-300", openFaq === i ? "rotate-180" : "")} size={20} />
                </button>
                <AnimatePresence>
                  {openFaq === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="p-6 pt-0 text-sm text-white leading-relaxed">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </MacWindow>
      </div>

      {/* Urgency Bar */}
      <div className="max-w-5xl mx-auto px-4">
        <div className="glass-card p-8 md:p-12 relative overflow-hidden bg-gradient-to-br from-apple-blue/10 to-apple-violet/10">
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
               <h3 className="text-2xl font-bold mb-2 text-white">Limited Slots This Semester</h3>
               <p className="text-white mb-6">We only take 20 students per domain to ensure quality mentorship and 1-2 week delivery support.</p>
              <div className="flex items-center gap-4">
                <div className="flex-1 h-2 w-48 md:w-64 bg-white/10 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: '85%' }}
                    viewport={{ once: true }}
                    className="h-full bg-apple-blue"
                  />
                </div>
                <span className="text-xs font-bold text-apple-blue">17/20 Slots Filled</span>
              </div>
            </div>
            <button onClick={onReserve} className="btn-primary whitespace-nowrap">Reserve My Spot</button>
          </div>
        </div>
      </div>
    </section>
  );
};
