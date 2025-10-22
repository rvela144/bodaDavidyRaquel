  // Obtenemos el formulario, el input de contraseña y el mensaje de error
  const loginForm = document.getElementById('loginForm');
  const passwordStatic="boda1234";
  const passwordInput = document.getElementById('password');
  const errorMessage = document.getElementById('errorMessage');

  // Añadimos un event listener al formulario para interceptar el submit
  loginForm.addEventListener('submit', function (e) {
    e.preventDefault(); // Evita que el formulario se envíe de manera convencional

    const enteredPassword = passwordInput.value; // Obtenemos la contraseña introducida por el usuario

    // Comprobamos si la contraseña es correcta
    if (enteredPassword === passwordStatic) {
      // Si la contraseña es correcta, almacenamos la contraseña en sessionStorage
      sessionStorage.setItem('authenticated', 'true');
      
      // Redirigimos a la página principal (puedes poner la URL que desees)
      window.location.href = '../index.html';
    } else {
      // Si la contraseña es incorrecta, mostramos el mensaje de error
      errorMessage.classList.remove('d-none');
      errorMessage.textContent = 'Contraseña incorrecta.';
    }
  });