# Database Setup Instructions

## Step 1: Create the Table in Supabase

1. Go to your Supabase dashboard: https://supabase.com/dashboard
2. Select your project: `hsczyjjpggsbuhvwtgac`
3. Click on **"SQL Editor"** in the left sidebar
4. Click **"New query"**
5. Copy and paste the entire contents of `supabase-setup.sql` into the editor
6. Click **"Run"** (or press Ctrl+Enter)

## Step 2: Verify the Table

1. Go to **"Table Editor"** in the left sidebar
2. You should see `au_files` in the list of tables
3. Click on it to verify it has the columns:
   - `id` (text)
   - `friend_code` (text)
   - `puid` (text, primary key)
   - `created_at` (timestamp)

## Step 3: Test

Once the table is created, try adding a record through the website again.

---

## Alternative: Quick SQL Command

If you prefer, you can run this single command in the SQL Editor:

```sql
CREATE TABLE IF NOT EXISTS public.au_files (
  id TEXT NOT NULL,
  friend_code TEXT NOT NULL,
  puid TEXT NOT NULL PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()) NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_au_files_id ON public.au_files(id);
CREATE INDEX IF NOT EXISTS idx_au_files_friend_code ON public.au_files(friend_code);
```

