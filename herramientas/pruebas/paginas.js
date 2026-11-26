// Abre las 9 páginas públicas en un teléfono de 390 px: estado, errores, recursos rotos y desbordes.
const { BASE, chromium } = require('./comun');
const rutas = ['', 'apps/', 'apps/inventario/', 'apps/agenda/', 'apps/agenda/reservar.html', 'apps/fiados/', 'apps/presupuesto/', 'catalogos/dulce-hogar/', 'reservas/barberia-el-filo/'];
(async () => {
  const b = await chromium.launch(); let fallas = 0;
  for (const r of rutas) {
    const p = await b.newPage({ viewport: { width: 390, height: 844 } });
    const errs = [], rotos = [];
    p.on('pageerror', e => errs.push(e.message));
    p.on('response', x => { if (x.status() >= 400 && x.url().startsWith(BASE)) rotos.push(x.status() + ' ' + x.url()); });
    const res = await p.goto(BASE + r, { waitUntil: 'networkidle' }).catch(() => null);
    const desborde = await p.evaluate(() => document.documentElement.scrollWidth > innerWidth + 1);
    const ok = res && res.status() === 200 && !errs.length && !rotos.length && !desborde; if (!ok) fallas++;
    console.log((ok ? 'OK   ' : 'FALLA') + ' /' + r + ' · ' + (await p.title()) + (errs.length ? ' · errores: ' + errs.join('; ') : '') + (rotos.length ? ' · rotos: ' + rotos.join(', ') : '') + (desborde ? ' · DESBORDE' : ''));
    await p.close();
  }
  await b.close(); process.exit(fallas ? 1 : 0);
})();
