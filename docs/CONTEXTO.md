# Contexto de Orbe Apps

Actualizado: 26 nov 2026. Léelo antes de trabajar en este repositorio. Las reglas de diseño y de trabajo están en [`ESTILO.md`](ESTILO.md).

## 1. Qué es

**Orbe Apps** hace apps, catálogos con pedidos por WhatsApp, páginas web y apps a medida para negocios pequeños de Latinoamérica y negocios hispanos de EE. UU. y España. Trabaja a distancia. Es la unidad de software de **Orbe Group**; la otra unidad es **AVENOR** (marketing y crecimiento). Dueño: Guillermo (Maracaibo, Venezuela).

Este repositorio contiene:

- La **web de ventas**.
- Las **4 apps listas** (Inventario, Agenda de citas, Cuaderno de fiados y Presupuesto del mes).
- Las plantillas de **catálogo** y de **reservas**, con sus demos.
- El **contenido de Instagram** de @orbe.apps.

## 2. Dónde se publica

| Qué | Repositorio | Rama publicada | Dirección |
|---|---|---|---|
| **Web de ventas, apps, catálogos y reservas (este repo)** | `Orbe7Apps/orbe-apps` | **`main`** (GitHub Pages, raíz) | https://orbe7apps.github.io/orbe-apps/ |
| App Orbe Negocios + páginas que redirigen las rutas viejas | `Orbe7Apps/orbe-negocios` | `claude/nice-davinci-3ovhvv` | https://orbe7apps.github.io/orbe-negocios/ (demo: `?demo`) |
| App Orbe Finanzas | `Orbe7Apps/Orbe-Finanzas` (antes `misgastos`) | `main` | https://orbe7apps.github.io/Orbe-Finanzas/ (demo: `?demo`) |
| Orbe Sellos | `Orbe7Apps/orbe-sellos` | — | No auditado desde aquí |

- En las herramientas de GitHub de Claude, orbe-negocios y Orbe-Finanzas se alcanzan con el dueño **`gllm57`** (`gllm57/orbe-negocios` y `gllm57/misgastos`), porque fueron transferidos. Los enlaces públicos y los que se muestran al usuario usan siempre **Orbe7Apps**.
- Cambios en orbe-negocios: se trabaja en una rama, se abre un PR hacia `claude/nice-davinci-3ovhvv` y se une. Otra sesión de Claude trabaja allí ("Orbe Negocios"); hay que avisarle si se toca su código.
- Cambios en Orbe-Finanzas: PR hacia `main`. También tiene su propia sesión de Claude.

## 3. Cómo está hecha

- **Sin framework ni compilación.** HTML, CSS y JavaScript puros, servidos tal cual por GitHub Pages. Para probar en local: `python3 -m http.server 8795` en la raíz.
- **`index.html`:** la web de ventas completa, en un solo archivo con su CSS y su JS.
  - Orden de secciones: portada → lo que quita tiempo → **Apps** (`#microapps`: 4 apps + catálogo + reservas) → catálogo (`#catalogo`) → reservas (`#reservas`) → **Servicios** (`#precios`) → cómo trabajamos → **Nuestras apps** (`#trabajos`: Orbe Negocios y Orbe Finanzas) → preguntas (`#preguntas`) → cotizar (`#cotizar`).
  - Menú fijo arriba (clase `.nav.pegado` al bajar). En el teléfono, el "Cotizar gratis" está en la barra fija de abajo (`.fijo`).
  - El formulario de cotizar envía por Instagram (copia el mensaje y abre el chat de @orbe.apps) o por correo.
  - Las constantes `INSTAGRAM`, `CORREO` y `WHATSAPP` (vacía) están en el JS del final.
  - Portada: catálogo real dentro de un teléfono (iframe), con un anillo en dos capas SVG (`.orbita` detrás y `.orbita-frente` delante). La capa de adelante no bloquea los toques.
- **`apps/`:** las 4 apps listas.
  - Base común en `apps/base/app.js` y `app.css`; cada app tiene su `.js`, `icono.svg`, manifiesto y `sw.js`.
  - Datos en el navegador (`localStorage`), sin servidor.
  - Modo demo con datos de ejemplo. El código `PRE-XXXX-XXXX` (o `?codigo=`) activa la versión completa; se valida dentro de la app, sin servidor.
  - La hoja "Cotiza tu app" ofrece cotizar por correo o por Instagram.
  - **Al cambiar algo de una app, sube la versión de `CACHE` en los 4 `sw.js`** (hoy van en `v12`).
- **`catalogos/`:** `base/` (motor) + una carpeta por negocio con `negocio.js` (nombre, WhatsApp, colores, letras) y `productos.csv` (u hoja de Google publicada). Demo: `dulce-hogar/`. Pedido por enlace `wa.me`.
- **`reservas/`:** `base/` + `barberia-el-filo/negocio.js`. **No tiene servidor:** muestra las horas del horario del negocio y la solicitud llega por WhatsApp; el negocio confirma. No hay disponibilidad en vivo.
- **`contenido/`:** carruseles y reels de Instagram con sus fuentes y herramientas. La guía del agente de redes está en `.claude/skills/redes-orbe/`.
- **`herramientas/pruebas/`:** scripts de Playwright para revisar la web (ver su `LEEME.md`).

## 4. Decisiones tomadas

| Fecha | Decisión |
|---|---|
| 23 nov | **Una sola web oficial: `orbe-apps`.** Las rutas viejas de orbe-negocios (`servicios/`, `apps/`, `catalogos/`) redirigen conservando `?codigo=` y `#`. Todo cambio de la web se hace solo aquí. La bio de @orbe.apps ya apunta a la web nueva. |
| 23 nov | **No anunciar funciones que no existen.** Reservas no promete "horas libres en vivo"; se quitó "Orbe en la nube · Muy pronto". |
| 24 nov | ChatGPT y Claude tienen **acceso ilimitado a todo Notion**. La Zona Compartida es solo el centro de coordinación. |
| 25 nov | **La web no muestra precios:** solo botones "Cotizar". Los precios vigentes se dan al cotizar (ver abajo). |
| 25 nov | **Nunca "pago único", "para siempre" ni "sin mensualidad".** Algunas apps llevan servidor y cobran mensualidad, aunque sea mínima; se aclara en cada cotización. |
| 25 nov | **Demos con datos:** "Abrir la demo" usa `?demo` en Orbe Negocios (ferretería de ejemplo con todo encendido) y en Orbe Finanzas (dos meses de ejemplo). Sus datos van aparte (`orbe-negocios-demo` y `gastos-demo`) y nunca tocan datos reales. |
| 25 nov | Catálogo (Dulce Hogar) y reservas (Barbería El Filo) aparecen junto a las 4 apps, con "Ver ejemplo" y "Cotizar". |
| 25–26 nov | En lo visible se dice **"Apps"** (no "microapps") y **"Servicios"** (no "Planes"). La sección de Orbe Negocios y Finanzas se llama **"Nuestras apps"**. Hay **un solo botón de Instagram**, en el menú de arriba. |

**Precios vigentes (internos, para cotizar):** app lista 17 USD · catálogo con pedidos 49 USD · página de negocio 89 USD · app a medida desde 149 USD · mantenimiento 7 USD al mes. No usar otros. Están pendientes de aprobación: app completa desde 349, página de reservas, extras del catálogo, dominio y cambios de diseño. AVENOR no tiene precios aprobados.

**Contacto:** Instagram @orbe.apps y orbeappsoficial@gmail.com. Todavía no hay WhatsApp de trabajo.

## 5. Notion (fuente de verdad del negocio)

- **Orbe Group · Centro de Operaciones:** `42032d6ac60281b687fef6ed0d8e82ad`
  - **Zona Compartida:** Pendientes, Proyectos, Decisiones y Puente.
  - **Puente:** `41b32d6ac6028180a966d9be41024f90`. "Tirar aquí" para ChatGPT o Guillermo; "Respuestas de Claude"; "Guardado" para lo permanente.
- **Orbe Apps · Área de negocio:** `42132d6ac602810e9aa7ffe718c57e94`
  - Catálogo y precios, Estado real de los productos, Web y demos, Procesos, Material de ventas, Documentación técnica.
  - **Plan del negocio:** `40a32d6ac6028114947de1e68bc8eaa3`, con Embudo y Publicaciones.
  - Códigos de activación.
- **AVENOR:** `42032d6ac602816fbdb2f88fccccae40`. Servicios y precios, Procesos, CRM, Calendario editorial, Campañas y métricas, propuesta del estudio de belleza (borrador).
- **Decisiones:** `collection://42132d6a-c602-812c-b039-000b9c83d2e7`. Cada decisión de Guillermo se registra aquí.
- **Tareas programadas de Claude:**
  - "Mi agente: qué me toca hoy" (diaria, 7:26 a. m.).
  - "Prospectos semanales" (lunes, 6:21 a. m.).
  - "Resumen semanal y revisión de precios" (domingo, 7:07 p. m.).
  - "Puente: vaciar cada madrugada": **pausada; no reactivar sin autorización**.
  - Todas dependen de los ids y de los nombres exactos de propiedades en Notion: no renombrarlos sin actualizar las tareas.

## 6. Pendiente

1. **Probar en un teléfono real** la web (Safari y navegador de Instagram) y el envío del formulario por Instagram. En la sesión de Claude no se puede abrir github.io.
2. **Datos de cobro listos** (PayPal, Zelle, Binance, transferencia): bloquea cobrar el primer 50 %.
3. **Precios por aprobar:** pendientes de Orbe Apps y todos los de AVENOR, más el nicho inicial de AVENOR.
4. **Tarea "Resumen semanal"** revisa precios en la web vieja (`orbe-negocios/servicios/`): cambiarla a la web nueva. Requiere aprobación.
5. **Respaldo por filas** en las 3 tareas programadas activas, por si se agota el cupo de SQL de Notion. Requiere aprobación.
6. **Códigos de activación** en Notion: sus 40 enlaces apuntan a `orbe-negocios/apps/…`. Funcionan por la redirección, pero conviene cambiarlos a `orbe-apps/apps/…`.
7. **Estudio de belleza (EE. UU.):** llamada de diagnóstico (software de reservas, equipo, canales, línea base) antes de prometer reservas o integraciones.
8. **Orbe Finanzas:** inicio de sesión y correo de recuperación sin terminar; no venderla todavía. **Orbe Sellos:** no auditado.
9. Definir dónde se aloja **n8n** (bloquea la demo del asistente de AVENOR). Conseguir **WhatsApp de trabajo**.
10. Riesgo aceptado por ahora: los códigos de activación se validan dentro de la app (sin servidor).

## 7. Siguiente paso

Que Guillermo pruebe la web en su teléfono y tenga listos los datos de cobro. Con eso, Orbe Apps puede empezar a cotizar y vender hoy. Después: aprobar precios de AVENOR y hacer la llamada con el estudio de belleza.
