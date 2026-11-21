// Importamos la librería mysql2 para establecer la conexión con la base de datos
const mysql = require('mysql2');

// Creamos un pool de conexiones para manejar múltiples peticiones de forma eficiente
const pool = mysql.createPool({
    host: 'localhost',          // Servidor local donde corre MySQL
    user: 'root',               // Usuario administrador con el que creaste la BD
    password: '28041703Tm#', // <-- REEMPLAZA ESTO POR TU CONTRASEÑA REAL DE MYSQL
    database: 'sena_api_db',    // Nombre de la base de datos creada en la Etapa 1
    waitForConnections: true,
    connectionLimit: 10
});

// Verificamos en consola que la conexión a MySQL sea exitosa al iniciar el servidor
pool.getConnection((err, connection) => {
    if (err) {
        console.error('Error al conectar con la base de datos MySQL:', err.message);
    } else {
        console.log('Conexión exitosa a la base de datos MySQL (sena_api_db)');
        connection.release(); // Liberamos la conexión de prueba
    }
});

// Exportamos el pool con soporte para promesas (async/await) para usarlo en los controladores
module.exports = pool.promise();