# 🧬 00 - ADN DEL PROYECTO (DIRECTRIZ MAESTRA)
> **Última actualización:** 2026-05-18 | **Versión Génesis Élite:** v2.1  
> **⚠️ PIVOTE ARQUITECTÓNICO:** Se abandonó Next.js/React. El stack es ahora **Vanilla HTML5 + CSS3 + JS** (ver Sección 2).

---

## 📌 1. IDENTIDAD DEL PROYECTO

| Campo | Valor |
| :--- | :--- |
| **Nombre Comercial** | BIG-i · BIG-eye |
| **Nombre Técnico del Repo** | `Web_Page` |
| **Marca Secundaria** | Kab-Geo |
| **Dueño / Cliente** | Big-i.com.mx (dacadomx@gmail.com) |
| **Dominio Principal** | big-i.com.mx |
| **Dominio Secundario** | kabgeo.com.mx |
| **Hosting** | Bluehost (nameservers: ns1/ns2.rhostbh.com) |
| **Idioma del Sitio** | Español (lang="es") |

### Objetivo Principal
Posicionar a BIG-i como la plataforma líder de **Inteligencia Territorial** para el sector de **Hidrocarburos y Gasolineras** en México. El sitio web es el punto de entrada comercial que presenta los servicios de **Kab-Geo** (georreferenciación, geoestadística y análisis espacial) a prospectos B2B en el sector energético.

### Propuesta de Valor
> "Transformamos datos de ubicación y consumo de hidrocarburos en inteligencia accionable para operadores de gasolineras, distribuidores y reguladores del sector energético mexicano."

---

## 🛠️ 2. STACK TECNOLÓGICO Y ARQUITECTURA

### ⚠️ NOTA DE PIVOTE (2026-05-18)
El stack anterior (Next.js 15 + React 19 + Tailwind v4 + TypeScript + shadcn/ui) fue **completamente descartado**. Los nuevos archivos fuente son archivos HTML estáticos ubicados en la raíz del proyecto. El build system de Node.js ya no se utiliza.

### Frontend (Stack actual — Vanilla)
| Capa | Tecnología | Notas |
| :--- | :--- | :--- |
| **Lenguaje de Marcado** | HTML5 | Semántico, accesible, `lang="es"` |
| **Estilos** | CSS3 + Tailwind CDN | `css/style.css` para custom; Tailwind via CDN |
| **Configuración Tailwind** | `js/tailwind.config.js` | Cargado después del CDN, antes del style.css |
| **Lógica de Interactividad** | JavaScript Vanilla (ES6+) | `js/main.js`, sin frameworks |
| **Tipografía** | Google Fonts — Inter | Cargado vía `<link>` en el `<head>` |
| **Iconos** | Material Symbols Outlined | Google CDN |
| **Iconos sociales** | Font Awesome 6.4 | Cloudflare CDN |

### Estructura de Carpetas (Canónica)
```
Web_Page/
├── index.html              ← Home
├── quienes_somos.html      ← Quiénes Somos
├── equipo.html             ← Equipo Estratégico
├── estudios.html           ← Catálogo de Estudios
├── contacto.html           ← Contacto / Formulario
│
├── css/
│   └── style.css           ← ÚNICO archivo CSS custom (todas las páginas)
│
├── js/
│   ├── tailwind.config.js  ← Config Tailwind CDN compartida
│   └── main.js             ← ÚNICO archivo JS (todas las páginas)
│
├── img/
│   └── logo.png            ← Logo principal (referenciado como img/logo.png)
│
└── knowledge/              ← Codex Génesis Élite (documentación interna)
```

### Backend / Servidor
| Capa | Tecnología | Notas |
| :--- | :--- | :--- |
| **Servidor Web** | Apache (Bluehost) | `.htaccess` para blindaje y SPA routing |
| **Scripting de Legado** | PHP + PDO | `knowledge/conexion.php` para futura API |
| **DB (Planificada)** | MySQL (Bluehost) | Solo para módulos futuros |

### Infraestructura / Despliegue
```
GitHub (rama: main)
    └── GitHub Actions (deploy.yml)
            └── FTP Deploy → ftp.big-i.com.mx:/public_html/
                    └── Bluehost (big-i.com.mx)
```
> **Nota:** Ya NO hay paso de `npm run build`. Los archivos HTML se suben directamente por FTP.

### Entorno de Desarrollo Local
- **Servidor Local:** XAMPP (Apache)
- **Ruta Local:** `C:\xampp\htdocs\Big-i.com.mx\Web_Page`
- **Carpeta de Respaldo (FUERA del repo):** `C:\xampp\htdocs\Big-i.com.mx\Background`

---

## 🧩 3. PÁGINAS ACTIVAS (v2.0 — Multi-página Vanilla)

| Archivo | Título | Estado |
| :--- | :--- | :--- |
| `index.html` | Inicio / Home | ✅ Activa |
| `quienes_somos.html` | Quiénes Somos | ✅ Activa |
| `equipo.html` | Equipo Estratégico | ✅ Activa |
| `estudios.html` | Catálogo de Estudios | ✅ Activa |
| `contacto.html` | Contacto | ✅ Activa |

### Módulos Planificados (Roadmap)
- **Kab-Geo Dashboard:** Mapas interactivos con datos de georreferenciación.
- **Portal de Clientes:** Autenticación y acceso a reportes de inteligencia territorial.
- **Módulo de Cotización:** Formulario inteligente para solicitudes B2B.
- **Blog / Insights:** Contenido de valor sobre el sector de hidrocarburos.

---

## 🔌 4. INTEGRACIONES Y TERCEROS

| Servicio | Propósito | Estado |
| :--- | :--- | :--- |
| **Google Fonts (Inter)** | Tipografía corporativa | Activo |
| **Material Symbols (Google)** | Iconografía UI | Activo |
| **Font Awesome 6.4 (CDN)** | Iconos de redes sociales | Activo |
| **Tailwind CSS CDN** | Utilidades de estilos | Activo |
| **FTP Bluehost** | Despliegue de producción | Activo (via CI/CD) |
| **Mapbox / Leaflet** | Mapas interactivos para Kab-Geo | Planificado |
| **SendGrid / SMTP** | Emails transaccionales (formulario) | Planificado |

---

## ⚠️ 5. REGLAS ESPECÍFICAS DEL PROYECTO (Vanilla Edition)

1. **Un solo CSS:** Todos los estilos custom van en `css/style.css`. PROHIBIDO crear `<style>` inline en los HTML.
2. **Un solo JS:** Toda la lógica JS va en `js/main.js` con guardias `if (document.getElementById(...))` por página. PROHIBIDO `<script>` inline en los HTML.
3. **Config Tailwind compartida:** La paleta de colores y los tokens de diseño viven en `js/tailwind.config.js`. PROHIBIDO duplicar configs en cada página.
4. **Nombre del archivo Quiénes Somos:** El archivo usa guión bajo: `quienes_somos.html`. TODOS los enlaces deben apuntar a `quienes_somos.html` (nunca `quienes-somos.html`).
5. **Logo con `<img>`:** Toda referencia al logo en header y footer debe usar `<img src="img/logo.png" alt="BIG-i Business Informatics &amp; Geostatistics">`. PROHIBIDO base64 o texto plano como sustituto.
6. **Mobile-First:** Todo componente nuevo nace en 375px y escala con `md:`, `lg:`.
7. **Seguridad:** Sanitizar todos los inputs. Headers de seguridad en `.htaccess`.
8. **Carpeta Background es Externa:** `C:\xampp\htdocs\Big-i.com.mx\Background` es solo respaldo. NUNCA referenciar desde el repo.
9. **Deploy solo desde `main`:** Solo la rama `main` activa el CI/CD.

---

## 🎨 6. IDENTIDAD VISUAL Y DESIGN TOKENS

| Token | Valor | Uso |
| :--- | :--- | :--- |
| **Fuente Principal** | Inter (Google Fonts) | Body + Headings |
| **Color Primario** | `#9bcbff` | Links, accents, texto activo |
| **Color Primary-Container** | `#009ffe` (Electric Blue) | CTAs, botones principales |
| **Color Background** | `#131312` | Fondo oscuro principal |
| **Color Graphite** | `#1D1D1B` | Texto en secciones claras |
| **Modo UI** | Oscuro (dark mode class) + secciones blancas | Ver páginas equipo, quienes_somos |
| **Contraste Mínimo** | 4.5:1 | Estándar WCAG 2.1 AA |
| **Border Radius base** | `0.125rem` | Cards, inputs |
