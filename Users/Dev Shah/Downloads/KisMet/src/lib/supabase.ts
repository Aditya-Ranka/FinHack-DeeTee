import { createClient } from '@supabase/supabase-js';
import { Database } from './database.types';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient<Database>(supabaseUrl, supabaseKey);

export type Profile = Database['public']['Tables']['profiles']['Row'];
export type Match = Database['public']['Tables']['matches']['Row'];
export type Message = Database['public']['Tables']['messages']['Row'];
export type Swipe = Database['public']['Tables']['swipes']['Row'];