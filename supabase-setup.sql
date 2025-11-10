-- Create the au_files table in Supabase
-- Run this in your Supabase SQL Editor
-- Go to: https://supabase.com/dashboard > Your Project > SQL Editor > New Query

CREATE TABLE IF NOT EXISTS public.au_files (
  id TEXT NOT NULL,
  friend_code TEXT NOT NULL,
  puid TEXT NOT NULL PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()) NOT NULL
);

-- Create an index on id for faster searches
CREATE INDEX IF NOT EXISTS idx_au_files_id ON public.au_files(id);

-- Create an index on friend_code for faster searches
CREATE INDEX IF NOT EXISTS idx_au_files_friend_code ON public.au_files(friend_code);

-- Optional: Enable Row Level Security (RLS) if you want to restrict access
-- ALTER TABLE au_files ENABLE ROW LEVEL SECURITY;

-- If RLS is enabled, create a policy to allow all operations (since we're using service role key)
-- CREATE POLICY "Allow all operations" ON au_files FOR ALL USING (true) WITH CHECK (true);

