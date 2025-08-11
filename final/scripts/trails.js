document.addEventListener("DOMContentLoaded", function () {
  const featuredTrailsContainer = document.getElementById("featured-trails");

  if (!featuredTrailsContainer) return;

  async function loadTrails() {
    try {
      const response = await fetch("data/trails.json");

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const trails = await response.json();
      displayFeaturedTrails(trails);
    } catch (error) {
      console.error("Error loading trails:", error);
      featuredTrailsContainer.innerHTML = `
        <p class="error">Unable to load trail information. Please try again later.</p>
      `;
    }
  }

  function displayFeaturedTrails(trails) {
    // Filter featured trails and limit to 3
    const featuredTrails = trails.filter((trail) => trail.featured).slice(0, 3);

    featuredTrailsContainer.innerHTML = featuredTrails
      .map(
        (trail) => `
      <article class="trail-card">
        <img src="images/trails/${trail.image}" alt="${trail.name}" loading="lazy">
        <div class="trail-info">
          <h3>${trail.name}</h3>
          <p><strong>Distance:</strong> ${trail.distance}</p>
          <p><strong>Elevation:</strong> ${trail.elevation}</p>
          <p><strong>Difficulty:</strong> ${trail.difficulty}</p>
          <button class="btn trail-details" data-id="${trail.id}">View Details</button>
        </div>
      </article>
    `
      )
      .join("");
  }

  loadTrails();
});
