// Importamos el framework Express
const express = require('express');
// Inicializamos la aplicación
const app = express();
// Definimos el puerto de escucha del servidor
const PORT = 3000;

// Importamos las rutas modulares de usuarios
const usuarioRoutes = require('./routes/usuarioRoutes');

// Middleware para interpretar peticiones con cuerpo en formato JSON
app.use(express.json());

// Ruta base de bienvenida para verificar que el servidor responde en el navegador
app.get('/', (req, res) => {
    res.json({ mensaje: "API REST SENA (GA7-220501096-AA5-EV01) funcionando correctamente" });
});

// Conectamos todas las rutas de usuario bajo el prefijo '/api'
app.use('/api', usuarioRoutes);

// Levantamos el servidor en el puerto 3000
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});