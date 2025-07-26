document.addEventListener("DOMContentLoaded", function () {
  const hamburgerBtn = document.querySelector("#ham-btn");
  const navBar = document.querySelector("#nav-bar");

  //alternar el menú
  function toggleMenu() {
    hamburgerBtn.classList.toggle("active");
    navBar.classList.toggle("show");

    // cambiar el ícono
    if (hamburgerBtn.classList.contains("active")) {
      hamburgerBtn.textContent = "✕";
      document.body.style.overflow = "hidden"; // bloquear scroll
    } else {
      hamburgerBtn.textContent = "☰";
      document.body.style.overflow = ""; // restaurar scroll
    }
  }

  // evento click
  hamburgerBtn.addEventListener("click", toggleMenu);

  // cerrar menú al hacer clic en enlace
  const navLinks = document.querySelectorAll("#nav-bar a");
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (navBar.classList.contains("show")) {
        toggleMenu();
      }
    });
  });

  // cerrar menú al hacer clic fuera
  document.addEventListener("click", (e) => {
    if (
      !e.target.closest("#ham-btn") &&
      !e.target.closest("#nav-bar") &&
      navBar.classList.contains("show")
    ) {
      toggleMenu();
    }
  });
});
