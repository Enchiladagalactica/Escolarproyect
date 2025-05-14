document.addEventListener("DOMContentLoaded", () => {
  // Variables
  const preloader = document.getElementById("preloader")
  const menuToggle = document.querySelector(".menu-toggle")
  const navMenu = document.querySelector(".nav-menu")
  const themeToggle = document.getElementById("theme-toggle")
  const communityTabs = document.querySelectorAll(".community-tab")
  const communityContents = document.querySelectorAll(".community-content")
  const joinButtons = document.querySelectorAll(".join-btn")
  const redirectButtons = document.querySelectorAll(".redirect-btn")
  const gradeSelector = document.getElementById("grade-selector")
  const careerSelector = document.getElementById("career-selector")
  const loginForm = document.getElementById("login-form")
  const registerForm = document.getElementById("register-form")
  const scheduleCells = document.querySelectorAll(".schedule-cell")
  const closeModalButtons = document.querySelectorAll(".close-modal")
  const notificationClose = document.querySelector(".notification-close")

  // Preloader
  window.addEventListener("load", () => {
    setTimeout(() => {
      preloader.style.opacity = "0"
      setTimeout(() => {
        preloader.style.display = "none"
      }, 500)
    }, 1500)
  })

  // Menú móvil
  if (menuToggle) {
    menuToggle.addEventListener("click", () => {
      navMenu.classList.toggle("active")
    })
  }

  // Cambiar tema
  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      document.body.classList.toggle("dark-theme")

      // Guardar preferencia en localStorage
      const isDarkTheme = document.body.classList.contains("dark-theme")
      localStorage.setItem("darkTheme", isDarkTheme)

      showNotification(isDarkTheme ? "Modo oscuro activado" : "Modo claro activado", "info")
    })
  }

  // Cargar tema guardado
  function loadSavedTheme() {
    const isDarkTheme = localStorage.getItem("darkTheme") === "true"
    if (isDarkTheme) {
      document.body.classList.add("dark-theme")
    }
  }
  loadSavedTheme()

  // Pestañas de comunidad
  if (communityTabs.length > 0 && communityContents.length > 0) {
    communityTabs.forEach((tab, index) => {
      tab.addEventListener("click", () => {
        // Remover clase active de todas las pestañas
        communityTabs.forEach((t) => t.classList.remove("active"))
        // Añadir clase active a la pestaña clickeada
        tab.classList.add("active")

        // Ocultar todos los contenidos
        communityContents.forEach((content) => {
          content.classList.remove("active")
        })

        // Mostrar el contenido correspondiente
        communityContents[index].classList.add("active")
      })
    })
  }

  // Botones de unirse a clubes
  if (joinButtons.length > 0) {
    joinButtons.forEach((button) => {
      button.addEventListener("click", (e) => {
        e.preventDefault()
        const clubName = button.getAttribute("data-club-name") || "este club"
        showNotification(
          `Para unirte a ${clubName}, por favor dirígete a las oficinas del plantel para obtener más información.`,
          "info",
        )
      })
    })
  }

  // Botones de redirección
  if (redirectButtons.length > 0) {
    redirectButtons.forEach((button) => {
      button.addEventListener("click", (e) => {
        e.preventDefault()
        const actionName = button.getAttribute("data-action") || "continuar con este proceso"
        showNotification(
          `Si deseas ${actionName} u obtener más información, por favor dirígete a las oficinas del plantel.`,
          "info",
        )
      })
    })
  }

  // Selector de grado escolar
  if (gradeSelector) {
    gradeSelector.addEventListener("change", () => {
      const selectedGrade = gradeSelector.value
      const subjectRows = document.querySelectorAll(".subject-row")

      subjectRows.forEach((row) => {
        const rowGrade = row.getAttribute("data-grade")
        if (selectedGrade === "all" || rowGrade === selectedGrade) {
          row.style.display = "table-row"
        } else {
          row.style.display = "none"
        }
      })
    })
  }

  // Selector de carrera
  if (careerSelector) {
    careerSelector.addEventListener("change", () => {
      const selectedCareer = careerSelector.value
      const careerInfo = document.querySelectorAll(".career-info")

      careerInfo.forEach((info) => {
        const infoCareer = info.getAttribute("data-career")
        if (selectedCareer === "all" || infoCareer === selectedCareer) {
          info.style.display = "block"
        } else {
          info.style.display = "none"
        }
      })
    })
  }

  // Formulario de inicio de sesión
  if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault()

      const username = document.getElementById("login-username").value
      const password = document.getElementById("login-password").value

      // Simulación de inicio de sesión
      if (username && password) {
        showNotification("Inicio de sesión exitoso. ¡Bienvenido!", "success")

        // Redirigir a la página de perfil después de un breve retraso
        setTimeout(() => {
          window.location.href = "perfil.html"
        }, 1500)
      } else {
        showNotification("Por favor, completa todos los campos", "error")
      }
    })
  }

  // Formulario de registro
  if (registerForm) {
    registerForm.addEventListener("submit", (e) => {
      e.preventDefault()

      const username = document.getElementById("register-username").value
      const email = document.getElementById("register-email").value
      const password = document.getElementById("register-password").value
      const confirmPassword = document.getElementById("register-confirm-password").value

      // Validación básica
      if (!username || !email || !password || !confirmPassword) {
        showNotification("Por favor, completa todos los campos", "error")
        return
      }

      if (password !== confirmPassword) {
        showNotification("Las contraseñas no coinciden", "error")
        return
      }

      // Simulación de registro exitoso
      showNotification("Registro exitoso. Por favor, inicia sesión", "success")

      // Cerrar modal de registro y abrir modal de inicio de sesión
      const registerModal = document.getElementById("register-modal")
      const loginModal = document.getElementById("login-modal")

      if (registerModal && loginModal) {
        registerModal.classList.remove("show")
        setTimeout(() => {
          loginModal.classList.add("show")
        }, 500)
      }
    })
  }

  // Celdas de horario
  if (scheduleCells.length > 0) {
    scheduleCells.forEach((cell) => {
      cell.addEventListener("click", () => {
        if (cell.textContent.trim() !== "") {
          const subject = cell.querySelector(".schedule-subject")?.textContent || ""
          const teacher = cell.querySelector(".schedule-teacher")?.textContent || ""
          const room = cell.querySelector(".schedule-room")?.textContent || ""

          if (subject) {
            showNotification(`Clase: ${subject} - ${teacher} - Aula: ${room}`, "info")
          }
        }
      })

      // Efecto 3D en hover
      cell.addEventListener("mousemove", (e) => {
        if (cell.textContent.trim() !== "") {
          const rect = cell.getBoundingClientRect()
          const x = e.clientX - rect.left
          const y = e.clientY - rect.top

          // Calcular ángulo de inclinación basado en la posición del cursor
          const centerX = rect.width / 2
          const centerY = rect.height / 2
          const rotateX = ((centerY - y) / centerY) * 5 // Máximo 5 grados
          const rotateY = ((x - centerX) / centerX) * 5 // Máximo 5 grados

          cell.style.transform = `perspective(500px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`
          cell.style.zIndex = "10"
        }
      })

      cell.addEventListener("mouseleave", () => {
        cell.style.transform = ""
        cell.style.zIndex = ""
      })
    })
  }

  // Cerrar modales
  if (closeModalButtons.length > 0) {
    closeModalButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const modal = button.closest(".modal")
        if (modal) {
          modal.classList.remove("show")
        }
      })
    })
  }

  // Cerrar modales al hacer clic fuera
  window.addEventListener("click", (e) => {
    const modals = document.querySelectorAll(".modal.show")
    modals.forEach((modal) => {
      if (e.target === modal) {
        modal.classList.remove("show")
      }
    })
  })

  // Mostrar notificación
  function showNotification(message, type = "info") {
    const notification = document.querySelector(".notification")
    const notificationMessage = document.querySelector(".notification-message")
    const notificationIcon = document.querySelector(".notification-icon")

    if (notification && notificationMessage) {
      notificationMessage.textContent = message

      // Cambiar icono según el tipo
      if (notificationIcon) {
        notificationIcon.className = "notification-icon " + type

        let iconHTML = ""
        switch (type) {
          case "success":
            iconHTML = '<i class="fas fa-check-circle"></i>'
            break
          case "error":
            iconHTML = '<i class="fas fa-times-circle"></i>'
            break
          case "warning":
            iconHTML = '<i class="fas fa-exclamation-triangle"></i>'
            break
          default:
            iconHTML = '<i class="fas fa-info-circle"></i>'
        }

        notificationIcon.innerHTML = iconHTML
      }

      notification.classList.add("show")

      // Ocultar después de 5 segundos
      setTimeout(() => {
        notification.classList.remove("show")
      }, 5000)
    }
  }

  // Cerrar notificación
  if (notificationClose) {
    notificationClose.addEventListener("click", () => {
      const notification = document.querySelector(".notification")
      if (notification) {
        notification.classList.remove("show")
      }
    })
  }

  // Abrir modales
  const modalTriggers = document.querySelectorAll("[data-modal]")
  if (modalTriggers.length > 0) {
    modalTriggers.forEach((trigger) => {
      trigger.addEventListener("click", (e) => {
        e.preventDefault()
        const modalId = trigger.getAttribute("data-modal")
        const modal = document.getElementById(modalId)

        if (modal) {
          modal.classList.add("show")
        }
      })
    })
  }

  // Animación de elementos al hacer scroll
  const animateOnScroll = () => {
    const elements = document.querySelectorAll(".animate-on-scroll")

    elements.forEach((element) => {
      const elementPosition = element.getBoundingClientRect().top
      const screenPosition = window.innerHeight / 1.3

      if (elementPosition < screenPosition) {
        element.classList.add("animated")
      }
    })
  }

  window.addEventListener("scroll", animateOnScroll)
  animateOnScroll() // Ejecutar una vez al cargar la página
})
