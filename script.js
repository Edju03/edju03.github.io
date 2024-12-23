document.addEventListener('DOMContentLoaded', () => {
    // Theme toggler with smooth transition
    const themeToggle = document.querySelector('.theme-toggle');
    const themeIcon = themeToggle?.querySelector('i');
    
    // Check for saved theme preference
    if (localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark-theme');
        themeIcon?.classList.replace('fa-moon', 'fa-sun');
    }
    
    themeToggle?.addEventListener('click', () => {
        document.body.classList.toggle('dark-theme');
        themeIcon?.classList.toggle('fa-moon');
        themeIcon?.classList.toggle('fa-sun');
        
        // Save theme preference
        localStorage.setItem('theme', 
            document.body.classList.contains('dark-theme') ? 'dark' : 'light'
        );

        // Add theme transition animation
        document.body.style.transition = 'background-color 0.5s, color 0.5s';
        setTimeout(() => {
            document.body.style.transition = '';
        }, 500);
    });

    // Enhanced navbar hide on scroll with smooth transition and performance optimization
    let lastScroll = 0;
    let isNavbarVisible = true;
    const navbar = document.querySelector('.navbar');
    let scrollTimeout = null;
    let lastScrollTime = Date.now();
    const scrollThreshold = 100; // Minimum scroll distance to trigger hide/show

    function hideNavbar() {
        if (isNavbarVisible) {
            navbar?.classList.add('navbar-hidden');
            isNavbarVisible = false;
        }
    }

    function showNavbar() {
        if (!isNavbarVisible) {
            navbar?.classList.remove('navbar-hidden');
            isNavbarVisible = true;
        }
    }

    // Optimized scroll handler with RAF and throttling
    window.addEventListener('scroll', () => {
        if (scrollTimeout) return;

        scrollTimeout = requestAnimationFrame(() => {
            const currentTime = Date.now();
            if (currentTime - lastScrollTime > 50) { // 20fps throttle
                const currentScroll = window.pageYOffset;
                const scrollDelta = currentScroll - lastScroll;
                
                if (Math.abs(scrollDelta) > scrollThreshold) {
                    if (scrollDelta > 0 && currentScroll > 100) {
                        hideNavbar();
                    } else if (scrollDelta < 0) {
                        showNavbar();
                    }
                    lastScroll = currentScroll;
                }
                lastScrollTime = currentTime;
            }
            scrollTimeout = null;
        });
    }, { passive: true });

    // Improved project cards animation on scroll with IntersectionObserver
    const cards = document.querySelectorAll('.project-card');
    
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Add stagger effect to project tags
                const tags = entry.target.querySelectorAll('.project-tag');
                tags.forEach((tag, index) => {
                    tag.style.transitionDelay = `${index * 0.1}s`;
                });
                // Unobserve after animation
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    cards.forEach(card => {
        observer.observe(card);
    });

    // Enhanced loader with smooth fadeout
    const loader = document.querySelector('.loader');
    if (loader) {
        window.addEventListener('load', () => {
            loader.style.transition = 'opacity 0.8s ease-out';
            requestAnimationFrame(() => {
                loader.classList.add('hidden');
                setTimeout(() => {
                    loader.style.display = 'none';
                }, 800);
            });
        });
    }

    // Enhanced form validation and submission handling with better UX
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        const submitButton = contactForm.querySelector('button[type="submit"]');
        let isSubmitting = false;

        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            if (isSubmitting) return;
            
            isSubmitting = true;
            const originalText = submitButton.textContent;
            submitButton.textContent = 'Sending...';
            submitButton.disabled = true;

            try {
                // Simulate form submission (replace with actual API call)
                await new Promise(resolve => setTimeout(resolve, 1500));
                
                submitButton.textContent = 'Sent!';
                submitButton.style.backgroundColor = 'var(--accent)';
                contactForm.reset();
                
                setTimeout(() => {
                    submitButton.textContent = originalText;
                    submitButton.disabled = false;
                    isSubmitting = false;
                }, 2000);
            } catch (error) {
                submitButton.textContent = 'Error! Try Again';
                setTimeout(() => {
                    submitButton.textContent = originalText;
                    submitButton.disabled = false;
                    isSubmitting = false;
                }, 2000);
            }
        });

        // Real-time form validation
        const inputs = contactForm.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('input', () => {
                input.classList.toggle('invalid', !input.checkValidity());
            });
        });
    }
});
