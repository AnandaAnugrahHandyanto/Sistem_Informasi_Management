// togglePassword moved to assets/js/common.js

// Initialize page on load
document.addEventListener("DOMContentLoaded", function () {
  applyTheme();
  updatePageLanguage();
});

// Register logic
document
  .getElementById("registerForm")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    const nama = document.getElementById("nama").value.trim();
    const nim = document.getElementById("nim").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    // Validation: Check if all fields are filled
    if (!nama || !nim || !email || !password) {
      toast(t("fillAllFields") || "Harap isi semua field!", "error");
      return;
    }

    // Validation: Password minimum length
    if (password.length < 8) {
      toast(t("passwordMinimum") || "Password minimal 8 karakter!", "error");
      return;
    }

    // Validation: Email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast(t("invalidEmail") || "Format email tidak valid!", "error");
      return;
    }

    // Check if NIM already exists
    const existingUsers = JSON.parse(localStorage.getItem("allUsers")) || {};
    if (existingUsers[nim]) {
      toast(t("nimAlreadyExists") || "NIM sudah terbukti! Gunakan NIM lain.", "error");
      return;
    }

    // Create user object
    const user = {
      nama,
      nim,
      email,
      password,
    };

    // Save to localStorage - both as current user and in allUsers registry
    localStorage.setItem("user", JSON.stringify(user));
    
    existingUsers[nim] = user;
    localStorage.setItem("allUsers", JSON.stringify(existingUsers));

    toast(t("registrationSuccess") || "Pendaftaran berhasil!", "success");

    // Redirect ke login after 1.5 seconds
    setTimeout(function () {
      window.location.href = "../index.html";
    }, 1500);
  });
