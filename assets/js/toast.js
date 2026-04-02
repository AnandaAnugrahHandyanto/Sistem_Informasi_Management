// Minimal toast utility
(function () {
  function createContainer() {
    let c = document.querySelector(".toast-container");
    if (!c) {
      c = document.createElement("div");
      c.className = "toast-container";
      document.body.appendChild(c);
    }
    return c;
  }

  function makeToast(msg, type = "info", timeout = 4000) {
    const c = createContainer();
    const t = document.createElement("div");
    t.className =
      "toast " +
      (type === "success" ? "success" : type === "error" ? "error" : "");
    const icon = document.createElement("div");
    icon.className = "toast-icon";
    const s = document.createElement("span");
    s.className = "material-symbols-outlined";
    s.style.fontSize = "18px";
    s.innerText =
      type === "success" ? "check_circle" : type === "error" ? "error" : "info";
    icon.appendChild(s);
    const body = document.createElement("div");
    body.className = "toast-body";
    body.innerText = msg;
    const close = document.createElement("div");
    close.className = "toast-close";
    const cs = document.createElement("span");
    cs.className = "material-symbols-outlined";
    cs.style.fontSize = "14px";
    cs.innerText = "close";
    close.appendChild(cs);
    close.addEventListener("click", () => {
      c.removeChild(t);
    });
    t.appendChild(icon);
    t.appendChild(body);
    t.appendChild(close);
    c.appendChild(t);
    // animate
    requestAnimationFrame(() => t.classList.add("show"));
    if (timeout > 0)
      setTimeout(() => {
        try {
          t.classList.remove("show");
          setTimeout(() => {
            if (t.parentNode) t.parentNode.removeChild(t);
          }, 220);
        } catch (e) {}
      }, timeout);
    return t;
  }

  window.toast = function (msg, type = "info", timeout = 4000) {
    try {
      return makeToast(msg, type, timeout);
    } catch (e) {
      try {
        alert(msg);
      } catch (_) {}
    }
  };
})();
