
//variables estaticas
 // Cuenta regresiva
  var fechaCuentaRegresiva = "09/10/2026 19:00:00";







const overlay = document.getElementById("portadaBienvenida");
const musica= document.getElementById("musicaFondo");
const btnSinMusica = document.getElementById("btnSinMusica");
const modal = new bootstrap.Modal(document.getElementById('portadaBienvenida'),{
  backdrop: 'static', // Previene que el modal se cierre al hacer clic fuera de él
  keyboard: false      // Desactiva el cierre con la tecla Escape
});

let authenticado = false;
let player;
let device;

if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
  device = 'mobile';
} else {
  device = 'desktop';
}

   /*SOPORTE WEB */

   function support_format_webp() {
    var elem = document.createElement('canvas');

    if (!!(elem.getContext && elem.getContext('2d'))) {
      
      return elem.toDataURL('image/webp').indexOf('data:image/webp') == 0;
    } else {
  
      return false;
    }
  }

/*MÉTODO MOSTRAR ICONO DE CARGA */

window.addEventListener('load', function () {
  var preloader = document.querySelector('.loader');
  var preloaderArea = document.querySelector('.cargarIcono');
 if(!player){
  onYouTubeIframeAPIReady();
 }
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
authenticado=sessionStorage.getItem('authenticated');
 if (!authenticado) {
      // Si no está autenticado, redirige al login.html
      window.location.href = '/login/login.html';
   }else{
    modal.show()
   }

  // Iniciar animaciones de portada
 // animFlores1.setSpeed(0.6);
 // animFlores1.play();
  //animFlores2.setSpeed(0.6);
  //animFlores2.play();*/
});



function onYouTubeIframeAPIReady() {
  if(!player){
  player = new YT.Player('reproductor-musica-fondo', {
    height: '0',            // “oculto” (ojo con Términos de Uso)
    width:  '0',
    videoId: '12CEAlpGVXM', // p.ej. 'u3y2y_bXZI0' IwzDYCbehwE
    playerVars: {
      autoplay: 0,
        loop: 1,
        start: 0,
        playlist:'12CEAlpGVXM'
    },
    events: {
       onReady: onPlayerReady
    }
  });
}
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
/*accion boton sin musica */


       document.getElementById('btnSinMusica').addEventListener('click',(e)=>
        {
         cerrarPortadaBienvenida();
       
    });

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
  //ANIMACION FLECHA ABAJO

    let svgContainerFlechaScroll = document.querySelector('.flecha-continuar');

  let animFlechaAbajo = bodymovin.loadAnimation({
    container: svgContainerFlechaScroll,
    renderer: 'svg',
    loop: true,
    path: "img/iconos/flechaAbajo.json"
  });

   animFlechaAbajo.setSpeed(0.6);

   /* PARALLAX CARATULA */

    if (device == 'mobile' || $(window).width() < 768) {

    // Aceptar webp?
    // TODO:cambiar imagenes 
    if (support_format_webp()) {
      var imageParallax = '../img/fotos/WhatsApp-Image-2025-10-24-at-07.08.21.webp';
    } else {
      var imageParallax = '../img/fotos/imagen1.jpg';
    }

  } else {

    // Aceptar webp?
    if (support_format_webp()) {
      var imageParallax = '../img/fotos/WhatsApp-Image-2025-10-24-at-07.08.20.webp';
    } else {
      var imageParallax = '../img/fotos/imagen2.jpg';
    }

  }

  $('.portada').parallax({
    imageSrc:imageParallax
  });




    let countDownDate = new Date(fechaCuentaRegresiva).getTime();

    //actualizar contador cada 1 segundo
    let x = setInterval(function() {

      // fecha y hora actuales
      let now = new Date().getTime();

      // distancia fecha actual a fecha objetivo
      let distance = countDownDate - now;

      // calcular el tiempo para saber dia,horas,minutos  y segundos
      let dias = Math.floor(distance / (1000 * 60 * 60 * 24));
      let horas = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      let minutos = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      let segundos = Math.floor((distance % (1000 * 60)) / 1000);


   document.getElementById("dias").textContent=dias;
   document.getElementById("horas").textContent=horas;
   document.getElementById("minutos").textContent=minutos;
   document.getElementById("segundos").textContent=segundos;
  



      // si termina la cuenta atrás muestro un mensaje
      if (distance < 0) {
        clearInterval(x);
        document.getElementById("reloj").innerHTML = '<p class="fin-cuenta">' +
          lang_textoFinalCuentaRegresiva + '</p>';
        document.querySelector('.falta').textContent= '';
      }
    }, 1000);

