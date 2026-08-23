import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, MapPin, ArrowUp, Linkedin, Youtube, Instagram, Facebook, Globe2 } from 'lucide-react';
import { useSettingsData, useShowcaseVisibility } from '../../hooks/useCmsData';

interface FooterProps {
  onOpenQuoteModal?: () => void;
}

export const Footer: React.FC<FooterProps> = () => {
  const navigate = useNavigate();
  const { settings } = useSettingsData();
  const { enabled: showcaseEnabled } = useShowcaseVisibility();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const servicesList = [
    { label: 'Product Design & 3D CAD', path: '/services' },
    { label: 'Mold & Die Tooling Support', path: '/services' },
    { label: 'Drawings, GD&T & BOMs', path: '/services' },
    { label: 'DFM/DFA & Supplier Coordination', path: '/services' },
    { label: 'Automotive Drawing Review', path: '/services' },
  ];

  const companyList = [
    { label: 'About', path: '/about' },
    { label: 'Services', path: '/services' },
    { label: 'Careers', path: '/careers' },
    { label: 'Contact', path: '/contact' },
  ];

  const bottomNavLinks = [
    { label: 'Home', path: '/' },
    { label: 'About', path: '/about' },
    { label: 'Services', path: '/services' },
    { label: 'Careers', path: '/careers' },
    { label: 'Contact', path: '/contact' },
  ];

  const socialLinks = settings?.social || { linkedin: '', instagram: '', facebook: '', youtube: '' };
  const contactEmail = settings?.contact?.email || 'info@agvertex.com';

  return (
    <footer className="bg-white text-slate-700 pt-16 pb-8 border-t border-slate-200 relative">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 space-y-12">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 pb-12 border-b border-slate-200">
          
          {/* Col 1: Custom Logo & Tagline */}
          <div className="lg:col-span-4 space-y-4">
            <Link
              to="/"
              className="flex items-center cursor-pointer focus:outline-none"
            >
              <img
                src="/ag_vertex_logo.png"
                alt="AG VERTEX Logo"
                className="h-12 md:h-14 w-auto object-contain"
              />
            </Link>

            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed max-w-sm">
              {settings?.business?.short_description || 'Mechanical design and tooling engineering consultancy. Globally positioned across Canada, India, and New Zealand.'}
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-2">
              {socialLinks.linkedin && (
                <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-slate-100 text-slate-600 hover:bg-[#0057FF] hover:text-white flex items-center justify-center transition-colors">
                  <Linkedin className="w-4 h-4" />
                </a>
              )}
              {socialLinks.youtube && (
                <a href={socialLinks.youtube} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-slate-100 text-slate-600 hover:bg-[#0057FF] hover:text-white flex items-center justify-center transition-colors">
                  <Youtube className="w-4 h-4" />
                </a>
              )}
              {socialLinks.instagram && (
                <a href={socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-slate-100 text-slate-600 hover:bg-[#0057FF] hover:text-white flex items-center justify-center transition-colors">
                  <Instagram className="w-4 h-4" />
                </a>
              )}
              {socialLinks.facebook && (
                <a href={socialLinks.facebook} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-slate-100 text-slate-600 hover:bg-[#0057FF] hover:text-white flex items-center justify-center transition-colors">
                  <Facebook className="w-4 h-4" />
                </a>
              )}
              {!socialLinks.linkedin && !socialLinks.youtube && !socialLinks.instagram && !socialLinks.facebook && (
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center">
                    <Linkedin className="w-4 h-4" />
                  </span>
                  <span className="w-8 h-8 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center">
                    <Youtube className="w-4 h-4" />
                  </span>
                  <span className="w-8 h-8 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center">
                    <Instagram className="w-4 h-4" />
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Col 2: Services */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-heading font-bold text-[#0F172A] uppercase tracking-wider">
              SERVICES
            </h4>
            <ul className="space-y-2 text-xs text-slate-500">
              {servicesList.map((service, idx) => (
                <li key={idx}>
                  <Link 
                    to={service.path}
                    className="hover:text-[#0057FF] transition-colors text-left block"
                  >
                    {service.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Company */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-heading font-bold text-[#0F172A] uppercase tracking-wider">
              COMPANY
            </h4>
            <ul className="space-y-2 text-xs text-slate-500">
              {companyList.map((comp, idx) => (
                <li key={idx}>
                  <Link 
                    to={comp.path}
                    className="hover:text-[#0057FF] transition-colors text-left block"
                  >
                    {comp.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Global Footprint & Contact */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-heading font-bold text-[#0F172A] uppercase tracking-wider">
              GLOBAL PRESENCE
            </h4>
            
            <div className="space-y-3 text-xs text-slate-600">
              <div className="space-y-1.5">
                <div className="flex items-center gap-2 font-semibold text-slate-800">
                  <MapPin className="w-3.5 h-3.5 text-[#0057FF] shrink-0" />
                  <span>Windsor, Ontario, Canada</span>
                </div>
              </div>

              <div className="flex items-center gap-2.5 pt-1">
                <Mail className="w-4 h-4 text-[#0057FF] shrink-0" />
                <a href="mailto:info@agvertex.com" className="hover:text-[#0057FF] transition-colors font-medium">
                  info@agvertex.com
                </a>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => navigate('/contact')}
                  className="px-4 py-2 rounded-xl bg-blue-50 text-[#0057FF] font-semibold text-xs hover:bg-[#0057FF] hover:text-white transition-colors cursor-pointer"
                >
                  Request a Project Review →
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Legal & Navigation Bar */}
        <div className="pt-2 flex flex-col md:flex-row items-center justify-between text-[11px] text-slate-400 gap-4">
          <p>© 2026 AG Vertex. All rights reserved.</p>

          {/* Bottom Page Navigation Links */}
          <div className="flex flex-wrap items-center gap-4 text-xs font-medium">
            {bottomNavLinks.map((link, idx) => (
              <Link
                key={idx}
                to={link.path}
                className="text-slate-500 hover:text-[#0057FF] transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Scroll to Top Button */}
          <button
            onClick={scrollToTop}
            className="w-9 h-9 rounded-full bg-[#0057FF] text-white flex items-center justify-center shadow-lg hover:bg-blue-600 transition-colors cursor-pointer"
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>

      </div>
    </footer>
  );
};
