# 🛡️ 05 - RUNTIME GUARDRAILS (ZONA DE INCERTIDUMBRE Y RESILIENCIA)
> **Rige el comportamiento del sistema cuando algo falla en producción**  
> **Última actualización:** 2026-05-12

---

## 🧠 DIRECTRIZ DE LIBERTAD ANALÍTICA PARA CLAUDE

Claude **NO es una máquina de escribir**, es un **Analista Forense**.

- **Libertad Analítica:** Si Claude detecta un bug, un edge-case no documentado, una vulnerabilidad de seguridad, o una mejor forma de validar un contrato, **TIENE PERMISO** de implementar fallbacks, reintentos y logs, **siempre que respete los 15 Mandamientos**.
- **Investigación primero:** Claude debe investigar la raíz del problema antes de proponer soluciones. Soluciones superficiales están prohibidas.
- **Reporte obligatorio:** Toda anomalía detectada fuera del alcance de la tarea actual debe **reportarse al Arquitecto** aunque no se corrija en el momento.

---

## 🧱 REGLAS DE RESILIENCIA FRONTEND (Next.js / React)

### Regla F1 — Error Boundaries
Todo componente de sección que consuma datos externos (API futura, localStorage, etc.) debe estar envuelto en un Error Boundary de React.

```tsx
// Patrón obligatorio para componentes con datos externos
import { ErrorBoundary } from 'react-error-boundary';

function FallbackComponent({ error }: { error: Error }) {
  return (
    <div role="alert" className="p-4 text-destructive">
      <p>Esta sección no está disponible temporalmente.</p>
    </div>
  );
}
```

### Regla F2 — Loading States
Todo componente que haga fetch asíncrono debe implementar un estado de carga explícito usando los componentes de shadcn (`Skeleton`):

```tsx
// Prohibido: render vacío o null durante carga
// Obligatorio: Skeleton de shadcn/ui
import { Skeleton } from '@/components/ui/skeleton';

if (isLoading) return <Skeleton className="h-48 w-full" />;
```

### Regla F3 — Manejo de Errores en Fetch
```tsx
async function fetchData(url: string) {
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (error) {
    // Log del error (no exponer al usuario)
    console.error('[BIG-i] Fetch error:', error);
    // Retornar estado vacío tipado, nunca undefined/null sin tipo
    return { status: 'error', message: 'Servicio no disponible', data: [] };
  }
}
```

### Regla F4 — Tipado Estricto (Anti-any)
```typescript
// PROHIBIDO
const data: any = response.json();

// OBLIGATORIO
interface EstacionResponse {
  status: 'success' | 'error';
  message: string;
  data: Estacion[];
}
const data: EstacionResponse = await response.json();
```

### Regla F5 — Static Export Edge Cases
Dado que el proyecto usa `output: 'export'`:
- `useRouter()` de next/navigation no tiene acceso a `query` en páginas estáticas. Usar `useSearchParams()` en un Client Component.
- `usePathname()` funciona, pero las rutas deben existir en el build.
- Imágenes externas requieren `unoptimized: true` (ya configurado en `next.config.mjs`).
- No usar `cookies()`, `headers()`, ni `redirect()` del lado del servidor.

---

## 🧱 REGLAS DE RESILIENCIA BACKEND (PHP / API)

### Regla B1 — Caja Negra (Sistema de Logs Centralizado)
**PROHIBIDO** mostrar errores de PHP, PDO o SQL en el frontend.  
**OBLIGATORIO** atrapar todo error y escribirlo en logs:

```php
try {
    $stmt = $pdo->prepare("SELECT * FROM estaciones_servicio WHERE activo = 1");
    $stmt->execute();
    $data = $stmt->fetchAll(PDO::FETCH_ASSOC);
} catch (PDOException $e) {
    $logMsg = date('[Y-m-d H:i:s]') . " ENDPOINT: " . basename(__FILE__) . 
              " | ERROR: " . $e->getMessage() . 
              " | IP: " . ($_SERVER['REMOTE_ADDR'] ?? 'unknown') . "\n";
    error_log($logMsg, 3, __DIR__ . '/../logs/error.log');
    
    http_response_code(500);
    echo json_encode([
        "status" => "error",
        "message" => "Error interno del servidor. Por favor intenta más tarde.",
        "data" => []
    ]);
    exit;
}
```

### Regla B2 — Fallback Tipado (No crashear por datos incompletos)
Si un campo no crítico llega vacío o nulo, usar valor por defecto con tipado:

```php
// PROHIBIDO: sin validación
$empresa = $_POST['empresa'];

// OBLIGATORIO: con fallback tipado
$empresa = isset($_POST['empresa']) ? trim(htmlspecialchars(strip_tags($_POST['empresa']))) : '';
```

### Regla B3 — Circuit Breaker para APIs Externas
Si una API externa (Stripe, SendGrid, Mapbox) falla:
1. Capturar la excepción con `try/catch`.
2. Escribir el error en `logs/error.log`.
3. Retornar degradación controlada al frontend (mensaje amigable).
4. **NUNCA** dejar que un fallo externo detenga la ejecución del servidor con errores fatales.

### Regla B4 — Validación Automática de Contratos
Por cada endpoint en `03_CONTRATOS_API_Y_LOGICA.md`, implementar validación de payload antes de tocar la DB:

```php
// Validar método HTTP
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(["status" => "error", "message" => "Método no permitido.", "data" => []]);
    exit;
}

// Validar campos requeridos
$required = ['nombre_prospecto', 'email_prospecto', 'mensaje'];
foreach ($required as $field) {
    if (empty($_POST[$field])) {
        http_response_code(422);
        echo json_encode([
            "status" => "error",
            "message" => "El campo '{$field}' es obligatorio.",
            "data" => []
        ]);
        exit;
    }
}
```

---

## 🚨 PROTOCOLO DE DEGRADACIÓN CONTROLADA

| Escenario de Fallo | Comportamiento Esperado | Prohibido |
| :--- | :--- | :--- |
| DB no disponible | Log + mensaje genérico al usuario | Mostrar el error de PDO |
| API externa timeout | Log + fallback de UI (Skeleton/mensaje) | Dejar pantalla en blanco |
| Build de Next.js falla | El deploy NO se activa (GitHub Actions falla) | Subir código roto via FTP manual |
| Formulario con datos inválidos | Validación en cliente (Zod) + server (PHP 422) | Insertar datos sin validar |
| Imagen no encontrada | Placeholder de `Skeleton` o alt text descriptivo | Error 404 visual sin fallback |
| Secret FTP no configurado | GitHub Actions falla con log claro | Deploy sin autenticación |

---

## 🔍 PROTOCOLO FORENSE (DIAGNÓSTICO DE BUGS)

Cuando se reporta un bug, Claude sigue este orden:

1. **Leer los logs** (`logs/error.log`, consola del browser, GitHub Actions log).
2. **Reproducir en local** (XAMPP) antes de proponer solución.
3. **Identificar la causa raíz** (no el síntoma).
4. **Proponer solución** al Arquitecto con: archivo afectado, línea, causa, fix propuesto.
5. **Implementar solo con autorización** del Arquitecto.
6. **Documentar** si la causa raíz revela un edge-case no cubierto en este Codex.

---

## ⚡ PERFORMANCE GUARDRAILS (NEXT.JS STATIC)

| Métrica | Target | Cómo Lograrla |
| :--- | :--- | :--- |
| LCP (Largest Contentful Paint) | < 2.5s | Optimizar imagen del Hero (WebP, lazy load) |
| CLS (Layout Shift) | < 0.1 | Reservar espacio con `aspect-ratio` antes de cargar |
| FID / INP | < 200ms | Minimizar JS en el thread principal |
| Tamaño del bundle JS | < 200KB | Usar dynamic imports para componentes pesados |
| Imágenes | < 200KB c/u | WebP + dimensiones explícitas en `<Image>` |

```tsx
// Importación dinámica para componentes pesados (charts, mapas)
import dynamic from 'next/dynamic';

const MapComponent = dynamic(() => import('@/components/map'), {
  loading: () => <Skeleton className="h-96 w-full" />,
  ssr: false,
});
```
