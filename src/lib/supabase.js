import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://hsczyjjpggsbuhvwtgac.supabase.co'
const supabaseServiceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhzY3p5ampwZ2dzYnVodnd0Z2FjIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2Mjc4NjY0MSwiZXhwIjoyMDc4MzYyNjQxfQ.rr8Ww5QWvSWkI03mNb6629kYNoqJxfqB2QdqQKpZAks'

export const supabase = createClient(supabaseUrl, supabaseServiceKey)

