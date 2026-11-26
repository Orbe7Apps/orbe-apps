// Revisión de la web de ventas: anclas del menú, títulos visibles bajo el menú fijo, botones «Cotizar»
// que eligen el servicio, enlaces internos y capturas de página completa (teléfono y computadora).
const { BASE, chromium, ruta } = require('./comun');
(async () => {
  const b = await chromium.launch(); const errs = []; let fallas = 0;
  for (const [w, h, n] of [[390, 844, 'telefono'], [1280, 800, 'computadora']]) {
    const p = await b.newPage({ viewport: { width: w, height: h } }); p.on('pageerror', e => errs.push(n + ': ' + e.message));
    await p.goto(BASE, { waitUntil: 'networkidle' });
    await p.evaluate(() => { document.documentElement.style.scrollBehavior = 'auto'; document.querySelectorAll('.rev').forEach(e => e.classList.add('visto', 'in', 'ver')); });
    const H = await p.evaluate(() => document.documentElement.scrollHeight);
    for (let y = 0; y < H; y += 400) { await p.evaluate(y => scrollTo(0, y), y); await p.waitForTimeout(60); }
    await p.waitForTimeout(800); await p.screenshot({ path: ruta(`web-${n}.png`), fullPage: true });
    const rotas = await p.evaluate(() => [...new Set([...document.querySelectorAll('a[href^="#"]')].map(a => a.getAttribute('href')))].filter(h => h.length > 1 && !document.querySelector(h)));
    if (rotas.length) { fallas++; console.log('FALLA anclas sin destino:', rotas); }
    for (const id of ['#microapps', '#precios', '#trabajos', '#preguntas']) {
      await p.evaluate(id => document.querySelector(id).scrollIntoView(), id); await p.waitForTimeout(200);
      const [t, m] = await p.evaluate(id => [document.querySelector(id + ' h2').getBoundingClientRect().top, document.querySelector('.nav').getBoundingClientRect().bottom], id);
      if (t < m) { fallas++; console.log(`FALLA ${n}: el título de ${id} queda debajo del menú`); }
    }
    console.log(`${n}: alto ${H}px, capturas en web-${n}.png`);
    await p.close();
  }
  const p = await b.newPage({ viewport: { width: 390, height: 844 } });
  await p.goto(BASE, { waitUntil: 'networkidle' });
  for (const plan of await p.$$eval('[data-plan]', a => a.map(x => x.dataset.plan))) {
    await p.click(`[data-plan="${plan}"]`); const v = await p.$eval('#plan', s => s.value);
    if (v !== plan) { fallas++; console.log(`FALLA «Cotizar» de ${plan} elige ${v}`); }
  }
  const links = [...new Set(await p.$$eval('a[href]', a => a.map(x => x.href.split('#')[0])))].filter(h => h.startsWith(BASE));
  for (const l of links) { const r = await p.request.get(l); if (r.status() !== 200) { fallas++; console.log('FALLA enlace roto', l, r.status()); } }
  console.log('enlaces internos revisados:', links.length, '| errores de página:', errs.length ? errs : 'ninguno');
  await b.close(); process.exit(fallas || errs.length ? 1 : 0);
})();
