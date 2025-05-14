document.addEventListener("DOMContentLoaded", () => {
  // Variables
  const preloader = document.getElementById("preloader")
  const cursorFollower = document.getElementById("cursor-follower")
  const loginButton = document.getElementById("login-button")
  const loginOverlay = document.getElementById("login-overlay")
  const closeLogin = document.querySelector(".close-login")
  const loginForm = document.getElementById("login-form")
  const notification = document.getElementById("notification")
  const notificationMessage = document.querySelector(".notification-message")
  const notificationClose = document.querySelector(".notification-close")
  const themeToggle = document.getElementById("theme-toggle")
  const comunidadTabs = document.querySelectorAll(".comunidad-tabs a")
  const tabPanes = document.querySelectorAll(".tab-pane")
  const newTopicBtn = document.getElementById("new-topic-btn")
  const newTopicModal = document.getElementById("new-topic-modal")
  const closeModalBtns = document.querySelectorAll(".close-modal")
  const cancelTopicBtn = document.querySelector(".cancel-topic")
  const newTopicForm = document.getElementById("new-topic-form")
  const newGroupBtn = document.getElementById("new-group-btn")
  const newGroupModal = document.getElementById("new-group-modal")
  const cancelGroupBtn = document.querySelector(".cancel-group")
  const newGroupForm = document.getElementById("new-group-form")
  const groupFilterBtns = document.querySelectorAll(".filter-btn")
  const groupCards = document.querySelectorAll(".group-card")
  const joinGroupBtns = document.querySelectorAll(".join-group")
  const faqCategories = document.querySelectorAll(".faq-category")
  const faqSections = document.querySelectorAll(".faq-section")
  const accordionItems = document.querySelectorAll(".accordion-item")
  const chatButton = document.querySelector(".chat-button")
  const chatWidget = document.getElementById("chat-widget")
  const minimizeChat = document.querySelector(".minimize-chat")
  const chatInput = document.querySelector(".chat-input textarea")
  const sendMessageBtn = document.querySelector(".send-message")
  const chatMessages = document.querySelector(".chat-messages")
  const supportForm = document.getElementById("support-form")
  const startChatBtn = document.querySelector(".start-chat")

  // Preloader
  window.addEventListener("load", () => {
    setTimeout(() => {
      preloader.style.opacity = "0"
      setTimeout(() => {
        preloader.style.display = "none"
      }, 500)
    }, 1500)
  })

  // Cursor personalizado
  document.addEventListener("mousemove", (e) => {
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
        hoveredElement.closest(".topic-item") ||
        hoveredElement.closest(".group-card") ||
        hoveredElement.closest(".accordion-header"))
    ) {
      cursorFollower.style.width = "50px"
      cursorFollower.style.height = "50px"
      cursorFollower.style.backgroundColor = "rgba(0, 43, 92, 0.2)"
    } else {
      cursorFollower.style.width = "30px"
      cursorFollower.style.height = "30px"
      cursorFollower.style.backgroundColor = "rgba(0, 43, 92, 0.3)"
    }
  })

  document.addEventListener("mouseleave", () => {
    cursorFollower.style.opacity = "0"
  })

  // Abrir overlay de inicio de sesión
  function openLoginOverlay() {
    loginOverlay.classList.add("show")
    document.body.style.overflow = "hidden" // Evitar scroll
  }

  // Cerrar overlay de inicio de sesión
  function closeLoginOverlay() {
    loginOverlay.classList.remove("show")
    document.body.style.overflow = "" // Restaurar scroll
  }

  // Manejar envío del formulario de inicio de sesión
  function handleLoginSubmit(e) {
    e.preventDefault()

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
      loginNav.textContent = username
      loginNav.removeEventListener("click", openLoginOverlay)
      loginNav.addEventListener("click", () => {
        showNotification("Ya has iniciado sesión")
      })
    }, 1500)
  }

  // Mostrar notificación
  function showNotification(message) {
    notificationMessage.textContent = message
    notification.classList.add("show")

    setTimeout(() => {
      notification.classList.remove("show")
    }, 3000)
  }

  // Cerrar notificación
  function closeNotification() {
    notification.classList.remove("show")
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

  // Cambiar entre pestañas de la comunidad
  function switchTab(e) {
    e.preventDefault()
    const targetTab = e.currentTarget.getAttribute("data-tab")

    // Actualizar clases activas en las pestañas
    comunidadTabs.forEach((tab) => {
      tab.classList.remove("active")
    })
    e.currentTarget.classList.add("active")

    // Mostrar el contenido de la pestaña seleccionada
    tabPanes.forEach((pane) => {
      pane.classList.remove("active")
      if (pane.id === targetTab) {
        pane.classList.add("active")
      }
    })

    // Actualizar URL con hash
    window.location.hash = targetTab
  }

  // Abrir modal de nuevo tema
  function openNewTopicModal() {
    newTopicModal.style.display = "block"
    document.body.style.overflow = "hidden" // Evitar scroll
  }

  // Cerrar modal de nuevo tema
  function closeNewTopicModal() {
    newTopicModal.style.display = "none"
    document.body.style.overflow = "" // Restaurar scroll
  }

  // Manejar envío del formulario de nuevo tema
  function handleNewTopicSubmit(e) {
    e.preventDefault()

    const title = document.getElementById("topic-title").value
    const category = document.getElementById("topic-category").value

    // Simulación de creación de tema
    showNotification(`Tema "${title}" creado exitosamente en la categoría ${category}`)
    closeNewTopicModal()
    newTopicForm.reset()
  }

  // Abrir modal de nuevo grupo
  function openNewGroupModal() {
    newGroupModal.style.display = "block"
    document.body.style.overflow = "hidden" // Evitar scroll
  }

  // Cerrar modal de nuevo grupo
  function closeNewGroupModal() {
    newGroupModal.style.display = "none"
    document.body.style.overflow = "" // Restaurar scroll
  }

  // Manejar envío del formulario de nuevo grupo
  function handleNewGroupSubmit(e) {
    e.preventDefault()

    const name = document.getElementById("group-name").value
    const category = document.getElementById("group-category").value

    // Simulación de creación de grupo
    showNotification(`Grupo "${name}" creado exitosamente en la categoría ${category}`)
    closeNewGroupModal()
    newGroupForm.reset()
  }

  // Filtrar grupos de estudio
  function filterGroups(category) {
    groupCards.forEach((card) => {
      if (category === "all" || card.getAttribute("data-category") === category) {
        card.style.display = "flex"
      } else {
        card.style.display = "none"
      }
    })
  }

  // Unirse a un grupo
  function joinGroup(e) {
    const groupName = e.currentTarget.closest(".group-card").querySelector(".group-title").textContent
    showNotification(`Te has unido al grupo "${groupName}"`)

    // Cambiar el botón
    e.currentTarget.textContent = "Miembro"
    e.currentTarget.classList.remove("btn-primary")
    e.currentTarget.classList.add("btn-secondary")
    e.currentTarget.disabled = true
  }

  // Cambiar categoría de FAQ
  function switchFaqCategory(e) {
    const category = e.currentTarget.getAttribute("data-category")

    // Actualizar clases activas
    faqCategories.forEach((cat) => {
      cat.classList.remove("active")
    })
    e.currentTarget.classList.add("active")

    // Mostrar la sección correspondiente
    faqSections.forEach((section) => {
      section.classList.remove("active")
      if (section.getAttribute("data-category") === category) {
        section.classList.add("active")
      }
    })
  }

  // Alternar acordeón
  function toggleAccordion() {
    const content = this.nextElementSibling
    const isOpen = this.parentElement.classList.contains("active")

    // Cerrar todos los acordeones
    accordionItems.forEach((item) => {
      item.classList.remove("active")
      item.querySelector(".accordion-content").style.maxHeight = null
    })

    // Abrir el acordeón actual si estaba cerrado
    if (!isOpen) {
      this.parentElement.classList.add("active")
      content.style.maxHeight = content.scrollHeight + "px"
    }
  }

  // Abrir/cerrar chat
  function toggleChat() {
    chatWidget.classList.toggle("open")
  }

  // Minimizar chat
  function minimizeChatWidget() {
    chatWidget.classList.remove("open")
  }

  // Enviar mensaje en el chat
  function sendMessage() {
    const messageText = chatInput.value.trim()
    if (messageText === "") return

    // Obtener hora actual
    const now = new Date()
    const hours = now.getHours().toString().padStart(2, "0")
    const minutes = now.getMinutes().toString().padStart(2, "0")
    const timeString = `${hours}:${minutes}`

    // Crear elemento de mensaje
    const messageElement = document.createElement("div")
    messageElement.className = "message user"
    messageElement.innerHTML = `
            <div class="message-content">
                <p>${messageText}</p>
            </div>
            <div class="message-time">${timeString}</div>
        `

    // Añadir mensaje al chat
    chatMessages.appendChild(messageElement)

    // Limpiar input
    chatInput.value = ""

    // Scroll al final del chat
    chatMessages.scrollTop = chatMessages.scrollHeight

    // Simular respuesta del agente
    setTimeout(() => {
      const responseElement = document.createElement("div")
      responseElement.className = "message agent"
      responseElement.innerHTML = `
                <div class="message-avatar">
                    <img src="/placeholder.svg?height=40&width=40" alt="Agente">
                </div>
                <div class="message-content">
                    <div class="message-sender">Ana (Soporte)</div>
                    <p>Gracias por tu mensaje. Un agente revisará tu consulta y te responderá lo antes posible.</p>
                </div>
                <div class="message-time">${timeString}</div>
            `

      chatMessages.appendChild(responseElement)
      chatMessages.scrollTop = chatMessages.scrollHeight
    }, 1000)
  }

  // Manejar envío del formulario de soporte
  function handleSupportFormSubmit(e) {
    e.preventDefault()

    const name = document.getElementById("support-name").value
    const email = document.getElementById("support-email").value
    const type = document.getElementById("support-type").value

    // Simulación de envío de solicitud
    showNotification(`Solicitud de soporte enviada exitosamente. Te contactaremos pronto en ${email}`)
    supportForm.reset()
  }

  // Iniciar chat en vivo
  function startLiveChat() {
    chatWidget.classList.add("open")
    showNotification("Chat en vivo iniciado. Un agente te atenderá en breve.")
  }

  // Verificar si hay un hash en la URL para activar la pestaña correspondiente
  function checkUrlHash() {
    const hash = window.location.hash.substring(1)
    if (hash) {
      const targetTab = document.querySelector(`.comunidad-tabs a[data-tab="${hash}"]`)
      if (targetTab) {
        targetTab.click()
      }
    }
  }

  // Event Listeners
  loginButton.addEventListener("click", openLoginOverlay)
  closeLogin.addEventListener("click", closeLoginOverlay)
  window.addEventListener("click", (e) => {
    if (e.target === loginOverlay) {
      closeLoginOverlay()
    }
  })

  loginForm.addEventListener("submit", handleLoginSubmit)
  notificationClose.addEventListener("click", closeNotification)
  themeToggle.addEventListener("click", toggleTheme)

  comunidadTabs.forEach((tab) => {
    tab.addEventListener("click", switchTab)
  })

  newTopicBtn?.addEventListener("click", openNewTopicModal)
  closeModalBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      const modal = this.closest(".modal")
      modal.style.display = "none"
      document.body.style.overflow = ""
    })
  })
  cancelTopicBtn?.addEventListener("click", closeNewTopicModal)
  newTopicForm?.addEventListener("submit", handleNewTopicSubmit)

  newGroupBtn?.addEventListener("click", openNewGroupModal)
  cancelGroupBtn?.addEventListener("click", closeNewGroupModal)
  newGroupForm?.addEventListener("submit", handleNewGroupSubmit)

  groupFilterBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      groupFilterBtns.forEach((b) => b.classList.remove("active"))
      this.classList.add("active")
      filterGroups(this.getAttribute("data-filter"))
    })
  })

  joinGroupBtns.forEach((btn) => {
    btn.addEventListener("click", joinGroup)
  })

  faqCategories.forEach((category) => {
    category.addEventListener("click", switchFaqCategory)
  })

  document.querySelectorAll(".accordion-header").forEach((header) => {
    header.addEventListener("click", toggleAccordion)
  })

  chatButton?.addEventListener("click", toggleChat)
  minimizeChat?.addEventListener("click", minimizeChatWidget)

  chatInput?.addEventListener("keypress", (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  })

  sendMessageBtn?.addEventListener("click", sendMessage)
  supportForm?.addEventListener("submit", handleSupportFormSubmit)
  startChatBtn?.addEventListener("click", startLiveChat)

  // Inicializar
  loadSavedTheme()
  checkUrlHash()
})
