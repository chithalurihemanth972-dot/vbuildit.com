
import React from 'react';
import { cn } from '../lib/utils';

interface TrafficLightsProps {
  onClose?: () => void;
  className?: string;
}

export const TrafficLights: React.FC<TrafficLightsProps> = ({ onClose, className }) => {
  return (
    <div className={cn("flex gap-2 px-4 py-3 group/lights", className)}>
      <button 
        onClick={onClose}
        aria-label="Close window"
        className="w-3 h-3 rounded-full bg-[#FF5F57] flex items-center justify-center relative hover:after:content-['×'] after:text-[8px] after:text-black/55 after:font-bold"
      />
      <div className="w-3 h-3 rounded-full bg-[#FEBC2E] flex items-center justify-center relative hover:after:content-['−'] after:text-[8px] after:text-black/55 after:font-bold" />
      <div className="w-3 h-3 rounded-full bg-[#28C840] flex items-center justify-center relative hover:after:content-['+'] after:text-[8px] after:text-black/55 after:font-bold" />
    </div>
  );
};

interface MacWindowProps {
  children: React.ReactNode;
  title?: string;
  onClose?: () => void;
  className?: string;
  contentClassName?: string;
}

export const MacWindow: React.FC<MacWindowProps> = ({ children, title, onClose, className, contentClassName }) => {
  return (
    <div className={cn("mac-window flex flex-col w-full h-full relative", className)}>
      <div className="absolute inset-x-0 top-0 h-20 pointer-events-none bg-gradient-to-b from-white/[0.09] via-white/[0.03] to-transparent" />
      
      <div className="flex items-center h-11 border-b border-white/10 bg-gradient-to-b from-white/[0.06] to-white/[0.02] relative z-10">
        <TrafficLights onClose={onClose} />
        {title && (
          <div className="absolute left-1/2 -translate-x-1/2 text-[12px] font-semibold text-white/65 tracking-[0.01em]">
            {title}
          </div>
        )}
      </div>
      <div className={cn("flex-1 overflow-auto relative z-0", contentClassName)}>
        {children}
      </div>
    </div>
  );
};
