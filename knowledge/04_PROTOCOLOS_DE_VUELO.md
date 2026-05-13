# 🧪 04 - PROTOCOLOS DE VUELO (CHECKLISTS DE CALIDAD)
> **Género:** Agente Autónomo · Arquitecto Ejecutor · Génesis Élite v2  
> **Última actualización:** 2026-05-12

---

## 🤖 DIRECTRIZ DE AGENTE AUTÓNOMO

Claude actúa como **Agente Integrado** con permisos de lectura/escritura directa en el sistema de archivos del proyecto.

**PROHIBIDO:**
- Entregar bloques de código para que el humano los copie/pegue manualmente.
- Dar instrucciones tipo "ahora tú ve a modificar el archivo X".
- Inventar rutas, variables o funciones que no existan en el Codex.

**OBLIGATORIO:**
- Buscar, abrir, editar y guardar archivos directamente con las herramientas disponibles.
- Verificar el resultado de cada escritura.
- Emitir un "Informe de Operación" al terminar cada fase.

**FLUJO DE TRABAJO:**
```
Arquitecto define estrategia
    → Claude lee el Codex (00-05)
    → Claude ejecuta cambios directamente en archivos
    → Claude reporta: archivos tocados, anomalías detectadas, próximos pasos
```

---

## 🛫 PRE-CODE CHECKLIST (OBLIGATORIO ANTES DE GENERAR CÓDIGO)

Antes de escribir una sola línea de código, confirmar:

- [ ] ¿Las variables a usar están registradas en `02_SYSTEM_CODEX_REGISTRY.md`?
- [ ] ¿El endpoint respeta el contrato definido en `03_CONTRATOS_API_Y_LOGICA.md`?
- [ ] ¿El diseño propuesto es Mobile-First (375px base)?
- [ ] ¿Existe alguna Regla de Piedra en `03_CONTRATOS_API_Y_LOGICA.md` que afecte esta lógica?
- [ ] ¿El componente a crear NO existe ya en `components/ui/` (shadcn)?
- [ ] ¿Para Next.js static export: la feature NO requiere SSR/API Routes?

---

## 🏗️ FOUNDATION CHECK (ARRANQUE DE PROYECTO NUEVO)

Al iniciar un proyecto desde cero, confirmar ANTES de cualquier código visual:

- [ ] ¿Existe `.env` con todas las credenciales locales?
- [ ] ¿Existe `.env.example` como plantilla pública (sin valores reales)?
- [ ] ¿Existe `.htaccess` con blindaje Apache (bloqueo de carpetas ocultas, headers de seguridad)?
- [ ] ¿Existe `api/conexion.php` con conexión PDO centralizada?
- [ ] ¿El `.gitignore` protege el `.env` real y excluye archivos pesados?
- [ ] ¿Existe `CLAUDE.md` como Agente Residente del proyecto?

---

## 🔒 SYSTEM IMMUTABILITY CHECK

Antes de cualquier operación sobre la base de datos:

- [ ] ¿Estoy intentando crear una tabla o campo nuevo sin permiso explícito del Arquitecto? → **DETENERSE**.
- [ ] ¿Estoy intentando modificar el schema sin que esté documentado en `02_SYSTEM_CODEX_REGISTRY.md`? → **DETENERSE**.
- [ ] ¿Estoy intentando "optimizar" una consulta que alteraría el Codex? → **REPORTAR PRIMERO, no ejecutar**.

---

## 🛬 POST-CODE VALIDATION (AUTO-AUDITORÍA)

Antes de entregar cualquier código al Arquitecto:

**Calidad:**
- [ ] ¿El código pasó por TypeScript sin errores (`tsc --noEmit`)?
- [ ] ¿ESLint no reporta warnings? (`next lint`)
- [ ] ¿Se eliminaron variables e imports no usados (dead code)?
- [ ] ¿Cero `console.log` en código que irá a producción?

**Seguridad:**
- [ ] ¿Se sanitizaron todos los inputs de usuario?
- [ ] ¿No hay credenciales hardcodeadas?
- [ ] ¿Los errores de servidor no se exponen al frontend?

**Diseño:**
- [ ] ¿Probé el componente en modo oscuro?
- [ ] ¿El diseño funciona en 375px (móvil)?
- [ ] ¿Se usaron variables semánticas de color (no colores hardcoded)?

---

## 🚀 PROTOCOLO DE DESPLIEGUE (CI/CD NEXT.JS → FTP)

### Flujo Automático (GitHub Actions)
```
git push origin main
    → GitHub Actions trigger
        1. Checkout del repositorio
        2. Setup Node.js 20
        3. npm install (con caché de dependencias)
        4. npm run build → genera carpeta /out (HTML estático)
        5. FTP Deploy (SamKirkland/FTP-Deploy-Action)
            → Sube /out → ftp.big-i.com.mx:/public_html/
```

### Pre-Push Checklist Manual
Antes de hacer `git push origin main`:

- [ ] ¿El build local `npm run build` termina sin errores?
- [ ] ¿El `.env` está en `.gitignore` y NO aparece en `git status`?
- [ ] ¿Los GitHub Secrets (`FTP_PASSWORD`) están configurados en el repositorio?
- [ ] ¿La carpeta `/out` está en `.gitignore` (el CI la genera, no se commitea)?
- [ ] ¿La carpeta de respaldo `/Background` no tiene rutas referenciadas en el código?
- [ ] ¿Se verificó visualmente el sitio en local con `npm run dev` antes del push?
- [ ] **Eliminación de Residuos:** ¿Confirmé que el archivo info.txt no se va a subir a github ni al servidor 

### Verificación Post-Deploy
- [ ] ¿Funciona `https://big-i.com.mx` sin errores 404 en activos (CSS, JS, imágenes)?
- [ ] ¿El modo oscuro alterna correctamente en producción?
- [ ] ¿No hay errores en la consola del navegador?
- [ ] ¿Las métricas de Vercel Analytics reciben eventos?

---

## 🛡️ AUDITORÍA DE SEGURIDAD (AXON DCD)

Al completar una versión mayor, validar con AXON DCD (`/AXON_DCD/index.php`):

- [ ] **Permisos de servidor:** Directorios `755`, archivos `644`.
- [ ] **Cero fugas:** No hay archivos críticos expuestos (`.env`, `config.php`, `.sql`, `.log`).
- [ ] **Cabeceras HTTP:** `X-Frame-Options: SAMEORIGIN`, `X-Content-Type-Options: nosniff`, `Content-Security-Policy` configurado.
- [ ] **SSL:** Certificado válido y redirect forzado HTTP → HTTPS.
- [ ] **Puertos abiertos:** Solo 80 (HTTP), 443 (HTTPS), 21 (FTP cerrado a IPs conocidas).
---

## ✅ POST-IMPLEMENTACIÓN (DOCUMENTACIÓN VIVA)

Después de que el Arquitecto confirme que un componente funciona en producción:

- [ ] **Codex actualizado:** ¿Se registró el nuevo componente en `02_SYSTEM_CODEX_REGISTRY.md`?
- [ ] **Contrato verificado:** ¿El endpoint en `03_CONTRATOS_API_Y_LOGICA.md` coincide 100% con el código final?
- [ ] **ADN actualizado:** ¿Si es un módulo nuevo, se añadió a `00_ADN_DEL_PROYECTO.md`?
- [ ] **Informe emitido:** ¿Claude reportó al Arquitecto: archivos tocados, anomalías, siguiente paso?

---

## 🔄 PROTOCOLO DE ACTUALIZACIÓN DEL CODEX

**Cuándo actualizar los archivos de knowledge:**
- Al agregar un nuevo componente React → Actualizar `02_SYSTEM_CODEX_REGISTRY.md`.
- Al definir o cambiar un endpoint API → Actualizar `03_CONTRATOS_API_Y_LOGICA.md`.
- Al cambiar el stack tecnológico → Actualizar `00_ADN_DEL_PROYECTO.md`.
- Al agregar un mandamiento nuevo → Actualizar `01_LEY_Y_MANDAMIENTOS.md`.
- Al detectar un nuevo edge-case de resiliencia → Actualizar `05_RUNTIME_GUARDRAILS.md`.

**Quién puede actualizar:** Solo el Arquitecto (humano) o Claude bajo instrucción explícita.  
**Formato de versión:** Actualizar siempre la fecha en el header del archivo.
