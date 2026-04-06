// Common helpers used across pages
function togglePassword() {
  const password = document.getElementById("password");
  if (!password) return;
  password.type = password.type === "password" ? "text" : "password";
}

// Apply saved theme on page load
function applyTheme() {
  const isDarkMode = localStorage.getItem("darkMode") === "true";
  if (isDarkMode) {
    document.documentElement.classList.add("dark-mode");
  } else {
    document.documentElement.classList.remove("dark-mode");
  }
  
  // Apply custom theme color
  const currentTheme = localStorage.getItem("appTheme") || "blue";
  document.body.classList.remove("theme-blue", "theme-purple", "theme-green", "theme-orange");
  if (currentTheme !== "blue") {
    document.body.classList.add(`theme-${currentTheme}`);
  }
}

// Call theme on DOMContentLoaded
document.addEventListener("DOMContentLoaded", function() {
  applyTheme();
});

// small helper to navigate relative to pages folder
function go(path) {
  window.location.href = path;
}

// Smooth page transition navigation
function navigateTo(path) {
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
