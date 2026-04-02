/* Jadwal per-user with start/end times, calendar tab and CRUD */
const grid = document.getElementById("grid");

const user = JSON.parse(localStorage.getItem("user"));
if (!user) window.location.href = "index.html";

let semuaJadwal = JSON.parse(localStorage.getItem("jadwalUser")) || {};
let jadwal = semuaJadwal[user.nama] || [];
let editIndex = null;

const days = ["", "Senin", "Selasa", "Rabu", "Kamis", "Jumat"];
const times = ["08:00", "09:00", "10:00", "11:00", "13:00", "14:00", "15:00"];

function saveJadwal() {
  semuaJadwal[user.nama] = jadwal;
  localStorage.setItem("jadwalUser", JSON.stringify(semuaJadwal));
}

function renderGrid() {
  grid.innerHTML = "";

  // header days
  days.forEach((d) => {
    const div = document.createElement("div");
    div.className = "day";
    div.innerText = d;
    grid.appendChild(div);
  });

  // time rows
  // compute grid rows based on times array
  times.forEach((time, i) => {
    const timeDiv = document.createElement("div");
    timeDiv.className = "time";
    timeDiv.innerText = time;
    timeDiv.style.gridColumn = 1;
    timeDiv.style.gridRow = i + 2;
    grid.appendChild(timeDiv);

    for (let d = 1; d <= 5; d++) {
      const slot = document.createElement("div");
      slot.className = "slot";
      slot.style.gridColumn = d + 1;
      slot.style.gridRow = i + 2;
      grid.appendChild(slot);
    }
  });

  // render jadwal items
  jadwal.forEach((j, index) => {
    const div = document.createElement("div");
    div.className = "class " + (j.warna || "blue");

    // place at column = hari+1; row - find row index of jamMulai in times
    const col = Number(j.hari) + 1;
    const row = Math.max(2, times.indexOf(j.jamMulai) + 2);
    div.style.gridColumn = col;
    div.style.gridRow = row;

    div.innerHTML = `
      <div style="display:flex;justify-content:space-between;align-items:center">
        <div style="font-weight:700">${j.matkul}</div>
        <div style="display:flex;gap:6px">
          <button onclick="editJadwal(${index})">✏️</button>
          <button onclick="hapusJadwal(${index})">✕</button>
        </div>
      </div>
      <div style="margin-top:6px;font-size:12px">${j.jamMulai} - ${j.jamSelesai}</div>
    `;

    grid.appendChild(div);
  });
}

// MODAL
function openModal() {
  document.getElementById("modal").style.display = "flex";
}

function closeModal() {
  document.getElementById("modal").style.display = "none";
  clearModal();
}

function clearModal() {
  document.getElementById("matkul").value = "";
  document.getElementById("hari").value = "1";
  document.getElementById("jamMulai").value = "08:00";
  document.getElementById("jamSelesai").value = "09:30";
  document.getElementById("warna").value = "blue";
  editIndex = null;
}

// TAMBAH
function tambahJadwal() {
  const matkul = document.getElementById("matkul").value.trim();
  const hari = document.getElementById("hari").value;
  const jamMulai = document.getElementById("jamMulai").value;
  const jamSelesai = document.getElementById("jamSelesai").value;
  const warna = document.getElementById("warna").value;
  if (!matkul) return alert("Isi mata kuliah!");

  const item = {
    mata_kuliah: matkul,
    matkul: matkul,
    hari,
    jamMulai,
    jamSelesai,
    warna,
  };
  if (editIndex !== null) {
    jadwal[editIndex] = item;
    editIndex = null;
  } else jadwal.push(item);
  saveJadwal();
  closeModal();
  renderGrid();
}

// HAPUS
function hapusJadwal(index) {
  if (!confirm("Hapus jadwal ini?")) return;
  jadwal.splice(index, 1);
  saveJadwal();
  renderGrid();
}

function editJadwal(index) {
  const j = jadwal[index];
  document.getElementById("matkul").value = j.matkul;
  document.getElementById("hari").value = j.hari;
  document.getElementById("jamMulai").value = j.jamMulai || "08:00";
  document.getElementById("jamSelesai").value = j.jamSelesai || "09:30";
  document.getElementById("warna").value = j.warna || "blue";
  editIndex = index;
  openModal();
}

// TAB: switch between grid and calendar
document.addEventListener("DOMContentLoaded", function () {
  const tabs = document.querySelectorAll(".tabs button");
  tabs.forEach((b, i) => {
    b.addEventListener("click", () => {
      tabs.forEach((t) => t.classList.remove("active"));
      b.classList.add("active");
      if (i === 0) {
        // Minggu Ini
        grid.style.display = "grid";
        const cal = document.getElementById("calendar");
        if (cal) cal.remove();
      } else {
        // Kalender
        grid.style.display = "none";
        renderCalendar();
      }
    });
  });
});

function renderCalendar() {
  let cal = document.getElementById("calendar");
  if (cal) cal.remove();
  cal = document.createElement("div");
  cal.id = "calendar";
  cal.style.marginTop = "12px";
  // simple month grid
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  const first = new Date(year, month, 1);
  const last = new Date(year, month + 1, 0);
  const startDay = first.getDay(); // 0 sun
  const daysInMonth = last.getDate();
  const table = document.createElement("div");
  table.style.display = "grid";
  table.style.gridTemplateColumns = "repeat(7,1fr)";
  table.style.gap = "6px";
  for (let i = 0; i < 7; i++) {
    const h = document.createElement("div");
    h.style.fontWeight = "700";
    h.style.color = "#9fb0d8";
    h.style.textAlign = "center";
    h.innerText = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][i];
    table.appendChild(h);
  }
  for (let i = 0; i < startDay; i++) {
    const e = document.createElement("div");
    table.appendChild(e);
  }
  for (let d = 1; d <= daysInMonth; d++) {
    const cell = document.createElement("div");
    cell.style.minHeight = "70px";
    cell.style.padding = "8px";
    cell.style.borderRadius = "8px";
    cell.style.background = "rgba(255,255,255,0.02)";
    const dayNum = document.createElement("div");
    dayNum.style.fontWeight = "700";
    dayNum.style.fontSize = "13px";
    dayNum.style.color = "#cfe6ff";
    dayNum.innerText = d;
    cell.appendChild(dayNum);
    // show classes that fall on this weekday
    const weekday = new Date(year, month, d).getDay(); // 0..6
    const weekdayName = [
      "Minggu",
      "Senin",
      "Selasa",
      "Rabu",
      "Kamis",
      "Jumat",
      "Sabtu",
    ][weekday];
    const matches = jadwal.filter((j) => {
      if (!j.hari) return false;
      const h = Number(j.hari);
      return h === weekday;
    });
    matches.forEach((m) => {
      const it = document.createElement("div");
      it.style.fontSize = "12px";
      it.style.marginTop = "6px";
      it.innerText = `${m.matkul} ${m.jamMulai || ""}`;
      cell.appendChild(it);
    });
    table.appendChild(cell);
  }
  cal.appendChild(table);
  document.querySelector(".app").appendChild(cal);
}

function backDashboard() {
  window.location.href = "dashboard.html";
}

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
// INIT
renderGrid();

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
