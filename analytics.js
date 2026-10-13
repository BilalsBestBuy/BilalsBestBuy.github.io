/* analytics.js
   Loads Umami visitor analytics (cookie-free). Add this line to the <head> of every page:
   <script defer src="/analytics.js"></script> */
(function () {
  var ID = "8a93f7de-ede2-4122-8128-0fca99e9f57f";
  if (document.querySelector("script[data-website-id]")) return;
  var s = document.createElement("script");
  s.defer = true;
  s.src = "https://cloud.umami.is/script.js";
  s.setAttribute("data-website-id", ID);
  document.head.appendChild(s);
})();
