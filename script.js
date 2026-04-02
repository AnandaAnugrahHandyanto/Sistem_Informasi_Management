// Toggle password
function togglePassword() {
  const password = document.getElementById("password");
  if (password.type === "password") {
    password.type = "text";
  } else {
    password.type = "password";
  }
}

// Login form
document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault();

  // ambil input dari user
  const nim = document.getElementById("nim").value;
  const password = document.getElementById("password").value;

  const storedUser = JSON.parse(localStorage.getItem("user"));

  // validasi login
  if (storedUser) {
    if (nim === storedUser.nim && password === storedUser.password) {
      localStorage.setItem("isLogin", "true");
      alert("Login berhasil!");
      window.location.href = "dashboard.html";
    } else {
      alert("NIM atau Password salah!");
    }
  } else {
    // jika belum ada user tersimpan, tawarkan membuat akun otomatis
    const create = confirm(
      "Akun tidak ditemukan. Buat akun baru dengan NIM ini dan password yang dimasukkan?",
    );
    if (!create) return alert("Login dibatalkan.");
    const newUser = { nama: "Mahasiswa", nim, email: "", password };
    localStorage.setItem("user", JSON.stringify(newUser));
    localStorage.setItem("isLogin", "true");
    alert("Akun dibuat dan login berhasil!");
    window.location.href = "dashboard.html";
  }
});

// Lupa password (simple flow: ask nim/email and show reset info)
document.addEventListener("DOMContentLoaded", function () {
  const forgot = document.querySelector(".forgot a");
  if (!forgot) return;
  forgot.addEventListener("click", function (ev) {
    ev.preventDefault();
    const nim = prompt("Masukkan NIM untuk reset password (contoh):");
    if (!nim) return alert("Batal");
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser && storedUser.nim === nim) {
      alert(
        "Password Anda: " +
          storedUser.password +
          "\n(atau gunakan fitur reset di server)",
      );
    } else {
      alert("NIM tidak ditemukan. Jika lupa, hubungi admin.");
    }
  });
});
