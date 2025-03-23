// Navigation Menu Toggle
const navSlide = () => {
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');
    
    burger.addEventListener('click', () => {
        // Toggle Nav
        nav.classList.toggle('nav-active');
        
        // Animate Links
        navLinks.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = '';
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
            }
        });
        
        // Burger Animation
        burger.classList.toggle('toggle');
    });
}

// Initialize Firebase (will be added later)
const initFirebase = () => {
    // This will be populated when we set up Firebase
    console.log('Firebase will be initialized here');
}

// Form Validation
const validateForm = (formId) => {
    const form = document.getElementById(formId);
    if (!form) return;
    
    form.addEventListener('submit', (e) => {
        let isValid = true;
        const requiredFields = form.querySelectorAll('[required]');
        
        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                isValid = false;
                // Add error class
                field.classList.add('error');
                
                // Create error message if it doesn't exist
                let errorMsg = field.parentElement.querySelector('.error-message');
                if (!errorMsg) {
                    errorMsg = document.createElement('div');
                    errorMsg.className = 'error-message';
                    errorMsg.textContent = 'This field is required';
                    field.parentElement.appendChild(errorMsg);
                }
            } else {
                // Remove error class and message
                field.classList.remove('error');
                const errorMsg = field.parentElement.querySelector('.error-message');
                if (errorMsg) {
                    errorMsg.remove();
                }
            }
        });
        
        // Email validation
        const emailField = form.querySelector('input[type="email"]');
        if (emailField && emailField.value.trim()) {
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(emailField.value.trim())) {
                isValid = false;
                emailField.classList.add('error');
                
                let errorMsg = emailField.parentElement.querySelector('.error-message');
                if (!errorMsg) {
                    errorMsg = document.createElement('div');
                    errorMsg.className = 'error-message';
                    errorMsg.textContent = 'Please enter a valid email address';
                    emailField.parentElement.appendChild(errorMsg);
                } else {
                    errorMsg.textContent = 'Please enter a valid email address';
                }
            }
        }
        
        // Password validation
        const passwordField = form.querySelector('input[type="password"]');
        if (passwordField && passwordField.value.trim()) {
            if (passwordField.value.length < 6) {
                isValid = false;
                passwordField.classList.add('error');
                
                let errorMsg = passwordField.parentElement.querySelector('.error-message');
                if (!errorMsg) {
                    errorMsg = document.createElement('div');
                    errorMsg.className = 'error-message';
                    errorMsg.textContent = 'Password must be at least 6 characters';
                    passwordField.parentElement.appendChild(errorMsg);
                } else {
                    errorMsg.textContent = 'Password must be at least 6 characters';
                }
            }
        }
        
        // Prevent form submission if not valid
        if (!isValid) {
            e.preventDefault();
        }
    });
    
    // Real-time validation
    const fields = form.querySelectorAll('input, textarea, select');
    fields.forEach(field => {
        field.addEventListener('input', () => {
            if (field.classList.contains('error')) {
                // Remove error class and message when user starts typing
                field.classList.remove('error');
                const errorMsg = field.parentElement.querySelector('.error-message');
                if (errorMsg) {
                    errorMsg.remove();
                }
            }
        });
    });
}

// Initialize all functions when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    navSlide();
    initFirebase();
    validateForm('loginForm');
    validateForm('registerForm');
    validateForm('employerRegisterForm');
    validateForm('contactForm');
});

// Add smooth scrolling for all anchors
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});