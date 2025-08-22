// UI Modules
// Handles navigation, hero section, animations, and other interface components

const Navigation = {
    init() {
        const navbar = document.querySelector('.navbar');
        const navLinks = document.querySelectorAll('.nav-link');
        const mobileToggle = document.querySelector('.mobile-menu-toggle');
        
        // Smooth scrolling for navigation links
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                
                // Only prevent default for anchor links (starting with #)
                if (href.startsWith('#')) {
                    e.preventDefault();
                    const targetId = href.substring(1);
                    const targetSection = document.getElementById(targetId);
                    
                    if (targetSection) {
                        targetSection.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }
                }
            });
        });
        
        // Hide/show navbar on scroll
        let lastScrollTop = 0;
        let navbarHeight = navbar.offsetHeight;
        
        window.addEventListener('scroll', function() {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            if (scrollTop > lastScrollTop && scrollTop > navbarHeight) {
                navbar.classList.add('navbar-hidden');
            } else {
                navbar.classList.remove('navbar-hidden');
            }
            
            lastScrollTop = scrollTop;
        });
        
        // Mobile menu toggle
        if (mobileToggle) {
            mobileToggle.addEventListener('click', function() {
                console.log('Mobile menu toggled');
            });
        }
    }
};

const Hero = {
    init() {
        const robotAvatar = document.querySelector('.robot-avatar');
        const heroButtons = document.querySelectorAll('.hero-buttons .btn');
        
        // Robot eye following mouse
        document.addEventListener('mousemove', function(e) {
            const eyes = document.querySelectorAll('.eye');
            eyes.forEach(eye => {
                const rect = eye.getBoundingClientRect();
                const eyeX = rect.left + rect.width / 2;
                const eyeY = rect.top + rect.height / 2;
                
                const deltaX = e.clientX - eyeX;
                const deltaY = e.clientY - eyeY;
                const angle = Math.atan2(deltaY, deltaX);
                
                const distance = Math.min(3, Math.sqrt(deltaX * deltaX + deltaY * deltaY) / 10);
                const translateX = Math.cos(angle) * distance;
                const translateY = Math.sin(angle) * distance;
                
                eye.style.transform = `translate(${translateX}px, ${translateY}px)`;
            });
        });
        
        // Add click interactions to hero buttons
        heroButtons.forEach(button => {
            button.addEventListener('click', function() {
                const ripple = document.createElement('div');
                ripple.style.position = 'absolute';
                ripple.style.borderRadius = '50%';
                ripple.style.background = 'rgba(255, 255, 255, 0.4)';
                ripple.style.transform = 'scale(0)';
                ripple.style.animation = 'ripple 0.6s linear';
                ripple.style.left = '50%';
                ripple.style.top = '50%';
                ripple.style.width = '20px';
                ripple.style.height = '20px';
                ripple.style.marginLeft = '-10px';
                ripple.style.marginTop = '-10px';
                
                this.appendChild(ripple);
                
                setTimeout(() => {
                    ripple.remove();
                }, 600);
            });
        });
    }
};

const Animations = {
    init() {
        // Intersection Observer for scroll animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    
                    // Staggered animation for project cards
                    if (entry.target.classList.contains('project-card')) {
                        const index = Array.from(entry.target.parentNode.children).indexOf(entry.target);
                        entry.target.style.transitionDelay = `${index * 0.1}s`;
                    }
                }
            });
        }, observerOptions);
        
        // Observe all project cards
        document.querySelectorAll('.project-card').forEach(card => {
            observer.observe(card);
        });
        
        // Observe other animated elements
        document.querySelectorAll('.stat-card, .info-card, .text-card').forEach(card => {
            observer.observe(card);
        });
    },

    start() {
        // Add any animations that should start after loading
        document.querySelectorAll('.hero-text, .hero-visual').forEach(element => {
            element.style.animationPlayState = 'running';
        });
    }
};

const Stats = {
    init() {
        const statNumbers = document.querySelectorAll('.stat-number');
        
        function animateStats() {
            statNumbers.forEach(stat => {
                const target = parseInt(stat.getAttribute('data-target'));
                const increment = target / 100;
                let current = 0;
                
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        current = target;
                        clearInterval(timer);
                    }
                    
                    if (target > 1000) {
                        stat.textContent = Math.floor(current).toLocaleString();
                    } else {
                        stat.textContent = Math.floor(current);
                    }
                }, 20);
            });
        }
        
        // Trigger animation when stats section is visible
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateStats();
                    statsObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        const statsSection = document.querySelector('.about-stats');
        if (statsSection) {
            statsObserver.observe(statsSection);
        }
    }
};

const ContactForm = {
    init() {
        const contactForm = document.getElementById('contact-form');
        if (!contactForm) return;
        
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const formInputs = contactForm.querySelectorAll('input, textarea');
        
        // Add input focus effects
        formInputs.forEach(input => {
            input.addEventListener('focus', function() {
                this.parentElement.classList.add('focused');
            });
            
            input.addEventListener('blur', function() {
                if (!this.value) {
                    this.parentElement.classList.remove('focused');
                }
            });
            
            // Real-time validation
            input.addEventListener('input', function() {
                if (this.checkValidity()) {
                    this.classList.remove('invalid');
                    this.classList.add('valid');
                } else {
                    this.classList.remove('valid');
                    this.classList.add('invalid');
                }
            });
        });
        
        // Form submission with EmailJS
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const originalText = submitButton.innerHTML;
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> <span>Sending...</span>';
            submitButton.disabled = true;
            
            // Get form data
            const formData = new FormData(contactForm);
            const templateParams = {
                from_name: formData.get('name'),
                from_email: formData.get('email'),
                subject: formData.get('subject'),
                message: formData.get('message'),
                to_name: 'Edward Ju'
            };
            
            try {
                // Send email using EmailJS
                // You'll need to replace these with your actual EmailJS credentials
                const result = await emailjs.send(
                    'YOUR_SERVICE_ID',     // Replace with your EmailJS service ID
                    'YOUR_TEMPLATE_ID',    // Replace with your EmailJS template ID
                    templateParams,
                    'YOUR_PUBLIC_KEY'      // Replace with your EmailJS public key
                );
                
                console.log('Email sent successfully:', result);
                
                submitButton.innerHTML = '<i class="fas fa-check"></i> <span>Sent!</span>';
                submitButton.style.background = 'var(--success-color)';
                
                // Reset form
                contactForm.reset();
                formInputs.forEach(input => {
                    input.classList.remove('valid', 'invalid');
                    input.parentElement.classList.remove('focused');
                });
                
                setTimeout(() => {
                    submitButton.innerHTML = originalText;
                    submitButton.style.background = '';
                    submitButton.disabled = false;
                }, 3000);
                
            } catch (error) {
                console.error('Email send failed:', error);
                
                submitButton.innerHTML = '<i class="fas fa-exclamation-triangle"></i> <span>Failed to send</span>';
                submitButton.style.background = 'var(--error-color)';
                
                setTimeout(() => {
                    submitButton.innerHTML = originalText;
                    submitButton.style.background = '';
                    submitButton.disabled = false;
                }, 3000);
            }
        });
    }
};

const CursorTrail = {
    init() {
        const cursorTrail = document.querySelector('.cursor-trail');
        if (!cursorTrail) return;
        
        let cursorX = 0, cursorY = 0;
        let trailX = 0, trailY = 0;
        let animationId = null;
        let isMoving = false;
        let moveTimeout = null;
        
        // Use passive event listener for better performance
        document.addEventListener('mousemove', function(e) {
            cursorX = e.clientX;
            cursorY = e.clientY;
            
            // Only show cursor when moving
            if (!isMoving) {
                isMoving = true;
                cursorTrail.style.opacity = '1';
                if (!animationId) {
                    updateCursorTrail();
                }
            }
            
            // Hide cursor after stopping
            clearTimeout(moveTimeout);
            moveTimeout = setTimeout(() => {
                isMoving = false;
                cursorTrail.style.opacity = '0.3';
            }, 100);
        }, { passive: true });
        
        document.addEventListener('mouseleave', function() {
            cursorTrail.style.opacity = '0';
            isMoving = false;
        });
        
        function updateCursorTrail() {
            // Smoother interpolation
            const speed = 0.15;
            trailX += (cursorX - trailX) * speed;
            trailY += (cursorY - trailY) * speed;
            
            // Use transform instead of left/top for GPU acceleration
            cursorTrail.style.transform = `translate3d(${trailX - 10}px, ${trailY - 10}px, 0)`;
            
            // Only animate when moving
            if (isMoving || Math.abs(cursorX - trailX) > 0.1 || Math.abs(cursorY - trailY) > 0.1) {
                animationId = requestAnimationFrame(updateCursorTrail);
            } else {
                animationId = null;
            }
        }
        
        updateCursorTrail();
    }
};

const ScrollIndicator = {
    init() {
        const scrollIndicator = document.querySelector('.scroll-indicator');
        if (!scrollIndicator) return;
        
        scrollIndicator.addEventListener('click', function() {
            const aboutSection = document.getElementById('about');
            if (aboutSection) {
                aboutSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
        
        // Hide scroll indicator when scrolling
        window.addEventListener('scroll', function() {
            const scrollTop = window.pageYOffset;
            const opacity = Math.max(0, 1 - scrollTop / 300);
            scrollIndicator.style.opacity = opacity;
        });
    }
};

const Theme = {
    init() {
        // Theme functionality can be added here
    }
};

// LoadingScreen removed - now handled in main.js 