export default function handler(req, res) {
  if (req.method === 'POST') {
    const { password } = req.body;
    
    // Obtenemos la contraseña de las Variables de Entorno (Vercel Secrets)
    const correctPassword = process.env.MY_SECRET_PASSWORD;

    if (password === correctPassword) {
      // Si la contraseña es correcta, devolvemos un estado de éxito
      res.status(200).json({ success: true });
    } else {
      // Si la contraseña es incorrecta, devolvemos un estado de error
      res.status(401).json({ success: false, message: 'Contraseña incorrecta.' });
    }
  } else {
    res.status(405).json({ success: false, message: 'Método no permitido' });
  }
}

const loginForm = document.getElementById('loginForm');
const passwordInput = document.getElementById('password');
const errorMessage = document.getElementById('errorMessage');

loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const password = passwordInput.value;

  try {
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ password }),
    });

    const data = await response.json();

    if (data.success) {
      // Si la contraseña es correcta, redirige a index.html
      window.location.href = 'index.html';
    } else {
      // Si la contraseña es incorrecta, muestra el mensaje de error
      errorMessage.classList.remove('d-none');
      errorMessage.textContent = data.message || 'Contraseña incorrecta.';
    }
  } catch (error) {
    console.error('Error al verificar la contraseña:', error);
    errorMessage.classList.remove('d-none');
    errorMessage.textContent = 'Hubo un error al verificar la contraseña.';
  }
});