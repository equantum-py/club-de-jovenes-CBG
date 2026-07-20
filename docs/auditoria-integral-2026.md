# Auditoría integral Club de Jóvenes CBG

## 1. Resumen ejecutivo

Se auditó el proyecto Next.js App Router del sitio del Club de Jóvenes CBG / Campamento 2026. El sitio tiene una base funcional correcta: rutas principales accesibles, formulario de registro conectado a un endpoint server-side y despliegue compatible con Vercel. Se corrigieron riesgos concretos de build, seguridad, accesibilidad, rendimiento y enlaces sin destino real.

## 2. Estado general

- Build: Correcto.
- TypeScript: Correcto tras generar tipos de Next con build.
- Navegación: Correcto.
- Formulario: Parcial; validación local y server-side mejorada, pero el guardado real requiere credenciales de Google Sheets.
- Google Sheets: Riesgo controlado; depende de variables de entorno y permisos externos.
- Mobile/responsive: Parcial verificado por inspección de clases responsive y rutas servidas; requiere prueba visual manual en dispositivos reales.
- SEO: Parcial; metadata global mejorada, faltan sitemap/robots dedicados si el dominio definitivo lo requiere.
- Seguridad: Parcial; respuestas más seguras y payload limitado, sin infraestructura compleja de rate limiting persistente.

Categorías usadas: Correcto, Parcial, Roto, No implementado, Riesgo.

## 3. Mapa de rutas

| Ruta | Archivo | Objetivo | Estado | Problemas detectados |
|---|---|---|---|---|
| `/` | `src/app/page.tsx` | Redirigir a la página principal del campamento. | Correcto | Devuelve 307 hacia `/campamento`, esperado. |
| `/campamento` | `src/app/campamento/page.tsx` | Página principal del campamento con banner, tema, remera, lugar, video, CTA y footer. | Correcto | Imágenes no optimizadas y enlaces `#` en footer corregidos. |
| `/bienvenida` | `src/app/bienvenida/page.tsx` | Presentar objetivo principal y objetivos específicos. | Correcto | Sin errores críticos detectados. |
| `/registro` | `src/app/registro/page.tsx` | Capturar datos de inscripción y enviar a API. | Parcial | Depende de `/api/registro` y credenciales de Google Sheets para éxito real. |
| `/reglamento` | `src/app/reglamento/page.tsx` | Mostrar reglamento y CTAs finales. | Correcto | Sin errores críticos detectados. |
| `/api/registro` | `src/app/api/registro/route.ts` | Validar payload y guardar registro en Google Sheets. | Parcial | Requiere variables Google y permisos; validación/errores endurecidos. |

## 4. Auditoría funcional

- Rutas principales servidas localmente: `/campamento`, `/bienvenida`, `/registro`, `/reglamento` responden 200.
- `/` redirige con 307 a `/campamento`.
- El header desktop y mobile enlaza a rutas existentes.
- Los CTAs principales apuntan a rutas existentes.
- La reserva de remera por WhatsApp exige seleccionar talle antes de abrir el enlace externo.
- El video embebido se carga bajo interacción, reduciendo carga inicial.
- El formulario evita doble envío con `isSubmitting` y redirige a `/reglamento` cuando la API responde correctamente.

## 5. Enlaces y botones

- Corregidos los enlaces visuales de redes que apuntaban a `#` y no ejecutaban una acción real; ahora apuntan a WhatsApp.
- Header mobile ahora expone `aria-expanded` y `aria-controls`.
- No se detectaron href internos hacia rutas inexistentes en los archivos auditados.

## 6. Formularios

- El formulario contiene campos obligatorios básicos en cliente.
- Se reforzó validación server-side para invitados (`invitadoPor`) y menores de edad (`nombrePadreMadre`, `telefonoPadreMadre`).
- Se agregó manejo explícito de JSON inválido.
- Se agregó límite básico de tamaño de request y longitud por campo.
- Se sanitizan caracteres de control antes de escribir en Sheets.

## 7. Google Sheets

- La integración usa `googleapis`, service account JWT y scope `https://www.googleapis.com/auth/spreadsheets`.
- La hoja esperada es la pestaña `Registros` con rango `Registros!A:S`.
- Variables necesarias: `GOOGLE_CLIENT_EMAIL`, `GOOGLE_PRIVATE_KEY`, `GOOGLE_SHEET_ID`.
- Validación manual pendiente: comprobar que el spreadsheet exista, que la pestaña `Registros` exista y que la cuenta de servicio tenga permiso de Editor.

## 8. Mobile y responsive

- El layout usa grids fluidos, breakpoints `sm`, `md`, `lg`, sticky actions mobile y navegación mobile.
- Se mantuvo enfoque mobile-first sin rediseñar.
- Se corrigieron riesgos de accesibilidad del menú mobile.
- Pendiente: revisión visual manual en 320, 360, 375, 390, 414, 768, 1024, 1280 y 1440 px con navegador real.

## 9. UX/UI

- El flujo Inicio → Bienvenida → Campamento → Registro → Reglamento es navegable, aunque la raíz redirige directamente a Campamento.
- Los CTAs mantienen identidad visual y rutas coherentes.
- Se evitó introducir secciones nuevas.
- Se mantuvieron colores, estructura general y lenguaje visual.

## 10. Accesibilidad

- El formulario usa labels envolventes asociados a inputs/selects/textarea.
- Errores de envío tienen `role="alert"`.
- Se agregó foco visible global.
- Se agregó soporte para `prefers-reduced-motion`.
- El botón de menú mobile comunica estado expandido.
- Las imágenes principales poseen texto alternativo.

## 11. SEO

- Se mejoró metadata global con título por plantilla, descripción, Open Graph, locale, imagen OG y robots.
- El HTML declara `lang="es"`.
- Pendiente futuro: confirmar dominio definitivo para canonical, sitemap y robots personalizados.

## 12. Rendimiento

- Se reemplazó `next/font/google` por stack de sistema para evitar builds frágiles por fetch externo de fuentes.
- Se migraron imágenes locales y thumbnail de YouTube en la página de campamento a `next/image`.
- Se configuró `remotePatterns` para `img.youtube.com`.
- El video sigue cargándose bajo demanda.

## 13. Seguridad

- La API ya no expone el estado de presencia de variables de entorno al cliente.
- Los logs del backend ya no imprimen el objeto crudo de error completo.
- Se agregó manejo de JSON inválido, límite de tamaño y sanitización básica.
- Pendiente futuro: rate limiting real con almacenamiento externo si el tráfico público lo exige.

## 14. Calidad de código

- Lint sin warnings ni errores.
- Build productivo correcto.
- TypeScript correcto tras build.
- Se redujeron warnings de Next por `<img>`.
- No se detectaron conflictos de merge activos con marcadores `<<<<<<<`, `=======`, `>>>>>>>`.

## 15. Problemas encontrados

### AUD-001

- Severidad: Alta
- Archivo: `src/app/layout.tsx`
- Línea aproximada: 1
- Descripción: `next/font/google` hacía que el build dependiera de descargar Inter desde Google Fonts.
- Impacto: `npm run build` fallaba en entornos con restricciones o fallos de red.
- Solución aplicada: se reemplazó por stack de fuentes del sistema en CSS.
- Estado: Corregido.

### AUD-002

- Severidad: Media
- Archivo: `src/app/campamento/page.tsx`
- Línea aproximada: 90, 160, 210, 410
- Descripción: uso de `<img>` generaba advertencias de rendimiento/LCP.
- Impacto: menor optimización de imágenes y warnings de lint.
- Solución aplicada: migración a `next/image` y configuración remota para thumbnail de YouTube.
- Estado: Corregido.

### AUD-003

- Severidad: Media
- Archivo: `src/app/campamento/page.tsx`
- Línea aproximada: 480, 550
- Descripción: enlaces de redes apuntaban a `#`.
- Impacto: botones visualmente clickeables sin acción real.
- Solución aplicada: se reemplazaron por enlace externo de WhatsApp.
- Estado: Corregido.

### AUD-004

- Severidad: Alta
- Archivo: `src/app/api/registro/route.ts`
- Línea aproximada: 180-230
- Descripción: la API devolvía detalles de configuración de variables de entorno al cliente.
- Impacto: exposición innecesaria de información operativa.
- Solución aplicada: respuesta genérica segura y logs reducidos.
- Estado: Corregido.

### AUD-005

- Severidad: Media
- Archivo: `src/app/api/registro/route.ts`
- Línea aproximada: 30-60
- Descripción: validación server-side no exigía campos condicionales de menores e invitados.
- Impacto: registros incompletos podían llegar a Google Sheets.
- Solución aplicada: validación condicional server-side.
- Estado: Corregido.

### AUD-006

- Severidad: Media
- Archivo: `src/app/api/registro/route.ts`
- Línea aproximada: 180
- Descripción: JSON inválido caía en el catch general y podía mapearse como error de Google.
- Impacto: respuestas confusas y debugging difícil.
- Solución aplicada: parseo JSON aislado con 400 específico.
- Estado: Corregido.

### AUD-007

- Severidad: Baja
- Archivo: `src/components/Header.tsx`
- Línea aproximada: 175
- Descripción: menú mobile sin estado ARIA expandido.
- Impacto: menor claridad para lectores de pantalla.
- Solución aplicada: `aria-expanded`, `aria-controls` y label dinámico.
- Estado: Corregido.

## 16. Archivos modificados

- `.env.example`
- `next.config.js`
- `src/app/api/registro/route.ts`
- `src/app/campamento/page.tsx`
- `src/app/globals.css`
- `src/app/layout.tsx`
- `src/components/Header.tsx`
- `docs/auditoria-integral-2026.md`
- `AUDIT_STATUS.md`

## 17. Pruebas ejecutadas

- `npm install`
- `npm run lint`
- `npm run build`
- `npx tsc --noEmit`
- `npm run start`
- `curl` de rutas principales y endpoint API con JSON inválido/payload vacío.

## 18. Resultados de build y lint

- `npm run lint`: correcto, sin warnings ni errores.
- `npm run build`: correcto.
- `npx tsc --noEmit`: correcto tras generar tipos con build.
- Observación: antes de la corrección, el build fallaba por descarga de Google Fonts.

## 19. Pendientes reales

- Validar envío exitoso contra Google Sheets con credenciales reales en Vercel.
- Confirmar dominio final para canonical/sitemap/robots dedicados.
- Ejecutar prueba visual real en todos los anchos solicitados.
- Evaluar rate limiting persistente si el formulario queda expuesto públicamente a alto tráfico o spam.

## 20. Recomendaciones futuras

- Agregar pruebas end-to-end con Playwright para navegación y formulario.
- Agregar `sitemap.ts` y `robots.ts` cuando el dominio final esté confirmado.
- Considerar validación schema-based compartida si el formulario crece.
- Registrar errores de API en una herramienta segura de observabilidad sin exponer datos sensibles.
