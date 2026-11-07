# Conferencia de Jóvenes 2026 · Ruleta

Sección **independiente** dentro de la web existente de Club de Jóvenes CBG.

- Registro público por QR: `/conferencia/registro`.
- Ruleta y participantes: `/admin/conferencia`, requiere el **inicio de sesión administrativo existente**.
- No necesita contratar otro servicio. Usa las variables ya configuradas de la web: `SUPABASE_URL` y `SUPABASE_SERVICE_ROLE_KEY`.
- Los jóvenes completan **nombre, apellido e iglesia**, nada más.
- El sorteo selecciona y marca al ganador atómicamente en PostgreSQL, sin repetir.
- Los registros nuevos aparecen en el panel cada 4 segundos.
- Reiniciar habilita otra ronda, sin eliminar datos.

## Preparación (obligatoria antes de usar)

1. Abrir en Supabase **el proyecto que realmente está conectado a Vercel `campamentocbg`**.
2. Ejecutar en ese proyecto únicamente el archivo `docs/conferencia-ruleta-20261107.sql`. **No** ejecutarlo sobre `rqisyolaffwktxhjwpqq`: esa es una base compartida de pruebas distinta.
3. Fusionar el cambio a `main` y confirmar que la compilación de Vercel termine en READY.
4. Probar dos inscripciones desde celulares, verificar que aparecen en el panel, girar dos veces y comprobar que no se repite el ganador.
5. Generar un QR con la URL pública `https://graciacamp.vercel.app/conferencia/registro` (confirmar primero que sea el dominio desplegado).
6. Al finalizar, borrar la tabla o eliminar sus datos desde Supabase si ya no son necesarios.

## Protección

La tabla está protegida por RLS, sin permisos para `anon` ni `authenticated`. Solo el servidor utiliza la credencial service_role. La lista y las funciones del sorteo exigen la sesión administrativa existente. No se tocan las tablas de inscripciones ni otras dinámicas.

**Estado:** Sección implementada en rama. SQL listo, pero aún **no aplicado ni verificado en la base conectada a producción**.
