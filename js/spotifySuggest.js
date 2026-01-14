(function () {
  function $(id) { return document.getElementById(id); }

  const q = $("spotifyQuery");
  const btnSearch = $("btnSpotifySearch");
  const results = $("spotifyResults");
  const status = $("spotifyStatus");
  const trackIdHidden = $("spotifyTrackId");
  const btnSend = $("sendSugerenciaCancion");

  if (!q || !btnSearch || !results || !status || !trackIdHidden || !btnSend) return;

  function setStatus(msg) { status.textContent = msg || ""; }

  function renderTracks(tracks) {
    results.innerHTML = "";
    tracks.forEach(t => {
      const artists = (t.artists || []).join(", ");
      const img = t.album?.images?.[2]?.url || t.album?.images?.[1]?.url || t.album?.images?.[0]?.url || "";

      const row = document.createElement("div");
      row.style.display = "flex";
      row.style.alignItems = "center";
      row.style.gap = "10px";
      row.style.padding = "8px";
      row.style.border = "1px solid #ddd";
      row.style.borderRadius = "8px";
      row.style.marginBottom = "8px";
      row.style.cursor = "pointer";
      row.style.background = "#fff";

      row.innerHTML = `
        ${img ? `<img src="${img}" style="width:44px;height:44px;object-fit:cover;border-radius:6px;">` : ""}
        <div style="flex:1;">
          <div style="font-weight:600;">${t.name}</div>
          <div style="font-size:12px;opacity:0.75;">${artists} · ${t.album?.name || ""}</div>
        </div>
        <div style="font-size:12px;opacity:0.8;">Seleccionar</div>
      `;

      row.addEventListener("click", () => {
        trackIdHidden.value = t.id;
        setStatus(`Seleccionada: ${t.name} — ${artists}`);
      });

      results.appendChild(row);
    });
  }

  async function doSearch() {
    const query = (q.value || "").trim();
    if (!query) return;

    results.innerHTML = "";
    setStatus("Buscando...");

    try {
      const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Error buscando");

      if (!data.tracks || !data.tracks.length) return setStatus("Sin resultados.");

      setStatus(`Resultados: ${data.tracks.length} (pulsa una canción para seleccionarla)`);
      renderTracks(data.tracks);
    } catch (e) {
      setStatus(`Error: ${e.message}`);
    }
  }

  btnSearch.addEventListener("click", doSearch);
  q.addEventListener("keydown", (e) => { if (e.key === "Enter") { e.preventDefault(); doSearch(); } });

  btnSend.addEventListener("click", async () => {
    const trackId = (trackIdHidden.value || "").trim();
    if (!trackId) return setStatus("Primero busca y selecciona una canción.");

    setStatus("Añadiendo a la playlist...");

    try {
      const res = await fetch("/api/suggest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ trackId })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "Error al añadir");

      setStatus("Canción añadida correctamente.");
    } catch (e) {
      setStatus(`Error: ${e.message}`);
    }
  });
})();
