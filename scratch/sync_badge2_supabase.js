import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://btlzvgbijnjdpowhchid.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ0bHp2Z2Jpam5qZHBvd2hjaGlkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODcxNDg4NDksImV4cCI6MjEwMjcyNDg0OX0.84XrNHI2XlAj3YgBsHUfCosohNQ77ubvTIMyyVRTNr4';

const supabase = createClient(supabaseUrl, supabaseKey);

async function syncBadge2() {
  console.log('Fetching page_content from Supabase...');
  const { data: pageRow, error: fetchErr } = await supabase
    .from('website_settings')
    .select('*')
    .eq('setting_key', 'page_content')
    .single();

  if (fetchErr) {
    console.error('Fetch error:', fetchErr);
    return;
  }

  if (pageRow && pageRow.setting_value) {
    const val = pageRow.setting_value;
    console.log('Current home page settings:', val.home);

    if (val.home) {
      val.home.badge_1 = 'Canada · New Zealand · India';
      val.home.badge_2 = '15+ Years of Mechanical Design Experience';
    }

    const { error: updateErr } = await supabase
      .from('website_settings')
      .update({ setting_value: val, updated_at: new Date().toISOString() })
      .eq('setting_key', 'page_content');

    if (updateErr) {
      console.error('Update error:', updateErr);
    } else {
      console.log('SUCCESS! Updated home.badge_2 in Supabase to: "15+ Years of Mechanical Design Experience"');
    }
  }
}

syncBadge2();
