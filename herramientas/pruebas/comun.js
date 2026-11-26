// Comunes de las pruebas: dirección base y carpeta de capturas.
// Uso: desde la raíz del repo, `python3 -m http.server 8795` y luego `node herramientas/pruebas/<script>.js`.
// Cambia la dirección con BASE=http://... y la carpeta de capturas con SALIDA=...
const path = require('path'), fs = require('fs');
const BASE = (process.env.BASE || 'http://localhost:8795/').replace(/\/?$/, '/');
const SALIDA = process.env.SALIDA || path.join(__dirname, 'capturas');
fs.mkdirSync(SALIDA, { recursive: true });
const { chromium } = require('playwright');
module.exports = { BASE, SALIDA, chromium, ruta: n => path.join(SALIDA, n) };
