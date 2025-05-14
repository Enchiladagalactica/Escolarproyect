<?php
// Script de despliegue automático
// Este archivo debe estar protegido con autenticación o token secreto

// Configuración
$repo_dir = '/var/www/cbtis29';
$web_root = '/var/www/html';
$git_bin = '/usr/bin/git';
$branch = 'main';
$log_file = '/var/log/deploy.log';

// Función para registrar mensajes
function log_message($message) {
    global $log_file;
    $timestamp = date('Y-m-d H:i:s');
    file_put_contents($log_file, "[$timestamp] $message\n", FILE_APPEND);
}

// Verificar token de seguridad
$secret_token = 'your_secret_token_here'; // Cambiar en producción
$headers = getallheaders();
$provided_token = isset($headers['X-Deploy-Token']) ? $headers['X-Deploy-Token'] : '';

if ($provided_token !== $secret_token) {
    log_message("Error: Token inválido");
    http_response_code(403);
    die("Acceso denegado");
}

// Registrar inicio del despliegue
log_message("Iniciando despliegue");

// Actualizar repositorio
log_message("Actualizando repositorio");
$output = [];
$return_var = 0;
exec("cd $repo_dir && $git_bin pull origin $branch 2>&1", $output, $return_var);

if ($return_var !== 0) {
    log_message("Error al actualizar repositorio: " . implode("\n", $output));
    http_response_code(500);
    die("Error al actualizar repositorio");
}

log_message("Repositorio actualizado: " . implode("\n", $output));

// Copiar archivos al directorio web
log_message("Copiando archivos al directorio web");
exec("rsync -av --delete $repo_dir/ $web_root/ --exclude='.git' --exclude='deploy.php' 2>&1", $output, $return_var);

if ($return_var !== 0) {
    log_message("Error al copiar archivos: " . implode("\n", $output));
    http_response_code(500);
    die("Error al copiar archivos");
}

log_message("Archivos copiados: " . implode("\n", $output));

// Actualizar permisos
log_message("Actualizando permisos");
exec("find $web_root -type d -exec chmod 755 {} \\;", $output, $return_var);
exec("find $web_root -type f -exec chmod 644 {} \\;", $output, $return_var);

// Limpiar caché
log_message("Limpiando caché");
if (is_dir("$web_root/cache")) {
    exec("rm -rf $web_root/cache/*", $output, $return_var);
}

// Registrar finalización del despliegue
log_message("Despliegue completado con éxito");

// Responder con éxito
echo "Despliegue completado con éxito";
?>
