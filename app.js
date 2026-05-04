/* Trace: ACTIVITY-CODE — Sibar mock login POC demo */

(function () {
  "use strict";

  var STORAGE_KEY = "sibarDemoUsername";

  /**
   * Login page: fake submit with validation and redirect.
   */
  function initLoginPage() {
    try {
      var params = new URLSearchParams(window.location.search);
      if (params.get("logout") === "1") {
        sessionStorage.removeItem(STORAGE_KEY);
        sessionStorage.removeItem("sibarDemoRemember");
        window.history.replaceState({}, "", "index.html");
      }
    } catch (err) {
      /* ignore */
    }

    var form = document.getElementById("login-form");
    var username = document.getElementById("username");
    var password = document.getElementById("password");
    var remember = document.getElementById("remember");
    var submitBtn = document.getElementById("submit-btn");
    var errorEl = document.getElementById("login-error");

    if (!form || !username || !password || !submitBtn) {
      return;
    }

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      errorEl.classList.remove("is-visible");

      var u = username.value.trim();
      var p = password.value;

      if (!u || !p) {
        errorEl.textContent =
          "Inserisci nome utente e password (demo: qualsiasi valore non vuoto).";
        errorEl.classList.add("is-visible");
        return;
      }

      submitBtn.disabled = true;
      submitBtn.textContent = "Caricamento…";

      window.setTimeout(function () {
        try {
          sessionStorage.setItem(STORAGE_KEY, u);
          if (remember && remember.checked) {
            sessionStorage.setItem("sibarDemoRemember", "1");
          } else {
            sessionStorage.removeItem("sibarDemoRemember");
          }
        } catch (err) {
          /* ignore storage errors in private mode */
        }
        window.location.href = "dashboard.html";
      }, 900);
    });
  }

  /**
   * Dashboard: show welcome or bounce to login if no session flag.
   */
  function initDashboardPage() {
    var welcome = document.getElementById("welcome-name");
    if (!welcome) {
      return;
    }

    var name = "";
    try {
      name = sessionStorage.getItem(STORAGE_KEY) || "";
    } catch (err) {
      name = "";
    }

    if (!name) {
      window.location.replace("index.html");
      return;
    }

    welcome.textContent = name;
  }

  if (document.body.dataset.page === "login") {
    initLoginPage();
  } else if (document.body.dataset.page === "dashboard") {
    initDashboardPage();
  }
})();
