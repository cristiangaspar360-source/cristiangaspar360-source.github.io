/* ============================================================
   Puente para Google Sites.

   El problema que resuelve: cuando insertas un HTML con
   "Insertar → Por URL", queda dentro de un <iframe>. Si un enlace
   apunta a otro HTML tuyo, la navegación pasa DENTRO del iframe:
   Sites no registra ninguna vista de página, las analíticas no ven
   nada y el visitante se queda encerrado en el recuadro.

   Este script detecta que está embebido y reescribe los enlaces
   internos para que apunten a la PÁGINA DE SITES equivalente y
   naveguen la ventana completa (target="_top"). Así cada proyecto
   cuenta como una visita real y el visitante conserva tu menú.

   Fuera de Sites (abriendo el HTML directo) no hace nada: los
   enlaces relativos funcionan como siempre.
   ============================================================ */
(function () {
  "use strict";

  /* ==========  1. CONFIGURA ESTO UNA SOLA VEZ  ==========
     Pon la ruta de cada página de Sites (lo que va después de
     /view/cristiangaspar-portfolio/). Si dejas una vacía o la
     borras, ese enlace seguirá abriendo el HTML dentro del marco. */

  /* SITIO es SOLO la direccion base y debe terminar en "/".
     La URL final se arma como SITIO + el slug del MAPA, y los slugs ya
     traen su ruta completa ("portfolio-de-proyectos/..."). Si aqui se
     agrega una subpagina o un ?authuser=, la ruta sale repetida y el
     parametro parte la direccion: los enlaces dejan de funcionar dentro
     de Google Sites. */
  var SITIO = "https://sites.google.com/view/cristiangaspar-portfolio/";

  var MAPA = {
    "index.html":                            "",

    /* La simulacion del ASR vive en OTRO repositorio de GitHub Pages, no
       en este sitio. Como comparten dominio, el puente la tomaba por
       interna y la reescribia a la portada de Sites. En null no se toca:
       se queda con su target="_blank" y abre en pestana nueva. */
    "Portafolio/index.html":                 null,
    "proyectos/index.html":                  "portfolio-de-proyectos",
    "proyectos/que-es-un-asr.html":          "portfolio-de-proyectos/que-es-un-asr",
    "proyectos/dashboard-asr.html":          "portfolio-de-proyectos/dashboard-de-capacidad-asr",
    "proyectos/reporte-errores-asr.html":    "portfolio-de-proyectos/reporte-de-errores-asr",
    "proyectos/junta-arranque.html":         "portfolio-de-proyectos/junta-de-arranque-de-turno",
    "proyectos/validacion-reempaque.html":   "portfolio-de-proyectos/validacion-de-reempaque",
    "proyectos/rechazos-asr.html":           "portfolio-de-proyectos/ingreso-de-rechazos-en-asr",
    "proyectos/sellos-peso-alto.html":       "portfolio-de-proyectos/sellos-con-peso-alto",
    "proyectos/reportes-turno.html":         "portfolio-de-proyectos/reportes-operativos-por-turno",
    "proyectos/reporte-modular.html":        "portfolio-de-proyectos/agente-de-reporte-modular",
    "proyectos/solicitud-totes.html":        "portfolio-de-proyectos/solicitud-de-totes-en-sap",
    "proyectos/roles-operativos.html":       "portfolio-de-proyectos/roles-operativos"
  };

  /* ==========  2. De aquí para abajo no hay que tocar nada  ========== */

  var embedded;
  try { embedded = window.self !== window.top; }
  catch (e) { embedded = true; }          // origen distinto ⇒ estamos embebidos

  if (!embedded) return;

  document.documentElement.classList.add("embedded");

  // Las claves más largas primero, para que "proyectos/index.html"
  // gane sobre "index.html".
  var CLAVES = Object.keys(MAPA).sort(function (a, b) { return b.length - a.length; });

  function destinoSites(href) {
    var ruta;
    try { ruta = new URL(href, location.href).pathname; }
    catch (e) { return null; }
    for (var i = 0; i < CLAVES.length; i++) {
      var k = CLAVES[i];
      if (ruta.slice(-k.length) === k) {
        var slug = MAPA[k];
        return typeof slug === "string" ? SITIO + slug : null;
      }
    }
    // Una carpeta sin index explícito: /proyectos/ → proyectos/index.html
    if (ruta.slice(-1) === "/") return destinoSites(href + "index.html");
    return null;
  }

  function aplicar(raiz) {
    (raiz || document).querySelectorAll("a[href]").forEach(function (a) {
      if (a.dataset.sitesReady) return;
      var href = a.getAttribute("href");
      if (!href || href.charAt(0) === "#") return;
      if (/^(mailto:|tel:|javascript:)/i.test(href)) return;

      // Externos: que salgan del marco, no que se abran dentro
      if (/^https?:\/\//i.test(href)) {
        if (href.indexOf(location.origin) !== 0) {
          a.target = a.target || "_blank";
          a.rel = a.rel || "noopener";
          a.dataset.sitesReady = "1";
          return;
        }
      }

      // Las herramientas se abren en pestaña completa: son para usarse,
      // no para verse dentro de un recuadro.
      if (href.indexOf("herramientas/") !== -1) {
        a.target = "_blank";
        a.rel = "noopener";
        a.dataset.sitesReady = "1";
        return;
      }

      var dest = destinoSites(href);
      if (dest) {
        a.href = dest;
        a.target = "_top";          // navega la ventana, no el iframe
        a.rel = "noopener";
      }
      a.dataset.sitesReady = "1";
    });
  }

  function init() {
    aplicar(document);

    // Avisa la altura al contenedor. Sites no la escucha (su marco es de
    // alto fijo), pero sirve si algún día lo insertas en otro sitio y
    // deja el dato disponible en la consola para ajustar el alto a mano.
    function altura() {
      var h = Math.max(
        document.body.scrollHeight,
        document.documentElement.scrollHeight
      );
      try { window.parent.postMessage({ tipo: "cga-altura", alto: h }, "*"); } catch (e) {}
      return h;
    }
    window.cgaAltura = altura;
    altura();
    window.addEventListener("resize", altura);
    setTimeout(altura, 1200);          // después de que carguen tipografías
  }

  if (document.readyState === "loading")
    document.addEventListener("DOMContentLoaded", init);
  else init();
})();
