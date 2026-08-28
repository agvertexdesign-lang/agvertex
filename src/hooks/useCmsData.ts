import { useState, useEffect } from 'react';
import { showcaseApi, ShowcaseProject } from '../lib/api/showcase';
import { servicesApi, Service } from '../lib/api/services';
import { careersApi, Career } from '../lib/api/careers';
import { settingsApi, AllSettings, WebsitePageContent, DEFAULT_PAGE_CONTENT } from '../lib/api/settings';

export function useShowcaseVisibility() {
  const [enabled, setEnabled] = useState<boolean>(() => {
    try {
      const cached = localStorage.getItem('ag_showcase_visibility');
      return cached ? JSON.parse(cached) : true;
    } catch {
      return true;
    }
  });
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    let mounted = true;
    showcaseApi.getVisibility().then(val => {
      if (mounted) {
        setEnabled(val);
        try {
          localStorage.setItem('ag_showcase_visibility', JSON.stringify(val));
        } catch (e) {
          console.warn(e);
        }
        setLoading(false);
      }
    }).catch(() => {
      if (mounted) setLoading(false);
    });
    return () => { mounted = false; };
  }, []);

  return { enabled, loading };
}

export const DEFAULT_SERVICES: Service[] = [
  {
    id: 'svc-1',
    title: 'Product Design & 3D CAD',
    short_desc: '3D CAD modeling, parametric part architecture, component design and detailed mechanical assemblies.',
    full_desc: 'Mechanical components and assemblies developed with performance, manufacturability, and production requirements in mind using PTC Creo Parametric, Siemens NX, and SolidWorks.',
    image_url: '/services/product_design.png',
    display_order: 1,
    status: 'published',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'svc-2',
    title: 'Mold & Die Tooling Support',
    short_desc: 'Injection mold layouts, core & cavity development, pressure die-casting dies, parting strategies and tooling prints.',
    full_desc: 'Practical tooling support for plastic injection molds, hot-runner components, inserts, lifters, sliders, and aluminum/magnesium pressure die-casting dies.',
    image_url: '/services/injection_mold.png',
    display_order: 2,
    status: 'published',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'svc-3',
    title: 'Drawings, GD&T & BOMs',
    short_desc: 'Manufacturing drawings, ASME Y14.5 GD&T, structured BOMs, and automotive drawing review.',
    full_desc: 'Clear 2D manufacturing prints with precise Geometric Dimensioning and Tolerancing (GD&T) application, datum reference frames, tolerance stack-up definition, structured Bills of Materials, and automotive drawing review.',
    image_url: '/services/drawings_gdt.png',
    display_order: 3,
    status: 'published',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'svc-4',
    title: 'DFM/DFA & Supplier Coordination',
    short_desc: 'DFM/DFA reviews, supplier technical coordination, prototype fitment support, and engineering change management.',
    full_desc: 'Design for Manufacturability and Assembly (DFM/DFA) design reviews, supplier technical coordination, prototype fitment support, and engineering change management.',
    image_url: '/services/dfm_dfa.png',
    display_order: 4,
    status: 'published',
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

export function useServicesData() {
  const [services, setServices] = useState<Service[]>(() => {
    try {
      const cached = localStorage.getItem('ag_services');
      return cached ? JSON.parse(cached) : DEFAULT_SERVICES;
    } catch {
      return DEFAULT_SERVICES;
    }
  });
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    let mounted = true;
    servicesApi.getPublished().then(data => {
      if (mounted) {
        if (data && data.length > 0) {
          setServices(data);
          try {
            localStorage.setItem('ag_services', JSON.stringify(data));
          } catch (e) {
            console.warn(e);
          }
        }
        setLoading(false);
      }
    }).catch(() => {
      if (mounted) setLoading(false);
    });
    return () => { mounted = false; };
  }, []);

  return { services, loading };
}

export function useShowcaseData() {
  const [projects, setProjects] = useState<ShowcaseProject[]>(() => {
    try {
      const cached = localStorage.getItem('ag_projects');
      return cached ? JSON.parse(cached) : [];
    } catch {
      return [];
    }
  });
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    let mounted = true;
    showcaseApi.getPublished().then(data => {
      if (mounted) {
        setProjects(data);
        try {
          localStorage.setItem('ag_projects', JSON.stringify(data));
        } catch (e) {
          console.warn(e);
        }
        setLoading(false);
      }
    }).catch(() => {
      if (mounted) setLoading(false);
    });
    return () => { mounted = false; };
  }, []);

  return { projects, loading };
}

export function useCareersData() {
  const [careers, setCareers] = useState<Career[]>(() => {
    try {
      const cached = localStorage.getItem('ag_careers');
      return cached ? JSON.parse(cached) : [];
    } catch {
      return [];
    }
  });
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    let mounted = true;
    careersApi.getPublished().then(data => {
      if (mounted) {
        setCareers(data);
        try {
          localStorage.setItem('ag_careers', JSON.stringify(data));
        } catch (e) {
          console.warn(e);
        }
        setLoading(false);
      }
    }).catch(() => {
      if (mounted) setLoading(false);
    });
    return () => { mounted = false; };
  }, []);

  return { careers, loading };
}

export function useSettingsData() {
  const [settings, setSettings] = useState<AllSettings | null>(() => {
    try {
      const cached = localStorage.getItem('ag_settings');
      return cached ? JSON.parse(cached) : null;
    } catch {
      return null;
    }
  });
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    let mounted = true;
    settingsApi.getAllSettings().then(data => {
      if (mounted) {
        setSettings(data);
        try {
          localStorage.setItem('ag_settings', JSON.stringify(data));
        } catch (e) {
          console.warn(e);
        }
        setLoading(false);
      }
    }).catch(() => {
      if (mounted) setLoading(false);
    });
    return () => { mounted = false; };
  }, []);

  return { settings, loading };
}

export function usePageContent() {
  const [pageContent, setPageContent] = useState<WebsitePageContent>(() => {
    try {
      const cached = localStorage.getItem('ag_page_content');
      return cached ? JSON.parse(cached) : DEFAULT_PAGE_CONTENT;
    } catch {
      return DEFAULT_PAGE_CONTENT;
    }
  });
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    let mounted = true;
    settingsApi.getPageContent().then(data => {
      if (mounted) {
        setPageContent(data);
        try {
          localStorage.setItem('ag_page_content', JSON.stringify(data));
        } catch (e) {
          console.warn(e);
        }
        setLoading(false);
      }
    }).catch(() => {
      if (mounted) setLoading(false);
    });
    return () => { mounted = false; };
  }, []);

  return { pageContent, loading };
}

