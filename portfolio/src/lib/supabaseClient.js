import { createClient } from '@supabase/supabase-js'

// console.log('URL:', import.meta.env.VITE_SUPABASE_URL)
// console.log('KEY:', import.meta.env.VITE_SUPABASE_ANON_KEY)

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase