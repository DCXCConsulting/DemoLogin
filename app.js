/* Trace: DEMO-SIRA-RESTYLE — static portal mock (SIRA-inspired layout) */

(function () {
  "use strict";

  var COOKIE_CONSENT_KEY = "susDemoCookieConsent";

  /**
   * Cookie banner: hide after accept, persist preference.
   */
  function initCookieBanner() {
    var banner = document.getElementById("cookie-banner");
    if (!banner) {
      return;
    }
    try {
      if (localStorage.getItem(COOKIE_CONSENT_KEY) === "1") {
        banner.hidden = true;
        return;
      }
    } catch (err) {
      /* ignore */
    }
    var btn = document.getElementById("cookie-accept");
    if (btn) {
      btn.addEventListener("click", function () {
        try {
          localStorage.setItem(COOKIE_CONSENT_KEY, "1");
        } catch (e) {
          /* ignore */
        }
        banner.hidden = true;
      });
    }
  }

  /**
   * Tab panels inside each .tab-section (scoped panels per section).
   */
  function initTabSections() {
    document.querySelectorAll(".tab-section").forEach(function (root) {
      var tablist = root.querySelector(".profile-tabs");
      if (!tablist) {
        return;
      }
      var tabs = tablist.querySelectorAll("[data-tab-id]");
      var panels = root.querySelectorAll("[data-tab-panel]");
      if (!tabs.length || !panels.length) {
        return;
      }
      tabs.forEach(function (tab) {
        tab.addEventListener("click", function () {
          var id = tab.getAttribute("data-tab-id");
          tabs.forEach(function (t) {
            var on = t === tab;
            t.classList.toggle("is-active", on);
            t.setAttribute("aria-selected", on ? "true" : "false");
          });
          panels.forEach(function (p) {
            p.hidden = p.getAttribute("data-tab-panel") !== id;
          });
        });
      });
    });
  }

  /**
   * Sticky header: ribbon + nav stick below .demo-banner; util bar scrolls away.
   * Toggles .site-header--stuck for compact ribbon + shadow when util is out of view.
   */
  function initStickySiteHeader() {
    var sticky = document.querySelector(".site-header__sticky");
    var header = document.querySelector(".site-header");
    var util = document.querySelector(".site-header__util");
    var notice = document.querySelector(".site-header__notice");
    var demoBanner = document.querySelector(".demo-banner");
    if (!sticky || !header || !util) {
      return;
    }

    function setTopOffset() {
      var h = demoBanner ? demoBanner.offsetHeight : 0;
      document.documentElement.style.setProperty("--sticky-top-offset", h + "px");
    }

    function updateStuckState() {
      var utilBox = util.getBoundingClientRect();
      var threshold = demoBanner
        ? demoBanner.getBoundingClientRect().bottom
        : 0;
      var stuck = utilBox.bottom <= threshold + 0.5;
      header.classList.toggle("site-header--stuck", stuck);
      if (notice) {
        if (stuck) {
          notice.setAttribute("aria-hidden", "true");
        } else {
          notice.removeAttribute("aria-hidden");
        }
      }
    }

    var ticking = false;
    function onFrame() {
      ticking = false;
      updateStuckState();
    }

    function requestUpdate() {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(onFrame);
      }
    }

    setTopOffset();
    updateStuckState();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", function () {
      setTopOffset();
      requestUpdate();
    });
  }

  initCookieBanner();
  initStickySiteHeader();

  if (document.body.dataset.page === "home") {
    initTabSections();
  }
})();
