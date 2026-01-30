/**
 * CodeMentor - Main JavaScript
 * Author: Dagmawi Tarekegn
 */

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function () {
    // Initialize all functionality
    initMobileNav();
    initContactForm();
    initSmoothScroll();
});

/**
 * Mobile Navigation Toggle
 * Handles hamburger menu for mobile devices
 */
function initMobileNav() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', function () {
            navLinks.classList.toggle('active');

            // Update aria-expanded for accessibility
            const isExpanded = navLinks.classList.contains('active');
            menuToggle.setAttribute('aria-expanded', isExpanded);
        });

        // Close menu when clicking on a link
        const links = navLinks.querySelectorAll('a');
        links.forEach(function (link) {
            link.addEventListener('click', function () {
                navLinks.classList.remove('active');
                menuToggle.setAttribute('aria-expanded', 'false');
            });
        });
    }
}

/**
 * Contact Form Validation and Submission
 * Validates form fields and shows success message
 */
function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    const successMessage = document.getElementById('success-message');

    if (contactForm) {
        contactForm.addEventListener('submit', function (event) {
            event.preventDefault();

            // Get form fields
            const name = document.getElementById('name');
            const email = document.getElementById('email');
            const subject = document.getElementById('subject');
            const message = document.getElementById('message');

            // Clear previous error styles
            clearErrors();

            // Validate fields
            let isValid = true;

            if (!validateRequired(name, 'Please enter your name')) {
                isValid = false;
            }

            if (!validateEmail(email)) {
                isValid = false;
            }

            if (!validateRequired(subject, 'Please enter a subject')) {
                isValid = false;
            }

            if (!validateRequired(message, 'Please enter your message')) {
                isValid = false;
            }

            // If valid, show success message
            if (isValid) {
                // Hide the form
                contactForm.style.display = 'none';

                // Show success message
                if (successMessage) {
                    successMessage.style.display = 'block';
                }

                // Store submission in localStorage
                saveFormSubmission(name.value, email.value, subject.value, message.value);
            }
        });

        // Add real-time validation on input
        const inputs = contactForm.querySelectorAll('input, textarea');
        inputs.forEach(function (input) {
            input.addEventListener('blur', function () {
                if (input.type === 'email') {
                    validateEmail(input);
                } else {
                    validateRequired(input, 'This field is required');
                }
            });

            // Clear error on input
            input.addEventListener('input', function () {
                clearFieldError(input);
            });
        });
    }
}

/**
 * Validate required field
 */
function validateRequired(field, errorMessage) {
    if (field.value.trim() === '') {
        showError(field, errorMessage);
        return false;
    }
    return true;
}

/**
 * Validate email format
 */
function validateEmail(field) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (field.value.trim() === '') {
        showError(field, 'Please enter your email address');
        return false;
    }

    if (!emailRegex.test(field.value)) {
        showError(field, 'Please enter a valid email address');
        return false;
    }

    return true;
}

/**
 * Show error message for a field
 */
function showError(field, message) {
    field.classList.add('error');
    field.style.borderColor = '#ef4444';

    // Check if error message already exists
    const existingError = field.parentNode.querySelector('.error-message');
    if (!existingError) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.style.color = '#ef4444';
        errorDiv.style.fontSize = '0.875rem';
        errorDiv.style.marginTop = '0.25rem';
        errorDiv.textContent = message;
        field.parentNode.appendChild(errorDiv);
    }
}

/**
 * Clear error for a specific field
 */
function clearFieldError(field) {
    field.classList.remove('error');
    field.style.borderColor = '';

    const errorMessage = field.parentNode.querySelector('.error-message');
    if (errorMessage) {
        errorMessage.remove();
    }
}

/**
 * Clear all error messages
 */
function clearErrors() {
    const errorFields = document.querySelectorAll('.error');
    errorFields.forEach(function (field) {
        field.classList.remove('error');
        field.style.borderColor = '';
    });

    const errorMessages = document.querySelectorAll('.error-message');
    errorMessages.forEach(function (message) {
        message.remove();
    });
}

/**
 * Save form submission to localStorage
 */
function saveFormSubmission(name, email, subject, message) {
    const submissions = JSON.parse(localStorage.getItem('codementor_submissions') || '[]');

    const newSubmission = {
        id: Date.now(),
        name: name,
        email: email,
        subject: subject,
        message: message,
        timestamp: new Date().toISOString()
    };

    submissions.push(newSubmission);
    localStorage.setItem('codementor_submissions', JSON.stringify(submissions));

    console.log('Form submission saved:', newSubmission);
}

/**
 * Smooth Scroll for anchor links
 */
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(function (link) {
        link.addEventListener('click', function (event) {
            const targetId = this.getAttribute('href');

            if (targetId && targetId !== '#') {
                const targetElement = document.querySelector(targetId);

                if (targetElement) {
                    event.preventDefault();
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
}
