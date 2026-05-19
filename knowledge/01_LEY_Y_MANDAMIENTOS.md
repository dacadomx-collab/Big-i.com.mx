# 📜 01 - LEY Y MANDAMIENTOS DEL GÉNESIS ÉLITE v2.1
> **Stack de Referencia:** HTML5 · CSS3 · JavaScript Vanilla · Tailwind CSS (CDN)  
> **Última actualización:** 2026-05-18  
> **⚠️ PIVOTE:** Este documento reemplaza la versión anterior que regía sobre Next.js/React/TypeScript. Ese stack fue abandonado definitivamente.

## ⚖️ DECLARACIÓN DE AUTORIDAD
Este documento rige sobre cualquier sugerencia, "mejora" o criterio propio de la IA Ejecutora.  
**Claude es un Agente Determinístico, no creativo.** Ejecuta lo que está documentado. Si algo no está documentado, pregunta antes de actuar.

---

## ⚖️ LOS 15 MANDAMIENTOS

### BLOQUE I — DISEÑO Y EXPERIENCIA DE USUARIO

**1. Mobile-First Absoluto**
Todo componente nace para pantallas de 375px y escala hacia arriba (`sm:`, `md:`, `lg:`, `xl:`).  
❌ Prohibido: anchos fijos en `px` en contenedores principales.  
✅ Permitido: `w-full`, `max-w-*`, unidades `rem`/`em`/`%`/`vw`.

**2. Modo Oscuro Estructural + Secciones Blancas Intencionales**
El `<html>` lleva `class="dark"`. El fondo base es `#131312`.  
Las secciones de contenido corporativo (equipo, propuesta de valor) usan intencionalmente `bg-white text-graphite`.  
- Contraste mínimo: **4.5:1** (WCAG 2.1 AA) en todos los contextos.
- Usar los tokens de color definidos en `js/tailwind.config.js`. Prohibido hardcodear colores no documentados.

**3. Sin Frameworks de UI Alternativos**
El stack de estilos es **Tailwind CDN + `css/style.css` custom**. Prohibido introducir Bootstrap, Material UI, Ant Design, Chakra UI u otras librerías de componentes sin autorización explícita del Arquitecto.

---

### BLOQUE II — SEGURIDAD

**4. Seguridad Nivel Militar**
- Sanitización obligatoria de todos los inputs de usuario (formulario de contacto).
- Uso de Prepared Statements en toda consulta SQL futura (PDO).
- Blindaje contra: SQL Injection, XSS, CSRF, Path Traversal, Open Redirect.
- Headers de seguridad en `.htaccess`: `X-Frame-Options`, `X-Content-Type-Options`, `Content-Security-Policy`.

**5. Bóveda de Secretos (.env)**
**OBLIGATORIO.** Absolutamente toda credencial vive en el `.env` local.  
❌ Prohibido hardcode de llaves API, contraseñas, tokens en cualquier archivo del repositorio.  
❌ Prohibido subir el archivo `info.txt` de la carpeta `knowledge/` al servidor o Github.  
✅ En producción: GitHub Secrets (`${{ secrets.FTP_PASSWORD }}`, etc.).  
✅ `.gitignore` protege el `.env` real. Solo `.env.example` va al repo.

**6. Aislamiento de Entornos (Anti-Bomba)**
Tres entornos diferenciados:
- **Local:** XAMPP. Archivos HTML servidos directamente.
- **Staging:** Espejo de producción. Para QA antes de deploy.
- **Producción:** `big-i.com.mx`. NUNCA se toca directo desde localhost.

**7. Seguridad de Endpoints Futuros**
Cuando se implemente el backend PHP:  
Todo endpoint que modifique datos (POST/PUT/DELETE) **DEBE** requerir autenticación real (JWT o Session Token).  
Sin token válido → `401 Unauthorized` antes de ejecutar ninguna lógica de negocio.

---

### BLOQUE III — CÓDIGO Y ARQUITECTURA VANILLA

**8. Protocolo Anti-Alucinación**
❌ PROHIBIDO inventar o asumir rutas de archivo, nombres de clases CSS, IDs de elementos o funciones JS.  
✅ Si un identificador no existe en `02_SYSTEM_CODEX_REGISTRY.md` o no es visible en el código fuente, la IA debe **DETENERSE** y preguntar al Arquitecto.

**9. Separación de Responsabilidades (SoC — Separation of Concerns)**
| Capa | Archivo | Regla |
| :--- | :--- | :--- |
| Estructura | `*.html` | Solo HTML semántico. Cero `<style>` inline. Cero `<script>` inline. |
| Presentación | `css/style.css` | ÚNICO archivo de estilos custom. |
| Configuración visual | `js/tailwind.config.js` | Config Tailwind compartida. NO duplicar en los HTML. |
| Comportamiento | `js/main.js` | ÚNICO archivo JS. Usar guardias de existencia por página. |

**10. Ejecución Determinística (Sin "Mejoras" No Solicitadas)**
La IA ejecuta **exactamente** lo que se le pide. Cero "optimizaciones de cortesía", refactors no solicitados, ni cambios de alcance ampliado.  
Si la IA detecta una mejora potencial, la **reporta** pero NO la implementa sin autorización.

**11. Naming Registry (Consistencia de Nomenclatura)**
| Elemento | Convención | Ejemplo |
| :--- | :--- | :--- |
| Archivos HTML | `kebab_case.html` (con underscore) | `quienes_somos.html` |
| Clases CSS custom | `kebab-case` | `.glass-panel`, `.card-hover` |
| IDs en HTML | `kebab-case` | `id="mobile-menu"`, `id="slider"` |
| Variables JS | `camelCase` | `const menuToggle`, `let searchTerm` |
| Funciones JS | `camelCase` | `function filterItems()` |
| Constantes globales | `UPPER_SNAKE_CASE` | `const MAX_RESULTS = 18` |
| Imágenes | `kebab-case.ext` | `logo.png`, `hero-map.jpg` |

**12. Detección de Dead Code (Limpieza Obligatoria)**
Auditoría antes de cada entrega:
- Eliminar clases CSS no utilizadas en `style.css`.
- Eliminar funciones y variables JS huérfanas en `main.js`.
- Cero `console.log` en código de producción (solo en desarrollo).
- Cero atributos HTML innecesarios (`style=""`, `onclick=""`).

**13. Inmutabilidad del Sistema (DB)**
La IA **NO PUEDE** crear tablas, modificar esquemas, ejecutar migraciones ni alterar la base de datos sin autorización humana **explícita y documentada** en este Codex.

**14. Vocabulario Único (Sinónimos Prohibidos)**
Un solo nombre por concepto en todo el sistema.  
Ejemplos canonizados:
- Página de empresa: `quienes_somos.html` (nunca `nosotros`, `about`, `empresa`)
- Logo: siempre `img/logo.png` (nunca `img/brand.png`, `img/logotipo.png`)
- Color azul eléctrico: `electric-blue` en Tailwind config, `var(--electric-blue)` en CSS
- Ver vocabulario completo en `02_SYSTEM_CODEX_REGISTRY.md`

---

### BLOQUE IV — INFRAESTRUCTURA Y ARRANQUE

**15. Fundación de Seguridad (Arranque Blindado)**
Ningún proyecto arranca su desarrollo visual o lógico sin los **Archivos de Fundación**:
1. `.htaccess` — Blindaje Apache (en el repo)
2. `knowledge/.env.example` — Plantilla pública (en el repo)
3. `knowledge/conexion.php` — Conexión PDO centralizada (en el repo)
4. `css/style.css` — Estilos custom consolidados
5. `js/main.js` — Lógica JS consolidada
6. `js/tailwind.config.js` — Config Tailwind compartida

---

## 📋 REGLAS ESPECÍFICAS PARA EL STACK VANILLA

| Práctica | Estado | Alternativa |
| :--- | :--- | :--- |
| `<style>` inline en HTML | ❌ PROHIBIDO | `css/style.css` |
| `<script>` inline en HTML | ❌ PROHIBIDO | `js/main.js` |
| Config Tailwind duplicada en cada HTML | ❌ PROHIBIDO | `js/tailwind.config.js` |
| Logo como base64 en HTML | ❌ PROHIBIDO | `<img src="img/logo.png">` |
| Enlace a `quienes-somos.html` (con guión) | ❌ INCORRECTO | `quienes_somos.html` (guión bajo) |
| `href="#"` en enlaces de navegación real | ❌ PROHIBIDO | Apuntar al archivo físico correcto |
| JS sin guardias de existencia | ❌ RIESGOSO | Usar `if (document.getElementById('...'))` |
| Imágenes sin atributo `alt` | ❌ PROHIBIDO | Siempre describir el contenido |

---

## 🚨 JERARQUÍA DE PRIORIDADES EN CONFLICTO

Si dos mandamientos entran en conflicto, la prioridad es:

1. **Seguridad** (Mandamientos 4, 5, 6, 7)
2. **Separación de Responsabilidades** (Mandamiento 9)
3. **Inmutabilidad del Sistema** (Mandamiento 13)
4. **Anti-Alucinación** (Mandamiento 8)
5. **Diseño/UX** (Mandamientos 1, 2, 3)
