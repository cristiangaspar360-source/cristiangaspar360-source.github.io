# Portafolio · una página por proyecto

Versión del portafolio pensada para **Google Sites**: cada proyecto vive en su propio HTML, con su
propia URL, para que las analíticas del sitio midan las visitas y la interacción **por proyecto** y
no de una sola página larga.

## Qué cambió respecto a la versión de 14 tarjetas

1. **El Dashboard ASR dejó de ser seis tarjetas.** Los seis "módulos" no eran proyectos hermanos:
   eran los componentes que hubo que construir para que el panel existiera. Ahora son *un programa*
   con seis componentes, presentado como bloque destacado en la portada y desarrollado en su página.
2. **Aparecieron proyectos que no tenían tarjeta**: el reporte de errores desde `ZMM400`, el árbol
   de resolución de rechazos y el control de sellos con peso alto.
3. **Cada tarjeta enlaza a una página real**, no a un documento externo.
4. **Sin imágenes remotas.** Las miniaturas son SVG dibujados dentro del propio HTML.

## Estructura

```
sitio/
├─ index.html                          Portada · perfil + índice compacto de proyectos
│                                      (?bloque=perfil|proyectos|trayectoria|formacion)
├─ proyectos/
│  ├─ index.html                       Hub · el programa + las 10 tarjetas con detalle
│  ├─ dashboard-asr.html               01 · EL PROGRAMA — 6 componentes, medidor interactivo
│  ├─ reporte-errores-asr.html         02 · ZMM400 → Power Query → Power BI en Teams
│  ├─ junta-arranque.html              03 · Antes/después + simulador de la macro
│  ├─ validacion-reempaque.html        04 · Plan del planner vs. historial SAP
│  ├─ rechazos-asr.html                05 · Árbol de decisión de 5 ramas (piso)
│  ├─ sellos-peso-alto.html            06 · Priorización por peso + calidad del dato
│  ├─ reportes-turno.html              07 · La arquitectura de tres capas
│  ├─ reporte-modular.html             08 · Agente de reporte modular (demo)
│  ├─ solicitud-totes.html             09 · LT01 batch vs. órdenes individuales
│  └─ roles-operativos.html            10 · Cuatro zonas con rotación
├─ herramientas/
│  ├─ agente-reporte-modular.html      Herramienta funcional (Firebase + localStorage)
│  ├─ validacion-reempaque.html        Prototipo: pega plan + historial SAP y valida
│  └─ extraccion-errores.html          Prototipo: traduce el log de ZMM400 y calcula la variación
└─ assets/
   ├─ proyecto.css                     Sistema de diseño de las páginas de proyecto
   ├─ proyecto.js                      Tema, revelado, acordeón, contadores
   ├─ posters.js                       Miniaturas SVG, una por proyecto
   └─ sites-bridge.js                  ← EDITA EL MAPA antes de publicar en Sites
```

## Publicar en Google Sites

### La trampa que hay que entender primero

Al insertar por URL, tu HTML queda dentro de un `<iframe>`. Si una tarjeta enlaza a otro
HTML tuyo, **la navegación ocurre dentro del marco**: Sites no registra ninguna vista de
página, las analíticas no ven nada y el visitante se queda encerrado en el recuadro.

Por eso existe [`assets/sites-bridge.js`](assets/sites-bridge.js). Detecta que está embebido y
reescribe los enlaces internos para que apunten a **la página de Sites equivalente** y naveguen
la ventana completa (`target="_top"`). Así cada proyecto cuenta como visita real y el visitante
conserva tu menú. Fuera de Sites no hace nada.

**Antes de publicar, edita el objeto `MAPA`** de ese archivo con las rutas reales de tus páginas
de Sites. Si una ruta no coincide, ese enlace simplemente navega dentro del marco: no se rompe,
pero no se mide.

Las herramientas (`herramientas/*.html`) se abren siempre en pestaña nueva: son para usarse, no
para verse dentro de un recuadro.

### Estructura de páginas en Sites

```
Inicio                          ← index.html   (perfil + índice compacto)
Portafolio de proyectos         ← proyectos/index.html
  ├─ Dashboard de Capacidad ASR ← proyectos/dashboard-asr.html
  ├─ Reporte de Errores ASR     ← proyectos/reporte-errores-asr.html
  ├─ Junta de Arranque          ← proyectos/junta-arranque.html
  ├─ Validación de Reempaque    ← proyectos/validacion-reempaque.html
  ├─ Ingreso de Rechazos en ASR ← proyectos/rechazos-asr.html
  ├─ Sellos con Peso Alto       ← proyectos/sellos-peso-alto.html
  ├─ Reportes por Turno         ← proyectos/reportes-turno.html
  ├─ Agente de Reporte Modular  ← proyectos/reporte-modular.html
  ├─ Solicitud de Totes en SAP  ← proyectos/solicitud-totes.html
  └─ Roles Operativos           ← proyectos/roles-operativos.html
Prototipos                      ← (los dos que ya tienes) + las 2 herramientas
```

El **Inicio** conserva el perfil completo (presentación, capacidades, KPIs, sobre mí,
trayectoria, formación, contacto) y muestra los proyectos como un **índice compacto de once
renglones**, no como tarjetas grandes: el perfil de almacenista sigue mandando, y quien quiera
detalle entra a su página.

### Pasos

1. Sube la carpeta `sitio/` a **GitHub Pages** (o cualquier hosting estático).
2. Edita `MAPA` en `assets/sites-bridge.js` con las rutas de tus páginas de Sites.
3. En cada página de Sites: **Insertar → Insertar → Por URL**, pega la URL del HTML.
4. Arrastra el borde inferior del marco hasta el alto de la tabla siguiente, para que **no
   quede una barra de scroll dentro del recuadro**. Ése es el detalle que separa un
   portafolio que se ve profesional de uno que se ve encajonado.

> Pegar el HTML en "Insertar código" **no** funciona: excede el límite de caracteres del bloque.

### Alto del marco (medido, ancho ~1 100 px)

| Página de Sites | Archivo | Alto |
|---|---|---|
| Portafolio de proyectos | `proyectos/index.html` | **4 350** |
| Dashboard de Capacidad ASR | `proyectos/dashboard-asr.html` | **6 200** |
| Reporte de Errores ASR | `proyectos/reporte-errores-asr.html` | **5 400** |
| Sellos con Peso Alto | `proyectos/sellos-peso-alto.html` | **5 700** |
| Ingreso de Rechazos en ASR | `proyectos/rechazos-asr.html` | **3 750** |
| Validación de Reempaque | `proyectos/validacion-reempaque.html` | **3 650** |
| Junta de Arranque | `proyectos/junta-arranque.html` | **3 250** |
| Agente de Reporte Modular | `proyectos/reporte-modular.html` | **2 550** |
| Roles Operativos | `proyectos/roles-operativos.html` | **2 300** |
| Solicitud de Totes en SAP | `proyectos/solicitud-totes.html` | **2 200** |
| Reportes por Turno | `proyectos/reportes-turno.html` | **2 150** |
| Extractor de errores (herramienta) | `herramientas/extraccion-errores.html` | **2 050** |
| Validador de reempaque (herramienta) | `herramientas/validacion-reempaque.html` | **1 650** |

Añade ~10 % de margen: las tipografías tardan un instante en cargar y el texto puede crecer una
línea. Si sobra un poco de fondo no se nota; si falta, aparece la barra de scroll interna.

> **En móvil el contenido crece** (el Dashboard pasa de 6 200 a ~9 750 px porque todo se apila en
> una columna). El marco de Sites tiene alto fijo, así que en teléfono habrá scroll dentro del
> recuadro. Es una limitación de Sites, no del código: no hay forma de que un `iframe` insertado
> por URL se ajuste solo. Por eso conviene **partir la portada en bloques**: marcos cortos
> molestan mucho menos en teléfono que uno larguísimo.

### La portada: insértala por bloques

Completa mide **8 200 px**, demasiado para un solo marco. El mismo archivo entrega sólo una parte
con `?bloque=`, así que puedes usar **cuatro marcos cortos** en la misma página de Inicio,
intercalando lo que quieras de Sites entre ellos:

| Marco | URL | Alto |
|---|---|---|
| 1 · Presentación, capacidades y KPIs | `index.html?bloque=perfil` | **1 550** |
| 2 · Índice de proyectos | `index.html?bloque=proyectos` | **1 000** |
| 3 · Sobre mí y trayectoria | `index.html?bloque=trayectoria` | **2 400** |
| 4 · Formación y contacto | `index.html?bloque=formacion` | **2 650** |

Sin el parámetro se muestra todo, por si prefieres un solo marco largo.

### Qué vas a poder medir (y qué no)

- **Sí:** visitas por página en las analíticas de Sites, una fila por proyecto. Es exactamente lo
  que buscabas, y funciona porque los enlaces rompen el marco.
- **No:** los clics *dentro* del recuadro (mover el medidor, cambiar de semana, abrir un
  componente). Eso no lo ve nadie hoy. Si lo quieres, hay que añadir medición propia dentro de
  los HTML — se puede, pero es trabajo aparte.

## Decisiones técnicas

- **Recursos externos, sólo tres:** las tipografías de Google Fonts, las capturas alojadas en
  Google Drive y —únicamente en `herramientas/agente-reporte-modular.html`, que es tu herramienta
  original— Tailwind y Firebase. Nada más: ni CDN de gráficas, ni librerías. Si Drive o Fonts
  fallan, la página **no se rompe**: aparece el dibujo vectorial y la tipografía del sistema.
- **CSS y JS compartidos** entre las páginas de proyecto: se cambia el diseño en un solo archivo.
  Funcionan con rutas relativas dentro del `iframe`.
- **Degradan sin JavaScript.** Las páginas se leen completas; sólo se pierden las simulaciones.
- **Tema claro/oscuro** compartido entre páginas vía `localStorage` (`cga-theme`).
- **Responsivo verificado a 375 px**: ninguna página scrollea de lado; las tablas anchas hacen su
  propio scroll dentro de su contenedor.

## Prototipos enlazados fuera de esta carpeta

| Prototipo | Dónde vive |
|---|---|
| Simulación — Estado operativo del ASR | Google Sites → Prototipos |
| Power BI — Aumento y disminución de errores por turno | Google Sites → Prototipos |

## Datos: parecidos, no idénticos

Todas las cifras, números de parte, lotes y descripciones están **desplazados a propósito** respecto
a las capturas originales: mantienen la forma y la proporción del dato real, pero ningún valor
coincide exactamente. Así el portafolio cuenta la misma historia sin publicar registros literales
de la planta. Las capturas que subas después deben seguir el mismo criterio para que no se
contradigan con lo que dicen las páginas.

Referencia rápida de lo que quedó publicado:

| Página | Cifras clave |
|---|---|
| Dashboard ASR | Ocupación 95.4 % · entrando 1 748 / saliendo 29 · 1 719 TO's · W49 con 122 errores |
| Reporte de errores | W48 435 → W49 122 · variación −72.0 % · acumulado 557 |
| Reempaque | Solicitado 1 411 · avance 871 · faltante 540 · 1 004 cajas entregadas |
| Sellos | Límite 15 kg · 3 sellos por encima · 23 de 36 con peso capturado |

## Imágenes: qué es real y qué está dibujado

Tus ocho capturas de Drive (carpeta *Portafolio CGA - Imagenes*) **están en uso**. El resto son
dibujos vectoriales que hacen de sustituto hasta que subas la captura correspondiente.

**Capturas reales, en las tarjetas** — objeto `IMGS` en [`assets/posters.js`](assets/posters.js):

| Proyecto | Id de Drive |
|---|---|
| Dashboard de Capacidad ASR | `1dUUCPkZZ-h3FSdJJHK9u_kDLRRfzTGJG` |
| Junta de Arranque | `1XMTb9FD_nt3PzUt21hfbgCuDIfYIteiO` |
| Roles Operativos | `1BGVZSrFJ-mx92O2SAAKVSMudk-uIJ1hc` |

**Capturas reales, dentro de la página del Dashboard** — como figura de cada componente, con visor
a pantalla completa al hacer clic:

| Dónde | Id de Drive |
|---|---|
| Escala de medición (sección 04) | `1y7756ZHzs3Xu6Cwga046xauT3kBGN9u8` |
| Componente 02 · Totes vacíos | `1qu9bLGdFAvHCM-xLs4SJ9QrhWkWFwG5U` |
| Componente 03 · Rechazos y errores | `1ghglvgpVgjgyEUCkdMn8TeVkILQrcwk6` |
| Componente 04 · Materiales en paso | `1mp--dXjTEUrXYhNa5JaQ1Y7UlTKp1EdX` |
| Componente 05 · Transferencias en tránsito | `1ez4dG1If2nHBRas2I75-J0aK5r7OXI1p` |

**Todavía sin captura** (hoy muestran dibujo): reporte de errores ZMM400 · validación de reempaque ·
agente de reporte modular · reportes por turno · ingreso de rechazos · sellos con peso alto ·
solicitud de totes · ReservaOS.

### Para añadir una captura

1. Súbela a Drive y compártela como *Cualquiera con el enlace*.
2. Copia el id del enlace (`.../d/**ESTE_TROZO**/view`).
3. Añádelo al objeto `IMGS` de `assets/posters.js`, con la clave del proyecto:
   `"sellos": DRIVE("tu_id_aqui"),`

Para una figura dentro de una página de proyecto, basta con el HTML —el resto lo hace solo:

```html
<figure class="shot" data-shot="TU_ID" data-alt="Qué se ve">
  <figcaption>Pie de foto</figcaption>
</figure>
```

Si la imagen no carga, **la figura se elimina sola**: nunca queda un recuadro roto.

### Ojo con los números

Estas capturas muestran las cifras **originales**, y el texto de las páginas lleva las cifras
desplazadas. Mientras no las recaptures, conviven pero se contradicen en lo que se alcanza a leer.
Usa la tabla de *Datos: parecidos, no idénticos* al recapturar. Si prefieres ocultarlas todas
mientras tanto, pon `MOSTRAR_CAPTURAS = false` en `assets/posters.js`.

## Escala de medición del ASR

`dashboard-asr.html` usa **la escala real de Molex**, con su descripción y su connotación operativa:

| Estado | Rango | Connotación |
|---|---|---|
| Operación Óptima | 70 % – 79 % | Espacio amplio para nuevas unidades. Flujo de trabajo ideal. |
| Operación Estándar | 80 % – 89 % | Operación normal y eficiente. Utilización regular de la capacidad. |
| Alta Demanda | 90 % – 95 % | Acercándose al límite. Monitoreo cercano y posible planificación de desalojos. |
| Capacidad Crítica | Mayor a 95 % | Muy pocas localidades. Requiere acción urgente para liberar espacio. |

Está en el bloque `LEVELS` del script, y los mismos cortes gobiernan el resaltado de la sección 04.

## Notas de alcance

- **Sellos con peso alto** es un control **preventivo**: detecta los sellos de más de 15 kg para
  identificarlos y **evitar que ingresen al ASR**, no para recuperarlos después. El hallazgo
  secundario —un tercio del listado sin peso capturado— importa justamente porque esos sellos
  *pasan el filtro sin ser evaluados*.
- **Junta de arranque** y **Reportes operativos por turno** son proyectos distintos: comparten
  tecnología (SAP → VBA → PPT) pero no propósito. El primero produce un entregable concreto; el
  segundo es la arquitectura de tres capas que permitió todo lo demás.
