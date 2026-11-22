# Reel: muestra del catálogo Dulce Hogar (serie «Muestras», 1)

`reel.mp4`: 1080x1920, 21 s, con música original. `reel-portada.png` es la portada sugerida (el gancho con los mensajes de «precio?»).
Dulce Hogar es un negocio de ejemplo (inventado). Las capturas son del catálogo de muestra real de la web:
https://orbe7apps.github.io/orbe-apps/catalogos/dulce-hogar/

## Escenas (cortes al ritmo de la música)
1. 0 a 3,2 s: «¿Te escriben "precio?" todo el día?» con mensajes de clientes que llegan.
2. 3,2 a 7 s: «Catálogo de muestra · Dulce Hogar». Tu cliente ve todo con foto y precio (portada del catálogo).
3. 7 a 10,4 s: Elige lo que quiere (lista con productos agregados).
4. 10,4 a 13,8 s: Ve el total al instante (hoja «Mi pedido», total $74).
5. 13,8 a 17,2 s: Y te llega el pedido completo (mensaje listo para WhatsApp). «Solo confirmas».
6. 17,2 a 21 s: «Tu catálogo, listo en 5 días», $49 pago único, sin comisiones, muestra gratis, «Escríbenos por DM», @orbe.apps.

## Texto del post
¿Te escriben "precio?" todo el día? 😅

Así funciona un catálogo con pedidos: tu cliente ve tus productos con foto y precio, elige, ve el total y te llega el pedido completo por WhatsApp. Tú solo confirmas.

Este es un catálogo de muestra para una repostería. El tuyo lleva tus productos, tus precios y tu marca.

Listo en 5 días, 49 USD, pago único y sin comisiones. Escríbenos MUESTRA por DM y te armamos una gratis con tus productos.

#catalogodigital #emprendedores #reposteria #negocioslatinos
— Orbe Apps

## Cómo regenerarlo
Desde `contenido/` (con un servidor local no hace falta: las imágenes están en `fuente/img/`):
`node herramientas/grabar-reel.js muestra-catalogo-dulce-hogar/fuente/reel.html muestra-catalogo-dulce-hogar/reel.mp4 21 2.6`
Música: `python3 herramientas/musica.py musica.wav 21 3.2,7.0,10.4,13.8,17.2 --final 17.2` y luego
`ffmpeg -i muestra-catalogo-dulce-hogar/reel.mp4 -i musica.wav -map 0:v -map 1:a -c:v copy -c:a aac -b:a 192k -shortest salida.mp4`.
Las capturas (`fuente/img/`) salen del catálogo a 390x844 con Playwright: agregar 2 tortas de chocolate y 1 caja de cupcakes x12, «Ver mi pedido», «Continuar», retiro en tienda, Nequi y «Enviar pedido por WhatsApp» (en la muestra muestra el mensaje).
