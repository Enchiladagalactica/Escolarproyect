<?php
// Procesador de imágenes para optimización y redimensionamiento

// Verificar si GD está disponible
if (!extension_loaded('gd')) {
    die("La extensión GD de PHP es requerida para el procesamiento de imágenes.");
}

/**
 * Redimensiona y optimiza una imagen
 * 
 * @param string $source_path Ruta de la imagen original
 * @param string $target_path Ruta donde guardar la imagen procesada
 * @param int $max_width Ancho máximo
 * @param int $max_height Alto máximo
 * @param int $quality Calidad de la imagen (0-100)
 * @param bool $crop Si se debe recortar la imagen para ajustarla exactamente
 * @return bool Éxito o fracaso
 */
function process_image($source_path, $target_path, $max_width = 1200, $max_height = 800, $quality = 80, $crop = false) {
    // Obtener información de la imagen
    $image_info = getimagesize($source_path);
    if ($image_info === false) {
        return false;
    }
    
    $width = $image_info[0];
    $height = $image_info[1];
    $mime_type = $image_info['mime'];
    
    // Crear imagen desde el archivo original
    switch ($mime_type) {
        case 'image/jpeg':
            $source_image = imagecreatefromjpeg($source_path);
            break;
        case 'image/png':
            $source_image = imagecreatefrompng($source_path);
            break;
        case 'image/gif':
            $source_image = imagecreatefromgif($source_path);
            break;
        case 'image/webp':
            $source_image = imagecreatefromwebp($source_path);
            break;
        default:
            return false;
    }
    
    if (!$source_image) {
        return false;
    }
    
    // Calcular nuevas dimensiones
    $width_ratio = $max_width / $width;
    $height_ratio = $max_height / $height;
    
    if ($crop) {
        $ratio = max($width_ratio, $height_ratio);
    } else {
        $ratio = min($width_ratio, $height_ratio);
    }
    
    // Si la imagen es más pequeña que las dimensiones máximas, no redimensionar
    if ($width <= $max_width && $height <= $max_height) {
        $new_width = $width;
        $new_height = $height;
    } else {
        $new_width = round($width * $ratio);
        $new_height = round($height * $ratio);
    }
    
    // Crear imagen redimensionada
    $new_image = imagecreatetruecolor($new_width, $new_height);
    
    // Preservar transparencia para PNG y GIF
    if ($mime_type === 'image/png' || $mime_type === 'image/gif') {
        imagecolortransparent($new_image, imagecolorallocatealpha($new_image, 0, 0, 0, 127));
        imagealphablending($new_image, false);
        imagesavealpha($new_image, true);
    }
    
    // Redimensionar
    imagecopyresampled($new_image, $source_image, 0, 0, 0, 0, $new_width, $new_height, $width, $height);
    
    // Guardar imagen
    $result = false;
    switch ($mime_type) {
        case 'image/jpeg':
            $result = imagejpeg($new_image, $target_path, $quality);
            break;
        case 'image/png':
            // Convertir calidad de 0-100 a 0-9 para PNG
            $png_quality = round(9 - (($quality / 100) * 9));
            $result = imagepng($new_image, $target_path, $png_quality);
            break;
        case 'image/gif':
            $result = imagegif($new_image, $target_path);
            break;
        case 'image/webp':
            $result = imagewebp($new_image, $target_path, $quality);
            break;
    }
    
    // Liberar memoria
    imagedestroy($source_image);
    imagedestroy($new_image);
    
    return $result;
}

/**
 * Genera un nombre de archivo único para una imagen
 * 
 * @param string $original_name Nombre original del archivo
 * @param string $prefix Prefijo para el nombre del archivo
 * @return string Nombre de archivo único
 */
function generate_unique_filename($original_name, $prefix = '') {
    $extension = pathinfo($original_name, PATHINFO_EXTENSION);
    $unique_id = uniqid($prefix, true);
    return $unique_id . '.' . $extension;
}

/**
 * Sube y procesa una imagen desde un formulario
 * 
 * @param string $file_input Nombre del campo de archivo en el formulario
 * @param string $upload_dir Directorio donde guardar la imagen
 * @param int $max_width Ancho máximo
 * @param int $max_height Alto máximo
 * @param int $quality Calidad de la imagen (0-100)
 * @param bool $crop Si se debe recortar la imagen para ajustarla exactamente
 * @return string|false Ruta de la imagen procesada o false en caso de error
 */
function upload_and_process_image($file_input, $upload_dir, $max_width = 1200, $max_height = 800, $quality = 80, $crop = false) {
    // Verificar si se subió un archivo
    if (!isset($_FILES[$file_input]) || $_FILES[$file_input]['error'] !== UPLOAD_ERR_OK) {
        return false;
    }
    
    // Verificar si el directorio existe, si no, crearlo
    if (!is_dir($upload_dir)) {
        mkdir($upload_dir, 0755, true);
    }
    
    // Obtener información del archivo
    $temp_file = $_FILES[$file_input]['tmp_name'];
    $original_name = $_FILES[$file_input]['name'];
    
    // Verificar si es una imagen válida
    $image_info = getimagesize($temp_file);
    if ($image_info === false) {
        return false;
    }
    
    // Generar nombre único
    $new_filename = generate_unique_filename($original_name, 'img_');
    $target_path = $upload_dir . '/' . $new_filename;
    
    // Procesar y guardar la imagen
    if (process_image($temp_file, $target_path, $max_width, $max_height, $quality, $crop)) {
        return $target_path;
    }
    
    return false;
}
?>
