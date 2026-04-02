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

    const left = document.createElement("div");
    left.className = "agenda-left";
    const box = document.createElement("div");
    box.className = "checkbox " + (a.done ? "checked" : "");
    box.addEventListener("click", () => toggleDone(i));
    const span = document.createElement("span");
    span.className = "agenda-text " + (a.done ? "done" : "");
    span.textContent = a.text;
    left.appendChild(box);
    left.appendChild(span);

    const actions = document.createElement("div");
    actions.className = "action-btn";
    const editBtn = document.createElement("button");
    const editSpan = document.createElement("span");
    editSpan.className = "material-symbols-outlined";
    editSpan.style.fontSize = "16px";
    editSpan.innerText = "edit";
    editBtn.appendChild(editSpan);
    editBtn.addEventListener("click", () => editAgenda(i));
    const delBtn = document.createElement("button");
    const delSpan = document.createElement("span");
    delSpan.className = "material-symbols-outlined";
    delSpan.style.fontSize = "16px";
    delSpan.innerText = "delete";
    delBtn.appendChild(delSpan);
    delBtn.addEventListener("click", () => hapusAgenda(i));
    actions.appendChild(editBtn);
    actions.appendChild(delBtn);

    li.appendChild(left);
    li.appendChild(actions);
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
  toast("Agenda ditambahkan", "success");
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
