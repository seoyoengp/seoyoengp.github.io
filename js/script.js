/* ===== 모듈 패턴 ===== */
(function () {
  'use strict';

  /* ===== 계좌번호 복사 ===== */
  function copyAccount() {
    const text = document.getElementById('account').innerText;
    const btn = document.querySelector('.copy-btn');

    navigator.clipboard.writeText(text).then(() => {
      btn.classList.add('copied');

      setTimeout(() => {
        btn.classList.remove('copied');
      }, 2000);
    });
  }

  window.copyAccount = copyAccount;

  /* ===== 모금액 애니메이션 (easing 적용) ===== */
  const amountEl = document.getElementById('currentAmount');
  const progressFill = document.getElementById('progressFill');
  const target = 235000;
  const goalAmount = 750000;
  const duration = 2500;
  const startTime = performance.now();

  function easeOutExpo(t) {
    return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
  }

  function animateAmount(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const easedProgress = easeOutExpo(progress);
    const current = Math.round(target * easedProgress);

    amountEl.textContent = current.toLocaleString() + '원';
    progressFill.style.width = (current / goalAmount * 100) + '%';

    if (progress < 1) {
      requestAnimationFrame(animateAmount);
    } else {
      amountEl.textContent = target.toLocaleString() + '원';
      progressFill.style.width = (target / goalAmount * 100) + '%';
    }
  }

  requestAnimationFrame(animateAmount);

  /* ===== Intersection Observer 스크롤 애니메이션 ===== */
  const fadeElements = document.querySelectorAll('.fade-up');
  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -15% 0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
      }
    });
  }, observerOptions);

  fadeElements.forEach((el) => observer.observe(el));

  /* ===== 초기 로드 시 첫 번째 화면 체크 ===== */
  fadeElements.forEach((el) => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.9) {
      el.classList.add('show');
    }
  });

})();
