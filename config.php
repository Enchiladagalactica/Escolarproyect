<?php
// Configuración general del sitio
define('SITE_NAME', 'CBTIS No. 29');
define('SITE_URL', 'https://www.cbtis29.edu.mx');
define('ADMIN_EMAIL', 'admin@cbtis29.edu.mx');

// Configuración de rutas
define('ROOT_PATH', dirname(__DIR__));
define('INCLUDES_PATH', ROOT_PATH . '/includes');
define('UPLOADS_PATH', ROOT_PATH . '/uploads');
define('TEMPLATES_PATH', ROOT_PATH . '/templates');

// Configuración de sesión
ini_set('session.cookie_httponly', 1);
ini_set('session.use_only_cookies', 1);
ini_set('session.cookie_secure', 1); // Solo para HTTPS

// Configuración de zona horaria
date_default_timezone_set('America/Mexico_City');

// Configuración de errores (cambiar en producción)
ini_set('display_errors', 0);
ini_set('log_errors', 1);
ini_set('error_log', ROOT_PATH . '/logs/error.log');

// Funciones de utilidad
function sanitize_input($data) {
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
}

function redirect($url) {
    header("Location: $url");
    exit;
}

function is_logged_in() {
    return isset($_SESSION['user_id']);
}

function require_login() {
    if (!is_logged_in()) {
        $_SESSION['redirect_after_login'] = $_SERVER['REQUEST_URI'];
        redirect('login.php');
    }
}

function get_current_user() {
    if (is_logged_in()) {
        global $pdo;
        $stmt = $pdo->prepare("SELECT * FROM usuarios WHERE id = ?");
        $stmt->execute([$_SESSION['user_id']]);
        return $stmt->fetch();
    }
    return null;
}

function is_admin() {
    $user = get_current_user();
    return $user && $user['tipo'] === 'administrador';
}

function require_admin() {
    if (!is_admin()) {
        redirect('index.php');
    }
}

// Iniciar sesión
session_start();
?>
