// Knowledge Library — progressive enhancements. Safe on file:// with no server.
(function () {
  "use strict";

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
