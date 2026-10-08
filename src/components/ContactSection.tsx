
import { useState } from 'react';
import { Mail, Phone, Globe, Share2, Send, MessageCircle } from 'lucide-react';
import { CONFIG } from '../config';
import { MacWindow } from './MacWindow';

const SocialIcon = ({ icon: Icon, href }: { icon: any, href: string }) => (
  <a 
    href={href} 
    target="_blank" 
    rel="noopener noreferrer"
    className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/40 hover:text-apple-blue hover:bg-apple-blue/10 hover:border-apple-blue/20 transition-all"
  >
    <Icon size={20} />
  </a>
);

export const ContactSection = () => {
  const [name, setName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Website Inquiry from ${name || 'Someone'}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${userEmail}\n\nMessage:\n${message}`);
    window.location.href = `mailto:${CONFIG.email}?subject=${subject}&body=${body}`;
  };

  return (
    <footer id="contact" className="py-32 px-4 bg-apple-grey-800/30">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          <div>
            <h2 className="text-5xl md:text-7xl font-extrabold mb-8 tracking-[-0.04em] leading-[0.9]">
              Let's Build
              <br />
              <span className="text-gradient">Something Legendary.</span>
            </h2>
            <p className="text-white text-lg mb-12 max-w-md">
              Direct founder access. Share your domain, deadline, and expected outcome. We will respond quickly by email.
            </p>

            <div className="space-y-6 mb-12">
              <a href={`mailto:${CONFIG.email}`} className="flex items-center gap-4 text-white hover:text-white transition-colors">
                <div className="w-10 h-10 rounded-full bg-apple-blue/10 flex items-center justify-center text-apple-blue">
                  <Mail size={20} />
                </div>
                {CONFIG.email}
              </a>
              <a href={`tel:${CONFIG.phone}`} className="flex items-center gap-4 text-white hover:text-white transition-colors">
                <div className="w-10 h-10 rounded-full bg-apple-blue/10 flex items-center justify-center text-apple-blue">
                  <Phone size={20} />
                </div>
                {CONFIG.phone}
              </a>
            </div>

            <div className="flex gap-4">
              <SocialIcon icon={MessageCircle} href={CONFIG.socials.instagram} />
              <SocialIcon icon={Globe} href={CONFIG.socials.linkedin} />
              <SocialIcon icon={Share2} href={CONFIG.socials.github} />
            </div>
          </div>

          <div>
            <MacWindow className="shadow-3xl" contentClassName="p-8 md:p-10">
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label className="block text-xs font-semibold text-white uppercase tracking-widest mb-2">Your Name</label>
                  <input type="text" required value={name} onChange={(e) => setName(e.target.value)} className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-3 focus:outline-none focus:ring-1 focus:ring-apple-blue" placeholder="Jane Doe" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-white uppercase tracking-widest mb-2">Email Address</label>
                  <input type="email" required value={userEmail} onChange={(e) => setUserEmail(e.target.value)} className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-3 focus:outline-none focus:ring-1 focus:ring-apple-blue" placeholder="jane@example.com" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-white uppercase tracking-widest mb-2">Message</label>
                  <textarea rows={4} required value={message} onChange={(e) => setMessage(e.target.value)} className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-3 focus:outline-none focus:ring-1 focus:ring-apple-blue resize-none" placeholder="How can we help you?"></textarea>
                </div>
                <button type="submit" className="w-full btn-primary flex items-center justify-center gap-2">
                  Send Message <Send size={18} />
                </button>
                <p className="text-center text-white/30 text-xs">This opens your email app to send to {CONFIG.email}</p>
              </form>
            </MacWindow>
          </div>
        </div>

        <div className="mt-32 pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between gap-8 text-white/30 text-xs">
          <div>
            <p>© {new Date().getFullYear()} {CONFIG.brandName}. All rights reserved.</p>
            <p className="mt-1 font-medium">Built for engineers, by engineers.</p>
          </div>
          <div className="flex gap-8">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Support</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
