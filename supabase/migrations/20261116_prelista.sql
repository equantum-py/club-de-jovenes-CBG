-- Prelista independiente de inscripciones confirmadas.
create table if not exists public.prelista (
 id uuid primary key default gen_random_uuid(),
 nombre text not null,
 apellido text not null,
 iglesia text not null default '',
 sexo text not null default '',
 monto_pagado numeric(12,2) not null default 0 check (monto_pagado >= 0),
 estado text not null default 'Pendiente',
 observaciones text not null default '',
 created_at timestamptz not null default now(),
 updated_at timestamptz not null default now()
);
create index if not exists prelista_iglesia_idx on public.prelista (iglesia);
alter table public.prelista enable row level security;
revoke all on public.prelista from anon, authenticated;
