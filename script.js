document.addEventListener('DOMContentLoaded', () => {
    // Cursor functionality
    const cursor = document.querySelector('.cursor');
    const links = document.querySelectorAll('a, button');
    let isHoveringClickable = false;

    if (cursor) {
        // Main cursor movement with smoothing
        let cursorX = 0;
        let cursorY = 0;
        let currentX = 0;
        let currentY = 0;

        document.addEventListener('mousemove', (e) => {
            cursorX = e.clientX;
            cursorY = e.clientY;
        });

        // Smooth cursor animation
        function animateCursor() {
            const ease = 0.2;
            
            currentX += (cursorX - currentX) * ease;
            currentY += (cursorY - currentY) * ease;
            
            cursor.style.transform = `translate(${currentX}px, ${currentY}px) scale(${isHoveringClickable ? 1.5 : 1})`;
            
            requestAnimationFrame(animateCursor);
        }
        animateCursor();

        // Cursor effects for clickable elements
        links.forEach(link => {
            link.addEventListener('mouseenter', () => {
                isHoveringClickable = true;
                cursor.style.borderColor = 'var(--accent)';
                cursor.style.backgroundColor = 'rgba(33, 150, 243, 0.1)';
            });

            link.addEventListener('mouseleave', () => {
                isHoveringClickable = false;
                cursor.style.borderColor = 'var(--accent)';
                cursor.style.backgroundColor = 'transparent';
            });
        });

        // Click animation
        document.addEventListener('mousedown', () => {
            cursor.style.transform = `translate(${currentX}px, ${currentY}px) scale(0.8)`;
        });

        document.addEventListener('mouseup', () => {
            cursor.style.transform = `translate(${currentX}px, ${currentY}px) scale(1)`;
        });

        // Hide system cursor
        document.body.style.cursor = 'none';
        links.forEach(link => link.style.cursor = 'none');
    }

    // Theme toggler with smooth transition
    const themeToggle = document.querySelector('.theme-toggle');
    const themeIcon = themeToggle.querySelector('i');
    const root = document.documentElement;
    
    // Check for saved theme preference
    if (localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark-theme');
        themeIcon.classList.replace('fa-moon', 'fa-sun');
    }
    
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-theme');
        themeIcon.classList.toggle('fa-moon');
        themeIcon.classList.toggle('fa-sun');
        
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

    // Enhanced navbar hide on scroll with smooth transition
    let lastScroll = 0;
    let isNavbarVisible = true;
    const navbar = document.querySelector('.navbar');

    function hideNavbar() {
        if (isNavbarVisible) {
            navbar.style.transform = 'translateY(-100%)';
            isNavbarVisible = false;
        }
    }

    function showNavbar() {
        if (!isNavbarVisible) {
            navbar.style.transform = 'translateY(0)';
            isNavbarVisible = true;
        }
    }

    // Throttle scroll event for better performance
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        if (scrollTimeout) {
            window.cancelAnimationFrame(scrollTimeout);
        }

        scrollTimeout = window.requestAnimationFrame(() => {
            const currentScroll = window.pageYOffset;
            
            if (currentScroll > lastScroll && currentScroll > 100) {
                hideNavbar();
            } else {
                showNavbar();
            }
            
            lastScroll = currentScroll;
        });
    });

    // Improved project cards animation on scroll
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
            }
        });
    }, observerOptions);

    cards.forEach(card => {
        observer.observe(card);
    });

    // Enhanced loader with smooth fadeout
    window.addEventListener('load', () => {
        const loader = document.querySelector('.loader');
        if (loader) {
            loader.style.transition = 'opacity 0.8s ease-out';
            setTimeout(() => {
                loader.classList.add('hidden');
                setTimeout(() => {
                    loader.style.display = 'none';
                }, 800);
            }, 500);
        }
    });

    // Form validation and submission handling
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Add loading state to submit button
            const submitButton = contactForm.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            submitButton.textContent = 'Sending...';
            submitButton.disabled = true;

            // Simulate form submission (replace with actual API call)
            setTimeout(() => {
                submitButton.textContent = 'Sent!';
                submitButton.style.backgroundColor = 'var(--accent)';
                
                // Reset form
                setTimeout(() => {
                    contactForm.reset();
                    submitButton.textContent = originalText;
                    submitButton.disabled = false;
                }, 2000);
            }, 1500);
        });
    }
});
