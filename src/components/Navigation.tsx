
import React from 'react';
import { motion } from 'framer-motion';
import { Home, Briefcase, Mail, Phone, Sparkles } from 'lucide-react';
import { CONFIG } from '../config';
import { NavLink } from 'react-router-dom';

const DOCK_ITEMS = [
  { icon: Home, label: 'Home', href: '/' },
  { icon: Briefcase, label: 'Domains', href: '/domains' },
  { icon: Mail, label: 'Email', href: `mailto:${CONFIG.email}`, external: false },
  { icon: Phone, label: 'Contact', href: '/contact' },
];

export const Dock = () => {
  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[90]">
      <motion.div 
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="glass rounded-[22px] px-3 py-2.5 flex items-end gap-1.5 border border-white/20 shadow-[0_20px_38px_-24px_rgba(0,0,0,0.9)]"
      >
        {DOCK_ITEMS.map((item) => (
          <a key={item.label} href={item.href} className="group relative">
            <motion.div
              whileHover={{ 
                scale: 1.26,
                y: -12,
                transition: { type: 'spring', stiffness: 330, damping: 18 }
              }}
              className="w-12 h-12 rounded-[14px] flex items-center justify-center hover:bg-white/10 transition-colors relative"
            >
              <item.icon size={22} className="text-white group-hover:text-white" />
            </motion.div>
            <div className="absolute -top-11 left-1/2 -translate-x-1/2 px-2.5 py-1 bg-black/80 backdrop-blur-md rounded-md text-[11px] font-semibold opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap border border-white/10 text-white">
              {item.label}
            </div>
          </a>
        ))}
      </motion.div>
    </div>
  );
};

export const Navbar = () => {
  const [time, setTime] = React.useState(new Date());

  React.useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  return (
    <nav className="fixed top-0 left-0 w-full h-8 glass z-[80] flex items-center justify-between px-4 text-[13px] font-medium text-white border-b border-white/10">
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2 font-bold tracking-tight">
          <Sparkles size={13} className="text-apple-blue" />
          VBuildIt
        </div>
        <div className="hidden md:flex items-center gap-6">
          <NavLink to="/" className="text-white hover:bg-white/10 px-2 py-0.5 rounded transition-colors">Home</NavLink>
          <NavLink to="/projects" className="text-white hover:bg-white/10 px-2 py-0.5 rounded transition-colors">Projects</NavLink>
          <NavLink to="/domains" className="text-white hover:bg-white/10 px-2 py-0.5 rounded transition-colors">Domains</NavLink>
          <NavLink to="/testimonials" className="text-white hover:bg-white/10 px-2 py-0.5 rounded transition-colors">Testimonials</NavLink>
          <NavLink to="/contact" className="text-white hover:bg-white/10 px-2 py-0.5 rounded transition-colors">Contact</NavLink>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div className="hidden sm:block text-white">
          {time.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
        </div>
        <div className="font-semibold">
          {time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })}
        </div>
      </div>
    </nav>
  );
};
