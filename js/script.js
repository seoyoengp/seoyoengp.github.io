function copyAccount() {
    const text = document.getElementById("account").innerText;
    navigator.clipboard.writeText(text);
    alert("계좌번호가 복사되었습니다.");
  }
  
  /* 모금액 데모 */
  let current = 0;
  let target = 235000;
  
  function updateAmount() {
    if (current < target) {
      current += 5000;
      document.getElementById("currentAmount").innerText =
        current.toLocaleString() + "원";
      setTimeout(updateAmount, 50);
    }
  }
  updateAmount();
  
  /* 🔥 스크롤 애니메이션 */
  const elements = document.querySelectorAll('.fade-up');
  
  function checkScroll() {
    const trigger = window.innerHeight * 0.85;
  
    elements.forEach(el => {
      const top = el.getBoundingClientRect().top;
      if (top < trigger) {
        el.classList.add('show');
      }
    });
  }
  
  window.addEventListener('scroll', checkScroll);
  checkScroll();
  