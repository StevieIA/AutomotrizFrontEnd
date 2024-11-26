const express = require('express');
const path = require('path');
const app = express();

// Servir los archivos estáticos desde la carpeta 'build'
app.use(express.static(path.join(__dirname, 'build')));

// Redirigir todas las solicitudes al index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Frontend server running on port ${PORT}`);
});
