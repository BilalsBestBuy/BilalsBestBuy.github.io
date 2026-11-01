/* Bilal's Best Buys - app-style shell. Add to index.html: <script defer src="/app-shell.js"></script> */
(function(){
/* ====== SETTINGS ====== */
var GOOGLE_CLIENT_ID = "149296263106-kt70om5gh0cefgcr9kvhfu2nksgg3fql.apps.googleusercontent.com";
var UMAMI_SHARE_ID   = "";                      /* code at the end of your Umami Share URL */
/* ====================== */
var TILES=[
["Electronics","⚡","/category-electronics","#f5a623","linear-gradient(135deg,#1e3c72,#2a5298)",""],
["Smart Home","🏠","/category-smart-home","#4dd0e1","linear-gradient(135deg,#134e5e,#71b280)",""],
["Home & Kitchen","🍳","/category-home-kitchen","#ff8a65","linear-gradient(135deg,#7b4397,#dc2430)",""],
["Beauty & Personal Care","💄","/category-beauty","#f06292","linear-gradient(135deg,#a8326e,#e96443)",""],
["Travel Essentials","✈️","/category-travel","#81d4fa","linear-gradient(135deg,#0f4c81,#3aa6c9)",""],
["Fitness & Lifestyle","🏋️","/category-fitness","#aed581","linear-gradient(135deg,#1f6f4a,#8bc34a)",""],
["Accessories","👜","/category-accessories","#ce93d8","linear-gradient(135deg,#43307a,#8e44ad)",""],
["Gifts & Trending Finds","🎁","/category-gifts","#ffd54f","linear-gradient(135deg,#b24592,#f15f79)",""],
["Women Clothes","👗","/category-women-clothes","#f48fb1","linear-gradient(135deg,#6a1b4d,#c2185b)","/women-summer-bg.jpg",1],
["Kids Clothes","🧒","/category-kids-clothes","#80deea","linear-gradient(135deg,#1565c0,#42a5f5)","/kids-summer-bg.jpg",1]];
function $(s){return document.querySelector(s)}
function esc(t){return String(t).replace(/[&<>"]/g,function(c){return{"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]})}
function st(k,v){try{if(v===undefined)return localStorage.getItem(k);if(v===null)localStorage.removeItem(k);else localStorage.setItem(k,v)}catch(e){return null}}

var css=document.createElement("style");
css.textContent=
"body{padding-bottom:calc(84px + env(safe-area-inset-bottom,0px))}"+
".who{bottom:calc(96px + env(safe-area-inset-bottom,0px))!important}"+
".bb-bell{position:relative;width:44px;height:44px;border-radius:50%;border:1px solid var(--line);background:var(--card);color:var(--text);font-size:20px;cursor:pointer;margin-left:auto}"+
".bb-badge{position:absolute;top:-4px;right:-4px;background:#e53935;color:#fff;font-size:11px;font-weight:700;min-width:19px;height:19px;border-radius:10px;display:none;align-items:center;justify-content:center;padding:0 4px}"+
".bb-panel{display:none;position:fixed;right:12px;top:calc(70px + env(safe-area-inset-top,0px));width:min(92vw,360px);background:var(--card);color:var(--text);border:1px solid var(--line);border-radius:18px;padding:14px;z-index:60;box-shadow:0 18px 40px rgba(0,0,0,.3)}"+
".bb-panel.open{display:block}.bb-panel h3{margin:0 0 8px;font-size:17px}"+
".bb-stats{display:grid;grid-template-columns:repeat(3,1fr);gap:10px}"+
".bb-stat{background:var(--bg);border:1px solid var(--line);border-radius:14px;padding:12px 4px;text-align:center}.bb-stat b{display:block;font-size:24px}.bb-stat span{font-size:12px;color:var(--muted)}"+
".bb-feat{padding:22px 0 0}.bb-feat h2{margin:0}.bb-feat p{margin:0 0 14px;color:var(--muted)}"+
".bb-grid{display:grid;grid-template-columns:1fr 1fr;gap:14px}"+
".bb-tile{position:relative;display:flex;flex-direction:column;justify-content:flex-end;min-height:170px;border-radius:24px;overflow:hidden;padding:14px;color:#fff!important;text-decoration:none!important;background-size:cover;background-position:center top}"+
".bb-tile:before{content:'';position:absolute;inset:0;background:linear-gradient(180deg,rgba(0,0,0,.05) 25%,rgba(5,8,18,.88))}.bb-tile>*{position:relative}"+
".bb-ico,.bb-arr{position:absolute;top:12px;width:40px;height:40px;border-radius:50%;display:flex;align-items:center;justify-content:center;background:rgba(255,255,255,.18);border:1px solid rgba(255,255,255,.35);font-size:19px}.bb-ico{left:12px}.bb-arr{right:12px}"+
".bb-dash{width:30px;height:4px;border-radius:2px;margin-bottom:8px}.bb-tile h3{margin:0;font:700 19px/1.2 system-ui,sans-serif;text-shadow:0 2px 6px rgba(0,0,0,.6)}"+
".bb-bar{position:fixed;left:0;right:0;bottom:0;display:flex;justify-content:space-around;background:var(--navy);padding:8px 8px calc(8px + env(safe-area-inset-bottom,0px));z-index:70;border-top:1px solid var(--line)}"+
".bb-tab{flex:1;max-width:140px;background:none;border:0;color:#cdd9f5;padding:8px 4px;border-radius:22px;font:15px system-ui,sans-serif;cursor:pointer}.bb-tab span{display:block;font-size:24px;line-height:1.1}.bb-tab.on{background:rgba(255,255,255,.16);color:#fff;font-weight:700}"+
".bb-sheet{display:none;position:fixed;left:0;right:0;top:0;bottom:calc(76px + env(safe-area-inset-bottom,0px));background:var(--bg);color:var(--text);z-index:65;overflow:auto;padding:calc(18px + env(safe-area-inset-top,0px)) 18px 24px}"+
".bb-sheet.open{display:block}.bb-sheet h1{margin:0 0 14px}"+
".bb-box{background:var(--card);border:1px solid var(--line);border-radius:22px;padding:22px;text-align:center;margin-top:16px}"+
".bb-av{width:84px;height:84px;border-radius:50%;object-fit:cover;margin-bottom:10px}.bb-hide{display:none!important}.bb-note{color:var(--muted);font-size:14px}";
document.head.appendChild(css);

/* bell + visitor stats */
var hd=$(".hd"),brand=$(".brand");
var bell=document.createElement("button");bell.className="bb-bell";bell.setAttribute("aria-label","Visitors");bell.innerHTML='🔔<span class="bb-badge" id="bbBadge">0</span>';
if(hd&&brand)brand.insertAdjacentElement("afterend",bell);
var panel=document.createElement("div");panel.className="bb-panel";
panel.innerHTML='<h3>Visitors</h3><div class="bb-stats"><div class="bb-stat"><b data-s="today">–</b><span>Today</span></div><div class="bb-stat"><b data-s="d7">–</b><span>Last 7 days</span></div><div class="bb-stat"><b data-s="d30">–</b><span>Last 30 days</span></div></div>';
document.body.appendChild(panel);
bell.onclick=function(e){e.stopPropagation();panel.classList.toggle("open")};
document.addEventListener("click",function(e){if(!panel.contains(e.target))panel.classList.remove("open")});
function setStats(o){document.querySelectorAll("[data-s]").forEach(function(el){var v=o[el.dataset.s];el.textContent=v==null?"–":v});if(o.today!=null){var b=$("#bbBadge");b.textContent=o.today;b.style.display="flex"}}
function val(x){return x&&typeof x==="object"?x.value:x}
if(UMAMI_SHARE_ID){var base="https://cloud.umami.is/api";
fetch(base+"/share/"+UMAMI_SHARE_ID).then(function(r){return r.json()}).then(function(s){
 var now=Date.now(),d=new Date();d.setHours(0,0,0,0);var R={today:d.getTime(),d7:now-7*864e5,d30:now-30*864e5},out={};
 return Promise.all(Object.keys(R).map(function(k){return fetch(base+"/websites/"+s.websiteId+"/stats?startAt="+R[k]+"&endAt="+now,{headers:{"x-umami-share-token":s.token}}).then(function(r){return r.json()}).then(function(j){out[k]=val(j.visitors)})})).then(function(){setStats(out)});
}).catch(function(){})}

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

/* bottom bar + sheets */
var bar=document.createElement("nav");bar.className="bb-bar";
bar.innerHTML='<button class="bb-tab on" data-t="home"><span>🏠</span>Home</button><button class="bb-tab" data-t="dash"><span>📊</span>Dashboard</button><button class="bb-tab" data-t="acc"><span>👤</span>Account</button>';
document.body.appendChild(bar);
var dash=document.createElement("div");dash.className="bb-sheet";dash.id="bbDash";
dash.innerHTML='<h1>Dashboard</h1><div class="bb-box" id="dOut"><p>Please sign in to see your dashboard.</p><button class="btn blue" data-go="acc">Go to Account</button></div><div class="bb-hide" id="dIn"><p>Welcome, <b id="dName"></b></p><div class="bb-stats"><div class="bb-stat"><b data-s="today">–</b><span>Today</span></div><div class="bb-stat"><b data-s="d7">–</b><span>Last 7 days</span></div><div class="bb-stat"><b data-s="d30">–</b><span>Last 30 days</span></div></div><p class="bb-note">Visitor numbers for this website.</p></div>';
var acc=document.createElement("div");acc.className="bb-sheet";acc.id="bbAcc";
acc.innerHTML='<h1>Account</h1><div class="bb-box" id="aOut"><p>Sign in with your Google account.</p><div id="bbG" style="display:flex;justify-content:center"></div><p class="bb-note bb-hide" id="bbNo">Google sign-in is not set up yet. Add the Google Client ID at the top of app-shell.js.</p></div><div class="bb-box bb-hide" id="aIn"><img class="bb-av" id="aImg" alt="Profile photo" referrerpolicy="no-referrer"><h3 id="aName" style="margin:0"></h3><p class="bb-note" id="aMail"></p><button class="btn blue" id="bbOut">Sign out</button></div>';
document.body.appendChild(dash);document.body.appendChild(acc);
function showTab(t){
 dash.classList.toggle("open",t==="dash");acc.classList.toggle("open",t==="acc");
 bar.querySelectorAll(".bb-tab").forEach(function(b){b.classList.toggle("on",b.dataset.t===t)});
 if(t==="home"){if(!isHome()){if(typeof go==="function")go("/");else location.href="/"}else window.scrollTo(0,0)}
}
bar.addEventListener("click",function(e){var b=e.target.closest(".bb-tab");if(b)showTab(b.dataset.t)});
document.addEventListener("click",function(e){var g=e.target.closest&&e.target.closest("[data-go]");if(g)showTab(g.dataset.go)});
window.addEventListener("popstate",function(){showTab("home")});

/* Google sign-in */
function jwt(t){var p=t.split(".")[1].replace(/-/g,"+").replace(/_/g,"/");return JSON.parse(decodeURIComponent(escape(atob(p))))}
function apply(u){var on=!!u;
 $("#aOut").classList.toggle("bb-hide",on);$("#aIn").classList.toggle("bb-hide",!on);
 $("#dOut").classList.toggle("bb-hide",on);$("#dIn").classList.toggle("bb-hide",!on);
 if(on){$("#aName").textContent=u.name||"";$("#aMail").textContent=u.email||"";$("#aImg").src=u.picture||"";$("#dName").textContent=u.name||""}}
var saved=null;try{saved=JSON.parse(st("bbUser"))}catch(e){}apply(saved);
function onCred(r){try{var p=jwt(r.credential),u={name:p.name,email:p.email,picture:p.picture};st("bbUser",JSON.stringify(u));apply(u)}catch(e){}}
function initG(){
 if(GOOGLE_CLIENT_ID==="YOUR_GOOGLE_CLIENT_ID"){$("#bbNo").classList.remove("bb-hide");return}
 if(!window.google||!google.accounts)return setTimeout(initG,400);
 google.accounts.id.initialize({client_id:GOOGLE_CLIENT_ID,callback:onCred});
 google.accounts.id.renderButton($("#bbG"),{theme:"filled_blue",size:"large",text:"signin_with",shape:"pill"});
}
var gs=document.createElement("script");gs.src="https://accounts.google.com/gsi/client";gs.async=true;gs.defer=true;document.head.appendChild(gs);
initG();
$("#bbOut").onclick=function(){st("bbUser",null);apply(null);try{google.accounts.id.disableAutoSelect()}catch(e){}};
})();
