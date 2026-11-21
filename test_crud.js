// test_crud.js - Validación completa de los endpoints CRUD y Autenticación contra MySQL

const BASE_URL = "http://localhost:3000/api";

async function ejecutarPruebasCompletas() {
    console.log("==================================================");
    console.log("   INICIANDO PRUEBAS DE API REST + MYSQL (SENA)   ");
    console.log("==================================================\n");

    // 1. CREATE (POST /api/registro) - Registrar un nuevo aprendiz en MySQL
    console.log("1. [POST /registro] Registrando nuevo usuario...");
    const resRegistro = await fetch(`${BASE_URL}/registro`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ usuario: "aprendizADSO", contrasenia: "clave123" })
    });
    const dataRegistro = await resRegistro.json();
    console.log(`   Estado HTTP: ${resRegistro.status} | Respuesta:`, dataRegistro, "\n");

    const nuevoId = dataRegistro.id; // Guardamos el ID generado en MySQL para actualizarlo y borrarlo luego

    // 2. AUTH EXITOSO (POST /api/login) - Iniciar sesión con credenciales válidas
    console.log("2. [POST /login] Probando autenticación satisfactoria...");
    const resLoginOk = await fetch(`${BASE_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ usuario: "aprendizADSO", contrasenia: "clave123" })
    });
    console.log(`   Estado HTTP: ${resLoginOk.status} | Respuesta:`, await resLoginOk.json(), "\n");

    // 3. AUTH FALLIDO (POST /api/login) - Iniciar sesión con contraseña incorrecta
    console.log("3. [POST /login] Probando error en la autenticación...");
    const resLoginError = await fetch(`${BASE_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ usuario: "aprendizADSO", contrasenia: "claveMala" })
    });
    console.log(`   Estado HTTP: ${resLoginError.status} | Respuesta:`, await resLoginError.json(), "\n");

    // 4. READ (GET /api/usuarios) - Listar todos los usuarios almacenados en MySQL
    console.log("4. [GET /usuarios] Listando usuarios desde MySQL...");
    const resListar = await fetch(`${BASE_URL}/usuarios`);
    console.log(`   Estado HTTP: ${resListar.status} | Respuesta:`, await resListar.json(), "\n");

    // 5. UPDATE (PUT /api/usuarios/:id) - Actualizar el usuario recién creado
    if (nuevoId) {
        console.log(`5. [PUT /usuarios/${nuevoId}] Actualizando usuario en MySQL...`);
        const resActualizar = await fetch(`${BASE_URL}/usuarios/${nuevoId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ usuario: "aprendizADSO_Editado", contrasenia: "nuevaClave999" })
        });
        console.log(`   Estado HTTP: ${resActualizar.status} | Respuesta:`, await resActualizar.json(), "\n");

        // 6. DELETE (DELETE /api/usuarios/:id) - Eliminar el usuario de prueba de MySQL
        console.log(`6. [DELETE /usuarios/${nuevoId}] Eliminando usuario de prueba...`);
        const resEliminar = await fetch(`${BASE_URL}/usuarios/${nuevoId}`, {
            method: "DELETE"
        });
        console.log(`   Estado HTTP: ${resEliminar.status} | Respuesta:`, await resEliminar.json(), "\n");
    }

    console.log("==================================================");
    console.log("   PRUEBAS FINALIZADAS EXITOSAMENTE               ");
    console.log("==================================================");
}

ejecutarPruebasCompletas();