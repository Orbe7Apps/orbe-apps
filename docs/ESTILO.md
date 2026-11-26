# Estilo de Orbe Apps: reglas de diseño y de trabajo

Reglas que Guillermo ha pedido o aprobado. Si una tarea choca con alguna, pregunta antes.

## Cómo hablar con Guillermo

- En español, claro y breve. Tutéalo.
- Al terminar: qué cambió (en viñetas cortas), si ya está publicado y qué tiene que revisar él. Sin jerga técnica.
- Si algo no se pudo verificar (por ejemplo, la web en vivo desde la sesión), dilo.
- Si un pedido es ambiguo y el cambio es pequeño y reversible, haz la interpretación más razonable y explícala. Si toca precios, publicaciones, clientes o borrar algo, pregunta.

## Textos de la web y las apps

- **Precios:** la web no muestra precios, solo "Cotizar". Los precios vigentes (17 / 49 / 89 / desde 149 / 7 al mes) solo se usan al cotizar; nunca inventes otros.
- **Nunca** "pago único", "para siempre", "de por vida" ni "sin mensualidad": algunas apps cobran mensualidad por el servidor.
- **No prometas funciones que no existen** (disponibilidad en vivo, pagos en línea, nube, confirmación automática). Las demos se presentan como muestras con datos de ejemplo.
- **Vocabulario:** "apps" (no "microapps"), "Servicios" (no "Planes"), "Nuestras apps", "Cotizar" / "Cotizar gratis", "Ver ejemplo", "Ver demos", "Abrir la demo".
- Tono cercano y serio, sin exageraciones. Para decir que hacemos más cosas, usa formas elegantes como "y todo lo que tu negocio necesite para crecer".
- Nombres con mayúscula: Orbe Apps, Orbe Negocios, Orbe Finanzas, Orbe Sellos, AVENOR.
- Contacto: Instagram @orbe.apps y orbeappsoficial@gmail.com. Nunca enlaces de la cuenta `gllm57`; usa siempre `Orbe7Apps`.

## Diseño

- **Marca:**
  - Morado `#6a5cf2`, lila `#8f84ff`, verde `#3ddc9f`, noche `#0b0a14`.
  - Letras: Plus Jakarta Sans para títulos y textos, Space Grotesk para cifras.
  - Logo: planeta con anillo y satélite verde. No rediseñar logos ni identidades.
- **Estilo:** portada oscura con estrellas y órbita; el resto en "vidrio claro" (tarjetas translúcidas, sombras suaves, bordes redondeados).
- **"Vistoso sin exagerar ni perder seriedad":** animaciones lentas y sutiles (órbitas, satélite con estela), nada que distraiga del contenido.
- **Orden y proporción:** textos centrados y equilibrados. No deformar letras: en textos circulares, ajusta solo el espacio entre letras. Quita adornos que sobren, como el ícono sobre "Demo".
- **Teléfono primero.** La mayoría de clientes entra desde el teléfono:
  - Un solo botón principal visible a la vez (en el teléfono, "Cotizar gratis" va en la barra de abajo).
  - Zonas de toque de al menos 44 px y letra de al menos 12,5 px.
  - Nada que se salga de la pantalla; textos de portada cortos en el teléfono.
  - Sin elementos repetidos (por ejemplo, el mismo catálogo dos veces).
- **Navegación:** menú fijo arriba que acompaña al bajar. Un solo botón de Instagram, en el menú.
- **Íconos de apps:** cuadrado redondeado con degradado del color de la app, brillo arriba a la derecha y figura blanca con sombra (ver `apps/*/icono.svg`, `catalogos/icono.svg` y `reservas/icono.svg`).
- **iPhone:**
  - Los iframes de demos van a 100 % sin `transform` (la página interna se ajusta con `zoom`).
  - Los videos dentro de contenedores animados llevan `-webkit-mask-image` para recortarse bien.

## Forma de trabajar

1. **Antes de publicar, prueba:** sirve el repo en local y revisa con `herramientas/pruebas/`. Mira capturas en teléfono (390 px) y computadora (1280 px), y comprueba que no haya errores ni desbordes.
2. **Publica tú mismo** los cambios de la web: commit y push a `main` de `orbe-apps`, con un mensaje claro en español.
3. **Apps listas:** si cambias algo de `apps/`, sube la versión `CACHE` de los 4 `sw.js`.
4. **Una sola web:** nada de cambios duplicados en orbe-negocios. Si tocas el código de otro repo con su propia sesión de Claude (Orbe Negocios, Orbe Finanzas), avísale a esa sesión.
5. **Notion:**
   - Registra cada decisión de Guillermo en Decisiones.
   - Las entregas grandes van a Puente → "Respuestas de Claude", con copia en "Guardado".
   - Sin contraseñas, tokens ni claves en Notion.
   - No renombres propiedades de las que dependen las tareas programadas.
6. **Aprobación de Guillermo** para:
   - precios y publicaciones;
   - pagos y campañas;
   - eliminaciones, borrando solo después de mostrar la lista de lo que se va a borrar;
   - cambios de estructura;
   - cambios en automatizaciones, documentando antes su efecto;
   - reactivar el vaciado del Puente.
7. **Redes sociales:** sigue la skill `redes-orbe` (`.claude/skills/redes-orbe/SKILL.md`).
8. **Al terminar** una tanda grande, actualiza `docs/CONTEXTO.md` (decisiones y pendientes).
