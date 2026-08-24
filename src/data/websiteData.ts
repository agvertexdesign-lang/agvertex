export interface ServiceItem {
  id: string;
  title: string;
  shortDesc: string;
  description: string;
  fullDesc?: string;
  image: string;
  capabilities: string[];
  deliverables: string[];
  tools: string[];
}

export interface IndustryItem {
  id: string;
  title: string;
  tagline: string;
  description: string;
  image: string;
  applications: string[];
  challenges?: string[];
  solutions?: string[];
  stats: { label: string; value: string }[];
}

export interface CaseStudyItem {
  id: string;
  title: string;
  category: string;
  clientIndustry: string;
  summary: string;
  challenge: string;
  solution: string;
  results: string[];
  image: string;
  tag: string;
  tools: string[];
}

export interface ProjectItem {
  id: string;
  title: string;
  category: string;
  tag: string;
  client?: string;
  clientIndustry?: string;
  year?: string;
  timeline?: string;
  summary: string;
  description?: string;
  image: string;
  tags?: string[];
  tools?: string[];
  highlights?: string[];
}

export interface ArticleItem {
  id: string;
  title: string;
  category: string;
  date: string;
  readTime: string;
  summary: string;
  snippet?: string;
  image: string;
  author: string;
  content?: string;
}

export interface CareerItem {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  experience: string;
  description: string;
  responsibilities: string[];
}

export interface EquipmentItem {
  id: string;
  name: string;
  category: string;
  type?: string;
  specs: string;
  precision?: string;
  description: string;
  image: string;
}

export const COMPANY_STATS = [
  { label: 'Years Experience', value: '15+' },
  { label: '3D CAD Expertise', value: '100%' },
  { label: 'GD&T / DFM Compliance', value: 'ASME Y14.5' },
  { label: 'Supplier Coordination', value: 'Global' },
];

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: 'product-design-development',
    title: 'PRODUCT DESIGN & DEVELOPMENT',
    shortDesc: 'Concept development, mechanical component design, DFM/DFA and production-ready engineering support.',
    description: 'From initial concept sketches through detailed mechanical engineering, we create practical solutions that align with function, cost, and manufacturability.',
    fullDesc: 'From initial concept sketches through detailed mechanical engineering, we create practical solutions that align with function, cost, and manufacturability.',
    image: '/services/product_design.png',
    capabilities: ['Concept Development & Ideation', 'Mechanical Component Design', 'DFM & DFA Optimization', 'Production-Ready Engineering Support'],
    deliverables: ['Production 3D CAD Assemblies', '2D Manufacturing Drawings', 'Structured Bill of Materials (BOM)'],
    tools: ['SolidWorks', 'Creo', 'Siemens NX'],
  },
  {
    id: 'injection-mold-design',
    title: 'INJECTION MOLD DESIGN',
    shortDesc: 'Mold layouts, core and cavity development, inserts, slides, lifters and manufacturing documentation.',
    description: 'High-precision plastic injection mold design including multi-cavity layouts, parting surface generation, slider/lifter mechanisms, cooling circuits, and hot-runner integration.',
    fullDesc: 'High-precision plastic injection mold design including multi-cavity layouts, parting surface generation, slider/lifter mechanisms, cooling circuits, and hot-runner integration.',
    image: '/services/injection_mold.png',
    capabilities: ['Mold Layouts & Parting Strategies', 'Core & Cavity Development', 'Inserts, Slides & Lifter Systems', 'Tooling Manufacturing Documentation'],
    deliverables: ['Full 3D Mold Tooling Assemblies', 'Tool Component Detail Drawings', 'Electrode Extraction CAD Files'],
    tools: ['Siemens NX Mold Wizard', 'SolidWorks', 'Moldflow'],
  },
  {
    id: 'pressure-die-casting-die-design',
    title: 'PRESSURE DIE-CASTING DIE DESIGN',
    shortDesc: 'Practical die concepts, parting strategy, core and slide development, and detailed tooling design.',
    description: 'Robust tooling design for high-pressure aluminum, magnesium, and zinc die-casting components with optimized gating, venting, runner channels, and thermal control.',
    fullDesc: 'Robust tooling design for high-pressure aluminum, magnesium, and zinc die-casting components with optimized gating, venting, runner channels, and thermal control.',
    image: '/services/die_casting.png',
    capabilities: ['Practical Die Concepts & Parting Strategy', 'Core & Slide Development', 'Runner, Gating & Venting Layouts', 'Detailed Tooling Fabrication Prints'],
    deliverables: ['Complete Die Casting Tool Assembly', 'Insert & Core Fabrication Drawings', 'Tool Life Optimization Specs'],
    tools: ['Creo', 'Siemens NX', 'SolidWorks'],
  },
  {
    id: '3d-cad-modelling',
    title: '3D CAD MODELLING',
    shortDesc: 'Detailed parts and assemblies, CAD conversion, design modifications and parametric modelling.',
    description: 'High-integrity parametric solid and surface CAD modeling for complex mechanical assemblies, sheet metal structures, castings, and machined components.',
    fullDesc: 'High-integrity parametric solid and surface CAD modeling for complex mechanical assemblies, sheet metal structures, castings, and machined components.',
    image: '/services/cad_modelling.png',
    capabilities: ['Detailed Parts & Assembly Modeling', 'Legacy CAD & 2D-to-3D Conversion', 'Design Modifications & Revisions', 'Parametric Feature Architecture'],
    deliverables: ['Native 3D CAD Files', 'Neutral STEP / IGES / Parasolid', 'Exploded Assembly Configurations'],
    tools: ['SolidWorks', 'Creo', 'Siemens NX', 'AutoCAD'],
  },
  {
    id: 'drawings-gdt-boms',
    title: 'DRAWINGS, GD&T & BOMs',
    shortDesc: 'Manufacturing drawings, tolerance definition, GD&T application and structured bills of materials.',
    description: 'ASME Y14.5 and ISO compliant 2D technical drafting with precise Geometric Dimensioning and Tolerancing, datum reference frames, tolerance stack-up analysis, and detailed structured BOMs.',
    fullDesc: 'ASME Y14.5 and ISO compliant 2D technical drafting with precise Geometric Dimensioning and Tolerancing, datum reference frames, tolerance stack-up analysis, and detailed structured BOMs.',
    image: '/services/drawings_gdt.png',
    capabilities: ['Clear Manufacturing Drawings', 'Tolerance Definition & Stack-Up', 'ASME Y14.5 GD&T Application', 'Structured Bills of Materials (BOM)'],
    deliverables: ['Shop-Floor Ready PDF/DWG Prints', 'Datum Definition Matrices', 'Excel / PLM Formatted BOMs'],
    tools: ['AutoCAD', 'SolidWorks', 'Creo Drafting', 'Windchill'],
  },
  {
    id: 'dfm-dfa-support',
    title: 'DFM / DFA SUPPORT',
    shortDesc: 'Design reviews focused on manufacturability, assembly, cost awareness and production feasibility.',
    description: 'Comprehensive engineering evaluations to optimize part geometry for CNC machining, stamping, casting, and injection molding while reducing assembly steps and tooling costs.',
    fullDesc: 'Comprehensive engineering evaluations to optimize part geometry for CNC machining, stamping, casting, and injection molding while reducing assembly steps and tooling costs.',
    image: '/services/dfm_dfa.png',
    capabilities: ['Manufacturability Design Reviews', 'Assembly Simplification & DFA', 'Cost Awareness & Optimization', 'Production Feasibility Audits'],
    deliverables: ['DFM/DFA Recommendation Reports', 'Optimized Geometry Revisions', 'Tooling Cost Savings Analysis'],
    tools: ['SolidWorks', 'Siemens NX', 'Creo'],
  },
  {
    id: 'automotive-drawing-validation',
    title: 'AUTOMOTIVE DRAWING REVIEW',
    shortDesc: 'Drawing review against applicable OEM requirements, specifications and GD&T standards.',
    description: 'Independent review of automotive tier-supplier engineering prints, ensuring adherence to OEM standards, GD&T feasibility, and manufacturability.',
    fullDesc: 'Independent review of automotive tier-supplier engineering prints, ensuring adherence to OEM standards, GD&T feasibility, and manufacturability.',
    image: '/services/drawing_validation.png',
    capabilities: ['Drawing Review vs OEM Requirements', 'GD&T Standard Compliance Audits', 'Supplier Print Discrepancy Reports', 'Engineering Change Management (ECN)'],
    deliverables: ['Drawing Review & Redline Reports', 'Engineering Revision Tracking', 'Supplier Print Discrepancy Audits'],
    tools: ['Teamcenter', 'Windchill', 'AutoCAD', 'SolidWorks'],
  },
  {
    id: 'supplier-prototype-support',
    title: 'SUPPLIER & PROTOTYPE SUPPORT',
    shortDesc: 'Technical coordination, discrepancy resolution and prototype-to-production design support.',
    description: 'Direct collaboration with toolmakers and prototype suppliers to resolve machining/tooling queries, clarify tolerances, and streamline smooth transition into manufacturing.',
    fullDesc: 'Direct collaboration with toolmakers and prototype suppliers to resolve machining/tooling queries, clarify tolerances, and streamline smooth transition into manufacturing.',
    image: '/services/supplier_support.png',
    capabilities: ['Technical Supplier Coordination', 'Drawing Discrepancy Resolution', 'Prototype-to-Production Support', 'Tooling Trial & First-Article Review'],
    deliverables: ['Supplier Query (RFI) Resolutions', 'Engineering Deviation Approvals', 'Tooling Sign-Off Documentation'],
    tools: ['Windchill', 'Teamcenter', 'SolidWorks'],
  },
];

export const PROCESS_STEPS = [
  { step: '01', title: 'Understand', desc: 'Clarify requirements and constraints.' },
  { step: '02', title: 'Develop', desc: 'Explore concepts and design direction.' },
  { step: '03', title: 'Detail', desc: 'Create detailed 3D models and drawings.' },
  { step: '04', title: 'Review', desc: 'Review drawings and manufacturability.' },
  { step: '05', title: 'Support', desc: 'Support production and answer supplier questions.' },
];

export const SHOWCASE_CARDS = [
  {
    id: 'showcase-1',
    title: 'Automotive Component Design',
    category: 'Automotive',
    tag: 'Suspension System',
    summary: '3D CAD modeling, GD&T drafting, and supplier coordination for forged suspension knuckles.',
    image: '/services/product_design.png',
    tools: ['Creo', 'SolidWorks'],
  },
  {
    id: 'showcase-2',
    title: 'Mold & Die Design',
    desc: 'Precision multi-cavity injection molds, high-pressure die-casting tooling & slider actions.',
    image: '/services/injection_mold.png',
  },
  {
    id: 'showcase-3',
    title: 'Drawing Review & Validation',
    desc: 'Rigorous ASME Y14.5 GD&T compliance audits, tolerance stack-ups & supplier print verification.',
    image: '/services/drawing_validation.png',
  },
];

export const CAD_PLM_TOOLS = [
  { name: 'Creo', category: 'Parametric CAD', color: '#77B800' },
  { name: 'Siemens NX', category: 'High-End CAD', color: '#009999' },
  { name: 'SolidWorks', category: '3D CAD Design', color: '#E2231A' },
  { name: 'AutoCAD', category: '2D Drafting', color: '#E51937' },
  { name: 'Windchill', category: 'PLM System', color: '#005493' },
  { name: 'Teamcenter', category: 'Enterprise PLM', color: '#006699' },
];

export const PORTFOLIO_PROJECTS: ProjectItem[] = [
  {
    id: 'proj-1',
    title: 'AUTOMOTIVE COMPONENT DEVELOPMENT',
    category: 'Product Design',
    tag: 'PRODUCT DESIGN',
    client: 'Tier-1 Automotive OEM',
    clientIndustry: 'Automotive',
    summary: 'Concept development, detailed CAD, DFM and production documentation.',
    description: 'Precision mechanical development of high-load wheel hub assembly and steering knuckle with complete DFM optimization and production-ready drawing release.',
    image: '/services/product_design.png',
    tags: ['Product Design', 'Automotive', 'DFM', 'CAD'],
    tools: ['SolidWorks', 'Creo', 'ASME Y14.5'],
    highlights: ['Production-ready 3D CAD models', 'Full ASME GD&T drawings', 'DFM & DFA validated'],
  },
  {
    id: 'proj-2',
    title: 'INJECTION MOLD TOOLING',
    category: 'Mold & Die Design',
    tag: 'MOLD & DIE DESIGN',
    client: 'Consumer Tech OEM',
    clientIndustry: 'Tooling & Injection Molding',
    summary: 'Manufacturing-focused mold design, component detailing and design review.',
    description: 'Engineered high-precision multi-cavity injection mold tooling with optimized parting lines, hot runner balance, slide mechanisms, and conformal cooling circuits.',
    image: '/services/injection_mold.png',
    tags: ['Mold Design', 'Injection Molding', 'Tooling'],
    tools: ['Siemens NX Mold Wizard', 'SolidWorks', 'Moldflow'],
    highlights: ['Multi-cavity mold layout', 'Sub-micron parting alignment', 'Toolmaker ready fabrication prints'],
  },
  {
    id: 'proj-3',
    title: 'AUTOMOTIVE DRAWING REVIEW',
    category: 'Drawing Validation',
    tag: 'DRAWING VALIDATION',
    client: 'Automotive Tier-1 Supplier',
    clientIndustry: 'Automotive & Chassis',
    summary: 'Drawing verification, discrepancy resolution and supplier coordination.',
    description: 'Comprehensive audit of automotive suspension control arm and chassis drawings against strict OEM specifications, GD&T datum reference frames, and dimensional tolerances.',
    image: '/services/drawing_validation.png',
    tags: ['Drawing Validation', 'ASME Y14.5', 'Supplier Audit'],
    tools: ['AutoCAD', 'Windchill', 'GD&T'],
    highlights: ['Identified 24+ critical drawing discrepancies', 'Saved $350K+ in potential tooling rework', '100% OEM compliance verified'],
  },
  {
    id: 'proj-4',
    title: 'PARAMETRIC CAD & ASSEMBLY DESIGN',
    category: '3D CAD',
    tag: '3D CAD MODELLING',
    client: 'Machinery Manufacturer',
    clientIndustry: 'Industrial Machinery',
    summary: 'Detailed parts and assemblies, CAD conversion, design modifications and parametric modelling.',
    description: 'High-integrity parametric 3D CAD modeling of heavy-duty industrial transmissions, precision gear trains, and modular structural enclosures.',
    image: '/services/cad_modelling.png',
    tags: ['3D CAD', 'Parametric Modeling', 'Assembly'],
    tools: ['Creo', 'SolidWorks', 'Siemens NX'],
    highlights: ['Parametric feature-tree architecture', 'Full exploded assembly BOMs', 'STEP / Parasolid neutral exports'],
  },
  {
    id: 'proj-5',
    title: 'PRESSURE DIE-CASTING DIE TOOLING',
    category: 'Mold & Die Design',
    tag: 'MOLD & DIE DESIGN',
    client: 'Automotive Powertrain OEM',
    clientIndustry: 'Die Casting & Tooling',
    summary: 'High-pressure die casting tooling concepts, parting lines, and slide mechanisms.',
    description: 'Complete high-integrity die casting tooling layout for thin-wall aluminum transmission housings with optimized thermal balancing and vacuum venting.',
    image: '/services/die_casting.png',
    tags: ['Die Casting', 'Tooling', 'Aluminum'],
    tools: ['Creo', 'AutoCAD', 'SolidWorks'],
    highlights: ['Over 200,000 shot tool life', 'Zero-porosity sealing surfaces', 'Full insert & core fabrication prints'],
  },
  {
    id: 'proj-6',
    title: 'ASME Y14.5 GD&T & BOM DRAFTING',
    category: 'Drawing Validation',
    tag: 'DRAWING VALIDATION',
    client: 'Precision Equipment Manufacturer',
    clientIndustry: 'Industrial & Metrology',
    summary: 'Production-ready 2D technical drawings, datum frameworks, and structured bills of materials.',
    description: 'Preparation and auditing of ASME Y14.5 compliant 2D technical drawings, 1D/3D tolerance stack-up analysis, datum matrices, and structured multi-level BOMs.',
    image: '/services/drawings_gdt.png',
    tags: ['GD&T', 'ASME Y14.5', 'BOM Drafting'],
    tools: ['AutoCAD', 'SolidWorks', 'Windchill'],
    highlights: ['ASME Y14.5 compliant datum schemes', '1D/3D tolerance stack calculations', 'ERP/PLM ready structured BOMs'],
  },
];

export const INDUSTRIES_DATA: IndustryItem[] = [
  {
    id: 'automotive',
    title: 'Automotive & EV',
    tagline: 'Lightweight chassis, battery enclosures & EV powertrain design.',
    description: 'Empowering automotive startups and Tier-1 suppliers with high-efficiency component design, die casting layout, and drawing validation.',
    image: '/services/product_design.png',
    applications: ['Gearbox & Transmission Housings', 'Structural Chassis Components', 'Battery Enclosures', 'Bracket & Suspension Systems'],
    challenges: ['Minimizing curb weight without compromising crash safety', 'Managing heat dissipation in high-density EV battery modules'],
    solutions: ['Die casting optimization & composite material replacement', 'DFM and GD&T tolerance balancing'],
    stats: [
      { label: 'Experience', value: '15+ Yrs' },
      { label: 'Accuracy', value: '100%' },
    ],
  },
  {
    id: 'injection-molding',
    title: 'Plastic Injection Molding',
    tagline: 'Precision tooling, parting strategies & mold documentation.',
    description: 'High-precision mold tooling design for consumer electronics, industrial enclosures, and medical components.',
    image: '/services/injection_mold.png',
    applications: ['Multi-Cavity Molds', 'Hot Runner Systems', 'Slider & Lifter Actions', 'Electrodes & Inserts'],
    challenges: ['Minimizing cycle time and thermal warpage', 'Complex parting lines'],
    solutions: ['Advanced cooling layout & conformal cooling', 'Precision core/cavity splits'],
    stats: [
      { label: 'Mold Life', value: '1M+ Cycles' },
      { label: 'Quality', value: 'Zero Defect' },
    ],
  },
  {
    id: 'die-casting',
    title: 'Die-Casting Tooling',
    tagline: 'High-pressure die casting dies for aluminum and magnesium alloys.',
    description: 'Engineered for high thermal durability, reliable gating, and prolonged tool life in aggressive production environments.',
    image: '/services/die_casting.png',
    applications: ['Aluminum Die Casting Dies', 'Magnesium Structural Molds', 'Trim Dies & Fixtures', 'Thermal Flow Balancing'],
    challenges: ['Thermal fatigue & porosity defects', 'Ejection friction'],
    solutions: ['Optimized gating & venting channels', 'Hydraulic core pulling integration'],
    stats: [
      { label: 'Pressure Rating', value: '15,000 PSI' },
      { label: 'Tool Life', value: 'Extended' },
    ],
  },
];

export const FEATURED_CASE_STUDIES: CaseStudyItem[] = [
  {
    id: 'hp-die-casting',
    title: 'High-Pressure Die-Casting Die',
    category: 'Automotive',
    clientIndustry: 'Tier-1 Automotive',
    summary: 'Full tool layout for complex aluminum gearbox housing.',
    challenge: 'Designing a robust high-integrity die casting tool for complex thin-wall transmission housings with zero porosity.',
    solution: 'Designed complete multi-slide die casting die with optimized cooling channels and vacuum venting.',
    results: [
      'Zero Porosity on Critical Sealing Surfaces',
      'Over 200,000 Shot Tool Life',
      '100% On-Time Production Sign-Off',
    ],
    image: '/services/die_casting.png',
    tag: 'AUTOMOTIVE TOOLING',
    tools: ['Creo', 'Siemens NX', 'AutoCAD'],
  },
  {
    id: 'precision-tooling',
    title: 'Precision Tooling Assembly',
    category: 'Tooling',
    clientIndustry: 'Consumer Electronics',
    summary: 'Multi-cavity injection mold for consumer electronics.',
    challenge: 'Achieving sub-micron parting line alignment and seamless texture finish on cosmetic plastic enclosures.',
    solution: 'Engineered hardened tool steel inserts, balanced hot-runner manifold, and guided ejection.',
    results: [
      'Parting Line Flash < 0.01mm',
      '18-Second Cycle Time Achieved',
      'Approved for Global Mass Production',
    ],
    image: '/services/injection_mold.png',
    tag: 'PRODUCT DEVELOPMENT',
    tools: ['Siemens NX', 'SolidWorks', 'Moldflow'],
  },
  {
    id: 'chassis-review',
    title: 'Chassis Component Review',
    category: 'Drawings',
    clientIndustry: 'Automotive OEM',
    summary: 'Comprehensive verification of 50+ supplier prints.',
    challenge: 'Reviewing 50+ supplier 2D blueprints for datum alignment, GD&T feasibility, and OEM specification compliance.',
    solution: 'Conducted rigorous tolerance stack-up and drawing validation audits with structured redline reports.',
    results: [
      'Identified 24 Critical GD&T Discrepancies Prior to Tooling',
      'Saved Estimated $350K in Rework Costs',
      '100% Drawing Compliance Approved',
    ],
    image: '/services/drawing_validation.png',
    tag: 'MECHANICAL DESIGN',
    tools: ['SolidWorks', 'AutoCAD', 'Windchill'],
  },
];

export const ARTICLES_DATA: ArticleItem[] = [
  {
    id: 'featured-guide',
    title: 'AUTOMOTIVE DRAWING REVIEW: A PRACTICAL CHECKLIST',
    category: 'Drawing Validation',
    date: 'August 2026',
    readTime: '6 min read',
    summary: 'Key checks for dimensions, GD&T, materials, revisions, manufacturability and supplier clarification.',
    snippet: 'Key checks for dimensions, GD&T, materials, revisions, manufacturability and supplier clarification.',
    image: '/services/drawing_validation.png',
    author: 'Principal Metrology Specialist',
    content: 'Reviewing automotive supplier prints requires structured datum verification, ASME Y14.5 feature control frame checks, and clear material notes before tooling kick-off.',
  },
  {
    id: 'article-1',
    title: 'DESIGNING PLASTIC PARTS FOR INJECTION MOLDING',
    category: 'Product Design',
    date: 'August 2026',
    readTime: '5 min read',
    summary: 'Practical DFM checks for wall thickness, draft, ribs, bosses and parting-line strategy.',
    snippet: 'Practical DFM checks for wall thickness, draft, ribs, bosses and parting-line strategy.',
    image: '/services/dfm_dfa.png',
    author: 'Lead Tooling Engineer',
    content: 'Ensuring uniform wall thickness, adding minimum 1-2 degree draft angles, and placing parting lines strategically eliminates sink marks and tooling flash.',
  },
  {
    id: 'article-2',
    title: 'GD&T DRAWING REVIEW: COMMON ISSUES TO CHECK',
    category: 'Mold Design',
    date: 'July 2026',
    readTime: '4 min read',
    summary: 'A focused review of datums, tolerances, feature control frames and drawing clarity.',
    snippet: 'A focused review of datums, tolerances, feature control frames and drawing clarity.',
    image: '/services/injection_mold.png',
    author: 'Senior GD&T Specialist',
    content: 'Common GD&T errors include improper datum reference frame hierarchy, conflicting basic dimensions, and insufficient MMC/LMC modifier application.',
  },
  {
    id: 'article-3',
    title: 'FROM 3D CAD MODEL TO PRODUCTION DRAWING',
    category: 'CAD & Drawings',
    date: 'July 2026',
    readTime: '5 min read',
    summary: 'How modelling decisions, tolerances, BOMs and revision control support manufacturing.',
    snippet: 'How modelling decisions, tolerances, BOMs and revision control support manufacturing.',
    image: '/services/cad_modelling.png',
    author: 'Lead CAD Architect',
    content: 'Seamless transition from 3D parametric CAD to production drawings requires structured model-based definitions (MBD) and synchronized BOM tables.',
  },
];

export const CAREER_OPENINGS: CareerItem[] = [
  {
    id: 'senior-tooling-engineer',
    title: 'Senior Mold & Die Design Engineer',
    department: 'Tooling & Mechanical Design',
    location: 'Windsor, Ontario / Hybrid',
    type: 'Full-time',
    experience: '5+ Years',
    description: 'Lead injection mold and pressure die casting tooling design for automotive clients.',
    responsibilities: [
      'Develop complete 3D mold & die tooling layouts using Siemens NX / Creo.',
      'Perform parting line splits, slider actions, and cooling circuit designs.',
      'Review and validate supplier tooling drawings and GD&T.',
    ],
  },
  {
    id: 'cad-gdt-specialist',
    title: 'CAD & GD&T Validation Specialist',
    department: 'Engineering Documentation',
    location: 'Windsor, Ontario / Remote',
    type: 'Full-time',
    experience: '3+ Years',
    description: 'Execute detailed 2D GD&T drafting and automotive supplier print reviews.',
    responsibilities: [
      'Prepare ASME Y14.5 compliant manufacturing prints and BOMs.',
      'Perform 1D/3D tolerance stack-up analysis on complex assemblies.',
    ],
  },
];

export const FAQ_ITEMS = [
  {
    id: 'faq-1',
    category: 'General',
    question: 'What engineering services does AG Vertex specialize in?',
    answer: 'AG Vertex specializes in Product Design & Development, Injection Mold Design, Pressure Die-Casting Die Design, 3D CAD Modelling, Drawings GD&T & BOMs, DFM/DFA Support, Automotive Drawing Validation, and Supplier & Prototype Support.',
    q: 'What engineering services does AG Vertex specialize in?',
    a: 'AG Vertex specializes in Product Design & Development, Injection Mold Design, Pressure Die-Casting Die Design, 3D CAD Modelling, Drawings GD&T & BOMs, DFM/DFA Support, Automotive Drawing Validation, and Supplier & Prototype Support.',
  },
  {
    id: 'faq-2',
    category: 'Location & Collaboration',
    question: 'Where is AG Vertex located and how do you work with clients?',
    answer: 'AG Vertex is a mechanical design consultancy based in Windsor, Ontario, Canada. We support local and international clients with turnkey CAD modeling, tooling designs, and drawing review.',
    q: 'Where is AG Vertex located and how do you work with clients?',
    a: 'AG Vertex is a mechanical design consultancy based in Windsor, Ontario, Canada. We support local and international clients with turnkey CAD modeling, tooling designs, and drawing review.',
  },
  {
    id: 'faq-3',
    category: 'CAD & PLM Systems',
    question: 'Which CAD and PLM software platforms do you support?',
    answer: 'We have extensive experience with Creo, Siemens NX, SolidWorks, AutoCAD, Windchill, and Teamcenter.',
    q: 'Which CAD and PLM software platforms do you support?',
    a: 'We have extensive experience with Creo, Siemens NX, SolidWorks, AutoCAD, Windchill, and Teamcenter.',
  },
];

export const EQUIPMENT_ITEMS: EquipmentItem[] = [
  {
    id: 'cmm-inspection',
    name: 'Precision Metrology & GD&T Inspection',
    category: 'Inspection & Metrology',
    type: 'Inspection',
    specs: 'ASME Y14.5 / ISO Compliant',
    precision: '±0.001 mm',
    description: 'Comprehensive dimensional verification and drawing audits.',
    image: 'https://images.unsplash.com/photo-1581092162384-8987c1d64718?auto=format&fit=crop&w=800&q=80',
  },
];

export const SOFTWARE_TOOLS = [
  { name: 'Creo', category: 'Parametric CAD', color: '#77B800', badge: 'Parametric CAD', description: 'Advanced mechanical & die tooling design' },
  { name: 'Siemens NX', category: 'High-End CAD', color: '#009999', badge: 'Enterprise CAD', description: 'Complex surfacing & mold wizard' },
  { name: 'SolidWorks', category: '3D CAD Design', color: '#E2231A', badge: 'Core CAD', description: 'Product design & assembly modeling' },
  { name: 'AutoCAD', category: '2D Drafting', color: '#E51937', badge: 'Drafting', description: '2D manufacturing prints & schematics' },
  { name: 'Windchill', category: 'PLM System', color: '#005493', badge: 'PLM System', description: 'Engineering change & CAD data management' },
  { name: 'Teamcenter', category: 'Enterprise PLM', color: '#006699', badge: 'Enterprise PLM', description: 'Automotive OEM data lifecycle' },
];
