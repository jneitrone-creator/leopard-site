import React, { useState, useEffect } from 'react';

export const LeftScrollProgress: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState<number>(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop || document.body.scrollTop;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const progress = windowHeight > 0 ? (totalScroll / windowHeight) * 100 : 0;
      setScrollProgress(Math.min(100, Math.max(0, progress)));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div 
      aria-hidden="true"
      className="fixed left-0 top-0 bottom-0 w-1 sm:w-1.5 z-50 bg-slate-950/60 pointer-events-none backdrop-blur-[1px]"
    >
      <div 
        className="w-full bg-gradient-to-b from-blue-500 via-cyan-400 to-emerald-400 shadow-[0_0_12px_rgba(59,130,246,0.8)] transition-all duration-100 ease-out rounded-r-sm"
        style={{ height: `${scrollProgress}%` }}
      />
    </div>
  );
};

