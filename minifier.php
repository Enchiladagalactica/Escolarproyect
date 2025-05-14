<?php
// Minificador de archivos CSS y JavaScript

/**
 * Minifica un archivo CSS
 * 
 * @param string $css Contenido CSS
 * @return string CSS minificado
 */
function minify_css($css) {
    // Eliminar comentarios
    $css = preg_replace('!/\*[^*]*\*+([^/][^*]*\*+)*/!', '', $css);
    
    // Eliminar espacios en blanco
    $css = str_replace(["\r\n", "\r", "\n", "\t", '  ', '    ', '    '], '', $css);
    
    // Eliminar espacios innecesarios
    $css = preg_replace('/ {2,}/', ' ', $css);
    $css = preg_replace('/ ([{:}]) /', '$1', $css);
    $css = preg_replace('/([{:}]) /', '$1', $css);
    $css = preg_replace('/;}/', '}', $css);
    
    return trim($css);
}

/**
 * Minifica un archivo JavaScript
 * 
 * @param string $js Contenido JavaScript
 * @return string JavaScript minificado
 */
function minify_js($js) {
    // Esta es una versión simplificada, para producción se recomienda usar una biblioteca como JShrink
    
    // Eliminar comentarios de una línea
    $js = preg_replace('!//.*!', '', $js);
    
    // Eliminar comentarios multilínea
    $js = preg_replace('!/\*[^*]*\*+([^/][^*]*\*+)*/!', '', $js);
    
    // Eliminar espacios en blanco
    $js = preg_replace('/\s+/', ' ', $js);
    
    // Eliminar espacios antes y después de operadores
    $js = preg_replace('/\s*([=\+\-\*\/$$$$\{\}\[\];:,<>])\s*/', '$1', $js);
    
    return trim($js);
}

/**
 * Minifica y combina archivos CSS
 * 
 * @param array $files Rutas de archivos CSS
 * @param string $output_file Ruta del archivo de salida
 * @return bool Éxito o fracaso
 */
function combine_css_files($files, $output_file) {
    $combined_css = '';
    
    foreach ($files as $file) {
        if (file_exists($file)) {
            $css = file_get_contents($file);
            $combined_css .= minify_css($css) . "\n";
        }
    }
    
    return file_put_contents($output_file, $combined_css) !== false;
}

/**
 * Minifica y combina archivos JavaScript
 * 
 * @param array $files Rutas de archivos JavaScript
 * @param string $output_file Ruta del archivo de salida
 * @return bool Éxito o fracaso
 */
function combine_js_files($files, $output_file) {
    $combined_js = '';
    
    foreach ($files as $file) {
        if (file_exists($file)) {
            $js = file_get_contents($file);
            $combined_js .= minify_js($js) . ";\n";
        }
    }
    
    return file_put_contents($output_file, $combined_js) !== false;
}
?>
