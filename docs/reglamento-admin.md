# Reglamento administrable

El módulo `/admin/reglamento` administra `camp_rules` y `camp_rules_settings` en Supabase. Las escrituras pasan por `/api/admin/reglamento` y requieren sesión administrativa. La página pública `/reglamento` solo presenta reglas activas ordenadas por `sort_order`. La inscripción conserva su aceptación obligatoria y ofrece acceso al reglamento en una pestaña nueva cuando `show_in_registration` está activo.
