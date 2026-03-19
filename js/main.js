// ===== HERO ROTATING TEXT =====
const heroWords = ['Fitness', 'Friendship', 'Nutrition', 'Mindset', 'You'];
const rotateContainer = document.querySelector('.hero-rotate');

if (rotateContainer) {
  let wordIndex = 0;
  rotateContainer.textContent = heroWords[0];

  function flipToWord(word) {
    rotateContainer.innerHTML = '';
    for (let i = 0; i < word.length; i++) {
      const span = document.createElement('span');
      span.className = 'letter';
      span.textContent = word[i];
      span.style.animationDelay = i * 0.045 + 's';
      rotateContainer.appendChild(span);
    }
  }

  flipToWord(heroWords[0]);

  setInterval(() => {
    wordIndex = (wordIndex + 1) % heroWords.length;
    flipToWord(heroWords[wordIndex]);
  }, 3000);
}

// ===== NAVBAR SCROLL EFFECT =====
const navbar = document.querySelector('.navbar');
const mobileStickyBar = document.getElementById('mobileStickyBar');
const isMobile = () => window.innerWidth <= 768;

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }

  // On mobile: hide navbar and show sticky bar after scrolling
  if (mobileStickyBar && isMobile()) {
    if (window.scrollY > 200) {
      navbar.classList.add('hide-on-mobile');
      mobileStickyBar.classList.add('visible');
    } else {
      navbar.classList.remove('hide-on-mobile');
      mobileStickyBar.classList.remove('visible');
    }
  }
});

// ===== MOBILE MENU TOGGLE =====
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navLinks.classList.toggle('active');
});

// Close menu when a link is clicked (skip dropdown parent links on mobile)
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', (e) => {
    const parentDropdown = link.closest('.nav-dropdown');
    // If this is the top-level dropdown toggle, prevent navigation
    if (parentDropdown && link === parentDropdown.querySelector(':scope > a')) {
      e.preventDefault();
      if (window.innerWidth <= 768) {
        parentDropdown.classList.toggle('open');
      }
      return;
    }
    hamburger.classList.remove('active');
    navLinks.classList.remove('active');
  });
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
  if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
    hamburger.classList.remove('active');
    navLinks.classList.remove('active');
  }
});

// ===== ACTIVE NAV LINK =====
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-links a').forEach(link => {
  const href = link.getAttribute('href');
  if (href === currentPage || (currentPage === '' && href === 'index.html')) {
    link.classList.add('active');
  }
});

// ===== SCROLL ANIMATIONS =====
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate-in');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Cards with staggered entrance
document.querySelectorAll('.feature-card, .program-card, .pricing-card, .testimonial-card, .coach-card, .stat, .group-fitness-card, .tired-of-card, .how-it-works-step').forEach((el, i) => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(30px)';
  el.style.transition = 'opacity 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
  if (el.classList.contains('group-fitness-card') || el.classList.contains('tired-of-card')) {
    el.style.transitionDelay = (i % 3) * 0.12 + 's';
  }
  if (el.classList.contains('how-it-works-step')) {
    el.style.transitionDelay = (i % 3) * 0.2 + 's';
  }
  observer.observe(el);
});

// Section headings + labels fade up
document.querySelectorAll('.tired-of-heading, .tired-of-label, .group-fitness-heading, .group-fitness-label, .group-fitness-sub, .programs-heading, .programs-label, .programs-sub, .reviews-heading, .reviews-label, .how-it-works-heading, .how-it-works-label, .how-it-works-sub, .perfect-banner-content').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
  observer.observe(el);
});

// CTA buttons slide up
document.querySelectorAll('.tired-of-btn, .group-fitness-btn, .reviews-cta, .reviews-google').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(15px)';
  el.style.transition = 'opacity 0.6s ease 0.3s, transform 0.6s ease 0.3s';
  observer.observe(el);
});

// Add CSS class for animated elements
const style = document.createElement('style');
style.textContent = `.animate-in { opacity: 1 !important; transform: translateY(0) !important; }`;
document.head.appendChild(style);

// ===== REVIEWS CAROUSEL =====
const reviews = [
  { author_name: 'Kelly Sheehan', rating: 5, text: 'Joining CKO in Emerson is one of the greatest decisions I\'ve ever made. I was addicted from the very first class! It totally feels like I\'m part of a team and I\'m driven to attend class to see my buddies and not let my teammates down. The workouts are challenging and I love to see just how far I can push myself. CKO has helped me physically and mentally, hitting that bag is the best therapy and workout in the world! The staff is amazing and treat you like you\'re part of the family. I absolutely love it here.' },
  { author_name: 'Jessica Bombace', rating: 5, text: 'I absolutely love the CKO classes taught by Fara! Her energy and enthusiasm are contagious, and I always feel amazing after each class. The workouts are challenging but fun, and I can see and feel the results in my body. I highly recommend CKO to anyone looking for an incredible workout experience!' },
  { author_name: 'Brooke Bjerke', rating: 5, text: 'I\'ve been training at CKO for 3 years now and cannot recommend it enough! The atmosphere is extremely energetic and motivating, which makes getting a great workout genuinely fun. Even if you\'re a complete beginner, the trainers are so welcoming and supportive. Best gym decision I\'ve ever made!' },
  { author_name: 'F Smith', rating: 5, text: 'My CKO experience has been life changing. I continue to strive for a healthier lifestyle, and my CKO trainers have been nothing but supportive through motivation and encouragement. I enjoy each class, and now feel better than I have in years!' },
  { author_name: 'Photo Digitalization Services', rating: 5, text: 'I would like to mention that Barbara\'s workouts were excellent. If you\'re looking for a solid workout, I highly recommend them.' },
  { author_name: 'Jennifer Villanueva', rating: 5, text: 'Joining CKO was one of the greatest decisions I\'ve ever made. I just completed my 125th class, and I feel I\'ve learned a lot but still have room to grow and improve. All the trainers are welcoming and great at leading their classes! Thank you so much for the awesome experience, and I look forward to more engaging, enjoyable sessions!' },
];

function buildCardHTML(review, index) {
  const stars = '<i class="fas fa-star"></i>'.repeat(review.rating) + '<i class="far fa-star"></i>'.repeat(5 - review.rating);
  const initial = review.author_name.charAt(0).toUpperCase();
  const googleColors = ['#4285F4', '#EA4335', '#FBBC05', '#34A853'];
  const avatarColor = googleColors[index % googleColors.length];
  return `
    <div class="review-card-header">
      <div class="review-author-photo review-author-initial" style="background:${avatarColor}">${initial}</div>
      <div class="review-author-info">
        <strong>${review.author_name}</strong>
        <div class="review-stars">${stars}</div>
      </div>
      <i class="fab fa-google review-card-google"></i>
    </div>
    <p class="review-text">${review.text}</p>
  `;
}

function renderReviewCards(data) {
  const carousel = document.getElementById('reviewsCarousel');
  if (!carousel) return;
  carousel.innerHTML = '';

  // Triple the cards: [clone-set] [original-set] [clone-set] for seamless infinite loop
  for (let copy = 0; copy < 3; copy++) {
    data.forEach((review, i) => {
      const card = document.createElement('div');
      card.className = 'review-card';
      card.dataset.index = i;
      card.dataset.copy = copy;
      card.innerHTML = buildCardHTML(review, i);
      carousel.appendChild(card);
    });
  }

  initCarouselControls(data.length);
}

window.addEventListener('DOMContentLoaded', () => {
  renderReviewCards(reviews);
});

function initCarouselControls(realCount) {
  const carousel = document.getElementById('reviewsCarousel');
  const wrapper = document.querySelector('.reviews-carousel-wrapper');
  if (!carousel || !wrapper) return;

  const allCards = carousel.querySelectorAll('.review-card');
  const cardWidth = 320;
  const gap = 20;
  const step = cardWidth + gap;
  // Start in the middle set
  let currentIndex = realCount + 2;
  let isTransitioning = false;

  function getOffset(idx) {
    const wrapperWidth = wrapper.offsetWidth;
    return (wrapperWidth / 2) - (step * idx) - (cardWidth / 2);
  }

  function updateClasses() {
    allCards.forEach((card, i) => {
      card.classList.remove('active', 'near');
      const distance = Math.abs(i - currentIndex);
      if (distance === 0) card.classList.add('active');
      else if (distance === 1) card.classList.add('near');
    });
  }

  function slideTo(idx, animate) {
    if (animate !== false) {
      carousel.style.transition = 'transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    } else {
      carousel.style.transition = 'none';
    }
    currentIndex = idx;
    carousel.style.transform = `translateX(${getOffset(idx)}px)`;
    updateClasses();
  }

  // Seamless jump after transition ends
  carousel.addEventListener('transitionend', () => {
    isTransitioning = false;
    // If we've scrolled into the 3rd clone set, jump back to middle set
    if (currentIndex >= realCount * 2) {
      slideTo(currentIndex - realCount, false);
    }
    // If we've scrolled into the 1st clone set, jump forward to middle set
    else if (currentIndex < realCount) {
      slideTo(currentIndex + realCount, false);
    }
  });

  slideTo(currentIndex, false);

  // Auto-scroll every 2.5s
  let autoScroll = setInterval(() => {
    if (isTransitioning) return;
    isTransitioning = true;
    slideTo(currentIndex + 1, true);
  }, 2500);

  function resetAutoScroll() {
    clearInterval(autoScroll);
    autoScroll = setInterval(() => {
      if (isTransitioning) return;
      isTransitioning = true;
      slideTo(currentIndex + 1, true);
    }, 2500);
  }

  // Pause on hover
  wrapper.addEventListener('mouseenter', () => clearInterval(autoScroll));
  wrapper.addEventListener('mouseleave', resetAutoScroll);

  // ===== DRAG TO SCROLL =====
  let isDragging = false;
  let startX = 0;
  let dragOffset = 0;
  let currentTranslate = 0;

  function getTranslateX() {
    const st = window.getComputedStyle(carousel);
    const matrix = new DOMMatrixReadOnly(st.transform);
    return matrix.m41;
  }

  wrapper.addEventListener('mousedown', (e) => {
    isDragging = true;
    startX = e.clientX;
    currentTranslate = getTranslateX();
    wrapper.classList.add('dragging');
    clearInterval(autoScroll);
    e.preventDefault();
  });

  window.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    const diff = e.clientX - startX;
    carousel.style.transition = 'none';
    carousel.style.transform = `translateX(${currentTranslate + diff}px)`;
    dragOffset = diff;
  });

  window.addEventListener('mouseup', () => {
    if (!isDragging) return;
    isDragging = false;
    wrapper.classList.remove('dragging');

    if (Math.abs(dragOffset) > 80) {
      currentIndex += dragOffset < 0 ? 1 : -1;
    }
    dragOffset = 0;
    isTransitioning = true;
    slideTo(currentIndex, true);
    resetAutoScroll();
  });

  // ===== TOUCH SUPPORT =====
  wrapper.addEventListener('touchstart', (e) => {
    isDragging = true;
    startX = e.touches[0].clientX;
    currentTranslate = getTranslateX();
    wrapper.classList.add('dragging');
    clearInterval(autoScroll);
  }, { passive: true });

  wrapper.addEventListener('touchmove', (e) => {
    if (!isDragging) return;
    const diff = e.touches[0].clientX - startX;
    carousel.style.transition = 'none';
    carousel.style.transform = `translateX(${currentTranslate + diff}px)`;
    dragOffset = diff;
  }, { passive: true });

  wrapper.addEventListener('touchend', () => {
    if (!isDragging) return;
    isDragging = false;
    wrapper.classList.remove('dragging');

    if (Math.abs(dragOffset) > 50) {
      currentIndex += dragOffset < 0 ? 1 : -1;
    }
    dragOffset = 0;
    isTransitioning = true;
    slideTo(currentIndex, true);
    resetAutoScroll();
  });

  window.addEventListener('resize', () => slideTo(currentIndex, false));
}

// ===== COUNTER ANIMATION =====
function animateCounters() {
  document.querySelectorAll('.stat h3').forEach(counter => {
    const target = parseInt(counter.textContent.replace(/\D/g, ''));
    const suffix = counter.textContent.replace(/[\d]/g, '');
    let current = 0;
    const increment = target / 60;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      counter.textContent = Math.floor(current) + suffix;
    }, 25);
  });
}

const statsSection = document.querySelector('.about-stats');
if (statsSection) {
  const statsObserver = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      animateCounters();
      statsObserver.unobserve(statsSection);
    }
  }, { threshold: 0.5 });
  statsObserver.observe(statsSection);
}

// ===== FORM HANDLING =====
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Simple form validation
    const inputs = contactForm.querySelectorAll('input[required], textarea[required]');
    let valid = true;
    
    inputs.forEach(input => {
      if (!input.value.trim()) {
        input.style.borderColor = '#e63946';
        valid = false;
      } else {
        input.style.borderColor = 'rgba(255, 255, 255, 0.08)';
      }
    });
    
    if (valid) {
      alert('Thank you for your message! We will get back to you soon.');
      contactForm.reset();
    }
  });
}

// ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;
    
    e.preventDefault();
    const target = document.querySelector(targetId);
    if (target) {
      const offsetTop = target.offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  });
});

// ===== POPUP / MODAL =====
(function() {
  const overlay = document.getElementById('popupOverlay');
  const closeBtn = document.getElementById('popupClose');
  const form = document.getElementById('popupForm');
  if (!overlay) return;

  function openPopup(e) {
    if (e) e.preventDefault();
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closePopup() {
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  // Close on X button
  if (closeBtn) closeBtn.addEventListener('click', closePopup);

  // Close on overlay click (outside modal)
  overlay.addEventListener('click', function(e) {
    if (e.target === overlay) closePopup();
  });

  // Close on Escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && overlay.classList.contains('active')) closePopup();
  });

  // Wire all CTA buttons that link to contact.html
  document.querySelectorAll('a[href="contact.html"]').forEach(function(link) {
    // Skip the plain "Contact" nav link (not a button)
    if (!link.classList.contains('btn') && !link.classList.contains('mobile-sticky-btn') && !link.classList.contains('active')) return;
    link.addEventListener('click', openPopup);
  });

  // Also wire mobile sticky buttons that link to contact.html
  document.querySelectorAll('.mobile-sticky-schedule, .mobile-sticky-free').forEach(function(btn) {
    btn.addEventListener('click', openPopup);
  });

  // Phone number auto-format: (xxx) xxx-xxxx
  var phoneInput = form ? form.querySelector('input[name="phone"]') : null;
  if (phoneInput) {
    phoneInput.addEventListener('input', function() {
      var digits = this.value.replace(/\D/g, '');
      if (digits.charAt(0) === '1' && digits.length > 10) { digits = digits.substring(1); }
      digits = digits.substring(0, 10);
      if (digits.length === 0) { this.value = ''; return; }
      if (digits.length <= 3) { this.value = '(' + digits; }
      else if (digits.length <= 6) { this.value = '(' + digits.substring(0, 3) + ') ' + digits.substring(3); }
      else { this.value = '(' + digits.substring(0, 3) + ') ' + digits.substring(3, 6) + '-' + digits.substring(6); }
    });
  }

  // Form submission
  if (form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      var btn = form.querySelector('.popup-submit');
      var originalText = btn.innerHTML;
      btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
      btn.disabled = true;

      var data = {
        firstName: (form.querySelector('input[name="firstName"]') || {}).value || '',
        lastName: (form.querySelector('input[name="lastName"]') || {}).value || '',
        email: (form.querySelector('input[name="email"]') || {}).value || '',
        phone: (form.querySelector('input[name="phone"]') || {}).value || '',
        source: window.location.pathname
      };

      fetch('https://services.leadconnectorhq.com/hooks/XjS2bshPx1fcIiiPMabV/webhook-trigger/CuNPl0xlyKy7xSzLqeY2', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        mode: 'cors',
        body: JSON.stringify(data)
      }).then(function() {
        window.location.href = 'schedule.html';
      }).catch(function() {
        window.location.href = 'schedule.html';
      });
    });
  }
})();
