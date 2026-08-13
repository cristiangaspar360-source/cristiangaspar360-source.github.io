/* ============================================================
   Miniaturas de proyecto, dibujadas en SVG dentro del propio HTML.
   Sin imágenes remotas: importa para que la política de contenido
   de Google Sites no bloquee nada dentro del iframe.

   Si algún día subes la captura real a Drive, añade su id al objeto
   IMGS y esa imagen gana sobre el dibujo.
   ============================================================ */
(function () {
  "use strict";

  /* Capturas reales que ya tienes en Drive (carpeta "Portafolio CGA - Imagenes").
     Si una falla o no existe, se queda el dibujo vectorial: la rejilla nunca
     se ve rota.

     OJO: estas capturas muestran las cifras ORIGINALES. Como el texto de las
     páginas lleva cifras desplazadas, al recapturarlas hay que usar las nuevas
     (están en la tabla del README). Mientras tanto conviven, pero se contradicen
     en los números que se alcanzan a leer.

     Para apagarlas todas de golpe: MOSTRAR_CAPTURAS = false. */
  var MOSTRAR_CAPTURAS = true;

  var DRIVE = function (id) {
    return "https://drive.google.com/thumbnail?id=" + id + "&sz=w1000";
  };

  var IMGS = MOSTRAR_CAPTURAS ? {
    "dashboard-asr": DRIVE("1dUUCPkZZ-h3FSdJJHK9u_kDLRRfzTGJG"),
    "junta":         DRIVE("1XMTb9FD_nt3PzUt21hfbgCuDIfYIteiO"),
    "roles":         DRIVE("1BGVZSrFJ-mx92O2SAAKVSMudk-uIJ1hc")
  } : {};

  var C = "var(--cat,var(--signal))";

  function svg(inner) {
    return '<svg viewBox="0 0 320 200" preserveAspectRatio="xMidYMid slice" role="img" aria-hidden="true">' +
           '<rect width="320" height="200" fill="var(--ink-3)"/>' + inner + "</svg>";
  }
  function bars(vals, x, y, w, gap, maxH) {
    return vals.map(function (v, i) {
      var h = maxH * v;
      return '<rect x="' + (x + i * (w + gap)) + '" y="' + (y + maxH - h) +
             '" width="' + w + '" height="' + h + '" rx="2" fill="' + C +
             '" opacity="' + (0.35 + v * 0.6) + '"/>';
    }).join("");
  }

  var POSTERS = {
    "dashboard-asr": svg(
      '<circle cx="86" cy="100" r="52" fill="none" stroke="var(--line-2)" stroke-width="15"/>' +
      '<circle cx="86" cy="100" r="52" fill="none" stroke="' + C + '" stroke-width="15" ' +
      'stroke-dasharray="313 327" transform="rotate(-90 86 100)" stroke-linecap="round"/>' +
      '<text x="86" y="106" text-anchor="middle" font-family="Archivo,sans-serif" font-weight="900" font-size="26" fill="var(--text)">95%</text>' +
      '<rect x="168" y="46" width="118" height="26" rx="5" fill="var(--ink-2)" stroke="var(--line)"/>' +
      '<rect x="174" y="55" width="58" height="8" rx="4" fill="' + C + '" opacity=".8"/>' +
      '<rect x="168" y="82" width="118" height="26" rx="5" fill="var(--ink-2)" stroke="var(--line)"/>' +
      '<rect x="174" y="91" width="34" height="8" rx="4" fill="' + C + '" opacity=".55"/>' +
      '<rect x="168" y="118" width="118" height="26" rx="5" fill="var(--ink-2)" stroke="var(--line)"/>' +
      '<rect x="174" y="127" width="86" height="8" rx="4" fill="' + C + '" opacity=".65"/>'
    ),
    "reporte-errores": svg(
      bars([1, .34, .30, .23, .15, .07, .04], 26, 40, 26, 12, 118) +
      '<path d="M232 56 L272 106 L292 88" fill="none" stroke="var(--c-green,#34D399)" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" opacity=".9"/>' +
      '<path d="M272 106 L272 82 M272 106 L250 106" fill="none" stroke="var(--c-green,#34D399)" stroke-width="4" stroke-linecap="round" opacity=".55"/>'
    ),
    "reempaque": svg(
      '<circle cx="76" cy="100" r="46" fill="none" stroke="var(--line-2)" stroke-width="17"/>' +
      '<circle cx="76" cy="100" r="46" fill="none" stroke="' + C + '" stroke-width="17" ' +
      'stroke-dasharray="179 289" transform="rotate(-90 76 100)"/>' +
      '<text x="76" y="107" text-anchor="middle" font-family="Archivo,sans-serif" font-weight="900" font-size="24" fill="var(--text)">62%</text>' +
      '<polyline points="152,140 176,132 200,86 224,120 248,60 272,96 296,74" fill="none" stroke="' + C + '" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"/>' +
      '<line x1="146" y1="156" x2="300" y2="156" stroke="var(--line-2)" stroke-width="1.5"/>'
    ),
    "junta": svg(
      '<g opacity=".45">' +
        [0, 1, 2, 3].map(function (i) {
          return '<rect x="' + (24 + i * 34) + '" y="46" width="26" height="26" rx="5" fill="none" stroke="var(--c-rose,#FB7185)" stroke-width="2"/>';
        }).join("") +
        '<line x1="24" y1="59" x2="160" y2="59" stroke="var(--c-rose,#FB7185)" stroke-width="1.5" stroke-dasharray="3 4"/>' +
      "</g>" +
      '<rect x="24" y="112" width="130" height="34" rx="7" fill="' + C + '" opacity=".22" stroke="' + C + '" stroke-width="1.5"/>' +
      '<path d="M40 129h96" stroke="' + C + '" stroke-width="2.5" stroke-linecap="round"/>' +
      '<path d="M124 121l12 8-12 8" fill="none" stroke="' + C + '" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>' +
      '<rect x="184" y="52" width="112" height="96" rx="7" fill="var(--ink-2)" stroke="var(--line-2)"/>' +
      '<rect x="184" y="52" width="112" height="7" rx="3" fill="' + C + '"/>' +
      '<rect x="196" y="72" width="64" height="7" rx="3" fill="var(--muted)" opacity=".6"/>' +
      bars([.4, .7, .5, .95, .6], 196, 92, 14, 8, 44)
    ),
    "rechazos": svg(
      '<rect x="128" y="30" width="64" height="24" rx="6" fill="' + C + '" opacity=".24" stroke="' + C + '" stroke-width="1.5"/>' +
      '<path d="M160 54v20M52 96V74h216v22" fill="none" stroke="var(--line-2)" stroke-width="1.8"/>' +
      [0, 1, 2, 3, 4].map(function (i) {
        var x = 24 + i * 58;
        return '<path d="M' + (x + 22) + ' 74v22" stroke="var(--line-2)" stroke-width="1.8" fill="none"/>' +
               '<rect x="' + x + '" y="98" width="44" height="24" rx="6" fill="var(--ink-2)" stroke="' + C + '" stroke-width="1.5" opacity="' + (1 - i * 0.13) + '"/>' +
               '<rect x="' + (x + 6) + '" y="138" width="32" height="14" rx="4" fill="' + C + '" opacity="' + (0.5 - i * 0.07) + '"/>' +
               '<path d="M' + (x + 22) + ' 122v16" stroke="var(--line-2)" stroke-width="1.5"/>';
      }).join("")
    ),
    "sellos": svg(
      [0, 1, 2, 3, 4, 5, 6].map(function (i) {
        var y = 26 + i * 23;
        return '<rect x="22" y="' + y + '" width="180" height="17" rx="3" fill="var(--ink-2)" stroke="var(--line)"/>' +
               '<rect x="30" y="' + (y + 5) + '" width="' + (110 - i * 11) + '" height="7" rx="3" fill="var(--muted)" opacity=".45"/>' +
               '<rect x="212" y="' + y + '" width="86" height="17" rx="3" fill="' + C + '" opacity="' + (0.82 - i * 0.11).toFixed(2) + '"/>';
      }).join("") +
      '<line x1="208" y1="72" x2="304" y2="72" stroke="var(--risk,#F87171)" stroke-width="2" stroke-dasharray="4 3"/>'
    ),
    "capas": svg(
      [0, 1, 2].map(function (i) {
        var y = 38 + i * 44;
        return '<rect x="40" y="' + y + '" width="240" height="34" rx="8" fill="var(--ink-2)" stroke="' + C + '" stroke-width="1.6" opacity="' + (1 - i * 0.2) + '"/>' +
               '<rect x="54" y="' + (y + 13) + '" width="' + (150 - i * 34) + '" height="8" rx="4" fill="' + C + '" opacity="' + (0.75 - i * 0.16) + '"/>' +
               (i < 2 ? '<path d="M160 ' + (y + 38) + 'v6" stroke="var(--line-2)" stroke-width="2"/>' : "");
      }).join("")
    ),
    "modular": svg(
      '<rect x="112" y="22" width="96" height="156" rx="14" fill="var(--ink-2)" stroke="var(--line-2)" stroke-width="1.8"/>' +
      '<rect x="112" y="22" width="96" height="20" rx="14" fill="' + C + '" opacity=".22"/>' +
      [0, 1, 2, 3, 4].map(function (i) {
        return '<rect x="124" y="' + (56 + i * 20) + '" width="' + (72 - (i % 3) * 16) + '" height="10" rx="5" fill="' + C + '" opacity="' + (0.7 - i * 0.09) + '"/>';
      }).join("") +
      '<rect x="124" y="158" width="72" height="10" rx="5" fill="var(--muted)" opacity=".35"/>' +
      '<rect x="124" y="140" width="24" height="6" rx="3" fill="' + C + '"/>' +
      '<rect x="152" y="140" width="44" height="6" rx="3" fill="var(--line-2)"/>'
    ),
    "totes": svg(
      (function () {
        var o = "";
        for (var r = 0; r < 4; r++) for (var c = 0; c < 5; c++)
          o += '<rect x="' + (24 + c * 20) + '" y="' + (56 + r * 20) + '" width="14" height="14" rx="3" fill="var(--c-rose,#FB7185)" opacity=".5"/>';
        return o;
      })() +
      '<path d="M144 108h30" stroke="var(--muted)" stroke-width="2.5" stroke-linecap="round"/>' +
      '<path d="M166 101l9 7-9 7" fill="none" stroke="var(--muted)" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>' +
      '<rect x="192" y="66" width="100" height="84" rx="10" fill="' + C + '" opacity=".2" stroke="' + C + '" stroke-width="2"/>' +
      '<text x="242" y="116" text-anchor="middle" font-family="Archivo,sans-serif" font-weight="900" font-size="34" fill="' + C + '">1</text>'
    ),
    "roles": svg(
      '<circle cx="160" cy="100" r="58" fill="none" stroke="var(--line-2)" stroke-width="1.5" stroke-dasharray="5 6"/>' +
      [[160, 42], [218, 100], [160, 158], [102, 100]].map(function (p, i) {
        return '<rect x="' + (p[0] - 27) + '" y="' + (p[1] - 17) + '" width="54" height="34" rx="8" fill="var(--ink-2)" stroke="' + C + '" stroke-width="1.6" opacity="' + (1 - i * 0.16) + '"/>' +
               '<rect x="' + (p[0] - 16) + '" y="' + (p[1] - 4) + '" width="32" height="7" rx="3.5" fill="' + C + '" opacity="' + (0.75 - i * 0.14) + '"/>';
      }).join("") +
      '<path d="M196 64a52 52 0 0 1 8 22" fill="none" stroke="' + C + '" stroke-width="2.5" stroke-linecap="round"/>' +
      '<path d="M199 84l5 6 6-4" fill="none" stroke="' + C + '" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>'
    ),
    "reservaos": svg(
      '<rect x="88" y="36" width="144" height="128" rx="12" fill="var(--ink-2)" stroke="var(--line-2)" stroke-width="1.8"/>' +
      '<rect x="88" y="36" width="144" height="26" rx="12" fill="' + C + '" opacity=".28"/>' +
      '<rect x="112" y="26" width="7" height="20" rx="3.5" fill="' + C + '"/>' +
      '<rect x="201" y="26" width="7" height="20" rx="3.5" fill="' + C + '"/>' +
      (function () {
        var o = "";
        for (var r = 0; r < 3; r++) for (var c = 0; c < 5; c++)
          o += '<rect x="' + (104 + c * 25) + '" y="' + (76 + r * 26) + '" width="16" height="16" rx="4" fill="' + C + '" opacity="' + (0.16 + ((r * 5 + c) % 4) * 0.13) + '"/>';
        return o;
      })() +
      '<path d="M142 120l14 14 26-30" fill="none" stroke="var(--c-green,#34D399)" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>'
    )
  };

  var GENERIC = svg(
    '<rect x="60" y="52" width="200" height="96" rx="10" fill="none" stroke="' + C + '" stroke-width="2"/>' +
    '<circle cx="104" cy="92" r="12" fill="' + C + '" opacity=".6"/>' +
    '<path d="M60 148l58-46 46 40 36-30 60 36" fill="none" stroke="' + C + '" stroke-width="3" stroke-linejoin="round"/>'
  );

  function pintar() {
    document.querySelectorAll("[data-poster]").forEach(function (slot) {
      if (slot.dataset.pintado) return;
      slot.dataset.pintado = "1";
      var key = slot.getAttribute("data-poster");
      var dibujo = POSTERS[key] || GENERIC;
      var url = IMGS[key];
      slot.innerHTML = dibujo;
      if (!url) return;
      var img = new Image();
      img.onload = function () { slot.innerHTML = ""; img.alt = ""; img.loading = "lazy"; slot.appendChild(img); };
      img.src = url;                       // si falla, se queda el dibujo
    });
  }

  if (document.readyState === "loading")
    document.addEventListener("DOMContentLoaded", pintar);
  else pintar();
})();
