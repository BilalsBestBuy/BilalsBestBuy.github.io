(function(){
  var IMG="/bags-banner.jpg";
  function findCard(el){
    var c=el.closest("a,article,li,.card,[class*='card'],[class*='cat']");
    return c||el.parentElement;
  }
  function fix(){
    var area=document.getElementById("app")||document.body;
    var nodes=area.querySelectorAll("a,h2,h3,h4,strong,span,div,p");
    for(var i=0;i<nodes.length;i++){
      var n=nodes[i];
      if(n.children.length>0&&n.tagName!=="A")continue;
      var t=(n.textContent||"").replace(/\s+/g," ").trim();
      if(t!=="Bags Collection")continue;
      if(n.closest("nav,header,footer,.dd-panel,.has-dd,ul"))continue;
      var card=findCard(n);
      if(!card||card.dataset.bagsDone)continue;
      if(card.offsetHeight<120)continue;
      if(card.querySelector("img:not(.who img)"))continue;
      card.dataset.bagsDone="1";
      card.style.setProperty("background-image","linear-gradient(to top,rgba(0,0,0,.75),rgba(0,0,0,.05) 65%),url("+IMG+")","important");
      card.style.setProperty("background-size","cover","important");
      card.style.setProperty("background-position","center","important");
      card.style.setProperty("background-repeat","no-repeat","important");
    }
  }
  function start(){
    fix();
    new MutationObserver(fix).observe(document.body,{childList:true,subtree:true});
    setTimeout(fix,500);setTimeout(fix,1500);
  }
  if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",start);else start();
})();
