const { searchTracks } = require("./_lib/spotify.cjs");

module.exports = async (req, res) => {
  try {
    const q = (req.query?.q || "").toString().trim();
    if (!q) return res.status(400).json({ error: "Falta parámetro q" });

    const tracks = await searchTracks(q, 10);

    const mapped = tracks.map(t => ({
      id: t.id,
      name: t.name,
      artists: (t.artists || []).map(a => a.name),
      album: { name: t.album?.name || "", images: t.album?.images || [] }
    }));

    return res.status(200).json({ tracks: mapped });
  } catch (e) {
    return res.status(500).json({ error: e.message || "Error" });
  }
};
