# Informe de producción · «Tu negocio. Nuestra tecnología.»

## Entregables
| Archivo | Qué es |
|---|---|
| `reel.mp4` | Reel final: 1080x1920 (9:16), 23 s, 30 fps, H.264 High + AAC 192 kbps, −15 LUFS. Listo para Instagram. |
| `reel-portada.png` | Portada (cuadro del cierre, segundo 21,5). |
| `fuente/reel.html` | Proyecto editable del montaje: una escena por bloque comentado, tiempos en segundos. |
| `fuente/musica.wav` | Pista de música instrumental original, separada (para cambiarla o remezclarla). |
| `fuente/img/` | Recursos usados (ver abajo). |
| `texto.md`, `alt.md` | Texto para publicar y texto alternativo. |

## Guion y tiempos
1. **0–3 s · Introducción.** Logo original de Orbe Apps (el anillo se dibuja y el satélite verde orbita) y la frase «Las ideas de tu negocio merecen mejores herramientas.»
2. **3–8 s · Catálogos digitales.** Teléfono con el catálogo de muestra Dulce Hogar. La pantalla se desplaza por los productos y sus precios. Subtítulo: «Productos, precios y pedidos en un solo lugar.» Etiqueta: «Pedido completo por WhatsApp» (función real del catálogo).
3. **8–13 s · Aplicaciones.** Tres teléfonos con Orbe Negocios (Hoy, Nueva venta y Reportes), con un movimiento de cámara lento. «Aplicaciones para trabajar mejor. Soluciones diseñadas para tu negocio.»
4. **13–17 s · Desarrollo web.** Página de reservas de muestra (Barbería El Filo) en el teléfono. El teléfono se aparta y entra la computadora con la web de Orbe Apps. «Tu presencia digital también importa.»
5. **17–23 s · Cierre.** Logo, «Orbe Apps», «Software pensado para negocios.», «Webs · Catálogos · Apps», «Conoce nuestras soluciones.» y @orbe.apps.

## Decisiones visuales
- **Identidad sin cambios:** paleta de la marca (noche #0b0a14, morado #6a5cf2, lila #8f84ff, lila claro #c9c0ff y verde #3ddc9f solo en el satélite y en puntos pequeños), letras Sora (títulos) y Manrope (textos). Es el mismo fondo de cielo estrellado y brillo morado de los reels publicados.
- **Logo original:** es el trazado de `logo.svg`, en su versión para fondo oscuro (la de `consejo-bio-instagram/fuente/generar.py`). La franja que separa el anillo del planeta se hizo transparente con una máscara, para que no quede una línea negra sobre el brillo morado. No se cambiaron formas ni colores.
- **Movimiento:** cámara y dispositivos con giros de 2 a 26 grados, profundidad suave, entradas con frenado y salidas hacia la cámara. Sin barridas de color, sin neón y sin rebotes exagerados (el «rebote» del motor se bajó para esta pieza). Un reflejo de luz muy suave recorre las pantallas.
- **Mockups:** teléfono y computadora hechos con código (marco, isla, base). Las capturas se muestran sin deformar, a su proporción real.
- **Texto:** frases del guion tal cual, con tildes revisadas. Todo el texto queda entre y=250 y y=1340, con 150 px libres a la derecha, fuera de los botones y la descripción de Instagram.
- **Sin precios de Orbe Apps:** por indicación anterior. Solo se ven precios de los productos del catálogo de muestra (son parte de la interfaz real). Para la web se eligió la sección «Tus clientes reservan solos», que no muestra precios.
- **Sin emojis, sin personas y sin clientes inventados.** Dulce Hogar y Barbería El Filo se presentan como muestras, que es lo que son en la web.

## Decisiones técnicas
- Animación: `herramientas/motor2.js` (textos) y `herramientas/motor3d.js`, nuevo y reutilizable: fotogramas clave en 3D, desplazamiento de pantallas y trazado de líneas.
- Grabación cuadro por cuadro con Playwright/Chromium (`herramientas/grabar-reel.js`) a 30 fps. Las animaciones salen siempre iguales, sin saltos.
- Música: `herramientas/musica.py`, sintetizada desde cero (sin muestras ni canciones de terceros, sin problemas de licencia), con cambios en los cortes (3, 8, 13 y 17 s), sin voz y con salida suave al final.
- Control de calidad: hoja de contacto de 2 cuadros por segundo y cuadros sueltos de cada escena. Se corrigió que un título tapaba un subtítulo, el borde de una sección de la web y la franja del logo.

## Recursos usados (`fuente/img/`)
| Archivo | Origen |
|---|---|
| `logo-original.svg` | Logo de la marca (`logo.svg` del repositorio). |
| `catalogo-dulce-hogar.webp` | Captura real del catálogo de muestra `catalogos/dulce-hogar/` (página completa, 390 px de ancho a 3x). |
| `negocios-hoy.webp`, `negocios-vender.webp`, `negocios-reportes.webp` | Capturas reales de Orbe Negocios (de `img/`). |
| `barberia-el-filo-movil.webp` | Captura real de la página de reservas de muestra `reservas/barberia-el-filo/`. |
| `web-orbe-apps-pc.webp` | Captura real de la web de Orbe Apps (sección de reservas) a 1440x900. |

## Lo que falta o no se pudo revisar
- **Instagram:** no tengo acceso a la cuenta @orbe.apps desde aquí. Usé como referencia las piezas publicadas que están en `contenido/` (reels «Sobre nosotros» y «Orbe Negocios», carruseles), que son las mismas que se subieron.
- **Trabajos de clientes reales:** todavía no hay. Por eso se muestran solo muestras y la app propia, dichas como tales.
- **Música con licencia comercial:** no se usó ninguna. La pista es original. Si quieres una canción de la biblioteca de Instagram, sube el video y agrégala bajando el volumen del audio original, o reemplaza `fuente/musica.wav`.
- **Capturas de la versión web de Orbe Negocios en computadora** (`img/negocios-pc.webp`): existe, pero no se usó para no repetir la computadora. Queda disponible para otra pieza.

## Cómo regenerarlo
Desde `contenido/`:
1. `node herramientas/grabar-reel.js reel-tu-negocio-nuestra-tecnologia/fuente/reel.html video.mp4 23 21.5`
2. `python3 herramientas/musica.py musica.wav 23 3,8,13,17 --final 17`
3. `ffmpeg -i video.mp4 -i musica.wav -filter_complex "[1:a]afade=t=out:st=21.6:d=1.4,loudnorm=I=-15:TP=-1.5[a]" -map 0:v -map "[a]" -c:v copy -c:a aac -b:a 192k -shortest -movflags +faststart reel.mp4`
