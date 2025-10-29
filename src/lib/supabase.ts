import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface PortfolioImage {
  id: string;
  image_url: string;
  display_order: number;
  created_at: string;
}

export interface InstagramReview {
  id: string;
  url: string;
  name: string;
  display_order: number;
  created_at: string;
}

export interface ContactSubmission {
  id: string;
  name: string;
  phone: string;
  comment: string;
  status: 'new' | 'contacted' | 'completed';
  created_at: string;
  updated_at: string;
}