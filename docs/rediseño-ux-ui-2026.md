# Rediseño UX/UI 2026 — Club de Jóvenes CBG

## Diagnóstico inicial

Se partió de una interfaz funcional pero visualmente fragmentada: muchas cajas, sombras, glassmorphism, colores hardcodeados y tarjetas repetidas. El detalle completo quedó documentado en `docs/diagnostico-visual-ux-ui.md`.

## Sistema visual

Se definió un sistema editorial cálido: fondos continuos, verde institucional, crema, acentos dorados sobrios, separadores finos, números editoriales e imágenes protagonistas.

## Paleta final

La paleta final está centralizada en `tailwind.config.js` con `brand.forest`, `forestDark`, `forestLight`, `sage`, `sageSoft`, `gold`, `cream`, `warmWhite`, `ink`, `muted` y `border`.

## Tipografía

Se redujo el uppercase a etiquetas pequeñas. Los títulos usan pesos semibold, line-height controlado y escalas claras. Los textos largos tienen ancho y ritmo editorial.

## Header

Se rediseñó con logo más presente, navegación en cápsula discreta, CTA claro, countdown integrado y menú mobile accesible con transición suave.

## Home

La ruta raíz conserva la redirección a `/campamento`. La página de campamento funciona como home visual con hero editorial de dos columnas, CTA, foto/banner y countdown integrado.

## Bienvenida

Se reemplazó la grilla de tarjetas por una introducción amplia, objetivo principal destacado, cita editorial y lista numerada con separadores.

## Campamento

Se rediseñaron hero, tema central, remera, ubicación, video, CTA final, footer y acciones mobile con composición abierta, menos bordes y mayor continuidad.

## Registro

Se mantuvo exactamente la lógica, nombres de campos, payload y endpoint. Visualmente se migró a fondo claro, secciones abiertas, divisores, inputs cómodos y condicionales suaves.

## Reglamento

Se transformó de tarjetas repetidas a carta introductoria y lista editorial numerada en una/dos columnas.

## Footer

Se simplificó la estructura a identidad, navegación, contacto/WhatsApp y copyright, eliminando duplicación visual.

## Mobile

El rediseño es mobile-first: contenido apilado, CTAs de altura táctil, sticky actions en campamento, menú accesible y grids que pasan a columnas en desktop.

## Accesibilidad

Se conservaron labels, `role="alert"`, foco visible y `prefers-reduced-motion`. Se mejoró el menú mobile con estado ARIA y cierre al navegar.

## Componentes creados

- `Container`
- `Eyebrow`
- `SectionHeader`
- `ButtonLink`

## Componentes modificados

- `Header`
- `Countdown`
- Campos visuales del formulario en `registro/page.tsx`

## Archivos modificados

- `tailwind.config.js`
- `src/components/Header.tsx`
- `src/components/Countdown.tsx`
- `src/components/ui/design.tsx`
- `src/app/campamento/page.tsx`
- `src/app/bienvenida/page.tsx`
- `src/app/reglamento/page.tsx`
- `src/app/registro/page.tsx`
- `docs/diagnostico-visual-ux-ui.md`
- `docs/design-system.md`
- `docs/rediseño-ux-ui-2026.md`

## Pruebas ejecutadas

- `npm install`
- `npm run lint`
- `npx tsc --noEmit`
- `npm run build`
- `npm run start` con comprobación de rutas por `curl`.

## Pendientes

- Validación visual con dispositivos reales en todos los anchos solicitados.
- Captura/regresión visual automatizada futura con Playwright.
- Validación final de envío a Google Sheets con credenciales reales en Vercel.
