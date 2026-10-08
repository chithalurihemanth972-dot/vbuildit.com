
import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ChevronLeft, ChevronRight, Zap, Clock, Code2, ShieldCheck, Lightbulb } from 'lucide-react';
import { DOMAINS, PROJECTS } from '../data/projects';
import { MacWindow } from './MacWindow';
import { cn } from '../lib/utils';
import { LeadForm } from './LeadForm';
import { IdeaForm } from './IdeaForm';

interface DomainsModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialProjectId?: number | null;
}

export const DomainsModal: React.FC<DomainsModalProps> = ({ isOpen, onClose, initialProjectId }) => {
  const [selectedDomain, setSelectedDomain] = useState(DOMAINS[0].id);
  const [searchQuery, setSearchQuery] = useState('');
  const [requestProject, setRequestProject] = useState<typeof PROJECTS[0] | null>(null);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [showIdea, setShowIdea] = useState(false);

  React.useEffect(() => {
    if (initialProjectId) {
      const p = PROJECTS.find(proj => proj.id === initialProjectId);
      if (p) {
        setSelectedDomain(p.domainId);
        setRequestProject(p);
      }
    }
  }, [initialProjectId]);

  const filteredProjects = useMemo(() => {
    return PROJECTS.filter(p => 
      p.domainId === selectedDomain && 
      (p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
       p.description.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  }, [selectedDomain, searchQuery]);

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
    >
      <div className="absolute inset-0 bg-black/70 backdrop-blur-md" onClick={onClose} />
      
      <motion.div
        initial={{ scale: 0.94, opacity: 0, rotateX: -6 }}
        animate={{ scale: 1, opacity: 1, rotateX: 0 }}
        exit={{ scale: 0.95, opacity: 0, rotateX: -4 }}
        transition={{ type: 'spring', stiffness: 260, damping: 22 }}
        className="relative w-full max-w-6xl h-[85vh] z-10 will-change-transform"
        style={{ perspective: 1800 }}
      >
        <MacWindow 
          onClose={onClose} 
          title={!isUnlocked ? "VBuildIt — Identity Verification" : requestProject ? "Project Submission" : "Finder — Engineering Projects"}
        >
          {!isUnlocked ? (
            <div className="h-full flex flex-col items-center justify-center p-6 md:p-12 max-w-xl mx-auto">
              <div className="text-center mb-10">
                <div className="w-16 h-16 bg-apple-blue/10 rounded-2xl flex items-center justify-center mx-auto mb-4 text-apple-blue shadow-[0_0_32px_rgba(10,132,255,0.28)]">
                  <ShieldCheck size={32} />
                </div>
                <h2 className="text-2xl font-bold mb-2">Unlock Project Domains</h2>
                <p className="text-sm text-white/50">Enter your details to browse our exclusive hardware and software project catalog.</p>
              </div>
              <LeadForm onSuccess={() => setIsUnlocked(true)} />
            </div>
          ) : (
            <div className="flex flex-col md:flex-row h-full">
              {/* Sidebar */}
              {!requestProject && (
                <div className="w-full md:w-64 border-b md:border-b-0 md:border-r border-white/10 bg-gradient-to-b from-white/[0.06] to-white/[0.02] p-3 space-y-6">
                  <div>
                    <h3 className="text-[11px] font-bold text-white/30 uppercase tracking-[0.2em] mb-4 ml-3">Software</h3>
                    <div className="space-y-0.5">
                      {DOMAINS.filter(d => d.category === 'Software').map((domain) => (
                        <button
                          key={domain.id}
                          onClick={() => setSelectedDomain(domain.id)}
                          className={cn(
                            "mac-sidebar-item w-full group",
                            selectedDomain === domain.id ? "mac-sidebar-active text-white" : "text-white/60 hover:bg-white/5"
                          )}
                        >
                          <domain.icon size={15} className={cn(selectedDomain === domain.id ? "text-apple-blue" : "text-white/40")} />
                          <span className="font-medium">{domain.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-[11px] font-bold text-white/30 uppercase tracking-[0.2em] mb-4 ml-3">Hardware</h3>
                    <div className="space-y-0.5">
                      {DOMAINS.filter(d => d.category === 'Hardware').map((domain) => (
                        <button
                          key={domain.id}
                          onClick={() => setSelectedDomain(domain.id)}
                          className={cn(
                            "mac-sidebar-item w-full group",
                            selectedDomain === domain.id ? "mac-sidebar-active text-white" : "text-white/60 hover:bg-white/5"
                          )}
                        >
                          <domain.icon size={15} className={cn(selectedDomain === domain.id ? "text-apple-blue" : "text-white/40")} />
                          <span className="font-medium">{domain.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                  {/* Have an Idea CTA */}
                  <button
                    onClick={() => { setShowIdea(true); setRequestProject(null); }}
                    className="w-full text-left rounded-xl border border-yellow-400/30 bg-yellow-400/10 p-4 hover:bg-yellow-400/20 transition-all"
                  >
                    <div className="flex items-center gap-2 text-yellow-400 mb-1">
                      <Lightbulb size={16} />
                      <span className="text-sm font-extrabold">Have an Idea?</span>
                    </div>
                    <span className="inline-block mt-1 px-3 py-1.5 rounded-lg bg-yellow-400 text-black text-xs font-bold uppercase tracking-wider">
                      We Build It
                    </span>
                  </button>
                </div>
              )}

              {/* Main Content */}
              <div className="flex-1 flex flex-col min-h-0 bg-gradient-to-b from-[#0f1017]/75 to-[#0b0c12]/85">
                <AnimatePresence mode="wait">
                  {showIdea ? (
                    <motion.div
                      key="idea-form-view"
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.98 }}
                      className="flex-1 p-6 md:p-12 overflow-auto"
                    >
                      <button
                        onClick={() => setShowIdea(false)}
                        className="flex items-center gap-2 text-[13px] font-medium text-apple-blue hover:text-white transition-colors mb-8"
                      >
                        <ChevronLeft size={16} /> Back to Projects
                      </button>
                      <div className="max-w-xl mx-auto">
                        <IdeaForm />
                      </div>
                    </motion.div>
                  ) : requestProject ? (
                    <motion.div
                      key="lead-form-final"
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.98 }}
                      className="flex-1 p-6 md:p-12 overflow-auto"
                    >
                      <button 
                        onClick={() => setRequestProject(null)}
                        className="flex items-center gap-2 text-[13px] font-medium text-apple-blue hover:text-white transition-colors mb-8"
                      >
                        <ChevronLeft size={16} /> Back to Projects
                      </button>
                      <div className="max-w-2xl mx-auto">
                        <div className="mb-8 p-6 glass-card border-apple-blue/20 bg-apple-blue/5">
                          <h2 className="text-xl font-bold mb-4">Requesting Project</h2>
                          <div className="flex flex-wrap gap-2">
                            <span className="px-3 py-1 bg-apple-blue/20 text-apple-blue rounded-md text-[11px] font-bold uppercase tracking-wider border border-apple-blue/20">
                              {requestProject.title}
                            </span>
                            <span className="px-3 py-1 bg-white/5 text-white/60 rounded-md text-[11px] font-bold uppercase tracking-wider border border-white/10">
                              {DOMAINS.find(d => d.id === requestProject.domainId)?.name}
                            </span>
                          </div>
                        </div>
                        <LeadForm 
                          project={requestProject.title} 
                          onSuccess={() => {
                            setTimeout(() => {
                              setRequestProject(null);
                              onClose();
                            }, 3000);
                          }}
                        />
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="project-list-final"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex-1 flex flex-col min-h-0"
                    >
                      {/* Toolbar */}
                      <div className="h-14 border-b border-white/10 flex items-center justify-between px-6 bg-white/[0.03]">
                        <div className="flex items-center gap-4">
                          <div className="flex gap-2">
                            <button className="p-1 rounded-md hover:bg-white/5 text-white/20"><ChevronLeft size={18} /></button>
                            <button className="p-1 rounded-md hover:bg-white/5 text-white/20"><ChevronRight size={18} /></button>
                          </div>
                          <span className="text-[13px] font-bold text-white/90">
                            {DOMAINS.find(d => d.id === selectedDomain)?.name}
                          </span>
                        </div>
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => { setShowIdea(true); setRequestProject(null); }}
                            className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-yellow-400 text-black text-[12px] font-bold hover:bg-yellow-300 transition-all"
                          >
                            <Lightbulb size={13} /> Have an Idea? We Build It
                          </button>
                          <div className="relative">
                            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 text-white/30" size={13} />
                            <input 
                              type="text"
                              placeholder="Search catalog..."
                              value={searchQuery}
                              onChange={(e) => setSearchQuery(e.target.value)}
                              className="bg-black/30 border border-white/10 rounded-md py-1.5 pl-8 pr-3 text-[12px] focus:outline-none focus:ring-1 focus:ring-apple-blue/50 w-48 md:w-64 transition-all"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Projects Grid */}
                      <div className="flex-1 overflow-auto p-6 scroll-smooth">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                          {filteredProjects.map((project) => (
                            <motion.div
                              key={project.id}
                              whileHover={{ y: -4 }}
                              className="glass-card p-5 flex flex-col gap-4 group border-white/5 hover:border-apple-blue/30"
                            >
                              <div className="flex items-start justify-between">
                                {project.trending && (
                                  <span className="flex items-center gap-1 text-[9px] font-black text-orange-400 uppercase tracking-[0.15em] bg-orange-400/10 px-2 py-0.5 rounded-sm">
                                    <Zap size={9} fill="currentColor" /> Trending
                                  </span>
                                )}
                                <span className={cn(
                                  "text-[9px] font-black uppercase tracking-[0.15em] px-2 py-0.5 rounded-sm ml-auto",
                                  project.difficulty === 'Advanced' ? 'text-red-400 bg-red-400/10' :
                                  project.difficulty === 'Intermediate' ? 'text-apple-blue bg-apple-blue/10' : 'text-green-400 bg-green-400/10'
                                )}>
                                  {project.difficulty}
                                </span>
                              </div>
                              <div>
                                <h4 className="text-[15px] font-bold mb-2 group-hover:text-apple-blue transition-colors leading-tight">{project.title}</h4>
                                <p className="text-[12px] text-white/40 line-clamp-2 leading-relaxed">{project.description}</p>
                              </div>
                              <div className="flex flex-wrap gap-1.5 mt-auto">
                                {project.tech.map(t => (
                                  <span key={t} className="text-[9px] px-2 py-0.5 bg-white/5 rounded-sm border border-white/5 text-white/50 uppercase font-bold tracking-wider">{t}</span>
                                ))}
                              </div>
                              <div className="pt-4 border-t border-white/5 flex flex-col gap-3">
                                <div className="flex items-center justify-between text-[10px] font-bold text-white/30 uppercase tracking-widest">
                                  <span className="flex items-center gap-1.5"><Clock size={10} /> {project.duration}</span>
                                  <span className="flex items-center gap-1.5 text-apple-blue/60"><Code2 size={10} /> Full Support</span>
                                </div>
                                <button 
                                  onClick={() => { setShowIdea(false); setRequestProject(project); }}
                                  className="w-full py-2 bg-apple-blue text-white text-[12px] font-bold rounded-md transition-all active:scale-[0.97] shadow-lg shadow-apple-blue/20"
                                >
                                  Request Project
                                </button>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                        {/* Have an Idea banner inside Finder */}
                        <button
                          onClick={() => { setShowIdea(true); setRequestProject(null); }}
                          className="w-full mt-6 rounded-xl border border-yellow-400/30 bg-yellow-400/10 p-5 flex flex-col sm:flex-row items-center justify-between gap-3 hover:bg-yellow-400/20 transition-all text-left"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-yellow-400/20 flex items-center justify-center text-yellow-400">
                              <Lightbulb size={20} />
                            </div>
                            <div>
                              <p className="text-base font-extrabold text-white">Have an Idea?</p>
                              <p className="text-xs text-white/50">Mana list lo ledu? Mee own project cheppandi.</p>
                            </div>
                          </div>
                          <span className="px-4 py-2 rounded-lg bg-yellow-400 text-black text-xs font-bold uppercase tracking-wider whitespace-nowrap">
                            We Build It
                          </span>
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          )}
        </MacWindow>
      </motion.div>
    </motion.div>
  );
};
