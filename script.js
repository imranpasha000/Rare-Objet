// Just A Click Website JavaScript

document.addEventListener('DOMContentLoaded', function () {
  // Initialize all functionality
  initNavigation();
  initAnimations();
  initScrollEffects();
  initInteractiveElements();
  initFormHandling();
});

// Navigation functionality
function initNavigation() {
  const nav = document.querySelector('nav');
  const navLinks = document.querySelectorAll('nav a');

  // Mobile menu toggle
  const mobileMenuButton = document.getElementById('mobile-menu-button');
  const mobileMenu = document.getElementById('mobile-menu');
  const iconOpen = document.getElementById('icon-open');
  const iconClose = document.getElementById('icon-close');

  if (mobileMenuButton && mobileMenu) {
    mobileMenuButton.addEventListener('click', function () {
      const isOpen = !mobileMenu.classList.contains('hidden');
      if (isOpen) {
        mobileMenu.classList.add('hidden');
        mobileMenuButton.setAttribute('aria-expanded', 'false');
        if (iconOpen && iconClose) {
          iconOpen.classList.remove('hidden');
          iconClose.classList.add('hidden');
        }
      } else {
        mobileMenu.classList.remove('hidden');
        mobileMenuButton.setAttribute('aria-expanded', 'true');
        if (iconOpen && iconClose) {
          iconOpen.classList.add('hidden');
          iconClose.classList.remove('hidden');
        }
      }
    });

    // Close on link click (mobile)
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
        mobileMenuButton.setAttribute('aria-expanded', 'false');
        if (iconOpen && iconClose) {
          iconOpen.classList.remove('hidden');
          iconClose.classList.add('hidden');
        }
      });
    });
  }

  // Smooth scrolling for anchor links
  navLinks.forEach(link => {
    link.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href.startsWith('#')) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }
    });
  });

  // Navbar scroll effect
  window.addEventListener('scroll', function () {
    if (window.scrollY > 100) {
      nav.classList.add('bg-white', 'shadow-lg');
    } else {
      nav.classList.remove('shadow-lg');
    }
  });
}

// Animation on scroll
function initAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in-up');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe elements for animation
  const animatedElements = document.querySelectorAll('.animate-on-scroll');
  animatedElements.forEach(el => observer.observe(el));
}

// Scroll effects
function initScrollEffects() {
  let ticking = false;

  function updateScrollEffects() {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.parallax');

    parallaxElements.forEach(element => {
      const speed = element.dataset.speed || 0.5;
      const yPos = -(scrolled * speed);
      element.style.transform = `translateY(${yPos}px)`;
    });

    ticking = false;
  }

  function requestTick() {
    if (!ticking) {
      requestAnimationFrame(updateScrollEffects);
      ticking = true;
    }
  }

  window.addEventListener('scroll', requestTick);
}

// Interactive elements
function initInteractiveElements() {
  // Button hover effects
  const buttons = document.querySelectorAll('button, .btn');
  buttons.forEach(button => {
    button.addEventListener('mouseenter', function () {
      this.style.transform = 'translateY(-2px)';
    });

    button.addEventListener('mouseleave', function () {
      this.style.transform = 'translateY(0)';
    });
  });

  // Card hover effects
  const cards = document.querySelectorAll('.card-hover');
  cards.forEach(card => {
    card.addEventListener('mouseenter', function () {
      this.classList.add('hover-lift');
    });

    card.addEventListener('mouseleave', function () {
      this.classList.remove('hover-lift');
    });
  });

  // Login button functionality
  const loginButtons = document.querySelectorAll('button:contains("Login")');
  loginButtons.forEach(button => {
    button.addEventListener('click', function () {
      showLoginModal();
    });
  });
}

// Form handling
function initFormHandling() {
  const forms = document.querySelectorAll('form');

  forms.forEach(form => {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      handleFormSubmission(this);
    });
  });
}

// Login modal
function showLoginModal() {
  const modal = document.createElement('div');
  modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
  modal.innerHTML = `
        <div class="bg-white rounded-lg p-8 max-w-md w-full mx-4">
            <div class="flex justify-between items-center mb-6">
                <h2 class="text-2xl font-bold text-gray-900">Login</h2>
                <button class="text-gray-400 hover:text-gray-600" onclick="this.closest('.fixed').remove()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <form class="space-y-4">
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    <input type="email" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required>
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">Password</label>
                    <input type="password" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required>
                </div>
                <div class="flex items-center justify-between">
                    <label class="flex items-center">
                        <input type="checkbox" class="mr-2">
                        <span class="text-sm text-gray-600">Remember me</span>
                    </label>
                    <a href="#" class="text-sm text-blue-600 hover:text-blue-800">Forgot password?</a>
                </div>
                <button type="submit" class="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300">
                    Login
                </button>
            </form>
            <div class="mt-6 text-center">
                <p class="text-sm text-gray-600">Don't have an account? <a href="#" class="text-blue-600 hover:text-blue-800">Sign up</a></p>
            </div>
        </div>
    `;

  document.body.appendChild(modal);

  // Close modal on outside click
  modal.addEventListener('click', function (e) {
    if (e.target === modal) {
      modal.remove();
    }
  });
}

// Form submission handler
function handleFormSubmission(form) {
  const formData = new FormData(form);
  const data = Object.fromEntries(formData);

  // Show loading state
  const submitButton = form.querySelector('button[type="submit"]');
  const originalText = submitButton.textContent;
  submitButton.textContent = 'Submitting...';
  submitButton.disabled = true;

  // Simulate API call
  setTimeout(() => {
    showNotification('Form submitted successfully!', 'success');
    form.reset();
    submitButton.textContent = originalText;
    submitButton.disabled = false;
  }, 2000);
}

// Notification system
function showNotification(message, type = 'info') {
  const notification = document.createElement('div');
  notification.className = `fixed top-4 right-4 p-4 rounded-lg shadow-lg z-50 ${type === 'success' ? 'bg-green-500 text-white' :
    type === 'error' ? 'bg-red-500 text-white' :
      'bg-blue-500 text-white'
    }`;
  notification.textContent = message;

  document.body.appendChild(notification);

  // Auto remove after 3 seconds
  setTimeout(() => {
    notification.remove();
  }, 3000);
}

// Utility functions
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

function throttle(func, limit) {
  let inThrottle;
  return function () {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

// Lazy loading for images
function initLazyLoading() {
  const images = document.querySelectorAll('img[data-src]');

  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.remove('lazy');
        imageObserver.unobserve(img);
      }
    });
  });

  images.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading
initLazyLoading();

// Service worker registration (for PWA features)
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(registration => {
        console.log('SW registered: ', registration);
      })
      .catch(registrationError => {
        console.log('SW registration failed: ', registrationError);
      });
  });
}

// EmailJS Configuration
// Replace these with your EmailJS credentials from https://www.emailjs.com/
const EMAILJS_CONFIG = {
  SERVICE_ID: 'YOUR_SERVICE_ID',      // Your EmailJS Service ID
  TEMPLATE_ID: 'YOUR_TEMPLATE_ID',    // Your EmailJS Template ID
  PUBLIC_KEY: 'YOUR_PUBLIC_KEY'        // Your EmailJS Public Key
};

// Initialize EmailJS when the script loads
if (typeof emailjs !== 'undefined') {
  emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY);
}

// Contact form submission handler with EmailJS
function handleFormSubmit(event) {
  event.preventDefault();
  const form = event.target;
  const formData = new FormData(form);
  const data = Object.fromEntries(formData);
  
  // Show loading state
  const submitButton = form.querySelector('button[type="submit"]');
  const originalHTML = submitButton.innerHTML;
  submitButton.innerHTML = '<span>Sending...</span><i class="fas fa-spinner fa-spin"></i>';
  submitButton.disabled = true;
  
  // Get message element
  const messageElement = document.getElementById('formMessage');
  messageElement.className = 'form-message';
  messageElement.style.display = 'none';
  
  // Check if EmailJS is configured
  if (EMAILJS_CONFIG.SERVICE_ID === 'YOUR_SERVICE_ID' || 
      EMAILJS_CONFIG.TEMPLATE_ID === 'YOUR_TEMPLATE_ID' || 
      EMAILJS_CONFIG.PUBLIC_KEY === 'YOUR_PUBLIC_KEY') {
    // EmailJS not configured - show error
    messageElement.className = 'form-message error';
    messageElement.textContent = 'Email service not configured. Please contact the administrator.';
    messageElement.style.display = 'block';
    submitButton.innerHTML = originalHTML;
    submitButton.disabled = false;
    return;
  }
  
  // Prepare email template parameters
  const templateParams = {
    from_name: `${data.firstName} ${data.lastName}`,
    from_email: data.email,
    phone: data.phone || 'Not provided',
    company: data.company || 'Not provided',
    subject: data.subject || 'General Inquiry',
    message: data.message,
    to_name: 'Just A Click Team'
  };
  
  // Send email using EmailJS
  if (typeof emailjs !== 'undefined') {
    emailjs.send(
      EMAILJS_CONFIG.SERVICE_ID,
      EMAILJS_CONFIG.TEMPLATE_ID,
      templateParams
    )
    .then(function(response) {
      // Success response
      messageElement.className = 'form-message success';
      messageElement.textContent = 'Thank you for your message! We\'ll get back to you soon.';
      messageElement.style.display = 'block';
      
      // Reset form
      form.reset();
      submitButton.innerHTML = originalHTML;
      submitButton.disabled = false;
      
      // Scroll to message
      messageElement.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      
      // Hide message after 5 seconds
      setTimeout(() => {
        messageElement.style.display = 'none';
      }, 5000);
    }, function(error) {
      // Error response
      console.error('EmailJS Error:', error);
      messageElement.className = 'form-message error';
      messageElement.textContent = 'Sorry, there was an error sending your message. Please try again later or contact us directly.';
      messageElement.style.display = 'block';
      
      submitButton.innerHTML = originalHTML;
      submitButton.disabled = false;
      
      // Scroll to message
      messageElement.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    });
  } else {
    // EmailJS library not loaded
    messageElement.className = 'form-message error';
    messageElement.textContent = 'Email service library not loaded. Please refresh the page and try again.';
    messageElement.style.display = 'block';
    submitButton.innerHTML = originalHTML;
    submitButton.disabled = false;
  }
}

// Export functions for global access
window.JustAClick = {
  showLoginModal,
  showNotification,
  handleFormSubmission,
  handleFormSubmit
};
