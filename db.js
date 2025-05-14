// Simulación de base de datos para el sitio web del CBTIS No. 29
// Este archivo contiene datos de ejemplo para las diferentes secciones del sitio

// Base de datos de usuarios
const usuariosDB = [
  {
    id: 1,
    nombre: "Juan Pérez",
    usuario: "juan.perez",
    password: "password123", // En una aplicación real, esto estaría encriptado
    tipo: "alumno",
    grado: 3,
    grupo: "A",
    especialidad: "programacion",
    foto: "https://www.cbtis29.edu.mx/2024/wp-content/uploads/2023/12/alumno1.jpg",
  },
  {
    id: 2,
    nombre: "María López",
    usuario: "maria.lopez",
    password: "password123",
    tipo: "alumno",
    grado: 5,
    grupo: "B",
    especialidad: "contabilidad",
    foto: "https://www.cbtis29.edu.mx/2024/wp-content/uploads/2023/12/alumna1.jpg",
  },
  {
    id: 3,
    nombre: "Roberto Sánchez",
    usuario: "roberto.sanchez",
    password: "admin123",
    tipo: "profesor",
    materias: ["Lógica de Programación", "Programación Estructurada"],
    departamento: "Informática",
    foto: "https://www.cbtis29.edu.mx/2024/wp-content/uploads/2023/12/profesor1.jpg",
  },
]

// Base de datos de clubes
const clubesDB = [
  {
    id: 1,
    nombre: "Club de Robótica",
    descripcion:
      "El Club de Robótica del CBTIS No. 29 es un espacio donde los estudiantes pueden desarrollar habilidades en programación, electrónica y mecánica a través de proyectos prácticos.",
    imagen: "https://www.cbtis29.edu.mx/2024/wp-content/uploads/2023/12/robotica-cbtis29.jpg",
    miembros: 32,
    horario: "Martes y Jueves 15:00-17:00",
    ubicacion: "Laboratorio de Electrónica",
    coordinador: "Ing. Roberto Sánchez",
  },
  {
    id: 2,
    nombre: "Club de Programación",
    descripcion: "Espacio para aprender y practicar diferentes lenguajes de programación y desarrollo de software.",
    imagen: "https://www.cbtis29.edu.mx/2024/wp-content/uploads/2023/12/club-programacion.jpg",
    miembros: 25,
    horario: "Lunes y Miércoles 16:00-18:00",
    ubicacion: "Laboratorio de Cómputo 2",
    coordinador: "Ing. Mónica Hernández",
  },
  {
    id: 3,
    nombre: "Club de Electrónica",
    descripcion: "Grupo dedicado al diseño y construcción de circuitos electrónicos y proyectos relacionados.",
    imagen: "https://www.cbtis29.edu.mx/2024/wp-content/uploads/2023/12/club-electronica.jpg",
    miembros: 18,
    horario: "Viernes 14:00-17:00",
    ubicacion: "Laboratorio de Electrónica",
    coordinador: "Ing. Raúl Gutiérrez",
  },
  {
    id: 4,
    nombre: "Club de Drones",
    descripcion: "Grupo enfocado en la construcción y pilotaje de drones para diversas aplicaciones.",
    imagen: "https://www.cbtis29.edu.mx/2024/wp-content/uploads/2023/12/club-drones.jpg",
    miembros: 15,
    horario: "Sábados 10:00-13:00",
    ubicacion: "Campo Deportivo",
    coordinador: "Ing. Daniel Martínez",
  },
  {
    id: 5,
    nombre: "Club de Debate",
    descripcion: "Espacio para desarrollar habilidades de argumentación, oratoria y pensamiento crítico.",
    imagen: "https://www.cbtis29.edu.mx/2024/wp-content/uploads/2023/12/club-debate.jpg",
    miembros: 20,
    horario: "Martes 16:00-18:00",
    ubicacion: "Aula 15",
    coordinador: "Lic. Javier López",
  },
]

// Base de datos de preguntas frecuentes
const faqDB = [
  {
    id: 1,
    pregunta: "¿Cómo puedo inscribirme al CBTIS No. 29?",
    respuesta:
      "El proceso de inscripción se realiza a través de la convocatoria anual que se publica en nuestra página web y redes sociales. Deberás acudir a las oficinas del plantel con la documentación requerida en las fechas establecidas.",
  },
  {
    id: 2,
    pregunta: "¿Qué especialidades ofrece el CBTIS No. 29?",
    respuesta:
      "Nuestro plantel ofrece las siguientes especialidades: Programación, Electrónica, Contabilidad, Mecatrónica y Administración. Cada una con plan de estudios actualizado y enfocado en las necesidades del mercado laboral.",
  },
  {
    id: 3,
    pregunta: "¿Cómo puedo unirme a un club estudiantil?",
    respuesta:
      "Para unirte a un club estudiantil, debes acudir a las oficinas de Actividades Extraescolares con tu credencial vigente y solicitar el formato de inscripción. Algunos clubes tienen requisitos específicos que deberás cumplir.",
  },
  {
    id: 4,
    pregunta: "¿Cuál es el horario de clases?",
    respuesta:
      "El CBTIS No. 29 cuenta con dos turnos: matutino (7:00 a 14:00 hrs) y vespertino (14:00 a 21:00 hrs). El horario específico de cada grupo se entrega al inicio del semestre.",
  },
  {
    id: 5,
    pregunta: "¿Cómo puedo solicitar una constancia de estudios?",
    respuesta:
      "Para solicitar una constancia de estudios, debes acudir al departamento de Control Escolar con tu credencial vigente y realizar el pago correspondiente. El documento estará listo en un plazo de 2 a 3 días hábiles.",
  },
  {
    id: 6,
    pregunta: "¿Qué becas están disponibles para los estudiantes?",
    respuesta:
      "Los estudiantes pueden acceder a diversas becas como la Beca Benito Juárez, becas de excelencia académica, becas deportivas y culturales. La información sobre convocatorias se publica en la página web y en el departamento de Servicios Escolares.",
  },
  {
    id: 7,
    pregunta: "¿Cómo puedo recuperar mi contraseña del sistema escolar?",
    respuesta:
      "Para recuperar tu contraseña, debes acudir al departamento de Sistemas con tu credencial vigente. También puedes utilizar la opción 'Olvidé mi contraseña' en la página de inicio de sesión si has registrado un correo electrónico de recuperación.",
  },
  {
    id: 8,
    pregunta: "¿Cuándo son los periodos de exámenes?",
    respuesta:
      "Los periodos de exámenes parciales se realizan aproximadamente cada 6 semanas. Los exámenes finales se aplican al término del semestre. El calendario escolar con las fechas específicas se publica al inicio de cada semestre.",
  },
]

// Base de datos de noticias
const noticiasDB = [
  {
    id: 1,
    titulo: "Estudiantes del CBTIS 29 ganan concurso nacional de robótica",
    contenido:
      "El equipo de robótica del CBTIS No. 29 obtuvo el primer lugar en el Concurso Nacional de Robótica Educativa 2024, celebrado en la Ciudad de México. Los estudiantes presentaron un proyecto de robot asistencial para personas con discapacidad.",
    fecha: "2024-04-15",
    imagen: "https://www.cbtis29.edu.mx/2024/wp-content/uploads/2023/12/noticia-robotica.jpg",
    autor: "Departamento de Comunicación",
  },
  {
    id: 2,
    titulo: "Inicia periodo de inscripciones para el ciclo escolar 2024-2025",
    contenido:
      "El CBTIS No. 29 anuncia el inicio del periodo de inscripciones para el próximo ciclo escolar. Los interesados deberán acudir a las oficinas del plantel con la documentación requerida del 1 al 15 de julio de 2024.",
    fecha: "2024-06-20",
    imagen: "https://www.cbtis29.edu.mx/2024/wp-content/uploads/2023/12/noticia-inscripciones.jpg",
    autor: "Departamento de Control Escolar",
  },
  {
    id: 3,
    titulo: "Se inaugura nuevo laboratorio de mecatrónica",
    contenido:
      "Con una inversión de más de 2 millones de pesos, el CBTIS No. 29 inauguró un moderno laboratorio de mecatrónica equipado con tecnología de punta para beneficio de los estudiantes de esta especialidad.",
    fecha: "2024-03-10",
    imagen: "https://www.cbtis29.edu.mx/2024/wp-content/uploads/2023/12/noticia-laboratorio.jpg",
    autor: "Dirección General",
  },
]

// Base de datos de materias por especialidad y grado
const materiasDB = {
  programacion: {
    1: [
      {
        id: 1,
        nombre: "Álgebra",
        profesor: "Mtro. Carlos Ramírez",
        horas: 5,
        tipo: "Básica",
        descripcion:
          "Curso introductorio al álgebra que cubre operaciones con polinomios, ecuaciones lineales y cuadráticas, y sistemas de ecuaciones.",
        temas: [
          "Operaciones algebraicas básicas",
          "Ecuaciones lineales",
          "Sistemas de ecuaciones",
          "Ecuaciones cuadráticas",
          "Funciones y gráficas",
        ],
        competencias: [
          "Resolver problemas matemáticos aplicando métodos algebraicos",
          "Interpretar modelos matemáticos mediante la aplicación de procedimientos aritméticos y algebraicos",
          "Analizar las relaciones entre dos o más variables de un proceso social o natural para determinar su comportamiento",
        ],
      },
      // Más materias...
    ],
    // Más grados...
  },
  // Más especialidades...
}

// Base de datos de calificaciones (ejemplo para un alumno)
const calificacionesDB = {
  1: {
    // ID del alumno
    1: {
      // Primer semestre
      Álgebra: {
        parcial1: 8.5,
        parcial2: 9.0,
        parcial3: 7.8,
        final: 8.4,
      },
      "Química I": {
        parcial1: 7.0,
        parcial2: 8.2,
        parcial3: 8.5,
        final: 7.9,
      },
      "Inglés I": {
        parcial1: 9.5,
        parcial2: 9.0,
        parcial3: 9.2,
        final: 9.2,
      },
      "Lógica de Programación": {
        parcial1: 10.0,
        parcial2: 9.5,
        parcial3: 9.8,
        final: 9.8,
      },
      "Ética y Valores": {
        parcial1: 8.0,
        parcial2: 8.5,
        parcial3: 9.0,
        final: 8.5,
      },
    },
    // Más semestres...
  },
}

// Base de datos de horarios (ejemplo para un alumno)
const horariosDB = {
  1: {
    // ID del alumno
    lunes: [
      { hora: "7:00 - 8:40", materia: "Álgebra", aula: "12" },
      { hora: "8:40 - 10:20", materia: "Química I", aula: "Lab. Química" },
      { hora: "10:20 - 11:00", materia: "Receso", aula: "" },
      { hora: "11:00 - 12:40", materia: "Lógica de Programación", aula: "Lab. Cómputo 1" },
      { hora: "12:40 - 14:20", materia: "Inglés I", aula: "15" },
    ],
    martes: [
      { hora: "7:00 - 8:40", materia: "Ética y Valores", aula: "12" },
      { hora: "8:40 - 10:20", materia: "Lógica de Programación", aula: "Lab. Cómputo 1" },
      { hora: "10:20 - 11:00", materia: "Receso", aula: "" },
      { hora: "11:00 - 12:40", materia: "Álgebra", aula: "12" },
      { hora: "12:40 - 14:20", materia: "Educación Física", aula: "Cancha" },
    ],
    // Más días...
  },
}

// Exportar las bases de datos (en una aplicación real, esto se conectaría a una base de datos real)
const DB = {
  usuarios: usuariosDB,
  clubes: clubesDB,
  faq: faqDB,
  noticias: noticiasDB,
  materias: materiasDB,
  calificaciones: calificacionesDB,
  horarios: horariosDB,
}

// En una aplicación real, aquí se exportaría el módulo
// module.exports = DB;

// Para uso en el navegador
window.DB = DB
