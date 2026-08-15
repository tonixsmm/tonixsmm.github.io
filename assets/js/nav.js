(function(){
  function closeNav(nav, btn){
    btn.setAttribute('aria-expanded', 'false');
    nav.classList.remove('nav-open');
  }
  document.querySelectorAll('.nav-toggle').forEach(function(btn){
    var nav = btn.closest('.site-nav');
    if(!nav) return;
    btn.addEventListener('click', function(){
      var expanded = btn.getAttribute('aria-expanded') === 'true';
      if(expanded){ closeNav(nav, btn); }
      else { btn.setAttribute('aria-expanded', 'true'); nav.classList.add('nav-open'); }
    });
    nav.querySelectorAll('.nav-dropdown a').forEach(function(a){
      a.addEventListener('click', function(){ closeNav(nav, btn); });
    });
    window.matchMedia('(min-width:641px)').addEventListener('change', function(e){
      if(e.matches) closeNav(nav, btn);
    });
  });
})();
