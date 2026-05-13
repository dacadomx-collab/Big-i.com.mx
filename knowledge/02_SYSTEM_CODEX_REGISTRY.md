# 🧬 02 - SYSTEM CODEX & REGISTRY (DICCIONARIO DE ORO)
> **Fuente de Verdad Única para Variables, Componentes y Esquemas**  
> **Última actualización:** 2026-05-12

---

## 🧠 REGISTRO SEMÁNTICO (VOCABULARIO CONTROLADO)

### Términos del Dominio de Negocio
| Concepto | Término Oficial | ❌ Prohibido Usar |
| :--- | :--- | :--- |
| Punto de venta de combustible | `estacion_servicio` | `gasolinera`, `bomba`, `estacion`, `gas_station` |
| Producto vendido | `hidrocarburo` | `combustible`, `gas`, `petroleo`, `fuel` |
| Análisis de ubicación | `inteligencia_territorial` | `geoanalisis`, `mapas`, `geo_data` |
| Coordenadas de ubicación | `geolocalizacion` | `coords`, `lat_lng`, `ubicacion` |
| Cliente empresarial | `prospecto_b2b` | `cliente`, `usuario`, `lead`, `contacto` |
| Servicio ofrecido | `solucion` | `producto`, `plan`, `paquete`, `servicio` |

---

## 📊 MAPEO DE VARIABLES VALIDADAS (FRONT VS BACK)

> **Nota:** Las variables de Backend/DB aplican a la futura capa PHP/MySQL en Bluehost.  
> El frontend Next.js actual consume datos estáticos; este mapeo es para módulos dinámicos futuros.

| Concepto | DB / Backend (snake_case) | Frontend (camelCase) | Tipo de Dato |
| :--- | :--- | :--- | :--- |
| ID de estación | `estacion_id` | `estacionId` | Int (PK) |
| Nombre comercial | `nombre_comercial` | `nombreComercial` | String |
| Municipio / Ciudad | `municipio` | `municipio` | String |
| Estado de la Rep. | `estado` | `estado` | String |
| Latitud | `latitud` | `latitud` | Decimal(10,8) |
| Longitud | `longitud` | `longitud` | Decimal(11,8) |
| Litros vendidos | `litros_vendidos` | `litrosVendidos` | Decimal(12,2) |
| Tipo de hidrocarburo | `tipo_hidrocarburo` | `tipoHidrocarburo` | Enum |
| Fecha de registro | `created_at` | `createdAt` | Timestamp |
| Estado del registro | `activo` | `activo` | Boolean |
| Nombre del prospecto | `nombre_prospecto` | `nombreProspecto` | String |
| Email del prospecto | `email_prospecto` | `emailProspecto` | String |
| Empresa del prospecto | `empresa` | `empresa` | String |
| Mensaje de contacto | `mensaje` | `mensaje` | Text |

> **Conexión a DB:** Toda consulta MySQL usa `api/conexion.php` (PDO centralizado), leyendo `DB_HOST`, `DB_NAME`, `DB_USER`, `DB_PASS` del `.env`.

---

## 🗄️ ESTRUCTURA DE TABLAS (SCHEMA — Planificado)

### Tabla: `estaciones_servicio`
| Columna | Tipo | Descripción |
| :--- | :--- | :--- |
| `estacion_id` | INT UNSIGNED AUTO_INCREMENT PK | Identificador único |
| `nombre_comercial` | VARCHAR(150) NOT NULL | Nombre de la gasolinera |
| `municipio` | VARCHAR(100) NOT NULL | Municipio donde opera |
| `estado` | VARCHAR(100) NOT NULL | Estado de la República |
| `latitud` | DECIMAL(10,8) NOT NULL | Coordenada geográfica |
| `longitud` | DECIMAL(11,8) NOT NULL | Coordenada geográfica |
| `tipo_hidrocarburo` | ENUM('magna','premium','diesel') NOT NULL | Tipo de combustible |
| `activo` | TINYINT(1) DEFAULT 1 | Soft delete |
| `created_at` | TIMESTAMP DEFAULT CURRENT_TIMESTAMP | Fecha de alta |

### Tabla: `prospectos_contacto`
| Columna | Tipo | Descripción |
| :--- | :--- | :--- |
| `prospecto_id` | INT UNSIGNED AUTO_INCREMENT PK | Identificador único |
| `nombre_prospecto` | VARCHAR(150) NOT NULL | Nombre completo |
| `email_prospecto` | VARCHAR(255) NOT NULL | Correo electrónico |
| `empresa` | VARCHAR(200) | Empresa representada |
| `mensaje` | TEXT NOT NULL | Descripción de necesidad |
| `created_at` | TIMESTAMP DEFAULT CURRENT_TIMESTAMP | Fecha de envío |
| `procesado` | TINYINT(1) DEFAULT 0 | Si fue atendido |

---

## 🧩 REGISTRO DE COMPONENTES FRONTEND

### Componentes de Página (Page-Level)
| Componente | Ruta | Tipo | Estado | Props |
| :--- | :--- | :--- | :--- | :--- |
| `RootLayout` | `app/layout.tsx` | Layout | ✅ Activo | `children: ReactNode` |
| `HomePage` | `app/page.tsx` | Page | ✅ Activo | — |

### Componentes de Sección
| Componente | Ruta | Tipo | Estado | Props Principales |
| :--- | :--- | :--- | :--- | :--- |
| `Header` | `components/header.tsx` | UI/Nav | ✅ Activo | — |
| `HeroSection` | `components/hero-section.tsx` | UI/Section | ✅ Activo | — |
| `ServicesSection` | `components/services-section.tsx` | UI/Section | ✅ Activo | — |
| `Footer` | `components/footer.tsx` | UI/Section | ✅ Activo | — |
| `ThemeProvider` | `components/theme-provider.tsx` | Logic/Provider | ✅ Activo | `children`, `attribute`, `defaultTheme` |

### Componentes de UI (shadcn/ui — New York Style)
> 57 componentes instalados en `components/ui/`. Consultar la lista completa en el directorio.  
> **Regla:** Siempre usar los componentes de `components/ui/` antes de crear uno desde cero.

| Componente | Ruta | Uso Principal |
| :--- | :--- | :--- |
| `Button` | `components/ui/button.tsx` | CTAs, acciones |
| `Card` | `components/ui/card.tsx` | Tarjetas de servicios |
| `Dialog` | `components/ui/dialog.tsx` | Modales |
| `Form` | `components/ui/form.tsx` | Formularios con react-hook-form |
| `Input` | `components/ui/input.tsx` | Campos de texto |
| `Sonner` | `components/ui/sonner.tsx` | Notificaciones toast |
| `NavigationMenu` | `components/ui/navigation-menu.tsx` | Navegación principal |
| `Sidebar` | `components/ui/sidebar.tsx` | Sidebar futuro de dashboard |
| `Chart` | `components/ui/chart.tsx` | Gráficas con Recharts |

### Hooks Personalizados
| Hook | Ruta | Propósito |
| :--- | :--- | :--- |
| `useMobile` | `hooks/use-mobile.ts` | Detecta si el viewport es móvil |
| `useToast` | `hooks/use-toast.ts` | Gestión de notificaciones toast |

### Utilidades
| Función | Ruta | Propósito |
| :--- | :--- | :--- |
| `cn()` | `lib/utils.ts` | Merge de clases Tailwind (clsx + tailwind-merge) |

---

## 📁 ESTRUCTURA DE ARCHIVOS DE CONFIGURACIÓN

| Archivo | Propósito | Modificable |
| :--- | :--- | :--- |
| `next.config.mjs` | Config Next.js (static export, TS ignore, imágenes) | Solo Arquitecto |
| `tailwind.config.*` | Config Tailwind (actualmente vía `globals.css`) | Solo Arquitecto |
| `components.json` | Config shadcn/ui (estilo New York, paths de alias) | Solo Arquitecto |
| `tsconfig.json` | Config TypeScript (alias `@/*`, strict mode) | Solo Arquitecto |
| `postcss.config.mjs` | PostCSS con plugin Tailwind v4 | Solo Arquitecto |
| `.gitignore` | Exclusiones del repositorio | Solo Arquitecto |
| `.github/workflows/deploy.yml` | CI/CD pipeline (build + FTP deploy) | Solo Arquitecto |

---

## 🔐 REGISTRO DE SECRETS (Solo Referencias — Valores en GitHub Secrets)

| Secret Name | Descripción | Usado en |
| :--- | :--- | :--- |
| `FTP_PASSWORD` | Contraseña del usuario FTP de Bluehost | `deploy.yml` |
| `FTP_USERNAME` | Usuario FTP (si se parametriza) | `deploy.yml` (opcional) |
