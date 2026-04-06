/* Jadwal per-user with start/end times, calendar tab and CRUD (assets copy) */
const grid = document.getElementById("grid");

const user = JSON.parse(localStorage.getItem("user"));
if (!user) window.location.href = "../index.html";

let semuaJadwal = JSON.parse(localStorage.getItem("jadwalUser")) || {};
let jadwal = semuaJadwal[user.nama] || [];
let editIndex = null;

// ============================================
// MIGRATION: Convert old hari format to tanggal
// ============================================
function migrateOldSchedules() {
  let hasChanges = false;
  jadwal = jadwal.map(schedule => {
    // If schedule has old hari field but no tanggal, convert it
    if (schedule.hari && !schedule.tanggal) {
      const today = new Date();
      const dayOfWeek = Number(schedule.hari);
      
      // Find the next occurrence of this day of week
      const currentDay = today.getDay();
      let daysUntilTarget = (dayOfWeek - currentDay + 7) % 7;
      
      // If it's today, use today. If it's in the past this week, use next week
      if (daysUntilTarget === 0) {
        daysUntilTarget = 0; // Use today
      }
      
      const targetDate = new Date(today);
      targetDate.setDate(today.getDate() + daysUntilTarget);
      
      const yyyy = targetDate.getFullYear();
      const mm = String(targetDate.getMonth() + 1).padStart(2, "0");
      const dd = String(targetDate.getDate()).padStart(2, "0");
      
      schedule.tanggal = `${yyyy}-${mm}-${dd}`;
      delete schedule.hari; // Remove old field
      hasChanges = true;
    }
    return schedule;
  });
  
  // Save migrated data
  if (hasChanges) {
    semuaJadwal[user.nama] = jadwal;
    localStorage.setItem("jadwalUser", JSON.stringify(semuaJadwal));
  }
}

// Run migration on load
migrateOldSchedules();

// Calendar navigation
let currentCalendarDate = new Date();

// Get translated day names
function getDays() {
  return [
    "",
    t("monday"),
    t("tuesday"),
    t("wednesday"),
    t("thursday"),
    t("friday")
  ];
}

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

  const days = getDays();
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

  // Get current week's dates (Monday to Friday)
  const today = new Date();
  const currentDay = today.getDay();
  const diff = today.getDate() - currentDay + (currentDay === 0 ? -6 : 1); // Adjust for Sunday
  const monday = new Date(today.setDate(diff));
  
  const weekDates = [];
  for (let i = 1; i <= 5; i++) {
    const date = new Date(monday);
    date.setDate(monday.getDate() + (i - 1));
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const dd = String(date.getDate()).padStart(2, "0");
    weekDates.push(`${yyyy}-${mm}-${dd}`);
  }

  // Display schedules for this week
  jadwal.forEach((j, index) => {
    const scheduleDate = j.tanggal;
    
    // Only show schedules with proper date format (no old hari format)
    if (!scheduleDate) return;
    
    // Find which day of the week this schedule is on
    let dayIndex = -1;
    if (weekDates.includes(scheduleDate)) {
      dayIndex = weekDates.indexOf(scheduleDate) + 1;
    }
    
    if (dayIndex < 0) return;
    
    const startIdx = Math.max(0, times.indexOf(j.jamMulai));
    const slotId = `slot-d${dayIndex}-r${startIdx}`;
    const slot = document.getElementById(slotId);
    if (!slot) return;

    const item = document.createElement("div");
    item.className = "class-item " + (j.warna || "blue");
    
    // Check for schedule conflicts - add visual indicator
    const hasConflict = jadwal.some((other, idx) => {
      if (idx === index) return false;
      if (other.tanggal !== j.tanggal) return false;
      const otherStart = timeToMinutes(other.jamMulai);
      const otherEnd = timeToMinutes(other.jamSelesai);
      const thisStart = timeToMinutes(j.jamMulai);
      const thisEnd = timeToMinutes(j.jamSelesai);
      return thisStart < otherEnd && thisEnd > otherStart;
    });
    
    if (hasConflict) {
      item.classList.add("conflict");
    }
    
    item.style.padding = "8px";
    item.style.borderRadius = "6px";
    item.style.display = "flex";
    item.style.flexDirection = "column";
    item.style.gap = "6px";
    item.style.fontSize = "12px";

    const title = document.createElement("div");
    title.style.fontWeight = "700";
    title.style.fontSize = "13px";
    title.textContent = j.matkul || j.mata_kuliah || "";

    const timeInfo = document.createElement("div");
    timeInfo.style.fontSize = "11px";
    timeInfo.style.opacity = "0.9";
    timeInfo.textContent = `${j.jamMulai} - ${j.jamSelesai}`;

    // Controls container (better layout)
    const controlsContainer = document.createElement("div");
    controlsContainer.style.display = "flex";
    controlsContainer.style.flexDirection = "column";
    controlsContainer.style.gap = "6px";
    controlsContainer.style.marginTop = "4px";

    // Reminder toggle
    const reminderLabel = document.createElement("label");
    reminderLabel.style.display = "flex";
    reminderLabel.style.alignItems = "center";
    reminderLabel.style.gap = "6px";
    reminderLabel.style.fontSize = "11px";
    reminderLabel.style.cursor = "pointer";
    reminderLabel.style.userSelect = "none";

    const reminderCb = document.createElement("input");
    reminderCb.type = "checkbox";
    reminderCb.style.width = "16px";
    reminderCb.style.height = "16px";
    reminderCb.style.cursor = "pointer";
    reminderCb.style.accentColor = "#60a5fa";
    reminderCb.style.borderRadius = "3px";
    reminderCb.style.transition = "all 0.15s ease";
    if (j.reminderEnabled) reminderCb.checked = true;
    reminderCb.addEventListener("change", () => {
      jadwal[index].reminderEnabled = reminderCb.checked;
      saveJadwal();
      try {
        window.dispatchEvent(new Event("storage"));
      } catch (e) {}
      if (typeof toast === "function")
        toast(t("reminderSaved"), "success");
    });
    reminderCb.addEventListener("mouseover", () => {
      reminderCb.style.boxShadow = "0 0 6px rgba(96,165,250,0.3)";
    });
    reminderCb.addEventListener("mouseout", () => {
      reminderCb.style.boxShadow = "none";
    });

    const reminderText = document.createElement("span");
    reminderText.textContent = t("reminder");
    reminderText.style.color = "#c7d2e8";
    reminderLabel.appendChild(reminderCb);
    reminderLabel.appendChild(reminderText);

    // Edit and Delete buttons
    const buttonContainer = document.createElement("div");
    buttonContainer.style.display = "flex";
    buttonContainer.style.gap = "6px";
    buttonContainer.style.justifyContent = "flex-start";

    const editBtn = document.createElement("button");
    editBtn.style.padding = "4px 8px";
    editBtn.style.fontSize = "11px";
    editBtn.style.border = "none";
    editBtn.style.borderRadius = "4px";
    editBtn.style.background = "rgba(0,0,0,0.2)";
    editBtn.style.color = "#000000";
    editBtn.style.cursor = "pointer";
    editBtn.innerHTML = "✎";
    editBtn.addEventListener("click", () => editJadwal(index));
    editBtn.addEventListener("mouseover", () => editBtn.style.background = "rgba(0,0,0,0.4)");
    editBtn.addEventListener("mouseout", () => editBtn.style.background = "rgba(0,0,0,0.2)");

    const delBtn = document.createElement("button");
    delBtn.style.padding = "4px 8px";
    delBtn.style.fontSize = "11px";
    delBtn.style.border = "none";
    delBtn.style.borderRadius = "4px";
    delBtn.style.background = "rgba(239,68,68,0.2)";
    delBtn.style.color = "#ef4444";
    delBtn.style.cursor = "pointer";
    delBtn.innerHTML = "🗑";
    delBtn.addEventListener("click", () => hapusJadwal(index));
    delBtn.addEventListener("mouseover", () => delBtn.style.background = "rgba(239,68,68,0.4)");
    delBtn.addEventListener("mouseout", () => delBtn.style.background = "rgba(239,68,68,0.2)");

    buttonContainer.appendChild(editBtn);
    buttonContainer.appendChild(delBtn);

    controlsContainer.appendChild(reminderLabel);
    controlsContainer.appendChild(buttonContainer);

    item.appendChild(title);
    item.appendChild(timeInfo);
    item.appendChild(controlsContainer);

    slot.appendChild(item);
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
  // Set today's date by default
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const dd = String(today.getDate()).padStart(2, "0");
  document.getElementById("tanggal").value = `${yyyy}-${mm}-${dd}`;
  document.getElementById("jamMulai").value = "08:00";
  document.getElementById("jamSelesai").value = "09:30";
  document.getElementById("warna").value = "blue";
  editIndex = null;
}

// Check for schedule overlaps (by date and time)
function checkScheduleConflict(tanggal, jamMulai, jamSelesai, excludeIndex = null) {
  const jamMulaiMin = timeToMinutes(jamMulai);
  const jamSelesaiMin = timeToMinutes(jamSelesai);
  
  return jadwal.some((j, idx) => {
    if (excludeIndex !== null && idx === excludeIndex) return false;
    if (j.tanggal !== tanggal) return false;
    
    const jMulaiMin = timeToMinutes(j.jamMulai);
    const jSelesaiMin = timeToMinutes(j.jamSelesai);
    
    // Check if times overlap
    return jamMulaiMin < jSelesaiMin && jamSelesaiMin > jMulaiMin;
  });
}

function tambahJadwal() {
  const matkul = document.getElementById("matkul").value.trim();
  const tanggal = document.getElementById("tanggal").value;
  let jamMulai = document.getElementById("jamMulai").value;
  let jamSelesai = document.getElementById("jamSelesai").value;
  jamMulai = normalizeTime(jamMulai);
  jamSelesai = normalizeTime(jamSelesai);
  
  if (timeToMinutes(jamSelesai) <= timeToMinutes(jamMulai)) {
    if (typeof toast === "function")
      toast(
        t("timeValidationError"),
        "error",
      );
    return;
  }
  const warna = document.getElementById("warna").value;
  if (!matkul) {
    if (typeof toast === "function") toast(t("fillSubject"), "error");
    return;
  }

  // Validate that a date was selected
  if (!tanggal || tanggal === "") {
    if (typeof toast === "function") toast(t("fillAllFields"), "error");
    return;
  }

  // Check for schedule conflicts
  const hasConflict = checkScheduleConflict(tanggal, jamMulai, jamSelesai, editIndex);
  if (hasConflict && editIndex === null) {
    if (!confirm(t("scheduleConflict"))) {
      return;
    }
  }

  const item = {
    mata_kuliah: matkul,
    matkul: matkul,
    tanggal: tanggal,
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
  if (!confirm(t("deleteScheduleConfirm"))) return;
  jadwal.splice(index, 1);
  saveJadwal();
  renderGrid();
  if (typeof toast === "function") toast(t("scheduleDeletedSuccess"), "success");
}

function editJadwal(index) {
  const j = jadwal[index];
  document.getElementById("matkul").value = j.matkul;
  
  // Handle both new date-based and old day-based schedules
  if (j.tanggal) {
    document.getElementById("tanggal").value = j.tanggal;
  } else if (j.hari) {
    // Convert old hari (day of week) to a date (nearest future occurrence)
    const today = new Date();
    const dayOfWeek = Number(j.hari);
    const daysUntilTarget = (dayOfWeek - today.getDay() + 7) % 7 || 7;
    const futureDate = new Date(today);
    futureDate.setDate(futureDate.getDate() + daysUntilTarget);
    const yyyy = futureDate.getFullYear();
    const mm = String(futureDate.getMonth() + 1).padStart(2, "0");
    const dd = String(futureDate.getDate()).padStart(2, "0");
    document.getElementById("tanggal").value = `${yyyy}-${mm}-${dd}`;
  }
  
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

  // Navigation header
  const navHeader = document.createElement("div");
  navHeader.style.display = "flex";
  navHeader.style.justifyContent = "space-between";
  navHeader.style.alignItems = "center";
  navHeader.style.marginBottom = "12px";
  navHeader.style.padding = "12px";
  navHeader.style.borderRadius = "8px";
  navHeader.style.background = "rgba(96,165,250,0.08)";
  navHeader.style.border = "1px solid rgba(96,165,250,0.15)";

  const prevBtn = document.createElement("button");
  prevBtn.textContent = t("prevMonth");
  prevBtn.style.padding = "8px 12px";
  prevBtn.style.borderRadius = "6px";
  prevBtn.style.border = "1px solid rgba(96,165,250,0.3)";
  prevBtn.style.background = "transparent";
  prevBtn.style.color = "#60a5fa";
  prevBtn.style.cursor = "pointer";
  prevBtn.style.fontSize = "12px";
  prevBtn.style.fontWeight = "600";
  prevBtn.style.transition = "all 0.2s ease";
  prevBtn.addEventListener("click", () => {
    currentCalendarDate.setMonth(currentCalendarDate.getMonth() - 1);
    renderCalendar();
  });
  prevBtn.addEventListener("mouseover", () => {
    prevBtn.style.background = "rgba(96,165,250,0.15)";
  });
  prevBtn.addEventListener("mouseout", () => {
    prevBtn.style.background = "transparent";
  });

  const monthYear = document.createElement("div");
  const monthKeys = [
    "january", "february", "march", "april", "may", "june",
    "july", "august", "september", "october", "november", "december"
  ];
  const displayMonth = t(monthKeys[currentCalendarDate.getMonth()]);
  const displayYear = currentCalendarDate.getFullYear();
  monthYear.textContent = `${displayMonth} ${displayYear}`;
  monthYear.style.fontWeight = "700";
  monthYear.style.fontSize = "14px";
  monthYear.style.color = "#dbefff";

  const nextBtn = document.createElement("button");
  nextBtn.textContent = t("nextMonth");
  nextBtn.style.padding = "8px 12px";
  nextBtn.style.borderRadius = "6px";
  nextBtn.style.border = "1px solid rgba(96,165,250,0.3)";
  nextBtn.style.background = "transparent";
  nextBtn.style.color = "#60a5fa";
  nextBtn.style.cursor = "pointer";
  nextBtn.style.fontSize = "12px";
  nextBtn.style.fontWeight = "600";
  nextBtn.style.transition = "all 0.2s ease";
  nextBtn.addEventListener("click", () => {
    currentCalendarDate.setMonth(currentCalendarDate.getMonth() + 1);
    renderCalendar();
  });
  nextBtn.addEventListener("mouseover", () => {
    nextBtn.style.background = "rgba(96,165,250,0.15)";
  });
  nextBtn.addEventListener("mouseout", () => {
    nextBtn.style.background = "transparent";
  });

  navHeader.appendChild(prevBtn);
  navHeader.appendChild(monthYear);
  navHeader.appendChild(nextBtn);
  cal.appendChild(navHeader);

  const year = currentCalendarDate.getFullYear();
  const month = currentCalendarDate.getMonth();
  const first = new Date(year, month, 1);
  const last = new Date(year, month + 1, 0);
  const startDay = first.getDay();
  const daysInMonth = last.getDate();
  const table = document.createElement("div");
  table.style.display = "grid";
  table.style.gridTemplateColumns = "repeat(7,1fr)";
  table.style.gap = "6px";
  const dayHeaders = [t("sun"), t("mon"), t("tue"), t("wed"), t("thu"), t("fri"), t("sat")];
  for (let i = 0; i < 7; i++) {
    const h = document.createElement("div");
    h.style.fontWeight = "700";
    h.style.color = "#9fb0d8";
    h.style.textAlign = "center";
    h.innerText = dayHeaders[i];
    table.appendChild(h);
  }
  for (let i = 0; i < startDay; i++) {
    const e = document.createElement("div");
    table.appendChild(e);
  }
  
  const today = new Date();
  const isCurrentMonth = today.getFullYear() === year && today.getMonth() === month;
  const todayDate = today.getDate();
  
  for (let d = 1; d <= daysInMonth; d++) {
    const cell = document.createElement("div");
    cell.style.minHeight = "70px";
    cell.style.padding = "8px";
    cell.style.borderRadius = "8px";
    cell.style.background = "rgba(255,255,255,0.02)";
    
    // Highlight today's date
    if (isCurrentMonth && d === todayDate) {
      cell.style.background = "rgba(59,130,246,0.2)";
      cell.style.border = "2px solid #3b82f6";
    }
    
    const dayNum = document.createElement("div");
    dayNum.style.fontWeight = "700";
    dayNum.style.fontSize = "13px";
    dayNum.style.color = isCurrentMonth && d === todayDate ? "#60a5fa" : "#cfe6ff";
    dayNum.innerText = d;
    if (isCurrentMonth && d === todayDate) {
      dayNum.style.fontWeight = "800";
    }
    cell.appendChild(dayNum);
    const weekday = new Date(year, month, d).getDay();
    
    // Create date string to match with schedule date
    const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;
    
    // Filter schedules for this specific date
    const matches = jadwal.filter((j) => {
      if (j.tanggal) {
        // New format: match exact date
        return j.tanggal === dateStr;

      }
      return false;
    });
    matches.forEach((m) => {
      const it = document.createElement("div");
      it.style.fontSize = "12px";
      it.style.marginTop = "6px";
      it.style.padding = "4px";
      it.style.borderRadius = "4px";
      it.style.background = "rgba(59,130,246,0.1)";
      it.style.color = "#60a5fa";
      it.innerText = `${m.matkul} ${m.jamMulai || ""}`;
      cell.appendChild(it);
      const controls = document.createElement("div");
      controls.style.display = "flex";
      controls.style.gap = "6px";
      controls.style.alignItems = "center";
      controls.style.marginTop = "4px";

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
  navigateTo("dashboard.html");
}

function goDashboard() {
  document.querySelectorAll(".reminder-toggle").forEach((cb) => {
    cb.addEventListener("change", (ev) => {
      const idx = Number(cb.dataset.idx);
      jadwal[idx].reminderEnabled = cb.checked;
      saveJadwal();
      toast(t("reminderSaved"), "success");
      try {
        window.dispatchEvent(new Event("storage"));
      } catch (e) {}
    });
  });
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

setActiveNav();
renderGrid();

// ============================================
// REMINDER NOTIFICATIONS
// ============================================

// Request notification permission on load
if ("Notification" in window && Notification.permission === "default") {
  Notification.requestPermission();
}

// Check for upcoming schedules and notify
function checkUpcomingReminders() {
  const isNotifyScheduleEnabled = localStorage.getItem("notifySchedule") !== "false";
  if (!isNotifyScheduleEnabled || !("Notification" in window) || Notification.permission !== "granted") {
    return;
  }

  const now = new Date();
  const currentHours = now.getHours();
  const currentMinutes = now.getMinutes();
  const currentTime = timeToMinutes(`${String(currentHours).padStart(2, "0")}:${String(currentMinutes).padStart(2, "0")}`);
  
  const today = now.getDay();
  
  jadwal.forEach((schedule) => {
    if (!schedule.reminderEnabled) return;
    
    const scheduleDay = Number(schedule.hari);
    if (scheduleDay !== today) return;
    
    const scheduleTime = timeToMinutes(schedule.jamMulai);
    const timeDiff = scheduleTime - currentTime;
    
    // Notify 15 minutes before class starts
    if (timeDiff > 0 && timeDiff <= 15 && !schedule.notified) {
      new Notification(t("reminder") || "Reminder", {
        body: `${schedule.matkul || schedule.mata_kuliah} dimulai dalam 15 menit (${schedule.jamMulai})`,
        icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect fill='%233b82f6' width='100' height='100'/><text x='50' y='70' font-size='60' fill='white' text-anchor='middle' font-weight='bold'>!</text></svg>"
      });
      schedule.notified = true;
      saveJadwal();
    }
    
    // Reset notification flag after class starts
    if (timeDiff < 0) {
      schedule.notified = false;
      saveJadwal();
    }
  });
}

// Check reminders every minute
setInterval(checkUpcomingReminders, 60000);
// Initial check
checkUpcomingReminders();

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
