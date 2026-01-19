(() => {
  let animando = false;

  const env = document.getElementById("env");
  const sealBtn = document.getElementById("sealBtn");
  const btnContinuar = document.getElementById("btnContinuar");
  const openSound = document.getElementById("openSound");

  if (!env || !sealBtn) return;

  const T = {
    opening: 250,
    paperOut: 1350,
    paperDrop: 2800,
    paperUnfold: 3450,
    message: 4150
  };

  // ===== Audio =====
  function playOpenSound() {
    if (!openSound) return;

    openSound.pause();
    openSound.currentTime = 0;
    openSound.volume = 1;

    const p = openSound.play();
    if (p && typeof p.catch === "function") p.catch(() => {});
  }
 function stopOpenSoundSmooth(fadeMs = 650) {
    if (!openSound) return;

    const startVol = openSound.volume ?? 1;
    const stepMs = 30;
    const steps = Math.max(1, Math.ceil(fadeMs / stepMs));
    let i = 0;

    const timer = setInterval(() => {
      i += 1;
      const v = startVol * (1 - i / steps);
      openSound.volume = Math.max(0, v);

      if (i >= steps) {
        clearInterval(timer);
        openSound.pause();
        openSound.currentTime = 0;
        openSound.volume = 1; // deja listo para la próxima
      }
    }, stepMs);
  }
  function abrir() {
    if (animando) return;
    animando = true;
  //  sonido al abrir
    playOpenSound();
    env.classList.add("is-seal-broken");

     setTimeout(() => env.classList.add("is-opening"), T.opening);
    setTimeout(() => env.classList.add("is-paper-out"), T.paperOut);
    setTimeout(() => env.classList.add("is-paper-drop"), T.paperDrop);
    setTimeout(() => env.classList.add("is-paper-unfold"), T.paperUnfold);

     setTimeout(() => stopOpenSoundSmooth(800), T.message - 600);
/*

    setTimeout(() => env.classList.add("is-opening"), 250);
   
    setTimeout(() => env.classList.add("is-paper-out"), 1150);
      setTimeout(() => env.classList.add("is-paper-unfold"), 2150);
        setTimeout(() => env.classList.add("is-paper-drop"), 2200);*/
    // setTimeout(() => env.classList.add("is-paper-peek"), 2950);
 
    // setTimeout(() => env.classList.add("is-paper-out"), 2150);
     //setTimeout(() => env.classList.add("is-paper-drop"), 2300);
  

    setTimeout(() => {
      env.classList.add("is-message");
      animando = false;
    }, T.message);
  }

  sealBtn.addEventListener("click", (e) => {
    e.preventDefault();
    abrir();
  });

  if (btnContinuar) {
    btnContinuar.addEventListener("click", (e) => {
       e.preventDefault();

    // marca que ya vio la carta
    localStorage.setItem("cartaVista", "true");
    // vuelve al index principal
    window.location.href = "/index.html";
    });
  }
})();
