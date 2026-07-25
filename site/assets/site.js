// Knowledge Library — progressive enhancements. Safe on file:// with no server.
(function () {
  "use strict";

  var isArticle = !document.body.classList.contains("index-page") && document.querySelector(".page-header");

  // Article chrome: topic eyebrow + floating back-to-library link
  if (isArticle) {
    var TOPICS = {
      "skin-care": "Skin Care", "hair-care": "Hair Care", "nutrition": "Nutrition & Diet",
      "fitness": "Fitness & Exercise", "medicine": "Medicine & Organ Health",
      "longevity": "Longevity & Biohacking", "supplements": "Supplements",
      "wellness": "Wellness & Lifestyle", "system-design": "Communication & Social Skills",
      "html": "HTML — Web Platform Course", "css": "CSS — Web Platform Course",
      "js": "JavaScript — Web Platform Course", "ts": "TypeScript — Web Platform Course",
      "java": "Java — Enterprise Course", "web": "How the Web Works — Web Platform Course",
    };
    var label = null;
    document.body.className.split(/\s+/).forEach(function (c) {
      if (c.indexOf("theme-") === 0 && TOPICS[c.slice(6)]) label = TOPICS[c.slice(6)];
    });
    var header = document.querySelector(".page-header");
    var h1 = header && header.querySelector("h1");
    if (label && h1) {
      var eyebrow = document.createElement("span");
      eyebrow.className = "eyebrow";
      eyebrow.textContent = label;
      header.insertBefore(eyebrow, h1);
    }
    var back = document.createElement("a");
    back.className = "back-link";
    // Course lessons live two levels deep (courses/<track>/), articles one (pages/)
    back.href = location.pathname.indexOf("/courses/") !== -1 ? "../../index.html" : "../index.html";
    back.innerHTML = "← Knowledge Library";
    document.body.appendChild(back);
  }

  // Reading progress bar (article pages get meaningful scroll; index too — harmless)
  var bar = document.createElement("div");
  bar.className = "progress-bar";
  document.body.prepend(bar);
  function progress() {
    var doc = document.documentElement;
    var max = doc.scrollHeight - doc.clientHeight;
    bar.style.width = max > 0 ? (100 * doc.scrollTop / max) + "%" : "0";
  }
  document.addEventListener("scroll", progress, { passive: true });
  progress();

  // Table of contents: only when a page has 4+ h2 sections inside <main>
  var main = document.querySelector("main");
  var heads = main ? Array.prototype.slice.call(main.querySelectorAll("section > h2")) : [];
  if (heads.length >= 4 && !document.querySelector(".library-nav")) {
    var toc = document.createElement("nav");
    toc.className = "toc";
    toc.setAttribute("aria-label", "Contents");
    var label = document.createElement("strong");
    label.textContent = "On this page";
    var list = document.createElement("ol");
    heads.forEach(function (h, i) {
      if (!h.id) h.id = "s-" + (i + 1) + "-" + h.textContent.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 40);
      var li = document.createElement("li");
      var a = document.createElement("a");
      a.href = "#" + h.id;
      a.textContent = h.textContent;
      li.appendChild(a);
      list.appendChild(li);
    });
    toc.appendChild(label);
    toc.appendChild(list);
    main.insertBefore(toc, main.firstElementChild);
  }

  // Realm switch (index page): Health and Technology are separate libraries,
  // one visible at a time. The choice survives a reload and is linkable via #hash.
  var realmBtns = Array.prototype.slice.call(document.querySelectorAll(".realm-btn"));
  var activeRealm = null;
  var applyFilter = function () {};
  if (realmBtns.length) {
    var realms = {};
    Array.prototype.slice.call(document.querySelectorAll(".realm")).forEach(function (r) {
      realms[r.id.replace(/^realm-/, "")] = r;
    });

    function showRealm(name, push) {
      if (!realms[name]) return;
      activeRealm = realms[name];
      Object.keys(realms).forEach(function (k) { realms[k].hidden = k !== name; });
      realmBtns.forEach(function (b) {
        var on = b.getAttribute("data-realm") === name;
        b.classList.toggle("is-active", on);
        b.setAttribute("aria-pressed", on ? "true" : "false");
      });
      try { localStorage.setItem("kl-realm", name); } catch (e) { /* private mode */ }
      if (push && history.replaceState) history.replaceState(null, "", "#" + name);
      applyFilter(); // re-scope an active search to the realm now on screen
    }

    realmBtns.forEach(function (b) {
      b.addEventListener("click", function () { showRealm(b.getAttribute("data-realm"), true); });
    });

    // A deep link to a section inside a realm must open that realm — on load and
    // on any later hash change (in-page anchors do not reload the document).
    function realmFromHash() {
      var hash = location.hash.slice(1);
      if (!hash) return null;
      if (realms[hash]) return hash;
      var target = document.getElementById(hash);
      var owning = target && target.closest(".realm");
      return owning ? owning.id.replace(/^realm-/, "") : null;
    }

    function syncToHash(scroll) {
      var name = realmFromHash();
      if (!name) return false;
      showRealm(name, false);
      var target = document.getElementById(location.hash.slice(1));
      if (scroll && target && target.scrollIntoView) target.scrollIntoView();
      return true;
    }

    if (!syncToHash(true)) {
      var stored = null;
      try { stored = localStorage.getItem("kl-realm"); } catch (e) { /* ignore */ }
      showRealm(stored && realms[stored] ? stored : "health", false);
    }
    window.addEventListener("hashchange", function () { syncToHash(true); });
  }

  // Library search filter (index page only). Scoped to the active realm so a
  // search never silently returns hits from the library you are not looking at.
  var filter = document.getElementById("library-filter");
  if (filter) {
    var noResults = document.querySelector(".no-results");
    applyFilter = function () {
      var scope = activeRealm || document;
      var q = filter.value.trim().toLowerCase();
      var anyShown = false;
      Array.prototype.slice.call(scope.querySelectorAll(".card")).forEach(function (c) {
        var hit = !q || c.textContent.toLowerCase().indexOf(q) !== -1;
        c.hidden = !hit;
        if (hit) anyShown = true;
      });
      Array.prototype.slice.call(scope.querySelectorAll(".library-nav .submenu")).forEach(function (s) {
        s.hidden = !s.querySelector(".card:not([hidden])");
      });
      Array.prototype.slice.call(scope.querySelectorAll(".library-nav .menu")).forEach(function (m) {
        m.hidden = !m.querySelector(".submenu:not([hidden])");
      });
      var chips = scope.querySelector(".topic-chips");
      if (chips) chips.hidden = !!q;
      if (noResults) noResults.hidden = anyShown;
    };
    filter.addEventListener("input", applyFilter);
  }

  // Interview Q&A: question count in heading + expand/collapse-all control
  var qaItems = document.querySelectorAll(".qa");
  if (qaItems.length) {
    var qaSection = qaItems[0].closest("section");
    var qaHead = qaSection && qaSection.querySelector("h2");
    if (qaHead && qaHead.textContent.indexOf("(") === -1) {
      qaHead.textContent += " (" + qaItems.length + ")";
    }
    var toggle = document.createElement("button");
    toggle.className = "qa-toggle-all";
    toggle.type = "button";
    var allOpen = false;
    function labelToggle() { toggle.textContent = allOpen ? "Collapse all answers" : "Expand all answers"; }
    labelToggle();
    toggle.addEventListener("click", function () {
      allOpen = !allOpen;
      qaItems.forEach(function (d) { d.open = allOpen; });
      labelToggle();
    });
    qaItems[0].parentNode.insertBefore(toggle, qaItems[0]);
  }

  // Scroll-reveal for sections, callouts, tables
  if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches && "IntersectionObserver" in window) {
    // Skip anything inside a realm: a hidden realm is display:none, so its
    // sections never intersect and would stay stuck at opacity:0 even after
    // the realm is shown. The index needs no entrance animation anyway.
    var targets = Array.prototype.filter.call(
      document.querySelectorAll("main section, main aside, main table"),
      function (t) { return !t.closest(".realm"); }
    );
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
      });
    }, { rootMargin: "0px 0px -8% 0px" });
    targets.forEach(function (t) { t.classList.add("reveal"); io.observe(t); });
  }
})();
