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
document.getElementById("loginForm").addEventListener("submit", function(e) {
    e.preventDefault();

    // ambil input dari user
    const nim = document.getElementById("nim").value;
    const password = document.getElementById("password").value;

    const storedUser = JSON.parse(localStorage.getItem("user"));

    // validasi login
    if (storedUser && nim === storedUser.nim && password === storedUser.password) {

        localStorage.setItem("isLogin", "true");

        alert("Login berhasil!");
        window.location.href = "dashboard.html";

    } else {
        alert("NIM atau Password salah!");
    }
});