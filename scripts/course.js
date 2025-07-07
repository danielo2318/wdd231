const courses = [
  {
    subject: "CSE",
    number: 110,
    title: "Introduction to Programming",
    credits: 2,
    completed: true,
  },
  {
    subject: "WDD",
    number: 130,
    title: "Web Fundamentals",
    credits: 2,
    completed: true,
  },
  {
    subject: "CSE",
    number: 111,
    title: "Programming with Functions",
    credits: 2,
    completed: true,
  },
  {
    subject: "CSE",
    number: 210,
    title: "Programming with Classes",
    credits: 2,
    completed: true,
  },
  {
    subject: "WDD",
    number: 131,
    title: "Dynamic Web Fundamentals",
    credits: 2,
    completed: true,
  },
  {
    subject: "WDD",
    number: 231,
    title: "Frontend Web Development I",
    credits: 2,
    completed: false,
  },
];

const courseList = document.getElementById("course-list");
const creditTotal = document.getElementById("credit-total");

function renderCourses(courseArray) {
  courseList.innerHTML = "";
  let totalCredits = 0;

  courseArray.forEach((course) => {
    const card = document.createElement("div");
    card.className = "course-card";
    if (course.completed) card.classList.add("completed");

    card.innerHTML = `
      <h3>${course.subject} ${course.number} - ${course.title}</h3>
      <p>Credits: ${course.credits}</p>
    `;
    courseList.appendChild(card);
    totalCredits += course.credits;
  });

  creditTotal.textContent = totalCredits;
}

// Initial display
renderCourses(courses);

// Filters
document
  .getElementById("all-btn")
  .addEventListener("click", () => renderCourses(courses));
document.getElementById("wdd-btn").addEventListener("click", () => {
  const filtered = courses.filter((c) => c.subject === "WDD");
  renderCourses(filtered);
});
document.getElementById("cse-btn").addEventListener("click", () => {
  const filtered = courses.filter((c) => c.subject === "CSE");
  renderCourses(filtered);
});
