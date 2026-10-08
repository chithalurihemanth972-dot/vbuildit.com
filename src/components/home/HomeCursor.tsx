import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { Sparkles } from 'lucide-react';

export const HomeCursor = () => {
  const [enabled, setEnabled] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);

  const smoothX = useSpring(x, { stiffness: 340, damping: 28 });
  const smoothY = useSpring(y, { stiffness: 340, damping: 28 });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const canUseCustomCursor = window.matchMedia('(pointer: fine)').matches;
    setEnabled(canUseCustomCursor);

    if (!canUseCustomCursor) return;

    const onMove = (event: MouseEvent) => {
      x.set(event.clientX);
      y.set(event.clientY);
    };

    document.body.classList.add('home-cursor-active');
    window.addEventListener('mousemove', onMove);

    return () => {
      document.body.classList.remove('home-cursor-active');
      window.removeEventListener('mousemove', onMove);
    };
  }, [x, y]);

  if (!enabled) return null;

  return (
    <>
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[130] h-16 w-16 rounded-full border border-apple-blue/45 bg-apple-blue/10"
        style={{ x: smoothX, y: smoothY, translateX: '-50%', translateY: '-50%' }}
      />
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[131] flex h-8 w-8 items-center justify-center rounded-full bg-apple-blue text-white shadow-[0_0_20px_rgba(10,132,255,0.6)]"
        style={{ x: smoothX, y: smoothY, translateX: '-50%', translateY: '-50%' }}
      >
        <Sparkles size={14} />
      </motion.div>
    </>
  );
};
