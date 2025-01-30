import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://qvclrjogqlwqaqkcjayq.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF2Y2xyam9ncWx3cWFxa2NqYXlxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzcwMDY1MjUsImV4cCI6MjA1MjU4MjUyNX0.ww1iUk1C2vvbkdP8SqueckOlemK1ByfNDa0ja5EoxE4'

export default defineNuxtPlugin(() => {
  const supabase = createClient(supabaseUrl, supabaseKey, {
    auth: {
      persistSession: true,
      autoRefreshToken: true
    }
  })

  return {
    provide: {
      supabase: supabase
    }
  }
})