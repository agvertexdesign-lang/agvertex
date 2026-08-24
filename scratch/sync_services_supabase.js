import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://btlzvgbijnjdpowhchid.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ0bHp2Z2Jpam5qZHBvd2hjaGlkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODcxNDg4NDksImV4cCI6MjEwMjcyNDg0OX0.84XrNHI2XlAj3YgBsHUfCosohNQ77ubvTIMyyVRTNr4';

const supabase = createClient(supabaseUrl, supabaseKey);

async function syncServices() {
  console.log('Syncing services table in Supabase...');

  // Update Service 3: Drawings, GD&T & BOMs
  const { error: err3 } = await supabase
    .from('services')
    .update({
      short_desc: 'Manufacturing drawings, ASME Y14.5 GD&T, structured BOMs, and automotive drawing review.',
      full_desc: 'Clear 2D manufacturing prints with precise Geometric Dimensioning and Tolerancing (GD&T) application, datum reference frames, tolerance stack-up definition, structured Bills of Materials, and automotive drawing review.',
      image_url: '/services/drawings_gdt.png'
    })
    .ilike('title', '%Drawings%');

  if (err3) console.error('Error updating service 3:', err3);
  else console.log('Service 3 updated in Supabase!');

  // Update Service 4: DFM/DFA & Supplier Coordination
  const { error: err4 } = await supabase
    .from('services')
    .update({
      short_desc: 'DFM/DFA reviews, supplier technical coordination, prototype fitment support, and engineering change management.',
      full_desc: 'Design for Manufacturability and Assembly (DFM/DFA) design reviews, supplier technical coordination, prototype fitment support, and engineering change management.'
    })
    .ilike('title', '%DFM%');

  if (err4) console.error('Error updating service 4:', err4);
  else console.log('Service 4 updated in Supabase!');
}

syncServices();
