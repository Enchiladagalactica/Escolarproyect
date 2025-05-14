<?php
// Configuración de seguridad para el sitio

// Establecer encabezados de seguridad
header("X-XSS-Protection: 1; mode=block");
header("X-Content-Type-Options: nosniff");
header("X-Frame-Options: SAMEORIGIN");
header("Referrer-Policy: strict-origin-when-cross-origin");
header("Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline' https://cdnjs.cloudflare.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com https://cdnjs.cloudflare.com; img-src 'self' data: https://via.placeholder.com; connect-src 'self'");

// Función para generar token CSRF
function generate_csrf_token() {
    if (!isset($_SESSION['csrf_token'])) {
        $_SESSION['csrf_token'] = bin2hex(random_bytes(32));
    }
    return $_SESSION['csrf_token'];
}

// Función para verificar token CSRF
function verify_csrf_token($token) {
    if (!isset($_SESSION['csrf_token']) || $token !== $_SESSION['csrf_token']) {
        die("Error de validación CSRF. Por favor, intente nuevamente.");
    }
    return true;
}

// Función para verificar la fuerza de la contraseña
function is_password_strong($password) {
    // Debe tener al menos 8 caracteres
    if (strlen($password) < 8) {
        return false;
    }
    
    // Debe contener al menos una letra mayúscula
    if (!preg_match('/[A-Z]/', $password)) {
        return false;
    }
    
    // Debe contener al menos una letra minúscula
    if (!preg_match('/[a-z]/', $password)) {
        return false;
    }
    
    // Debe contener al menos un número
    if (!preg_match('/[0-9]/', $password)) {
        return false;
    }
    
    // Debe contener al menos un carácter especial
    if (!preg_match('/[^A-Za-z0-9]/', $password)) {
        return false;
    }
    
    return true;
}

// Función para prevenir ataques de fuerza bruta
function check_login_attempts($username) {
    // Implementar lógica para limitar intentos de inicio de sesión
    // Por ejemplo, usando una tabla en la base de datos para rastrear intentos
    return true; // Implementar lógica real en producción
}

// Función para registrar actividad sospechosa
function log_suspicious_activity($type, $details) {
    $log_file = ROOT_PATH . '/logs/security.log';
    $timestamp = date('Y-m-d H:i:s');
    $ip = $_SERVER['REMOTE_ADDR'];
    $user_agent = $_SERVER['HTTP_USER_AGENT'];
    $user_id = isset($_SESSION['user_id']) ? $_SESSION['user_id'] : 'guest';
    
    $log_entry = "[$timestamp] [$ip] [$user_id] [$type] [$user_agent] $details\n";
    
    file_put_contents($log_file, $log_entry, FILE_APPEND);
}
?>
