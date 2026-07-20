# Estado de auditoría

| Área | Estado | Problemas | Corregido | Pendiente |
|---|---|---|---|---|
| Build | Correcto | Fallaba por descarga de Google Fonts. | Sí | Ninguno detectado. |
| TypeScript | Correcto | `tsc` requiere tipos generados por Next. | Sí | Ejecutar build antes de typecheck limpio en clones nuevos. |
| Navegación | Correcto | No se detectaron rutas internas rotas. | Sí | Validación visual manual. |
| Botones | Correcto | Enlaces de redes sin acción real. | Sí | Ninguno crítico. |
| Enlaces | Correcto | `href="#"` en footer. | Sí | Confirmar redes oficiales si existen. |
| Registro | Parcial | Depende de API y credenciales. | Sí | Prueba con envío real. |
| API | Parcial | Respuestas con detalles internos, JSON inválido, payload sin límites. | Sí | Rate limiting persistente futuro. |
| Google Sheets | Riesgo | Requiere env vars, pestaña y permisos. | Parcial | Validación manual con credenciales reales. |
| Mobile | Parcial | Menú sin ARIA de estado. | Sí | Prueba visual 320-414 px. |
| Tablet | Parcial | Sin falla crítica por inspección. | Sí | Prueba visual 768-1024 px. |
| Desktop | Correcto | Imágenes no optimizadas. | Sí | Medición Lighthouse futura. |
| Accesibilidad | Parcial | Focus global y estado de menú mejorables. | Sí | Auditoría WCAG completa con lector de pantalla. |
| SEO | Parcial | Metadata global básica. | Sí | Sitemap/robots/canonical con dominio final. |
| Rendimiento | Correcto | `<img>` y fuente externa en build. | Sí | Medición CWV real. |
| Seguridad | Parcial | Detalles internos y payload no limitado. | Sí | Antispam/rate limiting robusto futuro. |
| Vercel | Parcial | Build sensible a red externa. | Sí | Configurar env vars reales. |
