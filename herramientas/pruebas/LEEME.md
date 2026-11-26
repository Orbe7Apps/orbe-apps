# Pruebas de la web y las apps

Scripts con Playwright (ya instalado en las sesiones de Claude Code en la nube; en otra máquina: `npm i playwright`).

```bash
# desde la raíz del repo
python3 -m http.server 8795 &
node herramientas/pruebas/paginas.js          # las 9 páginas: carga, errores, enlaces rotos, desbordes
node herramientas/pruebas/web.js              # menú fijo, anclas, botones «Cotizar», enlaces, capturas completas
node herramientas/pruebas/auditoria-movil.js  # peso, toques pequeños, letra chica, imágenes sin alt
node herramientas/pruebas/capturas.js         # portada (anillo) y sello «Demo gratis»
NEGOCIOS=http://localhost:8796/ FINANZAS=http://localhost:8797/ node herramientas/pruebas/demos.js
```

- `BASE=...` cambia la dirección (por defecto `http://localhost:8795/`).
- Las capturas quedan en `herramientas/pruebas/capturas/` (no se suben al repositorio).
- `paginas.js`, `web.js` y `demos.js` terminan con código 1 si algo falla.
