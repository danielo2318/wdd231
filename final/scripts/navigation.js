document.addEventListener("DOMContentLoaded", function () {
  const hamburgerBtn = document.getElementById("ham-btn");
  const navBar = document.getElementById("nav-bar");

  function toggleMenu() {
    hamburgerBtn.classList.toggle("active");
    navBar.classList.toggle("show");

    if (navBar.classList.contains("show")) {
      document.body.style.overflow = "hidden";
      hamburgerBtn.innerHTML = "✕";
    } else {
      document.body.style.overflow = "";
      hamburgerBtn.innerHTML = "☰";
    }
  }

  // Only add click handler if hamburger button exists (mobile view)
  if (hamburgerBtn) {
    hamburgerBtn.addEventListener("click", toggleMenu);
  }

  // Close menu when clicking on a link
  const navLinks = document.querySelectorAll("#nav-bar a");
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (navBar.classList.contains("show")) {
        toggleMenu();
      }
    });
  });

  // Close menu when clicking outside
  document.addEventListener("click", function (e) {
    if (
      !e.target.closest("#ham-btn") &&
      !e.target.closest("#nav-bar") &&
      navBar.classList.contains("show")
    ) {
      toggleMenu();
    }
  });
});
