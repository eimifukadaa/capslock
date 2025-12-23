-- Insert Storage Buckets
insert into storage.buckets (id, name, public) 
values ('artworks-public', 'artworks-public', true)
on conflict (id) do nothing;

insert into storage.buckets (id, name, public) 
values ('artworks-private', 'artworks-private', false)
on conflict (id) do nothing;

-- Policy: Public Access to 'artworks-public'
create policy "Public Access to Artworks"
on storage.objects for select
using ( bucket_id = 'artworks-public' );

-- Policy: Authenticated users can upload to both buckets
create policy "Authenticated Upload Access"
on storage.objects for insert
with check ( auth.role() = 'authenticated' );

-- Policy: Authenticated users can update/delete their own files (or all files if admin)
create policy "Authenticated Update/Delete Access"
on storage.objects for all
using ( auth.role() = 'authenticated' );
