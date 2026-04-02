// Common helpers used across pages
function togglePassword() {
  const password = document.getElementById("password");
  if (!password) return;
  password.type = password.type === "password" ? "text" : "password";
}

// small helper to navigate relative to pages folder
function go(path) {
  window.location.href = path;
}
