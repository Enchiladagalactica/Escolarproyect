<?php
// Sistema de caché para mejorar el rendimiento

class Cache {
    private $cache_dir;
    private $cache_time;
    
    /**
     * Constructor
     * 
     * @param string $cache_dir Directorio para almacenar archivos de caché
     * @param int $cache_time Tiempo de vida de la caché en segundos (por defecto 1 hora)
     */
    public function __construct($cache_dir = 'cache', $cache_time = 3600) {
        $this->cache_dir = rtrim($cache_dir, '/');
        $this->cache_time = $cache_time;
        
        // Crear directorio de caché si no existe
        if (!is_dir($this->cache_dir)) {
            mkdir($this->cache_dir, 0755, true);
        }
    }
    
    /**
     * Genera una clave única para el archivo de caché
     * 
     * @param string $key Clave base
     * @return string Clave de caché
     */
    private function getCacheKey($key) {
        return md5($key);
    }
    
    /**
     * Obtiene la ruta completa del archivo de caché
     * 
     * @param string $key Clave de caché
     * @return string Ruta del archivo
     */
    private function getCacheFile($key) {
        $cache_key = $this->getCacheKey($key);
        return $this->cache_dir . '/' . $cache_key . '.cache';
    }
    
    /**
     * Verifica si existe un archivo de caché válido
     * 
     * @param string $key Clave de caché
     * @return bool Si existe o no
     */
    public function exists($key) {
        $cache_file = $this->getCacheFile($key);
        
        if (!file_exists($cache_file)) {
            return false;
        }
        
        $modified = filemtime($cache_file);
        
        if ((time() - $modified) > $this->cache_time) {
            $this->delete($key);
            return false;
        }
        
        return true;
    }
    
    /**
     * Guarda datos en la caché
     * 
     * @param string $key Clave de caché
     * @param mixed $data Datos a guardar
     * @return bool Éxito o fracaso
     */
    public function set($key, $data) {
        $cache_file = $this->getCacheFile($key);
        $serialized_data = serialize($data);
        
        return file_put_contents($cache_file, $serialized_data) !== false;
    }
    
    /**
     * Obtiene datos de la caché
     * 
     * @param string $key Clave de caché
     * @return mixed|null Datos o null si no existe
     */
    public function get($key) {
        if (!$this->exists($key)) {
            return null;
        }
        
        $cache_file = $this->getCacheFile($key);
        $serialized_data = file_get_contents($cache_file);
        
        if ($serialized_data === false) {
            return null;
        }
        
        return unserialize($serialized_data);
    }
    
    /**
     * Elimina un archivo de caché
     * 
     * @param string $key Clave de caché
     * @return bool Éxito o fracaso
     */
    public function delete($key) {
        $cache_file = $this->getCacheFile($key);
        
        if (file_exists($cache_file)) {
            return unlink($cache_file);
        }
        
        return true;
    }
    
    /**
     * Limpia todos los archivos de caché
     * 
     * @return bool Éxito o fracaso
     */
    public function clear() {
        $files = glob($this->cache_dir . '/*.cache');
        
        if ($files === false) {
            return false;
        }
        
        foreach ($files as $file) {
            if (is_file($file)) {
                unlink($file);
            }
        }
        
        return true;
    }
    
    /**
     * Obtiene datos de la caché o ejecuta una función si no existe
     * 
     * @param string $key Clave de caché
     * @param callable $callback Función a ejecutar si no hay caché
     * @return mixed Datos de la caché o resultado de la función
     */
    public function remember($key, $callback) {
        if ($this->exists($key)) {
            return $this->get($key);
        }
        
        $data = $callback();
        $this->set($key, $data);
        
        return $data;
    }
}

// Crear instancia global de caché
$cache = new Cache(ROOT_PATH . '/cache');
?>
