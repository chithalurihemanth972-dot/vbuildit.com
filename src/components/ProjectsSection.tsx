import { motion } from 'framer-motion';
import { ArrowRight, Boxes, Clock3, BadgeCheck } from 'lucide-react';
import { PROJECTS, DOMAINS } from '../data/projects';

const domainName = (id: string) => DOMAINS.find((d) => d.id === id)?.name || id;

export const ProjectsSection = ({ onExplore }: { onExplore: () => void }) => {
  const featured = PROJECTS.slice(0, 12);
  return (
    <section id="projects" className="py-28 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-green-400/30 bg-green-400/10 text-sm font-bold text-white mb-5">
            <BadgeCheck size={16} className="text-green-400" /> Lowest Price Guaranteed — andarikante takkuva ke chestham
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-[-0.03em] text-white mb-4">Projects ({PROJECTS.length}+)</h2>
          <p className="text-white text-lg max-w-3xl mx-auto">
            Explore {DOMAINS.length} domains across software and hardware. Every project is customizable for your college — with clean code, report, PPT & viva prep at the lowest price.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {featured.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.06 }}
              whileHover={{ y: -6 }}
              className="glass-card p-6"
            >
              <div className="flex items-center gap-2 text-apple-blue text-xs uppercase tracking-[0.18em] font-bold mb-3">
                <Boxes size={13} /> {domainName(project.domainId)}
              </div>
              <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
              <p className="text-white mb-4 text-sm">{project.description}</p>
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-white/10 border border-white/15 text-white">
                <Clock3 size={12} /> {project.duration} · Lowest Price
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button
            onClick={onExplore}
            className="btn-primary inline-flex items-center gap-2"
          >
            Browse All Domains <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
};
