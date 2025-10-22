const overlay = document.getElementById("portadaBienvenida");
const musica= document.getElementById("musicaFondo");
const btnConMusica = document.getElementById("btnConMusica");
const btnSinMusica = document.getElementById("btnSinMusica");
const modal = new bootstrap.Modal(document.getElementById('portadaBienvenida'));
/*MÉTODO MOSTRAR ICONO DE CARGA */

window.addEventListener('load', function () {
  var preloader = document.querySelector('.loader');
  var preloaderArea = document.querySelector('.cargarIcono');
  //oculto todo el contenido menos el icono de carga
 // Mostrar el loader

  // Fade out loader
if (preloader) {
    preloader.style.transition = 'opacity 0.5s ease';
    preloader.style.opacity = 0;
    setTimeout(() => {
      preloader.style.display = 'none';
    }, 500);
  }

  // Fade out preloader area con delay de 100ms
  if (preloaderArea) {
    setTimeout(() => {
      preloaderArea.style.transition = 'opacity 0.5s ease';
      preloaderArea.style.opacity = 0;
      setTimeout(() => {
        preloaderArea.style.display = 'none';
      }, 500);
    }, 100);
  }

  // Detener animación de carga
  animLoader.destroy();


    modal.show();
  // Iniciar animaciones de portada
 // animFlores1.setSpeed(0.6);
 // animFlores1.play();
  //animFlores2.setSpeed(0.6);
  //animFlores2.play();*/
});



let player;
function onYouTubeIframeAPIReady() {
  player = new YT.Player('reproductor-musica-fondo', {
    height: '0',            // “oculto” (ojo con Términos de Uso)
    width:  '0',
    videoId: '0jyZU84wGa4', // p.ej. 'u3y2y_bXZI0' IwzDYCbehwE
    playerVars: {
      autoplay: 0,
        loop: 1,
        start: 0,
        playlist:'0jyZU84wGa4'
    },
    events: {
       onReady: onPlayerReady
    }
  });
}
/* funcion que se ejecuta cuando se ha terminado de cargar el reproductor */
  function onPlayerReady(event) {
          event.target.setVolume(80);

    /** evento para cuando entras con música */
      document.getElementById('btnConMusica').addEventListener('click',(e)=>
        {
          e.preventDefault();
          document.getElementById('play-pause-music').setAttribute('data-estado-music', 'play');
         try{
            animMusicAnimIcon.play();
            player.playVideo();
           cerrarPortadaBienvenida();
          }catch (err){
            console.error(err);
          }
       
    });
      }

// hacer que pare o no la musica en la img 
 document.getElementById('play-pause-music').addEventListener('click', function  (e) {
    e.preventDefault();

        // Estado actual
          var estadoMusic = this.getAttribute('data-estado-music');

        // Pause music
        if (estadoMusic === 'pause') {
    this.setAttribute('data-estado-music', 'play');
    animMusicAnimIcon.play();
    player.playVideo(); 
  }
        // Play music
        else if (estadoMusic === 'play') {
    this.setAttribute('data-estado-music', 'pause');
    player.pauseVideo();
    animMusicAnimIcon.stop();
  }

});

function pauseVideo() {
        player.pauseVideo();
      }

     

function cerrarPortadaBienvenida(){
//ahora como es modal se hace asi 
modal.hide();
 // overlay.classList.add('hidden');
  //setTimeout(()=>(overlay.style.display='none'),700);


}

//ANIMACIÓN NOTA MUSCIAL
     let svgContainerMusicAnimIcon = document.querySelector('.music-anim-icon');

    let animMusicAnimIcon = bodymovin.loadAnimation({
      container: svgContainerMusicAnimIcon,
      renderer: 'svg',
      autoplay: false,
      loop: true,
    path: "img/iconos/notaMusical.json"

    });     

  //ANIMACION ICONO RECARGAR
      let svgContainerLoader = document.querySelector('.loader');

  let animLoader = bodymovin.loadAnimation({
    container: svgContainerLoader,
    renderer: 'svg',
    loop: true,
    path: "img/iconos/corazon.json"
  });


