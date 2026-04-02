// Toggle password
function togglePassword() {
  const password = document.getElementById("password");
  if (password.type === "password") {
    password.type = "text";
  } else {
    password.type = "password";
  }
}

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

    // Simpan ke localStorage
    const user = {
      nama,
      nim,
      email,
      password,
    };

    localStorage.setItem("user", JSON.stringify(user));

    alert("Registrasi berhasil!");

    // Redirect ke login
    window.location.href = "index.html";
  });
