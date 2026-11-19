// Orbe Apps · página de reservas por WhatsApp.
// Lee los datos del negocio de window.NEGOCIO (negocio.js): servicios, barberos o profesionales, horario y WhatsApp.
// Con whatsapp vacío funciona como muestra: los horarios ocupados son de ejemplo y al reservar muestra el mensaje en vez de abrir WhatsApp.
['gesturestart', 'gesturechange'].forEach(t => document.addEventListener(t, e => e.preventDefault(), { passive: false }));
if (window.top !== window.self) document.documentElement.classList.add('incrustado');
(() => {
  const N = window.NEGOCIO, $ = s => document.querySelector(s);
  const muestra = !N.whatsapp, paso = N.intervalo || 30;
  const llave = 'orbe-reservas-' + N.id;
  const recordado = (() => { try { return JSON.parse(localStorage.getItem(llave)) || {}; } catch { return {}; } })();
  const recordar = () => { try { localStorage.setItem(llave, JSON.stringify({ nombre: st.nombre, tel: st.tel, pago: st.pago })); } catch {} };
  document.documentElement.style.setProperty('--marca', N.color || '#d6a24e');
  document.head.append(Object.assign(document.createElement('meta'), { name: 'theme-color', content: '#151311' }));
  document.title = N.nombre + ' · Reservas';

  const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const pad = n => String(n).padStart(2, '0');
  const dinero = n => (N.moneda?.simbolo ?? '$') + Number(n).toLocaleString('es', { minimumFractionDigits: N.moneda?.decimales ?? 0, maximumFractionDigits: N.moneda?.decimales ?? 0 });
  const aMin = s => { const [h, m] = s.split(':').map(Number); return h * 60 + m; };
  const h12 = m => { const H = Math.floor(m / 60); return `${((H + 11) % 12) + 1}:${pad(m % 60)} ${H < 12 ? 'a. m.' : 'p. m.'}`; };
  const corta = m => { const H = Math.floor(m / 60); return `${((H + 11) % 12) + 1}:${pad(m % 60)}`; };
  const duracion = m => m < 60 ? `${m} min` : `${Math.floor(m / 60)} h${m % 60 ? ' ' + (m % 60) + ' min' : ''}`;
  const iso = d => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
  const fecha = (f, o) => new Date(f + 'T12:00:00').toLocaleDateString('es', o).replace('.', '');
  const ICO = {
    ok: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>',
    x: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg>',
    wa: '<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2a10 10 0 00-8.6 15.1L2 22l5-1.3A10 10 0 1012 2zm0 18.2a8.2 8.2 0 01-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1112 20.2zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8s-.4-.1-.6.1-.7.8-.8 1-.3.2-.5.1a6.7 6.7 0 01-3.3-2.9c-.3-.4.3-.4.7-1.3.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 00-.7.3 3 3 0 00-.9 2.2 5.2 5.2 0 001.1 2.7 11.8 11.8 0 004.5 4c1.7.7 2.3.8 3.2.6a2.7 2.7 0 001.8-1.2 2.2 2.2 0 00.1-1.2c0-.1-.2-.2-.5-.3z"/></svg>',
    lugar: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 21s-7-6.2-7-11.5a7 7 0 0114 0C19 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/></svg>',
    reloj: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',
    pago: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="6" width="18" height="13" rx="2.5"/><path d="M3 10.5h18M7 15h4"/></svg>',
  };

  const hoy = new Date(), hoyISO = iso(hoy), ahora = hoy.getHours() * 60 + hoy.getMinutes();
  const abre = f => { const h = N.horario[new Date(f + 'T12:00:00').getDay()]; return h ? [aMin(h[0]), aMin(h[1])] : null; };
  const dias = Array.from({ length: 14 }, (_, i) => { const d = new Date(hoy); d.setDate(d.getDate() + i); return iso(d); });

  // Agenda de ejemplo: algunos horarios ya tomados (siempre los mismos para el mismo día y barbero)
  const ocupado = (b, f, t) => {
    if (!muestra) return false;
    let h = 2166136261; for (const c of b + f + t) { h ^= c.charCodeAt(0); h = Math.imul(h, 16777619); }
    return ((h >>> 0) % 100) < 38;
  };
  const st = { sel: new Set(), cat: 'Todos', barbero: 'cualquiera', dia: null, hora: null, asignado: null,
    nombre: recordado.nombre || '', tel: recordado.tel || '', pago: recordado.pago || (N.pagos || [])[0] || '', nota: '' };
  const elegidos = () => [...st.sel].map(i => N.servicios[i]);
  const minutos = () => Math.max(paso, elegidos().reduce((a, s) => a + (+s.minutos || 0), 0));
  const total = () => elegidos().reduce((a, s) => a + (+s.precio || 0), 0);
  const quien = id => N.barberos.find(b => b.id === id);
  // ¿Qué barbero puede atender a esa hora? (null si nadie)
  function libre(f, t) {
    const h = abre(f); if (!h) return null;
    const dur = minutos(); if (t + dur > h[1]) return null;
    if (f === hoyISO && t < ahora + 20) return null;
    const lista = st.barbero === 'cualquiera' ? N.barberos : [quien(st.barbero)];
    for (const b of lista) {
      let ok = true; for (let x = t; x < t + dur; x += paso) if (ocupado(b.id, f, x)) { ok = false; break; }
      if (ok) return b;
    }
    return null;
  }
  const horasDe = f => { const h = abre(f); if (!h) return []; const r = []; for (let t = h[0]; t < h[1]; t += paso) r.push(t); return r; };
  const libresEn = f => horasDe(f).filter(t => libre(f, t)).length;

  // ---------- Cabecera, aviso e información ----------
  const hh = abre(hoyISO), abierto = hh && ahora >= hh[0] && ahora < hh[1];
  $('#cabecera').innerHTML = `<div class="envoltura"><div class="logo">${N.logo ? `<img src="${esc(N.logo)}" alt="">` : esc(N.iniciales)}</div>
    <div><h1>${esc(N.nombre)}</h1><p>${esc(N.rubro)} · ${esc(N.ciudad)}</p>
    <span class="estado${abierto ? '' : ' cerrado'}"><i></i>${abierto ? 'Abierto ahora · cierra ' + h12(hh[1]) : 'Cerrado ahora · reserva para otro día'}</span></div></div>`;
  const nombresDia = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
  $('#pie').innerHTML = `Reservas hechas con <a href="https://orbe7apps.github.io/orbe-apps/" target="_blank" rel="noopener">Orbe Apps</a>`;

  // ---------- Página ----------
  const app = $('#app');
  function pintar() {
    const cats = ['Todos', ...new Set(N.servicios.map(s => s.categoria))];
    const servs = N.servicios.map((s, i) => [s, i]).filter(([s]) => st.cat === 'Todos' || s.categoria === st.cat);
    if (!st.dia || !abre(st.dia) || !libresEn(st.dia)) st.dia = dias.find(f => abre(f) && libresEn(f)) || null;
    if (st.hora != null && !(st.dia && libre(st.dia, st.hora))) st.hora = null;
    st.asignado = st.dia && st.hora != null ? libre(st.dia, st.hora) : null;
    const grupos = { Mañana: [], Tarde: [], Noche: [] };
    if (st.dia) horasDe(st.dia).forEach(t => grupos[t < 720 ? 'Mañana' : t < 1080 ? 'Tarde' : 'Noche'].push(t));
    const n = st.sel.size;
    app.innerHTML = `${N.aviso ? `<div class="aviso">${esc(N.aviso)}</div>` : ''}
      <section class="paso" id="p-servicio"><div class="paso-cab"><b>1</b><h2>¿Qué te hacemos?</h2>${n ? `<small>${n} elegido${n > 1 ? 's' : ''}</small>` : ''}</div>
        <div class="cats">${cats.map(c => `<button type="button" class="cat" data-cat="${esc(c)}" aria-pressed="${c === st.cat}">${esc(c)}</button>`).join('')}</div>
        <div class="servs">${servs.map(([s, i]) => `<button type="button" class="serv" data-s="${i}" aria-pressed="${st.sel.has(i)}"><span class="marca">${ICO.ok}</span>
          <span class="info"><b>${esc(s.nombre)}${s.destacado ? '<span class="top">Favorito</span>' : ''}</b><span>${esc(s.descripcion || '')}</span></span>
          <span class="der"><b>${dinero(s.precio)}</b><small>${s.minutos ? s.minutos + ' min' : 'extra'}</small></span></button>`).join('')}</div>
      </section>
      <section class="paso" id="p-barbero"><div class="paso-cab"><b>2</b><h2>¿Con quién?</h2></div>
        <div class="barberos"><button type="button" class="barbero" data-b="cualquiera" aria-pressed="${st.barbero === 'cualquiera'}"><span class="avatar" style="background:var(--surface2);color:var(--ink)">✦</span><b>El que esté libre</b><span>Más horarios disponibles</span></button>
        ${N.barberos.map(b => `<button type="button" class="barbero" data-b="${b.id}" aria-pressed="${st.barbero === b.id}"><span class="avatar" style="background:${b.color || 'var(--marca)'}">${esc(b.nombre[0])}</span><b>${esc(b.nombre)}</b><span>${esc(b.especialidad || '')}</span></button>`).join('')}</div>
      </section>
      <section class="paso" id="p-dia"><div class="paso-cab"><b>3</b><h2>¿Qué día?</h2></div>
        <div class="dias">${dias.map(f => { const a = abre(f), l = a ? libresEn(f) : 0; return `<button type="button" class="dia" data-d="${f}" aria-pressed="${f === st.dia}" ${l ? '' : 'disabled'}><small>${f === hoyISO ? 'hoy' : fecha(f, { weekday: 'short' })}</small><b>${+f.slice(8)}</b><em>${!a ? 'cerrado' : l ? l + ' libres' : 'lleno'}</em></button>`; }).join('')}</div>
      </section>
      <section class="paso" id="p-hora"><div class="paso-cab"><b>4</b><h2>¿A qué hora?</h2>${st.dia ? `<small>${fecha(st.dia, { weekday: 'long', day: 'numeric', month: 'long' })}</small>` : ''}</div>
        ${n ? '' : '<p class="ayuda">Elige tu servicio primero para ver cuánto dura tu cita.</p>'}
        ${st.dia ? Object.entries(grupos).filter(([, ts]) => ts.length).map(([g, ts]) => `<div class="franja">${g}</div><div class="horas">${ts.map(t => `<button type="button" class="hora" data-h="${t}" aria-pressed="${t === st.hora}" ${libre(st.dia, t) ? '' : 'disabled'} aria-label="${h12(t)}">${corta(t)}<small style="font-size:11px;opacity:.7"> ${t < 720 ? 'am' : 'pm'}</small></button>`).join('')}</div>`).join('')
          : '<div class="vacio">No quedan horarios libres en las próximas 2 semanas. Escríbenos y buscamos un espacio.</div>'}
        ${st.asignado && st.barbero === 'cualquiera' ? `<p class="ayuda" style="margin-top:12px">Te atiende <b style="color:var(--ink)">${esc(st.asignado.nombre)}</b>.</p>` : ''}
      </section>
      <section class="info-negocio">
        ${N.direccion ? `<div>${ICO.lugar}<span>${esc(N.direccion)}, ${esc(N.ciudad)}</span></div>` : ''}
        <div>${ICO.reloj}<span class="semana">${[1, 2, 3, 4, 5, 6, 0].map(d => { const h = N.horario[d]; return `<span class="${d === hoy.getDay() ? 'hoy' : ''}">${nombresDia[d]}</span><span class="${d === hoy.getDay() ? 'hoy' : ''}">${h ? h12(aMin(h[0])) + ' a ' + h12(aMin(h[1])) : 'Cerrado'}</span>`; }).join('')}</span></div>
        ${N.pagos?.length ? `<div>${ICO.pago}<span>${N.pagos.map(esc).join(' · ')}</span></div>` : ''}
      </section>`;
    app.querySelectorAll('[data-cat]').forEach(b => b.onclick = () => { st.cat = b.dataset.cat; pintar(); });
    app.querySelectorAll('[data-s]').forEach(b => b.onclick = () => { const i = +b.dataset.s; st.sel.has(i) ? st.sel.delete(i) : st.sel.add(i); pintar(); });
    app.querySelectorAll('[data-b]').forEach(b => b.onclick = () => { st.barbero = b.dataset.b; pintar(); });
    app.querySelectorAll('[data-d]').forEach(b => b.onclick = () => { st.dia = b.dataset.d; st.hora = null; pintar(); });
    app.querySelectorAll('[data-h]').forEach(b => b.onclick = () => { st.hora = +b.dataset.h; pintar(); });
    barra();
  }
  function barra() {
    const n = st.sel.size; $('#flotante').hidden = !n;
    if (!n) return;
    $('#reservar').innerHTML = `${st.hora != null ? 'Reservar ' + corta(st.hora) + (st.hora < 720 ? ' am' : ' pm') : 'Elegir hora'}<span>${duracion(minutos())} · ${dinero(total())}</span>`;
  }
  $('#reservar').onclick = () => {
    if (st.hora == null) { document.getElementById('p-hora').scrollIntoView({ behavior: 'smooth', block: 'start' }); return; }
    hoja();
  };

  // ---------- Confirmación ----------
  const dlg = $('#hoja');
  const mensaje = () => [
    `Hola 👋 Quiero reservar en ${N.nombre}:`, '',
    ...elegidos().map(s => `✂️ ${s.nombre} (${dinero(s.precio)})`),
    `💈 Con: ${st.asignado.nombre}`,
    `📅 ${fecha(st.dia, { weekday: 'long', day: 'numeric', month: 'long' })}, ${h12(st.hora)}`,
    `⏱️ ${duracion(minutos())} aprox.`,
    `💵 Total: ${dinero(total())}${st.pago ? ' · ' + st.pago : ''}`,
    `🙋 ${st.nombre}${st.tel ? ' · ' + st.tel : ''}`,
    ...(st.nota ? [`📝 ${st.nota}`] : []), '', '¿Me la confirmas?',
  ].join('\n');
  function hoja(enviado) {
    const cab = `<div class="hoja-cab"><h2>${enviado ? 'Así te llega' : 'Tu reserva'}</h2><button type="button" class="redondo" data-cerrar aria-label="Cerrar">${ICO.x}</button></div>`;
    if (enviado) {
      dlg.innerHTML = `<div class="hoja-in">${cab}<div class="hoja-cuerpo">
        <p class="nota-prueba">Esta es una <b>muestra</b>. En la página real del negocio, este mensaje se abre en WhatsApp listo para enviar y la barbería confirma la cita.</p>
        <div class="mensaje">${esc(mensaje())}</div></div>
        <div class="hoja-pie"><a class="principal wa" href="https://ig.me/m/orbe.apps" target="_blank" rel="noopener">Quiero una página así para mi negocio</a><button type="button" class="principal sec" data-cerrar>Volver</button></div></div>`;
    } else {
      dlg.innerHTML = `<div class="hoja-in">${cab}<div class="hoja-cuerpo">
        <div class="ticket">${elegidos().map(s => `<div><span>${esc(s.nombre)}</span><span>${dinero(s.precio)}</span></div>`).join('')}
          <div><span>Con</span><span>${esc(st.asignado.nombre)}</span></div>
          <div><span>Cuándo</span><span>${fecha(st.dia, { weekday: 'long', day: 'numeric', month: 'short' })}, ${h12(st.hora)}</span></div>
          <div><span>Duración</span><span>${duracion(minutos())}</span></div>
          <div class="total"><span>Total</span><span>${dinero(total())}</span></div></div>
        <label class="campo">Tu nombre<input id="f-nombre" autocomplete="name" placeholder="Nombre y apellido" value="${esc(st.nombre)}"></label>
        <label class="campo">Teléfono (opcional)<input id="f-tel" type="tel" autocomplete="tel" placeholder="Para recordarte la cita" value="${esc(st.tel)}"></label>
        ${N.pagos?.length ? `<div class="campo">Cómo pagas<div class="opciones">${N.pagos.map(p => `<button type="button" class="opcion" data-pago="${esc(p)}" aria-pressed="${p === st.pago}">${esc(p)}</button>`).join('')}</div></div>` : ''}
        <label class="campo">Nota (opcional)<textarea id="f-nota" placeholder="Ej. traigo foto del corte que quiero">${esc(st.nota)}</textarea></label>
        <p class="error" id="f-error" hidden></p></div>
        <div class="hoja-pie"><button type="button" class="principal wa" id="enviar">${ICO.wa}${muestra ? 'Ver cómo llega la reserva' : 'Pedir cita por WhatsApp'}</button></div></div>`;
      dlg.querySelectorAll('[data-pago]').forEach(b => b.onclick = () => { st.pago = b.dataset.pago; dlg.querySelectorAll('[data-pago]').forEach(x => x.setAttribute('aria-pressed', x === b)); });
      $('#enviar').onclick = () => {
        st.nombre = $('#f-nombre').value.trim(); st.tel = $('#f-tel').value.trim(); st.nota = $('#f-nota').value.trim();
        if (!st.nombre) { const e = $('#f-error'); e.textContent = 'Escribe tu nombre para la reserva.'; e.hidden = false; $('#f-nombre').focus(); return; }
        recordar();
        if (muestra) return hoja(true);
        window.open('https://wa.me/' + N.whatsapp + '?text=' + encodeURIComponent(mensaje()), '_blank', 'noopener');
      };
    }
    dlg.querySelectorAll('[data-cerrar]').forEach(b => b.onclick = () => dlg.close());
    if (!dlg.open) dlg.showModal();
  }
  dlg.addEventListener('click', e => { if (e.target === dlg) dlg.close(); });

  // Muestra: arranca con el favorito elegido para que se vea cómo funciona
  if (muestra) { const i = N.servicios.findIndex(s => s.destacado); if (i >= 0) st.sel.add(i); }
  pintar();
})();
