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

(function(){
  var el = document.getElementById('last-updated');
  if(!el) return;
  var KEY = 'last-updated-cache';
  var TTL = 60 * 60 * 1000;
  function show(iso){
    var d = new Date(iso);
    if(isNaN(d)) return;
    el.textContent = d.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  }
  try {
    var cached = JSON.parse(localStorage.getItem(KEY) || 'null');
    if(cached && Date.now() - cached.t < TTL){ show(cached.iso); return; }
  } catch(e) {}
  fetch('https://api.github.com/repos/tonixsmm/tonixsmm.github.io/commits?per_page=1')
    .then(function(r){ return r.ok ? r.json() : Promise.reject(); })
    .then(function(commits){
      var iso = commits[0].commit.committer.date;
      show(iso);
      try { localStorage.setItem(KEY, JSON.stringify({ t: Date.now(), iso: iso })); } catch(e) {}
    })
    .catch(function(){});
})();
