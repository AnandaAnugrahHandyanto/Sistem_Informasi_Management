// settings.js

// Initialize settings on page load
document.addEventListener("DOMContentLoaded", function () {
  setActiveNav();
  loadTheme();
  loadLanguagePreference();
  loadNotificationPreferences();
});

// ============================================
// DARK MODE / THEME MANAGEMENT
// ============================================

function toggleDarkMode() {
  const darkModeToggle = document.getElementById("darkModeToggle");
  const isDarkMode = darkModeToggle.checked;
  vibrate(50);

  if (isDarkMode) {
    document.documentElement.classList.add("dark-mode");
    localStorage.setItem("darkMode", "true");
  } else {
    document.documentElement.classList.remove("dark-mode");
    localStorage.setItem("darkMode", "false");
  }
}

function loadTheme() {
  const isDarkMode = localStorage.getItem("darkMode") === "true";
  const darkModeToggle = document.getElementById("darkModeToggle");
  const html = document.documentElement;

  if (isDarkMode) {
    html.classList.add("dark-mode");
    if (darkModeToggle) darkModeToggle.checked = true;
  } else {
    html.classList.remove("dark-mode");
    if (darkModeToggle) darkModeToggle.checked = false;
  }

  // Load custom theme
  loadCustomTheme();
}

// ============================================
// CUSTOM THEME MANAGEMENT
// ============================================

function loadCustomTheme() {
  const currentTheme = localStorage.getItem("appTheme") || "blue";
  applyTheme(currentTheme);
  
  // Set the select dropdown to current theme
  const themeSelect = document.getElementById("themeSelect");
  if (themeSelect) {
    themeSelect.value = currentTheme;
  }
}

function applyTheme(themeName) {
  const html = document.documentElement;
  // Remove all theme classes from both html and body (legacy compat)
  ["theme-purple", "theme-green", "theme-orange"].forEach((cls) => {
    html.classList.remove(cls);
    document.body.classList.remove(cls);
  });
  // Apply selected theme
  if (themeName && themeName !== "blue") {
    html.classList.add(`theme-${themeName}`);
  }
  localStorage.setItem("appTheme", themeName || "blue");
}

function changeTheme() {
  const themeSelect = document.getElementById("themeSelect");
  if (themeSelect) {
    applyTheme(themeSelect.value);
  }
}

// ============================================
// LANGUAGE MANAGEMENT
// ============================================

function loadLanguagePreference() {
  const currentLang = getLang();
  const langSelect = document.getElementById("languageSelect");
  if (langSelect) {
    langSelect.value = currentLang;
  }
}

function handleLanguageChange() {
  const langSelect = document.getElementById("languageSelect");
  const selectedLang = langSelect.value;
  switchLanguage(selectedLang);
}

// ============================================
// NOTIFICATION PREFERENCES
// ============================================

function loadNotificationPreferences() {
  const scheduleNotif = document.getElementById("scheduleNotif");
  const agendaNotif = document.getElementById("agendaNotif");

  const scheduleNotifPref = localStorage.getItem("notifySchedule") !== "false";
  const agendaNotifPref = localStorage.getItem("notifyAgenda") !== "false";

  if (scheduleNotif) scheduleNotif.checked = scheduleNotifPref;
  if (agendaNotif) agendaNotif.checked = agendaNotifPref;
}

function saveSettings() {
  vibrate(30);
  const scheduleNotif = document.getElementById("scheduleNotif");
  const agendaNotif = document.getElementById("agendaNotif");

  if (scheduleNotif) {
    localStorage.setItem("notifySchedule", scheduleNotif.checked ? "true" : "false");
  }
  if (agendaNotif) {
    localStorage.setItem("notifyAgenda", agendaNotif.checked ? "true" : "false");
  }
}

function toggleScheduleNotif() {
  const scheduleNotif = document.getElementById("scheduleNotif");
  localStorage.setItem("notifySchedule", scheduleNotif.checked ? "true" : "false");
}

function toggleAgendaNotif() {
  const agendaNotif = document.getElementById("agendaNotif");
  localStorage.setItem("notifyAgenda", agendaNotif.checked ? "true" : "false");
}

// ============================================
// DATA MANAGEMENT
// ============================================

function clearData() {
  const confirmed = confirm(
    t("confirmClearData") ||
      "Apakah Anda yakin ingin menghapus semua data? Tindakan ini tidak dapat dibatalkan | Are you sure you want to clear all data? This action cannot be undone."
  );

  if (confirmed) {
    localStorage.clear();
    showToast(t("dataCleared") || "Data berhasil dihapus | Data cleared successfully");

    // Redirect to login after 1.5 seconds
    setTimeout(() => {
      navigateTo("index.html");
    }, 1500);
  }
}

// ============================================
// UTILITY FUNCTIONS
// ============================================

function showToast(message) {
  // Create toast element if toast.js is available
  if (typeof createToast === "function") {
    createToast(message, 3000);
  } else {
    // Fallback to alert
    alert(message);
  }
}

// User account info display (can be extended)
function loadUserInfo() {
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  
  if (user.nim) {
    const nimDisplay = document.getElementById("nimDisplay");
    if (nimDisplay) nimDisplay.textContent = user.nim;
  }

  if (user.nama) {
    const nameDisplay = document.getElementById("nameDisplay");
    if (nameDisplay) nameDisplay.textContent = user.nama;
  }
}

// Call loadUserInfo on page load
document.addEventListener("DOMContentLoaded", loadUserInfo);

// ============================================
// NAVIGATION FUNCTIONS
// ============================================

function goDashboard() {
  navigateTo("pages/dashboard.html");
}

function goAgenda() {
  navigateTo("pages/agenda.html");
}

function goJadwal() {
  navigateTo("pages/jadwal.html");
}

function goRekap() {
  navigateTo("pages/rekap.html");
}

function logout() {
  const confirmed = confirm(
    t("confirmLogout") ||
      "Apakah Anda ingin keluar? | Are you sure you want to logout?"
  );

  if (confirmed) {
    localStorage.removeItem("user");
    navigateTo("index.html");
  }
}
