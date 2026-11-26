// Auditoría en teléfono: peso y tiempo de carga, archivos pesados, toques pequeños (< 40 px),
// letra menor a 12 px e imágenes sin texto alternativo. El contraste se revisa a ojo en las capturas
// (los fondos con degradado dan falsos positivos en cálculos automáticos).
const { BASE, chromium } = require('./comun');
(async () => {
  const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 390, height: 844 } });
  let bytes = 0, n = 0; const grandes = [];
  p.on('response', async r => { try { const buf = await r.body(); bytes += buf.length; n++; if (buf.length > 150000) grandes.push(r.url().replace(BASE, '') + ' ' + Math.round(buf.length / 1024) + ' KB'); } catch (e) {} });
  const t0 = Date.now(); await p.goto(BASE, { waitUntil: 'networkidle' });
  console.log(`carga ${Date.now() - t0} ms · ${n} peticiones · ${Math.round(bytes / 1024)} KB · pesados: ${grandes.join(', ') || 'ninguno'}`);
  const r = await p.evaluate(() => {
    const o = { toques: [], letra: [], sinAlt: [] };
    document.querySelectorAll('a,button,select,input,textarea,summary').forEach(e => { const b = e.getBoundingClientRect(); if (b.width && (b.height < 40 || b.width < 40) && getComputedStyle(e).display !== 'inline') o.toques.push(((e.innerText || e.getAttribute('aria-label') || e.tagName).trim().slice(0, 30)) + ` ${Math.round(b.width)}x${Math.round(b.height)}`); });
    document.querySelectorAll('p,span,li,small,a,label,summary,b').forEach(e => { if (![...e.childNodes].some(x => x.nodeType === 3 && x.textContent.trim())) return; const fs = parseFloat(getComputedStyle(e).fontSize); if (fs < 12 && e.getBoundingClientRect().width) o.letra.push(e.textContent.trim().slice(0, 30) + ' ' + fs + 'px'); });
    document.querySelectorAll('img:not([alt])').forEach(i => o.sinAlt.push(i.src.slice(-40)));
    for (const k in o) o[k] = [...new Set(o[k])]; return o; });
  console.log('Toques pequeños:', r.toques); console.log('Letra < 12 px:', r.letra); console.log('Imágenes sin alt:', r.sinAlt);
  await b.close();
})();
