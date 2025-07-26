const spotlightContainer = document.getElementById("spotlight-container");

async function getMemberData() {
  try {
    const response = await fetch("data/members.json");
    if (!response.ok) throw new Error("Network error");
    const members = await response.json();

    // filter Gold (3) and Silver (2) members
    const spotlightMembers = members.filter(
      (m) => m.membership === 3 || m.membership === 2
    );

    // select 2-3 random members
    const selectedMembers = [...spotlightMembers]
      .sort(() => 0.5 - Math.random())
      .slice(0, Math.min(3, spotlightMembers.length));

    // clear container
    spotlightContainer.innerHTML = "";

    // create cards
    selectedMembers.forEach((member) => {
      const card = document.createElement("section");
      card.className = "member-card";

      const membershipLevel = member.membership === 3 ? "Gold" : "Silver";
      const websiteUrl = member.website.startsWith("http")
        ? member.website
        : `https://${member.website}`;

      card.innerHTML = `
        <img src="images/${member.image}" alt="${
        member.name
      } logo" loading="lazy" 
             onerror="this.src='images/placeholder-logo.png'">
        <div class="card-content">
          <h3>${member.name}</h3>
          <p class="membership-badge ${membershipLevel.toLowerCase()}">${membershipLevel} Member</p>
          <p class="tagline">${member.tagline}</p>
          <div class="contact-details">
            <p><span>📞</span> ${member.phone}</p>
            <p><span>📍</span> ${member.address}</p>
          </div>
          <a href="${websiteUrl}" target="_blank" rel="noopener" class="website-link">
            Visit Website
          </a>
        </div>
      `;
      spotlightContainer.appendChild(card);
    });
  } catch (error) {
    console.error("Error loading spotlights:", error);
    spotlightContainer.innerHTML = `
      <p class="error-message">Featured members unavailable. <button onclick="getMemberData()">Retry</button></p>
    `;
  }
}


document.addEventListener("DOMContentLoaded", getMemberData);
