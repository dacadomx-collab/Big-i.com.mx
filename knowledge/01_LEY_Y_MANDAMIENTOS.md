# 📜 01 - LEY Y MANDAMIENTOS DEL GÉNESIS ÉLITE v2
> **Stack de Referencia:** Next.js 15 · React 19 · Tailwind CSS v4 · shadcn/ui · TypeScript 5  
> **Última actualización:** 2026-05-12

## ⚖️ DECLARACIÓN DE AUTORIDAD
Este documento rige sobre cualquier sugerencia, "mejora" o criterio propio de la IA Ejecutora.  
**Claude es un Agente Determinístico, no creativo.** Ejecuta lo que está documentado. Si algo no está documentado, pregunta antes de actuar.

---

## ⚖️ LOS 15 MANDAMIENTOS

### BLOQUE I — DISEÑO Y EXPERIENCIA DE USUARIO

**1. Mobile-First Absoluto**
Todo componente nace para pantallas de 375px y escala hacia arriba (`sm:`, `md:`, `lg:`, `xl:`).  
❌ Prohibido: anchos fijos en `px` en contenedores principales.  
✅ Permitido: `w-full`, `max-w-*`, `container`, unidades `rem`/`em`/`%`/`vw`.

**2. Modo Oscuro & Toggle Nativo**
Soporte completo de tema Light/Dark usando `next-themes` y las variables CSS de shadcn/ui.  
- Contraste mínimo: **4.5:1** (Estándar WCAG 2.1 AA) en ambos temas.
- Clases Tailwind de color siempre con variante dark: `bg-background dark:bg-background`.
- Prohibido usar colores hardcoded (`#fff`, `#000`). Solo usar variables semánticas (`bg-background`, `text-foreground`, `border`, `muted`, etc.).

**3. Sin Frameworks de UI Alternativos**
El stack de componentes es **shadcn/ui + Tailwind CSS v4**. Prohibido introducir Bootstrap, Material UI, Ant Design, Chakra UI u otras librerías de componentes sin autorización explícita del Arquitecto.

---

### BLOQUE II — SEGURIDAD

**4. Seguridad Nivel Militar**
- Sanitización obligatoria de todos los inputs de usuario.
- Uso de Prepared Statements en toda consulta SQL (PDO).
- Blindaje contra: SQL Injection, XSS, CSRF, Path Traversal, Open Redirect.
- Headers de seguridad en `.htaccess`: `X-Frame-Options`, `X-Content-Type-Options`, `Content-Security-Policy`.

**5. Bóveda de Secretos (.env)**
**OBLIGATORIO.** Absolutamente toda credencial vive en el `.env` local.  
❌ Prohibido hardcode de llaves API, contraseñas, tokens en cualquier archivo del repositorio.  
❌ Prohibido subir el archivo info.txt que se encuentra en la arpeta "\knowledge" al servidor o Github
✅ En producción: GitHub Secrets (`${{ secrets.FTP_PASSWORD }}`, etc.).  
✅ `.gitignore` protege el `.env` real. Solo `.env.example` va al repo.


**6. Aislamiento de Entornos (Anti-Bomba)**
Tres entornos diferenciados:
- **Local:** XAMPP. Apunta a DB local con datos de prueba (seeders).
- **Staging:** Espejo de producción. Para QA antes de deploy.
- **Producción:** `big-i.com.mx`. NUNCA se toca directo desde localhost.

**7. Seguridad de Endpoints (CORS ≠ Auth)**
CORS no es autenticación. CORS no detiene Postman ni curl.  
Todo endpoint que modifique datos (POST/PUT/DELETE) **DEBE** requerir autenticación real (JWT o Session Token).  
Sin token válido → `401 Unauthorized` antes de ejecutar ninguna lógica de negocio.

---

### BLOQUE III — CÓDIGO Y ARQUITECTURA

**8. Protocolo Anti-Alucinación**
❌ PROHIBIDO inventar o asumir variables, nombres de componentes, rutas o endpoints.  
✅ Si un identificador no existe en `02_SYSTEM_CODEX_REGISTRY.md`, la IA debe **DETENERSE** y preguntar al Arquitecto.

**9. Contrato de API Estricto**
❌ Prohibido alterar nombres de propiedades JSON definidos en `03_CONTRATOS_API_Y_LOGICA.md`.  
Los contratos son **inmutables** hasta que el Arquitecto los modifique con una nueva versión documentada.

**10. Ejecución Determinística (Sin "Mejoras" No Solicitadas)**
La IA ejecuta **exactamente** lo que se le pide. Cero "optimizaciones de cortesía", refactors no solicitados, ni cambios de alcance ampliado.  
Si la IA detecta una mejora potencial, la **reporta** pero NO la implementa sin autorización.

**11. Naming Registry (Consistencia de Nomenclatura)**
| Capa | Convención | Ejemplo |
| :--- | :--- | :--- |
| Backend / DB (PHP, SQL) | `snake_case` | `estacion_servicio_id`, `litros_vendidos` |
| Frontend / React (TS/TSX) | `camelCase` | `estacionServicioId`, `litrosVendidos` |
| Componentes React | `PascalCase` | `HeroSection`, `ServicesCard` |
| Archivos de componente | `kebab-case.tsx` | `hero-section.tsx`, `services-card.tsx` |
| CSS Classes (Tailwind) | `kebab-case` | `bg-primary`, `text-muted-foreground` |
| Constantes globales | `UPPER_SNAKE_CASE` | `MAX_FILE_SIZE`, `API_BASE_URL` |

**12. Detección de Dead Code (Limpieza Obligatoria)**
Auditoría antes de cada entrega:
- Eliminar imports no utilizados.
- Eliminar funciones, variables y tipos huérfanos.
- Cero `console.log` en código de producción.
- Herramientas: ESLint (`no-unused-vars`, `no-console`), TypeScript strict.

**13. Inmutabilidad del Sistema (DB)**
La IA **NO PUEDE** crear tablas, modificar esquemas, ejecutar migraciones ni alterar la base de datos sin autorización humana **explícita y documentada** en este Codex.  
Toda modificación de schema se documenta primero en `02_SYSTEM_CODEX_REGISTRY.md`.

**14. Sinónimos Prohibidos (Vocabulario Único)**
Un solo nombre por concepto en todo el sistema. Cero traducciones libres ni sinónimos en paralelo.  
Ejemplo: si el concepto es `estacion_servicio`, NO usar `gasolinera`, `bomba`, `estacion`, `gas_station`.  
Ver vocabulario controlado en `02_SYSTEM_CODEX_REGISTRY.md`.

---

### BLOQUE IV — INFRAESTRUCTURA Y ARRANQUE

**15. Fundación de Seguridad (Arranque Blindado)**
Ningún proyecto arranca su desarrollo visual o lógico sin los **Archivos de Fundación**:
1. `.env` — Credenciales locales (en `.gitignore`)
2. `.env.example` — Plantilla pública (en el repo)
3. `.htaccess` — Blindaje Apache (en el repo)
4. `api/conexion.php` — Conexión PDO centralizada (en el repo)
5. `.gitignore` — Protección de archivos sensibles (en el repo)
6. `CLAUDE.md` — Agente Residente (en el repo)

---

## 📋 REGLAS ESPECÍFICAS PARA NEXT.JS (STATIC EXPORT)

Dado que el proyecto usa `output: 'export'`, aplican restricciones adicionales:

| Feature de Next.js | Estado | Alternativa |
| :--- | :--- | :--- |
| `getServerSideProps` | ❌ NO DISPONIBLE | `getStaticProps` o Client Components |
| `API Routes` (`/app/api/`) | ❌ NO DISPONIBLE | Endpoints PHP en Bluehost |
| `Image Optimization` automática | ❌ DESACTIVADA | `images: { unoptimized: true }` |
| `Server Actions` | ❌ NO DISPONIBLE | Forms con fetch a API PHP |
| `Middleware` de Next.js | ❌ NO DISPONIBLE | Apache `.htaccess` |
| `Dynamic Routes` (SSR) | ✅ Solo con `generateStaticParams` | Páginas pre-generadas en build |
| `Client Components` (`'use client'`) | ✅ PERMITIDO | Para interactividad y hooks |
| `Server Components` (RSC) | ✅ PERMITIDO | Default en App Router |

---

## 🚨 JERARQUÍA DE PRIORIDADES EN CONFLICTO

Si dos mandamientos entran en conflicto, la prioridad es:

1. **Seguridad** (Mandamientos 4, 5, 6, 7)
2. **Contrato de API** (Mandamiento 9)
3. **Inmutabilidad del Sistema** (Mandamiento 13)
4. **Anti-Alucinación** (Mandamiento 8)
5. **Diseño/UX** (Mandamientos 1, 2, 3)
