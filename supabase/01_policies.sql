-- Enable RLS
alter table listings enable row level security;

-- Public can read active listings
create policy "read active" on listings
for select using (status = 'active');

-- Owners can read their own pending/active
create policy "owner read" on listings
for select using (auth.uid() = user_id);

-- Owners can insert their own listing (user_id must match auth.uid())
create policy "owner insert" on listings
for insert with check (auth.uid() = user_id);

-- Owners can update their own listing
create policy "owner update" on listings
for update using (auth.uid() = user_id);

-- Admin service role can update anything (done via service key in server routes)
-- No explicit policy needed for service role; it bypasses RLS.
