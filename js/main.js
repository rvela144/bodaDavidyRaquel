
//variables estaticas
 // Cuenta regresiva
  var fechaCuentaRegresiva =  new Date(2026,9,9,19,0,0);
 // Mapas,
    var latitudFiesta = 39.3793486;
    var longitudFiesta = -0.3393689;
    var latitudCeremonia = 40.7128;
    var longitudCeremonia = -74.0060;
    _pathProducto="../img/iconos/";

    // Links Mapas
    var linkMapsFiesta = "https://google.com/maps/dir/Pl.+Luxemburgo,+1,+46200+Paiporta,+Valencia,+España/CV-401,+Km+6,+46910+Alfafar,+Valencia/@39.3793486,-0.3393689,15z/data=!4m19!4m18!1m10!1m1!1s0xd604ef715050e0b:0xcd1b9fad9597f99f!2m2!1d-0.409398!2d39.4325469!3m4!1m2!1d-0.3409338!2d39.388303!3s0xd604bcc256525d9:0x4c3b7a13a2d1bd22!1m5!1m1!1s0xd604bcfad312e03:0xb7f2531d4f416e3b!2m2!1d-0.3335289!2d39.3744809!3e0!5m2!1e4!1e1?entry=ttu&g_ep=EgoyMDI1MTAyMi4wIKXMDSoASAFQAw%3D%3D";
    var linkMapsCeremonia = "https://google.com/maps/dir/Pl.+Luxemburgo,+1,+46200+Paiporta,+Valencia,+España/CV-401,+Km+6,+46910+Alfafar,+Valencia/@39.3793486,-0.3393689,15z/data=!4m19!4m18!1m10!1m1!1s0xd604ef715050e0b:0xcd1b9fad9597f99f!2m2!1d-0.409398!2d39.4325469!3m4!1m2!1d-0.3409338!2d39.388303!3s0xd604bcc256525d9:0x4c3b7a13a2d1bd22!1m5!1m1!1s0xd604bcfad312e03:0xb7f2531d4f416e3b!2m2!1d-0.3335289!2d39.3744809!3e0!5m2!1e4!1e1?entry=ttu&g_ep=EgoyMDI1MTAyMi4wIKXMDSoASAFQAw%3D%3D";





const overlay = document.getElementById("portadaBienvenida");
const musica= document.getElementById("musicaFondo");
const btnSinMusica = document.getElementById("btnSinMusica");
const modal = new bootstrap.Modal(document.getElementById('portadaBienvenida'),{
  backdrop: 'static', // Previene que el modal se cierre al hacer clic fuera de él
  keyboard: false      // Desactiva el cierre con la tecla Escape
});
const modalMapa = new bootstrap.Modal(document.getElementById('modalMapa'),{
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
    path: _pathProducto+"/corazon.json"
  });
  // Animacion Flores
 
    let svgContainerFlores1 = document.querySelector('.portada-flor-izq-sup');

    let animFlores1 = bodymovin.loadAnimation({
      container: svgContainerFlores1,
      renderer: 'svg',
      autoplay: false,
      loop: false,
      path:_pathProducto+"/img_flores01.json"
    });

    var wpFlores1 = new Waypoint({
      element: document.querySelector('.box-nombres-fecha-portada'),
      handler: function() {
        animFlores1.stop();
        animFlores1.play()
      }
    });



    let svgContainerFlores2 = document.querySelector('.portada-flor-der-inf');

    let animFlores2 = bodymovin.loadAnimation({
      container: svgContainerFlores2,
      renderer: 'svg',
      autoplay: false,
      loop: false,
      path:_pathProducto+"/img_flores02.json"
    });

    var wpFlores2 = new Waypoint({
      element: document.querySelector('.box-nombres-fecha-portada'),
      handler: function() {
        animFlores2.stop();
        animFlores2.play()
      }
    });


    let svgContainerFlores3 = document.querySelector('.portada-flor-izq-inf');

    let animFlores3 = bodymovin.loadAnimation({
      container: svgContainerFlores3,
      renderer: 'svg',
      autoplay: false,
      loop: false,
      path:_pathProducto+"/img_flores03.json"
    });

    var wpFlores3 = new Waypoint({
      element: document.querySelector('.flecha-continuar'),
      handler: function() {
        animFlores3.stop();
        animFlores3.play();

      }
    });


    let svgContainerFlores4 = document.querySelector('.ceremonia-fiesta-flor-der');

    let animFlores4 = bodymovin.loadAnimation({
      container: svgContainerFlores4,
      renderer: 'svg',
      autoplay: false,
      loop: false,
      path: _pathProducto+"/img_flores04.json"
    });

    var wpFlores4 = new Waypoint({
      element: document.querySelector('.info-col'),
      handler: function() {
        animFlores4.stop();
        animFlores4.play();
      }
    });


    let svgContainerFlores5 = document.querySelector('.regalos-flor-der');

    let animFlores5 = bodymovin.loadAnimation({
      container: svgContainerFlores5,
      renderer: 'svg',
      autoplay: false,
      loop: false,
      path: _pathProducto + "/img_flores05.json"
    });

    var wpFlores5 = new Waypoint({
      element: document.querySelector('.anim-musica'),
      handler: function() {
        animFlores5.stop();
        animFlores5.play();
      }
    });

  //ANIMACION FLECHA ABAJO

    let svgContainerFlechaScroll = document.querySelector('.flecha-continuar');

  let animFlechaAbajo = bodymovin.loadAnimation({
    container: svgContainerFlechaScroll,
    renderer: 'svg',
    loop: true,
    path: _pathProducto+"/flechaAbajo.json"
  });

   animFlechaAbajo.setSpeed(0.6);

   /*ANIMACION CUENTA REGRESIVA */
   let svgContainerCorazonFalta = document.querySelector('.corazon-falta');

    let animCorazonFalta = bodymovin.loadAnimation({
      container: svgContainerCorazonFalta,
      renderer: 'svg',
      renderer: true,
      path: _pathProducto+"/corazon-falta.json"
    });

    /*ANIMACION ANILLOS */
      let svgContainerAnillos = document.querySelector('.anim-anillos');

    let animAnillos = bodymovin.loadAnimation({
      container: svgContainerAnillos,
      renderer: 'svg',
      loop: true,
      path:_pathProducto+"/img_anillos.json"
    });

    animAnillos.play();


     /*ANIMACION FIESTA */
      let svgContainerfiesta = document.querySelector('.anim-fiesta');

    let animFiesta = bodymovin.loadAnimation({
      container: svgContainerfiesta,
      renderer: 'svg',
      loop: true,
      path:_pathProducto+"/img_fiesta.json"
    });

    animFiesta.play();


/*ANIMACION MUSICA SELECCION */
    let svgContainerMusica = document.querySelector('.anim-musica');

    let animMusica = bodymovin.loadAnimation({
      container: svgContainerMusica,
      render: 'svg',
      loop: true,
      path: _pathProducto + "/img_canciones.json"
    });

    animMusica.play();

    /* Animacion Vestuario */
    let svgContainerVestuario = document.querySelector('.anim-vestuario');

    let animVestuario = bodymovin.loadAnimation({
      container: svgContainerVestuario,
      render: 'svg',
      loop: true,
      path: _pathProducto + "/vestuario.json"
    });

    animVestuario.play();



 /* Animacion Tips */

    let svgContainerTips = document.querySelector('.anim-tips');

    let animTips = bodymovin.loadAnimation({
      container: svgContainerTips,
      render: 'svg',
      loop: true,
      path: _pathProducto + "/tips.json"
    });

    animTips.play();



/*Animacion Hotel*/
 
    let svgContainerHotel = document.querySelector('.anim-hotel');

    let animHotel = bodymovin.loadAnimation({
      container: svgContainerHotel,
      render: 'svg',
      loop: true,
      path: _pathProducto + "/hotel.json"
    });

    animHotel.play();
  


  /* Animacion Bus */
  
    let svgContainerBus = document.querySelector('.anim-bus');

    let animBus = bodymovin.loadAnimation({
      container: svgContainerBus,
      render: 'svg',
      loop: true,
      path: _pathProducto + "/bus.json"
    });

    animBus.play();
   /* PARALLAX CARATULA */

    if (device == 'mobile' || $(window).width() < 768) {

    // Aceptar webp?
    // TODO:cambiar imagenes 
    if (support_format_webp()) {
      var imageParallax = '/img/fotos/WhatsApp-Image-2025-10-24-at-07.08.21.webp';
    } else {
      var imageParallax = '/img/fotos/imagen1.jpg';
    }

  } else {

    // Aceptar webp?
    if (support_format_webp()) {
      var imageParallax = '/img/fotos/WhatsApp-Image-2025-10-24-at-07.08.20.webp';
    } else {
      var imageParallax = '/img/fotos/imagen2.jpg';
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


document.querySelector("#dias .number").textContent = dias;
document.querySelector("#horas .number").textContent = horas;
document.querySelector("#minutos .number").textContent = minutos;
document.querySelector("#segundos .number").textContent = segundos;
  



      // si termina la cuenta atrás muestro un mensaje
      if (distance < 0) {
        clearInterval(x);
        document.getElementById("reloj").innerHTML = '<p class="fin-cuenta">' +
          lang_textoFinalCuentaRegresiva + '</p>';
        document.querySelector('.falta').textContent= '';
      }
    }, 1000);

//funcion para cerrar mapa 

 document.getElementById('cerrarMapa').addEventListener('click', function  (e) {
  
 modalMapa.hide();
});

$('body').on('click', 'a.modal-como-llegar', function(e) {
  e.preventDefault(); // Evita la acción por defecto del enlace

  var evento = $(this).attr('data-evento');

  var titleModalMapa, mapUrl, linkMaps;

  if (evento == 'Fiesta') {
    titleModalMapa = lang_titleModalMapaFiesta;
    mapUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3084.1982317935444!2d-0.3350416700622172!3d39.374389642361535!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd604bcfad312e03%3A0xb7f2531d4f416e3b!2sMas%C3%ADa%20Santarrita!5e0!3m2!1ses!2ses!4v1761503431217!5m2!1ses!2ses";
    linkMaps = linkMapsFiesta; // enlace para "abrir en Google Maps"
  }

  if (evento == 'Ceremonia') {
    titleModalMapa = lang_titleModalMapaCeremonia;
    mapUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3084.1982317935444!2d-0.3350416700622172!3d39.374389642361535!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd604bcfad312e03%3A0xb7f2531d4f416e3b!2sMas%C3%ADa%20Santarrita!5e0!3m2!1ses!2ses!4v1761503431217!5m2!1ses!2ses";
    linkMaps = linkMapsCeremonia;
  }

  // Cambiar título del modal
  $('#modalMapa .modal-title').text(titleModalMapa);

  // Cambiar enlace del botón "Abrir en Google Maps"
  $('.ampliar-mapa').attr('href', linkMaps);

  // Insertar el iframe del mapa (se adapta al contenedor)
  $('#googleMap').html(`<iframe src="${mapUrl}" width="100%" height="400" style="border:0;" allowfullscreen="" loading="lazy"></iframe>`);

  // Mostrar el modal
  //modalMapa.show();
   $('#modalMapa').modal('show');
});
    /*ajustes ADDEVENT */
     window.addeventasync = function() {
      addeventatc.settings({

        css: false,

        appleical: {
          show: true,
          text: "Apple Calendar"
        },
        google: {
          show: true,
          text: "Google <em>(online)</em>"
        },
        office365: {
          show: true,
          text: "Office 365 <em>(online)</em>"
        },
        outlook: {
          show: true,
          text: "Outlook"
        },
        outlookcom: {
          show: true,
          text: "Outlook.com <em>(online)</em>"
        },
        yahoo: {
          show: true,
          text: "Yahoo <em>(online)</em>"
        },
        facebook: {
          show: true,
          text: "Facebook"
        }
      });
    };

fetch("/api/sugerir_cancion", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    nombre: "pepe",
    titulo: "abracadabra",
    artista: "Rosalia",
    link:"holaaa"
  })
})
.then(r => r.json())
.then(data => {
  if (data.error) { alert(data.desc); return; }
  alert("¡Sugerencia enviada!");
});

