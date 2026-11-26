"""Carrusel "5 respuestas rápidas para tu repostería" (7 láminas de 1080x1350).
Usa las piezas de marca de consejo-bio-instagram. Uso: python3 generar.py && node renderizar.js"""
import os
AQUI = os.path.dirname(os.path.abspath(__file__))
BASE = os.path.join(AQUI, '..', '..', 'consejo-bio-instagram', 'fuente', 'generar.py')
AQUI_RAIZ = AQUI
codigo = open(BASE).read().split('laminas = {}')[0].replace("SALIDA = os.path.join(AQUI, 'html')", "SALIDA = os.path.join(AQUI_RAIZ, 'html')")
exec(codigo.replace("AQUI = os.path.dirname(os.path.abspath(__file__))", "AQUI = AQUI_RAIZ"))
os.makedirs(SALIDA, exist_ok=True)
N = 7


def puntos7(n, oscura=False):
    bg = 'rgba(255,255,255,.22)' if oscura else LILA2
    on = VERDE if oscura else MORADO
    return '<div class="puntos">' + ''.join(f'<i style="background:{on if k == n else bg};width:{40 if k == n else 12}px"></i>' for k in range(1, N + 1)) + '</div>'


def pie7(n, oscura=False):
    return f'<div class="pie" style="color:{"#efeefe" if oscura else TINTA}"><div class="marca">{logo(56, NOCHE if oscura else CLARO)}Orbe Apps</div>{puntos7(n, oscura)}</div>'


def chat(cliente, respuesta):
    return f'''<div style="position:relative;z-index:2;margin-top:60px;border-radius:40px;background:#efe7dd;padding:44px 40px;display:flex;flex-direction:column;gap:26px">
<div style="align-self:flex-start;background:#fff;color:#111b21;border-radius:26px 26px 26px 6px;padding:24px 30px;font-size:38px;line-height:1.35;max-width:700px;box-shadow:0 2px 0 rgba(0,0,0,.08)">{cliente}</div>
<div style="align-self:flex-end;background:#d9fdd3;color:#111b21;border-radius:26px 26px 6px 26px;padding:28px 32px;font-size:40px;line-height:1.38;max-width:820px;box-shadow:0 2px 0 rgba(0,0,0,.08)">{respuesta}<div style="text-align:right;font-size:21px;color:#667781;margin-top:6px">✓✓</div></div></div>'''


def respuesta(n, num, atajo, para, cliente, texto, color):
    return f'''<div class="lamina clara">
<span class="paso"><b>{num}</b>de 5</span>
<h2 class="titulo" style="font-size:104px;color:{color}">{atajo}</h2>
<p class="bajada">{para}</p>
{chat(cliente, texto)}
<div style="margin-top:auto;margin-bottom:130px;display:flex;align-items:center;gap:18px;font-size:28px;color:#5f5c7a;line-height:1.35">{ico(I['chat'],40,color)}<span>WhatsApp Business › Herramientas para la empresa › <b style="color:#1a1733">Respuestas rápidas</b></span></div>
{pie7(n)}</div>'''


laminas = {}
laminas['01'] = f'''<div class="lamina oscura">{estrellas()}
<div style="position:absolute;right:-150px;top:150px;opacity:.95">{logo(560, NOCHE)}</div>
<span style="position:relative;align-self:flex-start;display:inline-flex;align-items:center;gap:12px;font-weight:800;font-size:30px;color:{VERDE};background:rgba(61,220,159,.12);border:2px solid rgba(61,220,159,.35);padding:12px 26px;border-radius:999px">{ico(I['chat'],30,VERDE)} Guárdalo para tu repostería</span>
<h1 style="position:relative;font-size:150px;margin-top:280px;max-width:860px">5 respuestas <span style="background:linear-gradient(90deg,{LILA2},{VERDE} 55%,{AMBAR});-webkit-background-clip:text;background-clip:text;color:transparent">rápidas</span></h1>
<p style="position:relative;font-size:44px;line-height:1.3;color:#c9c5ea;margin-top:36px;max-width:780px;font-weight:600">Configúralas hoy en WhatsApp Business y deja de escribir lo mismo</p>
<div class="pie" style="color:#efeefe"><div class="marca">{logo(56, NOCHE)}Orbe Apps</div><span style="display:flex;align-items:center;gap:12px;color:{LILA2}">Desliza {ico(I['flecha'],34,LILA2,2.6)}</span></div></div>'''

laminas['02'] = respuesta(2, 1, '/precio', 'Para la pregunta de siempre.', '¿Precio de la torta de chocolate?', '¡Hola! Aquí ves todo con foto y precio: <b>[tu enlace]</b>', MORADO)
laminas['03'] = respuesta(3, 2, '/pedido', 'Para tener todo en un solo mensaje.', 'Quiero una torta para el sábado', 'Para tu pedido necesito: <b>producto, cantidad, fecha</b> y si es <b>delivery o retiro</b>.', '#12a37a')
laminas['04'] = respuesta(4, 3, '/pago', 'Para no repetir los datos cada vez.', '¿Cómo te pago?', 'Aceptamos <b>[tus formas de pago]</b>. Te confirmo apenas lo reciba.', '#2bb5a8')
laminas['05'] = respuesta(5, 4, '/delivery', 'Para la zona y el retiro.', '¿Hacen delivery?', 'Hacemos delivery en <b>[tus zonas]</b> y retiro en <b>[tu dirección]</b>.', AMBAR)
laminas['06'] = respuesta(6, 5, '/gracias', 'Para cerrar con buena impresión.', 'Listo, ya te pagué', '¡Gracias por tu pedido! 🧁 Te aviso apenas esté listo.', '#e8436a')

laminas['07'] = f'''<div class="lamina clara">
<h2 style="font-size:96px;max-width:900px">¿Y si <span style="color:{MORADO}">/precio</span> te mandara a un catálogo?</h2>
<p class="bajada" style="margin-top:28px;font-size:38px">Tu cliente ve fotos y precios, elige, y te llega el pedido completo por WhatsApp. Tú solo confirmas.</p>
<div class="vs" style="margin-top:44px;gap:22px">
<div><span class="m" style="background:{MORADO}">{ico(I['ok'],26,'#fff',3)}</span>Con tus productos y tu marca</div>
<div><span class="m" style="background:{MORADO}">{ico(I['ok'],26,'#fff',3)}</span>Listo en 5 días</div>
<div><span class="m" style="background:{MORADO}">{ico(I['ok'],26,'#fff',3)}</span>Pago único, sin comisiones</div></div>
<div style="margin-top:auto;margin-bottom:130px;background:{MORADO};color:#fff;border-radius:30px;padding:28px 34px;display:flex;align-items:center;gap:20px;font-size:34px;font-weight:700;line-height:1.3">{ico(I['chat'],48,'#fff')}<span>Escríbenos MUESTRA por DM y te armamos una gratis con tus productos.</span></div>
{pie7(7)}</div>'''

for k, html in laminas.items():
    with open(os.path.join(SALIDA, f'{k}.html'), 'w') as f:
        f.write(HEAD + html + '</body></html>')
print('Listo:', ', '.join(sorted(laminas)))
