import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const supabase = (supabaseUrl && supabaseAnonKey && supabaseUrl.startsWith('http'))
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

export async function uploadImage(file: File, bucket: string, folder: string): Promise<string | null> {
  if (!supabase) return null;
  
  const fileExt = file.name.split('.').pop();
  const fileName = `${folder}/${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
  
  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(fileName, file);
  
  if (error) {
    console.error('Upload error:', error);
    return null;
  }
  
  const { data: { publicUrl } } = supabase.storage
    .from(bucket)
    .getPublicUrl(fileName);
  
  return publicUrl;
}

export async function getCounts() {
  if (!supabase) return null;
  
  const today = new Date(new Date().setHours(0, 0, 0, 0)).toISOString();
  
  const [members, work, evals, contacts] = await Promise.all([
    supabase.from('team_members').select('*', { count: 'exact' }),
    supabase.from('work_items').select('*', { count: 'exact' }),
    supabase.from('client_evaluations').select('*', { count: 'exact' }),
    supabase.from('contacts')
      .select('*', { count: 'exact' })
      .gte('created_at', today)
  ]);
  
  return {
    members: members.count || 0,
    workItems: work.count || 0,
    evaluations: evals.count || 0,
    todayContacts: contacts.count || 0
  };
}
