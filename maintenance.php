<?php
// Modo de mantenimiento
$maintenance_mode = false;
$allowed_ips = ['127.0.0.1', '::1']; // IPs que pueden acceder durante el mantenimiento

// Verificar si el sitio está en mantenimiento
if ($maintenance_mode) {
    $client_ip = $_SERVER['REMOTE_ADDR'];
    
    // Permitir acceso a IPs específicas
    if (!in_array($client_ip, $allowed_ips)) {
        // Mostrar página de mantenimiento
        header('HTTP/1.1 503 Service Temporarily Unavailable');
        header('Status: 503 Service Temporarily Unavailable');
        header('Retry-After: 3600'); // Sugerir al cliente que intente de nuevo en 1 hora
        
        // Incluir plantilla de mantenimiento
        include 'maintenance_template.php';
        exit;
    }
}
?>
