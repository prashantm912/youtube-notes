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

  // Library search filter (index page only)
  var filter = document.getElementById("library-filter");
  if (filter) {
    var cards = Array.prototype.slice.call(document.querySelectorAll(".card"));
    var submenus = Array.prototype.slice.call(document.querySelectorAll(".library-nav .submenu"));
    var menus = Array.prototype.slice.call(document.querySelectorAll(".library-nav > .menu"));
    var chips = document.querySelector(".topic-chips");
    var noResults = document.querySelector(".no-results");
    filter.addEventListener("input", function () {
      var q = filter.value.trim().toLowerCase();
      var anyShown = false;
      cards.forEach(function (c) {
        var hit = !q || c.textContent.toLowerCase().indexOf(q) !== -1;
        c.hidden = !hit;
        if (hit) anyShown = true;
      });
      submenus.forEach(function (s) {
        s.hidden = !s.querySelector(".card:not([hidden])");
      });
      menus.forEach(function (m) {
        m.hidden = !m.querySelector(".submenu:not([hidden])");
      });
      if (chips) chips.hidden = !!q;
      if (noResults) noResults.hidden = anyShown;
    });
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
    var targets = document.querySelectorAll("main section, main aside, main table");
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
      });
    }, { rootMargin: "0px 0px -8% 0px" });
    targets.forEach(function (t) { t.classList.add("reveal"); io.observe(t); });
  }
})();
