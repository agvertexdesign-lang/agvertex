import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, ArrowRight } from 'lucide-react';
import { useShowcaseVisibility } from '../../hooks/useCmsData';

interface NavbarProps {
  onOpenQuoteModal?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenQuoteModal }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { enabled: showcaseEnabled } = useShowcaseVisibility();

  const handleCtaClick = () => {
    navigate('/contact');
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/services', label: 'Services' },
    { path: '/careers', label: 'Careers' },
    { path: '/contact', label: 'Contact' },
  ];

  const isLinkActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 md:px-8 py-2 sm:py-2.5 transition-all duration-300 pointer-events-none">
      <div className={`max-w-[1360px] mx-auto pointer-events-auto transition-all duration-300 rounded-full px-4 sm:px-6 py-0.5 sm:py-1 flex items-center justify-between border ${
        scrolled 
          ? 'bg-gradient-to-r from-blue-50/80 via-blue-50/95 via-15% via-blue-100/90 via-55% to-blue-600/30 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,87,255,0.14)] border-blue-200/90' 
          : 'bg-gradient-to-r from-white/95 via-blue-50/80 via-15% via-blue-100/75 via-55% to-blue-500/25 backdrop-blur-md border-blue-100/90 shadow-md'
      }`}>
        
        {/* AG VERTEX Logo */}
        <Link 
          to="/"
          className="flex items-center group cursor-pointer focus:outline-none shrink-0 py-0.5"
        >
          <img
            src="/ag_vertex_logo.png"
            alt="AG VERTEX Logo"
            className="h-[52px] sm:h-[60px] md:h-[66px] lg:h-[74px] w-auto object-contain transition-transform duration-300 group-hover:scale-105 filter drop-shadow-xs"
          />
        </Link>


        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-1.5">
          {navLinks.map((link) => {
            const active = isLinkActive(link.path);
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`px-3.5 py-1.5 text-[13.5px] xl:text-sm font-semibold rounded-full transition-all duration-200 cursor-pointer ${
                  active
                    ? 'bg-white text-[#0057FF] font-extrabold shadow-sm border border-blue-200/90'
                    : 'text-slate-800 hover:text-[#0057FF] hover:bg-white/80'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Right Buttons (Matching PDF Header) */}
        <div className="hidden sm:flex items-center gap-2.5">
          <button
            onClick={handleCtaClick}
            className="btn-primary px-5 py-2 text-xs sm:text-[13px] font-semibold flex items-center gap-2 cursor-pointer shadow-md shadow-blue-500/20"
          >
            Request a Project Review
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-1.5 text-slate-800 hover:text-[#0057FF] focus:outline-none cursor-pointer"
          aria-label="Toggle Menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden pointer-events-auto mt-2 max-w-[1360px] mx-auto bg-white/95 backdrop-blur-2xl rounded-3xl p-5 border border-slate-200 shadow-2xl animate-in slide-in-from-top duration-300">
          <div className="grid grid-cols-2 gap-2 mb-4">
            {navLinks.map((link) => {
              const active = isLinkActive(link.path);
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-3.5 py-2.5 text-left text-sm font-semibold rounded-xl transition-colors ${
                    active ? 'bg-blue-50 text-[#0057FF] font-bold' : 'text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          <button
            onClick={() => {
              setMobileMenuOpen(false);
              handleCtaClick();
            }}
            className="w-full btn-primary py-3 text-sm font-semibold flex items-center justify-center gap-2 shadow-lg shadow-blue-500/25"
          >
            Request a Project Review <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </header>
  );
};
