// togglePassword moved to assets/js/common.js

// Register logic
document
  .getElementById("registerForm")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    const nama = document.getElementById("nama").value;
    const nim = document.getElementById("nim").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    if (password.length < 8) {
      alert("Password minimal 8 karakter!");
      return;
    }

    const user = {
      nama,
      nim,
      email,
      password,
    };

    localStorage.setItem("user", JSON.stringify(user));

    toast("Registrasi berhasil!", "success");

    // Redirect ke login (root)
    window.location.href = "../index.html";
  });
