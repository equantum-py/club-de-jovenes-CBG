create extension if not exists pgcrypto;

create table if not exists public.cbg_registrations (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  payload jsonb not null
);

alter table public.cbg_registrations enable row level security;

revoke all on table public.cbg_registrations from anon, authenticated;
grant select, insert on table public.cbg_registrations to service_role;

create index if not exists cbg_registrations_created_at_idx
  on public.cbg_registrations (created_at desc);
