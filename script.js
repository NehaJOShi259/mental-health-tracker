const moods = ["Happy", "Sad", "Angry", "Anxious", "Neutral"];
const quotes = [
  "You’re doing better than you think.",
  "Progress, not perfection.",
  "Your feelings are valid.",
  "Small steps still move you forward.",
  "Breathe. You’ve got this!",
];

const moodData = JSON.parse(localStorage.getItem("moods") || "[]");

const historyList = document.getElementById("history");
const quoteP = document.getElementById("quote");
const ctx = document.getElementById("moodChart");
let chart;

function addMood(mood) {
  const today = new Date().toISOString().slice(0, 10);
  moodData.push({ date: today, mood });
  localStorage.setItem("moods", JSON.stringify(moodData));
  render();
}

function render() {
  historyList.innerHTML = "";
  moodData.slice(-10).reverse().forEach(({ date, mood }) => {
    const li = document.createElement("li");
    li.textContent = `${date} – ${mood}`;
    historyList.appendChild(li);
  });

  const counts = moods.map(
    m => moodData.filter(item => item.mood === m).length
  );

  if (chart) chart.destroy();
  chart = new Chart(ctx, {
    type: "pie",
    data: {
      labels: moods,
      datasets: [{
        data: counts,
        backgroundColor: [
          "#2ecc71", "#e74c3c", "#e67e22", "#9b59b6", "#3498db"
        ]
      }]
    },
    options: { responsive: false }
  });

  quoteP.textContent = quotes[Math.floor(Math.random() * quotes.length)];
}

document.querySelectorAll("[data-mood]").forEach(btn =>
  btn.addEventListener("click", () => addMood(btn.dataset.mood))
);

render();
