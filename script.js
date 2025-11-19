// ========================================
// ΕΠΙΚΕΦΑΛΙΔΑ: ΚΥΡΙΑ ΣΤΟΙΧΕΙΑ JAVASCRIPT
// ========================================

// Εύρεση των βασικών στοιχείων της σελίδας
const menuIcon = document.querySelector('#menu-icon');
const navLinks = document.querySelector('.nav-links');
const darkModeToggle = document.querySelector('#dark-mode-toggle');
const starsCanvas = document.getElementById('stars-canvas');

// ========================================
// 1. MOBILE MENU TOGGLE (Κινητό μενού)
// ========================================
if (menuIcon) {
  menuIcon.onclick = () => {
    navLinks.classList.toggle('active');
  };
}

// Κλείσιμο μενού όταν κάνουμε κλικ έξω από αυτό
document.addEventListener('click', (e) => {
  if (navLinks && menuIcon && !menuIcon.contains(e.target) && !navLinks.contains(e.target)) {
    navLinks.classList.remove('active');
  }
});

// Κλείσιμο μενού όταν κάνουμε κλικ σε ένα link
if (navLinks) {
  const navLinksItems = navLinks.querySelectorAll('a');
  navLinksItems.forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 600) {
        navLinks.classList.remove('active');
      }
    });
  });
}

// ========================================
// 2. ENHANCED DARK MODE (Βελτιωμένο σκοτεινό θέμα)
// ========================================
function toggleDarkMode() {
  const body = document.body;
  const isCurrentlyDark = body.classList.contains('dark-mode');
  if (isCurrentlyDark) {
    body.classList.remove('dark-mode');
    body.classList.add('light-mode');
    localStorage.setItem('theme', 'light');
    darkModeToggle.textContent = 'Dark Mode';
  } else {
    body.classList.remove('light-mode');
    body.classList.add('dark-mode');
    localStorage.setItem('theme', 'dark');
    darkModeToggle.textContent = 'Light Mode';
  }
  
  // Προσθήκη animation στο κουμπί
  darkModeToggle.style.transform = 'scale(1.1)';
  setTimeout(() => {
    darkModeToggle.style.transform = 'scale(1)';
  }, 200);
}

// ========================================
// 2b. THREE.JS STARFIELD (Lightweight version)
// ========================================
function initStarfield() {
  if (!starsCanvas) return;
  const ctx = starsCanvas.getContext('2d');
  let width = starsCanvas.width = starsCanvas.offsetWidth;
  let height = starsCanvas.height = starsCanvas.offsetHeight;

  // Create particles
  const numStars = Math.floor((width * height) / 8000);
  const stars = Array.from({ length: numStars }, () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    z: Math.random() * 0.8 + 0.2,
    r: Math.random() * 1.2 + 0.2
  }));

  function draw() {
    ctx.clearRect(0, 0, width, height);
    // subtle gradient backdrop that adapts to theme
    const isLight = document.body.classList.contains('light-mode');
    const g = ctx.createLinearGradient(0, 0, width, height);
    if (isLight) {
      g.addColorStop(0, 'rgba(255,255,255,0.6)');
      g.addColorStop(1, 'rgba(247,248,251,0.6)');
    } else {
      g.addColorStop(0, 'rgba(12,12,20,0.2)');
      g.addColorStop(1, 'rgba(8,8,15,0.2)');
    }
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, width, height);

    for (const s of stars) {
      const speed = 0.2 + s.z * 0.6;
      s.x += speed;
      if (s.x > width + 2) s.x = -2, s.y = Math.random() * height;

      // star glow
      ctx.beginPath();
      const violetAlpha = isLight ? (0.25 + s.z * 0.5) : (0.2 + s.z * 0.6);
      const tealAlpha = isLight ? (0.18 + s.z * 0.35) : (0.12 + s.z * 0.4);
      ctx.fillStyle = `rgba(124,58,237,${violetAlpha})`;
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.fillStyle = `rgba(20,184,166,${tealAlpha})`;
      ctx.arc(s.x, s.y, s.r * 0.6, 0, Math.PI * 2);
      ctx.fill();
    }
    requestAnimationFrame(draw);
  }

  function onResize() {
    width = starsCanvas.width = starsCanvas.offsetWidth;
    height = starsCanvas.height = starsCanvas.offsetHeight;
  }

  window.addEventListener('resize', onResize);
  draw();
}

// ========================================
// 3. TYPING ANIMATION (Animation γραφής)
// ========================================
function typeWriter(element, text, speed = 100) {
  let i = 0;
  element.innerHTML = '';
  
  function type() {
    if (i < text.length) {
      element.innerHTML += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  }
  type();
}

// ========================================
// 4. SCROLL PROGRESS INDICATOR (Δείκτης προόδου scroll)
// ========================================
function updateScrollProgress() {
  // Υπολογισμός του ποσοστού scroll
  const scrollTop = window.pageYOffset;
  const docHeight = document.body.scrollHeight - window.innerHeight;
  const scrollPercent = (scrollTop / docHeight) * 100;
  
  // Δημιουργία ή ενημέρωση της μπάρας προόδου
  let progressBar = document.querySelector('.scroll-progress');
  if (!progressBar) {
    progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    document.body.appendChild(progressBar);
  }
  
  // Ενημέρωση του πλάτους της μπάρας
  progressBar.style.width = scrollPercent + '%';
}

// ========================================
// 5. ACTIVE NAVIGATION (Ενεργή πλοήγηση)
// ========================================
function updateActiveNav() {
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-links a');
  
  let current = '';
  
  // Έλεγχος κάθε section για το ποιο είναι ορατό
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (window.scrollY >= sectionTop - 200) {
      current = section.getAttribute('id');
    }
  });
  
  // Ενημέρωση των nav links
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
}

// ========================================
// 6. PARALLAX EFFECT (Εφέ parallax)
// ========================================
function parallaxEffect() {
  const image = document.querySelector('.about img');
  if (image) {
    const scrolled = window.pageYOffset;
    const rate = scrolled * -0.3; // Ταχύτητα parallax
    image.style.transform = `translateY(${rate}px)`;
  }
}

// ========================================
// 7. ANIMATED COUNTERS (Μετρητές με animation)
// ========================================
function animateCounter(element, target, duration = 2000) {
  let start = 0;
  const increment = target / (duration / 16);
  
  function updateCounter() {
    start += increment;
    if (start < target) {
      element.textContent = Math.floor(start);
      requestAnimationFrame(updateCounter);
    } else {
      element.textContent = target;
    }
  }
  updateCounter();
}

// ========================================
// 8. SMOOTH SCROLL (Ομαλό scroll)
// ========================================
function smoothScrollTo(target) {
  const element = document.querySelector(target);
  if (element) {
    element.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  }
}

// ========================================
// EVENT LISTENERS (Ακροατές συμβάντων)
// ========================================

// Όταν φορτώνει η σελίδα
document.addEventListener('DOMContentLoaded', (event) => {
  // Επαναφορά θέματος από localStorage ή προτίμηση συστήματος
  const storedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  const body = document.body;
  if (storedTheme === 'dark' || (!storedTheme && prefersDark)) {
    body.classList.add('dark-mode');
    darkModeToggle.textContent = 'Light Mode';
  } else {
    body.classList.add('light-mode');
    darkModeToggle.textContent = 'Dark Mode';
  }
  
  // Έναρξη typing animation για το όνομα
  const nameElement = document.querySelector('.info-box h1');
  if (nameElement) {
    const originalText = nameElement.textContent;
    setTimeout(() => {
      typeWriter(nameElement, originalText, 150);
    }, 1000);
  }
  
  // Προσθήκη smooth scroll στα nav links
  const navLinks = document.querySelectorAll('.nav-links a');
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const target = link.getAttribute('href');
      smoothScrollTo(target);
    });
  });

  // Init starfield
  initStarfield();

  // Reveal animations
  const revealables = document.querySelectorAll('.reveal, section, .project-card, .education-card, .cert-card, .grid-card');
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add('is-visible');
    });
  }, { threshold: 0.1 });
  revealables.forEach((el) => io.observe(el));
});

// Scroll events
window.addEventListener('scroll', () => {
  updateScrollProgress();
  updateActiveNav();
  parallaxEffect();
});

// ========================================
// ADDITIONAL FEATURES (Επιπλέον χαρακτηριστικά)
// ========================================

// Hover effect για τα project cards
document.addEventListener('DOMContentLoaded', () => {
  const projectCards = document.querySelectorAll('.project-card');
  projectCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'translateY(0) scale(1)';
    });
  });
});

// Loading animation για τις εικόνες
window.addEventListener('load', () => {
  const images = document.querySelectorAll('img');
  images.forEach(img => {
    // Έλεγχος αν η εικόνα έχει ήδη φορτώσει
    if (img.complete && img.naturalHeight !== 0) {
      // Η εικόνα έχει ήδη φορτώσει, απλά προσθέτουμε hover effect
      img.style.opacity = '1';
    } else {
      // Η εικόνα φορτώνει, προσθέτουμε loading class
      img.classList.add('loading');
      
      img.addEventListener('load', () => {
        img.classList.remove('loading');
        img.style.opacity = '1';
      });
      
      // Fallback για εικόνες που δεν φορτώνουν σωστά
      setTimeout(() => {
        if (img.classList.contains('loading')) {
          img.classList.remove('loading');
          img.style.opacity = '1';
        }
      }, 3000);
    }
  });
});

console.log('🎉 JavaScript features loaded successfully!');
