document.addEventListener("DOMContentLoaded", () => {
  // Variables
  const preloader = document.getElementById("preloader")
  const cursorFollower = document.getElementById("cursor-follower")
  const header = document.querySelector("header") || document.querySelector(".main-header")
  const menuToggle = document.querySelector(".menu-toggle")
  const menu = document.querySelector(".menu") || document.querySelector(".nav-menu")
  const menuLinks = document.querySelectorAll(".menu a") || document.querySelectorAll(".nav-menu a")
  const subjectCards = document.querySelectorAll(".subject-card")
  const loginButton = document.getElementById("login-button")
  const loginOverlay = document.getElementById("login-overlay")
  const closeLogin = document.querySelector(".close-login")
  const loginForm = document.getElementById("login-form")
  const notification = document.getElementById("notification")
  const notificationMessage = document.querySelector(".notification-message")
  const notificationClose = document.querySelector(".notification-close")
  const themeToggle = document.getElementById("theme-toggle")
  const floatingLogo = document.getElementById("floating-logo")
  const filterTabs = document.querySelectorAll(".filter-tab")
  const horarioCeldas = document.querySelectorAll(".horario-celda")
  const materiaTabs = document.querySelectorAll(".materia-tab")
  const dots = document.querySelectorAll(".dot")

  // Preloader
  window.addEventListener("load", () => {
    setTimeout(() => {
      if (preloader) {
        preloader.style.opacity = "0"
        setTimeout(() => {
          preloader.style.display = "none"
        }, 500)
      }
    }, 1500)
  })

  // Cursor personalizado
  document.addEventListener("mousemove", (e) => {
    if (cursorFollower) {
      const x = e.clientX
      const y = e.clientY

      cursorFollower.style.left = `${x}px`
      cursorFollower.style.top = `${y}px`
      cursorFollower.style.opacity = "1"

      // Efecto de hover en elementos interactivos
      const hoveredElement = document.elementFromPoint(x, y)
      if (
        hoveredElement &&
        (hoveredElement.tagName === "BUTTON" ||
          hoveredElement.tagName === "A" ||
          hoveredElement.closest(".subject-card") ||
          hoveredElement.closest(".horario-celda"))
      ) {
        cursorFollower.style.width = "50px"
        cursorFollower.style.height = "50px"
        cursorFollower.style.backgroundColor = "rgba(0, 43, 92, 0.2)"
      } else {
        cursorFollower.style.width = "30px"
        cursorFollower.style.height = "30px"
        cursorFollower.style.backgroundColor = "rgba(0, 43, 92, 0.3)"
      }
    }
  })

  document.addEventListener("mouseleave", () => {
    if (cursorFollower) {
      cursorFollower.style.opacity = "0"
    }
  })

  // Cambiar el estilo del header al hacer scroll
  function handleScroll() {
    if (header) {
      if (window.scrollY > 100) {
        header.classList.add("scrolled")
      } else {
        header.classList.remove("scrolled")
      }
    }
  }

  // Alternar menú móvil
  function toggleMenu() {
    if (menu && menuToggle) {
      menu.classList.toggle("active")
      menuToggle.classList.toggle("active")
    }
  }

  // Cerrar menú al hacer clic en un enlace
  function closeMenu() {
    if (menu && menuToggle) {
      menu.classList.remove("active")
      menuToggle.classList.remove("active")
    }
  }

  // Abrir overlay de inicio de sesión
  function openLoginOverlay() {
    if (loginOverlay) {
      loginOverlay.classList.add("show")
      document.body.style.overflow = "hidden" // Evitar scroll
    }
  }

  // Cerrar overlay de inicio de sesión
  function closeLoginOverlay() {
    if (loginOverlay) {
      loginOverlay.classList.remove("show")
      document.body.style.overflow = "" // Restaurar scroll
    }
  }

  // Manejar envío del formulario de inicio de sesión
  function handleLoginSubmit(e) {
    e.preventDefault()

    if (loginForm) {
      const username = document.getElementById("username").value
      const password = document.getElementById("password").value

      // Simulación de inicio de sesión
      const loginButton = loginForm.querySelector(".login-button")
      const originalText = loginButton.textContent

      loginButton.textContent = "Iniciando sesión..."
      loginButton.disabled = true

      setTimeout(() => {
        closeLoginOverlay()
        showNotification(`¡Bienvenido, ${username}!`)
        loginForm.reset()
        loginButton.textContent = originalText
        loginButton.disabled = false

        // Cambiar el botón de inicio de sesión por el nombre de usuario
        const loginNav = document.querySelector(".login-nav")
        if (loginNav) {
          loginNav.textContent = username
          loginNav.removeEventListener("click", openLoginOverlay)
          loginNav.addEventListener("click", () => {
            showNotification("Ya has iniciado sesión")
          })
        }
      }, 1500)
    }
  }

  // Mostrar notificación
  function showNotification(message) {
    if (notification && notificationMessage) {
      notificationMessage.textContent = message
      notification.classList.add("show")

      setTimeout(() => {
        notification.classList.remove("show")
      }, 3000)
    }
  }

  // Cerrar notificación
  function closeNotification() {
    if (notification) {
      notification.classList.remove("show")
    }
  }

  // Cambiar tema
  function toggleTheme() {
    document.body.classList.toggle("dark-theme")

    // Guardar preferencia en localStorage
    const isDarkTheme = document.body.classList.contains("dark-theme")
    localStorage.setItem("darkTheme", isDarkTheme)

    showNotification(isDarkTheme ? "Modo oscuro activado" : "Modo claro activado")
  }

  // Cargar tema guardado
  function loadSavedTheme() {
    const isDarkTheme = localStorage.getItem("darkTheme") === "true"
    if (isDarkTheme) {
      document.body.classList.add("dark-theme")
    }
  }

  // Filtrar materias
  function filterSubjects(category) {
    const subjectCards = document.querySelectorAll(".subject-card")

    subjectCards.forEach((card) => {
      if (category === "all" || card.getAttribute("data-category") === category) {
        card.style.display = "block"
      } else {
        card.style.display = "none"
      }
    })
  }

  // Slider de imágenes
  let currentSlide = 0
  const slides = document.querySelectorAll(".slide")
  const totalSlides = slides.length

  function showSlide(index) {
    if (slides.length > 0 && dots.length > 0) {
      slides.forEach((slide) => {
        slide.classList.remove("active")
      })

      dots.forEach((dot) => {
        dot.classList.remove("active")
      })

      slides[index].classList.add("active")
      dots[index].classList.add("active")
    }
  }

  function nextSlide() {
    if (totalSlides > 0) {
      currentSlide = (currentSlide + 1) % totalSlides
      showSlide(currentSlide)
    }
  }

  function prevSlide() {
    if (totalSlides > 0) {
      currentSlide = (currentSlide - 1 + totalSlides) % totalSlides
      showSlide(currentSlide)
    }
  }

  // Cambiar slides automáticamente si existen slides
  if (slides.length > 0) {
    setInterval(nextSlide, 5000)
  }

  // Funcionalidad para el horario dinámico
  if (horarioCeldas.length > 0) {
    horarioCeldas.forEach((celda) => {
      celda.addEventListener("click", () => {
        // Mostrar información detallada de la clase
        if (celda.textContent.trim() !== "") {
          const materia = celda.querySelector(".horario-materia")?.textContent || ""
          const profesor = celda.querySelector(".horario-profesor")?.textContent || ""
          const aula = celda.querySelector(".horario-aula")?.textContent || ""

          if (materia) {
            showNotification(`Clase: ${materia} - ${profesor} - Aula: ${aula}`)
          }
        }
      })

      // Efecto de hover avanzado
      celda.addEventListener("mousemove", (e) => {
        if (celda.textContent.trim() !== "") {
          const rect = celda.getBoundingClientRect()
          const x = e.clientX - rect.left
          const y = e.clientY - rect.top

          // Calcular ángulo de inclinación basado en la posición del cursor
          const centerX = rect.width / 2
          const centerY = rect.height / 2
          const rotateX = ((centerY - y) / centerY) * 5 // Máximo 5 grados
          const rotateY = ((x - centerX) / centerX) * 5 // Máximo 5 grados

          celda.style.transform = `perspective(500px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`
          celda.style.zIndex = "10"
        }
      })

      celda.addEventListener("mouseleave", () => {
        celda.style.transform = ""
        celda.style.zIndex = ""
      })
    })
  }

  // Funcionalidad para el logo flotante
  if (floatingLogo) {
    floatingLogo.addEventListener("click", () => {
      // Scroll suave hacia arriba
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      })

      // Mostrar notificación
      showNotification("¡Bienvenido al Portal Académico!")
    })

    // Efecto de rotación al hacer scroll
    window.addEventListener("scroll", () => {
      const scrollPosition = window.scrollY
      const rotation = scrollPosition / 100 // Rotación proporcional al scroll

      // Limitar la rotación a un máximo de 45 grados
      const limitedRotation = Math.min(rotation, 45)

      const logoImg = floatingLogo.querySelector("img")
      if (logoImg) {
        logoImg.style.transform = `rotate(${limitedRotation}deg)`
      }
    })
  }

  // Funcionalidad para los dots del slider
  if (dots.length > 0) {
    dots.forEach((dot, index) => {
      dot.addEventListener("click", () => {
        currentSlide = index
        showSlide(currentSlide)
      })
    })
  }

  // Navegación por pestañas para la página de comunidad
  const tabButtons = document.querySelectorAll(".tab-button")
  const tabContents = document.querySelectorAll(".tab-content")

  if (tabButtons.length > 0 && tabContents.length > 0) {
    tabButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const tabId = button.getAttribute("data-tab")

        // Desactivar todas las pestañas
        tabButtons.forEach((btn) => btn.classList.remove("active"))
        tabContents.forEach((content) => content.classList.remove("active"))

        // Activar la pestaña seleccionada
        button.classList.add("active")
        const tabContent = document.getElementById(tabId)
        if (tabContent) {
          tabContent.classList.add("active")
        }
      })
    })
  }

  // Funcionalidad de acordeón
  const accordionHeaders = document.querySelectorAll(".accordion-header")

  if (accordionHeaders.length > 0) {
    accordionHeaders.forEach((header) => {
      header.addEventListener("click", () => {
        const accordionItem = header.parentElement
        const accordionContent = header.nextElementSibling
        const icon = header.querySelector(".accordion-icon i")

        // Cerrar todos los acordeones
        document.querySelectorAll(".accordion").forEach((item) => {
          if (item !== accordionItem) {
            item.classList.remove("active")
            const content = item.querySelector(".accordion-content")
            if (content) content.style.maxHeight = null
            const itemIcon = item.querySelector(".accordion-icon i")
            if (itemIcon) {
              itemIcon.classList.remove("fa-chevron-up")
              itemIcon.classList.add("fa-chevron-down")
            }
          }
        })

        // Alternar el acordeón actual
        accordionItem.classList.toggle("active")

        if (accordionItem.classList.contains("active")) {
          accordionContent.style.maxHeight = accordionContent.scrollHeight + "px"
          if (icon) {
            icon.classList.remove("fa-chevron-down")
            icon.classList.add("fa-chevron-up")
          }
        } else {
          accordionContent.style.maxHeight = null
          if (icon) {
            icon.classList.remove("fa-chevron-up")
            icon.classList.add("fa-chevron-down")
          }
        }
      })
    })
  }

  // Modal de ticket de soporte
  const ticketModal = document.getElementById("ticket-modal")
  const openTicketBtn = document.getElementById("open-ticket-modal")
  const closeModalBtn = document.querySelector(".close-modal")

  if (openTicketBtn && ticketModal) {
    openTicketBtn.addEventListener("click", () => {
      ticketModal.style.display = "block"
    })
  }

  if (closeModalBtn && ticketModal) {
    closeModalBtn.addEventListener("click", () => {
      ticketModal.style.display = "none"
    })
  }

  if (ticketModal) {
    window.addEventListener("click", (event) => {
      if (event.target === ticketModal) {
        ticketModal.style.display = "none"
      }
    })
  }

  // Formulario de ticket de soporte
  const supportTicketForm = document.getElementById("support-ticket-form")

  if (supportTicketForm) {
    supportTicketForm.addEventListener("submit", (e) => {
      e.preventDefault()

      // Simulación de envío de formulario
      const submitButton = supportTicketForm.querySelector('button[type="submit"]')
      submitButton.disabled = true
      submitButton.textContent = "Enviando..."

      setTimeout(() => {
        alert("¡Ticket enviado con éxito! Te contactaremos pronto.")
        supportTicketForm.reset()
        submitButton.disabled = false
        submitButton.textContent = "Enviar Ticket"
        if (ticketModal) {
          ticketModal.style.display = "none"
        }
      }, 1500)
    })
  }

  // Diagnóstico del sistema
  const runDiagnosticsBtn = document.getElementById("run-diagnostics")
  const diagnosticsArea = document.getElementById("diagnostics-area")
  const diagnosticsProgress = document.getElementById("diagnostics-progress")
  const diagnosticsResults = document.getElementById("diagnostics-results")

  if (runDiagnosticsBtn && diagnosticsArea && diagnosticsProgress && diagnosticsResults) {
    runDiagnosticsBtn.addEventListener("click", () => {
      diagnosticsArea.style.display = "block"
      diagnosticsResults.innerHTML = "<p>Ejecutando diagnóstico del sistema...</p>"
      diagnosticsProgress.style.width = "0%"

      const steps = [
        { name: "Verificando conexión a internet", time: 1000 },
        { name: "Comprobando compatibilidad del navegador", time: 1500 },
        { name: "Verificando plugins y extensiones", time: 2000 },
        { name: "Comprobando velocidad de conexión", time: 2500 },
        { name: "Generando informe", time: 1000 },
      ]

      let currentStep = 0
      const totalSteps = steps.length

      function runNextStep() {
        if (currentStep < totalSteps) {
          const step = steps[currentStep]
          const progress = Math.round(((currentStep + 1) / totalSteps) * 100)

          diagnosticsResults.innerHTML += `<p><i class="fas fa-spinner fa-spin"></i> ${step.name}...</p>`
          diagnosticsProgress.style.width = progress + "%"

          setTimeout(() => {
            diagnosticsResults.innerHTML = diagnosticsResults.innerHTML.replace(
              '<i class="fas fa-spinner fa-spin"></i>',
              '<i class="fas fa-check text-success"></i>',
            )
            currentStep++
            runNextStep()
          }, step.time)
        } else {
          // Diagnóstico completado
          diagnosticsResults.innerHTML += `
            <div class="diagnostics-summary">
                <h3>Diagnóstico Completado</h3>
                <p><i class="fas fa-check-circle text-success"></i> Conexión a internet: Estable</p>
                <p><i class="fas fa-check-circle text-success"></i> Navegador: Compatible</p>
                <p><i class="fas fa-check-circle text-success"></i> Plugins necesarios: Instalados</p>
                <p><i class="fas fa-exclamation-triangle text-warning"></i> Velocidad de conexión: 5.2 Mbps (Recomendado: >10 Mbps)</p>
                <p><i class="fas fa-info-circle"></i> Resolución de pantalla: ${window.innerWidth}x${window.innerHeight}</p>
                <button class="btn-secondary close-diagnostics">Cerrar</button>
            </div>
          `

          document.querySelector(".close-diagnostics").addEventListener("click", () => {
            diagnosticsArea.style.display = "none"
          })
        }
      }

      runNextStep()
    })
  }

  // Formulario de nuevo tema en foros
  const newTopicForm = document.getElementById("new-topic-form")

  if (newTopicForm) {
    newTopicForm.addEventListener("submit", (e) => {
      e.preventDefault()

      const title = document.getElementById("topic-title").value
      const category = document.getElementById("topic-category").value

      // Simulación de creación de tema
      alert(`Tema "${title}" creado con éxito en la categoría "${category}".`)
      newTopicForm.reset()
    })
  }

  // Búsqueda en FAQ
  const faqSearchForm = document.querySelector(".search-form")

  if (faqSearchForm) {
    faqSearchForm.addEventListener("submit", (e) => {
      e.preventDefault()
      const searchTerm = faqSearchForm.querySelector("input").value.toLowerCase()

      // Simulación de búsqueda
      const accordions = document.querySelectorAll("#faq .accordion")
      let found = false

      accordions.forEach((accordion) => {
        const header = accordion.querySelector(".accordion-header h3").textContent.toLowerCase()
        const content = accordion.querySelector(".accordion-content").textContent.toLowerCase()

        if (header.includes(searchTerm) || content.includes(searchTerm)) {
          // Abrir el acordeón que coincide con la búsqueda
          accordion.classList.add("active")
          accordion.querySelector(".accordion-content").style.maxHeight =
            accordion.querySelector(".accordion-content").scrollHeight + "px"
          const icon = accordion.querySelector(".accordion-icon i")
          if (icon) {
            icon.classList.remove("fa-chevron-down")
            icon.classList.add("fa-chevron-up")
          }

          // Resaltar el término de búsqueda (simulado)
          accordion.scrollIntoView({ behavior: "smooth" })
          found = true
        } else {
          // Cerrar los acordeones que no coinciden
          accordion.classList.remove("active")
          accordion.querySelector(".accordion-content").style.maxHeight = null
          const icon = accordion.querySelector(".accordion-icon i")
          if (icon) {
            icon.classList.remove("fa-chevron-up")
            icon.classList.add("fa-chevron-down")
          }
        }
      })

      if (!found) {
        alert('No se encontraron resultados para "' + searchTerm + '".')
      }
    })
  }

  // Reproducción de videos
  const videoThumbnails = document.querySelectorAll(".video-thumbnail")

  if (videoThumbnails.length > 0) {
    videoThumbnails.forEach((thumbnail) => {
      thumbnail.addEventListener("click", () => {
        // Simulación de reproducción de video
        alert("Reproduciendo video: " + thumbnail.nextElementSibling.textContent)
      })
    })
  }

  // Event Listeners
  window.addEventListener("scroll", handleScroll)

  if (menuToggle) {
    menuToggle.addEventListener("click", toggleMenu)
  }

  if (menuLinks.length > 0) {
    menuLinks.forEach((link) => link.addEventListener("click", closeMenu))
  }

  if (loginButton) {
    loginButton.addEventListener("click", openLoginOverlay)
  }

  if (closeLogin) {
    closeLogin.addEventListener("click", closeLoginOverlay)
  }

  if (loginOverlay) {
    window.addEventListener("click", (e) => {
      if (e.target === loginOverlay) {
        closeLoginOverlay()
      }
    })
  }

  if (loginForm) {
    loginForm.addEventListener("submit", handleLoginSubmit)
  }

  if (notificationClose) {
    notificationClose.addEventListener("click", closeNotification)
  }

  if (themeToggle) {
    themeToggle.addEventListener("click", toggleTheme)
  }

  if (filterTabs.length > 0) {
    filterTabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        filterTabs.forEach((t) => t.classList.remove("active"))
        tab.classList.add("active")
        filterSubjects(tab.getAttribute("data-filter"))
      })
    })
  }

  // Inicializar
  handleScroll()
  loadSavedTheme()
  if (slides.length > 0) {
    showSlide(0)
  }
})

// Funcionalidad del menú hamburguesa
document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.querySelector(".hamburger")
  const menu = document.querySelector(".menu")

  if (hamburger) {
    hamburger.addEventListener("click", () => {
      menu.classList.toggle("active")
      hamburger.classList.toggle("active")
    })
  }

  // Cambio de tema (modo oscuro/claro)
  const themeSwitch = document.getElementById("checkbox")

  if (themeSwitch) {
    // Verificar si hay una preferencia guardada
    const currentTheme = localStorage.getItem("theme") ? localStorage.getItem("theme") : null

    if (currentTheme) {
      document.documentElement.setAttribute("data-theme", currentTheme)

      if (currentTheme === "dark") {
        themeSwitch.checked = true
      }
    }

    themeSwitch.addEventListener("change", (e) => {
      if (e.target.checked) {
        document.documentElement.setAttribute("data-theme", "dark")
        localStorage.setItem("theme", "dark")
      } else {
        document.documentElement.setAttribute("data-theme", "light")
        localStorage.setItem("theme", "light")
      }
    })
  }

  // Funcionalidad para el botón de inicio de sesión
  const loginBtn = document.getElementById("login-btn")

  if (loginBtn) {
    loginBtn.addEventListener("click", (e) => {
      e.preventDefault()
      alert(
        "Funcionalidad de inicio de sesión en desarrollo. Por favor, visite las oficinas del plantel para más información.",
      )
    })
  }

  // Funcionalidad para los botones de unirse a clubes
  const joinButtons = document.querySelectorAll(".join-button, .club-card-button")

  if (joinButtons.length > 0) {
    joinButtons.forEach((button) => {
      button.addEventListener("click", () => {
        showNotification()
      })
    })
  }

  // Funcionalidad para cerrar la notificación
  const closeNotification = document.querySelector(".close-notification")
  const notificationBtn = document.querySelector(".notification-btn")

  if (closeNotification) {
    closeNotification.addEventListener("click", () => {
      hideNotification()
    })
  }

  if (notificationBtn) {
    notificationBtn.addEventListener("click", () => {
      hideNotification()
    })
  }

  // Funcionalidad para las pestañas en la comunidad
  const tabButtons = document.querySelectorAll(".community-tab")

  if (tabButtons.length > 0) {
    tabButtons.forEach((button) => {
      button.addEventListener("click", function () {
        const tabId = this.getAttribute("data-tab")

        // Ocultar todos los contenidos de pestañas
        document.querySelectorAll(".tab-content").forEach((content) => {
          content.classList.remove("active")
        })

        // Desactivar todos los botones de pestañas
        document.querySelectorAll(".community-tab").forEach((tab) => {
          tab.classList.remove("active")
        })

        // Mostrar el contenido de la pestaña seleccionada
        document.getElementById(tabId).classList.add("active")

        // Activar el botón de la pestaña seleccionada
        this.classList.add("active")
      })
    })
  }

  // Funcionalidad para el selector de grado en la página de materias
  const gradeSelector = document.getElementById("grade-selector")

  if (gradeSelector) {
    gradeSelector.addEventListener("change", function () {
      const selectedGrade = this.value

      // Ocultar todas las tablas de materias
      document.querySelectorAll(".subjects-table").forEach((table) => {
        table.style.display = "none"
      })

      // Mostrar la tabla correspondiente al grado seleccionado
      const selectedTable = document.getElementById(`subjects-${selectedGrade}`)
      if (selectedTable) {
        selectedTable.style.display = "table"
      }
    })
  }

  // Inicializar el foro si existe en la página
  initForum()
})

// Función para mostrar la notificación
function showNotification() {
  const notification = document.getElementById("notification")
  if (notification) {
    notification.classList.add("show")
  }
}

// Función para ocultar la notificación
function hideNotification() {
  const notification = document.getElementById("notification")
  if (notification) {
    notification.classList.remove("show")
  }
}

// Funcionalidad del foro
function initForum() {
  const forumContainer = document.getElementById("forum-container")

  if (!forumContainer) return

  const postForm = document.getElementById("post-form")
  const postsContainer = document.getElementById("posts-container")

  if (postForm) {
    postForm.addEventListener("submit", (e) => {
      e.preventDefault()

      const nameInput = document.getElementById("post-name")
      const titleInput = document.getElementById("post-title")
      const contentInput = document.getElementById("post-content")

      if (nameInput && titleInput && contentInput) {
        const name = nameInput.value.trim()
        const title = titleInput.value.trim()
        const content = contentInput.value.trim()

        if (name && title && content) {
          // Crear un nuevo post
          const postElement = document.createElement("div")
          postElement.className = "forum-post"

          const currentDate = new Date()
          const formattedDate = `${currentDate.getDate()}/${currentDate.getMonth() + 1}/${currentDate.getFullYear()} ${currentDate.getHours()}:${currentDate.getMinutes().toString().padStart(2, "0")}`

          postElement.innerHTML = `
                        <div class="post-header">
                            <h3>${title}</h3>
                            <div class="post-meta">
                                <span class="post-author">Por: ${name}</span>
                                <span class="post-date">Fecha: ${formattedDate}</span>
                            </div>
                        </div>
                        <div class="post-content">
                            <p>${content}</p>
                        </div>
                        <div class="post-actions">
                            <button class="reply-button">Responder</button>
                            <button class="like-button">Me gusta <span class="like-count">0</span></button>
                        </div>
                        <div class="post-replies"></div>
                    `

          // Agregar el post al contenedor
          postsContainer.prepend(postElement)

          // Limpiar el formulario
          nameInput.value = ""
          titleInput.value = ""
          contentInput.value = ""

          // Configurar los botones del post
          setupPostButtons(postElement)
        }
      }
    })
  }

  // Configurar los botones de los posts existentes
  document.querySelectorAll(".forum-post").forEach((post) => {
    setupPostButtons(post)
  })
}

// Configurar los botones de un post
function setupPostButtons(postElement) {
  const replyButton = postElement.querySelector(".reply-button")
  const likeButton = postElement.querySelector(".like-button")
  const likeCount = postElement.querySelector(".like-count")
  const repliesContainer = postElement.querySelector(".post-replies")

  if (replyButton) {
    replyButton.addEventListener("click", () => {
      // Crear formulario de respuesta si no existe
      if (!postElement.querySelector(".reply-form")) {
        const replyForm = document.createElement("div")
        replyForm.className = "reply-form"
        replyForm.innerHTML = `
                    <textarea placeholder="Escribe tu respuesta..."></textarea>
                    <button class="submit-reply">Enviar</button>
                `

        repliesContainer.appendChild(replyForm)

        // Configurar el botón de enviar respuesta
        const submitReplyButton = replyForm.querySelector(".submit-reply")
        const replyTextarea = replyForm.querySelector("textarea")

        submitReplyButton.addEventListener("click", () => {
          const replyContent = replyTextarea.value.trim()

          if (replyContent) {
            // Crear elemento de respuesta
            const replyElement = document.createElement("div")
            replyElement.className = "post-reply"

            const currentDate = new Date()
            const formattedDate = `${currentDate.getDate()}/${currentDate.getMonth() + 1}/${currentDate.getFullYear()} ${currentDate.getHours()}:${currentDate.getMinutes().toString().padStart(2, "0")}`

            replyElement.innerHTML = `
                            <div class="reply-content">
                                <p>${replyContent}</p>
                            </div>
                            <div class="reply-meta">
                                <span class="reply-author">Usuario Anónimo</span>
                                <span class="reply-date">Fecha: ${formattedDate}</span>
                            </div>
                        `

            // Agregar la respuesta antes del formulario
            repliesContainer.insertBefore(replyElement, replyForm)

            // Limpiar el textarea
            replyTextarea.value = ""
          }
        })
      }
    })
  }

  if (likeButton && likeCount) {
    likeButton.addEventListener("click", () => {
      let count = Number.parseInt(likeCount.textContent)
      count++
      likeCount.textContent = count
    })
  }
}

// Función para cambiar entre modo claro y oscuro
function toggleTheme() {
  const body = document.body
  const themeToggleBtn = document.getElementById("theme-toggle-btn")

  if (body.classList.contains("light-mode")) {
    body.classList.remove("light-mode")
    body.classList.add("dark-mode")
    localStorage.setItem("theme", "dark")
  } else {
    body.classList.remove("dark-mode")
    body.classList.add("light-mode")
    localStorage.setItem("theme", "light")
  }
}

// Función para cargar el tema guardado
function loadSavedTheme() {
  const savedTheme = localStorage.getItem("theme")
  const body = document.body

  if (savedTheme === "dark") {
    body.classList.remove("light-mode")
    body.classList.add("dark-mode")
  } else {
    body.classList.remove("dark-mode")
    body.classList.add("light-mode")
  }
}

// Función para mostrar notificación
function mostrarNotificacion(
  mensaje = "Si desea continuar con el proceso u obtener más información tendrá que dirigirse a las oficinas del plantel.",
) {
  const notification = document.getElementById("notification")
  const notificationMessage = notification.querySelector("p")

  // Actualizar el mensaje si es necesario
  if (mensaje) {
    notificationMessage.textContent = mensaje
  }

  notification.classList.add("show")

  // Cerrar notificación
  document.querySelector(".close-notification").addEventListener("click", () => {
    notification.classList.remove("show")
  })

  document.querySelector(".notification-btn").addEventListener("click", () => {
    notification.classList.remove("show")
  })
}

// Función para manejar el clic en botones de unirse
function setupJoinButtons() {
  const joinButtons = document.querySelectorAll(".join-btn, .inscribir-btn, .btn-unirse")

  joinButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      e.preventDefault()
      mostrarNotificacion()
    })
  })
}

// Función para manejar el clic en botones de redirección
function setupRedirectButtons() {
  const redirectButtons = document.querySelectorAll(".redirect-btn, .btn-redirect, .btn-info")

  redirectButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      e.preventDefault()
      mostrarNotificacion()
    })
  })
}

// Función para cargar clubes en la página de comunidad
function cargarClubes() {
  const clubesContainer = document.getElementById("clubes-container")
  if (!clubesContainer) return

  // Datos de ejemplo para clubes
  const clubes = [
    {
      id: 1,
      nombre: "Club de Robótica",
      descripcion: "Aprende a diseñar, construir y programar robots.",
      imagen: "https://via.placeholder.com/300x200?text=Robótica",
      categoria: "tecnologia",
    },
    {
      id: 2,
      nombre: "Club de Debate",
      descripcion: "Desarrolla habilidades de argumentación y oratoria.",
      imagen: "https://via.placeholder.com/300x200?text=Debate",
      categoria: "humanidades",
    },
    {
      id: 3,
      nombre: "Club de Ciencias",
      descripcion: "Experimenta y aprende sobre fenómenos científicos.",
      imagen: "https://via.placeholder.com/300x200?text=Ciencias",
      categoria: "ciencias",
    },
    {
      id: 4,
      nombre: "Club de Ajedrez",
      descripcion: "Mejora tu pensamiento estratégico y lógico.",
      imagen: "https://via.placeholder.com/300x200?text=Ajedrez",
      categoria: "juegos",
    },
    {
      id: 5,
      nombre: "Club de Fotografía",
      descripcion: "Aprende técnicas de fotografía y edición de imágenes.",
      imagen: "https://via.placeholder.com/300x200?text=Fotografía",
      categoria: "arte",
    },
    {
      id: 6,
      nombre: "Club de Programación",
      descripcion: "Desarrolla habilidades de programación y crea aplicaciones.",
      imagen: "https://via.placeholder.com/300x200?text=Programación",
      categoria: "tecnologia",
    },
  ]

  // Limpiar el contenedor
  clubesContainer.innerHTML = ""

  // Agregar cada club al contenedor
  clubes.forEach((club) => {
    const clubElement = document.createElement("div")
    clubElement.className = "club-card"
    clubElement.setAttribute("data-categoria", club.categoria)

    clubElement.innerHTML = `
            <div class="club-image">
                <img src="${club.imagen}" alt="${club.nombre}">
            </div>
            <div class="club-info">
                <h3>${club.nombre}</h3>
                <p>${club.descripcion}</p>
                <div class="club-actions">
                    <a href="detalle-club.html?id=${club.id}" class="btn-info">Más información</a>
                    <button class="btn-unirse">Unirse</button>
                </div>
            </div>
        `

    clubesContainer.appendChild(clubElement)
  })

  // Configurar botones de unirse
  setupJoinButtons()
}

// Función para filtrar clubes por categoría
function filtrarClubes() {
  const filtroSelect = document.getElementById("filtro-categoria")
  if (!filtroSelect) return

  filtroSelect.addEventListener("change", function () {
    const categoriaSeleccionada = this.value
    const clubes = document.querySelectorAll(".club-card")

    clubes.forEach((club) => {
      if (categoriaSeleccionada === "todos" || club.getAttribute("data-categoria") === categoriaSeleccionada) {
        club.style.display = "block"
      } else {
        club.style.display = "none"
      }
    })
  })
}

// Función para cargar preguntas frecuentes
function cargarFAQs() {
  const faqContainer = document.getElementById("faq-container")
  if (!faqContainer) return

  // Datos de ejemplo para FAQs
  const faqs = [
    {
      pregunta: "¿Cómo puedo inscribirme a un club?",
      respuesta:
        'Para inscribirte a un club, debes visitar la sección de Comunidad, seleccionar el club de tu interés y hacer clic en el botón "Unirse". Posteriormente, deberás acudir a las oficinas del plantel para completar el proceso.',
    },
    {
      pregunta: "¿Cuáles son los horarios de atención de las oficinas?",
      respuesta: "Las oficinas del plantel atienden de lunes a viernes de 8:00 a 20:00 horas.",
    },
    {
      pregunta: "¿Cómo puedo recuperar mi contraseña?",
      respuesta:
        'Para recuperar tu contraseña, haz clic en "¿Olvidaste tu contraseña?" en la pantalla de inicio de sesión y sigue las instrucciones. Si continúas con problemas, acude a las oficinas del plantel.',
    },
    {
      pregunta: "¿Dónde puedo ver mis calificaciones?",
      respuesta:
        'Puedes consultar tus calificaciones en la sección "Mi Perfil", en la pestaña "Calificaciones". Allí encontrarás tus calificaciones organizadas por grado escolar y materia.',
    },
    {
      pregunta: "¿Cómo puedo contactar a mis profesores?",
      respuesta:
        'En la sección "Mi Perfil", en la pestaña "Maestros", encontrarás la lista de tus profesores con sus datos de contacto. También puedes enviarles mensajes directamente desde la plataforma.',
    },
  ]

  // Limpiar el contenedor
  faqContainer.innerHTML = ""

  // Agregar cada FAQ al contenedor
  faqs.forEach((faq, index) => {
    const faqElement = document.createElement("div")
    faqElement.className = "faq-item"

    faqElement.innerHTML = `
            <div class="faq-question" data-faq="${index}">
                <h3>${faq.pregunta}</h3>
                <span class="faq-toggle">+</span>
            </div>
            <div class="faq-answer" id="faq-answer-${index}">
                <p>${faq.respuesta}</p>
            </div>
        `

    faqContainer.appendChild(faqElement)
  })

  // Configurar toggle para las preguntas
  const faqQuestions = document.querySelectorAll(".faq-question")
  faqQuestions.forEach((question) => {
    question.addEventListener("click", function () {
      const faqId = this.getAttribute("data-faq")
      const answer = document.getElementById(`faq-answer-${faqId}`)
      const toggle = this.querySelector(".faq-toggle")

      if (answer.style.maxHeight) {
        answer.style.maxHeight = null
        toggle.textContent = "+"
      } else {
        answer.style.maxHeight = answer.scrollHeight + "px"
        toggle.textContent = "-"
      }
    })
  })
}

// Función para cargar materias en la página de materias
function cargarMaterias() {
  const materiasContainer = document.getElementById("materias-grid")
  if (!materiasContainer) return

  // Datos de ejemplo para materias
  const materias = {
    1: [
      {
        id: 1,
        nombre: "Matemáticas I",
        profesor: "Dr. Juan Pérez",
        horario: "Lunes y Miércoles 8:00 - 10:00",
        aula: "A-101",
        semestre: 1,
        especialidad: "tronco-comun",
      },
      {
        id: 2,
        nombre: "Física I",
        profesor: "Dra. María Rodríguez",
        horario: "Martes y Jueves 10:00 - 12:00",
        aula: "B-203",
        semestre: 1,
        especialidad: "tronco-comun",
      },
      {
        id: 3,
        nombre: "Química I",
        profesor: "Ing. Roberto Gómez",
        horario: "Viernes 8:00 - 12:00",
        aula: "C-105",
        semestre: 1,
        especialidad: "tronco-comun",
      },
    ],
    2: [
      {
        id: 4,
        nombre: "Matemáticas II",
        profesor: "Dr. Juan Pérez",
        horario: "Lunes y Miércoles 10:00 - 12:00",
        aula: "A-102",
        semestre: 2,
        especialidad: "tronco-comun",
      },
      {
        id: 5,
        nombre: "Física II",
        profesor: "Dra. María Rodríguez",
        horario: "Martes y Jueves 8:00 - 10:00",
        aula: "B-204",
        semestre: 2,
        especialidad: "tronco-comun",
      },
      {
        id: 6,
        nombre: "Programación Básica",
        profesor: "Ing. Carlos Sánchez",
        horario: "Viernes 14:00 - 18:00",
        aula: "D-301",
        semestre: 2,
        especialidad: "informatica",
      },
    ],
    3: [
      {
        id: 7,
        nombre: "Estructura de Datos",
        profesor: "Ing. Carlos Sánchez",
        horario: "Lunes y Miércoles 14:00 - 16:00",
        aula: "D-302",
        semestre: 3,
        especialidad: "informatica",
      },
      {
        id: 8,
        nombre: "Circuitos Eléctricos",
        profesor: "Ing. Laura Martínez",
        horario: "Martes y Jueves 14:00 - 16:00",
        aula: "E-201",
        semestre: 3,
        especialidad: "electronica",
      },
      {
        id: 9,
        nombre: "Contabilidad Básica",
        profesor: "Lic. Ana Torres",
        horario: "Viernes 8:00 - 12:00",
        aula: "F-101",
        semestre: 3,
        especialidad: "administracion",
      },
    ],
  }

  // Configurar filtros
  const gradoSelect = document.getElementById("filtro-grado")
  const especialidadSelect = document.getElementById("filtro-especialidad")

  if (gradoSelect && especialidadSelect) {
    gradoSelect.addEventListener("change", () => {
      filtrarMaterias()
    })

    especialidadSelect.addEventListener("change", () => {
      filtrarMaterias()
    })

    // Función para filtrar materias
    function filtrarMaterias() {
      const gradoSeleccionado = gradoSelect.value
      const especialidadSeleccionada = especialidadSelect.value

      // Limpiar el contenedor
      materiasContainer.innerHTML = ""

      // Verificar si hay materias para el grado seleccionado
      if (materias[gradoSeleccionado]) {
        // Filtrar por especialidad si es necesario
        const materiasFiltradas = materias[gradoSeleccionado].filter((materia) => {
          return especialidadSeleccionada === "todas" || materia.especialidad === especialidadSeleccionada
        })

        // Agregar cada materia al contenedor
        materiasFiltradas.forEach((materia) => {
          const materiaElement = document.createElement("div")
          materiaElement.className = "materia-card"

          materiaElement.innerHTML = `
                        <div class="materia-card-header">
                            <h3>${materia.nombre}</h3>
                        </div>
                        <div class="materia-card-body">
                            <div class="materia-card-info">
                                <p><strong>Profesor:</strong> ${materia.profesor}</p>
                                <p><strong>Horario:</strong> ${materia.horario}</p>
                                <p><strong>Aula:</strong> ${materia.aula}</p>
                            </div>
                            <div class="materia-card-actions">
                                <a href="materia-detalle.html?id=${materia.id}" class="btn-info">Ver detalles</a>
                                <button class="btn-inscribir inscribir-btn">Inscribirse</button>
                            </div>
                        </div>
                    `

          materiasContainer.appendChild(materiaElement)
        })

        // Configurar botones de inscribirse
        setupJoinButtons()
      }
    }

    // Cargar materias iniciales (primer grado, todas las especialidades)
    filtrarMaterias()
  }
}

// Función para cargar detalle de club
function cargarDetalleClub() {
  const urlParams = new URLSearchParams(window.location.search)
  const clubId = urlParams.get("id")

  if (!clubId) return

  // Datos de ejemplo para clubes
  const clubes = {
    1: {
      nombre: "Club de Robótica",
      coordinador: "Ing. Roberto Méndez",
      ubicacion: "Laboratorio D-305",
      descripcion:
        "El Club de Robótica del CBTIS No. 29 es un espacio dedicado a estudiantes interesados en el diseño, construcción y programación de robots. A través de proyectos prácticos y competencias, los miembros desarrollan habilidades técnicas y de trabajo en equipo que complementan su formación académica.",
      actividades: [
        "Diseño y construcción de robots",
        "Programación de sistemas automatizados",
        "Participación en competencias regionales y nacionales",
        "Talleres de electrónica básica y avanzada",
        "Proyectos de innovación tecnológica",
      ],
      requisitos: [
        "Ser estudiante inscrito en el CBTIS No. 29",
        "Tener interés en la robótica y tecnología",
        "Compromiso de asistencia regular a las sesiones",
        "Disposición para trabajar en equipo",
      ],
      horarios: [
        { dia: "Lunes", hora: "14:00 - 16:00" },
        { dia: "Miércoles", hora: "14:00 - 16:00" },
        { dia: "Viernes", hora: "13:00 - 15:00" },
      ],
      galeria: [
        "https://via.placeholder.com/600x400?text=Competencia+de+Robótica",
        "https://via.placeholder.com/600x400?text=Taller+de+Programación",
        "https://via.placeholder.com/600x400?text=Construcción+de+Robot",
        "https://via.placeholder.com/600x400?text=Equipo+de+Robótica",
      ],
    },
    2: {
      nombre: "Club de Debate",
      coordinador: "Lic. Patricia Vázquez",
      ubicacion: "Aula F-203",
      descripcion:
        "El Club de Debate promueve el pensamiento crítico y las habilidades de comunicación a través de la práctica de la argumentación y la oratoria. Los miembros aprenden a investigar temas de actualidad, construir argumentos sólidos y presentarlos de manera efectiva.",
      actividades: [
        "Debates formales sobre temas de actualidad",
        "Talleres de oratoria y argumentación",
        "Participación en torneos interescolares",
        "Simulaciones de modelos de Naciones Unidas",
        "Análisis de discursos históricos",
      ],
      requisitos: [
        "Ser estudiante inscrito en el CBTIS No. 29",
        "Interés en la comunicación y el debate",
        "Disposición para investigar y preparar temas",
        "Compromiso de asistencia regular",
      ],
      horarios: [
        { dia: "Martes", hora: "14:00 - 16:00" },
        { dia: "Jueves", hora: "14:00 - 16:00" },
      ],
      galeria: [
        "https://via.placeholder.com/600x400?text=Torneo+de+Debate",
        "https://via.placeholder.com/600x400?text=Taller+de+Oratoria",
        "https://via.placeholder.com/600x400?text=Debate+Interescolar",
        "https://via.placeholder.com/600x400?text=Modelo+ONU",
      ],
    },
  }

  const club = clubes[clubId]

  if (club) {
    // Actualizar información del club
    document.getElementById("club-titulo").textContent = club.nombre
    document.getElementById("club-coordinador").textContent = "Coordinador: " + club.coordinador
    document.getElementById("club-ubicacion").textContent = "Ubicación: " + club.ubicacion
    document.getElementById("club-descripcion-texto").textContent = club.descripcion

    // Actualizar actividades
    const actividadesLista = document.getElementById("club-actividades-lista")
    actividadesLista.innerHTML = ""
    club.actividades.forEach((actividad) => {
      const li = document.createElement("li")
      li.textContent = actividad
      actividadesLista.appendChild(li)
    })

    // Actualizar requisitos
    const requisitosLista = document.getElementById("club-requisitos-lista")
    requisitosLista.innerHTML = ""
    club.requisitos.forEach((requisito) => {
      const li = document.createElement("li")
      li.textContent = requisito
      requisitosLista.appendChild(li)
    })

    // Actualizar horarios
    const horariosLista = document.getElementById("club-horarios-lista")
    horariosLista.innerHTML = ""
    club.horarios.forEach((horario) => {
      const horarioDiv = document.createElement("div")
      horarioDiv.className = "horario-item"
      horarioDiv.innerHTML = `
                <strong>${horario.dia}</strong>
                <p>${horario.hora}</p>
            `
      horariosLista.appendChild(horarioDiv)
    })

    // Actualizar galería
    const galeriaGrid = document.getElementById("club-galeria-grid")
    galeriaGrid.innerHTML = ""
    club.galeria.forEach((imagen) => {
      const galeriaItem = document.createElement("div")
      galeriaItem.className = "galeria-item"
      galeriaItem.innerHTML = `
                <img src="${imagen}" alt="${club.nombre}">
            `
      galeriaGrid.appendChild(galeriaItem)
    })

    // Configurar botón de unirse
    document.getElementById("unirse-btn").addEventListener("click", () => {
      mostrarNotificacion()
    })
  }
}

// Inicializar cuando el DOM esté cargado
document.addEventListener("DOMContentLoaded", () => {
  // Cargar tema guardado
  loadSavedTheme()

  // Configurar botón de cambio de tema
  const themeToggleBtn = document.getElementById("theme-toggle-btn")
  if (themeToggleBtn) {
    themeToggleBtn.addEventListener("click", toggleTheme)
  }

  // Configurar botones de unirse y redirección
  setupJoinButtons()
  setupRedirectButtons()

  // Cargar datos específicos de cada página
  cargarClubes()
  filtrarClubes()
  cargarFAQs()
  cargarMaterias()
  cargarDetalleClub()

  // Configurar botón de login
  const loginBtn = document.getElementById("login-btn")
  if (loginBtn) {
    loginBtn.addEventListener("click", (e) => {
      e.preventDefault()
      mostrarNotificacion(
        "Para iniciar sesión, por favor diríjase a las oficinas del plantel para obtener sus credenciales.",
      )
    })
  }
})
