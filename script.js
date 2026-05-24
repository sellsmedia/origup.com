/* ============================================
   ORIGUP — script.js
   Find. Build. Launch.
   ============================================ */

document.addEventListener('DOMContentLoaded', function () {

  // ── 1. SCROLL REVEAL ──────────────────────────────────
  const revealObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry, index) {
      if (entry.isIntersecting) {
        setTimeout(function () {
          entry.target.classList.add('on');
        }, index * 90);
      }
    });
  }, { threshold: 0.08 });

  document.querySelectorAll('.reveal').forEach(function (el) {
    revealObserver.observe(el);
  });


  // ── 2. COUNTER ANIMATION ──────────────────────────────
  const counterObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = parseInt(el.getAttribute('data-t'));
      const suffix = el.getAttribute('data-s') || '';

      if (target === 0) {
        el.textContent = '0';
        counterObserver.unobserve(el);
        return;
      }

      const duration = 1800;
      const startTime = performance.now();

      function tick(now) {
        const progress = Math.min((now - startTime) / duration, 1);
        const ease = 1 - Math.pow(1 - progress, 3); // cubic ease out
        el.textContent = Math.floor(ease * target) + (progress >= 1 ? suffix : '');
        if (progress < 1) requestAnimationFrame(tick);
      }

      requestAnimationFrame(tick);
      counterObserver.unobserve(el);
    });
  }, { threshold: 0.5 });

  document.querySelectorAll('.stat-num').forEach(function (el) {
    counterObserver.observe(el);
  });


  // ── 3. MARQUEE DUPLICATE (seamless loop) ──────────────
  const track = document.getElementById('marqueeTrack');
  if (track) {
    track.innerHTML += track.innerHTML;
  }


  // ── 4. MOBILE NAV BUTTON ──────────────────────────────
  const mobBtn = document.getElementById('mob-btn');
  if (mobBtn && window.innerWidth <= 768) {
    mobBtn.style.display = 'block';
  }


  // ── 5. NAVBAR SCROLL EFFECT ───────────────────────────
  const nav = document.querySelector('nav');
  window.addEventListener('scroll', function () {
    if (window.scrollY > 50) {
      nav.style.background = 'rgba(10,10,20,0.95)';
    } else {
      nav.style.background = 'rgba(10,10,20,0.75)';
    }
  });


  // ── 6. SMOOTH SCROLL for nav links ───────────────────
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });


  // ── 7. WAITLIST FORM ──────────────────────────────────
  const waitlistBtn = document.getElementById('waitlistBtn');
  if (waitlistBtn) {
    waitlistBtn.addEventListener('click', joinWaitlist);
  }

  const emailInput = document.getElementById('emailIn');
  if (emailInput) {
    emailInput.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') joinWaitlist();
    });
  }

});


// ── WAITLIST FUNCTION ────────────────────────────────────
function joinWaitlist() {
  const inp  = document.getElementById('emailIn');
  const note = document.getElementById('fnote');

  if (!inp || !inp.value || !inp.value.includes('@')) {
    if (inp) {
      inp.style.outline = '2px solid #E8336A';
      setTimeout(function () { inp.style.outline = ''; }, 1500);
    }
    return;
  }

  // Success state
  note.innerHTML = '🎉 You\'re on the list! Welcome to OrigUp.';
  note.style.color = '#00e5b0';
  note.style.fontWeight = '600';
  inp.value = '';

  // Optional: send to backend or Google Form here
  // fetch('/api/waitlist', { method:'POST', body: JSON.stringify({ email: inp.value }) })
}
