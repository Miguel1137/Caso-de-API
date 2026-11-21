-- Script de creación de base de datos y tabla para la evidencia GA7-220501096-AA5-EV01

-- 1. Crear la base de datos si no existe
CREATE DATABASE IF NOT EXISTS sena_api_db;

-- 2. Seleccionar la base de datos
USE sena_api_db;

-- 3. Crear la tabla 'usuario' para gestionar el registro y la autenticación
CREATE TABLE IF NOT EXISTS usuario (
    id INT AUTO_INCREMENT PRIMARY KEY,
    usuario VARCHAR(50) NOT NULL UNIQUE,
    contrasenia VARCHAR(100) NOT NULL
);

-- 4. Insertar un usuario inicial de prueba
INSERT INTO usuario (usuario, contrasenia) VALUES ('adminSena', '12345');

-- 5. Verificar los registros almacenados
SELECT * FROM usuario;