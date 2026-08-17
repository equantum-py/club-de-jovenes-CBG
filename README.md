# Gracia Camp 2026

Sitio oficial de información e inscripción del Club de Jóvenes CBG, construido con Next.js y TypeScript.

## Desarrollo local

1. Usá Node.js 20 y ejecutá `npm ci`.
2. Copiá `.env.example` como `.env.local` y completá las variables sin compartir sus valores.
3. Ejecutá `npm run dev` y abrí `http://localhost:3000`.
4. Para validar: `npm run lint`, `npm run typecheck` y `npm run build`.

## Variables de entorno

- `NEXT_PUBLIC_SITE_URL`: URL oficial (en producción, `https://campamentocbg.vercel.app`).
- `NEXT_PUBLIC_TURNSTILE_SITE_KEY` y `TURNSTILE_SECRET_KEY`: claves pública y secreta de Cloudflare Turnstile.
- `GOOGLE_CLIENT_EMAIL`, `GOOGLE_PRIVATE_KEY` y `GOOGLE_SHEET_ID`: cuenta de servicio y hoja de Google.

Configurá dos widgets de Turnstile (localhost y dominio/preview, según corresponda). Nunca guardes claves reales en Git.

## Google Sheets

Compartí la hoja con `GOOGLE_CLIENT_EMAIL` como Editor. La pestaña debe llamarse exactamente `Registros`. La fila 1 debe tener estas 23 columnas, en este orden:

`Fecha`, `Nombre`, `Apellido`, `Edad`, `Teléfono`, `Cédula`, `Sexo`, `Iglesia`, `Invitado`, `Invitado por`, `Responsable`, `Teléfono responsable`, `Alergias`, `Medicamentos`, `Enfermedad de base`, `Contacto emergencia`, `Teléfono emergencia`, `Forma de pago`, `Observaciones`, `Acepta privacidad`, `Acepta reglamento`, `Autorización responsable`, `Código`.

Las primeras 19 columnas conservan el orden anterior. Las cuatro nuevas se agregan al final, por lo que no se pierden registros existentes. La API escribe como `RAW`, limpia caracteres de control, neutraliza fórmulas, valida datos y busca cédulas duplicadas antes de agregar una fila.

Protegé la cuenta de servicio con el menor acceso posible, rotá la clave si se comparte por error, activá la verificación en dos pasos de las cuentas administradoras y revisá periódicamente quién tiene acceso a la hoja.

## Flujo de publicación

Cada Pull Request hacia `main` ejecuta instalación, lint, TypeScript y build, y Vercel genera una preview si la integración está activa. Revisá la preview y las pruebas antes de aprobar. Producción se despliega únicamente después de revisión y merge manual; nunca desde una rama de trabajo.

## Validaciones y privacidad

El cliente y el servidor validan edad (10–100), nombres, teléfonos, cédula, opciones permitidas, campos condicionales, emergencia, longitudes y consentimientos. El servidor además comprueba origen, JSON, tamaño, honeypot, Turnstile, frecuencia por IP y duplicados. Consultá `/privacidad` para el tratamiento de datos y menores.
