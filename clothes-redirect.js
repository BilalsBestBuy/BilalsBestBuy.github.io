document.addEventListener("click", function (e) {
  var a = e.target.closest ? e.target.closest("a") : null;
  if (!a) return;
  var h = a.getAttribute("href") || "";
  var m = h.match(/(kids-clothes|women-clothes)(\.html)?\/?$/);
  if (!m) return;
  e.preventDefault();
  e.stopPropagation();
  location.href = "/category-" + m[1];
}, true);
