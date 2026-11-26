// Capturas de la portada (anillo animado en dos momentos) y del sello «Demo gratis», en teléfono y computadora.
const { BASE, chromium, ruta } = require('./comun');
(async () => {
  const b = await chromium.launch();
  for (const [w, h, n] of [[1280, 800, 'computadora'], [390, 844, 'telefono']]) {
    const p = await b.newPage({ viewport: { width: w, height: h }, deviceScaleFactor: 1.5 });
    await p.goto(BASE, { waitUntil: 'networkidle' });
    await p.evaluate(() => document.querySelectorAll('.rev').forEach(e => e.classList.add('visto', 'in', 'ver')));
    await p.waitForTimeout(1000); await p.screenshot({ path: ruta(`portada-${n}-1.png`) });
    await p.waitForTimeout(3000); await p.screenshot({ path: ruta(`portada-${n}-2.png`) });
    await p.evaluate(() => { document.documentElement.style.scrollBehavior = 'auto'; document.querySelector('.escena .tel-vivo').scrollIntoView({ block: 'center' }); }); await p.waitForTimeout(300);
    const toque = await p.evaluate(() => { const r = document.querySelector('.escena .tel-vivo').getBoundingClientRect(); const e = document.elementFromPoint(r.left + r.width / 2, r.top + r.height * .75); return e && e.tagName; });
    if (toque !== 'IFRAME') console.log(`FALLA ${n}: el anillo de adelante tapa los toques al catálogo (${toque})`);
    await p.addStyleTag({ content: '.precio-sello > svg{animation:none!important}' });
    await p.evaluate(() => { document.documentElement.style.scrollBehavior = 'auto'; document.querySelector('.precio-sello').scrollIntoView({ block: 'center' }); });
    await p.waitForTimeout(1000); await p.locator('.precio-sello').screenshot({ path: ruta(`sello-${n}.png`) });
    await p.close();
  }
  console.log('Capturas listas'); await b.close();
})();
