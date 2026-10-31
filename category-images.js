(function () {
  var MAP = {
    "electronics": "cat-electronics.jpg",
    "smart-home": "cat-smart-home.jpg",
    "home-kitchen": "cat-home-kitchen.jpg",
    "beauty": "cat-beauty.jpg",
    "women-clothes": "cat-women-clothes.jpg",
    "gifts": "cat-gifts.jpg",
    "travel": "cat-travel.jpg",
    "fitness": "cat-fitness.jpg",
    "accessories": "cat-accessories.jpg",
    "kids-clothes": "cat-kids-clothes.jpg"
  };
  var RE = /(?:^|[\/#=-])(electronics|smart-home|home-kitchen|beauty|women-clothes|gifts|travel|fitness|accessories|kids-clothes)(?:\.html)?\/?$/;
  var SKIP = "header,nav,footer,aside,.bc,.bar,.dd,.menu,#nav";

  function run() {
    var links = document.querySelectorAll("a[href]");
    for (var i = 0; i < links.length; i++) {
      var a = links[i];
      if (a.getAttribute("data-cimg")) continue;
      if (a.closest(SKIP)) continue;
      var m = RE.exec(a.getAttribute("href") || "");
      if (!m) continue;
      a.setAttribute("data-cimg", "1");
      if (a.querySelector("img")) continue;

      var img = new Image();
      img.src = "/" + MAP[m[1]];
      img.alt = (a.textContent || "").trim();
      img.loading = "lazy";
      img.style.cssText = "display:block;width:100%;aspect-ratio:4/3;object-fit:cover;border-radius:12px;margin:0 0 10px";
      img.onerror = function () { this.remove(); };

      for (var j = 0; j < a.children.length; j++) {
        var c = a.children[j];
        if (/^[^A-Za-z0-9\s]{1,4}$/.test((c.textContent || "").trim())) c.style.display = "none";
      }
      if ((getComputedStyle(a).display || "").indexOf("flex") > -1) a.style.flexDirection = "column";
      a.insertBefore(img, a.firstChild);
    }
  }

  var t;
  function later() { clearTimeout(t); t = setTimeout(run, 60); }
  document.addEventListener("DOMContentLoaded", run);
  new MutationObserver(later).observe(document.documentElement, { childList: true, subtree: true });
  run();
})();
