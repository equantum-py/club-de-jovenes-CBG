-- Solo para el proyecto Supabase conectado a campamentocbg.
-- NO ejecutar sobre la base de eQuantum Equipo ni ninguna otra base.
-- La tabla es independiente de las inscripciones de Gracia Camp.
create table if not exists public.conferencia_ruleta_2026 (
  id uuid primary key default gen_random_uuid(),
  nombre text not null check (char_length(btrim(nombre)) between 2 and 60),
  apellido text not null check (char_length(btrim(apellido)) between 2 and 60),
  iglesia text not null check (char_length(btrim(iglesia)) between 2 and 100),
  sorteado boolean not null default false,
  created_at timestamptz not null default now(),
  sorteado_at timestamptz
);
create unique index if not exists conferencia_ruleta_2026_unicos
  on public.conferencia_ruleta_2026(lower(btrim(nombre)), lower(btrim(apellido)), lower(btrim(iglesia)));
alter table public.conferencia_ruleta_2026 enable row level security;
revoke all on public.conferencia_ruleta_2026 from public, anon, authenticated;

-- Este RPC se invoca exclusivamente desde una API server-side con service_role.
create or replace function public.conferencia_elegir_2026()
returns jsonb language plpgsql security invoker set search_path = '' as $$
declare chosen public.conferencia_ruleta_2026%rowtype;
begin
  perform pg_catalog.pg_advisory_xact_lock(7112026);
  select * into chosen
  from public.conferencia_ruleta_2026
  where sorteado = false order by random() limit 1 for update;
  if not found then return null; end if;
  update public.conferencia_ruleta_2026
    set sorteado = true, sorteado_at = now()
    where id = chosen.id;
  return jsonb_build_object('id', chosen.id, 'nombre', chosen.nombre,
    'apellido', chosen.apellido, 'iglesia', chosen.iglesia,
    'sorteado', true, 'created_at', chosen.created_at);
end; $$;

create or replace function public.conferencia_reiniciar_2026()
returns void language sql security invoker set search_path = '' as $$
  update public.conferencia_ruleta_2026
  set sorteado = false, sorteado_at = null
  where sorteado = true;
$$;

revoke all on function public.conferencia_elegir_2026() from public, anon, authenticated;
revoke all on function public.conferencia_reiniciar_2026() from public, anon, authenticated;
grant execute on function public.conferencia_elegir_2026() to service_role;
grant execute on function public.conferencia_reiniciar_2026() to service_role;
grant select, insert, update on public.conferencia_ruleta_2026 to service_role;
