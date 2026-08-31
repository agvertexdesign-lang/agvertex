import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const SEO_META: Record<string, { title: string; description: string }> = {
  '/': {
    title: 'AG Vertex | Mechanical Design Consultancy in Canada, New Zealand & India',
    description: 'Practical mechanical design support for products, tooling, CAD documentation, GD&T, DFM/DFA, and supplier coordination across Canada, New Zealand, and India.',
  },
  '/about': {
    title: 'About Us | AG Vertex Mechanical Design Consultancy',
    description: 'Mechanical design consultancy with 15+ years experience supporting product development, 3D CAD, tooling, and drawings across Canada, New Zealand, and India.',
  },
  '/services': {
    title: 'Mechanical Design and CAD Support | AG Vertex',
    description: 'Product Design & 3D CAD, Mold & Die Tooling Support, Drawings GD&T & BOMs, and DFM/DFA & Supplier Coordination.',
  },
  '/portfolio': {
    title: 'Mechanical Design Portfolio & CAD Showcase | AG Vertex',
    description: 'Browse our engineering portfolio showcasing injection molds, die-casting dies, 3D CAD modeling, mechanical assemblies, and production drawings.',
  },
  '/case-study': {
    title: 'Suspension Control Arm Case Study & FEA Analysis | AG Vertex',
    description: 'Detailed case study on suspension control arm component design, FEA structural simulation, evolutionary optimization, and drawing review.',
  },
  '/technologies': {
    title: 'CAD & Engineering Software Stack | AG Vertex',
    description: 'Our professional mechanical design software suite including PTC Creo Parametric, Siemens NX, SolidWorks, and AutoCAD.',
  },
  '/process': {
    title: 'Our Mechanical Design & Review Process | AG Vertex',
    description: 'Discover our step-by-step engineering design process: Requirements alignment, CAD development, 2D drawing review with GD&T, and manufacturing coordination.',
  },
  '/careers': {
    title: 'Careers & Project Collaboration | AG Vertex',
    description: 'Submit your profile for future project-based mechanical design, CAD, and tooling collaboration opportunities in Canada, New Zealand, and India.',
  },
  '/contact': {
    title: 'Request a Project Review | AG Vertex',
    description: 'Contact AG Vertex to request a mechanical design project review and technical estimate for operations in Canada, New Zealand, and India.',
  },
  '/faq': {
    title: 'Frequently Asked Questions | AG Vertex',
    description: 'Find answers to common questions about our mechanical design services, CAD documentation, turnaround times, and manufacturing support.',
  },
  '/privacy': {
    title: 'Privacy Policy & NDA Guarantees | AG Vertex',
    description: 'Our commitment to protecting your intellectual property, data security practices, and automatic Non-Disclosure Agreement (NDA) coverage.',
  },
};

export function useSEO() {
  const location = useLocation();

  useEffect(() => {
    const route = location.pathname;
    const meta = SEO_META[route] || SEO_META['/'];

    document.title = meta.title;

    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', meta.description);

    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', `https://agvertex.com${route}`);
  }, [location]);
}
