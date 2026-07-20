# Diagnóstico visual UX/UI — Gracia Camp 2026

## Problemas actuales

- La interfaz combina fondos oscuros, crema, azul/verde y dorado sin un sistema único.
- Varias secciones dependen de cajas, bordes, sombras y fondos translúcidos, lo que produce una sensación de módulos pegados.
- El formulario resulta extenso y pesado por el fondo oscuro continuo y los bloques condicionales saturados.
- Reglamento y Bienvenida usan grillas de tarjetas repetidas que se perciben como dashboard.
- El Header concentra navegación, logo, CTA y countdown en elementos pequeños y poco editoriales.

## Causas visuales

- Colores hardcodeados distribuidos por JSX.
- Ausencia de primitivas de diseño reutilizables para contenedores, botones y encabezados.
- Uso repetido de `rounded`, `border`, `shadow` y `backdrop-blur` como estructura principal.
- Jerarquía tipográfica basada en mayúsculas, tracking amplio y pesos muy altos.

## Inconsistencias

- Conviven `#1e3a5c`, `#183A2B`, `#b8860b` y `#7A835C` como colores principales.
- CTAs con radios, pesos, colores y alturas variables.
- Algunas secciones usan estética institucional editorial y otras estética de tarjeta/app.

## Exceso de contenedores

- Bienvenida y Reglamento presentan contenido en tarjetas casi idénticas.
- Campamento encierra producto, ubicación y video como módulos independientes.
- Registro agrupa secciones dentro de un panel oscuro grande que aumenta la carga cognitiva.

## Exceso de glassmorphism

- Fondos `bg-white/5`, `bg-white/[0.08]`, `backdrop-blur` y sombras se repiten en páginas internas.
- El efecto pierde intención y reduce legibilidad sobre fondos oscuros.

## Problemas de color

- Dorado y textos claros sobre fondos oscuros no siempre sostienen buen contraste en tamaños pequeños.
- No existe paleta semántica centralizada.

## Problemas de tipografía

- Uso excesivo de mayúsculas/tracking para etiquetas y CTAs.
- Títulos muy pesados y poca variación editorial.
- Textos largos con ancho y ritmo irregular.

## Problemas mobile

- Header mobile funcional pero poco elegante.
- Formulario requiere una lectura más progresiva en pantallas chicas.
- Algunas imágenes y secciones tienen alturas visuales rígidas.

## Problemas desktop

- Falta composición asimétrica editorial.
- Producto y mapa se ven como tarjetas aisladas.
- Footer duplicado y con columnas poco necesarias.

## Problemas de jerarquía

- No hay un sistema claro de eyebrow, h1, h2, h3, body y caption.
- Las acciones primarias/secundarias no se diferencian de forma consistente.

## Problemas de navegación

- El Header anterior no integraba el countdown al lenguaje visual.
- El estado activo era correcto pero con baja intención editorial.

## Problemas del formulario

- Demasiado oscuro, secciones encerradas y bloques condicionales con alerta visual excesiva.
- Campos correctos funcionalmente, pero falta progresión visual amable.

## Problemas del reglamento

- Las reglas parecían tarjetas de dashboard; necesitaban lista editorial numerada con separadores.

## Propuesta de solución

- Centralizar paleta institucional cálida en Tailwind.
- Crear componentes mínimos: `Container`, `SectionHeader`, botones, `Countdown`, `EditorialReveal`.
- Rediseñar páginas con fondos continuos, columnas, separadores, números editoriales e imágenes protagonistas.
- Rehacer Header, Footer, Bienvenida, Campamento, Registro y Reglamento sin cambiar rutas, payload ni API.
- Mantener animaciones mínimas, accesibilidad de foco y `prefers-reduced-motion`.
