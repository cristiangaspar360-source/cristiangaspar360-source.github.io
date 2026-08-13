/* ============================================================
   Comportamiento compartido de las páginas de proyecto.
   Sin dependencias. Se degrada bien: si esto no carga,
   la página sigue siendo legible y las gráficas siguen visibles.
   ============================================================ */
(function () {
  "use strict";

  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---- Tema: sigue al sistema, el botón lo sobreescribe, se recuerda ---- */
  var SUN =
    '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>';
  var MOON = '<path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z"/>';

  function readStored() {
    try {
      return localStorage.getItem("cga-theme");
    } catch (e) {
      return null;
    }
  }
  function store(v) {
    try {
      localStorage.setItem("cga-theme", v);
    } catch (e) {
      /* modo privado: no pasa nada */
    }
  }

  var stored = readStored();
  var prefersLight = window.matchMedia("(prefers-color-scheme: light)").matches;
  var theme = stored || (prefersLight ? "light" : "dark");
  document.documentElement.setAttribute("data-theme", theme);

  function paintThemeIcon() {
    var ico = document.getElementById("theme-icon");
    if (ico)
      ico.innerHTML =
        document.documentElement.getAttribute("data-theme") === "light" ? MOON : SUN;
  }

  /* ---- Todo lo que necesita el DOM listo ---- */
  function boot() {
    paintThemeIcon();

    var btn = document.getElementById("theme");
    if (btn)
      btn.addEventListener("click", function () {
        var next =
          document.documentElement.getAttribute("data-theme") === "light"
            ? "dark"
            : "light";
        document.documentElement.setAttribute("data-theme", next);
        store(next);
        paintThemeIcon();
      });

    var y = document.getElementById("year");
    if (y) y.textContent = new Date().getFullYear();

    /* ---- Barra de progreso de lectura ---- */
    var prog = document.querySelector(".bar-prog");
    if (prog) {
      var onScroll = function () {
        var h = document.documentElement.scrollHeight - window.innerHeight;
        prog.style.width = (h > 0 ? (window.scrollY / h) * 100 : 0) + "%";
      };
      onScroll();
      window.addEventListener("scroll", onScroll, { passive: true });
      window.addEventListener("resize", onScroll);
    }

    /* ---- Aparición al entrar en pantalla ---- */
    var rv = document.querySelectorAll(".rv");
    if ("IntersectionObserver" in window && !reduce) {
      var io = new IntersectionObserver(
        function (es) {
          es.forEach(function (e) {
            if (e.isIntersecting) {
              e.target.classList.add("in");
              io.unobserve(e.target);
            }
          });
        },
        { threshold: 0.08, rootMargin: "0px 0px -30px 0px" }
      );
      rv.forEach(function (el) {
        io.observe(el);
      });
    } else {
      rv.forEach(function (el) {
        el.classList.add("in");
      });
    }

    /* ---- Barras: crecen al entrar en pantalla ---- */
    function grow(root) {
      (root || document).querySelectorAll(".bfill[data-w]").forEach(function (f) {
        f.style.width = f.getAttribute("data-w") + "%";
      });
    }
    var barsBlocks = document.querySelectorAll(".bars");
    if ("IntersectionObserver" in window && !reduce && barsBlocks.length) {
      var bio = new IntersectionObserver(
        function (es) {
          es.forEach(function (e) {
            if (e.isIntersecting) {
              grow(e.target);
              bio.unobserve(e.target);
            }
          });
        },
        { threshold: 0.25 }
      );
      barsBlocks.forEach(function (b) {
        bio.observe(b);
      });
    } else {
      grow(document);
    }
    window.cgaGrowBars = grow;

    /* ---- Acordeón de componentes ---- */
    document.querySelectorAll(".mod-h").forEach(function (h) {
      h.setAttribute("aria-expanded", h.closest(".mod").classList.contains("open"));
      h.addEventListener("click", function () {
        var mod = h.closest(".mod");
        var willOpen = !mod.classList.contains("open");
        mod.classList.toggle("open", willOpen);
        h.setAttribute("aria-expanded", willOpen);
      });
    });

    /* ---- Conmutadores de segmento: emiten 'segchange' ---- */
    document.querySelectorAll(".seg").forEach(function (seg) {
      seg.addEventListener("click", function (ev) {
        var b = ev.target.closest("button");
        if (!b || !seg.contains(b)) return;
        seg.querySelectorAll("button").forEach(function (x) {
          x.setAttribute("aria-pressed", x === b);
        });
        seg.dispatchEvent(
          new CustomEvent("segchange", { detail: { value: b.dataset.v, button: b } })
        );
      });
    });

    /* ---- Capturas reales desde Drive ----
       La figura ya está en el HTML pero vacía y transparente. Sólo se muestra
       si la imagen carga; si falla, la figura se elimina y no queda un hueco. */
    var conCaptura = document.querySelectorAll("[data-shot]");
    if (conCaptura.length) {
      conCaptura.forEach(function (fig) {
        var img = new Image();
        img.alt = fig.getAttribute("data-alt") || "";
        img.onload = function () {
          fig.insertBefore(img, fig.firstChild);
          fig.classList.add("ok");
        };
        img.onerror = function () { fig.remove(); };
        img.src = "https://drive.google.com/thumbnail?id=" +
                  fig.getAttribute("data-shot") + "&sz=w1400";
      });

      /* Visor a pantalla completa, creado sólo si hay capturas */
      var lb = document.createElement("div");
      lb.className = "lbox";
      lb.setAttribute("aria-hidden", "true");
      lb.innerHTML =
        '<button class="lbox-x" aria-label="Cerrar imagen">' +
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M18 6 6 18M6 6l12 12"/></svg>' +
        "</button><img alt=\"\"><div class=\"lbox-cap\"></div>";
      document.body.appendChild(lb);

      var lbImg = lb.querySelector("img");
      var lbCap = lb.querySelector(".lbox-cap");

      function cerrar() {
        lb.classList.remove("open");
        lb.setAttribute("aria-hidden", "true");
        document.body.style.overflow = "";
      }
      document.addEventListener("click", function (ev) {
        var t = ev.target.closest(".shot img");
        if (t) {
          lbImg.src = t.src;
          lbImg.alt = t.alt;
          var cap = t.closest(".shot").querySelector("figcaption");
          lbCap.textContent = cap ? cap.textContent : t.alt;
          lb.classList.add("open");
          lb.setAttribute("aria-hidden", "false");
          document.body.style.overflow = "hidden";
          return;
        }
        if (ev.target === lb || ev.target.closest(".lbox-x")) cerrar();
      });
      document.addEventListener("keydown", function (ev) {
        if (ev.key === "Escape") cerrar();
      });
    }

    /* ---- Contadores ---- */
    document.querySelectorAll("[data-count]").forEach(function (el) {
      var target = parseFloat(el.getAttribute("data-count"));
      var dec = parseInt(el.getAttribute("data-dec") || "0", 10);
      if (reduce || !("IntersectionObserver" in window)) {
        el.textContent = target.toFixed(dec);
        return;
      }
      var cio = new IntersectionObserver(
        function (es) {
          es.forEach(function (e) {
            if (!e.isIntersecting) return;
            cio.unobserve(e.target);
            var t0 = null;
            (function step(ts) {
              if (!t0) t0 = ts;
              var p = Math.min((ts - t0) / 1000, 1);
              var k = 1 - Math.pow(1 - p, 3);
              el.textContent = (target * k).toFixed(dec);
              if (p < 1) requestAnimationFrame(step);
            })(performance.now());
          });
        },
        { threshold: 0.6 }
      );
      cio.observe(el);
    });
  }

  if (document.readyState === "loading")
    document.addEventListener("DOMContentLoaded", boot);
  else boot();
})();
