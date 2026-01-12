export default async function handler(req, res) {
  if (req.method === "OPTIONS") return res.status(204).end();
  if (req.method !== "POST") return res.status(405).json({ error: true, desc: "Método no permitido" });

  try {
    const ENDPOINT = process.env.GOOGLE_SCRIPT_URL;

    // Vercel Functions suelen darte req.body ya parseado si es JSON.
    const { nombre, cancion, artista, link } = req.body || {};
  // Validación mínima
    if (!cancion || !link) {
      return res.status(400).json({ error: true, desc: "Faltan campos obligatorios (canción y link)." });
    }
     // Reenviar como urlencoded a Apps Script (evita CORS y simplifica)
    const params = new URLSearchParams();
    params.set("nombre", nombre || "");
    params.set("cancion", cancion || "");
    params.set("artista", artista || "");
    params.set("link", link || "");

    const r = await fetch(ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8" },
      body: params.toString(),
    });

    const text = await r.text();
    try { return res.status(200).json(JSON.parse(text)); }
    catch { return res.status(200).json({ error: false }); }
  } catch (e) {
    return res.status(500).json({ error: true, desc: "Error enviando sugerencia." });
  }
}
