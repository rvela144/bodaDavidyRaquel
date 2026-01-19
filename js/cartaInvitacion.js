(() => {
  let animando = false;

  const env = document.getElementById("env");
  const sealBtn = document.getElementById("sealBtn");
  const btnContinuar = document.getElementById("btnContinuar");

  if (!env || !sealBtn) return;

  function abrir() {
    if (animando) return;
    animando = true;

    env.classList.add("is-seal-broken");

    setTimeout(() => env.classList.add("is-opening"), 250);
   
    setTimeout(() => env.classList.add("is-paper-out"), 1150);
      setTimeout(() => env.classList.add("is-paper-unfold"), 2150);
        setTimeout(() => env.classList.add("is-paper-drop"), 2200);
    // setTimeout(() => env.classList.add("is-paper-peek"), 2950);
 
    // setTimeout(() => env.classList.add("is-paper-out"), 2150);
     //setTimeout(() => env.classList.add("is-paper-drop"), 2300);
  

    setTimeout(() => {
      env.classList.add("is-message");
      animando = false;
    }, 2150);
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
    window.location.href = "../index.html";
    });
  }
})();
