# 🤝 03 - CONTRATOS DE API Y LÓGICA DE NEGOCIO
> **Fuente de Verdad para Intercambio de Datos entre Frontend y Backend**  
> **Última actualización:** 2026-05-12

---

## 📡 PROTOCOLO DE INTEGRACIÓN GLOBAL

| Parámetro | Valor |
| :--- | :--- |
| **Formato de intercambio** | JSON UTF-8 |
| **Headers Base** | `Content-Type: application/json`, `Accept: application/json` |
| **CORS** | Habilitado solo para `big-i.com.mx` y `localhost` (desarrollo) |
| **Métodos permitidos** | GET, POST, OPTIONS |
| **Autenticación** | JWT Bearer Token (módulos protegidos) |
| **Versión de API** | `/api/v1/` (prefijo estándar) |

### Estructura Estándar de Respuesta (INMUTABLE)
```json
{
  "status": "success | error",
  "message": "Descripción legible para humano",
  "data": []
}
```

**Reglas de la estructura:**
- `status`: Solo `"success"` o `"error"`. Cero variaciones (`"ok"`, `"fail"`, `true`, `false`).
- `message`: Siempre string en español. Nunca exponer errores internos de PHP/SQL.
- `data`: Array de objetos o objeto único. Nunca `null` — usar `[]` si no hay datos.

### Códigos HTTP Estándar
| Código | Cuándo Usarlo |
| :--- | :--- |
| `200 OK` | Solicitud exitosa con datos |
| `201 Created` | Recurso creado exitosamente |
| `400 Bad Request` | Payload inválido o faltante |
| `401 Unauthorized` | Sin token o token inválido |
| `403 Forbidden` | Token válido pero sin permiso |
| `404 Not Found` | Recurso no encontrado |
| `422 Unprocessable` | Validación de negocio fallida |
| `500 Server Error` | Error interno (solo en logs, nunca expuesto) |

---

## 🛠️ ENDPOINTS REGISTRADOS (CONTRATOS ACTUALES)

> **Estado actual:** El sitio es 100% estático (Next.js export). Los endpoints PHP son para módulos dinámicos futuros alojados en Bluehost.

---

### Endpoint: `api/contacto.php`
**Estado:** Planificado (no implementado)  
**Propósito:** Recibir formulario de contacto de prospectos B2B.

**Método:** `POST`

**Payload Requerido (Frontend → Backend):**
```json
{
  "nombre_prospecto": "string (req, max 150)",
  "email_prospecto": "string (req, email válido)",
  "empresa": "string (opt, max 200)",
  "mensaje": "string (req, min 10, max 1000)"
}
```

**Response Success (Backend → Frontend):**
```json
{
  "status": "success",
  "message": "Tu mensaje fue recibido. Te contactaremos en breve.",
  "data": []
}
```

**Response Error — Validación:**
```json
{
  "status": "error",
  "message": "El correo electrónico no tiene un formato válido.",
  "data": []
}
```

**Validaciones de negocio:**
1. Email debe pasar `filter_var($email, FILTER_VALIDATE_EMAIL)`.
2. Campos requeridos: `nombre_prospecto`, `email_prospecto`, `mensaje`.
3. Sanitización: `htmlspecialchars()` + `strip_tags()` en todos los strings.
4. Rate limiting: Máximo 3 envíos por IP por hora.

---

### Endpoint: `api/estaciones.php`
**Estado:** Planificado (no implementado)  
**Propósito:** Retornar datos de estaciones de servicio para el mapa Kab-Geo.

**Método:** `GET`

**Query Params:**
```
?estado=Jalisco&tipo=magna&limit=50&offset=0
```

**Response Success:**
```json
{
  "status": "success",
  "message": "Estaciones obtenidas correctamente.",
  "data": [
    {
      "estacion_id": 1,
      "nombre_comercial": "Estación Ejemplo SA",
      "municipio": "Guadalajara",
      "estado": "Jalisco",
      "latitud": 20.659698,
      "longitud": -103.349609,
      "tipo_hidrocarburo": "magna",
      "activo": true
    }
  ]
}
```

**Reglas de negocio:**
1. Solo retornar registros con `activo = 1`.
2. Paginación obligatoria: `limit` máximo 100, default 50.
3. Filtro por `estado` es opcional; sin filtro, retorna todos.
4. Requiere JWT válido (endpoint protegido).

---

## 🧠 LÓGICA DE NEGOCIO (REGLAS DE PIEDRA)

### Regla 1 — Integridad Geoespacial
Toda coordenada almacenada debe cumplir rangos válidos para México:
- Latitud: entre `14.5°N` y `32.7°N`
- Longitud: entre `-118.5°W` y `-86.7°W`
- Cualquier valor fuera de rango → rechazar con `422` antes de insertar en DB.

### Regla 2 — Inmutabilidad de Registros Históricos
Los registros de ventas (`litros_vendidos`) **nunca se eliminan físicamente** (DELETE).  
Solo se puede usar soft delete (`activo = 0`). Auditoría completa vía `created_at`.

### Regla 3 — Unicidad de Email de Prospecto
Un email de prospecto solo puede enviar el formulario de contacto **3 veces por semana**.  
Controlar con tabla `prospectos_contacto` consultando `created_at`.

### Regla 4 — Blindaje Técnico Estándar
En todo endpoint PHP aplicar:
```php
// Sanitización básica
$input = trim(htmlspecialchars(strip_tags($_POST['campo'] ?? '')));

// Validación de tipo numérico
$id = filter_var($_POST['id'] ?? 0, FILTER_VALIDATE_INT);
if ($id === false || $id <= 0) {
    http_response_code(400);
    echo json_encode(["status" => "error", "message" => "ID inválido.", "data" => []]);
    exit;
}
```

### Regla 5 — Logs de Error (Caja Negra)
**PROHIBIDO** exponer errores de PHP, PDO o SQL en la respuesta JSON al frontend.  
Todo error se escribe en `logs/error.log` con formato:
```
[2026-05-12 14:30:00] ENDPOINT: contacto.php | ERROR: SQLSTATE[...] | IP: 192.168.1.1
```

---

## 📦 LIBRERÍA DE SNIPPETS

> Consultar `/knowledge/snippets/` antes de crear componentes nuevos.  
> Si existe un snippet probado y documentado, **usarlo directamente** sin modificaciones no autorizadas.

| Snippet | Archivo | Descripción |
| :--- | :--- | :--- |
| Conexión PDO | `conexion.php` | Clase singleton de conexión MySQL |
| `.htaccess` blindado | `.htaccess` | Configuración Apache con headers de seguridad |
| Env template | `.env.example` | Variables de entorno documentadas |

---

## 🔒 ENFORCEMENT AUTOMÁTICO

Por cada endpoint documentado aquí, la IA **DEBE** crear:
1. Un validador PHP que rechace payloads inválidos con `422` antes de tocar la DB.
2. Un try/catch alrededor de toda operación PDO que escriba en `logs/error.log`.
3. Verificación de método HTTP (`$_SERVER['REQUEST_METHOD']`) al inicio del script.
