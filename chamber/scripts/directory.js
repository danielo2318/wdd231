const container = document.getElementById("membersContainer");

async function getMembers() {
  try {
    const response = await fetch("data/members.json");
    const data = await response.json();
    displayMembers(data);
  } catch (error) {
    console.error("Error fetching members:", error);
  }
}

function displayMembers(members) {
  container.innerHTML = "";
  members.forEach((member) => {
    const card = document.createElement("section");
    card.classList.add("member-card");
    card.innerHTML = `
      <img src="images/${member.image}" alt="${
      member.name
    } logo" loading="lazy" />
      <h3>${member.name}</h3>
      <p class="tagline">${member.tagline}</p>
      <p><strong>Email:</strong> <a href="mailto:${
        member.email || "info@email.com"
      }">${member.email || "info@email.com"}</a></p>
      <p><strong>Phone:</strong> ${member.phone}</p>
      <p><strong>Website:</strong> <a href="${
        member.website
      }" target="_blank">${member.website}</a></p>
    `;
    container.appendChild(card);
  });
}

getMembers();
