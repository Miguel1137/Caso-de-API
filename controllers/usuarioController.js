// Importamos la conexión a la base de datos configurada en config/db.js
const db = require('../config/db');

/**
 * 1. REGISTRO DE USUARIO (CREATE - POST)
 * Inserta un nuevo usuario y contraseña en la tabla 'usuario' de MySQL.
 */
const registrarUsuario = async (req, res) => {
    const { usuario, contrasenia } = req.body;

    // Validamos que el cliente envíe ambos datos obligatorios
    if (!usuario || !contrasenia) {
        return res.status(400).json({ error: "Debe enviar un usuario y una contraseña" });
    }

    try {
        // Ejecutamos la consulta SQL parametrizada (?) para evitar inyección SQL
        const [resultado] = await db.query(
            'INSERT INTO usuario (usuario, contrasenia) VALUES (?, ?)',
            [usuario, contrasenia]
        );

        // Retornamos estado 201 (Created) con el ID generado en MySQL
        res.status(201).json({
            mensaje: "Usuario registrado correctamente",
            id: resultado.insertId
        });
    } catch (error) {
        // Si el usuario ya existe (restricción UNIQUE en MySQL), devolvemos error 400
        if (error.code === 'ER_DUP_ENTRY') {
            return res.status(400).json({ error: "El nombre de usuario ya está registrado" });
        }
        // Cualquier otro fallo interno devuelve estado 500 (Internal Server Error)
        res.status(500).json({ error: "Error en el servidor al registrar usuario", detalle: error.message });
    }
};

/**
 * 2. INICIO DE SESIÓN / AUTENTICACIÓN (POST)
 * Verifica si las credenciales coinciden con un registro en la base de datos.
 */
const iniciarSesion = async (req, res) => {
    const { usuario, contrasenia } = req.body;

    if (!usuario || !contrasenia) {
        return res.status(400).json({ error: "Debe ingresar usuario y contraseña" });
    }

    try {
        // Consultamos en MySQL si existe un registro con ese usuario y contraseña exactos
        const [filas] = await db.query(
            'SELECT * FROM usuario WHERE usuario = ? AND contrasenia = ?',
            [usuario, contrasenia]
        );

        // Evaluamos si la consulta encontró coincidencia
        if (filas.length > 0) {
            // Autenticación correcta (Estado 200 OK)
            res.status(200).json({
                mensaje: "Autenticación satisfactoria",
                usuario: filas[0].usuario
            });
        } else {
            // Credenciales inválidas (Estado 401 Unauthorized)
            res.status(401).json({ error: "Error en la autenticación" });
        }
    } catch (error) {
        res.status(500).json({ error: "Error en el servidor durante el login", detalle: error.message });
    }
};

/**
 * 3. LISTAR USUARIOS (READ - GET)
 * Obtiene todos los usuarios registrados en la base de datos.
 */
const obtenerUsuarios = async (req, res) => {
    try {
        // Seleccionamos id y usuario (por buena práctica evitamos listar contraseñas)
        const [filas] = await db.query('SELECT id, usuario FROM usuario');
        res.status(200).json(filas);
    } catch (error) {
        res.status(500).json({ error: "Error al consultar los usuarios", detalle: error.message });
    }
};

/**
 * 4. ACTUALIZAR USUARIO (UPDATE - PUT)
 * Modifica los datos de un usuario existente según su ID en la URL.
 */
const actualizarUsuario = async (req, res) => {
    const { id } = req.params; // Capturamos el ID enviado en la ruta (/api/usuarios/:id)
    const { usuario, contrasenia } = req.body;

    if (!usuario || !contrasenia) {
        return res.status(400).json({ error: "Debe enviar el nuevo usuario y contraseña" });
    }

    try {
        const [resultado] = await db.query(
            'UPDATE usuario SET usuario = ?, contrasenia = ? WHERE id = ?',
            [usuario, contrasenia, id]
        );

        // Si affectedRows es 0, significa que ese ID no existe en la tabla (Estado 404 Not Found)
        if (resultado.affectedRows === 0) {
            return res.status(404).json({ error: "Usuario no encontrado para actualizar" });
        }

        res.status(200).json({ mensaje: "Usuario actualizado correctamente" });
    } catch (error) {
        res.status(500).json({ error: "Error al actualizar el usuario", detalle: error.message });
    }
};

/**
 * 5. ELIMINAR USUARIO (DELETE - DELETE)
 * Elimina un registro de la tabla según su ID.
 */
const eliminarUsuario = async (req, res) => {
    const { id } = req.params;

    try {
        const [resultado] = await db.query('DELETE FROM usuario WHERE id = ?', [id]);

        if (resultado.affectedRows === 0) {
            return res.status(404).json({ error: "Usuario no encontrado para eliminar" });
        }

        res.status(200).json({ mensaje: "Usuario eliminado correctamente" });
    } catch (error) {
        res.status(500).json({ error: "Error al eliminar el usuario", detalle: error.message });
    }
};

// Exportamos todas las funciones para conectarlas en el archivo de rutas
module.exports = {
    registrarUsuario,
    iniciarSesion,
    obtenerUsuarios,
    actualizarUsuario,
    eliminarUsuario
};