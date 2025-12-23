-- Create Artworks Table
create table public.artworks (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text unique not null,
  description text,
  media_url text not null,
  media_type text check (media_type in ('image','video')),
  price integer not null,
  currency text default 'IDR',
  status text check (status in ('available','sold')) default 'available',
  visibility text check (visibility in ('public','private')) default 'public',
  author_id uuid references auth.users(id),
  created_at timestamptz default now()
);

-- Enable RLS
alter table public.artworks enable row level security;

-- Policies for Artworks
create policy "Public artworks are viewable by everyone"
  on public.artworks for select
  using ( visibility = 'public' );

create policy "Admins can do everything"
  on public.artworks for all
  using ( auth.role() = 'authenticated' );

-- Storage Buckets (Execute this in Supabase Dashboard or via API if CLI not fully configured)
-- insert into storage.buckets (id, name, public) values ('artworks-public', 'artworks-public', true);
-- insert into storage.buckets (id, name, public) values ('artworks-private', 'artworks-private', false);

-- Storage Policies
-- create policy "Public Access" on storage.objects for select using ( bucket_id = 'artworks-public' );
-- create policy "Auth Upload" on storage.objects for insert using ( auth.role() = 'authenticated' );
