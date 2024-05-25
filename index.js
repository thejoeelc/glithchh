import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

// Necesario para trabajar con __dirname en ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;

// Middleware para registrar todas las solicitudes
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Middleware para establecer el tipo de contenido según la extensión del archivo
app.use((req, res, next) => {
  const ext = path.extname(req.url);
  let contentType;

  // Configura el tipo de contenido según la extensión del archivo
  switch (ext) {
    case '.m3u8':
      contentType = 'application/vnd.apple.mpegurl';
      break;
    case '.mp4':
      contentType = 'video/mp4';
      break;
    case '.mp4a':
      contentType = 'audio/mp4';
      break;
    default:
      contentType = 'text/plain';
  }

  res.setHeader('Content-Type', contentType);
  next();
});

// Sirve archivos estáticos desde el directorio "public"
app.use(express.static(path.join(__dirname, 'public')));

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
