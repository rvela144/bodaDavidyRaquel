module.exports = async (req, res) => {
  if (req.method === "OPTIONS") return res.status(204).end();
  if (req.method !== "POST") return res.status(405).json({ error: true, desc: "Método no permitido" });

  try {
    const ENDPOINT = process.env.GOOGLE_SCRIPT_URL_ASISTENCIA || process.env.GOOGLE_SCRIPT_URL;
    if (!ENDPOINT) {
      return res.status(500).json({ error: true, desc: "Falta GOOGLE_SCRIPT_URL_ASISTENCIA (o GOOGLE_SCRIPT_URL) en Vercel" });
    }

    
    console.log("BODY:", req.body);

    if (asiste !== "Si" && asiste !== "No") {
      return res.status(400).json({ error: true, desc: "Campo 'asiste' inválido." });
    }

    // En tu caso dijiste: nombre y apellido obligatorio SIEMPRE (aunque marque No)
    if (!nombre?.trim() || !apellidos?.trim()) {
      return res.status(400).json({ error: true, desc: "Nombre y apellidos son obligatorios." });
    }

    // límites
    const n = (nombre || "").trim();
    const a = (apellidos || "").trim();
    const al = (alergenos || "").trim();

    if (n.length > 50) return res.status(400).json({ error: true, desc: "Nombre demasiado largo." });
    if (a.length > 80) return res.status(400).json({ error: true, desc: "Apellidos demasiado largos." });
    if (al.length > 200) return res.status(400).json({ error: true, desc: "Alergenos demasiado largo." });

    // Enviamos a Apps Script como x-www-form-urlencoded
    const params = new URLSearchParams();
    params.set("nombre", n);
     params.set("apellidos", a);
    params.set("alergenos", al);
    params.set("asiste", asiste);

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
    return res.status(500).json({ error: true, desc: "Error enviando asistencia." });
  }
};