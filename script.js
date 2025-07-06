// ========================================
// ΕΠΙΚΕΦΑΛΙΔΑ: ΚΥΡΙΑ ΣΤΟΙΧΕΙΑ JAVASCRIPT
// ========================================

// Εύρεση των βασικών στοιχείων της σελίδας
const menuIcon = document.querySelector('#menu-icon');
const navLinks = document.querySelector('.nav-links');
const darkModeToggle = document.querySelector('#dark-mode-toggle');

// ========================================
// 1. MOBILE MENU TOGGLE (Κινητό μενού)
// ========================================
menuIcon.onclick = () => {
  navLinks.classList.toggle('active');
};

// Κλείσιμο μενού όταν κάνουμε κλικ έξω από αυτό
document.addEventListener('click', (e) => {
  if (!menuIcon.contains(e.target) && !navLinks.contains(e.target)) {
    navLinks.classList.remove('active');
  }
});

// ========================================
// 2. ENHANCED DARK MODE (Βελτιωμένο σκοτεινό θέμα)
// ========================================
function toggleDarkMode() {
  // Εναλλαγή του dark-mode class στο body
  let isDark = document.body.classList.toggle('dark-mode');
  
  // Αποθήκευση της επιλογής στο localStorage
  localStorage.setItem('darkMode', isDark ? 'enabled' : 'disabled');

  // Ενημέρωση του κειμένου του κουμπιού
  darkModeToggle.textContent = isDark ? 'Light Mode' : 'Dark Mode';
  
  // Προσθήκη animation στο κουμπί
  darkModeToggle.style.transform = 'scale(1.1)';
  setTimeout(() => {
    darkModeToggle.style.transform = 'scale(1)';
  }, 200);
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
  // Επαναφορά του dark mode από localStorage
  if (localStorage.getItem('darkMode') === 'enabled') {
    document.body.classList.add('dark-mode');
    darkModeToggle.textContent = 'Light Mode';
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
