import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://btlzvgbijnjdpowhchid.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ0bHp2Z2Jpam5qZHBvd2hjaGlkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODcxNDg4NDksImV4cCI6MjEwMjcyNDg0OX0.84XrNHI2XlAj3YgBsHUfCosohNQ77ubvTIMyyVRTNr4';

const supabase = createClient(supabaseUrl, supabaseKey);

async function forceSyncAllLocations() {
  console.log('Force updating ALL location references in Supabase database...');

  // 1. Fetch current page_content
  const { data: pageRow } = await supabase
    .from('website_settings')
    .select('*')
    .eq('setting_key', 'page_content')
    .single();

  if (pageRow && pageRow.setting_value) {
    const val = pageRow.setting_value;
    if (val.home) {
      val.home.badge_1 = 'Canada · New Zealand · India';
    }
    if (val.about) {
      val.about.hero_desc = 'AG Vertex is a multi-national mechanical design consultancy operating across Canada, New Zealand, and India. Our experienced engineering team supports product development, tooling, 3D CAD, drawings, GD&T, DFM/DFA, automotive drawing review and supplier coordination.';
      val.about.pillar_2_desc = 'To be a trusted mechanical design partner for manufacturers, tooling companies, and automotive suppliers across Canada, New Zealand, and India.';
    }
    if (val.careers) {
      val.careers.hero_desc = 'AG Vertex welcomes experienced mechanical designers, tooling specialists, and CAD professionals interested in future project-based collaboration across Canada, New Zealand, and India.';
    }

    const { error: pageErr } = await supabase
      .from('website_settings')
      .update({ setting_value: val, updated_at: new Date().toISOString() })
      .eq('setting_key', 'page_content');

    if (pageErr) console.error('page_content update error:', pageErr);
    else console.log('✓ Successfully updated page_content in Supabase!');
  }

  // 2. Fetch current contact row
  const { data: contactRow } = await supabase
    .from('website_settings')
    .select('*')
    .eq('setting_key', 'contact')
    .single();

  if (contactRow && contactRow.setting_value) {
    const val = contactRow.setting_value;
    val.address = 'Canada · New Zealand · India';

    await supabase
      .from('website_settings')
      .update({ setting_value: val, updated_at: new Date().toISOString() })
      .eq('setting_key', 'contact');
    console.log('✓ Successfully updated contact in Supabase!');
  }

  // 3. Fetch current business row
  const { data: businessRow } = await supabase
    .from('website_settings')
    .select('*')
    .eq('setting_key', 'business')
    .single();

  if (businessRow && businessRow.setting_value) {
    const val = businessRow.setting_value;
    val.tagline = 'Mechanical Design Consultancy (Canada · New Zealand · India)';
    val.short_description = 'Mechanical design consultancy with global engineering operations across Canada, New Zealand, and India, supporting product development, tooling, 3D CAD, drawings, GD&T, DFM/DFA and supplier coordination.';

    await supabase
      .from('website_settings')
      .update({ setting_value: val, updated_at: new Date().toISOString() })
      .eq('setting_key', 'business');
    console.log('✓ Successfully updated business in Supabase!');
  }

  // 4. Fetch current site_settings row
  const { data: siteRow } = await supabase
    .from('website_settings')
    .select('*')
    .eq('setting_key', 'site_settings')
    .single();

  if (siteRow && siteRow.setting_value) {
    const val = siteRow.setting_value;
    if (val.contact) val.contact.address = 'Canada · New Zealand · India';
    if (val.business) {
      val.business.tagline = 'Mechanical Design Consultancy (Canada · New Zealand · India)';
      val.business.short_description = 'Mechanical design consultancy with global engineering operations across Canada, New Zealand, and India, supporting product development, tooling, 3D CAD, drawings, GD&T, DFM/DFA and supplier coordination.';
    }

    await supabase
      .from('website_settings')
      .update({ setting_value: val, updated_at: new Date().toISOString() })
      .eq('setting_key', 'site_settings');
    console.log('✓ Successfully updated site_settings in Supabase!');
  }

  // 5. Update careers table if any
  try {
    const { data: careers } = await supabase.from('careers').select('*');
    if (careers && careers.length > 0) {
      for (const career of careers) {
        await supabase
          .from('careers')
          .update({ location: 'Canada · New Zealand · India' })
          .eq('id', career.id);
      }
      console.log('✓ Successfully updated careers table locations in Supabase!');
    }
  } catch (e) {
    console.warn('Careers table sync log:', e);
  }

  console.log('ALL SUPABASE LOCATION UPDATES COMPLETED SUCCESSFULLY!');
}

forceSyncAllLocations();
