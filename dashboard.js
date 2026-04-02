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
// 👋 GREETING (safe)
// =========================
try {
  const name =
    user && typeof user.nama === "string"
      ? user.nama
      : user && user.nim
        ? user.nim
        : "Mahasiswa";
  const greetingEl = document.getElementById("greeting");
  if (greetingEl) greetingEl.innerText = `Halo, ${name} 👋`;
} catch (err) {
  console.error("Greeting render error", err);
}

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
function refreshData() {
  // jadwal per-user
  let semuaJadwal = JSON.parse(localStorage.getItem("jadwalUser")) || {};
  let jadwalUser = semuaJadwal[user.nama] || [];

  // FILTER JADWAL HARI INI
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
    // accept number, numeric string, or weekday name
    if (typeof j.hari === "number") return j.hari === hariIndex;
    if (typeof j.hari === "string") {
      if (!isNaN(Number(j.hari))) return Number(j.hari) === hariIndex;
      return hariMap[j.hari] === hariIndex;
    }
    return false;
  });

  // render jadwal
  const jadwalList = document.getElementById("jadwalList");
  if (jadwalList) {
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
            <div class="jam">${getJam(j.jam) || j.jamMulai || j.jam || ""}</div>
            <div class="matkul">${j.matkul || "Unnamed"}</div>
        `;

        jadwalList.appendChild(div);
      });
    }
  }

  // update counts in header stats
  const todayCountEl = document.getElementById("todayCount");
  if (todayCountEl)
    todayCountEl.innerText = (jadwalHariIni && jadwalHariIni.length) || 0;

  // AGENDA per-user (avoid demo defaults)
  const semuaAgenda = JSON.parse(localStorage.getItem("agendaUser")) || {};
  const agenda = semuaAgenda[user.nama] || [];
  const agendaList = document.getElementById("agendaList");
  if (agendaList) {
    agendaList.innerHTML = "";
    if (agenda.length === 0) {
      const p = document.createElement("p");
      p.innerText = "Tidak ada agenda";
      p.style.color = "#9fb0d8";
      agendaList.appendChild(p);
    } else {
      agenda.forEach((a, idx) => {
        const li = document.createElement("li");
        const text =
          typeof a === "string" ? a : a && a.text ? a.text : String(a);
        const done = typeof a === "object" && a && a.done ? true : false;
        li.innerText = (done ? "✔ " : "• ") + text;
        li.classList.add("fade-in");
        li.style.animationDelay = 120 + idx * 50 + "ms";
        agendaList.appendChild(li);
      });
    }
  }
  const agendaCount = document.getElementById("agendaCount");
  if (agendaCount) agendaCount.innerText = agenda.length;

  // REMINDER per-user (avoid demo defaults)
  const semuaReminder = JSON.parse(localStorage.getItem("reminderUser")) || {};
  const reminder = semuaReminder[user.nama] || [];
  const reminderList = document.getElementById("reminderList");
  if (reminderList) {
    reminderList.innerHTML = "";
    if (reminder.length === 0) {
      const p = document.createElement("p");
      p.innerText = "Tidak ada reminder";
      p.style.color = "#9fb0d8";
      reminderList.appendChild(p);
    } else {
      reminder.forEach((r, idx) => {
        const li = document.createElement("li");
        li.innerText = "🔔 " + r;
        li.classList.add("fade-in");
        li.style.animationDelay = 160 + idx * 60 + "ms";
        reminderList.appendChild(li);
      });
    }
  }
  const reminderCount = document.getElementById("reminderCount");
  if (reminderCount) reminderCount.innerText = reminder.length;
}

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

// initial render (refreshData handles agenda & reminders per-user)
refreshData();
// refresh every 5s to catch cross-tab changes if storage event not fired
setInterval(refreshData, 5000);

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
  window.location.href = "index.html";
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

// storage sync (fires on other tabs) - refresh when data changes
window.addEventListener("storage", function (e) {
  if (!e.key) return;
  if (
    [
      "jadwalUser",
      "agendaUser",
      "reminderUser",
      "user",
      "isLogin",
      "lastUpdate",
    ].includes(e.key)
  )
    refreshData();
});
