document.addEventListener("DOMContentLoaded", function() {
    const hamburgerBtn = document.getElementById("ham-btn");
    const navBar = document.getElementById("nav-bar");
    const header = document.querySelector("header");

    function toggleMenu() {
        hamburgerBtn.classList.toggle("active");
        navBar.classList.toggle("open");
      
        if (navBar.classList.contains("open")) {
            hamburgerBtn.innerHTML = "✖";
            document.body.style.overflow = "hidden";
        } else {
            hamburgerBtn.innerHTML = "☰";
            document.body.style.overflow = "";
        }
    }
    if (hamburgerBtn && navBar) {
        
        hamburgerBtn.addEventListener("click", function(e) {
            e.stopPropagation(); 
            toggleMenu();
        });

        const navLinks = document.querySelectorAll("#nav-bar a");
        navLinks.forEach(link => {
            link.addEventListener("click", toggleMenu);
        });

        document.addEventListener("click", function(e) {
            if (navBar.classList.contains("open") && 
                !e.target.closest("#nav-bar") && 
                !e.target.closest("#ham-btn")) {
                toggleMenu();
            }
        });

        window.addEventListener("resize", function() {
            if (window.innerWidth > 768 && navBar.classList.contains("open")) {
                toggleMenu();
            }
        });
  }
  
    if (header && navBar) {
        const headerHeight = header.offsetHeight;
        navBar.style.top = `${headerHeight}px`;
    }
});