import React, { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

export const ScrollDownIndicator: React.FC = () => {
  const [visible, setVisible] = useState<boolean>(true);

  useEffect(() => {
    const handleScroll = () => {
      // Distance from bottom of the document
      const scrollPosition = window.innerHeight + window.scrollY;
      const threshold = document.documentElement.scrollHeight - 380;

      // Hide when user reaches near the footer / bottom of the page
      if (scrollPosition >= threshold) {
        setVisible(false);
      } else {
        setVisible(true);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollDown = () => {
    window.scrollBy({
      top: window.innerHeight * 0.65,
      behavior: 'smooth',
    });
  };

  return (
    <div
      className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-40 transition-all duration-500 transform ${
        visible ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-6 pointer-events-none'
      }`}
    >
      <button
        onClick={handleScrollDown}
        className="group flex items-center gap-2 px-4 py-2 rounded-full bg-white/90 backdrop-blur-md border border-blue-200 shadow-lg shadow-blue-500/10 text-slate-800 hover:text-[#0057FF] hover:border-blue-400 transition-all cursor-pointer"
        aria-label="Scroll down page"
      >
        <span className="text-xs font-mono font-bold tracking-wider uppercase text-slate-700 group-hover:text-[#0057FF]">
          SCROLL DOWN
        </span>
        <div className="w-5 h-5 rounded-full bg-blue-50 group-hover:bg-[#0057FF] group-hover:text-white flex items-center justify-center transition-colors">
          <ChevronDown className="w-3.5 h-3.5 animate-bounce" />
        </div>
      </button>
    </div>
  );
};
