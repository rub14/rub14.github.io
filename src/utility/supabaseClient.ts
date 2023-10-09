import { createClient } from "@refinedev/supabase";

//const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
//const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_KEY;
const SUPABASE_URL="https://jjltjneewrfwbnveluwp.supabase.co";
const SUPABASE_KEY="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpqbHRqbmVld3Jmd2JudmVsdXdwIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTU2NzI1OTQsImV4cCI6MjAxMTI0ODU5NH0.ao-L0AKSAcegtTQsn8O-Cp1Vp2hR4EIBgJgY2fXqvsI"

export const supabaseClient = createClient(SUPABASE_URL, SUPABASE_KEY, {
  db: {
    schema: "public",
  },
  auth: {
    persistSession: true,
  },
});
