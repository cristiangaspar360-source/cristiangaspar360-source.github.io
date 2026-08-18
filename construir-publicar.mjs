/* ============================================================
   Genera `publicar/`: una copia del sitio donde cada página lleva
   su CSS y su JS DENTRO del archivo.

   Para qué: en Google Sites cada página se inserta por separado
   («Insertar → Por URL»). Un archivo autocontenido se puede subir,
   mover o incrustar solo, sin arrastrar la carpeta assets/.

   Qué NO hace, a propósito:
   · No toca ningún enlace. La estructura de carpetas se conserva
     igual, así que los enlaces relativos y el MAPA de
     sites-bridge.js (que identifica cada página por su ruta,
     p. ej. "proyectos/dashboard-asr.html") siguen funcionando.
   · No descarga las tipografías de Google ni las capturas de Drive:
     son remotas y ya están permitidas dentro del iframe de Sites.

   Uso:  node portafolio/sitio/construir-publicar.mjs
   ============================================================ */

import { readFile, writeFile, mkdir, readdir, copyFile, rm } from 'node:fs/promises';
import { dirname, join, relative, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const RAIZ = fileURLToPath(new URL('.', import.meta.url));
const SALIDA = join(RAIZ, 'publicar');

/* ---------- utilidades ---------- */

async function listarArchivos(dir, filtro) {
  const out = [];
  for (const e of await readdir(dir, { withFileTypes: true })) {
    if (e.name === '.git' || e.name === 'publicar' || e.name === 'node_modules') continue;
    const p = join(dir, e.name);
    if (e.isDirectory()) out.push(...await listarArchivos(p, filtro));
    else if (filtro(e.name)) out.push(p);
  }
  return out;
}

/* Un `</script>` dentro del JS cerraría la etiqueta antes de tiempo y
   rompería la página. Igual con `</style>` dentro del CSS. */
const blindarJS  = (s) => s.replace(/<\/script/gi, '<\\/script');
const blindarCSS = (s) => s.replace(/<\/style/gi, '<\\/style');

const cache = new Map();
async function leerAsset(ruta) {
  if (!cache.has(ruta)) cache.set(ruta, await readFile(ruta, 'utf8'));
  return cache.get(ruta);
}

/* ---------- transformación de una página ---------- */

async function inlinear(rutaHtml) {
  let html = await readFile(rutaHtml, 'utf8');
  const base = dirname(rutaHtml);
  let css = 0, js = 0, faltantes = [];

  // <link rel="stylesheet" href="…assets/x.css">  →  <style>…</style>
  const reLink = /<link[^>]*rel=["']stylesheet["'][^>]*href=["']([^"']*assets\/[^"']+\.css)["'][^>]*>/gi;
  for (const m of [...html.matchAll(reLink)]) {
    const abs = resolve(base, m[1]);
    try {
      const contenido = await leerAsset(abs);
      html = html.replace(m[0], `<style>\n/* ← ${m[1]} */\n${blindarCSS(contenido)}\n</style>`);
      css++;
    } catch { faltantes.push(m[1]); }
  }

  // <script src="…assets/x.js"></script>  →  <script>…</script>
  // El orden se respeta solo: se sustituye cada etiqueta en su sitio.
  const reScript = /<script[^>]*src=["']([^"']*assets\/[^"']+\.js)["'][^>]*>\s*<\/script>/gi;
  for (const m of [...html.matchAll(reScript)]) {
    const abs = resolve(base, m[1]);
    try {
      const contenido = await leerAsset(abs);
      html = html.replace(m[0], `<script>\n/* ← ${m[1]} */\n${blindarJS(contenido)}\n</script>`);
      js++;
    } catch { faltantes.push(m[1]); }
  }

  return { html, css, js, faltantes };
}

/* ---------- ejecución ---------- */

await rm(SALIDA, { recursive: true, force: true });
await mkdir(SALIDA, { recursive: true });

const paginas = await listarArchivos(RAIZ, (n) => n.endsWith('.html'));
let totalCss = 0, totalJs = 0, problemas = [];

for (const p of paginas) {
  const rel = relative(RAIZ, p);
  const { html, css, js, faltantes } = await inlinear(p);
  const destino = join(SALIDA, rel);
  await mkdir(dirname(destino), { recursive: true });
  await writeFile(destino, html, 'utf8');
  totalCss += css; totalJs += js;
  if (faltantes.length) problemas.push(`${rel}: no encontré ${faltantes.join(', ')}`);
  const marca = css + js ? `${css} css + ${js} js` : 'sin assets (ya era autónoma)';
  console.log(`  ✓ ${rel.padEnd(46)} ${marca}`);
}

// Los descargables se copian tal cual para que los botones sigan resolviendo.
const extras = await listarArchivos(join(RAIZ, 'herramientas', 'descargables'), (n) => !n.endsWith('.html'));
for (const f of extras) {
  const destino = join(SALIDA, relative(RAIZ, f));
  await mkdir(dirname(destino), { recursive: true });
  await copyFile(f, destino);
}

console.log(`\n${paginas.length} páginas → ${relative(RAIZ, SALIDA)}${sep}`);
console.log(`${totalCss} hojas de estilo y ${totalJs} scripts incrustados · ${extras.length} descargables copiados`);
if (problemas.length) {
  console.log('\n⚠ Revisar:');
  problemas.forEach((p) => console.log('  ' + p));
  process.exitCode = 1;
}
