import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://btlzvgbijnjdpowhchid.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ0bHp2Z2Jpam5qZHBvd2hjaGlkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODcxNDg4NDksImV4cCI6MjEwMjcyNDg0OX0.84XrNHI2XlAj3YgBsHUfCosohNQ77ubvTIMyyVRTNr4';

const supabase = createClient(supabaseUrl, supabaseKey);

async function syncLocations() {
  console.log('Syncing locations in Supabase to Canada · New Zealand · India...');

  // 1. Update site_settings
  const { data: settingsData } = await supabase
    .from('website_settings')
    .select('*')
    .eq('setting_key', 'site_settings')
    .single();

  const existingSettings = settingsData?.setting_value || {};
  const updatedSettings = {
    ...existingSettings,
    contact: {
      ...existingSettings.contact,
      address: 'Canada · New Zealand · India',
    },
    business: {
      ...existingSettings.business,
      tagline: 'Mechanical Design Consultancy (Canada · New Zealand · India)',
      short_description: 'Mechanical design consultancy with global engineering operations across Canada, New Zealand, and India, supporting product development, tooling, 3D CAD, drawings, GD&T, DFM/DFA and supplier coordination.',
      business_hours: 'Monday – Friday, 9 AM – 5 PM EST / IST / NZST',
    }
  };

  await supabase
    .from('website_settings')
    .upsert({
      setting_key: 'site_settings',
      setting_value: updatedSettings
    });

  // 2. Update page_content
  const { data: pageData } = await supabase
    .from('website_settings')
    .select('*')
    .eq('setting_key', 'page_content')
    .single();

  const existingPage = pageData?.setting_value || {};
  const updatedPage = {
    ...existingPage,
    home: {
      ...existingPage.home,
      badge_1: 'Canada · New Zealand · India',
    },
    about: {
      ...existingPage.about,
      hero_desc: 'AG Vertex is a multi-national mechanical design consultancy operating across Canada, New Zealand, and India. Our experienced engineering team supports product development, tooling, 3D CAD, drawings, GD&T, DFM/DFA, automotive drawing review and supplier coordination.',
      pillar_2_desc: 'To be a trusted mechanical design partner for manufacturers, tooling companies, and automotive suppliers across Canada, New Zealand, and India.',
    },
    careers: {
      ...existingPage.careers,
      hero_desc: 'AG Vertex welcomes experienced mechanical designers, tooling specialists, and CAD professionals interested in future project-based collaboration across Canada, New Zealand, and India.',
    }
  };

  await supabase
    .from('website_settings')
    .upsert({
      setting_key: 'page_content',
      setting_value: updatedPage
    });

  console.log('Successfully synced locations in Supabase to Canada · New Zealand · India!');
}

syncLocations();
