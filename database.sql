-- Crear la base de datos
CREATE DATABASE IF NOT EXISTS cbtis29_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE cbtis29_db;

-- Tabla de usuarios
CREATE TABLE IF NOT EXISTS usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    apellidos VARCHAR(100) NOT NULL,
    usuario VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    tipo ENUM('alumno', 'profesor', 'administrador') NOT NULL,
    grado INT,
    grupo VARCHAR(5),
    especialidad VARCHAR(50),
    foto VARCHAR(255),
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ultimo_acceso TIMESTAMP NULL,
    activo BOOLEAN DEFAULT TRUE
);

-- Tabla de materias
CREATE TABLE IF NOT EXISTS materias (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT,
    grado INT NOT NULL,
    especialidad VARCHAR(50) NOT NULL,
    horas_semana INT NOT NULL,
    profesor_id INT,
    FOREIGN KEY (profesor_id) REFERENCES usuarios(id) ON DELETE SET NULL
);

-- Tabla de calificaciones
CREATE TABLE IF NOT EXISTS calificaciones (
    id INT AUTO_INCREMENT PRIMARY KEY,
    alumno_id INT NOT NULL,
    materia_id INT NOT NULL,
    parcial1 DECIMAL(4,2),
    parcial2 DECIMAL(4,2),
    parcial3 DECIMAL(4,2),
    final DECIMAL(4,2),
    semestre VARCHAR(20) NOT NULL,
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (alumno_id) REFERENCES usuarios(id) ON DELETE CASCADE,
    FOREIGN KEY (materia_id) REFERENCES materias(id) ON DELETE CASCADE
);

-- Tabla de clubes
CREATE TABLE IF NOT EXISTS clubes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT,
    coordinador_id INT,
    ubicacion VARCHAR(100),
    horario TEXT,
    requisitos TEXT,
    imagen VARCHAR(255),
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (coordinador_id) REFERENCES usuarios(id) ON DELETE SET NULL
);

-- Tabla de miembros de clubes
CREATE TABLE IF NOT EXISTS club_miembros (
    id INT AUTO_INCREMENT PRIMARY KEY,
    club_id INT NOT NULL,
    usuario_id INT NOT NULL,
    fecha_ingreso TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (club_id) REFERENCES clubes(id) ON DELETE CASCADE,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
);

-- Tabla de foros
CREATE TABLE IF NOT EXISTS foros (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(100) NOT NULL,
    descripcion TEXT,
    categoria VARCHAR(50) NOT NULL,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de temas de foro
CREATE TABLE IF NOT EXISTS temas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    foro_id INT NOT NULL,
    usuario_id INT NOT NULL,
    titulo VARCHAR(100) NOT NULL,
    contenido TEXT NOT NULL,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ultima_actividad TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    vistas INT DEFAULT 0,
    cerrado BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (foro_id) REFERENCES foros(id) ON DELETE CASCADE,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
);

-- Tabla de respuestas a temas
CREATE TABLE IF NOT EXISTS respuestas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    tema_id INT NOT NULL,
    usuario_id INT NOT NULL,
    contenido TEXT NOT NULL,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (tema_id) REFERENCES temas(id) ON DELETE CASCADE,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id) ON DELETE CASCADE
);

-- Tabla de horarios
CREATE TABLE IF NOT EXISTS horarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    materia_id INT NOT NULL,
    dia ENUM('lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado') NOT NULL,
    hora_inicio TIME NOT NULL,
    hora_fin TIME NOT NULL,
    aula VARCHAR(20) NOT NULL,
    FOREIGN KEY (materia_id) REFERENCES materias(id) ON DELETE CASCADE
);

-- Tabla de noticias
CREATE TABLE IF NOT EXISTS noticias (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(100) NOT NULL,
    contenido TEXT NOT NULL,
    imagen VARCHAR(255),
    autor_id INT,
    fecha_publicacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    destacada BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (autor_id) REFERENCES usuarios(id) ON DELETE SET NULL
);

-- Tabla de preguntas frecuentes
CREATE TABLE IF NOT EXISTS faqs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    pregunta VARCHAR(255) NOT NULL,
    respuesta TEXT NOT NULL,
    categoria VARCHAR(50),
    orden INT DEFAULT 0
);

-- Insertar datos de ejemplo
INSERT INTO usuarios (nombre, apellidos, usuario, email, password, tipo, grado, grupo, especialidad, foto) VALUES
('Admin', 'Sistema', 'admin', 'admin@cbtis29.edu.mx', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'administrador', NULL, NULL, NULL, NULL),
('Juan', 'Pérez López', 'juan.perez', 'juan.perez@cbtis29.edu.mx', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'profesor', NULL, NULL, 'informatica', NULL),
('María', 'Rodríguez Gómez', 'maria.rodriguez', 'maria.rodriguez@cbtis29.edu.mx', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'profesor', NULL, NULL, 'ciencias', NULL),
('Carlos', 'Mendoza Sánchez', 'carlos.mendoza', 'carlos.mendoza@cbtis29.edu.mx', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'alumno', 5, 'A', 'informatica', NULL),
('Ana', 'López Torres', 'ana.lopez', 'ana.lopez@cbtis29.edu.mx', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'alumno', 3, 'B', 'contabilidad', NULL);

INSERT INTO materias (nombre, descripcion, grado, especialidad, horas_semana, profesor_id) VALUES
('Programación Web', 'Desarrollo de aplicaciones web con HTML, CSS y JavaScript', 5, 'informatica', 5, 2),
('Bases de Datos', 'Diseño y administración de bases de datos relacionales', 5, 'informatica', 4, 2),
('Matemáticas I', 'Fundamentos de álgebra y geometría analítica', 1, 'tronco-comun', 5, 3),
('Física I', 'Mecánica clásica y termodinámica', 1, 'tronco-comun', 4, 3);

INSERT INTO clubes (nombre, descripcion, coordinador_id, ubicacion, horario, requisitos, imagen) VALUES
('Club de Robótica', 'Espacio para el diseño y construcción de robots', 2, 'Laboratorio D-305', 'Lunes y Miércoles 14:00-16:00', 'Ser estudiante inscrito, Interés en robótica', NULL),
('Club de Debate', 'Desarrollo de habilidades de argumentación y oratoria', 3, 'Aula F-203', 'Martes y Jueves 14:00-16:00', 'Ser estudiante inscrito, Interés en debate', NULL);

INSERT INTO faqs (pregunta, respuesta, categoria, orden) VALUES
('¿Cómo puedo inscribirme a un club?', 'Para inscribirte a un club, debes visitar la sección de Comunidad, seleccionar el club de tu interés y hacer clic en el botón "Unirse". Posteriormente, deberás acudir a las oficinas del plantel para completar el proceso.', 'clubes', 1),
('¿Cuáles son los horarios de atención de las oficinas?', 'Las oficinas del plantel atienden de lunes a viernes de 8:00 a 20:00 horas.', 'general', 2),
('¿Cómo puedo recuperar mi contraseña?', 'Para recuperar tu contraseña, haz clic en "¿Olvidaste tu contraseña?" en la pantalla de inicio de sesión y sigue las instrucciones. Si continúas con problemas, acude a las oficinas del plantel.', 'cuenta', 3);
