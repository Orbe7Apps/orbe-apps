# Reel 2.0 · Orbe Apps · rediseño de dirección de arte

Versión nueva e independiente. El reel anterior sigue intacto en `../reel-tu-negocio-nuestra-tecnologia/` (versión 4).

## Qué se conservó
- La **voz de ElevenLabs** de la versión 4: los mismos archivos (`fuente/voz/frase1-7.wav`), sin generar otra, con los mismos tiempos de inicio (0,35 · 3,85 · 6,5 · 13,0 · 17,15 · 21,5 · 26,2 s).
- El mensaje comercial y el cierre completo: ORBE APPS, «Software pensado para negocios.», «Webs · Catálogos · Apps», «¿Necesitas una solución digital para tu negocio?», «ESCRÍBENOS POR DM» y @orbe.apps.
- Las interfaces reales: catálogo de muestra Dulce Hogar (6 estados capturados en la página real), Orbe Negocios (4 pantallas reales), página de reservas de muestra Barbería El Filo y web de Orbe Apps. Ninguna se deformó ni se modificó.
- El logo oficial (trazado de `logo.svg`, versión para fondo oscuro), la paleta (noche, morado, lila, lila claro, verde del satélite) y las letras Sora y Manrope.

## Qué cambió (dirección de arte)
- **Sin estética espacial:** se eliminaron las estrellas, el cielo y los planetas decorativos. El planeta aparece solo como logotipo oficial, en la apertura y el cierre.
- **Fondo de estudio:** degradado oscuro, una luz principal morada muy suave que acompaña a la cámara, un horizonte tenue y dos elipses finas al 9 % de opacidad, que hacen eco del anillo del logo y giran despacio (parallax discreto).
- **Dispositivos realistas:** el teléfono tiene borde metálico, botones laterales, reflejo del cristal y sombra profunda; la computadora, borde y sombra. Sin muesca. (El reflejo en el suelo se quitó; ver la corrección más abajo.)
- **Tipografía:** titulares grandes de pocas palabras que suben dentro de su propio marco (revelado con máscara). Una idea por escena, alineada con lo que dice la voz:
  - «Tu negocio necesita más que una presencia digital.»
  - «Necesita herramientas que funcionen.»
  - Catálogos digitales: «Tus productos, tus pedidos.»
  - Orbe Negocios: «Aplicaciones para gestionar.»
  - Páginas web: «Tus servicios, más cerca.»
  - «Tecnología práctica. Diseñada para trabajar contigo.»
- **Cámara:** un único sistema de cámara mueve todo:
  - se acerca a la zona de toques del catálogo;
  - hace un *push-in* al panel «Vendido hoy» de Orbe Negocios;
  - hace un zoom de salida y un paneo al pasar a la computadora;
  - hace una órbita leve en «Tecnología práctica».
- **Continuidad:** el mismo teléfono de principio a fin. Entra desde abajo con la pantalla apagada mientras sale el primer titular, y se enciende con el catálogo. Cambia de app deslizando, con desenfoque de movimiento leve. Los toques cambian solo la zona tocada y las hojas del pedido suben como en la app. En Orbe Negocios la barra queda fija y el contenido se desliza hacia el lado de cada pestaña. El teléfono «se convierte» en parte del conjunto con la computadora. Al final, los dispositivos bajan mientras aparece el logo.
- **Audio:** música instrumental original, más sobria (sin campanitas ni barridos en cada corte, con un acorde suave al llegar al cierre), que baja automáticamente con la voz (compresor de cadena lateral 10:1). Efectos de interfaz discretos en los toques y cambios de app.

## Comprobación del archivo exportado
- 1080x1920, 9:16 (píxel cuadrado), 30 fps, H.264 High (CRF 16, unos 3,2 Mbps), AAC 192 kbps, 30,0 s. −14,4 LUFS, pico −1,5 dBFS, sin saturación.
- Transcripción automática del audio final: narración completa y en orden, sincronizada con las escenas (ninguna escena termina antes que su frase).
- Sin cortes de audio: el único tramo casi en silencio es la última décima de segundo (salida suave).
- Revisión completa a 2 cuadros por segundo, más el primer segundo y el último a 6 cuadros por segundo y la primera transición a 8 cuadros por segundo. Se corrigieron un primer cuadro casi vacío y un instante vacío a los 3,5 s.
- Texto dentro de la zona segura (entre y=230 y y=1480, con 150 px libres a la derecha en los titulares). El cierre está centrado.

## Corrección de cuadros cortados (revisión posterior)
Detección automática sobre los 900 cuadros, comparando cada uno con el siguiente, buscando caídas bruscas de contenido y parpadeos de un solo cuadro. Luego revisión manual cuadro a cuadro.
- **Dispositivos que desaparecían (19,77 s en adelante):** la luz de fondo estaba dentro del mismo espacio 3D que la computadora y el teléfono. Cuando la cámara empezaba su giro leve, el navegador la dibujaba delante y los tapaba casi por completo. Ahora la luz está en una capa plana aparte.
- **Reflejo en el suelo:** se quitó, porque con los movimientos 3D producía recortes. Los dispositivos conservan su sombra.
- **Pantalla que se encendía de golpe (3,8 s):** ahora se enciende de forma gradual en medio segundo.
- **Acercamientos bruscos:** los de los toques del catálogo y del panel «Vendido hoy» ahora son más largos y con menos zoom, y la vuelta atrás ya no dura 0,3 s.
- **Salida de los dispositivos antes del cierre:** ya no se desvanecen de golpe en el último cuadro.
- **Resultado:** sin caídas de contenido y sin parpadeos de un cuadro. Los cambios más grandes entre cuadros son movimientos continuos de cámara, comprobados cuadro a cuadro.

## Archivos
`reel-2-0-orbe-apps.mp4`, `portada.png`, `subtitulos.srt`, `texto.md`, `alt.md`, `fuente/reel.html`, `fuente/voz/`, `fuente/voz-en-off.wav`, `fuente/musica.wav`, `fuente/efectos.wav` y `fuente/img/` (copias de los recursos reales).

## Cómo regenerarlo
Desde `contenido/`:
1. `node herramientas/grabar-reel.js reel-2-0-orbe-apps/fuente/reel.html video.mp4 30 29.6`
2. `python3 herramientas/musica.py musica.wav 30 "" --final 25.8`
3. Mezcla: voz (`fuente/voz-en-off.wav`), música a 0,40 con `sidechaincompress=threshold=0.02:ratio=10:attack=20:release=400` disparado por la voz, efectos a 0,7, `afade` de entrada (0,15 s) y de salida (1,5 s), `alimiter=limit=0.89` y `loudnorm=I=-14:TP=-1.5`.

## Pendiente de revisar
- **Licencia de ElevenLabs:** el plan gratuito no permite uso comercial. Hay que confirmar el plan de la cuenta antes de publicar.
