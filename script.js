document.addEventListener('DOMContentLoaded', () => {
    // Enhanced cursor functionality with better performance
    const cursor = document.querySelector('.cursor');
    const links = document.querySelectorAll('a, button');
    let isHoveringClickable = false;
    let rafId = null;
    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;

    if (cursor) {
        // Set initial cursor position to match mouse
        const initialMousePosition = (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            cursorX = e.clientX;
            cursorY = e.clientY;
            cursor.style.transform = `translate(${mouseX - 10}px, ${mouseY - 10}px)`;
            cursor.style.opacity = 1;
            document.removeEventListener('mousemove', initialMousePosition);
            startCursorAnimation();
        };
        document.addEventListener('mousemove', initialMousePosition);

        // Smooth cursor animation using lerp
        const lerp = (start, end, factor) => start + (end - start) * factor;
        
        const animateCursor = () => {
            // Smooth movement with lerp
            cursorX = lerp(cursorX, mouseX, 0.2);
            cursorY = lerp(cursorY, mouseY, 0.2);
            
            // Scale effect for hovering over clickable elements
            const scale = isHoveringClickable ? 1.5 : 1;
            
            cursor.style.transform = `translate(${cursorX - 10}px, ${cursorY - 10}px) scale(${scale})`;
            rafId = requestAnimationFrame(animateCursor);
        };

        const startCursorAnimation = () => {
            if (rafId === null) {
                rafId = requestAnimationFrame(animateCursor);
            }
        };

        const stopCursorAnimation = () => {
            if (rafId !== null) {
                cancelAnimationFrame(rafId);
                rafId = null;
            }
        };

        // Optimized mousemove event with debouncing
        let moveThrottle;
        document.addEventListener('mousemove', (e) => {
            if (moveThrottle) return;
            moveThrottle = true;
            setTimeout(() => moveThrottle = false, 5);
            
            mouseX = e.clientX;
            mouseY = e.clientY;
        }, { passive: true });

        // Enhanced cursor effects for clickable elements using event delegation
        document.addEventListener('mouseover', (e) => {
            if (e.target.matches('a, button')) {
                isHoveringClickable = true;
                cursor.style.borderColor = 'var(--accent)';
                cursor.style.backgroundColor = 'rgba(33, 150, 243, 0.1)';
                cursor.style.mixBlendMode = 'difference';
            }
        });

        document.addEventListener('mouseout', (e) => {
            if (e.target.matches('a, button')) {
                isHoveringClickable = false;
                cursor.style.borderColor = 'var(--accent)';
                cursor.style.backgroundColor = 'transparent';
                cursor.style.mixBlendMode = 'normal';
            }
        });

        // Optimized click animations
        document.addEventListener('mousedown', () => {
            cursor.style.transform = `translate(${cursorX - 10}px, ${cursorY - 10}px) scale(0.8)`;
        });

        document.addEventListener('mouseup', () => {
            cursor.style.transform = `translate(${cursorX - 10}px, ${cursorY - 10}px) scale(1)`;
        });

        // Hide default cursor
        document.body.style.cursor = 'none';
        links.forEach(link => link.style.cursor = 'none');

        // Improved window boundary handling
        document.addEventListener('mouseleave', () => {
            cursor.style.opacity = 0;
            stopCursorAnimation();
        });

        document.addEventListener('mouseenter', () => {
            cursor.style.opacity = 1;
            startCursorAnimation();
        });
    }

    // Theme toggler with smooth transition
    const themeToggle = document.querySelector('.theme-toggle');
    const themeIcon = themeToggle?.querySelector('i');
    const root = document.documentElement;
    
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
