/* ===== RASA COMMON JS ===== */
(function () {
  'use strict';

  /* ── 1. NAV ACTIVE ── */
  const path = location.pathname.split('/').pop() || 'rasa_redesign.html';
  document.querySelectorAll('.nav-links a, .mobile-menu a').forEach(a => {
    const href = a.getAttribute('href') || '';
    if (href.includes(path) || (path === 'rasa_redesign.html' && (href === '#' || href.endsWith('rasa_redesign.html')))) {
      a.classList.add('active');
    }
  });

  /* ── 2. HAMBURGER ── */
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      mobileMenu.classList.toggle('open');
    });
    mobileMenu.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        hamburger.classList.remove('open');
        mobileMenu.classList.remove('open');
      });
    });
  }

  /* ── 3. IX-01 + IX-02 IntersectionObserver ── */
  const io = new IntersectionObserver(
    entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('revealed'); }),
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );
  document.querySelectorAll('[data-reveal],[data-slide]').forEach(el => io.observe(el));

  /* ── 4. IX-03 히어로 텍스트 라인 ── */
  setTimeout(() => {
    document.querySelectorAll('.text-reveal-line').forEach(el => el.classList.add('revealed'));
    document.querySelectorAll('.hero [data-reveal]').forEach(el => el.classList.add('revealed'));
  }, 100);

  /* ── 5. FLOATING FORM TOGGLE (데스크탑) ── */
  const floatingForm = document.getElementById('floatingForm');
  const floatToggle = document.getElementById('floatToggle');
  if (floatToggle && floatingForm) {
    floatToggle.addEventListener('click', () => {
      floatingForm.classList.toggle('collapsed');
    });
  }

  /* ── 6. MOBILE FORM SHEET ── */
  const mCallBtn = document.getElementById('mCallBtn');
  const mFormSheet = document.getElementById('mFormSheet');
  const mSheetOverlay = document.getElementById('mSheetOverlay');
  const mSheetClose = document.getElementById('mSheetClose');
  function openSheet() {
    if (mFormSheet) mFormSheet.classList.add('open');
    if (mSheetOverlay) mSheetOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function closeSheet() {
    if (mFormSheet) mFormSheet.classList.remove('open');
    if (mSheetOverlay) mSheetOverlay.classList.remove('open');
    document.body.style.overflow = '';
  }
  if (mCallBtn) mCallBtn.addEventListener('click', openSheet);
  if (mSheetClose) mSheetClose.addEventListener('click', closeSheet);
  if (mSheetOverlay) mSheetOverlay.addEventListener('click', closeSheet);

  /* ── 7. FAQ ACCORDION ── */
  document.querySelectorAll('.faq-q').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
      if (!isOpen) item.classList.add('open');
    });
  });

  /* ── 8. 모바일 하단 CTA 바 스크롤 show ── */
  const mBottomBar = document.querySelector('.m-bottom-bar');
  if (mBottomBar) {
    window.addEventListener('scroll', () => {
      mBottomBar.classList.toggle('show', window.scrollY > 80);
    }, { passive: true });
  }

  /* ── 9. 개인정보 [자세히] 토글 ── */
  document.querySelectorAll('.privacy-toggle').forEach(btn => {
    btn.addEventListener('click', () => {
      const detail = btn.closest('.float-agree').nextElementSibling;
      if (!detail || !detail.classList.contains('privacy-detail')) return;
      const isOpen = detail.classList.toggle('open');
      btn.textContent = isOpen ? '[닫기]' : '[자세히]';
    });
  });

  /* ── 10. SERVICE ACCORDION ── */
  document.querySelectorAll('.acc-trigger').forEach(trigger => {
    trigger.addEventListener('click', () => {
      const item = trigger.closest('.acc-item');
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.acc-item').forEach(i => i.classList.remove('open'));
      if (!isOpen) {
        item.classList.add('open');
        // 모바일: 열린 아이템이 상단에 잘리지 않도록 스크롤
        if (window.innerWidth <= 768) {
          setTimeout(() => {
            const top = item.getBoundingClientRect().top + window.scrollY - 72;
            window.scrollTo({ top, behavior: 'smooth' });
          }, 50);
        }
      }
    });
  });

})();
