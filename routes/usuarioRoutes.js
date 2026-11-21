// Importamos Express y creamos un enrutador modular
const express = require('express');
const router = express.Router();

// Importamos las funciones del controlador de usuarios
const {
    registrarUsuario,
    iniciarSesion,
    obtenerUsuarios,
    actualizarUsuario,
    eliminarUsuario
} = require('../controllers/usuarioController');

// Definición de endpoints RESTful para el CRUD y la Autenticación:
router.post('/registro', registrarUsuario);        // Crear usuario (POST /api/registro)
router.post('/login', iniciarSesion);              // Iniciar sesión (POST /api/login)
router.get('/usuarios', obtenerUsuarios);          // Listar usuarios (GET /api/usuarios)
router.put('/usuarios/:id', actualizarUsuario);    // Actualizar usuario por ID (PUT /api/usuarios/1)
router.delete('/usuarios/:id', eliminarUsuario);   // Eliminar usuario por ID (DELETE /api/usuarios/1)

// Exportamos el enrutador para usarlo en index.js
module.exports = router;