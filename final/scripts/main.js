
import { fetchTrails, generateTrailsHTML, getTrailById } from "./trails.js";

document.addEventListener("DOMContentLoaded", async () => {
  const container = document.getElementById("featured-trails");
  const dialog = document.getElementById("trail-dialog");
  const dialogTitle = document.getElementById("dialog-title");
  const dialogDesc = document.getElementById("dialog-desc");
  const dialogDistance = document.getElementById("dialog-distance");
  const dialogElevation = document.getElementById("dialog-elevation");
  const dialogDifficulty = document.getElementById("dialog-difficulty");
  const dialogTerrain = document.getElementById("dialog-terrain");
  const dialogLocation = document.getElementById("dialog-location");
  const dialogFeatures = document.getElementById("dialog-features");
  const favoriteBtn = document.getElementById("favorite-btn");
  const closeDialogBtn = document.getElementById("close-dialog");

  let trails = [];
  let currentTrailId = null;

  if (!container || !dialog) return;

  function openDialog(trail) {
    dialogTitle.textContent = trail.name;
    dialogDesc.textContent = trail.description || "No description available.";
    dialogDistance.textContent = trail.distance;
    dialogElevation.textContent = trail.elevation;
    dialogDifficulty.textContent = trail.difficulty;
    dialogTerrain.textContent = trail.terrain || "Unknown";
    dialogLocation.textContent = trail.location || "Unknown";
    dialogFeatures.textContent =
      trail.features && trail.features.length > 0
        ? trail.features.join(", ")
        : "None";

    currentTrailId = trail.id;

    const favorites = JSON.parse(
      localStorage.getItem("favoriteTrails") || "[]"
    );
    const isFav = favorites.includes(currentTrailId);
    favoriteBtn.textContent = isFav
      ? "Remove from Favorites ⭐"
      : "Add to Favorites ⭐";
    favoriteBtn.setAttribute("aria-pressed", isFav);

    dialog.showModal();
  }

  function closeDialog() {
    dialog.close();
    currentTrailId = null;
  }

  favoriteBtn.addEventListener("click", () => {
    if (!currentTrailId) return;

    let favorites = JSON.parse(localStorage.getItem("favoriteTrails") || "[]");

    if (favorites.includes(currentTrailId)) {
      favorites = favorites.filter((id) => id !== currentTrailId);
      favoriteBtn.textContent = "Add to Favorites ⭐";
      favoriteBtn.setAttribute("aria-pressed", "false");
    } else {
      favorites.push(currentTrailId);
      favoriteBtn.textContent = "Remove from Favorites ⭐";
      favoriteBtn.setAttribute("aria-pressed", "true");
    }

    localStorage.setItem("favoriteTrails", JSON.stringify(favorites));
  });

  closeDialogBtn.addEventListener("click", closeDialog);

  try {
    trails = await fetchTrails();
    container.innerHTML = generateTrailsHTML(trails);

    container.querySelectorAll(".trail-details").forEach((button) => {
      button.addEventListener("click", (e) => {
        const id = e.target.dataset.id;
        const trail = getTrailById(trails, id);
        if (trail) openDialog(trail);
      });
    });
  } catch (error) {
    container.innerHTML = `<p class="error">Unable to load trail information. Please try again later.</p>`;
  }
});
