/* extra-products.js
   Adds the standalone product pages (shop-*.html) to the site's product lists and makes
   the search box find them by their tags.
   Each page is read for its title, short text, Amazon link and tags, so nothing is typed twice.
   To add a product later: upload its shop-*.html page, then add one line below.
   Line format: [page file name without .html, category, emoji, image file or ""] */
(function () {
  var EXTRA = [
    ["shop-biodance-bio-collagen-real-deep-mask", "beauty", "🧖", "/biodance-collagen-mask.jpg"],
    ["shop-dr-althea-345-relief-cream-mist-duo", "beauty", "🧴", "/dr-althea-345-duo.jpg"],
    ["shop-leuven-pistachio-kunafa-cream-dubai-chocolate", "gifts", "🍫", "/leuven-pistachio-spread.jpg"],
    ["shop-lzerking-colorful-gift-bags-30-pack", "gifts", "🎁", "/lzerking-gift-bags.jpg"],
    ["shop-medicube-pdrn-serum-capsule-cream", "beauty", "✨", "/medicube-pdrn-duo.jpg"],
    ["shop-odoly-genuine-suede-clogs-cork-footbed", "accessories", "👞", "/odoly-suede-clogs.jpg"],
    ["shop-oud-ya-aini-muattar-bakhoor-dukhni", "home-kitchen", "🪔", "/oud-ya-aini-bakhoor.jpg"],
    ["shop-plug-in-motion-sensor-night-light-2-pack", "smart-home", "💡", "/plug-in-night-light.jpg"],
    ["shop-roku-streaming-stick-hd-voice-remote", "electronics", "📺", "/roku-streaming-stick-hd.jpg"],
    ["shop-yanziliu-kaftan-dress-beach-cover-up", "travel", "👗", "/yanziliu-kaftan-dress.jpg"],
    ["shop-amazon-smart-plug-make-your-home-smarter", "smart-home", "🔌", ""],
    ["shop-tiny-smart-plug-make-home-smarter", "smart-home", "🔌", ""],
    ["shop-one-simple-gadget-every-smart-home-should-have", "smart-home", "🔌", ""],
    ["shop-amazon-echo-dot-smart-speaker-for-your-home", "smart-home", "🔊", ""],
    ["shop-amazon-echo-dot-small-speaker-big-smart-features", "smart-home", "🔊", ""],
    ["shop-kasa-smart-plug-4-pack-smart-home-upgrade", "smart-home", "⚡", ""],
    ["shop-4-smart-plugs-in-one-pack-smart-home-find", "smart-home", "⚡", ""],
    ["shop-want-a-smarter-home-start-with-these-smart-plugs", "smart-home", "⚡", ""],
    ["shop-smart-color-bulbs-transform-your-room-instantly", "smart-home", "💡", ""],
    ["shop-make-your-room-look-amazing-with-smart-color-lights", "smart-home", "💡", ""],
    ["shop-trending-smart-home-gadget-color-changing-bulbs", "smart-home", "💡", ""],
    ["shop-tapo-dl110-smart-lock-upgrade-your-door-security", "smart-home", "🔐", ""],
    ["shop-forget-old-school-locks-check-out-this-smart-lock", "smart-home", "🔐", ""],
    ["shop-smart-home-upgrade-you-should-know-about-tapo-dl110", "smart-home", "🔐", ""],
    ["shop-5-smart-home-gadgets-you-should-check-out", "smart-home", "🏠", ""]
  ];

  function build(e) {
    return fetch("/" + e[0] + ".html")
      .then(function (r) { if (!r.ok) throw 0; return r.text(); })
      .then(function (t) {
        var d = new DOMParser().parseFromString(t, "text/html");
        var h = d.querySelector("h1"), l = d.querySelector(".lede"), a = d.querySelector("a.btn");
        var k = d.querySelector('meta[name="keywords"]');
        var roundup = !!d.querySelector('meta[name="page-type"][content="roundup"]');
        if (!h || (!a && !roundup)) return null;
        return {
          id: e[0], slug: e[0], image: e[3], name: h.textContent.trim(), category: e[1],
          marketplace: "Amazon", icon: e[2], short: l ? l.textContent.trim() : "", long: "",
          features: [], price: null, currency: "", rating: null, reviews: null,
          tags: k ? k.getAttribute("content") : "",
          affiliateUrl: roundup ? location.origin + "/" + e[0] + ".html" : a.href,
          featured: false, published: true, demo: false, updated: "2026-10-23"
        };
      })
      .catch(function () { return null; });
  }

  /* Search box: also look at tags */
  if (typeof filt === "function" && typeof live === "function") {
    filt = function () {
      var q = ($("#fq").value || "").toLowerCase(), c = $("#fc").value, s = $("#fs").value;
      var l = live().filter(function (p) {
        return (!c || p.category == c) &&
          (!q || (p.name + " " + p.short + " " + catName(p.category) + " " + (p.tags || "")).toLowerCase().indexOf(q) > -1);
      });
      if (s == "name") l.sort(function (a, b) { return a.name.localeCompare(b.name); });
      if (s == "price") l = l.filter(function (p) { return p.price != null; }).sort(function (a, b) { return a.price - b.price; });
      $("#res").innerHTML = l.map(card).join("") ||
        '<p>No products match. Try a different word or <a href="/shop">clear filters</a>.</p>';
    };
  }

  if (typeof PRODUCTS !== "undefined") {
    Promise.all(EXTRA.map(build)).then(function (list) {
      list.forEach(function (p) {
        if (p && !PRODUCTS.some(function (x) { return x.id === p.id; })) PRODUCTS.push(p);
      });
      var path = location.pathname.replace(/\.html$/, "");
      if (document.getElementById("res")) filt();
      else if (/^\/(category-|index$|$)/.test(path)) route();
    });
  }

  /* Product cards link to /product-<name>. For these products, open the real page instead. */
  document.addEventListener("click", function (e) {
    var a = e.target.closest && e.target.closest("a[href^='/product-shop-']");
    if (!a || e.ctrlKey || e.metaKey || e.shiftKey) return;
    e.preventDefault();
    e.stopImmediatePropagation();
    location.href = a.getAttribute("href").replace("/product-", "/") + ".html";
  }, true);
})();
