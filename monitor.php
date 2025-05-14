<?php
require_once '../config/config.php';
require_once '../config/db_connect.php';
require_once '../includes/security.php';

// Verificar si el usuario es administrador
require_login();
require_admin();

// Función para obtener estadísticas del sistema
function get_system_stats() {
    global $pdo;
    
    $stats = [];
    
    // Total de usuarios
    $stmt = $pdo->query("SELECT COUNT(*) FROM usuarios");
    $stats['total_usuarios'] = $stmt->fetchColumn();
    
    // Usuarios por tipo
    $stmt = $pdo->query("SELECT tipo, COUNT(*) as total FROM usuarios GROUP BY tipo");
    $stats['usuarios_por_tipo'] = $stmt->fetchAll();
    
    // Total de materias
    $stmt = $pdo->query("SELECT COUNT(*) FROM materias");
    $stats['total_materias'] = $stmt->fetchColumn();
    
    // Total de clubes
    $stmt = $pdo->query("SELECT COUNT(*) FROM clubes");
    $stats['total_clubes'] = $stmt->fetchColumn();
    
    // Usuarios activos hoy
    $stmt = $pdo->query("SELECT COUNT(*) FROM usuarios WHERE DATE(ultimo_acceso) = CURDATE()");
    $stats['usuarios_activos_hoy'] = $stmt->fetchColumn();
    
    // Espacio en disco
    $stats['espacio_disco'] = [
        'total' => disk_total_space('/'),
        'libre' => disk_free_space('/'),
        'usado' => disk_total_space('/') - disk_free_space('/')
    ];
    
    // Carga del servidor
    $load = sys_getloadavg();
    $stats['carga_servidor'] = [
        '1min' => $load[0],
        '5min' => $load[1],
        '15min' => $load[2]
    ];
    
    // Memoria
    if (function_exists('shell_exec')) {
        $free = shell_exec('free -m');
        $mem = preg_split('/\s+/', $free);
        $stats['memoria'] = [
            'total' => $mem[7],
            'usada' => $mem[8],
            'libre' => $mem[9],
            'compartida' =>
