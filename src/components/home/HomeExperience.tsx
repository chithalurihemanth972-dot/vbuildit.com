import { motion } from 'framer-motion';
import { ArrowRight, Boxes, CheckCheck, Clock3, ShieldCheck, Sparkles, Zap } from 'lucide-react';
import { useState } from 'react';
import type { ComponentType } from 'react';

type ReactiveCardProps = {
  title: string;
  copy: string;
  icon: ComponentType<{ size?: number; className?: string }>;
};

const ReactiveCard = ({ title, copy, icon: Icon }: ReactiveCardProps) => {
  const [spotlight, setSpotlight] = useState({ x: 50, y: 50 });

  return (
    <motion.div
      whileHover={{ y: -6 }}
      onMouseMove={(event) => {
        const bounds = event.currentTarget.getBoundingClientRect();
        setSpotlight({
          x: ((event.clientX - bounds.left) / bounds.width) * 100,
          y: ((event.clientY - bounds.top) / bounds.height) * 100,
        });
      }}
      className="glass-card relative overflow-hidden p-6"
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: `radial-gradient(circle at ${spotlight.x}% ${spotlight.y}%, rgba(100,210,255,0.18), transparent 45%)`,
        }}
      />
      <div className="relative z-10">
        <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl border border-white/15 bg-white/8 text-apple-blue">
          <Icon size={20} />
        </div>
        <h3 className="mb-2 text-xl font-bold text-white">{title}</h3>
        <p className="text-white">{copy}</p>
      </div>
    </motion.div>
  );
};

export const HomeExperience = ({ onExplore }: { onExplore: () => void }) => {
  return (
    <div className="space-y-28 pb-28">
      <section className="px-4">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <h2 className="text-4xl font-extrabold tracking-[-0.03em] text-white md:text-5xl">A Better Final-Year Experience</h2>
            <p className="mx-auto mt-3 max-w-3xl text-white">
              Scroll through a premium journey built to convert students into confident project presenters.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            <ReactiveCard
              icon={Boxes}
              title="Curated Catalog"
              copy="Discover high-demand software and hardware projects picked for practical scores and placement value."
            />
            <ReactiveCard
              icon={Clock3}
              title="Delivery in 1-2 Weeks"
              copy="Most project kits are delivered quickly with source code, report, PPT, and deployment support."
            />
            <ReactiveCard
              icon={ShieldCheck}
              title="Viva-Ready Structure"
              copy="Every project follows clean modular architecture so students can explain confidently in viva."
            />
          </div>
        </div>
      </section>

      <section className="px-4">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="glass-card p-8 md:p-10">
            <p className="mb-3 text-xs uppercase tracking-[0.25em] text-apple-blue">Timeline</p>
            <h3 className="text-3xl font-extrabold tracking-[-0.02em] text-white md:text-4xl">What happens after you request?</h3>
            <div className="mt-8 space-y-4">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-sm font-bold uppercase tracking-[0.18em] text-apple-blue">Day 1-2</p>
                <p className="mt-1 text-white">Domain confirmation, scope freeze, and success checklist shared by email.</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-sm font-bold uppercase tracking-[0.18em] text-apple-blue">Week 1</p>
                <p className="mt-1 text-white">Core implementation with milestones and review screenshots.</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <p className="text-sm font-bold uppercase tracking-[0.18em] text-apple-blue">Week 2</p>
                <p className="mt-1 text-white">Final delivery with code, report, PPT, and viva prep handoff.</p>
              </div>
            </div>
          </div>

          <div className="glass-card p-8 md:p-10">
            <p className="mb-3 text-xs uppercase tracking-[0.25em] text-apple-blue">Included</p>
            <h3 className="text-3xl font-extrabold tracking-[-0.02em] text-white md:text-4xl">Everything needed to submit strong</h3>
            <div className="mt-8 space-y-3">
              {['Source Code', 'Project Report', 'PPT Deck', 'Architecture Diagram', 'Demo Support', 'Viva Questions'].map((item) => (
                <div key={item} className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-3">
                  <CheckCheck size={17} className="text-apple-blue" />
                  <span className="text-white">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-4">
        <div className="mx-auto max-w-6xl">
          <motion.div
            whileHover={{ scale: 1.01 }}
            className="glass-card relative overflow-hidden p-8 text-center md:p-12"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-apple-blue/18 via-transparent to-apple-violet/18" />
            <div className="relative z-10">
              <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs uppercase tracking-[0.2em] text-white">
                <Zap size={12} className="text-apple-blue" /> Limited Seats
              </p>
              <h3 className="text-3xl font-extrabold tracking-[-0.03em] text-white md:text-5xl">Lock your slot before this semester fills up</h3>
              <p className="mx-auto mt-4 max-w-2xl text-white">
                Join students who want premium quality and fast delivery. Start by exploring domains and requesting your project.
              </p>
              <div className="mt-8 flex justify-center">
                <button onClick={onExplore} className="btn-primary inline-flex items-center gap-2">
                  Explore Domains <ArrowRight size={18} />
                </button>
              </div>
              <p className="mt-5 inline-flex items-center gap-2 text-sm text-white">
                <Sparkles size={14} className="text-apple-blue" /> 1-2 week delivery for most projects
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};
