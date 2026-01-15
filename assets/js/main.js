// ==================== INTRO SCREEN ====================
let introShown = sessionStorage.getItem('introShown');

if (!introShown) {
  // Show intro screen
  const introScreen = document.getElementById('introScreen');
  const introPercentage = document.getElementById('introPercentage');
  const introStatus = document.getElementById('introStatus');
  
  const statuses = [
    'Initializing analytics dashboard...',
    'Loading portfolio modules...',
    'Compiling project data...',
    'Establishing secure connection...',
    'Rendering UI components...',
    'System ready. Welcome!'
  ];
  
  let progress = 0;
  let statusIndex = 0;
  
  const loadingInterval = setInterval(() => {
    progress += Math.random() * 15 + 5;
    
    if (progress >= 100) {
      progress = 100;
      clearInterval(loadingInterval);
      
      setTimeout(() => {
        introScreen.classList.add('fade-out');
        sessionStorage.setItem('introShown', 'true');
        
        setTimeout(() => {
          introScreen.style.display = 'none';
        }, 500);
      }, 500);
    }
    
    introPercentage.textContent = Math.floor(progress) + '%';
    
    // Update status message
    const newIndex = Math.floor((progress / 100) * statuses.length);
    if (newIndex !== statusIndex && newIndex < statuses.length) {
      statusIndex = newIndex;
      introStatus.textContent = statuses[statusIndex];
    }
  }, 200);
} else {
  // Hide intro screen immediately
  const introScreen = document.getElementById('introScreen');
  if (introScreen) {
    introScreen.style.display = 'none';
  }
}

// ==================== AOS INITIALIZATION ====================
AOS.init();

// You can also pass an optional settings object
// below listed default settings
AOS.init({

  // Settings that can be overridden on per-element basis, by `data-aos-*` attributes:
  offset: 50, // offset (in px) from the original trigger point - reduced to prevent excessive rise
  delay: 0, // values from 0 to 3000, with step 50ms
  duration: 600, // values from 0 to 3000, with step 50ms - slightly faster
  easing: 'ease-out', // smoother easing
  once: true, // animation happens only once to prevent re-triggering
  mirror: false, // whether elements should animate out while scrolling past them
  anchorPlacement: 'top-center', // better anchor placement for sections
  disable: false, // accepts following values: 'phone', 'tablet', 'mobile', boolean, expression or function
  startEvent: 'DOMContentLoaded', // name of the event dispatched on the document, that AOS should initialize on

});

// ==================== DYNAMIC ANALYTICS FEATURES ====================

// Counter Animation for Stats
function animateCounter(element, target, duration = 2000) {
  let start = 0;
  const increment = target / (duration / 16);
  const timer = setInterval(() => {
    start += increment;
    if (start >= target) {
      element.textContent = Math.ceil(target);
      clearInterval(timer);
    } else {
      element.textContent = Math.ceil(start);
    }
  }, 16);
}

// Initialize counters when they come into view
const observerOptions = {
  threshold: 0.5,
  rootMargin: '0px'
};

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
      const target = parseInt(entry.target.getAttribute('data-target'));
      animateCounter(entry.target, target);
      entry.target.classList.add('counted');
    }
  });
}, observerOptions);

// Observe all stat numbers
document.addEventListener('DOMContentLoaded', () => {
  const statNumbers = document.querySelectorAll('.stat-number');
  statNumbers.forEach(stat => counterObserver.observe(stat));
});

// Skill Progress Bar Animation
const progressObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const progressBar = entry.target.querySelector('.skill-progress-bar');
      const targetWidth = progressBar.getAttribute('data-progress');
      setTimeout(() => {
        progressBar.style.width = targetWidth + '%';
      }, 200);
    }
  });
}, observerOptions);

document.addEventListener('DOMContentLoaded', () => {
  const progressContainers = document.querySelectorAll('.skill-progress');
  progressContainers.forEach(container => progressObserver.observe(container));
});

// Typing Effect
function typeWriter(element, text, speed = 100) {
  let i = 0;
  element.textContent = '';
  
  function type() {
    if (i < text.length) {
      element.textContent += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  }
  
  type();
}

// Initialize typing effect on load
window.addEventListener('load', () => {
  const typingElements = document.querySelectorAll('.typing-effect');
  typingElements.forEach((element, index) => {
    const text = element.getAttribute('data-text') || element.textContent;
    element.setAttribute('data-text', text);
    setTimeout(() => {
      typeWriter(element, text);
    }, index * 1000);
  });
});

// Glitch Effect Trigger
document.addEventListener('DOMContentLoaded', () => {
  const glitchElements = document.querySelectorAll('.glitch');
  glitchElements.forEach(element => {
    const text = element.textContent;
    element.setAttribute('data-text', text);
  });
});

// Real-time Clock for Status Bar
function updateClock() {
  const now = new Date();
  const timeString = now.toLocaleTimeString('en-US', { 
    hour12: false,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });
  
  const clockElements = document.querySelectorAll('.live-clock');
  clockElements.forEach(clock => {
    clock.textContent = timeString;
  });
}

// Update clock every second
setInterval(updateClock, 1000);
updateClock(); // Initial call

// Particle Effect for Background (Simplified)
function createParticle() {
  const particle = document.createElement('div');
  particle.className = 'floating-particle';
  particle.style.cssText = `
    position: fixed;
    width: ${Math.random() * 4 + 1}px;
    height: ${Math.random() * 4 + 1}px;
    background: rgba(224, 247, 128, ${Math.random() * 0.5 + 0.2});
    border-radius: 50%;
    pointer-events: none;
    z-index: -1;
    left: ${Math.random() * 100}vw;
    top: ${Math.random() * 100}vh;
    animation: float ${Math.random() * 10 + 10}s linear infinite;
  `;
  
  document.body.appendChild(particle);
  
  setTimeout(() => {
    particle.remove();
  }, 20000);
}

// Add CSS for floating particles
const style = document.createElement('style');
style.textContent = `
  @keyframes float {
    0% {
      transform: translateY(0) translateX(0);
      opacity: 0;
    }
    10% {
      opacity: 1;
    }
    90% {
      opacity: 1;
    }
    100% {
      transform: translateY(-100vh) translateX(${Math.random() * 100 - 50}px);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);

// Create particles periodically
setInterval(createParticle, 2000);

// Smooth scroll for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Add scan line effect on hover for cards
document.addEventListener('DOMContentLoaded', () => {
  const cards = document.querySelectorAll('.card-custom, .service');
  cards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-10px)';
    });
    
    card.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0)';
    });
  });
});

// Terminal-style loading effect
function showTerminalLoading(element, messages, callback) {
  let index = 0;
  const interval = setInterval(() => {
    if (index < messages.length) {
      const line = document.createElement('div');
      line.textContent = `> ${messages[index]}`;
      line.style.color = 'var(--color-accent)';
      line.style.fontFamily = 'monospace';
      line.style.marginBottom = '5px';
      element.appendChild(line);
      index++;
    } else {
      clearInterval(interval);
      if (callback) callback();
    }
  }, 500);
}

// Add matrix rain effect (optional, lightweight version)
function createMatrixRain() {
  const canvas = document.createElement('canvas');
  canvas.id = 'matrix-rain';
  canvas.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -2;
    opacity: 0.1;
    pointer-events: none;
  `;
  document.body.appendChild(canvas);
  
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  
  const chars = '01';
  const fontSize = 14;
  const columns = canvas.width / fontSize;
  const drops = Array(Math.floor(columns)).fill(1);
  
  function draw() {
    ctx.fillStyle = 'rgba(2, 42, 48, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    ctx.fillStyle = '#0f0';
    ctx.font = fontSize + 'px monospace';
    
    for (let i = 0; i < drops.length; i++) {
      const text = chars[Math.floor(Math.random() * chars.length)];
      ctx.fillText(text, i * fontSize, drops[i] * fontSize);
      
      if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
        drops[i] = 0;
      }
      drops[i]++;
    }
  }
  
  setInterval(draw, 33);
}

// Initialize matrix rain on load (optional - can be removed if too much)
// window.addEventListener('load', createMatrixRain);

// Navbar active state update on scroll
window.addEventListener('scroll', () => {
  const sections = document.querySelectorAll('section[id]');
  const scrollY = window.pageYOffset;
  
  sections.forEach(section => {
    const sectionHeight = section.offsetHeight;
    const sectionTop = section.offsetTop - 100;
    const sectionId = section.getAttribute('id');
    const navLink = document.querySelector(`.navbar a[href="#${sectionId}"]`);
    
    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      document.querySelectorAll('.navbar a').forEach(link => {
        link.classList.remove('active');
      });
      if (navLink) {
        navLink.classList.add('active');
      }
    }
  });
});

console.log('%c▸ Portfolio System Online ', 'background: #0a192f; color: #64ffda; font-size: 16px; padding: 10px;');
console.log('%c▸ Analytics Dashboard Active ', 'background: #0a192f; color: #5a8dff; font-size: 14px; padding: 8px;');
console.log('%c▸ Blue/Gray Theme Loaded ', 'background: #112240; color: #64ffda; font-size: 14px; padding: 8px;');

// ==================== ADDITIONAL DYNAMIC ANIMATIONS ====================

// Cursor trail effect
let cursorTrail = [];
const maxTrailLength = 20;

document.addEventListener('mousemove', (e) => {
  cursorTrail.push({ x: e.clientX, y: e.clientY, time: Date.now() });
  
  if (cursorTrail.length > maxTrailLength) {
    cursorTrail.shift();
  }
  
  // Create subtle trail particles
  if (Math.random() > 0.9) {
    const particle = document.createElement('div');
    particle.style.cssText = `
      position: fixed;
      width: 3px;
      height: 3px;
      background: var(--color-brand);
      border-radius: 50%;
      pointer-events: none;
      z-index: 9998;
      left: ${e.clientX}px;
      top: ${e.clientY}px;
      opacity: 0.6;
      box-shadow: 0 0 10px var(--color-glow);
    `;
    document.body.appendChild(particle);
    
    setTimeout(() => {
      particle.style.transition = 'all 0.5s';
      particle.style.opacity = '0';
      particle.style.transform = 'scale(0)';
    }, 50);
    
    setTimeout(() => particle.remove(), 600);
  }
});

// Parallax effect on sections
window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  const parallaxElements = document.querySelectorAll('[data-aos]');
  
  parallaxElements.forEach(element => {
    const speed = element.getAttribute('data-parallax-speed') || 0.5;
    const yPos = -(scrolled * speed);
    element.style.transform = `translateY(${yPos}px)`;
  });
});

// Enhanced card interactions
document.addEventListener('DOMContentLoaded', () => {
  const cards = document.querySelectorAll('.card-custom, .service, .stat-card');
  
  cards.forEach(card => {
    card.addEventListener('mouseenter', function(e) {
      // Add ripple effect
      const ripple = document.createElement('span');
      ripple.style.cssText = `
        position: absolute;
        width: 20px;
        height: 20px;
        background: rgba(100, 255, 218, 0.3);
        border-radius: 50%;
        pointer-events: none;
        transform: scale(0);
        animation: rippleEffect 0.6s ease-out;
      `;
      
      const rect = this.getBoundingClientRect();
      ripple.style.left = (e.clientX - rect.left) + 'px';
      ripple.style.top = (e.clientY - rect.top) + 'px';
      
      this.style.position = 'relative';
      this.appendChild(ripple);
      
      setTimeout(() => ripple.remove(), 600);
    });
  });
});

// Add ripple animation
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
  @keyframes rippleEffect {
    to {
      transform: scale(20);
      opacity: 0;
    }
  }
`;
document.head.appendChild(rippleStyle);

// Glitch effect trigger on scroll
let glitchTimeout;
window.addEventListener('scroll', () => {
  clearTimeout(glitchTimeout);
  
  glitchTimeout = setTimeout(() => {
    const glitchElements = document.querySelectorAll('.glitch');
    glitchElements.forEach(element => {
      element.style.animation = 'none';
      setTimeout(() => {
        element.style.animation = '';
      }, 10);
    });
  }, 100);
});

// Text scramble effect for tech elements
function scrambleText(element, finalText, duration = 1000) {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*';
  const steps = 20;
  const stepDuration = duration / steps;
  let currentStep = 0;
  
  const interval = setInterval(() => {
    if (currentStep >= steps) {
      element.textContent = finalText;
      clearInterval(interval);
      return;
    }
    
    let scrambled = '';
    for (let i = 0; i < finalText.length; i++) {
      if (i < (finalText.length * currentStep / steps)) {
        scrambled += finalText[i];
      } else {
        scrambled += chars[Math.floor(Math.random() * chars.length)];
      }
    }
    
    element.textContent = scrambled;
    currentStep++;
  }, stepDuration);
}

// Apply scramble effect to tech labels on view
const scrambleObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !entry.target.classList.contains('scrambled')) {
      const originalText = entry.target.textContent;
      scrambleText(entry.target, originalText, 800);
      entry.target.classList.add('scrambled');
    }
  });
}, { threshold: 0.5 });

document.addEventListener('DOMContentLoaded', () => {
  const techElements = document.querySelectorAll('.text-tech');
  techElements.forEach(element => scrambleObserver.observe(element));
});

// Enhanced navbar active state with smooth transitions
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.navbar-nav .nav-link');

function highlightNavigation() {
  const scrollY = window.pageYOffset;
  
  sections.forEach(section => {
    const sectionHeight = section.offsetHeight;
    const sectionTop = section.offsetTop - 100;
    const sectionId = section.getAttribute('id');
    
    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${sectionId}`) {
          link.classList.add('active');
        }
      });
    }
  });
}

window.addEventListener('scroll', highlightNavigation);
highlightNavigation(); // Initial call
