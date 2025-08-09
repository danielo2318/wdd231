async function loadAttractions() {
  try {
    const response = await fetch("data/attractions.json");
    const attractions = await response.json();
    displayAttractions(attractions);
  } catch (error) {
    console.error("Error loading attractions:", error);
  }
}

// Display attractions 
function displayAttractions(attractions) {
  const container = document.getElementById("attractions-container");
  container.innerHTML = "";

  attractions.forEach((attraction) => {
    const card = document.createElement("article");
    card.className = "attraction-card";
    card.innerHTML = `
      <figure>
        <img src="images/${attraction.image}" alt="${attraction.name}" loading="lazy">
      </figure>
      <div class="attraction-content">
        <h3>${attraction.name}</h3>
        <address>${attraction.address}</address>
        <p>${attraction.description}</p>
        <a href="#" class="learn-more-btn">Learn More</a>
      </div>
    `;
    container.appendChild(card);
  });
}

// Track visits withlocalStorage
function trackVisits() {
  const now = Date.now();
  const lastVisit = localStorage.getItem("lastVisit");
  const visitCount = localStorage.getItem("visitCount") || 0;

  // Update visit count
  localStorage.setItem("visitCount", parseInt(visitCount) + 1);
  document.getElementById("visit-count").textContent =
    localStorage.getItem("visitCount");

  // Calculate days since last visit
  if (!lastVisit) {
    document.getElementById("visit-message").textContent =
      "Welcome! Let us know if you have any questions.";
  } else {
    const daysSince = Math.floor((now - lastVisit) / (1000 * 60 * 60 * 24));

    if (daysSince === 0) {
      document.getElementById("visit-message").textContent =
        "Back so soon! Awesome!";
    } else {
      const dayText = daysSince === 1 ? "day" : "days";
      document.getElementById(
        "visit-message"
      ).textContent = `You last visited ${daysSince} ${dayText} ago.`;
    }
  }

  // Update last visit time
  localStorage.setItem("lastVisit", now);
}

document.addEventListener("DOMContentLoaded", () => {
  loadAttractions();
  trackVisits();
});
