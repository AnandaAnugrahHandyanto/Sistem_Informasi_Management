// Common helpers used across pages

// ============================================================
// HAPTIC FEEDBACK
// ============================================================
function vibrate(ms) {
  if (ms === undefined) ms = 50;
  if (typeof navigator !== "undefined" && typeof navigator.vibrate === "function") {
    try { navigator.vibrate(ms); } catch (e) {}
  }
}

// ============================================================
// LOCAL STORAGE HELPERS
// ============================================================
function saveToLocalStorage(key, value) {
  try {
    localStorage.setItem(key, typeof value === "string" ? value : JSON.stringify(value));
  } catch (e) {}
}

function loadFromLocalStorage(key, defaultValue) {
  try {
    const val = localStorage.getItem(key);
    if (val === null) return defaultValue !== undefined ? defaultValue : null;
    try { return JSON.parse(val); } catch (_) { return val; }
  } catch (e) {
    return defaultValue !== undefined ? defaultValue : null;
  }
}

// ============================================================
// PASSWORD TOGGLE
// ============================================================
function togglePassword() {
  const password = document.getElementById("password");
  if (!password) return;
  password.type = password.type === "password" ? "text" : "password";
}

// ============================================================
// THEME (dark mode + color theme) — applied to html element
// ============================================================
function applyTheme() {
  const html = document.documentElement;

  // Dark mode
  const darkModePref = loadFromLocalStorage("darkMode");
  const isDarkMode = darkModePref === "true" || darkModePref === true;
  if (isDarkMode) {
    html.classList.add("dark-mode");
  } else {
    html.classList.remove("dark-mode");
  }

  // Color theme
  const currentTheme = loadFromLocalStorage("appTheme") || "blue";
  // Clear theme classes from both html and body (legacy compat)
  ["theme-purple", "theme-green", "theme-orange"].forEach((cls) => {
    html.classList.remove(cls);
    document.body.classList.remove(cls);
  });
  if (currentTheme !== "blue") {
    html.classList.add(`theme-${currentTheme}`);
  }
}

// Apply theme on DOMContentLoaded
document.addEventListener("DOMContentLoaded", function () {
  applyTheme();
});

// ============================================================
// NAVIGATION
// ============================================================

// Smooth page transition with haptic feedback
function navigateTo(path) {
  vibrate(30);
  document.body.classList.add("page-exit");
  setTimeout(() => {
    window.location.href = path;
  }, 400);
}

// Set active navbar item based on current page
function setActiveNav() {
  const currentPage = window.location.pathname.split("/").pop() || "dashboard.html";
  const navItems = document.querySelectorAll(".nav-item");

  navItems.forEach((item) => item.classList.remove("active"));

  if (currentPage.includes("dashboard")) {
    navItems[0]?.classList.add("active");
  } else if (currentPage.includes("jadwal")) {
    navItems[1]?.classList.add("active");
  } else if (currentPage.includes("rekap")) {
    navItems[2]?.classList.add("active");
  } else if (currentPage.includes("agenda")) {
    navItems[3]?.classList.add("active");
  } else if (currentPage.includes("settings")) {
    navItems[4]?.classList.add("active");
  }
}

