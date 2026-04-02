/* Jadwal per-user with start/end times, calendar tab and CRUD (assets copy) */
const grid = document.getElementById("grid");

const user = JSON.parse(localStorage.getItem("user"));
if (!user) window.location.href = "../index.html";

let semuaJadwal = JSON.parse(localStorage.getItem("jadwalUser")) || {};
let jadwal = semuaJadwal[user.nama] || [];
let editIndex = null;

const days = ["", "Senin", "Selasa", "Rabu", "Kamis", "Jumat"];
const times = ["08:00", "09:00", "10:00", "11:00", "13:00", "14:00", "15:00"];

function timeToMinutes(t) {
  if (!t) return 0;
  const parts = t.split(":");
  const h = parseInt(parts[0], 10) || 0;
  const m = parseInt(parts[1], 10) || 0;
  return h * 60 + m;
}

function normalizeTime(t) {
  if (!t) return "";
  const low = String(t).trim().toLowerCase();
  const ampmMatch = low.match(/(am|pm)$/);
  if (ampmMatch) {
    const conv = parseAMPMto24(low);
    if (conv) return conv;
  }
  const p = t.split(":");
  if (p.length < 2) return t;
  const hh = String(Number(p[0])).padStart(2, "0");
  const mm = String(Number(p[1])).padStart(2, "0");
  return `${hh}:${mm}`;
}

function parseAMPMto24(s) {
  if (!s) return null;
  const cleaned = s.replace(/\./g, "").trim().toLowerCase();
  const m = cleaned.match(/^(\d{1,2})(?::(\d{1,2}))?\s*(am|pm)$/);
  if (!m) return null;
  let hh = parseInt(m[1], 10);
  const mm = m[2] ? parseInt(m[2], 10) : 0;
  const ap = m[3];
  if (ap === "pm" && hh < 12) hh += 12;
  if (ap === "am" && hh === 12) hh = 0;
  return `${String(hh).padStart(2, "0")}:${String(mm).padStart(2, "0")}`;
}

function saveJadwal() {
  semuaJadwal[user.nama] = jadwal;
  localStorage.setItem("jadwalUser", JSON.stringify(semuaJadwal));
}

function renderGrid() {
  grid.innerHTML = "";

  days.forEach((d) => {
    const div = document.createElement("div");
    div.className = "day";
    div.innerText = d;
    grid.appendChild(div);
  });

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
      slot.id = `slot-d${d}-r${i}`;
      slot.dataset.day = d;
      slot.dataset.row = i;
      slot.style.gridColumn = d + 1;
      slot.style.gridRow = i + 2;
      slot.style.display = "flex";
      slot.style.flexDirection = "column";
      slot.style.gap = "6px";
      slot.style.padding = "6px";
      grid.appendChild(slot);
    }
  });

  jadwal.forEach((j, index) => {
    const dayKey = Number(j.hari);
    const startIdx = Math.max(0, times.indexOf(j.jamMulai));
    const slotId = `slot-d${dayKey}-r${startIdx}`;
    const slot = document.getElementById(slotId);

    const item = document.createElement("div");
    item.className = "class-item " + (j.warna || "blue");

    const header = document.createElement("div");
    header.style.display = "flex";
    header.style.justifyContent = "space-between";
    header.style.alignItems = "center";

    const title = document.createElement("div");
    title.style.fontWeight = "700";
    title.textContent = j.matkul || j.mata_kuliah || "";

    const controls = document.createElement("div");
    controls.style.display = "flex";
    controls.style.gap = "6px";
    controls.style.alignItems = "center";

    const label = document.createElement("label");
    label.style.display = "flex";
    label.style.alignItems = "center";
    label.style.gap = "6px";
    label.style.fontSize = "12px";
    label.style.color = "#dbefff";

    const cb = document.createElement("input");
    cb.type = "checkbox";
    cb.dataset.idx = index;
    cb.className = "reminder-toggle";
    cb.style.width = "14px";
    cb.style.height = "14px";
    if (j.reminderEnabled) cb.checked = true;
    cb.addEventListener("change", () => {
      jadwal[index].reminderEnabled = cb.checked;
      saveJadwal();
      try {
        window.dispatchEvent(new Event("storage"));
      } catch (e) {}
      if (typeof toast === "function")
        toast("Pengaturan reminder disimpan", "success");
    });

    const cbText = document.createElement("span");
    cbText.innerText = "Reminder";
    cbText.style.fontSize = "12px";

    label.appendChild(cb);
    label.appendChild(cbText);

    const btns = document.createElement("div");
    btns.style.display = "flex";
    btns.style.gap = "6px";

    const editBtn = document.createElement("button");
    const editSpan = document.createElement("span");
    editSpan.className = "material-symbols-outlined";
    editSpan.style.fontSize = "16px";
    editSpan.innerText = "edit";
    editBtn.appendChild(editSpan);
    editBtn.addEventListener("click", () => editJadwal(index));
    const delBtn = document.createElement("button");
    const delSpan = document.createElement("span");
    delSpan.className = "material-symbols-outlined";
    delSpan.style.fontSize = "16px";
    delSpan.innerText = "delete";
    delBtn.appendChild(delSpan);
    delBtn.addEventListener("click", () => hapusJadwal(index));

    btns.appendChild(editBtn);
    btns.appendChild(delBtn);

    controls.appendChild(label);
    controls.appendChild(btns);

    header.appendChild(title);
    header.appendChild(controls);

    const timeDiv = document.createElement("div");
    timeDiv.style.marginTop = "6px";
    timeDiv.style.fontSize = "12px";
    timeDiv.textContent = `${j.jamMulai || ""} - ${j.jamSelesai || ""}`;

    item.appendChild(header);
    item.appendChild(timeDiv);

    if (slot) slot.appendChild(item);
    else {
      const fallback = document.createElement("div");
      fallback.className = "class " + (j.warna || "blue");
      fallback.textContent = j.matkul || j.mata_kuliah || "";
      grid.appendChild(fallback);
    }
  });
}

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

function tambahJadwal() {
  const matkul = document.getElementById("matkul").value.trim();
  const hari = document.getElementById("hari").value;
  let jamMulai = document.getElementById("jamMulai").value;
  let jamSelesai = document.getElementById("jamSelesai").value;
  jamMulai = normalizeTime(jamMulai);
  jamSelesai = normalizeTime(jamSelesai);
  if (timeToMinutes(jamSelesai) <= timeToMinutes(jamMulai)) {
    if (typeof toast === "function")
      toast(
        "Waktu selesai harus lebih besar dari waktu mulai (format 24-jam).",
        "error",
      );
    return;
  }
  const warna = document.getElementById("warna").value;
  if (!matkul) {
    if (typeof toast === "function") toast("Isi mata kuliah!", "error");
    return;
  }

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

function hapusJadwal(index) {
  if (!confirm("Hapus jadwal ini?")) return;
  jadwal.splice(index, 1);
  saveJadwal();
  renderGrid();
  if (typeof toast === "function") toast("Jadwal dihapus", "success");
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

document.addEventListener("DOMContentLoaded", function () {
  const tabs = document.querySelectorAll(".tabs button");
  tabs.forEach((b, i) => {
    b.addEventListener("click", () => {
      tabs.forEach((t) => t.classList.remove("active"));
      b.classList.add("active");
      if (i === 0) {
        grid.style.display = "grid";
        const cal = document.getElementById("calendar");
        if (cal) cal.remove();
      } else {
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
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  const first = new Date(year, month, 1);
  const last = new Date(year, month + 1, 0);
  const startDay = first.getDay();
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
    const weekday = new Date(year, month, d).getDay();
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
      const controls = document.createElement("div");
      controls.style.display = "flex";
      controls.style.gap = "6px";
      controls.style.alignItems = "center";
      controls.style.marginTop = "6px";

      const idx = jadwal.indexOf(m);
      const label = document.createElement("label");
      label.style.display = "flex";
      label.style.alignItems = "center";
      label.style.gap = "6px";
      label.style.fontSize = "12px";
      label.style.color = "#dbefff";

      const cb = document.createElement("input");
      cb.type = "checkbox";
      cb.dataset.idx = idx;
      cb.className = "reminder-toggle";
      cb.style.width = "14px";
      cb.style.height = "14px";
      if (m.reminderEnabled) cb.checked = true;
      cb.addEventListener("change", () => {
        if (idx >= 0) {
          jadwal[idx].reminderEnabled = cb.checked;
          saveJadwal();
          try {
            window.dispatchEvent(new Event("storage"));
          } catch (e) {}
        }
      });

      const span = document.createElement("span");
      span.innerText = "Reminder";
      span.style.fontSize = "12px";

      label.appendChild(cb);
      label.appendChild(span);

      const btns = document.createElement("div");
      btns.style.display = "flex";
      btns.style.gap = "6px";

      const editBtn = document.createElement("button");
      const editSpan2 = document.createElement("span");
      editSpan2.className = "material-symbols-outlined";
      editSpan2.style.fontSize = "16px";
      editSpan2.innerText = "edit";
      editBtn.appendChild(editSpan2);
      editBtn.addEventListener("click", () => editJadwal(idx));
      const delBtn = document.createElement("button");
      const delSpan2 = document.createElement("span");
      delSpan2.className = "material-symbols-outlined";
      delSpan2.style.fontSize = "16px";
      delSpan2.innerText = "delete";
      delBtn.appendChild(delSpan2);
      delBtn.addEventListener("click", () => hapusJadwal(idx));

      btns.appendChild(editBtn);
      btns.appendChild(delBtn);

      controls.appendChild(label);
      controls.appendChild(btns);
      cell.appendChild(controls);
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
  document.querySelectorAll(".reminder-toggle").forEach((cb) => {
    cb.addEventListener("change", (ev) => {
      const idx = Number(cb.dataset.idx);
      jadwal[idx].reminderEnabled = cb.checked;
      saveJadwal();
      toast("Pengaturan reminder disimpan", "success");
      try {
        window.dispatchEvent(new Event("storage"));
      } catch (e) {}
    });
  });
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
renderGrid();

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
