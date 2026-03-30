// =========================
// 🔐 CEK LOGIN
// =========================
const isLogin = localStorage.getItem("isLogin");

if (!isLogin) {
    alert("Harus login dulu!");
    window.location.href = "rgl.html";
}

// =========================
// 👤 AMBIL USER
// =========================
const user = JSON.parse(localStorage.getItem("user"));

if (!user) {
    window.location.href = "rgl.html";
}

// =========================
// 👋 GREETING
// =========================
document.getElementById("greeting").innerText =
    "Halo, " + user.nama + " 👋";

// =========================
// 📅 TANGGAL
// =========================
const today = new Date();

document.getElementById("date").innerText =
    today.toLocaleDateString("id-ID", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric"
    });

// =========================
// 📊 AMBIL JADWAL DARI STORAGE (MULTI USER)
// =========================
let semuaJadwal = JSON.parse(localStorage.getItem("jadwalUser")) || {};
let jadwalUser = semuaJadwal[user.nama] || [];

// FILTER JADWAL HARI INI
const hariMap = {
    "Minggu": 0,
    "Senin": 1,
    "Selasa": 2,
    "Rabu": 3,
    "Kamis": 4,
    "Jumat": 5,
    "Sabtu": 6
};

const hariSekarang = today.toLocaleDateString("id-ID", { weekday: "long" });
const hariIndex = hariMap[hariSekarang];

// =========================
// 📅 RENDER JADWAL HARI INI
// =========================
const jadwalList = document.getElementById("jadwalList");
jadwalList.innerHTML = "";

if (jadwalHariIni.length === 0) {
    jadwalList.innerHTML = "<p>Tidak ada jadwal</p>";
} else {
    jadwalHariIni.forEach(j => {
        const div = document.createElement("div");
        div.classList.add("jadwal-grid");

        div.innerHTML = `
            <div class="jam">${getJam(j.jam)}</div>
            <div class="matkul">${j.matkul}</div>
        `;

        jadwalList.appendChild(div);
    });
}

// =========================
// ⏰ FORMAT JAM
// =========================
function getJam(jam) {
    const map = {
        "1": "08:00",
        "2": "10:00",
        "3": "11:00",
        "4": "13:00"
    };
    return map[jam];
}

// =========================
// 📌 DATA AGENDA & REMINDER (sementara)
// =========================
const agenda = [
    "Kerjakan tugas kelompok",
    "Meeting jam 19:00"
];

const reminder = [
    "Kuliah hari ini",
    "Mulai 30 menit lagi"
];

// =========================
// 📝 RENDER AGENDA
// =========================
const agendaList = document.getElementById("agendaList");

agenda.forEach(a => {
    const li = document.createElement("li");
    li.innerText = "✔ " + a;
    agendaList.appendChild(li);
});

// =========================
// 🔔 RENDER REMINDER
// =========================
const reminderList = document.getElementById("reminderList");

reminder.forEach(r => {
    const li = document.createElement("li");
    li.innerText = "🔔 " + r;
    reminderList.appendChild(li);
});

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
document.addEventListener("DOMContentLoaded", function() {

    const navItems = document.querySelectorAll(".nav-item");

    navItems.forEach(item => {
        item.addEventListener("click", () => {
            navItems.forEach(i => i.classList.remove("active"));
            item.classList.add("active");
        });
    });

});