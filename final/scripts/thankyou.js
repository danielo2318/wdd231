document.getElementById("year").textContent = new Date().getFullYear();

const params = new URLSearchParams(window.location.search);
const dataList = document.getElementById("submitted-data");

if (params.toString()) {
  params.forEach((value, key) => {
    const li = document.createElement("li");
    li.textContent = `${key}: ${value}`;
    dataList.appendChild(li);
  });
} else {
  dataList.innerHTML = "<li>No form data received.</li>";
}
