import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://btlzvgbijnjdpowhchid.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ0bHp2Z2Jpam5qZHBvd2hjaGlkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODcxNDg4NDksImV4cCI6MjEwMjcyNDg0OX0.84XrNHI2XlAj3YgBsHUfCosohNQ77ubvTIMyyVRTNr4';

const supabase = createClient(supabaseUrl, supabaseKey);

async function sync() {
  const { data, error } = await supabase
    .from('website_settings')
    .select('*')
    .eq('setting_key', 'page_content')
    .single();

  if (error) {
    console.log('Error fetching page_content:', error);
    return;
  }

  const updatedCadItems = [
    {
      id: 'cad-1',
      name: 'PTC Creo Parametric',
      category: 'Product & Tooling Design',
      desc: 'Advanced surface modeling, mechanism design, complex assemblies, and associative 2D drawing generation.',
      badge: 'PRODUCT & TOOLING DESIGN',
      logo_url: '/images/logos/creo.png',
    },
    {
      id: 'cad-2',
      name: 'Siemens NX',
      category: 'Automotive & Tooling',
      desc: 'Complex injection mold design, parting line splits, automotive components, and multi-axis CAD data generation.',
      badge: 'AUTOMOTIVE & TOOLING',
      logo_url: '/images/logos/siemens_nx.png',
    },
    {
      id: 'cad-3',
      name: 'Dassault SolidWorks',
      category: 'Mechanical Design',
      desc: 'Mechanical design, sheet metal enclosures, weldments, ASME Y14.5 GD&T drafting, and integrated BOM control.',
      badge: 'MECHANICAL DESIGN',
      logo_url: '/images/logos/solidworks.png',
    },
    {
      id: 'cad-4',
      name: 'Autodesk AutoCAD',
      category: '2D Documentation',
      desc: 'Precision 2D engineering drafting, geometric tolerance layout, and legacy DWG translation.',
      badge: '2D DOCUMENTATION',
      logo_url: '/images/logos/autocad.png',
    },
  ];

  const updatedAbout = {
    ...data.setting_value.about,
    hero_title: 'Practical Mechanical Design Experience.',
    hero_desc: 'AG Vertex is a Windsor, Ontario-based mechanical design consultancy. Our experienced team supports product development, tooling, 3D CAD, drawings, GD&T, DFM/DFA, automotive drawing review and supplier coordination.',
    pillar_2_desc: 'To be a trusted mechanical design partner for manufacturers, tooling companies, and automotive suppliers across Canada.',
    exp_3_title: 'AUTOMOTIVE COMPONENTS',
    exp_3_img: '/images/control_arm_component.png',
    cad_items: updatedCadItems
  };

  const updatedContent = {
    ...data.setting_value,
    about: updatedAbout
  };

  const { error: updateError } = await supabase
    .from('website_settings')
    .update({ setting_value: updatedContent })
    .eq('setting_key', 'page_content');

  if (updateError) {
    console.error('Failed to update Supabase:', updateError);
  } else {
    console.log('Successfully updated Supabase page_content with Callout 12 CAD badges!');
  }
}

sync();
