import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://btlzvgbijnjdpowhchid.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ0bHp2Z2Jpam5qZHBvd2hjaGlkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODcxNDg4NDksImV4cCI6MjEwMjcyNDg0OX0.84XrNHI2XlAj3YgBsHUfCosohNQ77ubvTIMyyVRTNr4';

const supabase = createClient(supabaseUrl, supabaseKey);

async function syncEmail() {
  console.log('Syncing contact email in Supabase to agvertexdesign@gmail.com...');

  const { data, error } = await supabase
    .from('website_settings')
    .select('*')
    .eq('setting_key', 'site_settings')
    .single();

  if (error && error.code !== 'PGRST116') {
    console.error('Fetch error:', error);
  }

  const existingValue = data?.setting_value || {};
  const updatedValue = {
    ...existingValue,
    contact: {
      ...existingValue.contact,
      email: 'agvertexdesign@gmail.com',
      contact_form_email: 'agvertexdesign@gmail.com'
    }
  };

  const { error: updateError } = await supabase
    .from('website_settings')
    .upsert({
      setting_key: 'site_settings',
      setting_value: updatedValue
    }, { onConflict: 'setting_key' });

  if (updateError) {
    console.error('Update error:', updateError);
  } else {
    console.log('Successfully updated Supabase contact email to agvertexdesign@gmail.com!');
  }
}

syncEmail();
