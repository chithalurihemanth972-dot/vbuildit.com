
import { motion, useMotionTemplate, useMotionValue, useSpring } from 'framer-motion';
import { Hero3D } from './Hero3D';
import { CONFIG } from '../config';
import { ChevronRight, Mail, Sparkles } from 'lucide-react';

export const Hero = ({ onExplore }: { onExplore: () => void }) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const glowX = useSpring(mouseX, { stiffness: 120, damping: 20 });
  const glowY = useSpring(mouseY, { stiffness: 120, damping: 20 });

  const glowMask = useMotionTemplate`radial-gradient(320px at ${glowX}px ${glowY}px, rgba(10, 132, 255, 0.22), transparent 70%)`;

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center pt-24 px-4 overflow-hidden"
      onMouseMove={(event) => {
        const bounds = event.currentTarget.getBoundingClientRect();
        mouseX.set(event.clientX - bounds.left);
        mouseY.set(event.clientY - bounds.top);
      }}
    >
      <Hero3D />

      <div className="gradient-orb top-[-10%] left-[-10%] bg-apple-blue" />
      <div className="gradient-orb bottom-[-10%] right-[-10%] bg-apple-violet" />
      <motion.div style={{ background: glowMask }} className="absolute inset-0 pointer-events-none z-[1]" />

      <div className="relative z-10 text-center max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, ease: 'easeOut' }}
        >
          <p className="text-white text-[11px] md:text-xs uppercase tracking-[0.32em] mb-6">VBuildIt</p>

          <h1 className="text-5xl md:text-8xl lg:text-[112px] font-extrabold tracking-[-0.055em] leading-[0.9] mb-6">
            Build the project
            <br />
            <span className="text-gradient">that gets you selected.</span>
          </h1>

          <p className="text-base md:text-xl text-white max-w-3xl mx-auto mb-10 leading-relaxed">
            Ultra-polished final-year software and hardware projects with clean architecture, viva-ready documents, and delivery in 1-2 weeks.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <motion.button
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={onExplore}
              className="btn-primary flex items-center gap-2 text-lg min-w-[220px] justify-center"
            >
              Explore Domains <ChevronRight size={20} />
            </motion.button>

            <motion.a
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.95 }}
              href={`mailto:${CONFIG.email}?subject=Project%20Inquiry%20-%20VBuildIt&body=Hi%20VBuildIt%20team%2C%0A%0A`}
              className="btn-secondary flex items-center gap-2 text-lg min-w-[220px] justify-center"
            >
              <Mail size={20} /> Email Us
            </motion.a>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.55 }}
            className="mt-8 inline-flex items-center gap-2 px-4 py-2 rounded-full border border-green-400/30 bg-green-400/10"
          >
            <Sparkles size={14} className="text-green-400" />
            <span className="text-sm font-bold text-white">Lowest Price Guaranteed · 500+ students · 50+ colleges · 4.9 rating</span>
          </motion.div>

          <p className="mt-5 text-sm font-semibold text-white">Andarikante takkuva price ke — most requested projects delivered in 1-2 weeks.</p>
        </motion.div>
      </div>

      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-20"
      >
        <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Scroll</span>
        <div className="w-px h-12 bg-gradient-to-b from-white to-transparent" />
      </motion.div>
    </section>
  );
};
