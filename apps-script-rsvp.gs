/**
 * ══════════════════════════════════════════════════════════════
 *  RSVP SHARON — Google Apps Script
 *  Recibe confirmaciones desde la invitación web y las
 *  agrega como filas nuevas en este Google Sheet.
 * ══════════════════════════════════════════════════════════════
 *
 * INSTALACIÓN (5 pasos, ~3 minutos):
 *
 * 1. Abre tu Google Sheet (el de Sharon)
 * 2. Menú: Extensiones → Apps Script
 * 3. BORRA todo el contenido de Code.gs y PEGA este archivo completo
 * 4. Clic en "Implementar" → "Nueva implementación"
 *    - Tipo: ⚙️ Aplicación web
 *    - Descripción: RSVP Sharon
 *    - Ejecutar como: Yo (tu cuenta)
 *    - Quién tiene acceso: Cualquier persona  ← IMPORTANTE
 * 5. Clic "Implementar" → autoriza los permisos →
 *    COPIA la "URL de la aplicación web"
 *    (termina en /exec) y pégala en
 *    src/config/invitation.ts → rsvp.sheetsEndpoint
 *
 * ENCABEZADOS del sheet (fila 1, opcional pero recomendado):
 *   Fecha | Nombre | Asistencia | Personas | Mensaje
 *
 * PROBAR: abre la URL /exec en el navegador — debe decir
 *   {"ok":true,"msg":"RSVP Sharon activo"}
 */

function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    const data = JSON.parse(e.postData.contents);

    sheet.appendRow([
      new Date(),                    // Fecha (automática)
      data.nombre || "",            // Nombre
      data.asistencia || "",         // Sí / No
      data.personas || "",           // Número de personas
      data.mensaje || "",            // Mensaje para Sharon
    ]);

    return jsonOut({ ok: true });
  } catch (err) {
    return jsonOut({ ok: false, error: String(err) });
  }
}

/** Health check — abre la URL en el navegador para verificar */
function doGet() {
  return jsonOut({ ok: true, msg: "RSVP Sharon activo" });
}

function jsonOut(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(
    ContentService.MimeType.JSON,
  );
}