/* Motor 3D de Orbe Apps (se carga DESPUÉS de motor2.js y amplía window.pintar).
   Fotogramas clave en 3D:
     <div class="k3" data-kf='[[seg, {x,y,z,rx,ry,rz,s,o,e}], ...]'>
       x,y,z en px; rx,ry,rz en grados; s escala; o opacidad; e = curva hacia ese punto:
       "out" (frena), "in" (acelera), "back" (rebote suave), "lin" (lineal); por defecto, suave (entra y sale).
     Antes del primer punto el objeto está oculto; después del último se queda quieto.
     El contenedor necesita: perspective (ej. .mundo { perspective: 1800px; transform-style: preserve-3d }).
   data-giro="grados/s"            giro continuo en Y (carruseles); los hijos .mini que dan la espalda se ocultan.
   data-desliza='[[seg, px], ...]' en una <img> dentro de un teléfono: desplaza la pantalla (scroll) con curva suave.
   data-trazo="ini,fin"            en un <path>: dibuja la línea de principio a fin entre esos segundos.
   .brillo dentro de un .k3        reflejo de luz que recorre la pantalla. */
(function () {
  const C = { x: 0, y: 0, z: 0, rx: 0, ry: 0, rz: 0, s: 1, o: 1 };
  const E = { out: p => 1 - Math.pow(1 - p, 3), in: p => p * p * p, lin: p => p,
    back: p => { const c = 1.2; return 1 + (c + 1) * Math.pow(p - 1, 3) + c * Math.pow(p - 1, 2); },
    suave: p => p < .5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2 };
  const lim = x => Math.max(0, Math.min(1, x));
  const objs = [...document.querySelectorAll('.k3')].map(el => {
    const ks = JSON.parse(el.dataset.kf); let prev = { ...C };
    ks.forEach(k => { k[1] = { ...prev, ...k[1] }; prev = { ...k[1] }; delete prev.e; });
    const minis = [...el.querySelectorAll(':scope > .mini')].map(m => ({ m, ang: +(m.style.transform.match(/rotateY\(([-\d.]+)deg\)/) || [0, 0])[1] }));
    return { el, ks, giro: +el.dataset.giro || 0, brillo: el.querySelector('.brillo'), minis };
  });
  const deslizas = [...document.querySelectorAll('[data-desliza]')].map(el => ({ el, ks: JSON.parse(el.dataset.desliza) }));
  const trazos = [...document.querySelectorAll('[data-trazo]')].map(el => { const L = el.getTotalLength(); el.style.strokeDasharray = L; const [a, b] = el.dataset.trazo.split(',').map(Number); return { el, L, a, b }; });
  const base = window.pintar || (() => {});
  window.pintar = function (t) {
    base(t);
    for (const o of objs) {
      const ks = o.ks; let v;
      if (t < ks[0][0]) { o.el.style.opacity = 0; continue; }
      if (t >= ks[ks.length - 1][0]) v = ks[ks.length - 1][1];
      else {
        let i = 0; while (t >= ks[i + 1][0]) i++;
        const [t0, a] = ks[i], [t1, b] = ks[i + 1], p = (E[b.e] || E.suave)((t - t0) / (t1 - t0));
        v = {}; for (const k in C) v[k] = a[k] + (b[k] - a[k]) * (k === 'o' ? lim(p) : p);
      }
      const ry = v.ry + o.giro * t, op = lim(v.o);
      o.el.style.opacity = o.minis.length ? 1 : op;  // una opacidad menor que 1 aplanaría un carrusel 3D
      o.el.style.transform = `translate3d(${v.x}px,${v.y}px,${v.z}px) rotateX(${v.rx}deg) rotateY(${ry}deg) rotateZ(${v.rz}deg) scale(${v.s})`;
      for (const n of o.minis) n.m.style.opacity = op * lim(Math.cos((n.ang + ry) * Math.PI / 180) * 2.4 + 0.35);
      if (o.brillo) o.brillo.style.backgroundPosition = `${160 - ((t * 45) % 220)}% 0`;
    }
    for (const d of deslizas) {
      const ks = d.ks; let y;
      if (t <= ks[0][0]) y = ks[0][1]; else if (t >= ks[ks.length - 1][0]) y = ks[ks.length - 1][1];
      else { let i = 0; while (t >= ks[i + 1][0]) i++; const p = E.suave((t - ks[i][0]) / (ks[i + 1][0] - ks[i][0])); y = ks[i][1] + (ks[i + 1][1] - ks[i][1]) * p; }
      d.el.style.transform = `translateY(${y}px)`;
    }
    for (const r of trazos) r.el.style.strokeDashoffset = r.L * (1 - E.out(lim((t - r.a) / (r.b - r.a))));
  };
  window.pintar(0);
})();
