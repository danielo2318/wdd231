document.addEventListener("DOMContentLoaded", function () {
  // Set timestamp when form loads
  document.getElementById("timestamp").value = new Date().toISOString();

  // Update year and last modified
  document.getElementById("year").textContent = new Date().getFullYear();
  document.getElementById("lastModified").textContent = document.lastModified;

  // Dialog functionality
  const setupDialogs = () => {
    const dialogButtons = document.querySelectorAll(".modal-btn");
    const closeButtons = document.querySelectorAll(".close-dialog");
    const dialogs = document.querySelectorAll(".benefit-dialog");

    // Open dialog
    dialogButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const dialogId = button.getAttribute("data-dialog");
        const dialog = document.getElementById(dialogId);
        if (dialog) {
          dialog.showModal();

          // Handle Escape key
          const handleEscape = (e) => {
            if (e.key === "Escape") {
              dialog.close();
              document.removeEventListener("keydown", handleEscape);
            }
          };

          document.addEventListener("keydown", handleEscape);
        }
      });
    });

    // Close dialog
    closeButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const dialog = button.closest(".benefit-dialog");
        if (dialog) dialog.close();
      });
    });

    // Close when clicking outside
    dialogs.forEach((dialog) => {
      dialog.addEventListener("click", (e) => {
        const dialogDimensions = dialog.getBoundingClientRect();
        if (
          e.clientX < dialogDimensions.left ||
          e.clientX > dialogDimensions.right ||
          e.clientY < dialogDimensions.top ||
          e.clientY > dialogDimensions.bottom
        ) {
          dialog.close();
        }
      });
    });
  };

  // Form validation
  const setupFormValidation = () => {
    const form = document.getElementById("joinForm");
    if (!form) return;

    form.addEventListener("submit", (e) => {
      const requiredFields = form.querySelectorAll("[required]");
      let isValid = true;

      requiredFields.forEach((field) => {
        if (!field.value.trim()) {
          isValid = false;
          field.classList.add("error");
        } else {
          field.classList.remove("error");
        }
      });

      const positionField = document.getElementById("position");
      if (positionField.value && !positionField.checkValidity()) {
        isValid = false;
        positionField.classList.add("error");
      }

      if (!isValid) {
        e.preventDefault();
        alert("Please complete all required fields correctly.");
      }
    });
  };

  // Initialize
  setupDialogs();
  setupFormValidation();
});
