document.addEventListener("DOMContentLoaded", function () {
  const upcomingEventsList = document.getElementById("upcoming-events");
  const runScheduleTable = document.getElementById("run-schedule");

  async function loadEvents() {
    try {
      const response = await fetch("data/events.json");

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const events = await response.json();

      if (upcomingEventsList) {
        displayUpcomingEvents(events);
      }

      if (runScheduleTable) {
        displayRunSchedule(events);
      }
    } catch (error) {
      console.error("Error loading events:", error);

      if (upcomingEventsList) {
        upcomingEventsList.innerHTML = `<li>Unable to load events</li>`;
      }

      if (runScheduleTable) {
        runScheduleTable.innerHTML = `<tr><td colspan="5">Schedule unavailable</td></tr>`;
      }
    }
  }

  function displayUpcomingEvents(events) {
    // Sort events by date and get the next 3
    const now = new Date();
    const upcoming = events
      .filter((event) => new Date(event.date) > now)
      .sort((a, b) => new Date(a.date) - new Date(b.date))
      .slice(0, 3);

    upcomingEventsList.innerHTML = upcoming
      .map(
        (event) => `
      <li>
        <strong>${event.name}</strong> - 
        ${new Date(event.date).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        })}
      </li>
    `
      )
      .join("");
  }

  function displayRunSchedule(events) {
    // Weekly runs (non-special events)
    const weeklyRuns = events.filter((event) => event.type === "weekly");

    const tbody = runScheduleTable.querySelector("tbody");
    tbody.innerHTML = weeklyRuns
      .map(
        (run) => `
      <tr>
        <td>${run.day}</td>
        <td>${run.time}</td>
        <td>${run.route}</td>
        <td>${run.level}</td>
        <td>${run.distance}</td>
      </tr>
    `
      )
      .join("");
  }

  loadEvents();
});
