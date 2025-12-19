/**
 * Portfolio Application
 * Main JavaScript for animations, interactions, and UX enhancements
 * @author Anand Pathak
 * @version 2.0.0
 */

// Configuration
/**
 * Portfolio Application
 * Main JavaScript for animations, interactions, and UX enhancements
 * @author Anand Pathak
 * @version 2.0.0
 */

// Configuration
const CONFIG = {
  animationDuration: 600,
  scrollThreshold: 100,
  observerMargin: '-50px',
  skillBarDelay: 100,
  counterDuration: 1000
};

// State management
const state = {
  lastScrollPosition: 0,
  isInitialized: false,
  observers: []
};

// Initialize application
document.addEventListener('DOMContentLoaded', () => {
  try {
    initializeApp();
  } catch (error) {
    console.error('Error initializing portfolio:', error);
  }
});

// Main initialization function
function initializeApp() {
  if (state.isInitialized) return;
  
  initScrollReveal();
  initSkillBars();
  initNavScroll();
  initSmoothScroll();
  initMobileMenu();
  initParallaxEffect();
  initProjectCards();
  initCounters();
  initSectionNavigation();
  initReadMore();
  
  state.isInitialized = true;
  console.log('✨ Portfolio initialized successfully');
}

/**
 * Scroll Reveal Animation
 * Reveals elements as they enter the viewport
 */
function initScrollReveal() {
  const revealElements = document.querySelectorAll('.scroll-reveal');
  if (!revealElements.length) return;
  
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: `0px 0px ${CONFIG.observerMargin} 0px`
  });
  
  revealElements.forEach(element => {
    revealObserver.observe(element);
  });
  
  state.observers.push(revealObserver);
}

/**
 * Skill Bar Animations
 * Animates skill progress bars when they enter viewport
 */
function initSkillBars() {
  const skillBars = document.querySelectorAll('.skill-bar-fill');
  if (!skillBars.length) return;
  
  const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const bar = entry.target;
        const targetWidth = bar.style.width;
        
        // Reset and animate
        bar.style.width = '0%';
        requestAnimationFrame(() => {
          setTimeout(() => {
            bar.style.width = targetWidth;
          }, CONFIG.skillBarDelay);
        });
        
        skillObserver.unobserve(bar);
      }
    });
  }, {
    threshold: 0.5
  });
  
  skillBars.forEach(bar => {
    skillObserver.observe(bar);
  });
  
  state.observers.push(skillObserver);
}

/**
 * Navigation Scroll Effect
 * Auto-hides/shows navigation on scroll with throttling
 */
function initNavScroll() {
  const nav = document.getElementById('main-nav');
  if (!nav) return;
  
  nav.style.transition = 'transform 0.3s ease-in-out';
  let ticking = false;
  
  const handleScroll = () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
      nav.classList.remove('shadow-lg');
      nav.style.transform = 'translateY(0)';
      state.lastScrollPosition = currentScroll;
      return;
    }
    
    if (currentScroll > state.lastScrollPosition && currentScroll > CONFIG.scrollThreshold) {
      // Scrolling down - hide nav
      nav.style.transform = 'translateY(-100%)';
    } else {
      // Scrolling up - show nav
      nav.style.transform = 'translateY(0)';
      nav.classList.add('shadow-lg');
    }
    
    state.lastScrollPosition = currentScroll;
    ticking = false;
  };
  
  // Throttled scroll event
  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(handleScroll);
      ticking = true;
    }
  }, { passive: true });
}

/**
 * Smooth Scroll for Anchor Links
 * Handles smooth scrolling with proper offset calculation
 */
function initSmoothScroll() {
  const anchorLinks = document.querySelectorAll('a[href^="#"]');
  if (!anchorLinks.length) return;
  
  anchorLinks.forEach(anchor => {
    anchor.addEventListener('click', handleAnchorClick);
  });
}

function handleAnchorClick(e) {
  const href = this.getAttribute('href');
  if (!href || href === '#') return;
  
  e.preventDefault();
  const target = document.querySelector(href);
  
  if (target) {
    const nav = document.getElementById('main-nav');
    const navHeight = nav ? nav.offsetHeight : 0;
    const targetPosition = target.offsetTop - navHeight - 20;
    
    window.scrollTo({
      top: targetPosition,
      behavior: 'smooth'
    });
    
    // Close mobile menu if open
    closeMobileMenu();
    
    // Update URL hash without jumping
    if (history.pushState) {
      history.pushState(null, null, href);
    }
  }
}

/**
 * Mobile Menu Handler
 * Manages mobile menu toggle and keyboard navigation
 */
function initMobileMenu() {
  const hamburger = document.querySelector('.hamburger-icon');
  const mobileMenu = document.getElementById('mobile-menu');
  
  if (!hamburger || !mobileMenu) return;
  
  hamburger.addEventListener('click', toggleMobileMenu);
  
  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !mobileMenu.contains(e.target)) {
      closeMobileMenu();
    }
  });
  
  // Close menu on escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeMobileMenu();
    }
  });
}

function toggleMobileMenu() {
  const mobileMenu = document.getElementById('mobile-menu');
  const hamburger = document.querySelector('.hamburger-icon');
  
  if (mobileMenu && hamburger) {
    mobileMenu.classList.toggle('hidden');
    hamburger.classList.toggle('open');
  }
}

function closeMobileMenu() {
  const mobileMenu = document.getElementById('mobile-menu');
  const hamburger = document.querySelector('.hamburger-icon');
  
  if (mobileMenu && hamburger) {
    mobileMenu.classList.add('hidden');
    hamburger.classList.remove('open');
  }
}

/**
 * Parallax Effect for Hero Section
 * Optimized with requestAnimationFrame
 */
function initParallaxEffect() {
  const heroImage = document.querySelector('.hero-image-container');
  if (!heroImage) return;
  
  let ticking = false;
  
  function updateParallax() {
    const scrolled = window.pageYOffset;
    if (scrolled < window.innerHeight) {
      heroImage.style.transform = `translateY(${scrolled * 0.4}px)`;
    }
    ticking = false;
  }
  
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(updateParallax);
      ticking = true;
    }
  }, { passive: true });
}

/**
 * Project Cards 3D Tilt Effect
 * Adds interactive 3D tilt on hover with performance optimization
 */
function initProjectCards() {
  const cards = document.querySelectorAll('.project-card-modern');
  if (!cards.length) return;
  
  cards.forEach(card => {
    let animationFrameId = null;
    
    card.addEventListener('mousemove', (e) => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
      
      animationFrameId = requestAnimationFrame(() => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = Math.max(-15, Math.min(15, (y - centerY) / 20));
        const rotateY = Math.max(-15, Math.min(15, (centerX - x) / 20));
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
      });
    });
    
    card.addEventListener('mouseleave', () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)';
    });
  });
}

/**
 * Counter Animation
 * Animates number counting with proper easing
 */
function initCounters() {
  const stats = document.querySelectorAll('.text-3xl.font-bold');
  if (!stats.length) return;
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const stat = entry.target;
        const value = parseInt(stat.textContent);
        
        if (!isNaN(value) && !stat.dataset.animated) {
          stat.dataset.animated = 'true';
          animateValue(stat, 0, value, CONFIG.animationDuration);
        }
        observer.unobserve(stat);
      }
    });
  }, { threshold: 0.5 });
  
  stats.forEach(stat => {
    observer.observe(stat);
  });
  
  // Store observer for cleanup
  state.observers.push(observer);
}

function animateValue(element, start, end, duration) {
  let startTimestamp = null;
  
  const step = (timestamp) => {
    if (!startTimestamp) startTimestamp = timestamp;
    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
    
    // Easing function for smooth animation
    const easeProgress = 1 - Math.pow(1 - progress, 3);
    const value = Math.floor(easeProgress * (end - start) + start);
    
    element.textContent = value + (element.dataset.suffix || '');
    
    if (progress < 1) {
      window.requestAnimationFrame(step);
    }
  };
  
  window.requestAnimationFrame(step);
}

/**
 * Dynamic Section Navigation Button
 * Shows/hides and updates the navigation button based on current section
 */
function initSectionNavigation() {
  const navButton = document.getElementById('section-nav-btn');
  if (!navButton) return;

  const sections = [
    { id: 'home', next: '#about', icon: 'down' },
    { id: 'about', next: '#experience', icon: 'down' },
    { id: 'experience', next: '#skills', icon: 'down' },
    { id: 'skills', next: '#projects', icon: 'down' },
    { id: 'projects', next: '#contact', icon: 'down' },
    { id: 'contact', next: '#home', icon: 'up' }
  ];

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const currentSection = sections.find(s => s.id === entry.target.id);
        if (currentSection) {
          navButton.href = currentSection.next;
          navButton.setAttribute('aria-label', `Scroll to ${currentSection.next.replace('#', '')}`);
          
          // Update icon direction
          const svg = navButton.querySelector('svg');
          if (currentSection.icon === 'up') {
            svg.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18"></path>';
          } else {
            svg.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>';
          }
          
          // Show button (hide only on home section initially)
          if (entry.target.id === 'home') {
            navButton.style.opacity = '1';
          } else {
            navButton.style.opacity = '1';
          }
        }
      }
    });
  }, { threshold: 0.5 });

  sections.forEach(section => {
    const element = document.getElementById(section.id);
    if (element) observer.observe(element);
  });

  state.observers.push(observer);
}

/**
 * Initialize Read More functionality for project descriptions
 */
function initReadMore() {
  const readMoreButtons = document.querySelectorAll('.read-more-btn');
  
  readMoreButtons.forEach(button => {
    button.addEventListener('click', function() {
      const description = this.previousElementSibling;
      
      if (description.classList.contains('line-clamp-3')) {
        // Expand
        description.classList.remove('line-clamp-3');
        this.textContent = 'Read less';
      } else {
        // Collapse
        description.classList.add('line-clamp-3');
        this.textContent = 'Read more';
      }
    });
  });
}

/**
 * Cleanup Function
 * Properly dispose of observers and event listeners
 */
function cleanup() {
  state.observers.forEach(observer => observer.disconnect());
  state.observers = [];
}

// Export for potential external use
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { initializeApp, cleanup };
}
