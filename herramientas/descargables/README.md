# Herramientas descargables

Versiones **descargables** de las herramientas del portafolio. Cada proyecto
mantiene su demo interactiva en la página; aquí está el archivo real que el
visitante baja, abre en Excel (o Google Sheets) y usa con sus propios datos.

| Archivo | Proyecto | Qué hace | Trae |
|---|---|---|---|
| `Sellos-Peso-Alto.xlsx` | Identificación de sellos con peso alto | Listado ordenado por peso con formato condicional y corte de 15 kg | Datos demo · veredicto automático · resumen |
| `Roles-Operativos-Matriz.xlsx` | Sistema de roles operativos | Matriz materialistas × tareas con niveles 0–3 y cobertura | Datos demo · escala de color · autónomos por tarea |
| `Junta-Arranque-KPIs.xlsx` | Junta de arranque / Reportes por turno | Hoja de KPIs del turno lista para exportar a PowerPoint | KPIs demo · comentarios para lámina |
| `Solicitud-Totes-Batch.xlsx` | Optimización de solicitud de totes | Agrupa solicitudes individuales en una sola orden LT01 | Datos demo · antes vs. después |

## Cómo se usan

1. **Descarga** el `.xlsx` y ábrelo en Excel o súbelo a Google Drive → Google Sheets.
2. Cada archivo **ya trae datos de ejemplo**: se ve funcionando sin configurar nada.
3. **Reemplaza** los datos demo con tu extracción de SAP (pega sobre las filas).
   Las fórmulas y el formato condicional se recalculan solos.
4. **Exporta** a PDF (Archivo → Exportar) o a CSV (Guardar como) para compartir.

## Notas

- **Formato condicional:** en `Sellos-Peso-Alto` el rojo/verde se pinta según el
  peso contra el corte de 15 kg. Si cambias el corte, ajusta la regla en
  Inicio → Formato condicional.
- **Privacidad:** los números de parte y nombres están anonimizados. Cámbialos
  sólo en tu copia local.
- **Compatibilidad:** hechos con fórmulas estándar (IF, COUNTIF, SUM). Funcionan
  igual en Excel de escritorio, Excel online y Google Sheets.

Ver también: el **Dashboard Inteligente de Capacidad ASR** (6 módulos en un solo
archivo) vive en `portafolio/herramientas/dashboard-asr/`.
