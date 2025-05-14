<?php
// Sistema de registro de actividad de usuarios

/**
 * Registra una actividad de usuario
 * 
 * @param int $user_id ID del usuario
 * @param string $action Acción realizada
 * @param string $details Detalles adicionales
 * @param string $ip Dirección IP (opcional)
 * @return bool Éxito o fracaso
 */
function log_activity($user_id, $action, $details = '', $ip = null) {
    global $pdo;
    
    if ($ip === null) {
        $ip = $_SERVER['REMOTE_ADDR'];
    }
    
    try {
        $stmt = $pdo->prepare("INSERT INTO actividad_usuarios (usuario_id, accion, detalles, ip) VALUES (?, ?, ?, ?)");
        return $stmt->execute([$user_id, $action, $details, $ip]);
    } catch (PDOException $e) {
        error_log("Error al registrar actividad: " . $e->getMessage());
        return false;
    }
}

/**
 * Obtiene el historial de actividad de un usuario
 * 
 * @param int $user_id ID del usuario
 * @param int $limit Límite de registros a obtener
 * @param int $offset Desplazamiento para paginación
 * @return array Registros de actividad
 */
function get_user_activity($user_id, $limit = 10, $offset = 0) {
    global $pdo;
    
    try {
        $stmt = $pdo->prepare("
            SELECT * FROM actividad_usuarios 
            WHERE usuario_id = ? 
            ORDER BY fecha DESC 
            LIMIT ? OFFSET ?
        ");
        $stmt->execute([$user_id, $limit, $offset]);
        return $stmt->fetchAll();
    } catch (PDOException $e) {
        error_log("Error al obtener actividad: " . $e->getMessage());
        return [];
    }
}

/**
 * Obtiene el historial de actividad de todos los usuarios (para administradores)
 * 
 * @param int $limit Límite de registros a obtener
 * @param int $offset Desplazamiento para paginación
 * @return array Registros de actividad
 */
function get_all_activity($limit = 50, $offset = 0) {
    global $pdo;
    
    try {
        $stmt = $pdo->prepare("
            SELECT a.*, u.nombre, u.apellidos, u.usuario 
            FROM actividad_usuarios a
            JOIN usuarios u ON a.usuario_id = u.id
            ORDER BY a.fecha DESC 
            LIMIT ? OFFSET ?
        ");
        $stmt->execute([$limit, $offset]);
        return $stmt->fetchAll();
    } catch (PDOException $e) {
        error_log("Error al obtener actividad: " . $e->getMessage());
        return [];
    }
}

/**
 * Crea la tabla de actividad si no existe
 */
function create_activity_table() {
    global $pdo;
    
    try {
        $pdo->exec("
            CREATE TABLE IF NOT EXISTS actividad_usuarios (
                id INT AUTO_INCREMENT PRIMARY KEY,
                usuario_id INT NOT NULL,
                accion VARCHAR(100) NOT NULL,
                detalles TEXT,
                ip VARCHAR(45),
                fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
            )
        ");
        return true;
    } catch (PDOException $e) {
        error_log("Error al crear tabla de actividad: " . $e->getMessage());
        return false;
    }
}

// Crear tabla si no existe
create_activity_table();
?>
