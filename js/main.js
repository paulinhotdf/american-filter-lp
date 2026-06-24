/* American Filter LP — interações */
(function(){
  "use strict";
  var WA = "5512982855000";

  function waLink(msg){
    return "https://wa.me/" + WA + "?text=" + encodeURIComponent(msg || "Olá! Vim pela página do American Filter.");
  }

  // WhatsApp links (pré-preenchidos por CTA)
  document.querySelectorAll(".js-wa").forEach(function(a){
    a.setAttribute("href", waLink(a.getAttribute("data-msg")));
    a.setAttribute("target","_blank");
    a.setAttribute("rel","noopener");
  });

  // Header scrolled
  var header = document.getElementById("header");
  function onScroll(){
    if(window.scrollY > 30) header.classList.add("scrolled");
    else header.classList.remove("scrolled");
  }
  window.addEventListener("scroll", onScroll, {passive:true});
  onScroll();

  // Menu mobile
  var toggle = document.getElementById("menuToggle"), nav = document.getElementById("nav");
  if(toggle){
    toggle.addEventListener("click", function(){ nav.classList.toggle("open"); });
    nav.querySelectorAll("a").forEach(function(a){ a.addEventListener("click", function(){ nav.classList.remove("open"); }); });
  }

  // Player VSL
  var player = document.getElementById("player"),
      video = document.getElementById("vsl"),
      playBtn = document.getElementById("playBtn");
  if(player && video){
    function play(){ video.play(); player.classList.add("playing"); }
    playBtn.addEventListener("click", play);
    video.addEventListener("play", function(){ player.classList.add("playing"); });
    video.addEventListener("pause", function(){ if(video.currentTime < 0.2) player.classList.remove("playing"); });
  }

  // FAQ accordion
  document.querySelectorAll(".faq-q").forEach(function(btn){
    btn.addEventListener("click", function(){
      var item = btn.closest(".faq-item"), ans = item.querySelector(".faq-a");
      var isOpen = item.classList.contains("open");
      // fecha os outros
      document.querySelectorAll(".faq-item.open").forEach(function(i){
        if(i!==item){ i.classList.remove("open"); i.querySelector(".faq-a").style.maxHeight = null; }
      });
      if(isOpen){ item.classList.remove("open"); ans.style.maxHeight = null; }
      else { item.classList.add("open"); ans.style.maxHeight = ans.scrollHeight + "px"; }
    });
  });

  // Reveal on scroll
  var io = new IntersectionObserver(function(entries){
    entries.forEach(function(e){ if(e.isIntersecting){ e.target.classList.add("in"); io.unobserve(e.target); } });
  }, {threshold:0.12, rootMargin:"0px 0px -40px 0px"});
  document.querySelectorAll(".reveal").forEach(function(el){ io.observe(el); });

  // Form → WhatsApp
  var form = document.getElementById("orcForm");
  if(form){
    form.addEventListener("submit", function(e){
      e.preventDefault();
      var f = form;
      var msg = "*Orçamento American Filter*\n"
        + "Nome: " + (f.nome.value||"-") + "\n"
        + "WhatsApp: " + (f.zap.value||"-") + "\n"
        + "Cidade/UF: " + (f.cidade.value||"-") + "\n"
        + "Imóvel: " + (f.tipo.value||"-") + "\n"
        + "Água: " + (f.agua.value||"-")
        + (f.msg.value ? "\nMensagem: " + f.msg.value : "");
      window.open(waLink(msg), "_blank", "noopener");
    });
  }
})();
