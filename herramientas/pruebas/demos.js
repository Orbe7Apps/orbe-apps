// Prueba las demos con datos de ejemplo de las apps propias (en sus propios repositorios):
//   NEGOCIOS=http://localhost:8796/ (raíz de orbe-negocios)   FINANZAS=http://localhost:8797/ (raíz de Orbe-Finanzas)
// Comprueba que «?demo» entra directo con datos y que no toca los datos reales del navegador.
const { chromium, ruta } = require('./comun');
(async () => {
  const b = await chromium.launch(); let fallas = 0;
  if (process.env.NEGOCIOS) {
    const p = await b.newPage({ viewport: { width: 390, height: 844 } });
    await p.goto(process.env.NEGOCIOS + '?demo', { waitUntil: 'networkidle' }); await p.waitForTimeout(2500);
    const t = await p.evaluate(() => document.body.innerText); await p.screenshot({ path: ruta('demo-negocios.png') });
    const ok = /Ferretería El Tornillo/.test(t); if (!ok) fallas++; console.log((ok ? 'OK   ' : 'FALLA') + ' Orbe Negocios ?demo');
    await p.goto(process.env.NEGOCIOS, { waitUntil: 'networkidle' }); await p.waitForTimeout(1500);
    const limpio = !/Ferretería El Tornillo/.test(await p.evaluate(() => document.body.innerText)); if (!limpio) fallas++;
    console.log((limpio ? 'OK   ' : 'FALLA') + ' sin ?demo no aparece la demo');
  }
  if (process.env.FINANZAS) {
    const p = await b.newPage({ viewport: { width: 390, height: 844 } });
    await p.goto(process.env.FINANZAS); await p.evaluate(() => localStorage.setItem('gastos-v1', JSON.stringify({ onb: true, items: [{ id: 1, tipo: 'gasto', monto: 5, moneda: 'USD', cat: 'Ocio', fecha: '2026-11-01' }] })));
    await p.goto(process.env.FINANZAS + '?demo', { waitUntil: 'networkidle' }); await p.waitForTimeout(4000);
    await p.screenshot({ path: ruta('demo-finanzas.png') });
    const ok = /Saldo total/.test(await p.evaluate(() => document.body.innerText)); const real = await p.evaluate(() => JSON.parse(localStorage.getItem('gastos-v1')).items.length === 1);
    if (!ok || !real) fallas++; console.log((ok && real ? 'OK   ' : 'FALLA') + ' Orbe Finanzas ?demo (datos reales intactos: ' + real + ')');
  }
  await b.close(); process.exit(fallas ? 1 : 0);
})();
