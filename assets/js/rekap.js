// Recap page - Statistics and charts

let weeklyChart, agendaChart, classChart;

document.addEventListener("DOMContentLoaded", function () {
  setActiveNav();
  loadRecapData();
});

// =========================
// 📊 LOAD AND DISPLAY DATA
// =========================

function loadRecapData() {
  const user = JSON.parse(localStorage.getItem("user"));
  if (!user) return;

  const semuaJadwal = JSON.parse(localStorage.getItem("jadwalUser")) || {};
  const jadwalUser = semuaJadwal[user.nama] || [];

  const semuaAgenda = JSON.parse(localStorage.getItem("agendaUser")) || {};
  const agenda = semuaAgenda[user.nama] || [];

  const reminder = JSON.parse(localStorage.getItem("reminder")) || [];

  // Update totals
  document.getElementById("totalJadwal").innerText = jadwalUser.length || 0;
  document.getElementById("totalAgenda").innerText = agenda.length || 0;
  document.getElementById("totalReminder").innerText = reminder.length || 0;

  // Create charts
  createWeeklyChart(jadwalUser);
  createAgendaChart(agenda);
  createClassChart(jadwalUser);
}

// =========================
// 📈 WEEKLY SCHEDULE CHART (Bar Chart)
// =========================

function createWeeklyChart(jadwalUser) {
  const days = [
    t("sunday"),
    t("monday"),
    t("tuesday"),
    t("wednesday"),
    t("thursday"),
    t("friday"),
    t("saturday"),
  ];
  const dayCounts = [0, 0, 0, 0, 0, 0, 0];

  // Count schedules by day
  jadwalUser.forEach((jadwal) => {
    if (jadwal.tanggal) {
      const date = new Date(jadwal.tanggal);
      const dayIndex = date.getDay();
      dayCounts[dayIndex]++;
    }
  });

  const ctx = document.getElementById("weeklyChart").getContext("2d");

  if (weeklyChart) {
    weeklyChart.destroy();
  }

  weeklyChart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: days,
      datasets: [
        {
          label: t("schedule") || "Jadwal",
          data: dayCounts,
          backgroundColor: "rgba(59, 130, 246, 0.7)",
          borderColor: "rgba(59, 130, 246, 1)",
          borderWidth: 2,
          borderRadius: 8,
          hoverBackgroundColor: "rgba(59, 130, 246, 0.9)",
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false,
        },
      },
      scales: {
        y: {
          beginAtZero: true,
          max: Math.max(...dayCounts) + 1,
          ticks: {
            stepSize: 1,
            color: "#9fb0d8",
          },
          grid: {
            color: "rgba(155, 176, 216, 0.1)",
          },
        },
        x: {
          ticks: {
            color: "#9fb0d8",
          },
          grid: {
            display: false,
          },
        },
      },
    },
  });
}

// =========================
// ✅ AGENDA STATUS CHART (Pie Chart)
// =========================

function createAgendaChart(agenda) {
  const completed = agenda.filter((a) => a.done).length;
  const pending = agenda.length - completed;

  const ctx = document.getElementById("agendaChart").getContext("2d");

  if (agendaChart) {
    agendaChart.destroy();
  }

  agendaChart = new Chart(ctx, {
    type: "doughnut",
    data: {
      labels: [t("completed") || "Selesai", t("pending") || "Tertunda"],
      datasets: [
        {
          data: [completed, pending],
          backgroundColor: ["rgba(16, 185, 129, 0.7)", "rgba(156, 163, 175, 0.5)"],
          borderColor: ["rgba(16, 185, 129, 1)", "rgba(156, 163, 175, 1)"],
          borderWidth: 2,
          hoverOffset: 8,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: "bottom",
          labels: {
            color: "#9fb0d8",
            padding: 20,
            font: {
              size: 13,
            },
          },
        },
      },
    },
  });
}

// =========================
// 🎓 CLASS FREQUENCY CHART (Bar Chart - Top Classes)
// =========================

function createClassChart(jadwalUser) {
  const classCount = {};

  // Count schedule frequency by class name
  jadwalUser.forEach((jadwal) => {
    const className = jadwal.matkul || jadwal.mata_kuliah || "Kelas";
    classCount[className] = (classCount[className] || 0) + 1;
  });

  // Get top 5 classes
  const sortedClasses = Object.entries(classCount)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  const classNames = sortedClasses.map((item) => item[0]);
  const classCounts = sortedClasses.map((item) => item[1]);

  const ctx = document.getElementById("classChart").getContext("2d");

  if (classChart) {
    classChart.destroy();
  }

  classChart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: classNames,
      datasets: [
        {
          label: t("frequency") || "Frekuensi",
          data: classCounts,
          backgroundColor: "rgba(139, 92, 246, 0.7)",
          borderColor: "rgba(139, 92, 246, 1)",
          borderWidth: 2,
          borderRadius: 8,
          hoverBackgroundColor: "rgba(139, 92, 246, 0.9)",
        },
      ],
    },
    options: {
      indexAxis: "y",
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false,
        },
      },
      scales: {
        x: {
          beginAtZero: true,
          ticks: {
            stepSize: 1,
            color: "#9fb0d8",
          },
          grid: {
            color: "rgba(155, 176, 216, 0.1)",
          },
        },
        y: {
          ticks: {
            color: "#9fb0d8",
          },
          grid: {
            display: false,
          },
        },
      },
    },
  });
}

// =========================
// 🧭 NAVIGATION
// =========================

function goDashboard() {
  navigateTo("dashboard.html");
}

function goJadwal() {
  navigateTo("jadwal.html");
}

function goRekap() {
  navigateTo("rekap.html");
}

function goAgenda() {
  navigateTo("agenda.html");
}

function goSettings() {
  navigateTo("settings.html");
}
