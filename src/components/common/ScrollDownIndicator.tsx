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
        className="group flex items-center gap-3 px-5 py-2.5 rounded-full bg-white/95 backdrop-blur-md border border-blue-200 shadow-xl shadow-blue-500/15 text-slate-900 hover:text-[#0057FF] hover:border-blue-500 hover:shadow-2xl hover:scale-105 transition-all duration-300 cursor-pointer"
        aria-label="Scroll down page"
      >
        {/* Animated Computer Mouse Icon */}
        <div className="w-5 h-8 rounded-full border-2 border-[#0057FF] group-hover:border-blue-600 flex justify-center pt-1.5 shrink-0 bg-blue-50/50 group-hover:bg-blue-100/50 transition-colors">
          <div className="w-1 h-2 bg-[#0057FF] rounded-full animate-mouse-scroll" />
        </div>

        <span className="text-xs font-mono font-extrabold tracking-wider uppercase text-slate-900 group-hover:text-[#0057FF] transition-colors">
          SCROLL DOWN
        </span>

        {/* Downward Bouncing Arrow Icon */}
        <div className="w-6 h-6 rounded-full bg-blue-50 group-hover:bg-[#0057FF] group-hover:text-white flex items-center justify-center transition-colors duration-300">
          <ChevronDown className="w-4 h-4 text-[#0057FF] group-hover:text-white animate-bounce" />
        </div>
      </button>
    </div>
  );
};
