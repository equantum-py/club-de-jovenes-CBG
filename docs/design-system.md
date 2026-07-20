# Design system — Gracia Camp 2026

## Colores

La paleta vive en `tailwind.config.js` bajo `brand`:

- `forest`: verde institucional principal.
- `forestDark`: fondo institucional profundo.
- `forestLight`: hover/variante de forest.
- `sage`: acento secundario sobrio.
- `sageSoft`: superficie suave para estados informativos.
- `gold`: acento editorial, reservado para números, líneas y detalles.
- `cream`: fondo cálido de transición.
- `warmWhite`: fondo principal cálido.
- `ink`: texto principal.
- `muted`: texto secundario.
- `border`: separadores suaves.

## Tipografía

- H1: grande, semibold, line-height cerrado, sin uppercase.
- H2: 3xl/5xl, semibold, editorial.
- H3: xl/2xl, semibold.
- Eyebrow: pequeño, color gold, tracking moderado.
- Body: 16-20 px, line-height amplio.
- Labels: visibles, semibold, 14 px.

## Spacing

- Secciones: `py-16` mobile/tablet y `lg:py-24` desktop cuando corresponde.
- Contenedor: `max-w-7xl`, padding horizontal 20/24/32 px.
- Formularios: separación por secciones con divisores superiores, no cajas repetidas.

## Border radius

- Botones: `rounded-full`.
- Imágenes protagonistas: `rounded-[2rem]` o `lg:rounded-[3rem]` cuando aporta calidez.
- Inputs: `rounded-xl` para comodidad táctil.
- No se aplican radios a todas las secciones.

## Sombras

- Sombra `soft` solo para estados activos sutiles.
- Sin sombras fuertes ni estética dashboard.

## Botones

- Primary: `bg-brand-forest text-white`.
- Secondary: borde suave y fondo transparente.
- Light: fondo cálido sobre superficies oscuras.
- Text: enlace editorial subrayable.
- Altura mínima: 44 px.

## Formularios

- Fondo claro.
- Inputs blancos con borde `brand-border`.
- Focus visible con ring verde suave.
- Condicionales con línea lateral, no alertas saturadas.

## Contenedores

- `Container` centraliza ancho máximo y padding horizontal.
- Secciones abiertas con fondos continuos.

## Grids

- Mobile: una columna.
- Desktop: dos columnas asimétricas para hero, tema, producto y ubicación.

## Breakpoints

- Base mobile-first.
- `sm`: ajustes de tamaño y botones horizontales.
- `md`: sticky actions dejan de aparecer.
- `lg`: composición editorial en dos columnas.
- `xl`: countdown completo en Header.

## Animaciones

- Transiciones cortas de color, opacidad, altura del menú y hover leve.
- Sin parallax, partículas ni movimiento continuo.

## Accesibilidad

- Foco global con `:focus-visible`.
- Menú mobile con `aria-expanded`, `aria-controls`, label dinámico y bloqueo de scroll.
- Labels visibles en todos los campos.
- Respeto de `prefers-reduced-motion`.
