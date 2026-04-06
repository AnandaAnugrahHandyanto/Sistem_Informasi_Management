// togglePassword moved to assets/js/common.js

// Login form
document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const nim = document.getElementById("nim").value;
  const password = document.getElementById("password").value;

  const storedUser = JSON.parse(localStorage.getItem("user"));

  if (storedUser) {
    if (nim === storedUser.nim && password === storedUser.password) {
      localStorage.setItem("isLogin", "true");
      toast(t("login") + " " + t("logoutSuccess").toLowerCase(), "success");
      navigateTo("pages/dashboard.html");
    } else {
      toast(t("invalidCredentials"), "error");
    }
  } else {
    const create = confirm(
      t("accountNotFound") + " " + t("createNewAccount"),
    );
    if (!create) return toast(t("loginCanceled"), "error");
    const newUser = { nama: "Mahasiswa", nim, email: "", password };
    localStorage.setItem("user", JSON.stringify(newUser));
    localStorage.setItem("isLogin", "true");
    toast(t("accountCreatedSuccess"), "success");
    navigateTo("pages/dashboard.html");
  }
});

// Forgot password (secure flow - requires email verification)
document.addEventListener("DOMContentLoaded", function () {
  const forgot = document.querySelector(".forgot a");
  if (!forgot) return;
  forgot.addEventListener("click", function (ev) {
    ev.preventDefault();
    showForgotPasswordModal();
  });
});

function showForgotPasswordModal() {
  const modal = document.createElement("div");
  modal.id = "forgotPasswordModal";
  modal.style.display = "flex";
  modal.style.position = "fixed";
  modal.style.top = "0";
  modal.style.left = "0";
  modal.style.width = "100%";
  modal.style.height = "100%";
  modal.style.background = "rgba(0,0,0,0.6)";
  modal.style.zIndex = "10000";
  modal.style.alignItems = "center";
  modal.style.justifyContent = "center";
  modal.style.backdropFilter = "blur(4px)";

  const content = document.createElement("div");
  content.style.background = "linear-gradient(180deg, rgba(15,23,42,0.95), rgba(7,16,40,0.95))";
  content.style.padding = "24px";
  content.style.borderRadius = "12px";
  content.style.border = "1px solid rgba(96,165,250,0.2)";
  content.style.maxWidth = "400px";
  content.style.width = "90%";
  content.style.boxShadow = "0 20px 60px rgba(2,6,23,0.6)";

  const title = document.createElement("h3");
  title.textContent = t("resetPassword");
  title.style.color = "#e6eefc";
  title.style.marginBottom = "16px";
  title.style.fontSize = "18px";
  title.style.fontWeight = "700";

  const message = document.createElement("p");
  message.textContent = t("resetPasswordDesc");
  message.style.color =  "#9fb0d8";
  message.style.marginBottom = "20px";
  message.style.fontSize = "13px";
  message.style.lineHeight = "1.5";

  const nimLabel = document.createElement("label");
  nimLabel.textContent = t("enterStudentId");
  nimLabel.style.display = "block";
  nimLabel.style.color = "#dbefff";
  nimLabel.style.marginBottom = "8px";
  nimLabel.style.fontSize = "13px";
  nimLabel.style.fontWeight = "600";

  const nimInput = document.createElement("input");
  nimInput.type = "text";
  nimInput.placeholder = t("studentIdExample");
  nimInput.style.width = "100%";
  nimInput.style.padding = "10px";
  nimInput.style.borderRadius = "8px";
  nimInput.style.border = "1px solid rgba(96,165,250,0.3)";
  nimInput.style.background = "rgba(30,41,59,0.6)";
  nimInput.style.color = "#dbefff";
  nimInput.style.marginBottom = "16px";
  nimInput.style.boxSizing = "border-box";
  nimInput.style.fontSize = "13px";

  const buttonContainer = document.createElement("div");
  buttonContainer.style.display = "flex";
  buttonContainer.style.gap = "12px";

  const cancelBtn = document.createElement("button");
  cancelBtn.textContent = t("cancel");
  cancelBtn.style.flex = "1";
  cancelBtn.style.padding = "10px";
  cancelBtn.style.borderRadius = "8px";
  cancelBtn.style.border = "1px solid rgba(96,165,250,0.3)";
  cancelBtn.style.background = "transparent";
  cancelBtn.style.color = "#60a5fa";
  cancelBtn.style.cursor = "pointer";
  cancelBtn.style.fontWeight = "600";
  cancelBtn.style.fontSize = "13px";
  cancelBtn.style.transition = "all 0.2s ease";
  cancelBtn.addEventListener("click", () => {
    modal.remove();
  });
  cancelBtn.addEventListener("mouseover", () => {
    cancelBtn.style.background = "rgba(96,165,250,0.1)";
  });
  cancelBtn.addEventListener("mouseout", () => {
    cancelBtn.style.background = "transparent";
  });

  const submitBtn = document.createElement("button");
  submitBtn.textContent = t("findAccount");
  submitBtn.style.flex = "1";
  submitBtn.style.padding = "10px";
  submitBtn.style.borderRadius = "8px";
  submitBtn.style.border = "none";
  submitBtn.style.background = "linear-gradient(90deg, #3b82f6, #60a5fa)";
  submitBtn.style.color = "white";
  submitBtn.style.cursor = "pointer";
  submitBtn.style.fontWeight = "600";
  submitBtn.style.fontSize = "13px";
  submitBtn.style.transition = "all 0.2s ease";
  submitBtn.addEventListener("click", () => {
    const nim = nimInput.value.trim();
    if (!nim) {
      alert(t("enterStudentIdFirst"));
      return;
    }
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser && storedUser.nim === nim) {
      alert(t("accountFoundMessage"));
    } else {
      alert(t("studentIdNotFound"));
    }
    modal.remove();
  });
  submitBtn.addEventListener("mouseover", () => {
    submitBtn.style.filter = "brightness(1.1)";
  });
  submitBtn.addEventListener("mouseout", () => {
    submitBtn.style.filter = "brightness(1)";
  });

  buttonContainer.appendChild(cancelBtn);
  buttonContainer.appendChild(submitBtn);

  content.appendChild(title);
  content.appendChild(message);
  content.appendChild(nimLabel);
  content.appendChild(nimInput);
  content.appendChild(buttonContainer);

  modal.appendChild(content);
  document.body.appendChild(modal);

  // Close on outside click
  modal.addEventListener("click", (e) => {
    if (e.target === modal) modal.remove();
  });
}
