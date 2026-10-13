/* extra-products.js
   Adds the new standalone product pages (shop-*.html) to the site's product lists.
   Each page is read for its title, short text and Amazon link, so nothing is typed twice.
   To add a product later: upload its shop-*.html page + image, then add one line below.
   Line format: [page file name without .html, category, emoji, image file] */
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
    ["shop-yanziliu-kaftan-dress-beach-cover-up", "travel", "👗", "/yanziliu-kaftan-dress.jpg"]
  ];

  function build(e) {
    return fetch("/" + e[0] + ".html")
      .then(function (r) { if (!r.ok) throw 0; return r.text(); })
      .then(function (t) {
        var d = new DOMParser().parseFromString(t, "text/html");
        var h = d.querySelector("h1"), l = d.querySelector(".lede"), a = d.querySelector("a.btn");
        if (!h || !a) return null;
        return {
          id: e[0], slug: e[0], image: e[3], name: h.textContent.trim(), category: e[1],
          marketplace: "Amazon", icon: e[2], short: l ? l.textContent.trim() : "", long: "",
          features: [], price: null, currency: "", rating: null, reviews: null,
          affiliateUrl: a.href, featured: false, published: true, demo: false, updated: "2026-10-13"
        };
      })
      .catch(function () { return null; });
  }

  Promise.all(EXTRA.map(build)).then(function (list) {
    list.forEach(function (p) {
      if (p && !PRODUCTS.some(function (x) { return x.id === p.id; })) PRODUCTS.push(p);
    });
    var path = location.pathname.replace(/\.html$/, "");
    if (document.getElementById("res")) filt();
    else if (/^\/(category-|index$|$)/.test(path)) route();
  });

  /* Product cards link to /product-<name>. For the new products, open the real page instead. */
  document.addEventListener("click", function (e) {
    var a = e.target.closest && e.target.closest("a[href^='/product-shop-']");
    if (!a || e.ctrlKey || e.metaKey || e.shiftKey) return;
    e.preventDefault();
    e.stopImmediatePropagation();
    location.href = a.getAttribute("href").replace("/product-", "/") + ".html";
  }, true);
})();
