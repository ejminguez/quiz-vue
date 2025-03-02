import { createClient } from '@supabase/supabase-js'

// Create a single supabase client for interacting with your database
export const supabase = createClient('https://bulimbjsqruxibydekqp.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ1bGltYmpzcXJ1eGlieWRla3FwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA4NDM2MDYsImV4cCI6MjA1NjQxOTYwNn0.9eF9IMOm6r03q9yOVCBPslfki9_V_dpX6o9Hud6Jx2Q')