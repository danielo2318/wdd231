function formatDate(timestamp) {
  const date = new Date(timestamp);
  return date.toLocaleString("en-US", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

// Main function to display confirmation
function displayConfirmation() {
  
  const params = new URLSearchParams(window.location.search);

  const membershipTypes = {
    np: "NP Membership (Non-Profit)",
    bronze: "Bronze Membership ($100/year)",
    silver: "Silver Membership ($200/year)",
    gold: "Gold Membership ($300/year)",
  };

  // Generate confirmation HTML
  document.getElementById("confirmation-results").innerHTML = `
    <h2>Thank you for your application, ${params.get("firstName")}!</h2>
    <div class="confirmation-details">
      <p><strong>Full Name:</strong> ${params.get("firstName")} ${params.get(
    "lastName"
  )}</p>
      <p><strong>Business:</strong> ${params.get("businessName")}</p>
      <p><strong>Position:</strong> ${
        params.get("position") || "Not specified"
      }</p>
      <p><strong>Email:</strong> ${params.get("email")}</p>
      <p><strong>Phone:</strong> ${params.get("phone")}</p>
      <p><strong>Membership Type:</strong> ${
        membershipTypes[params.get("membership")]
      }</p>
      <p><strong>Application Date:</strong> ${formatDate(
        params.get("timestamp")
      )}</p>
    </div>
    <div class="next-steps">
      <h3>Next Steps</h3>
      <p>We will contact you within 2 business days to complete your registration.</p>
      ${
        params.get("membership") !== "np"
          ? "<p>You will receive an email with payment instructions.</p>"
          : ""
      }
    </div>
  `;

  document.getElementById("year").textContent = new Date().getFullYear();
  document.getElementById("lastModified").textContent = document.lastModified;
}

document.addEventListener("DOMContentLoaded", displayConfirmation);
