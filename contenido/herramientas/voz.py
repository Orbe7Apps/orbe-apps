# Voz en off para reels (gratis, sin internet): Piper + Praat.
# Uso: python3 herramientas/voz.py <modelo.onnx> <guion.txt> <salida.wav>
# El guion lleva una frase por línea. Preguntas (?) suben el tono al final de forma suave;
# exclamaciones (!) van un poco más rápidas y con más volumen.
# Voz elegida: Daniela (es_AR-daniela-high). Descarga (unos 115 MB, fuera del repo):
#   https://github.com/k2-fsa/sherpa-onnx/releases/download/tts-models/vits-piper-es_AR-daniela-high.tar.bz2
# Requiere: pip install piper-tts praat-parselmouth
# Cadena de mezcla usada (ffmpeg, voz «A»): highpass=f=90,equalizer=f=250:t=q:w=1:g=-2,
#   equalizer=f=3200:t=q:w=1.2:g=4,equalizer=f=8000:t=h:w=2000:g=2,acompressor=threshold=-24dB:ratio=3:attack=5:release=60:makeup=3
import sys, subprocess, tempfile, os, numpy as np, parselmouth
from parselmouth.praat import call
modelo, guion, salida = sys.argv[1:4]
BASE = ['--length-scale','0.97','--noise-scale','0.667','--noise-w-scale','0.6']
tmp = tempfile.mkdtemp(); trozos = []; sr = None
def pregunta(snd, subida=1.22):
    m = call(snd, 'To Manipulation', 0.01, 75, 500)
    pt = call(m, 'Extract pitch tier')
    t0, t1 = snd.xmin, snd.xmax
    # tramo con voz
    p = snd.to_pitch(); ts = [t for t in p.xs() if p.get_value_at_time(t) == p.get_value_at_time(t)]
    fin = ts[-1] if ts else t1; ini = ts[0] if ts else t0
    a = ini + (fin - ini) * 0.62          # empieza la subida en la última sílaba tónica aprox.
    call(pt, 'Multiply frequencies', a, fin, 1.0)  # no-op para inicializar
    pts = call(pt, 'Get number of points')
    for k in range(1, pts + 1):
        t = call(pt, 'Get time from index', k); f = call(pt, 'Get value at index', k)
        if t > a:
            x = min(1.0, (t - a) / (fin - a)); g = 1 + (subida - 1) * (x ** 1.6)   # curva suave
            call(pt, 'Remove point', k); call(pt, 'Add point', t, f * g)
    call([pt, m], 'Replace pitch tier')
    return call(m, 'Get resynthesis (overlap-add)')
for k, t in enumerate(l.strip() for l in open(guion) if l.strip()):
    f = os.path.join(tmp, f'{k}.wav')
    extra = ['--length-scale','0.92','--noise-scale','0.75'] if t.endswith('!') else []
    subprocess.run(['python3','-m','piper','-m',modelo,'-f',f]+BASE+extra, input=t.encode(), check=True, capture_output=True)
    snd = parselmouth.Sound(f); sr = snd.sampling_frequency
    snd = call(snd, 'Extract part', max(0, snd.xmin), snd.xmax, 'rectangular', 1, 'no')
    if t.endswith('?'): snd = pregunta(snd)
    a = snd.values[0].copy()
    env = np.convolve(np.abs(a), np.ones(160)/160, 'same'); v = np.where(env > 0.01)[0]
    a = a[max(0, v[0]-200):v[-1]+1200]
    if t.endswith('!'): a *= 1.15
    trozos += [a, np.zeros(int(sr*0.45))]
    if k == 0: parselmouth.Sound(a * (0.89 / np.abs(a).max()), sr).save(salida.replace('.wav','-p1.wav'), 'WAV')
x = np.concatenate(trozos); x = x * (0.89 / np.abs(x).max()); parselmouth.Sound(x, sr).save(salida, 'WAV'); print('listo', salida)
