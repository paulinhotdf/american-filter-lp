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

  // Acessibilidade: esconde SVGs decorativos de leitores de tela
  document.querySelectorAll("svg").forEach(function(s){
    if(!s.getAttribute("aria-label") && !s.getAttribute("role")) s.setAttribute("aria-hidden","true");
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
    toggle.setAttribute("aria-expanded","false");
    toggle.setAttribute("aria-controls","nav");
    toggle.addEventListener("click", function(){
      var open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    nav.querySelectorAll("a").forEach(function(a){
      a.addEventListener("click", function(){ nav.classList.remove("open"); toggle.setAttribute("aria-expanded","false"); });
    });
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

  // FAQ accordion (com ARIA)
  document.querySelectorAll(".faq-q").forEach(function(btn, i){
    var item = btn.closest(".faq-item"), ans = item.querySelector(".faq-a");
    var id = "faq-a-" + i; ans.id = id;
    btn.setAttribute("aria-expanded","false");
    btn.setAttribute("aria-controls", id);
    btn.addEventListener("click", function(){
      var isOpen = item.classList.contains("open");
      document.querySelectorAll(".faq-item.open").forEach(function(o){
        if(o!==item){ o.classList.remove("open"); o.querySelector(".faq-a").style.maxHeight = null;
          o.querySelector(".faq-q").setAttribute("aria-expanded","false"); }
      });
      if(isOpen){ item.classList.remove("open"); ans.style.maxHeight = null; btn.setAttribute("aria-expanded","false"); }
      else { item.classList.add("open"); ans.style.maxHeight = ans.scrollHeight + "px"; btn.setAttribute("aria-expanded","true"); }
    });
  });

  // Reveal on scroll
  var io = new IntersectionObserver(function(entries){
    entries.forEach(function(e){ if(e.isIntersecting){ e.target.classList.add("in"); io.unobserve(e.target); } });
  }, {threshold:0.12, rootMargin:"0px 0px -40px 0px"});
  document.querySelectorAll(".reveal").forEach(function(el){ io.observe(el); });

})();
