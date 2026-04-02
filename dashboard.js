// =========================
// 🔐 CEK LOGIN
// =========================
const isLogin = localStorage.getItem("isLogin");

if (!isLogin) {
  alert("Harus login dulu!");
  window.location.href = "index.html";
}

// =========================
// 👤 AMBIL USER
// =========================
const user = JSON.parse(localStorage.getItem("user"));

if (!user) {
  window.location.href = "index.html";
}

// =========================
// 👋 GREETING
// =========================
document.getElementById("greeting").innerText = "Halo, " + user.nama + " 👋";

// =========================
// 📅 TANGGAL
// =========================
const today = new Date();

document.getElementById("date").innerText = today.toLocaleDateString("id-ID", {
  weekday: "long",
  day: "numeric",
  month: "long",
  year: "numeric",
});

// =========================
// 📊 AMBIL JADWAL DARI STORAGE (MULTI USER) + RENDER
// =========================
let semuaJadwal = JSON.parse(localStorage.getItem("jadwalUser")) || {};
let jadwalUser = semuaJadwal[user.nama] || [];

// FILTER JADWAL HARI INI (defensive: assume jadwal item has .hari index or weekday string)
const hariMap = {
  Minggu: 0,
  Senin: 1,
  Selasa: 2,
  Rabu: 3,
  Kamis: 4,
  Jumat: 5,
  Sabtu: 6,
};

const hariSekarang = today.toLocaleDateString("id-ID", { weekday: "long" });
const hariIndex = hariMap[hariSekarang];

const jadwalHariIni = jadwalUser.filter((j) => {
  if (typeof j.hari === "number") return j.hari === hariIndex;
  if (typeof j.hari === "string") return hariMap[j.hari] === hariIndex;
  return false;
});

// render
const jadwalList = document.getElementById("jadwalList");
jadwalList.innerHTML = "";

if (!jadwalHariIni || jadwalHariIni.length === 0) {
  const p = document.createElement("p");
  p.innerText = "Tidak ada jadwal";
  p.style.color = "#9fb0d8";
  jadwalList.appendChild(p);
} else {
  jadwalHariIni.forEach((j, idx) => {
    const div = document.createElement("div");
    div.classList.add("jadwal-grid", "fade-in");
    div.style.animationDelay = idx * 60 + "ms";

    div.innerHTML = `
            <div class="jam">${getJam(j.jam) || j.jam || ""}</div>
            <div class="matkul">${j.matkul || "Unnamed"}</div>
        `;

    jadwalList.appendChild(div);
  });
}

// update counts in header stats
document.getElementById("todayCount").innerText =
  (jadwalHariIni && jadwalHariIni.length) || 0;

// =========================
// ⏰ FORMAT JAM
// =========================
function getJam(jam) {
  const map = {
    1: "08:00",
    2: "10:00",
    3: "11:00",
    4: "13:00",
  };
  return map[jam];
}

// =========================
// 📌 DATA AGENDA & REMINDER (sementara)
// =========================
const agenda = JSON.parse(localStorage.getItem("agenda")) || [
  "Kerjakan tugas kelompok",
  "Meeting jam 19:00",
];

const reminder = JSON.parse(localStorage.getItem("reminder")) || [
  "Kuliah hari ini",
  "Mulai 30 menit lagi",
];

// =========================
// 📝 RENDER AGENDA
// =========================
const agendaList = document.getElementById("agendaList");

agenda.forEach((a, idx) => {
  const li = document.createElement("li");
  li.innerText = "✔ " + a;
  li.classList.add("fade-in");
  li.style.animationDelay = 120 + idx * 50 + "ms";
  agendaList.appendChild(li);
});

document.getElementById("agendaCount").innerText = agenda.length;

// =========================
// 🔔 RENDER REMINDER
// =========================
const reminderList = document.getElementById("reminderList");

reminder.forEach((r, idx) => {
  const li = document.createElement("li");
  li.innerText = "🔔 " + r;
  li.classList.add("fade-in");
  li.style.animationDelay = 160 + idx * 60 + "ms";
  reminderList.appendChild(li);
});

document.getElementById("reminderCount").innerText = reminder.length;

// small live clock update under date
function updateClock() {
  const now = new Date();
  const time = now.toLocaleTimeString("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
  });
  const dateEl = document.getElementById("date");
  if (dateEl) {
    dateEl.innerText = `${today.toLocaleDateString("id-ID", { weekday: "long", day: "numeric", month: "long", year: "numeric" })} • ${time}`;
  }
}
updateClock();
setInterval(updateClock, 30_000);

// =========================
// 🚀 NAVIGASI
// =========================
function goDashboard() {
  window.location.href = "dashboard.html";
}

function goJadwal() {
  window.location.href = "jadwal.html";
}

function goRekap() {
  window.location.href = "rekap.html";
}

function goAgenda() {
  window.location.href = "agenda.html";
}

// =========================
// 🚪 LOGOUT
// =========================
function logout() {
  localStorage.removeItem("isLogin");
  localStorage.removeItem("user");
  alert("Logout berhasil!");
  window.location.href = "rgl.html";
}

// =========================
// 🎯 NAVBAR ACTIVE EFFECT
// =========================
document.addEventListener("DOMContentLoaded", function () {
  const navItems = document.querySelectorAll(".nav-item");

  navItems.forEach((item) => {
    item.addEventListener("click", () => {
      navItems.forEach((i) => i.classList.remove("active"));
      item.classList.add("active");
    });
  });
});

// =========================
// Floating navbar: hide on scroll down, show on scroll up
// =========================
(function setupFloatingNavbar() {
  const navbar = document.querySelector(".navbar");
  if (!navbar) return;
  let lastY = window.scrollY || 0;
  let ticking = false;

  window.addEventListener("scroll", () => {
    const y = window.scrollY || 0;
    if (!ticking) {
      window.requestAnimationFrame(() => {
        if (y - lastY > 10) navbar.classList.add("hide");
        else if (lastY - y > 10) navbar.classList.remove("hide");
        lastY = y;
        ticking = false;
      });
      ticking = true;
    }
  });
})();
