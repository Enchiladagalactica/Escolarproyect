<?php
require_once 'config/config.php';
require_once 'config/db_connect.php';

// Verificar si el formulario fue enviado
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Obtener y sanitizar datos
    $username = sanitize_input($_POST['username']);
    $password = $_POST['password']; // No sanitizar contraseñas
    
    // Validar datos
    $errors = [];
    
    if (empty($username)) {
        $errors[] = "El nombre de usuario es requerido";
    }
    
    if (empty($password)) {
        $errors[] = "La contraseña es requerida";
    }
    
    // Si no hay errores, intentar iniciar sesión
    if (empty($errors)) {
        try {
            // Buscar usuario en la base de datos
            $stmt = $pdo->prepare("SELECT * FROM usuarios WHERE usuario = ? OR email = ?");
            $stmt->execute([$username, $username]);
            $user = $stmt->fetch();
            
            // Verificar si el usuario existe y la contraseña es correcta
            if ($user && password_verify($password, $user['password'])) {
                // Iniciar sesión
                $_SESSION['user_id'] = $user['id'];
                $_SESSION['user_name'] = $user['nombre'] . ' ' . $user['apellidos'];
                $_SESSION['user_type'] = $user['tipo'];
                
                // Actualizar último acceso
                $updateStmt = $pdo->prepare("UPDATE usuarios SET ultimo_acceso = NOW() WHERE id = ?");
                $updateStmt->execute([$user['id']]);
                
                // Redirigir según el tipo de usuario
                if ($user['tipo'] === 'administrador') {
                    redirect('admin/index.php');
                } else {
                    // Redirigir a la página solicitada o a la página principal
                    $redirect = isset($_SESSION['redirect_after_login']) ? $_SESSION['redirect_after_login'] : 'index.php';
                    unset($_SESSION['redirect_after_login']);
                    redirect($redirect);
                }
            } else {
                $errors[] = "Usuario o contraseña incorrectos";
            }
        } catch (PDOException $e) {
            error_log("Error en login: " . $e->getMessage());
            $errors[] = "Error al procesar la solicitud. Por favor, intente nuevamente.";
        }
    }
    
    // Si hay errores, guardarlos en la sesión y redirigir al formulario
    if (!empty($errors)) {
        $_SESSION['login_errors'] = $errors;
        $_SESSION['login_username'] = $username;
        redirect('login.php');
    }
} else {
    // Si no es una solicitud POST, redirigir al formulario
    redirect('login.php');
}
?>
