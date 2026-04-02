// 🔐 USER
let user = JSON.parse(localStorage.getItem("user"));

if (!user) {
  window.location.href = "index.html";
}

// DATA PER USER
let semuaAgenda = JSON.parse(localStorage.getItem("agendaUser")) || {};
let agenda = semuaAgenda[user.nama] || [];

let editIndex = null;

// RENDER
function renderAgenda() {
  const list = document.getElementById("listAgenda");
  list.innerHTML = "";

  agenda.forEach((a, i) => {
    const li = document.createElement("li");

    li.innerHTML = `
            <div class="agenda-left">
                <div class="checkbox ${a.done ? "checked" : ""}" onclick="toggleDone(${i})"></div>
                <span class="agenda-text ${a.done ? "done" : ""}">${a.text}</span>
            </div>
            <div class="action-btn">
                <button onclick="editAgenda(${i})">✏️</button>
                <button onclick="hapusAgenda(${i})">❌</button>
            </div>
        `;

    list.appendChild(li);
  });
}

// TAMBAH / EDIT
function tambahAgenda() {
  const input = document.getElementById("inputAgenda");
  const value = input.value;

  if (!value) return alert("Isi dulu!");

  if (editIndex !== null) {
    agenda[editIndex].text = value;
    editIndex = null;
  } else {
    agenda.push({
      text: value,
      done: false,
    });
  }

  save();
  input.value = "";
  renderAgenda();
}

// TOGGLE CHECK
function toggleDone(i) {
  agenda[i].done = !agenda[i].done;
  save();
  renderAgenda();
}

// EDIT
function editAgenda(i) {
  document.getElementById("inputAgenda").value = agenda[i].text;
  editIndex = i;
}

// HAPUS
function hapusAgenda(i) {
  agenda.splice(i, 1);
  save();
  renderAgenda();
}

// SAVE
function save() {
  semuaAgenda[user.nama] = agenda;
  localStorage.setItem("agendaUser", JSON.stringify(semuaAgenda));
}
// navigasi
function goDashboard() {
  window.location.href = "dashboard.html";
}

function goJadwal() {
  window.location.href = "jadwal.html";
}

function goRekap() {
  window.location.href = "rekap.html";
}

// init
renderAgenda();

// Floating navbar: hide on scroll down, show on scroll up
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
