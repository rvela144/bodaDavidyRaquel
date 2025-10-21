const overlay = document.getElementById("portadaBienvenida");
const musica= document.getElementById("musicaFondo");
const btnConMusica = document.getElementById("btnConMusica");
const btnSinMusica = document.getElementById("btnSinMusica");


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
    console.log("Player listo");
    /** evento para cuando entras con música */
      document.getElementById('btnConMusica').addEventListener('click',(e)=>
        {
          e.preventDefault();
          document.getElementById('play-pause-music').setAttribute('data-estado-music', 'play');
         try{
           // player.unMute();
          //  player.setVolume(80);
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

  overlay.classList.add('hidden');
  setTimeout(()=>(overlay.style.display='none'),700);


}


     let svgContainerMusicAnimIcon = document.querySelector('.music-anim-icon');

    let animMusicAnimIcon = bodymovin.loadAnimation({
      container: svgContainerMusicAnimIcon,
      renderer: 'svg',
      autoplay: false,
      loop: true,
    path: "img/iconos/notaMusical.json"

    });     

