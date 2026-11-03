/* Bilal's Best Buys - featured category tiles for the home page. */
(function(){
var TILES=[
["Electronics","⚡","/category-electronics","#f5a623","linear-gradient(135deg,#1e3c72,#2a5298)",""],
["Smart Home","🏠","/category-smart-home","#4dd0e1","linear-gradient(135deg,#134e5e,#71b280)",""],
["Home & Kitchen","🍳","/category-home-kitchen","#ff8a65","linear-gradient(135deg,#7b4397,#dc2430)",""],
["Beauty & Personal Care","💄","/category-beauty","#f06292","linear-gradient(135deg,#a8326e,#e96443)",""],
["Travel Essentials","✈️","/category-travel","#81d4fa","linear-gradient(135deg,#0f4c81,#3aa6c9)",""],
["Fitness & Lifestyle","🏋️","/category-fitness","#aed581","linear-gradient(135deg,#1f6f4a,#8bc34a)",""],
["Accessories","⌚","/category-accessories","#ce93d8","linear-gradient(135deg,#43307a,#8e44ad)",""],
["Bags Collection","👜","/category-bags","#e0b484","linear-gradient(135deg,#5b3a29,#c08552)",""],
["Gifts & Trending Finds","🎁","/category-gifts","#ffd54f","linear-gradient(135deg,#b24592,#f15f79)",""],
["Women Clothes","👗","/category-women-clothes","#f48fb1","linear-gradient(135deg,#6a1b4d,#c2185b)","/women-summer-bg.jpg",1],
["Kids Clothes","🧒","/category-kids-clothes","#80deea","linear-gradient(135deg,#1565c0,#42a5f5)","/kids-summer-bg.jpg",1]];
function $(s){return document.querySelector(s)}
function esc(t){return String(t).replace(/[&<>"]/g,function(c){return{"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]})}

var css=document.createElement("style");
css.textContent=
".bb-feat{padding:22px 0 0}.bb-feat h2{margin:0}.bb-feat p{margin:0 0 14px;color:var(--muted)}"+
".bb-grid{display:grid;grid-template-columns:1fr 1fr;gap:14px}"+
".bb-tile{position:relative;display:flex;flex-direction:column;justify-content:flex-end;min-height:170px;border-radius:24px;overflow:hidden;padding:14px;color:#fff!important;text-decoration:none!important;background-size:cover;background-position:center top}"+
".bb-tile:before{content:'';position:absolute;inset:0;background:linear-gradient(180deg,rgba(0,0,0,.05) 25%,rgba(5,8,18,.88))}.bb-tile>*{position:relative}"+
".bb-ico,.bb-arr{position:absolute;top:12px;width:40px;height:40px;border-radius:50%;display:flex;align-items:center;justify-content:center;background:rgba(255,255,255,.18);border:1px solid rgba(255,255,255,.35);font-size:19px}.bb-ico{left:12px}.bb-arr{right:12px}"+
".bb-dash{width:30px;height:4px;border-radius:2px;margin-bottom:8px}.bb-tile h3{margin:0;font:700 19px/1.2 system-ui,sans-serif;text-shadow:0 2px 6px rgba(0,0,0,.6)}";
document.head.appendChild(css);

/* featured tiles on the home page, above the hero */
function isHome(){var p=location.pathname.replace(/\/$/,"");return p===""||p==="/index"||p==="/index.html"}
function ensureTiles(){
 var app=$("#app");if(!app||!isHome()||$("#bbTiles"))return;
 var s=document.createElement("section");s.id="bbTiles";s.className="wrap bb-feat";
 s.innerHTML='<h2>Featured Categories</h2><p>'+TILES.length+' available</p><div class="bb-grid">'+TILES.map(function(c){
  var bg=c[5]?'url("'+c[5]+'"),'+c[4]:c[4];
  return '<a class="bb-tile" href="'+c[2]+'"'+(c[6]?' data-hard="1"':'')+' style="background-image:'+bg+'"><div class="bb-ico">'+c[1]+'</div><div class="bb-arr">↗</div><div class="bb-dash" style="background:'+c[3]+'"></div><h3>'+esc(c[0])+'</h3></a>'}).join("")+'</div>';
 app.insertBefore(s,app.firstChild);
 app.querySelectorAll("h2").forEach(function(h){if(/^Featured categories$/.test(h.textContent.trim())){var sec=h.closest("section");if(sec&&sec.id!=="bbTiles")sec.style.display="none"}});
}
document.addEventListener("click",function(e){var a=e.target.closest&&e.target.closest("a[data-hard]");if(a){e.preventDefault();e.stopImmediatePropagation();location.href=a.getAttribute("href")}},true);
var app0=$("#app");if(app0)new MutationObserver(ensureTiles).observe(app0,{childList:true});
ensureTiles();
})();
