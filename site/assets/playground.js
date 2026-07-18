// Live playground: turns each <div class="playground"><textarea class="playground-src">
// into an editor + live iframe preview. No dependencies, works from file://.
(function () {
  "use strict";
  var boxes = document.querySelectorAll(".playground");
  boxes.forEach(function (box) {
    var src = box.querySelector(".playground-src");
    if (!src) return;
    var frame = document.createElement("iframe");
    frame.setAttribute("title", "Live preview");
    frame.setAttribute("sandbox", "allow-scripts");
    box.appendChild(frame);
    var timer = null;
    function render() {
      frame.srcdoc = src.value;
    }
    src.addEventListener("input", function () {
      clearTimeout(timer);
      timer = setTimeout(render, 250);
    });
    // Tab inserts two spaces instead of leaving the editor
    src.addEventListener("keydown", function (e) {
      if (e.key === "Tab") {
        e.preventDefault();
        var s = src.selectionStart, en = src.selectionEnd;
        src.value = src.value.slice(0, s) + "  " + src.value.slice(en);
        src.selectionStart = src.selectionEnd = s + 2;
      }
    });
    render();
  });
})();
