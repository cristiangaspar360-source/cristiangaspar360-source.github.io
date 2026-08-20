# Guía de publicación en Google Sites — tabla maestra

Todo se inserta con **Insertar → Insertar → Por URL**.
Nada por «Insertar código»: excede el límite de caracteres del bloque.

**Base de las URL (GitHub Pages):**
```
https://cristiangaspar360-source.github.io/
```

**Base del sitio en Sites** — la usa `assets/sites-bridge.js` para reescribir los enlaces:
```
https://sites.google.com/view/cristiangaspar-portfolio/
```
> ⚠️ Confirmar tras publicar. Si el sitio nuevo tiene otra dirección, hay que actualizar
> la constante `SITIO` en `assets/sites-bridge.js` o los enlaces internos irán al sitio viejo.

---

## Árbol de páginas

```
Perfil                                    ← INICIO (4 marcos)
├── Portafolio de proyectos               ← hub
│   ├── Que es un asr                     00 · contexto
│   ├── Dashboard de Capacidad ASR        01 · EL PROGRAMA
│   ├── Reporte de Errores ASR            02
│   ├── Junta de Arranque de Turno        03
│   ├── Validacion de Reempaque           04
│   ├── Ingreso de Rechazos en ASR        05
│   ├── Sellos con Peso Alto              06
│   ├── Reportes Operativos por Turno     07
│   ├── Agente de Reporte Modular         08
│   ├── Solicitud de Totes en SAP         09
│   └── Roles Operativos                  10
├── Proyecto Local de iniciativa propia   ← ya existía, fuera del puente
└── PROTOTIPOS                            ← opcional
```

---

## 1 · Inicio — página «Perfil»

Un solo marco mediría 8 200 px. Se parte en cuatro con `?bloque=`.
Puedes intercalar contenido nativo de Sites entre ellos.

| # | Marco | URL a insertar | Alto |
|---|---|---|---|
| 1 | Presentación, capacidades y KPIs | `index.html?bloque=perfil` | 1 550 |
| 2 | Índice de proyectos | `index.html?bloque=proyectos` | 1 000 |
| 3 | Sobre mí y trayectoria | `index.html?bloque=trayectoria` | 2 400 |
| 4 | Formación y contacto | `index.html?bloque=formacion` | 2 650 |

Ruta de la página: **la raíz del sitio** (es la página de inicio, ícono de casa).

---

## 2 · Las 12 páginas de proyecto

La **ruta personalizada** debe coincidir letra por letra con el `MAPA` de `sites-bridge.js`.
Sites antepone sola la ruta del padre: escribe sólo la parte que se indica.
Sin acentos y sin Ñ.

| # | Nombre de la página | Ruta personalizada | URL a insertar | Alto |
|---|---|---|---|---|
| — | Portafolio de proyectos | `portafolio-de-proyectos` | `proyectos/index.html` | 4 600 |
| 00 | Que es un asr | `que-es-un-asr` | `proyectos/que-es-un-asr.html` | 2 200 |
| 01 | Dashboard de Capacidad ASR | `dashboard-de-capacidad-asr` | `proyectos/dashboard-asr.html` | 6 200 |
| 02 | Reporte de Errores ASR | `reporte-de-errores-asr` | `proyectos/reporte-errores-asr.html` | 5 400 |
| 03 | Junta de Arranque de Turno | `junta-de-arranque-de-turno` | `proyectos/junta-arranque.html` | 3 250 |
| 04 | Validacion de Reempaque | `validacion-de-reempaque` | `proyectos/validacion-reempaque.html` | 3 650 |
| 05 | Ingreso de Rechazos en ASR | `ingreso-de-rechazos-en-asr` | `proyectos/rechazos-asr.html` | 3 750 |
| 06 | Sellos con Peso Alto | `sellos-con-peso-alto` | `proyectos/sellos-peso-alto.html` | 5 700 |
| 07 | Reportes Operativos por Turno | `reportes-operativos-por-turno` | `proyectos/reportes-turno.html` | 2 150 |
| 08 | Agente de Reporte Modular | `agente-de-reporte-modular` | `proyectos/reporte-modular.html` | 2 550 |
| 09 | Solicitud de Totes en SAP | `solicitud-de-totes-en-sap` | `proyectos/solicitud-totes.html` | 2 200 |
| 10 | Roles Operativos | `roles-operativos` | `proyectos/roles-operativos.html` | 2 300 |

**Ruta completa resultante** de cualquier hija:
`portafolio-de-proyectos/` + la ruta de su renglón.

> **El Dashboard (01) es un caso aparte.** Sus bloques arrancan cerrados y ocupa ~2 000 px;
> si el lector los abre todos crece a ~5 300. Con 6 200 nunca hay scroll interno, pero sobra
> fondo al entrar. Con 2 200 entra ajustado y aparece scroll al desplegar. Tú decides.

---

## 3 · PROTOTIPOS (opcional)

Las herramientas **no necesitan página en Sites**: el puente las marca con `target="_blank"`
y se abren en pestaña completa desde GitHub Pages. Son para usarse, no para verse dentro
de un recuadro de 1 100 px.

Si aun así las quieres medir:

| Nombre de la página | URL a insertar | Alto |
|---|---|---|
| Extractor de errores | `herramientas/extraccion-errores.html` | 2 050 |
| Validador de reempaque | `herramientas/validacion-reempaque.html` | 1 650 |
| Agente de Reporte Modular (herramienta) | `herramientas/agente-reporte-modular.html` | — |

Los dos prototipos que ya tenías en Sites se conservan y se enlazan; no hay que rehacerlos.

---

## 4 · Lo que NO se inserta

- **Los 5 descargables** (`.xlsx` y la guía HTML): ya se bajan desde los botones dentro
  de cada página de proyecto.
- **Cualquier cosa por «Insertar código»**: no cabe.

---

## 5 · Reglas al insertar

1. **Súmale ~10 % al alto.** Las tipografías tardan un instante en cargar y el texto puede
   crecer una línea. Si sobra fondo no se nota; si falta, aparece la barra de scroll interna.
2. **Arrastra el borde inferior del marco** hasta el alto indicado. Ése es el detalle que
   separa un portafolio que se ve profesional de uno encajonado.
3. **En móvil el contenido crece** (el Dashboard pasa de 6 200 a ~9 750 px al apilarse en una
   columna). El marco de Sites tiene alto fijo: en teléfono habrá scroll interno. Es limitación
   de Sites, no del código. Por eso la portada va en cuatro marcos cortos.

---

## 6 · Verificación final

Después de crear todas las páginas y publicar:

- [ ] Abre una página de proyecto **desde Sites** y haz clic en un enlace a otro proyecto.
      Debe salir del recuadro y navegar la ventana completa, conservando tu menú.
      Si se queda dentro del marco o cae en 404, la ruta no coincide con el `MAPA`.
- [ ] Confirma la dirección real del sitio y ajusta `SITIO` en `sites-bridge.js` si cambió.
- [ ] Revisa en las analíticas de Sites que aparezca **una fila por proyecto**.
