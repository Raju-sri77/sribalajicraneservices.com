// ABOUTME: Client-side interactivity for Titan Crane Services website.
// ABOUTME: Scroll progress, reveal animations, animated counters, nav toggle, fleet drag-scroll, and contact form.

(function(){
  // Scroll progress
  var prog=document.getElementById('prog');
  window.addEventListener('scroll',function(){
    var h=document.documentElement.scrollHeight-window.innerHeight;
    if(h>0) prog.style.width=(window.scrollY/h*100)+'%';
  });

  // Scroll reveal
  var obs=new IntersectionObserver(function(entries){
    entries.forEach(function(e){if(e.isIntersecting) e.target.classList.add('vis')});
  },{threshold:0.06,rootMargin:'0px 0px -25px 0px'});
  document.querySelectorAll('.rv').forEach(function(el){obs.observe(el)});

  // Animated counters
  var counted=false;
  function animC(sel){
    document.querySelectorAll(sel).forEach(function(el){
      var t=parseInt(el.getAttribute('data-target'));
      if(!t) return;
      var dur=2200,start=null;
      function step(ts){
        if(!start) start=ts;
        var p=Math.min((ts-start)/dur,1);
        var e=1-Math.pow(1-p,4);
        el.textContent=Math.floor(e*t)+'+';
        if(p<1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
    });
  }
  var cObs=new IntersectionObserver(function(entries){
    if(entries[0].isIntersecting&&!counted){
      counted=true;
      animC('.hb-num[data-target]');
      animC('.stat-n[data-target]');
    }
  },{threshold:0.3});
  var hb=document.querySelector('.hero-bar');
  if(hb) cObs.observe(hb);

  // Nav scroll
  var nav=document.getElementById('mainNav');
  window.addEventListener('scroll',function(){
    nav.classList.toggle('scrolled',window.scrollY>60);
  });

  // Mobile nav toggle
  var tog=document.getElementById('navTog'),lnk=document.getElementById('navLinks');
  tog.addEventListener('click',function(){lnk.classList.toggle('open')});
  document.querySelectorAll('.nav-links a').forEach(function(a){
    a.addEventListener('click',function(){lnk.classList.remove('open')});
  });

  // Fleet horizontal drag scroll
  var fs=document.getElementById('fleetScroll');
  if(fs){
    var isDown=false,startX,scrollLeft;
    fs.addEventListener('mousedown',function(e){isDown=true;fs.style.cursor='grabbing';startX=e.pageX-fs.offsetLeft;scrollLeft=fs.scrollLeft});
    fs.addEventListener('mouseleave',function(){isDown=false;fs.style.cursor='grab'});
    fs.addEventListener('mouseup',function(){isDown=false;fs.style.cursor='grab'});
    fs.addEventListener('mousemove',function(e){
      if(!isDown) return;
      e.preventDefault();
      var x=e.pageX-fs.offsetLeft;
      fs.scrollLeft=scrollLeft-(x-startX)*1.5;
    });
  }

  // Form
  var form=document.getElementById('contactForm'),wrap=document.getElementById('quoteForm');
  form.addEventListener('submit',function(e){
    e.preventDefault();
    wrap.innerHTML='<div style="text-align:center;padding:3rem 1rem"><h3 style="font-family:var(--serif);margin-bottom:.5rem">Thank You!</h3><p style="color:var(--tx2)">Your quote request has been submitted. Our team will contact you within 24 hours.</p><p style="margin-top:1rem;color:var(--amber);font-weight:600">Urgent? Call +91 98765 43210</p></div>';
  });
})();
