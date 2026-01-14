const { addTrackToPlaylist } = require("./_lib/spotify.cjs");

module.exports = async (req, res) => {
  try {
    if (req.method !== "POST") {
      res.setHeader("Allow", "POST");
      return res.status(405).json({ error: "Método no permitido" });
    }

    const playlistId = process.env.SPOTIFY_PLAYLIST_ID;
    if (!playlistId) throw new Error("Falta SPOTIFY_PLAYLIST_ID");

    const trackId = req.body?.trackId?.toString()?.trim();
    if (!trackId) return res.status(400).json({ error: "Falta trackId" });

    await addTrackToPlaylist(playlistId, trackId);

    return res.status(200).json({ ok: true });
  } catch (e) {
    return res.status(500).json({ error: e.message || "Error" });
  }
};
