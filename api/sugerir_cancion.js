module.exports = async (req, res) => {
  if (req.method === "OPTIONS") return res.status(204).end();
  if (req.method !== "POST") return res.status(405).json({ error: true, desc: "Método no permitido" });

  try {
    const ENDPOINT = process.env.GOOGLE_SCRIPT_URL;
    if (!ENDPOINT) return res.status(500).json({ error: true, desc: "Falta GOOGLE_SCRIPT_URL en Vercel" });

    const { nombre, titulo, artista, link } = req.body || {};
    console.log("BODY:", req.body);

    if (!titulo || !link) {
      return res.status(400).json({ error: true, desc: "Faltan campos (título y link)." });
    }

    const params = new URLSearchParams();
    params.set("nombre", nombre || "");
    params.set("titulo", titulo || "");
    params.set("artista", artista || "");
    params.set("link", link || "");

    const r = await fetch(ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8" },
      body: params.toString(),
    });

    const text = await r.text();
    console.log("AppsScript response:", text);

    try { return res.status(200).json(JSON.parse(text)); }
    catch { return res.status(200).json({ error: false, raw: text }); }

  } catch (e) {
    console.log("ERROR:", e);
    return res.status(500).json({ error: true, desc: "Error enviando sugerencia." });
  }
};