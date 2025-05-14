<?php
// Configuración de la base de datos
$host = 'localhost';
$dbname = 'cbtis29_db';
$username = 'cbtis29_user';
$password = 'your_secure_password'; // Cambiar en producción

// Opciones de PDO para manejo de errores
$options = [
    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    PDO::ATTR_EMULATE_PREPARES => false,
];

try {
    // Crear conexión PDO
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8mb4", $username, $password, $options);
    
    // Opcional: establecer la conexión como variable global
    $GLOBALS['db'] = $pdo;
    
    return $pdo;
} catch (PDOException $e) {
    // Manejo de errores
    error_log("Error de conexión a la base de datos: " . $e->getMessage());
    
    // En producción, no mostrar detalles del error
    die("Error de conexión a la base de datos. Por favor, contacte al administrador.");
}
?>
