<?php
require_once 'config/config.php';
require_once 'config/db_connect.php';

// Verificar si el formulario fue enviado
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Obtener y sanitizar datos
    $nombre = sanitize_input($_POST['nombre']);
    $apellidos = sanitize_input($_POST['apellidos']);
    $usuario = sanitize_input($_POST['usuario']);
    $email = sanitize_input($_POST['email']);
    $password = $_POST['password']; // No sanitizar contraseñas
    $confirm_password = $_POST['confirm_password']; // No sanitizar contraseñas
    
    // Validar datos
    $errors = [];
    
    if (empty($nombre)) {
        $errors[] = "El nombre es requerido";
    }
    
    if (empty($apellidos)) {
        $errors[] = "Los apellidos son requeridos";
    }
    
    if (empty($usuario)) {
        $errors[] = "El nombre de usuario es requerido";
    } elseif (!preg_match('/^[a-zA-Z0-9._-]+$/', $usuario)) {
        $errors[] = "El nombre de usuario solo puede contener letras, números, puntos, guiones y guiones bajos";
    }
    
    if (empty($email)) {
        $errors[] = "El correo electrónico es requerido";
    } elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $errors[] = "El correo electrónico no es válido";
    }
    
    if (empty($password)) {
        $errors[] = "La contraseña es requerida";
    } elseif (strlen($password) < 8) {
        $errors[] = "La contraseña debe tener al menos 8 caracteres";
    }
    
    if ($password !== $confirm_password) {
        $errors[] = "Las contraseñas no coinciden";
    }
    
    // Verificar si el usuario o email ya existen
    if (empty($errors)) {
        try {
            $stmt = $pdo->prepare("SELECT COUNT(*) FROM usuarios WHERE usuario = ? OR email = ?");
            $stmt->execute([$usuario, $email]);
            $count = $stmt->fetchColumn();
            
            if ($count > 0) {
                $errors[] = "El nombre de usuario o correo electrónico ya está en uso";
            }
        } catch (PDOException $e) {
            error_log("Error al verificar usuario: " . $e->getMessage());
            $errors[] = "Error al procesar la solicitud. Por favor, intente nuevamente.";
        }
    }
    
    // Si no hay errores, registrar al usuario
    if (empty($errors)) {
        try {
            // Encriptar contraseña
            $hashed_password = password_hash($password, PASSWORD_DEFAULT);
            
            // Insertar usuario
            $stmt = $pdo->prepare("INSERT INTO usuarios (nombre, apellidos, usuario, email, password, tipo) VALUES (?, ?, ?, ?, ?, 'alumno')");
            $stmt->execute([$nombre, $apellidos, $usuario, $email, $hashed_password]);
            
            // Redirigir a la página de inicio de sesión con mensaje de éxito
            $_SESSION['register_success'] = "Registro exitoso. Ahora puedes iniciar sesión.";
            redirect('login.php');
        } catch (PDOException $e) {
            error_log("Error al registrar usuario: " . $e->getMessage());
            $errors[] = "Error al procesar la solicitud. Por favor, intente nuevamente.";
        }
    }
    
    // Si hay errores, guardarlos en la sesión y redirigir al formulario
    if (!empty($errors)) {
        $_SESSION['register_errors'] = $errors;
        $_SESSION['register_data'] = [
            'nombre' => $nombre,
            'apellidos' => $apellidos,
            'usuario' => $usuario,
            'email' => $email
        ];
        redirect('register.php');
    }
} else {
    // Si no es una solicitud POST, redirigir al formulario
    redirect('register.php');
}
?>
