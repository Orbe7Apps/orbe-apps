# Reel: muestra del catálogo Dulce Hogar (serie «Muestras», 1)

`reel.mp4`: 1080x1920, 22 s, con movimientos 3D, voz en off (Daniela) y música original. `reel-portada.png` es la portada sugerida (el gancho con los mensajes de «precio?»).
Dulce Hogar es un negocio de ejemplo (inventado). Las capturas son del catálogo de muestra real de la web:
https://orbe7apps.github.io/orbe-apps/catalogos/dulce-hogar/

## Escenas y voz
1. 0 a 3,4 s: «¿Te escriben "precio?" todo el día?». Las burbujas de mensajes llegan desde el fondo en 3D y salen volando hacia la cámara. Voz: «¿Te escriben "precio" todo el día?»
2. 3,4 a 7,4 s: el teléfono con el catálogo llega girando y dos tortas saltan de la pantalla hacia ti. Voz: «Con un catálogo, tu cliente ve todo, con foto y precio.»
3. 7,4 a 9,4 s: el teléfono voltea como una carta (lista de productos) y saltan los «+1». 9,4 a 11,6 s: voltea otra vez y la cuenta (total $74) se levanta de la pantalla. Voz: «Elige lo que quiere, y ve el total al instante.»
4. 11,6 a 15,8 s: el teléfono entra dando vuelta y media, el mensaje del pedido sale hacia ti y aparece un sello verde con chispas. Voz: «¡Y a ti te llega el pedido completo!» y «Solo confirmas.»
5. 15,8 a 22 s: carrusel 3D con las pantallas de la muestra, «Tu catálogo, listo en 5 días», «Muestra gratis», «Con tus productos y tu marca», (sin precios de Orbe Apps) «Escríbenos por DM», @orbe.apps. Voz: «Tu catálogo, listo en cinco días. ¡Escríbenos por mensaje directo!»

## Texto del post
¿Te escriben "precio?" todo el día? 😅

Así funciona un catálogo con pedidos: tu cliente ve tus productos con foto y precio, elige, ve el total y te llega el pedido completo por WhatsApp. Tú solo confirmas.

Este es un catálogo de muestra para una repostería. El tuyo lleva tus productos, tus precios y tu marca.

Listo en 5 días y sin comisiones. Escríbenos MUESTRA por DM y te armamos una gratis con tus productos.

#catalogodigital #emprendedores #reposteria #negocioslatinos
— Orbe Apps

## Cómo regenerarlo
Desde `contenido/`:
1. Video: `node herramientas/grabar-reel.js muestra-catalogo-dulce-hogar/fuente/reel.html video.mp4 22 2.7` (el 3D usa `data-kf`, explicado al inicio de `fuente/reel.html`).
2. Voz: cada línea de `fuente/voz.txt` con `python3 herramientas/voz.py <daniela.onnx> linea.txt vN.wav`; se colocan en 0,5 · 3,7 · 7,6 · 11,9 · 14,25 · 16,15 s y se pasan por la cadena de mezcla anotada en `herramientas/voz.py`.
3. Música: `python3 herramientas/musica.py musica.wav 22 3.4,7.4,9.4,11.6,15.85 --final 15.85`. Se mezcla con la voz bajando la música cuando ella habla (`sidechaincompress=threshold=0.03:ratio=8:attack=15:release=350`, música a 0,55) y `loudnorm=I=-14`.
4. Las capturas (`fuente/img/`) salen del catálogo a 390x844 con Playwright: 2 tortas de chocolate y 1 caja de cupcakes x12, «Ver mi pedido», «Continuar», retiro en tienda, Nequi y «Enviar pedido por WhatsApp» (en la muestra enseña el mensaje). Las tarjetas, la cuenta y el mensaje son recortes de esos mismos elementos.
