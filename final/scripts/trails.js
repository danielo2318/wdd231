export async function fetchTrails() {
  try {
    const response = await fetch("data/trails.json");
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const trails = await response.json();
    return trails;
  } catch (error) {
    console.error("Error fetching trails:", error);
    throw error;
  }
}

export function generateTrailsHTML(trails) {
  return trails
    .map(
      (trail) => `
    <article class="trail-card" tabindex="0" aria-label="Trail: ${trail.name}, Difficulty: ${trail.difficulty}">
      <img src="images/trails/${trail.image}" alt="${trail.name}" loading="lazy" width="300" height="200">
      <div class="trail-info">
        <h3>${trail.name}</h3>
        <p><strong>Distance:</strong> ${trail.distance}</p>
        <p><strong>Elevation:</strong> ${trail.elevation}</p>
        <p><strong>Difficulty:</strong> ${trail.difficulty}</p>
        <button class="btn trail-details" data-id="${trail.id}" aria-haspopup="dialog">View Details</button>
      </div>
    </article>
  `
    )
    .join("");
}

export function getTrailById(trails, id) {
  return trails.find((trail) => trail.id === id);
}
