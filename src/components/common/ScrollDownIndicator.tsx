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
        className="group flex flex-col items-center gap-1.5 p-2 transition-transform duration-300 hover:scale-115 cursor-pointer focus:outline-none"
        aria-label="Scroll down page"
      >
        {/* Animated Computer Mouse Icon Suspended in Air */}
        <div className="w-6 h-10 rounded-full border-2 border-[#0057FF] flex justify-center pt-2 bg-white/50 backdrop-blur-xs shadow-md group-hover:border-blue-600 group-hover:bg-white/80 transition-all duration-300">
          <div className="w-1.5 h-2.5 bg-[#0057FF] rounded-full animate-mouse-scroll" />
        </div>

        {/* Downward Bouncing Arrow Suspended Below */}
        <ChevronDown className="w-5 h-5 text-[#0057FF] group-hover:text-blue-700 animate-bounce filter drop-shadow-md transition-colors" />
      </button>
    </div>
  );
};
