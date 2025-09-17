-- Users (optional basic profile)
create table if not exists profiles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid unique,
  username text,
  created_at timestamp with time zone default now()
);

-- Listings
create table if not exists listings (
  id bigserial primary key,
  user_id uuid,
  title text not null,
  description text,
  price numeric(12,2) not null default 0,
  city text,
  thumbnail_url text,
  slug text unique not null,
  status text not null default 'pending', -- pending | active | expired
  created_at timestamp with time zone default now()
);

-- Simple index
create index if not exists listings_status_idx on listings(status);
create index if not exists listings_slug_idx on listings(slug);
