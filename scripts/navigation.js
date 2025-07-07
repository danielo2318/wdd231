// Toggle hamburger menu
const navButton = document.querySelector("#ham-btn");
const navLinks = document.querySelector("#nav-bar");

if (navButton && navLinks) {
  navButton.addEventListener("click", () => {
    navButton.classList.toggle("show");
    navLinks.classList.toggle("show");

    const expanded = navButton.getAttribute("aria-expanded") === "true";
    navButton.setAttribute("aria-expanded", !expanded);
  });
}
