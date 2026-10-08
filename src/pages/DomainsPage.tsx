import { motion } from 'framer-motion';
import { ArrowRight, FolderSearch } from 'lucide-react';

export const DomainsPage = ({ onOpenDomains }: { onOpenDomains: () => void }) => {
  return (
    <section className="min-h-screen pt-32 pb-20 px-4">
      <div className="max-w-5xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="glass-card p-10 md:p-14"
        >
          <div className="w-16 h-16 rounded-2xl bg-apple-blue/15 border border-apple-blue/30 flex items-center justify-center mx-auto mb-6 text-apple-blue">
            <FolderSearch size={32} />
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-[-0.03em] text-white mb-4">Domains</h1>
          <p className="text-white text-lg max-w-2xl mx-auto mb-8">
            Browse software and hardware project domains, filter by interest, and request your project with a guided workflow.
          </p>
          <button onClick={onOpenDomains} className="btn-primary inline-flex items-center gap-2">
            Open Finder Browser <ArrowRight size={18} />
          </button>
          <p className="mt-4 text-sm text-white/40">
            Custom idea unda? Finder open chesi <span className="text-yellow-400 font-bold">Have an Idea? We Build It</span> nokkandi.
          </p>
        </motion.div>
      </div>
    </section>
  );
};
