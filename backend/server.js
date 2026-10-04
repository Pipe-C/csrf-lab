const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const app = express();
const PORT = 4000;

// Configuración de CORS dinámico para entorno de laboratorio
app.use(cors({
  origin: true, // Refleja dinámicamente el origen de la petición
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());

let userSession = {
  id: "user_session_998877",
  email: "usuario@dominio.com",
  csrfToken: "csrf_token_secret_xyz987654321"
};

app.use((req, res, next) => {
  if (!req.cookies.session_id) {
    res.cookie('session_id', userSession.id, {
      httpOnly: true,
      sameSite: 'lax',
      secure: false
    });
  }
  next();
});

app.get('/api/user', (req, res) => {
  res.json({ email: userSession.email });
});

app.get('/api/csrf-token', (req, res) => {
  res.json({ csrfToken: userSession.csrfToken });
});

// Endpoint Vulnerable a CSRF
app.post('/api/change-email-vulnerable', (req, res) => {
  const { email } = req.body;
  if (!req.cookies.session_id) {
    return res.status(401).json({ error: "No autenticado" });
  }

  userSession.email = email;
  console.log(`[VULNERABLE] Correo actualizado a: ${email}`);
  return res.json({ success: true, message: "Correo actualizado exitosamente (Vulnerable)", email });
});

// Endpoint Seguro con Token Anti-CSRF
app.post('/api/change-email-secure', (req, res) => {
  const { email } = req.body;
  const clientCsrfToken = req.headers['x-csrf-token'];

  if (!req.cookies.session_id) {
    return res.status(401).json({ error: "No autenticado" });
  }

  if (!clientCsrfToken || clientCsrfToken !== userSession.csrfToken) {
    console.warn(`[BLOQUEADO] CSRF detectado. Token recibido: ${clientCsrfToken}`);
    return res.status(403).json({ 
      error: "Acceso Denegado (HTTP 403): Token Anti-CSRF inválido o ausente." 
    });
  }

  userSession.email = email;
  console.log(`[SEGURO] Correo actualizado a: ${email}`);
  return res.json({ success: true, message: "Correo actualizado con verificación Anti-CSRF", email });
});

app.listen(PORT, () => {
  console.log(`Servidor Backend corriendo en http://localhost:${PORT}`);
});