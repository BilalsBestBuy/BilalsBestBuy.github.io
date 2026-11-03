(function(){
  var IMG="/bags-banner.png";
  function fix(){
    document.querySelectorAll('a.cat[href="/category-bags"]').forEach(function(a){
      if(a.querySelector("img.bags-img"))return;
      var i=document.createElement("img");
      i.className="bags-img";
      i.src=IMG;
      i.alt="Bags Collection";
      i.loading="lazy";
      i.style.cssText="width:100%;aspect-ratio:4/3;object-fit:cover;border-radius:16px;display:block;margin-bottom:10px";
      a.insertBefore(i,a.firstChild);
    });
  }
  function start(){
    fix();
    var app=document.getElementById("app");
    if(app)new MutationObserver(fix).observe(app,{childList:true,subtree:true});
  }
  if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",start);else start();
})();
