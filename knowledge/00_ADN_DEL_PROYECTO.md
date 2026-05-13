# 🧬 00 - ADN DEL PROYECTO (DIRECTRIZ MAESTRA)
> **Última actualización:** 2026-05-12 | **Versión Génesis Élite:** v2.0

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

### Frontend (100% del proyecto actual)
| Capa | Tecnología | Versión | Notas |
| :--- | :--- | :--- | :--- |
| **Framework** | Next.js (App Router) | ^15.x | Static Export (`output: 'export'`) |
| **Runtime JS** | React + React DOM | ^19.x | Server Components habilitados |
| **Lenguaje** | TypeScript | ^5.7.3 | Strict Mode ON |
| **Estilos** | Tailwind CSS | ^4.2.0 | PostCSS + CSS Variables (OKLch) |
| **UI Primitives** | shadcn/ui (New York style) | Latest | 57 componentes integrados |
| **Iconos** | Lucide React | Latest | Librería oficial de shadcn |
| **Temas** | next-themes | Latest | Light / Dark con toggle nativo |
| **Fuentes** | Google Fonts — Inter | Latest | Variable CSS `--font-inter` |
| **Analytics** | @vercel/analytics | ^1.6.1 | Solo en producción |
| **Charts** | Recharts | Latest | Para dashboards futuros |
| **Forms** | react-hook-form + Zod | 7.54.1 / Latest | Validación tipada end-to-end |
| **Toasts** | Sonner | Latest | Reemplaza el toast nativo de shadcn |

### Backend / Servidor (Infraestructura de Hosting)
| Capa | Tecnología | Notas |
| :--- | :--- | :--- |
| **Servidor Web** | Apache (Bluehost) | `.htaccess` para blindaje |
| **Scripting de Legado** | PHP + PDO | `conexion.php` centralizado |
| **DB (Legado)** | MySQL (Bluehost) | Solo para futuras APIs internas |

### Infraestructura / Despliegue
```
GitHub (rama: main)
    └── GitHub Actions (deploy.yml)
            ├── npm install
            ├── npm run build → genera /out (HTML estático)
            └── FTP Deploy → ftp.big-i.com.mx:/public_html/
                    └── Bluehost (big-i.com.mx)
```

### Entorno de Desarrollo Local
- **Servidor Local:** XAMPP (Apache + PHP)
- **Ruta Local:** `C:\xampp\htdocs\Big-i.com.mx\Web_Page`
- **Carpeta de Respaldo (FUERA del repo):** `C:\xampp\htdocs\Big-i.com.mx\Background`
- **Node Package Manager:** npm (package-lock.json + pnpm-lock.yaml presentes)

---

## 🧩 3. MÓDULOS PRINCIPALES (CORE FEATURES)

### Módulos Activos (v1.0 — Landing Page)
1. **Header / Navegación:** Barra superior con logo BIG-i, navegación principal y toggle de tema (Light/Dark).
2. **Hero Section:** Sección principal con propuesta de valor, headline de impacto y CTA primario.
3. **Services Section:** Presentación de los servicios de Kab-Geo e Inteligencia Territorial.
4. **Footer:** Información de contacto, links institucionales y copyright.

### Módulos Planificados (Roadmap)
5. **Kab-Geo Dashboard:** Mapas interactivos con datos de georreferenciación de estaciones de servicio.
6. **Portal de Clientes:** Autenticación y acceso a reportes personalizados de inteligencia territorial.
7. **Módulo de Cotización:** Formulario inteligente para solicitudes de servicio B2B.
8. **Blog / Insights:** Contenido de valor sobre el sector de hidrocarburos en México.

---

## 🔌 4. INTEGRACIONES Y TERCEROS (APIs)

| Servicio | Propósito | Estado |
| :--- | :--- | :--- |
| **@vercel/analytics** | Métricas de visitas web | Activo |
| **Google Fonts (Inter)** | Tipografía corporativa | Activo |
| **FTP Bluehost** | Despliegue de producción | Activo (via CI/CD) |
| **Stripe / PayPal** | Pagos futuros (módulo cotización) | Planificado |
| **SendGrid / SMTP** | Emails transaccionales | Planificado |
| **Mapbox / Leaflet** | Mapas interactivos para Kab-Geo | Planificado |

---

## ⚠️ 5. REGLAS ESPECÍFICAS DEL PROYECTO

1. **Static-First:** El sitio es un export estático de Next.js. NO se pueden usar `getServerSideProps`, `API Routes` de Next.js, ni ninguna feature que requiera servidor Node.js en producción.
2. **Mobile-First Absoluto:** Todo componente nuevo debe diseñarse para 375px y escalar hacia arriba. Prohibido usar valores `px` fijos en contenedores principales.
3. **Modo Oscuro Obligatorio:** Toda paleta de colores debe funcionar correctamente en ambos temas (light / dark) usando las variables CSS de shadcn.
4. **Sin Frameworks Alternativos:** El stack es Tailwind + shadcn/ui. Prohibido agregar Bootstrap, Material UI, Chakra UI u otros frameworks de componentes.
5. **Carpeta Background es Externa:** `C:\xampp\htdocs\Big-i.com.mx\Background` es un directorio de respaldo ajeno al repo. NUNCA referenciar rutas relativas hacia ella desde el código del proyecto.
6. **Deploy solo desde `main`:** Ningún push a ramas de feature activa el despliegue. Solo `main` dispara el workflow de CI/CD.
7. **Credenciales en GitHub Secrets:** Las contraseñas FTP y cualquier API key NUNCA van hardcoded en `deploy.yml` ni en ningún archivo del repo.

---

## 🎨 6. IDENTIDAD VISUAL Y DESIGN TOKENS

| Token | Valor | Uso |
| :--- | :--- | :--- |
| **Fuente Principal** | Inter (Google Fonts) | Body + Headings |
| **Border Radius Base** | `0.625rem` (10px) | Cards, botones, inputs |
| **Color Base Light** | Neutral (shadcn) | Fondos y textos modo claro |
| **Color Base Dark** | Neutral (shadcn) | Fondos y textos modo oscuro |
| **Espacio de Color** | OKLch | CSS Variables en `globals.css` |
| **Contraste Mínimo** | 4.5:1 | Estándar WCAG 2.1 AA |
| **Estilo shadcn** | New York | Bordes más pronunciados, tipografía fuerte |
